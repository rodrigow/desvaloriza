describe('Desvaloriza App', function() {
  beforeEach(module('DesvalorizaApp'));

  var $controller;
  var $service;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('Desvaloriza Controller', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('desvalorizaController', { $scope: $scope });
    });

    it("should hold makers data for cars", function () {
      var makers = [
        {"name": "AUDI", "fipe_name": "Audi", "order": 2, "key": "audi-6", "id": 6},
        {"name": "BMW", "fipe_name": "BMW", "order": 2, "key": "bmw-7", "id": 7}
      ];
      var url = 'http://fipeapi.appspot.com/api/1/TYPE/marcas.json';



      expect(1).toEqual(2);
    });

  });
});
