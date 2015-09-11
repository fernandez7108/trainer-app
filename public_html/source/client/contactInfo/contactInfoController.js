/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var contactInfoControllerModule = angular.module("contactInfoControllerModule",[])
contactInfoControllerModule.controller('contactInfoController',['$scope', function($scope){
    $scope.currentDate = new Date();
    $scope.client = {};
    $scope.client.gender = "Male";
    $scope.$watch('client.DOB', function(){
        $scope.calculateAge();
    })
    $scope.calculateAge = function(){
        if($scope.client.DOB){
            var age = $scope.currentDate-$scope.client.DOB;
            $scope.client.age = Math.floor(age/(1000*60*60*24*365));
            return $scope.client.age;
        }
    }
    $scope.saveForm = function(){
        var clientObject = $scope.clientName+"{"+$scope.client+"}";
        console.log(JSON.stringify(clientObject));
    }
}]);
contactInfoControllerModule.directive('phoneNumber', function() {
    return{
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl){
            modelCtrl.$parsers.push(function (phoneNumber) {
                return phoneNumber.replace(/ /g,"");
            });
        }
    }
})
contactInfoControllerModule.directive('uppercased', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (input) {
                return input ? input.toUpperCase() : "";
            });
            element.css("text-transform", "uppercase");
        }
    };
});