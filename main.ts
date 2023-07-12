// TODO list:
//  2. Create enemies. (Multiple types with different behaviour)
//  3. Complete the game world.
//  4. Add player animations.
//  5. Add player stats attack, defense and more.
// Low Prio list:
//  1. Add stats screen
//  START Items
//  Item list:
//  Explination: okay Classes don't work properly so i can't create OOP like item definitions so im going to use ids. (Its gonna be kinda slow)
//  0 = None
//  1 = HealthPotion
//  2 = Burger
//  3 = Iron_Sword
//  4 = Wooden_Shield (TODO)
//  5 = Iron_Armour_Set (TODO)
function getImage(itemID: number): Image {
    if (itemID == 1) {
        //  Health pot
        return assets.image`HealthItem`
    } else if (itemID == 2) {
        //  Burger
        return assets.image`BurgerItem`
    } else if (itemID == 3) {
        return assets.image`SwordItem`
    } else if (itemID == 4) {
        return assets.image`ShieldItem`
    } else {
        //  None
        return assets.image`EmptyItem`
    }
    
}

function useItem(itemID: number) {
    
    if ([1, 2].indexOf(itemID) >= 0) {
        //  Health pot and burger
        info.changeLifeBy(2)
        if (info.life() >= 6) {
            info.setLife(5)
        }
        
    } else if (itemID == 3) {
        // Sword
        playerAttack += 1
    } else if (itemID == 4) {
        // Shield
        playerDefense += 1
    } else {
        //  None
        
    }
    
}

function useCondition(itemID: number): boolean {
    if ([1, 2].indexOf(itemID) >= 0) {
        //  Health pot
        return info.life() != 5
    } else {
        //  None
        return false
    }
    
}

//  END Items
// START Inventory
function offScreen() {
    let x: number;
    
    inventorySprite.setPosition(-1000, -1000)
    for (x = 0; x < 4; x++) {
        buttons[x].setPosition(-1000, -1000)
    }
    for (x = 0; x < 4; x++) {
        items[x].setPosition(-1000, -1000)
    }
}

function onScreen() {
    
    let pos = spriteToScreen(inventorySprite)
    inventorySprite.x = pos[0]
    inventorySprite.y = pos[1]
    let yOffset = 23
    for (let x = 0; x < 4; x++) {
        pos = spriteToScreen(buttons[x])
        buttons[x].x = pos[0] + (scene.screenWidth() - buttons[x].width)
        buttons[x].y = pos[1] + yOffset
        if (inventorySlot == x) {
            buttons[x].setImage(assets.image`inventoryButtonLit`)
        } else {
            buttons[x].setImage(assets.image`inventoryButton0`)
        }
        
        items[x].setImage(getImage(playerInventory[x]))
        pos = spriteToScreen(items[x])
        items[x].x = pos[0] + (scene.screenWidth() - items[x].width)
        items[x].y = pos[1] + yOffset
        yOffset += 18
    }
}

// END Inventory
//  START Utils
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
    
    //  X_range = 80
    //  Y_range = 60
    //  tile_size = 16
    //  map_size = ? (200)
    //  tile_size * map_size - (X_range or Y_range)
    // So no real point making it dynamic as you can't.
    return [clamp(80, 3120, playerOne.x) - (scene.screenWidth() - textSprite.width) / 2, clamp(60, 3140, playerOne.y) - (scene.screenHeight() - textSprite.height) / 2]
}

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

//  END Utils
// Kind defs
namespace SpriteKind {
    export const Item = SpriteKind.create()
}

namespace SpriteKind {
    export const Inventory = SpriteKind.create()
}

