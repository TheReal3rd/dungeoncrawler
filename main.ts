// START Items definitions
class ItemBase {
    static texture: Image
    private ___texture_is_set: boolean
    private ___texture: Image
    get texture(): Image {
        return this.___texture_is_set ? this.___texture : ItemBase.texture
    }
    set texture(value: Image) {
        this.___texture_is_set = true
        this.___texture = value
    }
    
    static itemName: string
    private ___itemName_is_set: boolean
    private ___itemName: string
    get itemName(): string {
        return this.___itemName_is_set ? this.___itemName : ItemBase.itemName
    }
    set itemName(value: string) {
        this.___itemName_is_set = true
        this.___itemName = value
    }
    
    itemname: string
    public static __initItemBase() {
        ItemBase.itemName = "Empty"
        ItemBase.texture = assets.image`EmptyItem`
    }
    
    constructor(itemName: string, texture: Image) {
        this.itemname = itemName
        this.texture = texture
    }
    
    public useItem() {
        
    }
    
    public getName(): string {
        return this.itemName
    }
    
    public canUse(): boolean {
        return false
    }
    
}

ItemBase.__initItemBase()

class ItemEmpty extends ItemBase {
    constructor() {
        super("Empty", assets.image`EmptyItem`)
    }
    
    public useItem() {
        
    }
    
    public getName(): string {
        return this.itemName
    }
    
    public canUse(): boolean {
        return false
    }
    
}

class ItemHealthPotion extends ItemBase {
    constructor() {
        super("HealthPotion", assets.image`HealthItem`)
    }
    
    public useItem() {
        if (this.canUse()) {
            info.changeLifeBy(2)
            if (info.life() >= 6) {
                info.setLife(5)
            }
            
        }
        
    }
    
    public getName(): string {
        return this.itemName
    }
    
    public canUse() {
        return info.life() != 5
    }
    
}

class ItemBurger extends ItemBase {
    constructor() {
        super("Burger", assets.image`BurgerItem`)
    }
    
    public useItem() {
        if (this.canUse()) {
            info.changeLifeBy(2)
            if (info.life() >= 6) {
                info.setLife(5)
            }
            
        }
        
    }
    
    public getName(): string {
        return this.itemName
    }
    
    public canUse() {
        return info.life() != 5
    }
    
}

// END Items definitions
// START Utils
function calcDistance(posX1: number, posY1: number, posX2: number, posY2: number): number {
    let xDiff = posX1 - posX2
    let yDiff = posY1 - posY2
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
}

// END Utils
namespace SpriteKind {
    export const Item = SpriteKind.create()
}

function updatePlayer() {
    
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
    
    if (controller.A.isPressed()) {
        // Attack
        
    }
    
    if (controller.B.isPressed()) {
        // Actions
        actionSelectIndex += 1
        if (actionSelectIndex >= 4) {
            actionSelectIndex = 0
        }
        
        playerAction.setText(actionsStrings[actionSelectIndex])
    }
    
    playerAction.x = playerOne.x - 80 + playerAction.width / 2
    playerAction.y = playerOne.y + 56
}

function updateEntities(range2: number) {
    
}

// Consts
let maxNumItems = 4
let actionsStrings = ["Open Inventory", "Attack", "Health Potion"]
scene.setBackgroundColor(2)
let actionSelectIndex = 0
let playerLevel = 1
let playerSpeed = 0
let playerOne : Sprite = null
let playerAction : TextSprite = null
playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
let playerInventory : any[] = []
let levelID = 0
tiles.setCurrentTilemap(tilemap`
    level1
`)
playerOne = sprites.create(assets.image`
    PlayerIdle
`, SpriteKind.Player)
playerSpeed = 1
scene.cameraFollowSprite(playerOne)
info.setLife(5)
game.stats = true
forever(function on_forever() {
    updatePlayer()
})
