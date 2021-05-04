ECS.Input.LEFT = false;
ECS.Input.RIGHT = false;
ECS.Input.UP = false;
ECS.Input.DOWN = false;
ECS.Input.MISC_KEYS = {}

ECS.Input.onKeyDown = function(event) {
    console.log(event.code);
    switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
            ECS.Input.LEFT = true;
            break;
        case 'ArrowUp':
        case 'KeyW':
            ECS.Input.UP = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            ECS.Input.RIGHT = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            ECS.Input.DOWN = true;
            break;
        default:
            ECS.Input.MISC_KEYS[event.code] = true;
            break;
    }
};


ECS.Input.onKeyUp = function(event) {
    switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
            ECS.Input.LEFT = false;
            break;
        case 'ArrowUp':
        case 'KeyW':
            ECS.Input.UP = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            ECS.Input.RIGHT = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            ECS.Input.DOWN = false;
            break;
        default:
            ECS.Input.MISC_KEYS[event.code] = false;
            break;
    }
};

document.addEventListener('keyup', ECS.Input.onKeyUp);
document.addEventListener('keydown', ECS.Input.onKeyDown);


ECS.systems.userInput = function (entities) {
    let currentEntity;

    for (let eid in entities) {
        currentEntity = entities[eid];

        if (currentEntity.components.playerControlled && currentEntity.components.position) {
                if (ECS.Input.UP)
                    currentEntity.components.position.y -= 5;
                if (ECS.Input.DOWN)
                    currentEntity.components.position.y += 5;
                if (ECS.Input.LEFT)
                    currentEntity.components.position.x -= 5;
                if (ECS.Input.RIGHT)
                    currentEntity.components.position.x += 5;
        }
    }
}