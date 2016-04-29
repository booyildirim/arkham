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
            var regionLevel;

            var icons = {
                CITY_LEVEL: {
                    EMPTY: {
                        url: "assets/pins/city/empty.png",
                        scaledSize: new google.maps.Size(10, 10)
                    },
                    MEDIUM: {
                        url: "assets/pins/city/medium.png",
                        scaledSize: new google.maps.Size(10, 10)
                    },
                    BUSY: {
                        url: "assets/pins/city/busy.png",
                        scaledSize: new google.maps.Size(10, 10)
                    }
                },
                REGION_LEVEL: {
                    EMPTY: {
                        url: "assets/pins/region/empty.png",
                        scaledSize: new google.maps.Size(22, 32)
                    },
                    MEDIUM: {
                        url: "assets/pins/region/medium.png",
                        scaledSize: new google.maps.Size(22, 32)
                    },
                    BUSY: {
                        url: "assets/pins/region/busy.png",
                        scaledSize: new google.maps.Size(22, 32)
                    }
                },
                SELECTED: {
                    EMPTY: {
                        url: "assets/pins/region/empty.png",
                        scaledSize: new google.maps.Size(44, 62)
                    },
                    MEDIUM: {
                        url: "assets/pins/region/medium.png",
                        scaledSize: new google.maps.Size(44, 62)
                    },
                    BUSY: {
                        url: "assets/pins/region/busy.png",
                        scaledSize: new google.maps.Size(44, 62)
                    }
                }
            };


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
                for (var markerIndex in markerObjects) {
                    if (markerObjects.hasOwnProperty(markerIndex)) {
                        markerObjects[markerIndex].setMap(null);
                    }
                }
                markerObjects = {};
            }

            function determineMarkerIcon(density, isMarkerSelected) {
                var markerStatus;
                var markerLevel;
                //TODO icon
                if (density <= 0.33) {
                    markerStatus = "EMPTY";
                } else if (density <= 0.66) {
                    markerStatus = "MEDIUM";
                } else {
                    markerStatus = "BUSY";
                }

                if (isMarkerSelected){
                    markerLevel = "SELECTED";
                }else if (regionLevel) {
                    markerLevel = "REGION_LEVEL";
                } else {
                    markerLevel = "CITY_LEVEL";
                }

                return icons[markerLevel][markerStatus];
            }

            function initializeMarkers(selectedMarker) {

                var markerListLength = markerList.length;
                var isMarkerSelected;

                var markerOptions = {
                    map: map
                };

                if (selectedMarker || regionLevel) {
                    map.setZoom(15);
                }

                for (var markerIndex = 0; markerIndex < markerListLength; markerIndex++) {
                    var markerData = markerList[markerIndex];

                    isMarkerSelected = (selectedMarker === markerData._id);

                    markerOptions.position = new google.maps.LatLng(markerData._source.ycoor, markerData._source.xcoor);
                    markerOptions.index = markerData._id;
                    markerOptions.title = markerData._source.name;

                    markerOptions.icon = determineMarkerIcon(markerData._source.load, isMarkerSelected);

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


            this.init = function (mapComponent, list, _regionLevel, selectedMarker) {
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
                } else if (markerList) {
                    markerList = list;
                    regionLevel = _regionLevel;
                    clearMarkers();
                    initializeMarkers(selectedMarker);
                }
            };


        }

    ]
);
