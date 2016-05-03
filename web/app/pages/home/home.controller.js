/*
 * Copyright 2003-2016 Monitise Group Limited. All Rights Reserved.
 *
 * Save to the extent permitted by law, you may not use, copy, modify,
 * distribute or create derivative works of this material or any part
 * of it without the prior written consent of Monitise Group Limited.
 * Any reproduction of this material must contain this notice.
 */

angular.module("arkham").controller("homeController",
    ["homeHelperFactory", "objectUtil", "$scope", "mapHelper",
        function (homeHelperFactory, objectUtil, $scope, mapHelper) {
            "use strict";

            var self = this;

            this.istanbulCoords = {
                "lat": 41.11,
                "long": 29.01
            };


            this.markerList = $scope.markerList;
            this.selectedMarker = null;
            this.selectedMarkerData = null;
            this.detailsVisible = false;


            $scope.$on("listChanged", function () {
                console.log("list change event");
                if (self.selectedMarker) {
                    self.selectedMarkerData = objectUtil.findByObjectProperty($scope.markerList, "_id", self.selectedMarker);
                    if (self.selectedMarkerData){
                        populateCustomers();
                        mapHelper.selectMarker(self.selectedMarkerData);
                    }

                }
            });

            this.markerClickCallback = function () {
                self.markerList = $scope.markerList;
                self.selectedMarker = this.index;
                self.selectedMarkerData = objectUtil.findByObjectProperty($scope.markerList, "_id", self.selectedMarker);
                //$scope.$apply();

                if (self.selectedMarkerData){
                    populateCustomers();
                    mapHelper.selectMarker(self.selectedMarkerData);
                }

               // mapHelper.init(null, self.markerList, true, self.selectedMarker);
                self.detailsVisible = true;
            };

            function populateCustomers() {
                var customers = [{id: "Ahmet Tasyurek", active: true}, {id: "Mehmet Tasasiz", active: true},
                    {id: "Buse Gergin", active: true}, {id: "Zeynep Aslan", active: true}];

                if(!self.selectedMarkerData._source.customers) {
                    self.selectedMarkerData._source.customers = customers;
                } else if (self.selectedMarkerData._source.customers[0].id === 1) {
                    self.selectedMarkerData._source.customers[0].id = "Alper Cem Polat";
                }
            }

            var homeHelper = homeHelperFactory.newInstance(self);

            homeHelper.init();


            // TODO
        }
    ]
);