/*
 * Copyright 2003-2016 Monitise Group Limited. All Rights Reserved.
 *
 * Save to the extent permitted by law, you may not use, copy, modify,
 * distribute or create derivative works of this material or any part
 * of it without the prior written consent of Monitise Group Limited.
 * Any reproduction of this material must contain this notice.
 */

angular.module("arkham").directive("googleMap",
    [
        function () {
            "use strict";

            return {
                "restrict": "E",
                "replace": true,
                "controller": "mapController",
                "controllerAs": "map",
                "bindToController": true,
                "templateUrl": "components/map/map.html",
                "scope": {
                    "coords": "=",
                    "markerList": "=",
                    "markerCallback": "="
                },
                "link": function (scope, element, attribute) {



                }
            };
        }
    ]
);