// Main instructions
function executeAction(actionID: number) {
    let itemID: number;
    
    //  Health Potion TODO add a notify system that pops up to inform the user why they can't drink or use an item.
    if (actionID == 0) {
        //  Inventory
        inventoryOpen = !inventoryOpen
    } else if (actionID == 1) {
        //  Attack
        console.log("Attack Not implemented")
    } else if (actionID == 2) {
        for (let x = 0; x < 4; x++) {
            itemID = playerInventory[x]
            if ([1, 2].indexOf(itemID) >= 0) {
                if (useCondition(itemID)) {
                    useItem(itemID)
                    playerInventory[x] = 0
                    break
                }
                
            }
            
        }
    }
    
}

function updatePlayer() {
    let itemID: number;
    let textPos: number[];
    
    // Inventory
    if (inventoryOpen) {
        onScreen()
        if (inventoryInputDelay.passedMS(250)) {
            if (controller.up.isPressed()) {
                inventorySlot += -1
            } else if (controller.down.isPressed()) {
                inventorySlot += 1
            }
            
        }
        
        inventorySlot = clamp(0, 3, inventorySlot)
        if (controller.A.isPressed()) {
            if (inventoryOpenDelay.passedMS(200)) {
                inventoryOpen = false
                offScreen()
                actionSwapDelay.reset()
            }
            
        } else if (controller.B.isPressed()) {
            itemID = playerInventory[inventorySlot]
            if (useCondition(itemID)) {
                useItem(itemID)
                playerInventory[inventorySlot] = 0
            }
            
        }
        
    } else {
        //  START Movement
        if (controller.up.isPressed()) {
            playerOne.y += playerSpeed * -1
        } else if (controller.down.isPressed()) {
            playerOne.y += playerSpeed
        }
        
        if (controller.right.isPressed()) {
            playerOne.x += playerSpeed
        } else if (controller.left.isPressed()) {
            playerOne.x += playerSpeed * -1
        }
        
        //  END Movement
        if (controller.A.isPressed()) {
            //  Use Actions
            if (inventoryOpenDelay.passedMS(200)) {
                executeAction(actionSelectIndex)
            }
            
        }
        
        if (controller.B.isPressed()) {
            //  Actions
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
        
        // Action Text
        textPos = spriteToScreen(playerAction)
        playerAction.x = textPos[0]
        playerAction.y = textPos[1] + (scene.screenHeight() - playerAction.height)
    }
    
}

//  This will update all nearby enemies alongside load them in and out.
//  So we check where the player is and if an enemy should be their spawn it in if it's not done already. 
function updateEntities() {
    
}

// START of on start
// Inventory Vars
let inventorySprite = sprites.create(assets.image`inventoryBG`, SpriteKind.Inventory)
let inventoryOpenDelay = new msDelay()
let inventoryInputDelay = new msDelay()
let inventoryOpen = false
let inventorySlot = 0
// TODO combine these arrays and create range sets.
let buttons = [sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory), sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory), sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory), sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory)]
let items = [sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory), sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory), sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory), sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory)]
//  START Consts
let maxNumItems = 4
let actionsStrings = ["Inventory", "Attack", "Health Item"]
// In the future add stats window
//  END Consts
//  Their is a minimap extension that i could use? maybe get the core game in then start adding features. This is to test the consoles limits.
scene.setBackgroundColor(2)
tiles.setCurrentTilemap(tilemap`
    level1
`)
game.stats = true
// Player
let actionSelectIndex = 0
//  This not working ill use ids instead. Inheritance might be broken or something.
let playerInventory = [3, 1, 2, 4]
info.setLife(3)
let actionSwapDelay = new msDelay()
let playerAction : TextSprite = null
let playerOne : Sprite = null
let playerSpeed = 1
let playerLevel = 1
let playerAttack = 1
let playerDefense = 1
playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
playerOne = sprites.create(assets.image`
    PlayerIdle
`, SpriteKind.Player)
scene.cameraFollowSprite(playerOne)
// playerOne.x = 3000
// playerOne.y = 3000
// END of on start
offScreen()
// print(scene.screen_width() +" " + scene.screen_height())
forever(function on_forever() {
    updatePlayer()
    updateEntities()
})
