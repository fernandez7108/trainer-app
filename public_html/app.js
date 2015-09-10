/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
 
var trainersApp = angular.module('trainersApp', ['ui.router','assessmentControllerModule']);
trainersApp.controller('mainController',['$scope','$location', 'saveTab', function($scope,$location,saveTab){
    $scope.newClient = function(){
        saveTab.setTab({link: "#/contact", label: "Contact Info"})
        $location.path('/contact');
    }
}]);
trainersApp.controller('getTabs', ['$scope', '$location', 'saveTab', function($scope, $location, saveTab){
    $scope.tabBuilder = function(){
         $scope.tabs = [
            { link : '#/home', label : 'Home' },
            { link : '#/assessment', label : 'Assessment' },
            { link : '#/calendar', label : 'Calendar' },
            { link : '#/contact', label : 'Contact Info' },
            { link : '#/goal', label : 'Goal' },
            { link : '#/program', label : 'Program' }
          ]; 
        
        $scope.currentPath = $location.path();
        $scope.selectedTab = saveTab.setTab();
        console.log(saveTab.setTab())
        if($scope.selectedTab === undefined){
            console.log("am i here")
            $scope.selectedTab = $scope.tabs[0];  
        }
        $scope.setSelectedTab = function(tab) {
            $scope.selectedTab = tab;
            saveTab.setTab(tab);
        };
        $scope.tabClass = function(tab) {
            if ($scope.selectedTab.label === tab.label) {
                return "active";
            } 
            else {
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
    $urlRouterProvider.otherwise("/home");
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
trainersApp.service('saveTab', function(){ 
        var tab = {};
        var savedTab;
        tab.setTab = function(selectedTab){
            if(selectedTab){
                savedTab = selectedTab;
            }
            return savedTab;
        }
        return tab;
});