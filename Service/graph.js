const vertexData = ['A', 'B', 'C', 'D'];

const adjacencyMatrix = [
    [{
        "name": "Sufyan",
        "pickup": "saddaar",
        "destination": "Johar",
        "time": "2024-10-14T12:00:00Z",
        "matchPercentage": "90% match"
    },
    {
        "name": "Faizan",
        "pickup": "Azizabad",
        "destination": "Baloch colony",
        "time": "2024-10-14T12:15:00Z",
        "matchPercentage": "60% match"
    }], // Edges for A
    [{
        "name": "John Doe",
        "pickup": "ftc",
        "destination": "lalkoti",
        "time": "2024-10-14T12:00:00Z",
        "matchPercentage": "90% match"
    },{
            "name": "mushtaq",
        "pickup": "Johar",
        "destination": "Korangi",
        "time": "2024-10-14T12:00:00Z",
        "matchPercentage": "90% match"
    }],  // Edges for B
      // Edges for C
      // Edges for D
];

function printAdjacencyMatrix(matrix) {
    console.log("\nAdjacency Matrix:");
    matrix.forEach(row => {
        console.log(row);
    });
}

console.log('vertexData:', vertexData);
printAdjacencyMatrix(adjacencyMatrix);

// Helper function to convert ISO date strings to JavaScript Date objects
function parseTime(timeString) {
    return new Date(timeString).getTime(); // Convert to milliseconds for easier comparison
}

// Dijkstra's algorithm implementation
function dijkstraShortestPath(source, target) {
    const distances = {}; // Holds shortest distance to each vertex
    const visited = {}; // Tracks visited nodes
    const previous = {}; // Tracks the previous node in the optimal path

    // Initialize distances and visited
    vertexData.forEach((vertex) => {
        distances[vertex] = Infinity; // Start with infinite distance
        visited[vertex] = false; // None are visited at the start
        previous[vertex] = null; // No previous nodes initially
    });

    distances[source] = 0; // Distance to source is zero

    const vertices = [...vertexData];

    while (vertices.length > 0) {
        // Pick the vertex with the smallest known distance
        let closestVertex = null;
        vertices.forEach(vertex => {
            if (!visited[vertex]) {
                if (closestVertex === null || distances[vertex] < distances[closestVertex]) {
                    closestVertex = vertex;
                }
            }
        });

        // Mark the closest vertex as visited
        visited[closestVertex] = true;

        // Get neighbors and update their distances
        if (Array.isArray(adjacencyMatrix[vertexIndex])) {
            adjacencyMatrix[vertexIndex].forEach(edge => {
                const [neighbor, weight] = edge;
                if (!visited[neighbor]) {
                    const newDistance = distances[currentVertex] + weight;
                    if (newDistance < distances[neighbor]) {
                        distances[neighbor] = newDistance;
                    }
                }
            }); // Calculate weight based on time
            // Only consider if the neighbor hasn't been visited
            if (!visited[neighbor]) {
                const newDistance = distances[closestVertex] + weight;
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previous[neighbor] = closestVertex;
                }
            }
        };

        // Remove the closest vertex from the vertices to explore
        vertices.splice(vertices.indexOf(closestVertex), 1);
    }

    // Reconstruct the shortest path
    const path = [];
    let currentNode = target;
    while (currentNode) {
        path.unshift(currentNode); // Add each node to the path, starting from the target
        currentNode = previous[currentNode];
    }

    return { path, distance: distances[target] };
}

// Example usage:
const sourceVertex = 'A';
const targetVertex = 'B';
const shortestPath = dijkstraShortestPath(sourceVertex, targetVertex);
console.log(`Shortest path from ${sourceVertex} to ${targetVertex}:`, shortestPath.path);
console.log(`Distance: ${shortestPath.distance}`);
