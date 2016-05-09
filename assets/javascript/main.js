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
                $.each(data, function (i, item) {
                    // console.log(item.id + item.name);
                    maker_select.append($('<option></option>')
                        .attr('value', item.id)
                        .text(item.name));
                })
            });
    }
};

$(document).ready(function () {
    DESVALORIZA.makers.install();
    
    DESVALORIZA.google.send_analytics();
});
