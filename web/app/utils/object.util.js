/*
 * Copyright 2003-2016 Monitise Group Limited. All Rights Reserved.
 *
 * Save to the extent permitted by law, you may not use, copy, modify,
 * distribute or create derivative works of this material or any part
 * of it without the prior written consent of Monitise Group Limited.
 * Any reproduction of this material must contain this notice.
 */

angular.module("arkham").service("objectUtil",
    [
        function () {
            "use strict";

            this.findByObjectProperty = function (array, property, value) {
                var arrLen = array.length;
                var obj = null;

                for (var objIndex = 0; objIndex < arrLen; objIndex++) {
                    var currObj = array[objIndex];
                    if (currObj.hasOwnProperty(property) && currObj[property] === value) {
                        obj = currObj;
                    }
                }

                return obj;
            };
        }
    ]
);
