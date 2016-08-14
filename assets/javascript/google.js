var DESVALORIZA = DESVALORIZA || {};

DESVALORIZA.google = {};

DESVALORIZA.google = {

    div_price_chart_id: '#price_chart',

    send_analytics: function() {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-77340015-1', 'auto');
        ga('send', 'pageview');
    },

    price_to_number: function(price) {
        var number = parseInt(price.replace("R$", "").replace(".", "").replace(",", "."));
        return number;
    },

    clean_chart: function() {
        $(DESVALORIZA.google.div_price_chart_id).empty();
    },

    new_datatable: function() {
        var datatable = new google.visualization.DataTable();
        datatable.addColumn('string', 'Ano');
        datatable.addColumn('number', 'Preco')
        return datatable;
    },

    drawChart: function(data) {
		var options = {
			title: 'Desvaloriza',
			curveType: 'function',
			legend: { position: 'bottom' }
		};

        var chart = new google.visualization.AreaChart(document.getElementById('price_chart'));

		chart.draw(data, options);
    }
};
