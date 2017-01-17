(function () {
  'use strict';

  // Define Angular App
  var DesvalorizaApp = angular.module('DesvalorizaApp', []);
  DesvalorizaApp.controller('desvalorizaController', desvalorizaController);
  // .service('desvalorizaService', desvalorizaService);

  desvalorizaController.$inject = ['$http'];
  function desvalorizaController ($http) {
    var desvaloriza = this;

    desvaloriza.type = '';

    desvaloriza.maker = {};
    desvaloriza.available_makers = [];

    desvaloriza.loadMakers = function () {
      var url = 'https://fipe-parallelum.rhcloud.com/api/v1/TYPE/marcas';

      $http.get(url.replace('TYPE', desvaloriza.type)).then(function (result) {
        desvaloriza.available_makers = result.data;
      });
    };

    desvaloriza.model = {};
    desvaloriza.loadModels = function () {

    };

    // desvaloriza.loadMakers();
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
