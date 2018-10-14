var ws = new WebSocket("ws://localhost:1337/");

ws.onopen = function(event) {
	ws.send("open connection");
}

ws.onmessage = function(event) {
	console.log("Server message: ", event.data);
}

ws.onerror = function(event) {
	console.log("Server error message: ", event.data);
}
