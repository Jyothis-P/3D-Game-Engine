ECS.Components.Physics = function (params) {
    params = params || {};
    let mass = params.mass || 1;
    let width = (params.width / 2) || 5;
    let height = (params.height / 2) || 5;
    let depth = (params.depth / 2) || 5;
    let x = params.x || 0;
    let y = params.y || 0;
    let z = params.z || 0;
    let friction = params.friction || 0.1;

    let shape = new CANNON.Box(new CANNON.Vec3(width, height, depth));
    let position = new CANNON.Vec3(x, y, z);
    let material = new CANNON.Material({friction: friction});

    this.body = new CANNON.Body({
        mass: mass,
        shape: shape,
        position: position,
        material: material
    });
    ECS.world.add(this.body);
}

ECS.Components.Mesh = function (params) {
    this.obj = new THREE.Object3D();

}

let p = new ECS.Components.Physics();
console.log('Hai')