/**
 * Configuration for connecting to a Neo4j database.
 */
export interface Neo4jConfig {
	/** The connection URL for the Neo4j server (e.g., 'bolt://localhost:7687') */
	url: string;
	/** Neo4j username for authentication */
	username: string;
	/** Neo4j password for authentication */
	password: string;
	/** Optional database name to connect to. Defaults to 'neo4j' if not specified */
	database?: string;
}

/**
 * Result of a Neo4j query.
 * @template T Type of the record data
 */
export interface QueryResult<T = any> {
	/** Array of result records */
	records: T[];
	/** Summary information about the executed query */
	summary: {
		/** Details about the executed query */
		query: {
			/** The Cypher query text that was executed */
			text: string;
			/** Parameters that were passed to the query */
			parameters: Record<string, any>;
		};
		/** Time in milliseconds until the result was available (server processing time) */
		resultAvailableAfter: number;
		/** Time in milliseconds until the result was consumed (client processing time) */
		resultConsumedAfter: number;
	};
}

/**
 * Represents a node in the Neo4j graph.
 */
export interface Node {
	/** Unique identifier of the node */
	id: string;
	/** Array of labels assigned to the node */
	labels: string[];
	/** Key-value properties of the node */
	properties: Record<string, any>;
}

/**
 * Represents a relationship between nodes in the Neo4j graph.
 */
export interface Relationship {
	/** Unique identifier of the relationship */
	id: string;
	/** Type of the relationship */
	type: string;
	/** Key-value properties of the relationship */
	properties: Record<string, any>;
	/** ID of the source node (where the relationship starts) */
	startNodeId: string;
	/** ID of the target node (where the relationship ends) */
	endNodeId: string;
}

/**
 * Configuration options for Neo4j transactions.
 */
export interface TransactionConfig {
	/** Optional timeout in milliseconds for the transaction */
	timeout?: number;
	/** Optional metadata to attach to the transaction */
	metadata?: Record<string, any>;
}
