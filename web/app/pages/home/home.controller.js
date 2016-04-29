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
            this.selectedMarker = "201";
            this.selectedMarkerData = null;
            this.detailsVisible = false;

            this.markerClickCallback = function () {
                //TODO change code to index prop that will be given by mw
                self.selectedMarker = this.index;
                self.selectedMarkerData = objectUtil.findByObjectProperty(self.markerList, "_id", self.selectedMarker);
                $scope.$apply();

                mapHelper.init(null, self.markerList, true, self.selectedMarker);
                self.detailsVisible = true;
            };

            var homeHelper = homeHelperFactory.newInstance(self);

            homeHelper.init();


            // TODO
        }
    ]
);