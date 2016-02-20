module.exports = (function Persistence() {
	var Map = require('../shared/map.js');
	var maps = {};
	// Only one map at the time by now...
	maps[1] = new Map();

	this.createMap = function(map) {
		maps[map.id] = new Map();
		return map;
	};

	this.createMarker = function(marker) {
		return maps[marker.mapId].createMarker(marker);
	};

	this.updateMarker = function(marker) {
		return maps[marker.mapId].updateMarker(marker);
	};

	this.deleteMarker = function(marker) {
		return maps[marker.mapId].deleteMarker(marker);
	};

	/**
	 * Removes all markers from a given socket and
	 * returns a list with the deleted markers.
	 */
	this.removeClient = function(socket) {
		return maps[1].readMarkers().map(function(marker) {
			if (marker.socketId === socket.id) {
				maps[1].deleteMarker(marker);
				return marker;
			}
		});
	};

	/**
	 * Returns all markers from a map.
	 */
	this.getAll = function(mapId) {
		return maps[mapId].readMarkers();
	};

	return this;
})();
