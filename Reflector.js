// Reflector - the reflective surface mounted on the panel
    /* 
      Consider the top view of the panel represented by the ASCII
      illustration below. 

      Reflectors are arranged at an 'offset' distance, and are found
      at a certain 'direction' (angle). Like this:

               +--------------------+
               |      R <-----------+------ Reflector
               |       \            |
               |        \ <---------+------ offset distance fom origin
    direction--+------> (\          |
               |  ------- O <-------+------ center of panel
               |                    |
               |                    |
               |                    |
               |                    |
               +--------------------+
             */

function Reflector(panel, offset, direction, angle, length, depth) {
    this.offset = offset; // the distance from the origin of the panel 
    this.direction = direction; // the direction from the center
    this.angle = angle; // the angle between reflector and the plane
    this.reflectivity = 50; // reflectivity is used to compute power transfer
    this.panel = panel; // the panel to which this reflector is attached
    this.length = length;  // same as diameter
    this.depth = depth;    // same as diameter
    this.wedge = null;     // the wedge that supports this reflector in place

    // auto add to parent when reflector is created
    panel.addReflector(this);
}

// boiler plate stuff
Reflector.prototype = Object.create(Object.prototype);
Reflector.prototype.constructor = Reflector;

Reflector.prototype.render = function () {
    var offset = this.offset, 
    direction = this.direction,
    angle = this.angle,
    length = this.length,
    depth = this.depth;
    

    // compute x,y co-ordinates to know where to place this reflector
    // on the panel
    var vlen = offset * Math.cos(radians(direction));
    var hlen = offset * Math.sin(radians(direction));

    // since p5 rotates objects at its origin, when we try to rotate
    // the reflector by 'angle', the reflector body will be 'below'
    // the panel. So, we need to lift up the object. We compute 'zlen'
    // as the vertical distance by which this reflector must be moved
    // up before rotation.
    var zlen = Math.sin(radians(angle)) * depth;
    zlen += 3; // FIXME - there is an artefact where a small part of
	       // the reflector is still 'inside' the panel. why?! 

    push();
    translate(0, 0, 0);
    translate(-vlen, -zlen, -hlen);
    rotateY(-radians(direction));
    rotateZ(radians(180 - this.angle));
    cylinder(depth, 1); // /* or */ box(this.length, this.depth);
    pop();
    this.wedge.render();
}

Reflector.prototype.area = function() {
    return this.reflectivity / 100 * Math.PI * this.depth / 2 * this.depth / 2;
}

Reflector.prototype.addWedge = function(wedge) {
    this.wedge = wedge;
}
