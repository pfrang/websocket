const connections = new Set<Bun.ServerWebSocket<unknown>>();

const server = Bun.serve({
  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
      // Bun automatically returns a 101 Switching Protocols
      // if the upgrade succeeds
      return undefined;
    }

    // handle HTTP request normally
    return new Response("Hello world!");
  },
  websocket: {
    async open(ws) {
      console.log("WebSocket connection opened");
      connections.add(ws);
    },
    async close(ws) {
      console.log("WebSocket connection closed");
      connections.delete(ws);
    },
    // this is called when a message is received
    async message(ws, message) {
      // send back a message
      connections.forEach((conn) => {
        if (conn !== ws) {
          conn.send(message);
        }
      });
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
