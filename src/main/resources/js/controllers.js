'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

.controller('HeroCardCtrl', function ($scope, zoinAPIService) {
    $scope.hero = zoinAPIService.Hero.get({"heroId": "931"}); // Example to filter hero according ID    
})

.controller('MissionCardCtrl', function ($scope, zoinAPIService) {
    $scope.mission = zoinAPIService.Mission.get({"missionId": "1"});
})

.controller('DashboardCtrl', function ($scope, zoinAPIService) {
    $scope.missions = zoinAPIService.Mission.query();
    $scope.match = zoinAPIService.Match.query({"heroId": "931"});
    
    $scope.showMission = function(mission) {
        mission.isActive = true;
    }
})

.controller('ApiCtrl', function ($scope) {
    
});