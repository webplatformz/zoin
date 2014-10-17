'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .run(function ($rootScope) {
        $rootScope.heroId = 100;
        $rootScope.missionId = 10001;
        $rootScope.lcu = 1;
    })

.controller('HeroCardCtrl', function ($scope, $rootScope, zoinAPIService) {
    $scope.init = function () {
        $scope.hero = zoinAPIService.Hero.get({
            "heroId": $rootScope.heroId
        }); // Example to filter hero according ID  
    }

    $scope.init();
    $scope.$watch('heroId', function () {
        $scope.init();
    });
})

.controller('MissionCardCtrl', function ($scope, $rootScope, zoinAPIService) {
            $scope.mission = zoinAPIService.Mission.get({
            "missionId": 1
        });
})

.controller('DashboardCtrl', function ($scope, $rootScope, $routeParams, zoinAPIService) {
    $scope.init = function () {
        $rootScope.heroId =  Number($routeParams.heroId);
        $scope.matches = zoinAPIService.Match.query({
            "heroId": $rootScope.heroId
        }, function () {
            if ($scope.matches.length > 0) {
                $scope.matches[0].mission.isActive = true;
            }
        });
        $scope.left = 180;
        $scope.leftHero = 180;

    }

    $scope.init();
    $scope.$watch('heroId', function () {
        $scope.init();
    });
    $scope.join = function (mission, zoinValue) {
        zoinAPIService.Want.save({
            "missionId": mission.id,
            "heroId": $rootScope.heroId,
            "zoins": zoinValue
        });
        $scope.init();
    }

    $scope.showMission = function (mission) {
        $scope.matches.forEach(function (element) {
            element.mission.isActive = false;
        });
        mission.isActive = true;
    }

    $scope.moveLeft = function () {
        $scope.left = $scope.left + 200;
    }

    $scope.moveRight = function () {
        $scope.left = $scope.left - 200;
    }

})

.controller('MissionsCtrl', function ($scope, $rootScope, $routeParams, zoinAPIService) {
    
    
    $scope.init = function () {
        $rootScope.lcu = Number($routeParams.lcu);

        $scope.missions = zoinAPIService.MissionByLcu.query({
            "lcuId": $rootScope.lcu
        });

        $scope.left = 180;
        $scope.leftHero = 180;

    }
    
    $scope.updateHeroes = function(missionId) {
        $scope.matches = zoinAPIService.Match.query({
            "missionId": missionId
        });
    }

    $scope.init();

    $scope.moveLeft = function () {
        $scope.left = $scope.left + 200;
    }

    $scope.moveRight = function () {
        $scope.left = $scope.left - 200;
    }

    $scope.moveLeftHero = function () {
        $scope.leftHero = $scope.leftHero + 200;
    }

    $scope.moveRightHero = function () {
        $scope.leftHero = $scope.leftHero - 200;
    }
    $scope.moveLeft = function() {
        $scope.left = $scope.left + 200;
    }

    $scope.moveRight = function() {
        $scope.left = $scope.left - 200;
    }
});