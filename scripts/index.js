let _running = false;
setupWorld(world);

const playBtn = document.getElementById('play');
const addCubeBtn = document.getElementById('add-box');
const addSphereBtn = document.getElementById('add-ball');
const addCylinderBtn = document.getElementById('add-tube');
const entitySelect = document.getElementById('entities-select');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const backBtn = document.getElementById('back');
const frontBtn = document.getElementById('front');
const kickBtn = document.getElementById('kick');

// Simple Camera
const camera = makeCamera()
// let trackball = new THREE.TrackballControls(camera)

setupLighting(scene);

// Create ground.
let ground = new Entity({
    name: 'Ground',
    width: 50,
    height: .1,
    depth: 50,
    mass: 0,
    color: 0xCC8866
})


// Dash listeners
addCubeBtn.addEventListener('click', (event) => {
    window.cube = new Entity({
        type: 'box',
        position: {x: 0, y: 20, z: 0}
    });
})
addSphereBtn.addEventListener('click', (event) => {
    window.cube = new Entity({
        type: 'sphere',
        position: {x: 0, y: 20, z: 0}
    });
})
addCylinderBtn.addEventListener('click', (event) => {
    window.cube = new Entity({
        type: 'cylinder',
        position: {x: 0, y: 20, z: 0}
    });
})

entitySelect.addEventListener('change', (event) => {
    entities[entitySelect.options[entitySelect.selectedIndex].value].select();
})

leftBtn.addEventListener('click', (event) => {
    currentEntity.mesh.cannon_rigid_body.position.x -= 1;
})
rightBtn.addEventListener('click', (event) => {
    currentEntity.mesh.cannon_rigid_body.position.x += 1;
})
upBtn.addEventListener('click', (event) => {
    currentEntity.mesh.cannon_rigid_body.position.y += 1;
})
downBtn.addEventListener('click', (event) => {
    currentEntity.mesh.cannon_rigid_body.position.y -= 1;
})
backBtn.addEventListener('click', (event) => {
    currentEntity.mesh.cannon_rigid_body.position.z -= 1;
})
frontBtn.addEventListener('click', (event) => {
    currentEntity.mesh.cannon_rigid_body.position.z += 1;
})
playBtn.addEventListener('click', (event) => {
    _running = !_running;
})
kickBtn.addEventListener('click', (event) => {
    let {x, y, z} = currentEntity.mesh.position;
    currentEntity.kick([10, 0, 0], [x, y, z]);
})


function render() {
    if (currentEntity)
        updatePositionValues();

    if (resizeRenderer(renderer)) {
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }


    if (_running)
        world.step(1 / 60);

    updateMeshesWithPhysics(scene);

    // trackball.update();
    renderer.render(scene, camera)

    requestAnimationFrame(render)
}

requestAnimationFrame(render)