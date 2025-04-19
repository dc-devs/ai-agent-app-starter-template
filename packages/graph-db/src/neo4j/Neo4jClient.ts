import neo4j, { Driver, Session, ManagedTransaction } from 'neo4j-driver';
import type {
	Neo4jConfig,
	QueryResult,
	TransactionConfig,
} from '@graph-db/neo4j/types';

/**
 * Client for interacting with a Neo4j graph database.
 * Provides methods for CRUD operations and querying the graph.
 */
export class Neo4jClient {
	private driver: Driver;
	private config: Neo4jConfig;
	private defaultDatabase: string;

	/**
	 * Creates a new Neo4j client instance.
	 * @param config - Configuration options for connecting to Neo4j
	 */
	constructor(config: Neo4jConfig) {
		this.config = config;
		this.defaultDatabase = config.database || 'neo4j';
		this.driver = neo4j.driver(
			config.url,
			neo4j.auth.basic(config.username, config.password),
		);
	}

	/**
	 * Verifies connectivity to the Neo4j database.
	 * @returns Promise resolving to true if connected, false otherwise
	 */
	async verifyConnectivity(): Promise<boolean> {
		try {
			const serverInfo = await this.driver.getServerInfo();
			return !!serverInfo;
		} catch (error) {
			console.error('Failed to connect to Neo4j:', error);
			return false;
		}
	}

	/**
	 * Closes the connection to the Neo4j database.
	 * Should be called when the client is no longer needed.
	 */
	async close(): Promise<void> {
		await this.driver.close();
	}

	/**
	 * Gets a Neo4j session for interacting with the database.
	 * @param database - Optional database name to connect to
	 * @returns A Neo4j session instance
	 */
	getSession(database?: string): Session {
		return this.driver.session({
			database: database || this.defaultDatabase,
		});
	}

	/**
	 * Executes a Cypher query against the Neo4j database.
	 * @param query - The Cypher query to execute
	 * @param params - Parameters to pass to the query
	 * @param database - Optional database name to run the query against
	 * @returns Promise resolving to the query results
	 */
	async executeQuery<T = any>(
		query: string,
		params: Record<string, any> = {},
		database?: string,
	): Promise<QueryResult<T>> {
		const session = this.getSession(database);

		try {
			const result = await session.run(query, params);

			return {
				records: result.records.map((record) => {
					const mapped = {} as any;
					record.keys.forEach((key) => {
						mapped[key] = this.transformValue(record.get(key));
					});
					return mapped;
				}),
				summary: {
					query: {
						text: result.summary.query.text,
						parameters: result.summary.query.parameters,
					},
					resultAvailableAfter: this.transformValue(
						result.summary.resultAvailableAfter,
					),
					resultConsumedAfter: this.transformValue(
						result.summary.resultConsumedAfter,
					),
				},
			};
		} finally {
			await session.close();
		}
	}

	/**
	 * Executes a transaction function against the Neo4j database.
	 * @param transactionFn - Function that executes operations within a transaction
	 * @param config - Optional transaction configuration
	 * @param database - Optional database name to run the transaction against
	 * @returns Promise resolving to the transaction result
	 */
	async executeTransaction<T = any>(
		transactionFn: (tx: ManagedTransaction) => Promise<T>,
		config?: TransactionConfig,
		database?: string,
	): Promise<T> {
		const session = this.getSession(database);

		try {
			const result = await session.executeWrite(transactionFn, config);
			return result;
		} finally {
			await session.close();
		}
	}

	/**
	 * Creates a new node in the graph with the specified labels and properties.
	 * @param labels - Array of labels to assign to the node
	 * @param properties - Properties to set on the node
	 * @param database - Optional database name
	 * @returns Promise resolving to the created node data
	 */
	async createNode(
		labels: string[],
		properties: Record<string, any>,
		database?: string,
	) {
		const labelsString = labels.map((label) => `:${label}`).join('');
		const query = `
      CREATE (n${labelsString} $properties)
      RETURN n
    `;

		return this.executeQuery(query, { properties }, database);
	}

	/**
	 * Creates a relationship between two nodes in the graph.
	 * @param startNodeId - ID of the source node
	 * @param endNodeId - ID of the target node
	 * @param type - Type of relationship to create
	 * @param properties - Optional properties to set on the relationship
	 * @param database - Optional database name
	 * @returns Promise resolving to the created relationship data
	 */
	async createRelationship(
		startNodeId: string,
		endNodeId: string,
		type: string,
		properties: Record<string, any> = {},
		database?: string,
	) {
		const query = `
      MATCH (a), (b)
      WHERE id(a) = toInteger($startNodeId) AND id(b) = toInteger($endNodeId)
      CREATE (a)-[r:${type} $properties]->(b)
      RETURN a, r, b
    `;

		return this.executeQuery(
			query,
			{ startNodeId, endNodeId, properties },
			database,
		);
	}

	/**
	 * Finds nodes in the graph that match the specified labels and properties.
	 * @param labels - Array of labels to match
	 * @param properties - Properties to match against
	 * @param database - Optional database name
	 * @returns Promise resolving to matched nodes
	 */
	async findNodes(
		labels: string[],
		properties: Record<string, any> = {},
		database?: string,
	) {
		const labelsString = labels.map((label) => `:${label}`).join('');
		const query = `
      MATCH (n${labelsString})
      WHERE ALL(key IN keys($properties) WHERE n[key] = $properties[key])
      RETURN n
    `;

		return this.executeQuery(query, { properties }, database);
	}

	/**
	 * Transforms Neo4j-specific value types to JavaScript native types.
	 * Handles Neo4j integers, temporal types, nodes, relationships, and nested objects.
	 * @param value - Value to transform
	 * @returns Transformed value
	 * @private
	 */
	private transformValue(value: any): any {
		if (neo4j.isInt(value)) {
			return value.toNumber();
		} else if (
			neo4j.isDate(value) ||
			neo4j.isDateTime(value) ||
			neo4j.isTime(value) ||
			neo4j.isLocalTime(value) ||
			neo4j.isLocalDateTime(value) ||
			neo4j.isDuration(value)
		) {
			return value.toString();
		} else if (neo4j.isNode(value)) {
			return {
				id: value.identity.toString(),
				labels: value.labels,
				properties: this.transformProperties(value.properties),
			};
		} else if (neo4j.isRelationship(value)) {
			return {
				id: value.identity.toString(),
				type: value.type,
				properties: this.transformProperties(value.properties),
				startNodeId: value.start.toString(),
				endNodeId: value.end.toString(),
			};
		} else if (Array.isArray(value)) {
			return value.map((v) => this.transformValue(v));
		} else if (value !== null && typeof value === 'object') {
			return this.transformProperties(value);
		}

		return value;
	}

	/**
	 * Transforms all property values in an object using transformValue.
	 * @param properties - Object with properties to transform
	 * @returns New object with transformed properties
	 * @private
	 */
	private transformProperties(
		properties: Record<string, any>,
	): Record<string, any> {
		const result: Record<string, any> = {};

		for (const key in properties) {
			if (Object.prototype.hasOwnProperty.call(properties, key)) {
				result[key] = this.transformValue(properties[key]);
			}
		}

		return result;
	}
}
