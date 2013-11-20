var myCtrl = angular.module('controllers', []);

// Create the UserCtrl controller
myCtrl.controller('UserCtrl', ['$scope', '$http', function($scope, $http) {

  // Models (i.e. data)
  $scope.users = [];
  $scope.newUser = {};

  // Use $http service to load the data
  $http.get('data/users.json').success(function(data) {
    $scope.users = data;
    _setIndexes();
  });

  $scope.addUser = function() {

    // Note: $scope.newUser is set through two-way data binding with
    // the new user form in the view
    var newUser = $scope.newUser;
    newUser.state = "normal";
    newUser.index = $scope.users.length;
    $scope.users.push(newUser);
    $scope.newUser = {};
  };

  $scope.deleteUser = function(user) {
    if (user.state == "deleted") {
      $scope.users.splice(user.index, 1);
      _setIndexes();
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

  // Internal Methods
  function _setIndexes() {
    $scope.users.forEach(function(user, index) {
      user.index = index;
    });
  }

}]);