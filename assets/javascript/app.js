(function () {
  'use strict';

  angular.module('DesvalorizaApp', [])
  .controller('DesvalorizaController', DesvalorizaController)
  .service('DesvalorizaService', DesvalorizaService);

  DesvalorizaController.$inject = ['DesvalorizaService'];
  function DesvalorizaController (service) {
    var desvaloriza = this;

  }

  function DesvalorizaService() {
    var service = this;

    var url = {
      makers: 'http://fipeapi.appspot.com/api/1/type/marcas.json',
      models: 'http://fipeapi.appspot.com/api/1/type/veiculo/maker/model.json',
      vehicles: 'http://fipeapi.appspot.com/api/1/type/veiculos/id.json',
      price: 'http://fipeapi.appspot.com/api/1/type/veiculo/maker/model/id.json'
    };
  }

})();
