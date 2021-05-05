// Camera
function makeCamera(fov = 40) {
    const aspect = 2,
        near = 0.1,
        far = 1000
    let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(14, 20, 10).multiplyScalar(3)
    camera.lookAt(0, 0, 0)
    return camera;
}

function setupWorld(world) {
    // Set up the physical world.
    world.gravity.set(0, -9.8, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
}

function setupLighting(scene) {
    const color = 0xFFFFFF,
        intensity = 1
    let light = new THREE.DirectionalLight(color, intensity)
    scene.add(light)
    light.castShadow = true
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048

    const d = 50
    light.shadow.camera.left = -d
    light.shadow.camera.right = d
    light.shadow.camera.top = d
    light.shadow.camera.bottom = -d
    light.shadow.camera.near = 1
    light.shadow.camera.far = 50
    light.shadow.bias = 0.001

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 2, 4);
    scene.add(light);
}


// Responsive display
function resizeRenderer(renderer) {
    const canvas = renderer.domElement
    const {clientWidth, clientHeight} = canvas

    const pixelRatio = window.devicePixelRatio

    const width = clientWidth * pixelRatio | 0
    const height = clientHeight * pixelRatio | 0

    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
        renderer.setSize(width, height, false)
    }
    return needResize
}


function getGeometryShape(params) {
    let geometry, shape;
    let width = ('width' in params) ? params.width : 5;
    let height = ('height' in params) ? params.height : 5;
    let depth = ('depth' in params) ? params.depth : 5;
    let radius = ('radius' in params) ? params.radius : 2.5;
    switch (params.type) {
        case 'box':
            geometry = new THREE.BoxGeometry(width, height, depth);
            shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry(radius, 20, 20);
            shape = new CANNON.Sphere(radius);
            break;
        case 'cylinder':
            geometry = new THREE.CylinderGeometry(radius, radius, height, 20);
            shape = new CANNON.Cylinder(radius, radius, height, 20);
            break;
        default:
            throw "Visual type not recognized: " + params.type;
    }
    return {geometry, shape}
}

function updateMeshesWithPhysics(scene) {

    for (let mesh of scene.children) {
        if (!mesh.cannon_rigid_body) continue

        mesh.position.copy(mesh.cannon_rigid_body.position)
        mesh.quaternion.copy(mesh.cannon_rigid_body.quaternion)
    }
}

function updatePositionValues() {
    const xElement = document.getElementById('x');
    const yElement = document.getElementById('y');
    const zElement = document.getElementById('z');

    xElement.value = parseFloat(currentEntity.mesh.position.x).toFixed(2);
    yElement.value = parseFloat(currentEntity.mesh.position.y).toFixed(2);
    zElement.value = parseFloat(currentEntity.mesh.position.z).toFixed(2);
}