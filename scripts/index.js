function main() {
    // Base
    const canvas = document.querySelector('#canvas')
    const renderer = new THREE.WebGLRenderer({canvas});

    // Constants
    let entityCount = 0;
    let currentEntity;

    // Dash Controls.
    const addCubeBtn = document.getElementById('add-box');
    const leftBtn = document.getElementById('left');
    const rightBtn = document.getElementById('right');
    const upBtn = document.getElementById('up');
    const downBtn = document.getElementById('down');
    const backBtn = document.getElementById('back');
    const frontBtn = document.getElementById('front');
    const cameraRight = document.getElementById('camera-right');
    const cameraLeft = document.getElementById('camera-left');


    // Scene
    const scene = new THREE.Scene()
    window.scene = scene;

    // Camera
    function makeCamera(fov=40) {
        const aspect = 2,
            near = 0.1,
            far = 1000
        return new THREE.PerspectiveCamera(fov, aspect, near, far)
    }

    // Simple Camera
    const camera = makeCamera()
    camera.position.set(8, 4, 10).multiplyScalar(3)
    camera.lookAt(0, 0, 0)




    // Light
    {
        const color = 0xFFFFFF,
            intensity = 1
        const light = new THREE.DirectionalLight(color, intensity)
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
    }

    {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 2, 4);
        scene.add(light);
    }

    // Responsive display
    function resizeRenderer(renderer) {
        const canvas = renderer.domElement
        const { clientWidth, clientHeight } = canvas

        const pixelRatio = window.devicePixelRatio

        const width = clientWidth * pixelRatio | 0
        const height = clientHeight * pixelRatio | 0

        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
            renderer.setSize(width, height, false)
        }
        return needResize
    }

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(50, 50)
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xCC8866 })
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
    groundMesh.rotation.x = Math.PI * -0.5
    groundMesh.receiveShadow = true
    scene.add(groundMesh)


    // Function to create a cube at origin.
    function getCube(params) {
        params = params || {};
        let width = params.width || 5;
        let height = params.height || 5;
        let depth = params.depth || 5;

        let color = params.color || 0xff88aa;

        let position = params.position || {x: 0, y: height / 2, z: 0};

        let geometry = new THREE.BoxGeometry(width, height, depth);
        let material = new THREE.MeshPhongMaterial({color: color});

        let cube = new THREE.Mesh(geometry, material);
        cube.position.x = position.x;
        cube.position.y = position.y;
        cube.position.z = position.z;

        cube.name = 'Entity_' + entityCount++;
        currentEntity = cube;
        return cube;
    }

    // Dash listeners
    addCubeBtn.addEventListener('click', (event) => {
        scene.add(getCube());
    })
    leftBtn.addEventListener('click', (event) => {
        currentEntity.position.x -= 1;
    })
    rightBtn.addEventListener('click', (event) => {
        currentEntity.position.x += 1;
    })
    upBtn.addEventListener('click', (event) => {
        currentEntity.position.y += 1;
    })
    downBtn.addEventListener('click', (event) => {
        currentEntity.position.y -= 1;
    })
    backBtn.addEventListener('click', (event) => {
        currentEntity.position.z -= 1;
    })
    frontBtn.addEventListener('click', (event) => {
        currentEntity.position.z += 1;
    })



    function render(time) {
        time *= 0.001

        if (resizeRenderer(renderer)) {
            const canvas = renderer.domElement
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix()
        }

        // controls.update();
        renderer.render(scene, camera)

        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()