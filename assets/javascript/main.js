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

DESVALORIZA.models = {};
DESVALORIZA.models = {
    select_id: '#model',
    fipe_url: 'http://fipeapi.appspot.com/api/1/carros/veiculos/id.json',
    getModel: function () {
        var value = $(DESVALORIZA.makers.select_id).val();
        var url = DESVALORIZA.models.fipe_url.replace("id", value);

        $.getJSON(url)
            .done(function (data) {
                DESVALORIZA.utilities.sort_json(data);
                //console.log(DESVALORIZA.makers.select_id);
                var model_select = $(DESVALORIZA.models.select_id);
                //console.log(DESVALORIZA.makers.select_id);

                model_select.append($('<option></option>')
                    .attr('value', '0')
                    .text("Select the Model... "));

                $.each(data, function (i, item) {
                    console.log(item.id + item.name);
                    model_select.append($('<option></option>')
                        .attr('value', item.id)
                        .text(item.name));
                })
            });
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
                //console.log(DESVALORIZA.makers.select_id);

                maker_select.append($('<option></option>')
                    .attr('value', '0')
                    .text("Select the Maker... "));

                $.each(data, function (i, item) {
                    //console.log(item.id + item.name);
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
