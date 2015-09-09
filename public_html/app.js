/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
 
var trainersApp = angular.module('trainersApp', ['ui.router']);

trainersApp.controller('getTabs', ['$scope', '$location', function($scope, $location){
    $scope.tabBuilder = function(){
         $scope.tabs = [
            { link : '#/home', label : 'Home' },
            { link : '#/assessment', label : 'Assessment' },
            { link : '#/calendar', label : 'Calendar' },
            { link : '#/contact', label : 'Contact Info' },
            { link : '#/goal', label : 'Goal' },
            { link : '#/program', label : 'Program' }
          ]; 
        $scope.setTab = null;
        $scope.currentPath = $location.path();
        
        $scope.selectedTab = $scope.tabs[$scope.setTab];    
        $scope.setSelectedTab = function(tab) {
            console.log(tab)
            $scope.selectedTab = tab;
        };
        $scope.tabClass = function(tab) {
            if ($scope.selectedTab === tab) {
                return "active";
            } else {
                return "";
            } 
        };
    };
}]);
trainersApp.directive('tabsPanel', function () {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'navTabs.html',
        controller: 'getTabs',
        link : function ($scope, $location) {
            $scope.tabBuilder();
            $scope.$on('$locationChangeStart', function(event) {
                $scope.tabBuilder();
            });
        }
    };
});
trainersApp.config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise("/login");
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'source/homePage.html'
        })
        .state('assessment',{
            url: "/assessment",
            templateUrl: 'source/client/assessment/assessmentPage.html'
        })
        .state('calendar',{
            url: "/calendar",
            templateUrl: 'source/client/calendar/clientCalendar.html'
        })
        .state('contact',{
            url: "/contact",
            templateUrl: 'source/client/contactInfo/contactInfoPage.html'
        })
        .state('goal',{
            url: "/goal",
            templateUrl: 'source/client/goal/clientGoalPage.html'
        })
        .state('program',{
            url: "/program",
            templateUrl: 'source/client/program/programPage.html'
        });
    // this trick must be done so that we don't receive
    // `Uncaught Error: [$injector:cdep] Circular dependency found`
});