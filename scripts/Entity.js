ECS.Entity = function Entity() {
    this.id = ECS.Entity.prototype._count;
    ECS.Entity.prototype._count++;

    this.components = {};

    return this;
}

ECS.Entity.prototype._count = 0;

ECS.Entity.prototype.addComponent = function (component) {
    this.components[component.name] = component;
    return this;
}

ECS.Entity.prototype.removeComponent = function (componentName) {
    delete this.components[componentName];
    return this;
}

ECS.Entity.prototype.print = function () {
    console.log(JSON.stringify(this, null, 4));
    return this;
}