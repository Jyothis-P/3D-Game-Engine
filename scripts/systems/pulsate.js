let factor = 1;

function pulsate(entities) {
    let currentEntity;

    for (let eid in entities) {
        currentEntity = entities[eid];

        if (currentEntity.components.pulsate) {
            currentEntity.scale.x += 0.1 * factor;
        }
    }

    factor *= -1;
}