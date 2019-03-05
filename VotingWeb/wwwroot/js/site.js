﻿var pollName = window.location.pathname.split('/').filter(function (x) { return x !== ""; }).pop();
var app = angular.module('VotingApp', ['ui.bootstrap']);
app.run(function () { });

app.controller('VotingAppController', ['$rootScope', '$scope', '$http', '$timeout', '$location', function ($rootScope, $scope, $http, $timeout, $location) {

    $scope.refresh = function () {
        $http.get('http://' + window.location.host +'/api/Votes/' + pollName + '?c=' + new Date().getTime())
            .then(function (data, status) {
                $scope.votes = data;
            }, function (data, status) {
                $scope.votes = undefined;
            });
    };

    $scope.remove = function (item) {
        $http.delete('http://' + window.location.host + '/api/Votes/' + pollName + '/' + item)
            .then(function (data, status) {
                $scope.refresh();
            })
    };

    $scope.add = function (item) {
        var fd = new FormData();
        fd.append('item', item);
        $http.put('http://' + window.location.host + '/api/Votes/' + pollName + '/' + item, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .then(function (data, status) {
                $scope.refresh();
                $scope.item = undefined;
            })
    };
}]);