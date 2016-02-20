var RTClient = function(socket, mapId) {

	socket.emit('subscribe_client', {
		mapId: mapId,
	});

	this.createMarker = function(marker) {
		socket.emit('create_marker', marker);
	};

	this.updateMarker = function(marker) {
		socket.emit('update_marker', marker);
	};

	this.deleteMarker = function(marker) {
		socket.emit('delete_marker', marker);
	};

	return this;
};
