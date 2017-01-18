(function () {
  'use strict';

  // Define Angular App
  var desvalorizaApp = angular.module('DesvalorizaApp', []);
  desvalorizaApp.controller('desvalorizaController', desvalorizaController);
  desvalorizaApp.service('makersService', makersService);

  var url = {
    makers: 'https://fipe-parallelum.rhcloud.com/api/v1/TYPE/marcas'
  };

  desvalorizaController.$inject = ['makersService'];
  function desvalorizaController (makersService) {
    var desvaloriza = this;

    desvaloriza.type = '';

    desvaloriza.maker = {};
    desvaloriza.available_makers = [];

    var handleError = function (response) {
      desvaloriza.error = response;
    };

    desvaloriza.loadMakers = function () {
      makersService.fetch(desvaloriza.type).then(function (response) {
        desvaloriza.available_makers = response.data;
      }, handleError);
    };

    desvaloriza.model = {};
    desvaloriza.loadModels = function () {};
  };

  makersService.$inject = ['$http']
  function makersService($http) {
    return {
      fetch: function(type) {
        return $http.get(url.makers.replace('TYPE', type));
      }
    };
  };

})();
