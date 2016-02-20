var RTmap = function(socket, mapId, googleMap, Map, google) {
	var map = new Map();

	socket.emit('subscribe_map', {
		mapId: mapId,
	});

	socket.on('flush', onFlush);
	socket.on('create_marker', onCreateMarker);
	socket.on('update_marker', onUpdateMarker);
	socket.on('delete_marker', onDeleteMarker);

	function onFlush(markerList) {
		markerList.forEach(function(marker) {
			onCreateMarker(marker);
		});
	}


	function onCreateMarker(marker) {
		map.createMarker(_markerToGoogleMarker(marker));
	}

	function onDeleteMarker(marker) {
		map.getMarker(marker.socketId, marker.localId).setMap(null);
		map.deleteMarker(marker);
	}

	function onUpdateMarker(marker) {
		map.getMarker(marker.socketId, marker.localId).setPosition(new google.maps.LatLng(marker.pos[0], marker.pos[1]));
	}


	function _markerToGoogleMarker(marker) {
		return new google.maps.Marker({
			position: new google.maps.LatLng(marker.pos[0], marker.pos[1]),
			mapId: marker.mapId,
			localId: marker.localId,
			socketId: marker.socketId,
			map: googleMap,
			params: marker.params,
		});
	}

	return this;
};
