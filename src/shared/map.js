function Map() {
	var markers = {};

	this.createMarker = function(marker) {
		markers[marker.socketId + marker.localId] = marker;
		return marker;
	};

	this.updateMarker = function(marker) {
		markers[marker.socketId + marker.localId] = marker;
		return marker;
	};

	this.deleteMarker = function(marker) {
		delete markers[marker.socketId + marker.localId];
		return true;
	};

	this.readMarkers = function() {
		return Object.keys(markers).map(key => markers[key]);
	};

	this.getMarker = function(socketId, localId) {
		var localId = localId.toString();
		return markers[socketId + localId];
	};

	return this;
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Map;
}
