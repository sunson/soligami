// A wedge is a trianguloid support structure for the reflector. The
// reflector is 'pasted' or 'supported' by the wedge structure below
// which sits on the panel.

wedge_id = 0;

function Wedge(refl) {
    wedge_id++;
    this.id = wedge_id;
    this.reflector = refl;
    refl.addWedge(this);
}

Wedge.prototype = Object.create(Object.prototype);
Wedge.prototype.constructor = Wedge;

// from the reflector, find out its angle
// use the angle to form our shape
Wedge.prototype.makeShape = function() {
}

Wedge.prototype.render = function () {
    var offset = this.reflector.offset, 
    direction = this.reflector.direction,
    angle = this.reflector.angle,
    length = this.reflector.length,
    depth = this.reflector.depth;
    
    var xtraoffset = length * Math.cos(radians(angle));
    var myheight = length * Math.sin(radians(angle));

    var vlen = (offset + xtraoffset) * Math.cos(radians(direction));
    var hlen = (offset +xtraoffset) * Math.sin(radians(direction));

    push();
    translate(-vlen, 0, -hlen);
    rotateY(-radians(direction));
    rotateZ(radians(90 - this.angle));
    box(2, myheight, 2);
    pop();
}


