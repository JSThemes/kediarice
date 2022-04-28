jQuery(function($) {
    "use strict";
    $(".pie-chart").each(function(){
    	    var $this = $(this); 
            var data_string = $.parseJSON($this.attr('data-data-string'));
            var title = $this.attr('data-title');
            var chart_type = $this.attr('data-type');
            var style = $this.attr('data-style');
            var legend_position = $this.attr('data-legend-position');
            var data_color = $.parseJSON($this.attr('data-data-color'));
            var color = $this.attr('data-color');
            var id = $this.attr('id');
             
          if(chart_type == 'pie'){  
              google.load("visualization", "1", {packages:["corechart"]});
              
              if(style == 'template1'){
                  google.setOnLoadCallback(drawChart);
                  function drawChart() {                                              
                    var data = google.visualization.arrayToDataTable(data_string);
                    var options = {
                      title: title,
                      pieSliceText: '',
                      colors:data_color,
                      legend: { position: legend_position }
                    };
                    
                    var chart = new google.visualization.PieChart(document.getElementById(id));
                    chart.draw(data, options);
                    function resizeHandler () {
                        chart.draw(data, options);
                    }
                    if (window.addEventListener) {
                        window.addEventListener('resize', resizeHandler, false);
                    }
                    else if (window.attachEvent) {
                        window.attachEvent('onresize', resizeHandler);
                    }
                }
            }
            if(style == 'template2') {
                google.setOnLoadCallback(drawChart);
                function drawChart() {
                    var data = google.visualization.arrayToDataTable(data_string);
                    var options = {
                      title: title,
                      is3D: 'true',
                      pieSliceText: '',
                      colors:data_color,
                      legend: { position: legend_position },
                      slices: {  1: {offset: 0.2},
                                2: {offset: 0.2},
                                3: {offset: 0.2},
                      },
                    };
                    
                    var chart = new google.visualization.PieChart(document.getElementById(id));
                    chart.draw(data, options);
                    function resizeHandler () {
                    chart.draw(data, options);
                    }
                    if (window.addEventListener) {
                    window.addEventListener('resize', resizeHandler, false);
                    }
                    else if (window.attachEvent) {
                    window.attachEvent('onresize', resizeHandler);
                    }
                } 
            }
            if(style == 'template3') {
                google.setOnLoadCallback(drawChart);
                function drawChart() {
                    var data = google.visualization.arrayToDataTable(data_string);
                    var options = {
                      title: title,
                      is3D: 'true',
                      pieSliceText: '',
                      colors:data_color,
                      legend: { position: legend_position },
                    };
                    
                    var chart = new google.visualization.PieChart(document.getElementById(id));
                    chart.draw(data, options);
                    function resizeHandler () {
                    chart.draw(data, options);
                    }
                    if (window.addEventListener) {
                    window.addEventListener('resize', resizeHandler, false);
                    }
                    else if (window.attachEvent) {
                    window.attachEvent('onresize', resizeHandler);
                    }
                } 
            }
        }
        if(chart_type == 'donut'){  
            google.load("visualization", "1", {packages:["corechart"]});
            google.setOnLoadCallback(drawChart);
            function drawChart() {
                 
                var data = google.visualization.arrayToDataTable(data_string);
                var options = {
                  title: title,
                  pieHole: 0.4,
                  colors:data_color,
                  legend: { position: legend_position }
                };
        
                var chart = new google.visualization.PieChart(document.getElementById(id));
                chart.draw(data, options);
                function resizeHandler () {
                    chart.draw(data, options);
                }
                if (window.addEventListener) {
                    window.addEventListener('resize', resizeHandler, false);
                }
                else if (window.attachEvent) {
                    window.attachEvent('onresize', resizeHandler);
                }
            }
        }
        if(chart_type == 'geo'){  
            google.load('visualization', '1', {'packages': ['geochart']});
            google.setOnLoadCallback(drawRegionsMap);
            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable(data_string);
                var options = {region: 'world',
                    displayMode: 'regions',
                    colorAxis: {colors: [color]},
                };
                var chart = new google.visualization.GeoChart(document.getElementById(id));
                chart.draw(data, options);
                function resizeHandler () {
                    chart.draw(data, options);
                }
                if (window.addEventListener) {
                    window.addEventListener('resize', resizeHandler, false);
                }
                else if (window.attachEvent) {
                    window.attachEvent('onresize', resizeHandler);
                }
            };
        }
        if(chart_type == 'area'){ 
              google.load("visualization", "1.1", {packages:["corechart"]});
              google.setOnLoadCallback(drawChart);
              function drawChart() {
                 
                var data = google.visualization.arrayToDataTable(data_string);
                
                var options = {
                  title: title,
                  legend: { position: 'bottom'},
                  colors: [color],
                  pointSize: 25,
                  pointShape: { type: 'circle'}
                };
        
                var chart = new google.visualization.AreaChart(document.getElementById(id));
                chart.draw(data, options);
                function resizeHandler () {
                    chart.draw(data, options);
                }
                if (window.addEventListener) {
                    window.addEventListener('resize', resizeHandler, false);
                }
                else if (window.attachEvent) {
                    window.attachEvent('onresize', resizeHandler);
                }
            }
        }
    });

});