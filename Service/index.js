class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight }); // Since it's an undirected graph
    }

    dijkstraShortestPath(start, end) {
        const distances = {};
        const priorityQueue = new PriorityQueue();
        const previous = {};
        let shortestPath = [];

        // Initialize distances
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                priorityQueue.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                priorityQueue.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }

        // Main loop of Dijkstra's algorithm
        while (priorityQueue.values.length) {
            let smallest = priorityQueue.dequeue().val;
            console.log(`Visiting node: ${smallest}, current shortest distance: ${distances[smallest]}`);

            // If we reached the destination, build the path
            if (smallest === end) {
                while (previous[smallest]) {
                    shortestPath.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }

            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;

                    if (candidate < distances[nextNeighbor]) {
                        distances[nextNeighbor] = candidate;
                        previous[nextNeighbor] = smallest;
                        priorityQueue.enqueue(nextNeighbor, candidate);
                        console.log(`Updating distance of ${nextNeighbor} to ${candidate}`);
                    }
                }
            }
        }

        return shortestPath.concat(start).reverse();
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

// Simulate Requests from Passengers and Driver
const locations = {
    driver: "D",
    passenger1: "P1",
    passenger2: "P2",
    passenger3: "P3",
    destination: "Dest"
};

function showRequest(driver, passengers) {
    passengers.forEach((passenger) => {
        console.log(`${passenger} has requested a ride.`);
    });

    console.log(`Driver ${driver} is calculating the shortest route.`);
}

// Helper function to find the shortest route that includes passengers
function findShortestRouteWithPassengers(graph, driver, passengers, destination) {
    let currentLocation = driver;
    let route = [driver];
    
    passengers.forEach((passenger) => {
        let nextLeg = graph.dijkstraShortestPath(currentLocation, passenger);
        route = route.concat(nextLeg.slice(1));  // Avoid repeating the current location
        currentLocation = passenger;
    });

    // Finally, go to the destination
    let finalLeg = graph.dijkstraShortestPath(currentLocation, destination);
    route = route.concat(finalLeg.slice(1));

    return route;
}

// Main function to calculate the shortest route
function calculateShortestRoute() {
    let graph = new Graph();

    // Add locations (driver, passengers, destination)
    Object.values(locations).forEach((loc) => graph.addVertex(loc));

    // Add edges between locations (representing the distances)
    graph.addEdge("D", "P1", 5);
    graph.addEdge("D", "P2", 10);
    graph.addEdge("D", "P3", 8);
    graph.addEdge("P1", "P2", 3);
    graph.addEdge("P1", "P3", 7);
    graph.addEdge("P2", "P3", 2);
    graph.addEdge("P3", "Dest", 4);
    graph.addEdge("P2", "Dest", 6);
    graph.addEdge("P1", "Dest", 9);

    // Simulate passengers requesting a ride
    let passengers = ["P1", "P2", "P3"];
    showRequest(locations.driver, passengers);

    // Find the shortest route for the driver with all passengers
    const shortestRoute = findShortestRouteWithPassengers(graph, locations.driver, passengers, locations.destination);

    console.log("Shortest Route for the Driver: ", shortestRoute.join(" -> "));
}

// Run the program
calculateShortestRoute();