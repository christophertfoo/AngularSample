var myApp = angular.module('myApp', []);

myApp.controller('MyCtrl', function($scope, $http) {
  $scope.users = [];
  $scope.newUser = {};

  $http.get('data/users.json').success(function(data) {
    $scope.users = data;
  });

  $scope.addUser = function() {
    var newUser = $scope.newUser;
    newUser.state = "normal";
    newUser.index = $scope.users.length;
    $scope.users.push(newUser);
    $scope.newUser = {};
  };

  $scope.deleteUser = function(user) {
    if (user.state == "deleted") {
      $scope.users.splice(user.index, 1);
    } else {
      user.state = "deleted";
    }
  };

  $scope.undoDelete = function(user) {
    user.state = "normal";
  };

  $scope.editUser = function(user) {
    user.oldName = user.name;
    user.oldAddress = user.address;
    user.oldPhoneNumber = user.phone_number;
    user.state = "edit";
  };

  $scope.saveUser = function(user) {
    // Probably have some Ajax post or patch request
    user.state = "normal";
  };

  $scope.cancelEdit = function(user) {
    user.name = user.oldName;
    user.address = user.oldAddress;
    user.phone_number = user.oldPhoneNumber;
    user.state = "normal";
  };
});
