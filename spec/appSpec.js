describe('Desvaloriza Controller', function() {
  var $httpBackend, createController, desvalorizaController;

  // Set up the module
  beforeEach(module('DesvalorizaApp'));
  // TODO need to add chart.js to the module list.

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    //  authRequestHandler = $httpBackend.when('GET', '/auth.py').respond({userId: 'userX'}, {'A-Token': 'xxx'});
    var $controller = $injector.get('$controller');
    desvalorizaController = $controller('desvalorizaController');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch all car makers', function() {
    var url = 'http://fipeapi.appspot.com/api/1/carros/marcas.json';
    var data = [
      { "fipe_name": "Acura", "id": 1 },
      { "fipe_name": "Agrale", "id": 2 },
      { "fipe_name": "Alfa Romeo", "id": 3 }
    ];

    $httpBackend.whenGET(url).respond(data);

    desvalorizaController.type = 'carros';
    desvalorizaController.loadMakers();
    $httpBackend.flush();

    expect(desvalorizaController.available_makers).toEqual(data);
  });

  it('should fetch all bike makers', function() {
    var url = 'https://fipe-parallelum.rhcloud.com/api/v1/motos/marcas';
    var data = [
      { "nome": "ADLY", "codigo": 60 },
      { "nome": "AGRALE", "codigo": 61 }
    ];

    $httpBackend.whenGET(url).respond(data);

    desvalorizaController.type = 'motos';
    desvalorizaController.loadMakers();
    $httpBackend.flush();

    expect(desvalorizaController.available_makers).toEqual(data);
  });

  it('should fetch all truck makers', function() {
    var url = 'https://fipe-parallelum.rhcloud.com/api/v1/caminhoes/marcas';
    var data = [
      { "nome": "MARCOPOLO", "codigo": 108 },
      { "nome": "MERCEDES-BENZ", "codigo": 109 },
      { "nome": "SCANIA", "codigo": 114 }
    ];

    $httpBackend.whenGET(url).respond(data);

    desvalorizaController.type = 'caminhoes';
    desvalorizaController.loadMakers();
    $httpBackend.flush();

    expect(desvalorizaController.available_makers).toEqual(data);
  });
});
