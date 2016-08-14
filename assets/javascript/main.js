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
    addComboOptions: function (combo) {
        combo.append($('<option></option>')
            .attr('value', '0')
            .text("Select the Model... "));
    }
};

DESVALORIZA.prices = {};
DESVALORIZA.prices = {
    div_prices_id: '#prices',
    fipe_model_url: 'http://fipeapi.appspot.com/api/1/carros/veiculo/maker/model.json',
    fipe_price_url: 'http://fipeapi.appspot.com/api/1/carros/veiculo/maker/model/id.json',

    div_prices: function() {
        var div_prices = $(DESVALORIZA.prices.div_prices_id);
        return div_prices;
    },

    clean: function() {
        DESVALORIZA.prices.div_prices().empty();
    },

    years: function () {
        var maker = $(DESVALORIZA.makers.select_id).val();
        var url = DESVALORIZA.prices.fipe_model_url.replace("maker", maker);

        var model = $(DESVALORIZA.models.select_id).val();
        url = url.replace("model", model);

        $.getJSON(url)
            .done(function (data) {
                DESVALORIZA.prices.clean();

                $.each(data, function (i, item) {
                    DESVALORIZA.prices.prices(maker, model, item.id);
                });
            });
    },

    prices: function(maker, model, id) {
        var url = DESVALORIZA.prices.fipe_price_url
            .replace("maker", maker).replace("model", model).replace("id", id);

        $.getJSON(url)
            .done(function (ano) {
                DESVALORIZA.prices.div_prices().append($('<p></p>').text(ano.ano_modelo + " " + ano.preco));
            });
    }
};

DESVALORIZA.models = {};
DESVALORIZA.models = {
    select_id: '#model',
    fipe_url: 'http://fipeapi.appspot.com/api/1/carros/veiculos/id.json',

    dropdown: function() {
        var combo = $(DESVALORIZA.models.select_id);
        return combo;
    },

    clean: function() {
        DESVALORIZA.prices.clean();
        DESVALORIZA.models.dropdown().empty();
    },

    getModel: function() {
        var value = $(DESVALORIZA.makers.select_id).val();
        var url = DESVALORIZA.models.fipe_url.replace("id", value);

        $.getJSON(url)
            .done(function (data) {
                DESVALORIZA.utilities.sort_json(data);
                DESVALORIZA.models.clean();

                DESVALORIZA.models.dropdown().append($('<option></option>')
                    .attr('value', '0')
                    .text("Select the Model... "));

                $.each(data, function (i, item) {
                    DESVALORIZA.models.dropdown().append($('<option></option>')
                        .attr('value', item.id)
                        .text(item.name));
                })
            });
    },
    onSelect: function () {
        DESVALORIZA.prices.years();
    }

};

DESVALORIZA.makers = {};
DESVALORIZA.makers = {
    select_id: '#maker',
    fipe_url: 'http://fipeapi.appspot.com/api/1/carros/marcas.json',

    install: function () {
        $.getJSON(DESVALORIZA.makers.fipe_url)
            .done(function (data) {
                DESVALORIZA.utilities.sort_json(data);

                var maker_select = $(DESVALORIZA.makers.select_id);

                maker_select.append($('<option></option>')
                    .attr('value', '0')
                    .text("Select the Maker... "));

                $.each(data, function (i, item) {
                    maker_select.append($('<option></option>')
                        .attr('value', item.id)
                        .text(item.name));
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
