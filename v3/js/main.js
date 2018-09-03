
var svg;
var items = [];
var lastselected = [];
$(document).ready(function () {

    items = new Array(2000);
    for (var i = 0; i < 2000; i++) {
        items[i] = new Array(2000);
    }

    $("#svgload").svg({
        onLoad: function ()
        {
            svg = $("#svgload").svg('get');
            svg.load('svg/7only1200x1200_style3.svg', {addTo: true, changeSize: false, onLoad: function () {
                    $("#svgload svg polygon").each(function (i) {
                        //if (i === 1) {
                        $(this).data("test", $(this).attr("fill"));
                        var points = $(this).attr("points").split(" ");
                        // console.log($(this).attr("points"));
                        // console.log(points);
                        for (var j = 0; j < points.length; j++) {
                            if (points[j].indexOf(",") !== -1) {
                                var point = points[j].split(",");
                                point[0] = Math.round(point[0]);
                                point[1] = Math.round(point[1]);
                                items[point[0]][point[1]] = $(this);
                            }
                        }

                        //}


                    });

                    //console.log(maxv);
                }});

            var i = 0;
            //$("#svgload polygon").remove();




        },
        settings: {}}
    );


    /**/
    $("#svgload").on("mousemove", function (e) {
        var $el = $(e.target);
        if ($el.is("polygon")) {
            var points = getPoints($el);
            var elems = getElements(points);
            
            for (var i = 0; i < lastselected.length; i++) {
                lastselected[i].attr("fill", lastselected[i].data("test"));                   
            }
            
            /**/
            lastselected = [];
            for (var i = 0; i < elems.length; i++) {                                
                elems[i].attr("fill", "#000");                
            }/**/
            lastselected = elems;
        }
        //console.log($(e.target).attr("id"));
    });
    /**/
    /*
     $('#btnTest').click(function (e) {
     $(this).hide();
     $("#svgload").animate({"opacity":1}, 800);
     var i = 0;                    
     $("svg path, svg polygon").each(function () {
     var x = Math.round(Math.random() * 1000 - 500);
     var y = Math.round(Math.random() * 1000 - 500);
     var a = Math.round(Math.random() * 360);
     $(this).attr('transform', 'translate(' + x + ' ' + y + ') rotate(' + a + ')').data("x", x).data("y", y).data("a", a);
     items[i] = [$(this), x, y, a];
     i++;                        
     });                   
     });*/

});

function getPoints($elm) {
    var points = $elm.attr("points").split(" ");
    var pointsarray = [];
    // console.log($(this).attr("points"));
    // console.log(points);
    for (var j = 0; j < points.length; j++) {
        if (points[j].indexOf(",") !== -1) {
            var point = points[j].split(",");
            point[0] = Math.round(point[0]);
            point[1] = Math.round(point[1]);
            pointsarray.push([point[0], point[1]]);
            //items[point[0]][point[1]] = $(this);
        }
    }
    return pointsarray;
}

function getElements(points){
    var radius = 10;
    var elms = [];
    for (var i = 0; i < points.length; i++){
        var minx = Math.max(points[i][0] - radius,0);
        var miny = Math.max(points[i][1] - radius, 0);
        var maxx = Math.min(points[i][0] + radius, 2000-1);
        var maxy = Math.min(points[i][1] + radius, 2000-1);
        
        for (var x = minx; x < maxx; x++){
            for (var y = miny; y < maxy; y++){
                if (items[x][y]){
                    elms.push(items[x][y]);
                }
            }
        }
    }
    
    return elms;
}