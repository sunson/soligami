// p5.js application. Please see http://p5js.org/ 

var target, panel;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pointLight([255,255,255], 2000, 0, 0, 0, 0);

    target  = new Target(80);                    // params: size
    panel = new Panel(target, 400, 1000, 1000);  // params: target, focal length, length (x), depth (z)

    // the following data structure is used to create N
    // reflectors. Each hash represents a 'circle' of reflectors.
    var cfg = [
        { offset: 120, num: 4, angle: 8 },
        { offset: 300, num: 9, angle: 20 },
        { offset: 500, num: 14, angle: 30 },
        { offset: 700, num: 20, angle: 42 }
    ];
    // these variables are counters for display purposes
    var totrefls = 0; 
    var parea = panel.area();
    var rarea = 0;
    var radiation = 1120; // W per sq.m
    var reflectivity = 0;

    cfg.forEach(function (c) {
        var angpart = 360 / c.num;
        for (var x = 1; x <= c.num; x++) {
            var rr = new Reflector(panel, c.offset, angpart * x, c.angle, 100, 100);
	    var w = new Wedge(rr); // and also the wedge that holds this in its position
	    totrefls++;
	    rarea += rr.area();
	    reflectivity = rr.reflectivity;
        }
    });
    var lblcount = createElement('h3', 'Assumed Solar Radiation: ' + radiation + ' W/sq.m<br># Reflectors:' + totrefls + ' (CDs)<br>Reflectivity: ' + reflectivity + '%<br>Approx heat power output: ' + Math.round(radiation * rarea / parea, 3) + "W");
    var lbl = createElement('h2', 'Fresnel Reflector');
    var lblsub = createElement('h4', 'Click and drag to orbit around this scene');
    var lbl2 = createElement('p', 'This is a model of a Concentrated Solar Thermal energy device made using multiple fresnel reflectors. These reflectors focus the light collected from a larger area onto a  smaller point. A black body placed at that point will heat up faster. Watch how the reflectors reflect all the light back at certain positions. Try to bring the sphere to the center by click-dragging and watch all of the reflectors illuminate.<p>Can you imagine such a device made using used CDs, Aluminium foils and other reflective waste materials? <p>A web-based open-source tool is being developed to enable enthusiasts and entrepreneurs of all sizes to leverage this tool to help themselves and change the world. If you are interested in making this together, <a href="mailto:suraj@sunson.in">Email me</a>.');
    lbl.position(windowWidth - 250,5);
    lblsub.position(windowWidth - 250,30);
    lbl2.position(windowWidth - 250,80);
    lblcount.position(0,0);

}

var i = 0;
var vrmin = 0;
var vrmax = 90;
var v = 10;
var upflag = true;
var pausedflag = false;


function draw() {
    
    background(160,190,250);
    orbitControl(3); // this needs a customised version of p5.js where
		     // orbitControl can take a 'scaleFactor'
		     // argument. This modified version of p5.js is
		     // bundled along with this application. FIXME:
		     // submit patch to upstream.

    push(); // p5 convention, go figure. http://p5js.org/
    translate(0, 0, -100);

    if (!mouseIsPressed) {
        rotateX(radians(v));
        rotateY(radians(i));
        i+=0.2;
        if (!pausedflag) {
            if (upflag) {
                v += 0.2;
            } else {
                v -= 0.2;
            }
            if (v >= vrmax || v <= vrmin) {
                upflag = !upflag;
            }
        }
    }

    target.render();
    panel.render(); // this further calls render on its reflectors

    pop();
}

/* The following was used a while ago before orbitControl was
discovered. now, disabled.

function keyPressed() { pausedflag = !pausedflag; }

*/
