/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var assessmentControllerModule = angular.module('assessmentControllerModule',[]);

assessmentControllerModule.controller('assessmentController',["$scope", function($scope){
        
        $scope.assessmentTabs = [
            {label:'Photo'},
            {label:'Measurements'},
            {label:'Movements'},
            {label:'Tracker'}
        ];
        $scope.tabIsSet = $scope.assessmentTabs[0];    
        $scope.selectedTab = function(tab){
            $scope.tabIsSet = tab;
        }
        $scope.activeNavTab = function(selectedTab){
            if ($scope.tabIsSet === selectedTab) {
                return "active";
            } 
            else {
                return "";
            } 
        };
}]);

