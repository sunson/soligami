function Target (s) {
    this.size = s;
    this.rotationspeed = 0;
    this.current_rot = 0;
    this.panel = null;
}

Target.prototype = Object.create(Object.prototype);
Target.prototype.constructor = Target;

Target.prototype.render = function() {
    push();
    normalMaterial();
    this.current_rot += this.rotationspeed;
    if (this.current_rot > 360) {
        this.current_rot = 0;
    }
    if (this.panel) {
        translate(0, -1 * this.panel.focal_length, 0);
    }
    rotateX(radians(this.current_rot));
    sphere(this.size);
    pop();
};

Target.prototype.setPanel = function(p) {
    this.panel = p;
};
