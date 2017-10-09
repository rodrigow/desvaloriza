(function () {
  'use strict';

  // Define Angular App
  var desvalorizaApp = angular.module('DesvalorizaApp', ['chart.js']);
  desvalorizaApp.controller('desvalorizaController', desvalorizaController);
  desvalorizaApp.service('makersService', makersService);
  desvalorizaApp.service('modelsService', modelsService);
  desvalorizaApp.service('yearsService', yearsService);
  desvalorizaApp.service('pricesService', pricesService);

  var url = {
    makers: 'http://fipeapi.appspot.com/api/1/TYPE/marcas.json',
    models: 'http://fipeapi.appspot.com/api/1/TYPE/veiculos/MAKER.json',
    years: 'http://fipeapi.appspot.com/api/1/TYPE/veiculo/MAKER/MODEL.json',
    prices: 'http://fipeapi.appspot.com/api/1/TYPE/veiculo/MAKER/MODEL/YEAR.json'
  };

  desvalorizaController.$inject = ['makersService', 'modelsService', 'yearsService', 'pricesService'];
  function desvalorizaController (makersService, modelsService, yearsService, pricesService) {
    var desvaloriza = this;

    desvaloriza.type = '';

    var defaultMakerOption = function () {
      return "Selecione a Marca";
    }

    var defaultModelOption = function () {
      return "Selecione o Modelo";
    }

    desvaloriza.maker = {};
    desvaloriza.available_makers = [];
    desvaloriza.makerOption = defaultMakerOption();
    desvaloriza.loadMakers = function () {
      desvaloriza.makerOption = loadingMessage();
      desvaloriza.available_models = [];
      makersService.fetch(desvaloriza.type).then(function (response) {
        desvaloriza.makerOption = defaultMakerOption();
        desvaloriza.available_makers = response.data;
      }, handleError);
    };

    desvaloriza.model = {};
    desvaloriza.available_models = [];
    desvaloriza.modelOption = defaultModelOption();
    desvaloriza.loadModels = function () {
      desvaloriza.available_prices = [];
      desvaloriza.chart = {};
      if (desvaloriza.maker) {
        desvaloriza.modelOption = loadingMessage();
        modelsService.fetch(desvaloriza.type, desvaloriza.maker.id).then(function (response) {
          desvaloriza.modelOption = defaultModelOption();
          desvaloriza.available_models = response.data;
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
        desvaloriza.chart.options = chartOptions(desvaloriza.maker.name, desvaloriza.model.name);

        yearsService.fetch(desvaloriza.type, desvaloriza.maker.id, desvaloriza.model.id).then(function (response) {
          for (var i = 0; i < response.data.length; i++) {
            var year = response.data[i].id;
            pricesService.fetch(desvaloriza.type, desvaloriza.maker.id, desvaloriza.model.id, year).then(function (response) {
              var price = response.data;
              if (price.ano_modelo === '32000') {
                price.modelo = 'Zero Km';
              } else {
                price.modelo = price.ano_modelo;
              }
              price.valor_numerico = parseFloat(price.preco.replace(/\./g, '').replace(/\,/g, '.').replace('R$ ', ''));
              desvaloriza.available_prices.push(price);
              desvaloriza.available_prices.sort(comparePrices);
              // TODO need to order results by YEAR

              desvaloriza.chart.data[0] = [];
              desvaloriza.chart.labels = [];
              for (var i = 0; i < desvaloriza.available_prices.length; i++) {
                desvaloriza.chart.labels.push(desvaloriza.available_prices[i].modelo);
                desvaloriza.chart.data[0].push(desvaloriza.available_prices[i].valor_numerico);
              }
            }, handleError);
          }
        }, handleError);
      }
    };

    var handleError = function (response) {
      desvaloriza.error = response;
    }

    var comparePrices = function (a, b) {
      return b.AnoModelo - a.AnoModelo;
    }

    var chartOptions = function (maker, model) {
      return {
        responsive: true,
        title: { display: true, text: 'Desvaloriza.com: ' + maker + ' - ' + model },
        tooltips: { mode: 'nearest', intersect: false },
        hover: { mode: 'nearest', intersect: false }
      }
    }

    var loadingMessage = function () {
      return "Carregando...";
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
