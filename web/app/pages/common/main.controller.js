/*
 * Copyright 2003-2016 Monitise Group Limited. All Rights Reserved.
 *
 * Save to the extent permitted by law, you may not use, copy, modify,
 * distribute or create derivative works of this material or any part
 * of it without the prior written consent of Monitise Group Limited.
 * Any reproduction of this material must contain this notice.
 */

angular.module("arkham").controller("mainController",
    ["$http", "$scope", "mapHelper",
        function ($http, $scope, mapHelper) {
            "use strict";

            var self = this;

            /*var response = {
                "took":4,
                "timed_out":false,
                "_shards":{
                    "total":5,
                    "successful":5,
                    "failed":0
                },
                "hits":{
                    "total":5,
                    "max_score":6.3911667,
                    "hits":[
                        {
                            "_index":"branches",
                            "_type":"branch",
                            "_id":"521",
                            "_score":6.3911667,
                            "_source":{
                                "name":"Zekeriyaköy Şubesi",
                                "code":"370",
                                "address":"VİŞNE 2 MAHALLESİ 4.CADDE KAPALIÇARŞI NO:27-15\nZEKERİYAKÖY",
                                "ilce":"SARIYER",
                                "il":"İSTANBUL",
                                "kod":"34",
                                "tel":"(850) 204 03 70",
                                "fax":"(216) 636 33 70",
                                "hs":"H",
                                "bolge":"2",
                                "xcoor":"29.0224",
                                "ycoor":"41.2087",
                                "sube_grpkod":"002",
                                "bnkkod":"32",
                                "capacity":3,
                                "customerCount":5
                            }
                        },
                        {
                            "_index":"branches",
                            "_type":"branch",
                            "_id":"97",
                            "_score":6.281105,
                            "_source":{
                                "name":"Beykent Üniversitesi Şubesi",
                                "code":"663",
                                "address":"T.C BEYKENT ÜNİVERSİTESİ AYAZAĞA KAMPÜSÜ AYAZAĞA\nMAHALLESİ HADIMKORU CADDESİ NO:19A",
                                "ilce":"SARIYER",
                                "il":"İSTANBUL",
                                "kod":"34",
                                "tel":"(850) 204 06 63",
                                "fax":"(216) 636 52 71",
                                "hs":"H",
                                "bolge":"2",
                                "xcoor":"29.0037",
                                "ycoor":"41.117",
                                "sube_grpkod":"002",
                                "bnkkod":"32",
                                "capacity":2,
                                "customerCount":1
                            }
                        },
                        {
                            "_index":"branches",
                            "_type":"branch",
                            "_id":"362",
                            "_score":6.254468,
                            "_source":{
                                "name":"Maslak Şubesi",
                                "code":"129",
                                "address":"REŞİTPAŞA MAHALLESİ ESKİ BÜYÜKDERE CADDESİ NO:14/A",
                                "ilce":"SARIYER",
                                "il":"İSTANBUL",
                                "kod":"34",
                                "tel":"(850) 204 01 29",
                                "fax":"(216) 636 35 70",
                                "hs":"H",
                                "bolge":"2",
                                "xcoor":"29.0178",
                                "ycoor":"41.1084",
                                "sube_grpkod":"002",
                                "bnkkod":"32",
                                "capacity":5,
                                "customerCount":18
                            }
                        },
                        {
                            "_index":"branches",
                            "_type":"branch",
                            "_id":"424",
                            "_score":5.993916,
                            "_source":{
                                "name":"Sarıyer Şubesi",
                                "code":"201",
                                "address":"SARIYER MERKEZ MAHALLESİ,YENİ MAHALLE CADDESİ, NO:19\n",
                                "ilce":"SARIYER",
                                "il":"İSTANBUL",
                                "kod":"34",
                                "tel":"(850) 204 02 01",
                                "fax":"(216) 636 36 38",
                                "hs":"H",
                                "bolge":"2",
                                "xcoor":"29.0574",
                                "ycoor":"41.1689",
                                "sube_grpkod":"002",
                                "bnkkod":"32",
                                "capacity":14,
                                "customerCount":40
                            }
                        },
                        {
                            "_index":"branches",
                            "_type":"branch",
                            "_id":"511",
                            "_score":5.993916,
                            "_source":{
                                "name":"Yeniköy Şubesi",
                                "code":"251",
                                "address":"YENİKÖY MAH.KÖYBAŞI CADDESİ NO:51 YENİKÖY\n\n",
                                "ilce":"SARIYER",
                                "il":"İSTANBUL",
                                "kod":"34",
                                "tel":"(850) 204 02 51",
                                "fax":"(216) 636 34 74",
                                "hs":"H",
                                "bolge":"2",
                                "xcoor":"29.071",
                                "ycoor":"41.1227",
                                "sube_grpkod":"002",
                                "bnkkod":"32",
                                "capacity":11,
                                "customerCount":35
                            }
                        }
                    ]
                }
            };*/


            var response;

            $scope.markerList = [];
            $scope.filter = {};
            $scope.onFilterClick = function () {
                var il = $scope.filter.il || null;
                var ilce = $scope.filter.ilce || null;
                console.log("lalala");
               makeRequest(il, ilce, $scope.filter.minDensity);
            };

            function makeRequest(il, ilce, minDensity) {
                var data = {
                    "il" : il,
                    "ilce": ilce
                };

                if (minDensity) data.density = minDensity;
                var req = {
                    url: "http://10.58.4.135:8080/api/density",
                    method: "POST",
                    data: data
                };

                $http(req).success(function(resp){
                    response = resp;
                    $scope.markerList = response.hits.hits;
                    mapHelper.init(null, $scope.markerList);
                }).error(function(resp){
                    response = resp;
                });
            }


        }
    ]
);