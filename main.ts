// START Items definitions
class ItemBase {
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
    
    public static __initItemBase() {
        //  This is a template to all Items.
        ItemBase.itemName = "Empty"
        ItemBase.texture = assets.image`EmptyItem`
    }
    
    constructor(name: string, texture: Image) {
        this.itemName = name
        this.texture = texture
    }
    
    public useItem() {
        
    }
    
    public getItemName(): string {
        return this.itemName
    }
    
    public canUse(): boolean {
        return false
    }
    
    public reason(): string {
        return ""
    }
    
}

ItemBase.__initItemBase()

class ItemEmpty extends ItemBase {
    constructor() {
        super("Empty", assets.image`EmptyItem`)
    }
    
    public useItem() {
        
    }
    
    public getItemName(): string {
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
    
    public getItemName(): string {
        return this.itemName
    }
    
    public canUse() {
        return info.life() != 5
    }
    
    public reason(): string {
        return ""
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
    
    public getItemName(): string {
        return this.itemName
    }
    
    public canUse() {
        return info.life() != 5
    }
    
}

// END Items definitions
// START Utils
class msDelay {
    static time: number
    private ___time_is_set: boolean
    private ___time: number
    get time(): number {
        return this.___time_is_set ? this.___time : msDelay.time
    }
    set time(value: number) {
        this.___time_is_set = true
        this.___time = value
    }
    
    public static __initmsDelay() {
        // This breaks blocks. and its annoying.
        msDelay.time = 0
    }
    
    constructor() {
        let time = game.runtime()
    }
    
    public reset() {
        this.time = game.runtime()
    }
    
    public passedMS(amount: number): boolean {
        if (game.runtime() - this.time >= amount) {
            this.reset()
            return true
        } else {
            return false
        }
        
    }
    
}

msDelay.__initmsDelay()

function clamp(minNum: number, maxNum: number, value: number): number {
    if (value < minNum) {
        return minNum
    }
    
    if (value > maxNum) {
        return maxNum
    }
    
    return value
}

function calcDistance(posX1: number, posY1: number, posX2: number, posY2: number): number {
    let xDiff = posX1 - posX2
    let yDiff = posY1 - posY2
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
}

function spriteToScreen(textSprite: Sprite): number[] {
    // #TODO remove the hardcoded values.
    return [clamp(80, 3120, playerOne.x) - (scene.screenWidth() - textSprite.width) / 2, clamp(116, 3196, playerOne.y + (scene.screenHeight() - textSprite.height) / 2)]
}

// END Utils
namespace SpriteKind {
    export const Item = SpriteKind.create()
}

function executeAction(actionID: number) {
    if (actionID == 0) {
        // Inventory
        console.log("Inventory Not implmented")
    } else if (actionID == 1) {
        // Attack
        console.log("Attack Not implemented")
    } else if (actionID == 2) {
        // Health Potion TODO add a notify system that pops up to inform the user why they can't drink or use an item.
        for (let item of playerInventory) {
            if (item.getItemName() == "HealthPotion") {
                if (item.canUse()) {
                    item.useItem()
                    console.log("Used item")
                }
                
            }
            
        }
    }
    
}

function updatePlayer() {
    
    // START Movement
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
    
    // END Movement
    if (controller.A.isPressed()) {
        // Use Actions
        executeAction(actionSelectIndex)
    }
    
    if (controller.B.isPressed()) {
        // Actions
        if (actionSwapDelay.passedMS(500)) {
            actionSelectIndex += 1
            if (actionSelectIndex >= 3) {
                actionSelectIndex = 0
            }
            
            playerAction.destroy()
            playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
            playerAction.setFlag(SpriteFlag.AutoDestroy, true)
        }
        
    }
    
    let textPos = spriteToScreen(playerAction)
    playerAction.x = textPos[0]
    playerAction.y = textPos[1]
}

// This will update all nearby enemies alongside load them in and out.
// So we check where the player is and if an enemy should be their spawn it in if it's not done already. 
//  The range idk why as its best to be hard coded in instead.
function updateEntities() {
    
}

function collisionCheck() {
    
}

// Consts
let maxNumItems = 4
let actionsStrings = ["Inventory", "Attack", "Health Potion"]
// Their is a minimap extension that i could use? maybe get the core game in then start adding features. This is to test the consoles limits.
scene.setBackgroundColor(2)
let actionSelectIndex = 0
let playerLevel = 1
let playerSpeed = 0
let playerOne : Sprite = null
let playerAction : TextSprite = null
playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
// This not working ill use ids instead. Inheritance might be broken or something.
let playerInventory = [new ItemHealthPotion(), new ItemEmpty(), new ItemEmpty(), new ItemEmpty()]
let levelID = 0
tiles.setCurrentTilemap(tilemap`
    level1
`)
playerOne = sprites.create(assets.image`
    PlayerIdle
`, SpriteKind.Player)
playerSpeed = 1
scene.cameraFollowSprite(playerOne)
info.setLife(1)
game.stats = true
let actionSwapDelay = new msDelay()
let inventoryOpen = false
// playerOne.x = 3000
// playerOne.y = 3000
forever(function on_forever() {
    updatePlayer()
    updateEntities()
    collisionCheck()
})
