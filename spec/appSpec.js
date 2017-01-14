describe('Desvaloriza App', function() {
  beforeEach(module('DesvalorizaApp'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('Desvaloriza Controller', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('DesvalorizaController', { $scope: $scope });
    });

    it(" DEFAULT ", function () {
      expect(1).toEqual(1);
    });

  });
});
