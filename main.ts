function updatePlayer () {
    if (controller.up.isPressed()) {
        playerOne.y += playerSpeed * -1
    }
    if (controller.down.isPressed()) {
        playerOne.y += playerSpeed
    }
    if (controller.right.isPressed()) {
        playerOne.x += playerSpeed
    }
    if (controller.left.isPressed()) {
        playerOne.x += playerSpeed * -1
    }
}
let playerSpeed = 0
let playerOne: Sprite = null
tiles.setCurrentTilemap(tilemap`level`)
playerOne = sprites.create(assets.image`PlayerIdle`, SpriteKind.Player)
playerSpeed = 1
let levelID = 0
scene.cameraFollowSprite(playerOne)
info.setLife(3)
forever(function () {
    updatePlayer()
})
