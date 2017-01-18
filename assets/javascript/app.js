(function () {
  'use strict';

  // Define Angular App
  var desvalorizaApp = angular.module('DesvalorizaApp', []);
  desvalorizaApp.controller('desvalorizaController', desvalorizaController);
  desvalorizaApp.service('makersService', makersService);
  desvalorizaApp.service('modelsService', modelsService);

  var url = {
    makers: 'https://fipe-parallelum.rhcloud.com/api/v1/TYPE/marcas',
    models: 'https://fipe-parallelum.rhcloud.com/api/v1/TYPE/marcas/MAKER/modelos'
  };

  desvalorizaController.$inject = ['makersService', 'modelsService'];
  function desvalorizaController (makersService, modelsService) {
    var desvaloriza = this;

    desvaloriza.type = '';

    desvaloriza.maker = {};
    desvaloriza.available_makers = [];
    desvaloriza.loadMakers = function () {
      desvaloriza.available_models = [];
      makersService.fetch(desvaloriza.type).then(function (response) {
        desvaloriza.available_makers = response.data;
      }, handleError);
    };

    desvaloriza.model = {};
    desvaloriza.available_models = [];
    desvaloriza.loadModels = function () {
      if (desvaloriza.maker) {
        modelsService.fetch(desvaloriza.type, desvaloriza.maker.codigo).then(function (response) {
          desvaloriza.available_models = response.data.modelos;
        }, handleError);
      }
    };
  };

  makersService.$inject = ['$http']
  function makersService($http) {
    return {
      fetch: function (type) {
        return $http.get(url.makers.replace('TYPE', type));
      }
    }
  };

  modelsService.$inject = ['$http']
  function modelsService($http) {
    return {
      fetch: function (type, maker) {
        return $http.get(url.models.replace('TYPE', type).replace('MAKER', maker));
      }
    }
  };

  var handleError = function (response) {
    desvaloriza.error = response;
  };
})();
