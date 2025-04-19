import { Neo4jClient } from '@graph-db/neo4j';

/**
 * Example demonstrating how to use the Neo4j client for graph database operations.
 *
 * This example shows:
 * 1. Connecting to a Neo4j database
 * 2. Creating nodes with labels and properties
 * 3. Creating relationships between nodes
 * 4. Querying the graph database
 * 5. Proper cleanup of resources
 */
async function main() {
	// Create client instance
	const client = new Neo4jClient({
		url: 'bolt://localhost:7687',
		username: 'neo4j',
		password: 'password',
	});

	try {
		// Verify connection
		const isConnected = await client.verifyConnectivity();
		console.log('Connected to Neo4j:', isConnected);

		if (!isConnected) {
			console.error(
				'Could not connect to Neo4j. Make sure the database is running.',
			);
			return;
		}

		// Clean database for test
		console.log('Cleaning up database for fresh test...');
		await client.executeQuery('MATCH (n) DETACH DELETE n');

		// Create Person nodes
		console.log('Creating Person nodes...');
		const alice = await client.createNode(['Person'], {
			name: 'Alice',
			age: 30,
		});
		const bob = await client.createNode(['Person'], {
			name: 'Bob',
			age: 32,
		});

		console.log('Alice:', alice.records[0].n);
		console.log('Bob:', bob.records[0].n);

		// Create KNOWS relationship
		console.log('Creating KNOWS relationship...');
		const aliceId = alice.records[0].n.id;
		const bobId = bob.records[0].n.id;

		const relationship = await client.createRelationship(
			aliceId,
			bobId,
			'KNOWS',
			{ since: 2020 },
		);

		// Log the relationship creation result
		console.log(
			'Relationship created:',
			relationship.summary.query.parameters.startNodeId,
			'-[KNOWS]->',
			relationship.summary.query.parameters.endNodeId,
			'with properties:',
			relationship.summary.query.parameters.properties,
		);

		// Query the graph to verify the relationship was created
		console.log('Querying the graph to verify relationship...');

		// First, let's check all relationships in the database
		const allRelationships = await client.executeQuery(
			`
      MATCH (p)-[r]->(friend)
      RETURN p, r, friend
      LIMIT 5
    `,
		);

		console.log('All relationships in database:');
		if (allRelationships.records.length > 0) {
			allRelationships.records.forEach((record) => {
				const source = record.p.labels.includes('Person')
					? record.p.properties.name
					: `Node(${record.p.id})`;
				const target = record.friend.labels.includes('Person')
					? record.friend.properties.name
					: `Node(${record.friend.id})`;
				console.log(`${source} -[${record.r.type}]-> ${target}`);
			});
		} else {
			console.log('No relationships found in database');
		}

		// Now try the specific relationship
		const result = await client.executeQuery(
			`
      MATCH (p:Person)-[r:KNOWS]->(friend:Person)
      WHERE p.name = $name
      RETURN p, r, friend
    `,
			{ name: 'Alice' },
		);

		console.log('\nAlice relationships:');
		if (result.records.length > 0) {
			result.records.forEach((record) => {
				console.log(
					`${record.p.properties.name} -[${record.r.type}]-> ${record.friend.properties.name} since ${record.r.properties.since}`,
				);
			});
		} else {
			console.log('No relationships found for Alice');
		}

		// Find nodes by properties
		console.log('Finding Person nodes with age over 30...');
		const query = `
      MATCH (p:Person)
      WHERE p.age > $minAge
      RETURN DISTINCT p
    `;

		const people = await client.executeQuery(query, { minAge: 30 });

		console.log('People over 30:');
		people.records.forEach((record) => {
			console.log(
				`${record.p.properties.name}, Age: ${record.p.properties.age}`,
			);
		});
	} catch (error) {
		console.error('Error:', error);
	} finally {
		// Close the driver
		await client.close();
	}
}

/**
 * Entry point for the example when run directly.
 * Run with: bun src/examples/basic-usage.ts
 */
if (require.main === module) {
	main().catch(console.error);
}
