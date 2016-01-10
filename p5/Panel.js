function Panel(target, fl, l, d) {
    this.target = target;
    this.focal_length = fl;
    this.depth = d;
    this.length = l;
    this.reflectors = [];
    target.setPanel(this);
}

Panel.prototype = Object.create(Object.prototype);
Panel.prototype.constructor = Panel;

Panel.prototype.render = function() {
    push();
    ambientMaterial([255,200,200]);
    box(this.length, 3, this.depth);
    pop();
    this.forEachReflector(function (r) {
	push();
	specularMaterial(255);
	r.render();
	pop();
    });
}

Panel.prototype.addReflector = function(r) {
    this.reflectors.push(r);
}

Panel.prototype.area = function() {
    return this.length * this.depth;
}

Panel.prototype.forEachReflector = function(f) {
    this.reflectors.forEach(function (r) {
	f(r);
    });
}
