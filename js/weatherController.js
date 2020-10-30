var app = angular.module('weatherApp', []);
app.controller('weatherCtrl', function($scope, $http) {
    //console.log('Angular started');
    
    $scope.getData = function() {

        console.log("Function call");

        $http.get("/api/weather").success(function(response){

            $scope.fetchedData = response;

            console.log("Fetched product is "+JSON.stringify($scope.fetchedData,null,6));

        }); 


    }

    $scope.getData();
    
});