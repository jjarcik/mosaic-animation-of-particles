var q = 20;
var lastcolorR = (Math.floor(Math.random() * 255));
var lastcolorG = (Math.floor(Math.random() * 255));
var lastcolorB = (Math.floor(Math.random() * 255));

$(document).ready(function () {

    var $content = $("#content");
    var $t = $("<div>");
    var w = $(window).width();
    var h = $(window).height();
    
    for (var i = 0; i < q; i++) {
        for (var j = 0; j < q; j++) {
            var s = 100 / q;
            //var rx = Math.
            
            $t = $("<div>");
            //$t.css("background-color", randomcolor());
            $t.css({width: s + "%", height: s + "%", left: j * s + "%", top: i * s + "%"});
            $t = addClipPath($t, [[0, 0], [100, 0], [50, 100]]);
            $t.data("x", j).data("y", i);
            $t.css('transform', 'translate(' + (Math.random() * w - w/2) +  'px, ' +  + (Math.random() * h - h/2) + 'px) rotate('  + (Math.random() * 360) + 'deg)'); 
            $t.appendTo($content);

            $t = $("<div>");
            //$t.css("background-color", randomcolor());
            $t.css({width: s + "%", height: s + "%", left: j * s - s / 2 + "%", top: i * s + "%"});
            $t = addClipPath($t, [[50, 0], [0, 100], [100, 100]]);
            $t.data("x", j).data("y", i);
            $t.css('transform', 'translate(' + (Math.random() * w - w/2) +  'px, ' +  + (Math.random() * h - h/2) + 'px) rotate('  + (Math.random() * 360) + 'deg)'); 
            $t.appendTo($content);
        }
    }
    
    $("#content div").animate({ transform:'translate(0px 0px)' }, 7000);

    //resize();

    $(window).resize(function () {
        //   resize();
    });

});

function addClipPath($el, array) {

    var path = "polygon(";
    for (var i in array) {
        path += array[i][0] + "% " + array[i][1] + "%, ";
    }

    path = path.substr(0, path.length - 2) + ")";
    $el.css("-webkit-clip-path", path);
    $el.css("clip-path", path);

    return $el;
}

function resize() {

    $("#content div").each(function () {
        var w = $(this).width();
        $(this).css("height", w + "px");
        $(this).css("top", w * $(this).data("y") + "px");
    });
}

function randomcolor() {
    var radius = 10;
    var r = (lastcolorR + Math.round(Math.random() * 2 * radius - radius));
    var g = (lastcolorG + Math.round(Math.random() * 2 * radius - radius));
    var b = (lastcolorB + Math.round(Math.random() * 2 * radius - radius));


    lastcolorR = Math.min(Math.max(r, 0), 255);
    lastcolorG = Math.min(Math.max(g, 0), 255);
    lastcolorB = Math.min(Math.max(b, 0), 255);

    var hue = 'rgb(' + lastcolorR + ',' + lastcolorG + ',' + lastcolorB + ')';
    
    return hue;
}