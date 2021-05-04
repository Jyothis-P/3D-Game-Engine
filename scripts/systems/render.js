function clearCanvas() {
    ECS.context.clearRect(0, 0, ECS.$canvas.width, ECS.$canvas.height);
}

ECS.systems.render = function (entities) {
    let currentEntity, fillStyle;

    clearCanvas();

    for (let entityID in entities) {
        currentEntity = entities[entityID];

        if (currentEntity.components.appearance && currentEntity.components.position) {
            fillStyle = 'rgba(' + [
                currentEntity.components.appearance.color.r,
                currentEntity.components.appearance.color.g,
                currentEntity.components.appearance.color.b,
            ] + ',1)';

            ECS.context.fillStyle = fillStyle;

            ECS.context.fillRect(
                currentEntity.components.position.x - currentEntity.components.appearance.size,
                currentEntity.components.position.y - currentEntity.components.appearance.size,
                currentEntity.components.appearance.size * 2,
                currentEntity.components.appearance.size * 2
            );

            ECS.context.strokeRect(
                currentEntity.components.position.x - currentEntity.components.appearance.size,
                currentEntity.components.position.y - currentEntity.components.appearance.size,
                currentEntity.components.appearance.size * 2,
                currentEntity.components.appearance.size * 2
            );

        }
    }
}