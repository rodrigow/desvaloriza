(function () {
  'use strict';

  // Define Angular App
  var DesvalorizaApp = angular.module('DesvalorizaApp', []);
  DesvalorizaApp.controller('desvalorizaController', desvalorizaController);
  // .service('desvalorizaService', desvalorizaService);

  desvalorizaController.$inject = ['$http'];
  function desvalorizaController ($http) {
    var desvaloriza = this;

    desvaloriza.type = 'carros';

    desvaloriza.maker = {};
    desvaloriza.available_makers = [];
    desvaloriza.loadMakers = function () {
      var url = 'http://fipeapi.appspot.com/api/1/TYPE/marcas.json';

      // $http.get(url.replace('TYPE', desvaloriza.type))
      //   .then(
      //     function (result) {
      //       desvaloriza.available_makers = result.data;
      //     },
      //     function (result) {
      //       desvaloriza.serviceError = result;
      //     });

      var cars = [
        {"name": "AUDI", "fipe_name": "Audi", "order": 2, "key": "audi-6", "id": 6},
        {"name": "BMW", "fipe_name": "BMW", "order": 2, "key": "bmw-7", "id": 7}
      ];
      var bikes = [
        {"name": "HONDA", "fipe_name": "Honda", "order": 2, "key": "honda-6", "id": 8},
        {"name": "BMW", "fipe_name": "BMW", "order": 2, "key": "bmw-8", "id": 9}
      ];
      if (desvaloriza.type === 'carros') {
        desvaloriza.available_makers = cars;
      } else {
        desvaloriza.available_makers = bikes;
      }
    };

    desvaloriza.model = {};
    desvaloriza.loadModels = function () {

    };

    desvaloriza.loadMakers();
  };

  // desvalorizaService.$inject = ['$http']
  // function desvalorizaService($http) {
  //   var service = this;
  //   service.makers = [];
  //
  //
  //   var url = {
  //     makers: 'http://fipeapi.appspot.com/api/1/TYPE/marcas.json',
  //     models: 'http://fipeapi.appspot.com/api/1/type/veiculo/maker/model.json',
  //     vehicles: 'http://fipeapi.appspot.com/api/1/type/veiculos/id.json',
  //     price: 'http://fipeapi.appspot.com/api/1/type/veiculo/maker/model/id.json'
  //   };
  //
  //   service.getMakers = function () {
  //     return $http.get("http://fipeapi.appspot.com/api/1/carros/marcas.json")
  //       .then(
  //         function success(response) {
  //           service.makers = response.data;
  //           console.log('Retrieved ', service.makers.length, ' makers');
  //           return service.makers;
  //         },
  //         function error(reponse) {
  //           service.makers = [];
  //           console.error('Error calling makers: ', reponse);
  //         }
  //       );
  //   }
  // }

})();
