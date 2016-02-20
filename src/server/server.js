module.exports = function maps(io, persistence) {

	var socketsMap = {};
	io.sockets.on('connection', function(socket) {

		socket.on('subscribe_client', function(data) {
			socketsMap[socket.id] = data.mapId;
			socket.join(data.mapId);
		});

		socket.on('subscribe_map', function(data) {
			socketsMap[socket.id] = data.mapId;
			socket.join(data.mapId);
			socket.emit('flush', persistence.getAll(data.mapId));
		});

		socket.on('disconnect', function() {
			persistence.removeClient(socket).forEach(function(marker) {
				if (marker) {
					io.sockets.in(marker.mapId).emit('delete_marker', marker);
				}
			});
		});

		socket.on('create_marker', function(marker) {
			marker.socketId = socket.id;
			persistence.createMarker(marker);
			io.sockets.in(marker.mapId).emit('create_marker', marker);
		});

		socket.on('update_marker', function(marker) {
			marker.socketId = socket.id;
			persistence.updateMarker(marker);
			io.sockets.in(marker.mapId).emit('update_marker', marker);

		});

		socket.on('delete_marker', function(marker) {
			persistence.deleteMarker(marker);
			io.sockets.in(marker.mapId).emit('delete_marker', marker);
		});
	});
};
