var DESVALORIZA = DESVALORIZA || {};

DESVALORIZA.utilities = {};
DESVALORIZA.utilities = {
    sort_json: function (data) {
        data.sort(function (data_a, data_b) {
            if (data_a.name > data_b.name) {
                return 1;
            } else if (data_a.name < data_b.name) {
                return -1;
            } else {
                return 0;
            }
        });
    },

    addDropdownOption: function (dropdown, value, text) {
        dropdown.append($('<option></option>').attr('value', value).text(text));
    },

    zero_km: function(ano_modelo) {
        var modelo = ano_modelo;
        if (modelo === '32000') {
            modelo = 'Zero KM';
        }
        return modelo;
    }
};

DESVALORIZA.prices = {};
DESVALORIZA.prices = {
    div_prices_id: '#prices',
    fipe_model_url: 'http://fipeapi.appspot.com/api/1/type/veiculo/maker/model.json',
    fipe_price_url: 'http://fipeapi.appspot.com/api/1/type/veiculo/maker/model/id.json',

    div_prices: function() {
        var div_prices = $(DESVALORIZA.prices.div_prices_id);
        return div_prices;
    },

    clean: function() {
        DESVALORIZA.google.clean_chart();
        DESVALORIZA.prices.div_prices().css({"height": "0px"});
        DESVALORIZA.prices.div_prices().empty();
    },

    years: function () {
        var maker = DESVALORIZA.makers.dropdown().val();
        var model = DESVALORIZA.models.dropdown().val();

        var url = DESVALORIZA.prices.fipe_model_url
            .replace("type", DESVALORIZA.makers.type()).replace("maker", maker).replace("model", model);

        var prices_datatable = DESVALORIZA.google.new_datatable();
        $.getJSON(url)
            .done(function (data) {
                DESVALORIZA.prices.clean();

                $.each(data, function (i, item) {
                    DESVALORIZA.prices.prices(maker, model, item.id, prices_datatable);
                });
                DESVALORIZA.google.drawChart(prices_datatable);
            });
    },

    prices: function(maker, model, id, prices_datatable) {
        var url = DESVALORIZA.prices.fipe_price_url
            .replace("type", DESVALORIZA.makers.type()).replace("maker", maker).replace("model", model).replace("id", id);

        $.getJSON(url)
            .done(function (ano) {
                var modelo = DESVALORIZA.utilities.zero_km(ano.ano_modelo);

                DESVALORIZA.prices.div_prices().append($('<p></p>').text(modelo + " " + ano.preco));

                prices_datatable.addRow([modelo, DESVALORIZA.google.price_to_number(ano.preco)]);
            });
    }
};

DESVALORIZA.models = {};
DESVALORIZA.models = {
    dropdown_id: '#model',
    veiculos_url: 'http://fipeapi.appspot.com/api/1/type/veiculos/id.json',

    dropdown: function() {
        var combo = $(DESVALORIZA.models.dropdown_id);
        return combo;
    },

    clean: function() {
        DESVALORIZA.prices.clean();
        DESVALORIZA.models.dropdown().empty();
    },

    getModel: function() {
        var value = DESVALORIZA.makers.dropdown().val();
        var url = DESVALORIZA.models.veiculos_url.replace("type", DESVALORIZA.makers.type()).replace("id", value);

        $.getJSON(url)
            .done(function (data) {
                DESVALORIZA.utilities.sort_json(data);
                DESVALORIZA.models.clean();

                DESVALORIZA.utilities.addDropdownOption(DESVALORIZA.models.dropdown(), 0, "Select the Model...");

                $.each(data, function (i, item) {
                    DESVALORIZA.utilities.addDropdownOption(DESVALORIZA.models.dropdown(), item.id, item.name);
                })
            });
    },
    onSelect: function () {
        DESVALORIZA.prices.years();
    }

};

DESVALORIZA.makers = {};
DESVALORIZA.makers = {
    dropdown_id: '#maker',
    types_name: 'input[name=types]:checked',
    marcas_url: 'http://fipeapi.appspot.com/api/1/type/marcas.json',

    dropdown: function() {
        var dd = $(DESVALORIZA.makers.dropdown_id);
        return dd;
    },

    clean: function() {
        DESVALORIZA.models.clean();
        DESVALORIZA.makers.dropdown().empty();
    },

    type: function() {
        var t = $(DESVALORIZA.makers.types_name).val();
        return t;
    },

    install: function () {
        DESVALORIZA.makers.clean();

        var url = DESVALORIZA.makers.marcas_url.replace("type", DESVALORIZA.makers.type());

        $.getJSON(url)
            .done(function (data) {
                DESVALORIZA.utilities.sort_json(data);

                DESVALORIZA.utilities.addDropdownOption(DESVALORIZA.makers.dropdown(), 0, "Select the Maker...");

                $.each(data, function (i, item) {
                    DESVALORIZA.utilities.addDropdownOption(DESVALORIZA.makers.dropdown(), item.id, item.name);
                });
            });
    },

    onSelect: function () {
        DESVALORIZA.models.getModel();
    }
};

$(document).ready(function () {
    DESVALORIZA.makers.install();

    DESVALORIZA.google.send_analytics();
});
