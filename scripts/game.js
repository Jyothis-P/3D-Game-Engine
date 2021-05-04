ECS.Game = function () {
    let entity;
    let self = this;
    let canvas = ECS.$canvas;
    this.renderer = THREE.WebGL1Renderer({canvas});

    // Camera setup
    const fov = 75 // field of vision, angle in degrees
    const aspect = 2 // aspect ratio, 300 / 150
    const near = 0.1
    const far = 5
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 2;

    this.scene = new THREE.Scene();




    function gameLoop() {

        for (let i = 0; i < systems.length; i++) {
            systems[i](ECS.entities);
        }

        if (self._running)
            requestAnimationFrame(gameLoop);
    }

    this._running = true;

    console.log('Game loop starting.');
    requestAnimationFrame(gameLoop);

    this.endGame = function () {
        this._running = false;
        return this;
    }
}

ECS.game = new ECS.Game();
