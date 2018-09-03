
var svg;
var items = [];
var lastselected = [];
var mousepos = [];

$(document).ready(function () {

    items = new Array(2000);
    for (var i = 0; i < 2000; i++) {
        items[i] = new Array(2000);
    }

    $("#svgload").svg({
        onLoad: function ()
        {
            svg = $("#svgload").svg('get');
            svg.load('svg/7only800x800_style3_simplf3.svg', {addTo: true, changeSize: false, onLoad: function () {
                    $("#svgload svg path").remove();
                    $("#svgload svg polygon").each(function (i) {
                        $(this).data("test", $(this).attr("fill"));
                        var points = $(this).attr("points").split(" ");
                        for (var j = 0; j < points.length; j++) {
                            if (points[j].indexOf(",") !== -1) {
                                var point = points[j].split(",");
                                point[0] = Math.round(point[0]);
                                point[1] = Math.round(point[1]);
                                items[point[0]][point[1]] = $(this);
                            }
                        }

                    });

                }});

            var i = 0;

        },
        settings: {}}
    );


    /**/
    $("#svgload").on("mousemove", function (e) {        
        var x = Math.round(e.clientX - $(this).offset().left);
        var y = Math.round(e.clientY - $(this).offset().top);
        mousepos = [x, y];
    });

    var doFrame = function () {
        //console.log("x:" + x + ", y:" + y);
        //return;
        //if ($el.is("polygon")) {
        //var points = getPoints($el, false);
        var points = [mousepos];
        var elems = getElementsByPoints(points);

        for (var i = 0; i < lastselected.length; i++) {
            // lastselected[i].stop().animate({'svgTransform': 'translate(0 0)'});;//.attr('transform', 'translate(0 0)');
            lastselected[i].stop().animate({'svgTransform': 'translate(0 0)'}, 200);
        }

        /**/
        lastselected = [];
        var radius = 100;
        for (var i = 0; i < elems.length; i++) {
            // elems[i].attr("fill", "#000");              
            //var ry = (Math.floor(Math.random() * 2) + 1);
            //var rx = (Math.floor(Math.random() * 2) + 1);                
            var dx, dy, firstpoint = getPoints(elems[i], true);
            //var dy = firstpoint[0][1] - 10, dx = firstpoint[0][1] - 10;

            if (firstpoint[0][0] > points[0][0]) {
                dx = radius - (firstpoint[0][0] - points[0][0]);
            } else {
                dx = -(radius - (points[0][0] - firstpoint[0][0]));
            }

            if (firstpoint[0][1] > points[0][1]) {
                dy = radius - (firstpoint[0][1] - points[0][1]);
            } else {
                dy = -(radius - (points[0][1] - firstpoint[0][1]));
            }
            //if ()

            elems[i].stop().animate({'svgTransform': 'translate(' + dx + ' ' + dy + ')'}, 200);
        }/**/
        lastselected = elems;
        //}
        //console.log($(e.target).attr("id"));
    };


    setInterval(doFrame, 30);

});

function getPoints($elm, getfirst) {
    var points = $elm.attr("points").split(" ");
    var pointsarray = [];    
    for (var j = 0; j < points.length; j++) {
        if (points[j].indexOf(",") !== -1) {
            var point = points[j].split(",");
            point[0] = Math.round(point[0]);
            point[1] = Math.round(point[1]);
            pointsarray.push([point[0], point[1]]);
            if (getfirst) {
                return pointsarray;
            }            
        }
    }
    return pointsarray;
}

function getElementsByPoints(points) {
    var radius = 50;
    var elms = [];
    for (var i = 0; i < points.length; i++) {
        var minx = Math.max(points[i][0] - radius, 0);
        var miny = Math.max(points[i][1] - radius, 0);
        var maxx = Math.min(points[i][0] + radius, 2000 - 1);
        var maxy = Math.min(points[i][1] + radius, 2000 - 1);

        for (var x = minx; x < maxx; x++) {
            for (var y = miny; y < maxy; y++) {
                if (items[x][y] != null) {
                    elms.push(items[x][y]);
                }
            }
        }
    }

    return elms;
}