var myModule = angular.module('local_storage_app', []);

myModule.controller('MainController',
['$scope', 'LocalStorageService',
function($scope, LocalStorageService){

var mc = this;

mc.getStudents();

myModule.factory('studentListService', ['$http', function($http){
    var studentListService = {};
    studentListService.getStudentList = function(){
        return $http.get("students.json");
    };
    return studentListService;
}]);

mc.latestData = function() {
    return LocalStorageService.getData();
}
mc.update = function(val) {
    return LocalStorageService.setData(val);
}

// mc.update(angular.toJson(mc.students));
mc.students = LocalStorageService.getData();


myModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event){
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });
    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('my-storage', val);
            return this;
        },
        getData: function() {
            
            var val = $window.localStorage && $window.localStorage.getItem('my-storage');
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});
}]);