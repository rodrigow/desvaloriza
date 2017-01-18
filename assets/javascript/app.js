(function () {
  'use strict';

  // Define Angular App
  var desvalorizaApp = angular.module('DesvalorizaApp', ['chart.js']);
  desvalorizaApp.controller('desvalorizaController', desvalorizaController);
  desvalorizaApp.service('makersService', makersService);
  desvalorizaApp.service('modelsService', modelsService);
  desvalorizaApp.service('yearsService', yearsService);
  desvalorizaApp.service('pricesService', pricesService);

  desvalorizaApp.config(function (ChartJsProvider) {
    ChartJsProvider.setOptions({
      colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    });
  });

  var url = {
    makers: 'https://fipe-parallelum.rhcloud.com/api/v1/TYPE/marcas',
    models: 'https://fipe-parallelum.rhcloud.com/api/v1/TYPE/marcas/MAKER/modelos',
    years: 'https://fipe-parallelum.rhcloud.com/api/v1/TYPE/marcas/MAKER/modelos/MODEL/anos',
    prices: 'https://fipe-parallelum.rhcloud.com/api/v1/TYPE/marcas/MAKER/modelos/MODEL/anos/YEAR'
  };

  desvalorizaController.$inject = ['makersService', 'modelsService', 'yearsService', 'pricesService'];
  function desvalorizaController (makersService, modelsService, yearsService, pricesService) {
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
      desvaloriza.available_prices = [];
      desvaloriza.chart = {};
      if (desvaloriza.maker) {
        modelsService.fetch(desvaloriza.type, desvaloriza.maker.codigo).then(function (response) {
          desvaloriza.available_models = response.data.modelos;
        }, handleError);
      }
    }

    desvaloriza.available_prices = [];
    desvaloriza.chart = {};
    desvaloriza.loadPrices = function () {
      if (desvaloriza.model) {
        desvaloriza.available_prices = [];

        desvaloriza.chart = {};
        desvaloriza.chart.labels = [];
        desvaloriza.chart.data = [];

        yearsService.fetch(desvaloriza.type, desvaloriza.maker.codigo, desvaloriza.model.codigo).then(function (response) {
          for (var i = 0; i < response.data.length; i++) {
            var year = response.data[i].codigo;
            pricesService.fetch(desvaloriza.type, desvaloriza.maker.codigo, desvaloriza.model.codigo, year).then(function (response) {
              var price = response.data;
              if (price.AnoModelo === 32000) {
                price.modelo = 'Zero Km';
              } else {
                price.modelo = price.AnoModelo;
              }
              price.valor_numerico = parseFloat(price.Valor.replace(/\./g, '').replace(/\,/g, '.').replace('R$ ', ''));
              desvaloriza.available_prices.push(price);

              // TODO need to order results by YEAR
              desvaloriza.chart.labels.push(price.modelo);
              desvaloriza.chart.data.push(price.valor_numerico);
            }, handleError);
          }
        }, handleError);
      }
    };

    var handleError = function (response) {
      desvaloriza.error = response;
    }

  };

  makersService.$inject = ['$http'];
  function makersService($http) {
    return {
      fetch: function (type) {
        return $http.get(url.makers.replace('TYPE', type));
      }
    }
  }

  modelsService.$inject = ['$http'];
  function modelsService($http) {
    return {
      fetch: function (type, maker) {
        return $http.get(url.models.replace('TYPE', type).replace('MAKER', maker));
      }
    }
  }

  yearsService.$inject = ['$http'];
  function yearsService($http) {
    return {
      fetch: function (type, maker, model) {
        var yearsURL = url.years.replace('TYPE', type).replace('MAKER', maker).replace('MODEL', model);
        return $http.get(yearsURL);
      }
    }
  }

  pricesService.$inject = ['$http'];
  function pricesService($http) {
    return {
      fetch: function (type, maker, model, year) {
        var pricesURL = url.prices.replace('TYPE', type).replace('MAKER', maker)
                                  .replace('MODEL', model).replace('YEAR', year);
        return $http.get(pricesURL);
      }
    }
  }

})();
