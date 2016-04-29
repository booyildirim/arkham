/*
 * Copyright 2003-2016 Monitise Group Limited. All Rights Reserved.
 *
 * Save to the extent permitted by law, you may not use, copy, modify,
 * distribute or create derivative works of this material or any part
 * of it without the prior written consent of Monitise Group Limited.
 * Any reproduction of this material must contain this notice.
 */

angular.module("arkham").service("mapHelper",
    [
        function () {
            "use strict";

            var map;
            var markerList;
            var markerClickCallback;
            var mapBounds = new google.maps.LatLngBounds();
            var markerObjects = {};

            function setMapStyle() {
                var styles = [
                    {
                        stylers: [
                            {hue: "#00ffe6"},
                            {saturation: -20}
                        ]
                    }, {
                        featureType: "road",
                        elementType: "geometry",
                        stylers: [
                            {lightness: 100},
                            {visibility: "simplified"}
                        ]
                    }, {
                        featureType: "road",
                        elementType: "labels",
                        stylers: [
                            {visibility: "off"}
                        ]
                    }
                ];

                map.setOptions({styles: styles});
            }

            function clearMarkers() {
                for(var markerIndex in markerObjects) {
                    markerObjects[markerIndex].setMap(null);
                }
                markerObjects = {};
            }

            function initializeMarkers() {

                var markerListLength = markerList.length;

                //TODO icon
                var markerOptions = {
                    map: map
                };

                for (var markerIndex = 0; markerIndex < markerListLength; markerIndex++) {
                    var markerData = markerList[markerIndex];

                    markerOptions.position = new google.maps.LatLng(markerData._source.ycoor, markerData._source.xcoor);
                    markerOptions.index = markerData._id; //TODO change with id
                    markerOptions.title = markerData._source.name;

                    addMarker(markerOptions, markerClickCallback, mapBounds, markerObjects);
                }

                //  map.fitBounds(mapBounds);
            }

            function addMarker(markerOptions, markerCallback, mapBounds, markerObjects) {
                var marker = new google.maps.Marker(markerOptions);


                var markerPosition = markerOptions.position;

                if (!mapBounds.contains(markerPosition)) {
                    mapBounds.extend(markerPosition);
                }

                markerObjects[markerOptions.index] = marker;

                if (markerCallback) {
                    google.maps.event.addListener(marker, "click", markerCallback);
                }
            }


            this.init = function (mapComponent, list) {
                if (mapComponent) {
                    var mapOptions = {
                        "center": new google.maps.LatLng(mapComponent.coords.lat, mapComponent.coords.long),
                        "zoom": 9
                    };

                    markerList = mapComponent.markerList;
                    map = new google.maps.Map(mapComponent.mapDiv, mapOptions);
                    setMapStyle();
                    markerClickCallback = mapComponent.markerCallback;

                    google.maps.event.addListenerOnce(map, "idle", function () {
                        initializeMarkers();
                    });
                } else if (markerList){
                    markerList = list;
                    clearMarkers();
                    initializeMarkers();
                }
            };


        }
    ]
);
