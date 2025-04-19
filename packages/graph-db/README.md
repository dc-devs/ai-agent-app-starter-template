# Graph Database (Neo4j) Module

This package provides a simple client for interacting with Neo4j graph databases.

## Setup

### Prerequisites

- Docker and Docker Compose
- Node.js (or Bun)
- TypeScript

### Installation

```bash
# Install dependencies
bun install
```

### Running Neo4j

The package includes a Docker Compose configuration to run Neo4j:

```bash
# Start Neo4j database
docker-compose up -d

# Stop Neo4j database
docker-compose down

# Stop and remove volumes (clears all data)
docker-compose down -v
```

Once running, you can access:
- Neo4j Browser: http://localhost:7474/
- Default credentials: neo4j/password

## Usage

### Basic Example

```typescript
import { Neo4jClient } from '@ai-agent-app-starter-template/graph-db';

// Create a Neo4j client
const client = new Neo4jClient({
  url: 'bolt://localhost:7687',
  username: 'neo4j',
  password: 'password'
});

// Verify connection
await client.verifyConnectivity();

// Create nodes
const person = await client.createNode(['Person'], { name: 'John', age: 30 });

// Execute custom Cypher queries
const result = await client.executeQuery(`
  MATCH (p:Person)
  WHERE p.name = $name
  RETURN p
`, { name: 'John' });

// Don't forget to close the connection when done
await client.close();
```

### Run Example

```bash
# Using Bun
bun src/examples/basic-usage.ts
```

## API Reference

- `Neo4jClient`: Main client for interacting with Neo4j
  - `constructor(config: Neo4jConfig)`: Create a new client
  - `verifyConnectivity()`: Check connection to Neo4j
  - `close()`: Close the connection
  - `executeQuery(query, params, database)`: Execute a Cypher query
  - `executeTransaction(transactionFn, config, database)`: Execute a transaction
  - `createNode(labels, properties, database)`: Create a node
  - `createRelationship(startNodeId, endNodeId, type, properties, database)`: Create a relationship
  - `findNodes(labels, properties, database)`: Find nodes by labels and properties

## Development

```bash
# Build the package
bun run build

# Run tests
bun run test:unit
```
