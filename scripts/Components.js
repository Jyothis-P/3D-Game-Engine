ECS.Components.Appearance = function (params) {
    params = params || {};

    this.color = params.color;
    if (!this.color) {

        this.color = {
            r: 255,
            g: 0,
            b: 0
        }
    }
    this.size = params.size || (1 + (Math.random() * 30 | 0));

    this.name = 'appearance';
    return this;
}

ECS.Components.Position = function (params) {
    params = params || {};

    this.x = params.x || 20 + (Math.random() * (ECS.$canvas.width - 20) | 0);
    this.y = params.y || 20 + (Math.random() * (ECS.$canvas.height - 20) | 0);
    this.random = params.random || false;
    this.gravity = params.gravity || false;

    this.name = 'position';
    return this;
}

ECS.Components.PlayerControlled = function (params) {
    this.playerControlled = true;

    this.name = 'playerControlled';
    return this;
}

ECS.Components.RandomMovement = function (params) {
    this.randomMovement = true;

    this.name = 'randomMovement';
    return this;
}

ECS.Components.Mass = function (params) {
    this.mass = 10;

    this.name = 'mass';
    return this;
}