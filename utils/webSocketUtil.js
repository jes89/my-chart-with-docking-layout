const WebSocketServer = require("websocket").server;
const http = require("http");
const server = http.createServer(function(request, response) {});

server.listen(1337, function() {});

wsServer = new WebSocketServer({
	httpServer : server
});

wsServer.on("request", function(request) {
	let connection = request.accept(null, request.origin);

	connection.on("message", function(message) {
		if (message.type === "utf8") {
			console.log(message.utf8Data);
		}
	});

	connection.on("close", function(connection) {
		console.log("connection is closed");
	});
});


module.exports = wsServer;