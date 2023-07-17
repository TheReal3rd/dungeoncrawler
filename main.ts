// TODO list:
//  2. Create enemies. (Multiple types with different behaviour)
//  3. Complete the game world.
//  4. Add player animations.
//  5. Add player stats attack, defense and more.
// Low Prio list:
//  1. Add stats screen
//  2. Inventory doesn't show on the console for some reason. Not sure why?
//  START Items
//  Item list:
//  Explination: okay Classes don't work properly so i can't create OOP like item definitions so im going to use ids. (Its gonna be kinda slow)
//  0 = None
//  1 = HealthPotion
//  2 = Burger
//  3 = Iron_Sword
//  4 = Wooden_Shield
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
    }
    
    if ([3, 4].indexOf(itemID) >= 0) {
        return true
    } else {
        //  None
        return false
    }
    
}

function getDescription(itemID: number): string {
    if (itemID == 1) {
        //  Health pot
        return "HP potion heals you."
    } else if (itemID == 2) {
        //  Burger
        return "Burger heals you."
    } else if (itemID == 3) {
        return "Improve your attack."
    } else if (itemID == 4) {
        return "Improve your defense."
    } else {
        //  None
        return "Empty slot."
    }
    
}

//  END Items
// START Inventory
// Move all Inventory elements offScreen.
function offScreen() {
    
    inventorySprite.setPosition(-1000, -1000)
    for (let x = 0; x < 8; x++) {
        invSprites[x].setPosition(-1000, -1000)
    }
}

// Move all Inventory elements onScreen and into correct positions alongside update their image.
function onScreen() {
    
    let pos = spriteToScreen(inventorySprite)
    inventorySprite.x = pos[0]
    inventorySprite.y = pos[1]
    let yOffset = 23
    for (let x = 0; x < 4; x++) {
        pos = spriteToScreen(invSprites[x])
        invSprites[x].x = pos[0] + (scene.screenWidth() - invSprites[x].width)
        invSprites[x].y = pos[1] + yOffset
        invSprites[x].z = 200
        invSprites[x + 4].z = 210
        if (inventorySlot == x) {
            invSprites[x].setImage(assets.image`inventoryButtonLit`)
        } else {
            invSprites[x].setImage(assets.image`inventoryButton0`)
        }
        
        invSprites[x + 4].setImage(getImage(playerInventory[x]))
        pos = spriteToScreen(invSprites[x + 4])
        invSprites[x + 4].x = pos[0] + (scene.screenWidth() - invSprites[x + 4].width)
        invSprites[x + 4].y = pos[1] + yOffset
        yOffset += 18
    }
}

// END Inventory
//  START Utils
// Clamp reduce number within a set range.
function clamp(minNum: number, maxNum: number, value: number): number {
    if (value < minNum) {
        return minNum
    }
    
    if (value > maxNum) {
        return maxNum
    }
    
    return value
}

// Calculate the pixel distance from one position to another.
function calcDistance(posX1: number, posY1: number, posX2: number, posY2: number): number {
    let xDiff = posX1 - posX2
    let yDiff = posY1 - posY2
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
}

// Position sprite within game window by calculating the screen size and tile map size.
function spriteToScreen(textSprite: Sprite): number[] {
    
    //  X_range = 80
    //  Y_range = 60
    //  tile_size = 16
    //  map_size = ? (200)
    //  tile_size * map_size - (X_range or Y_range)
    // So no real point making it dynamic as you can't.
    return [clamp(80, 3120, playerOne.x) - (scene.screenWidth() - textSprite.width) / 2, clamp(60, 3140, playerOne.y) - (scene.screenHeight() - textSprite.height) / 2]
}

function sendNotify(text: string) {
    
    notifyText = textsprite.create(text, 10, 15)
    notifyDisplayTimer.reset()
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
    
    public passedMSNoReset(amount: any): boolean {
        if (game.runtime() - this.time >= amount) {
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
    let tempSprite: Sprite;
    let moved: boolean;
    let playerFrameIndex: number;
    let close: boolean;
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
            
            if (controller.left.isPressed()) {
                // Drop Item
                itemID = playerInventory[inventorySlot]
                tempSprite = sprites.create(getImage(itemID), SpriteKind.Item)
                tempSprite.setPosition(playerOne.x, playerOne.y)
                tempSprite.z = playerOne.z - 1
                droppedItemsTable.push([tempSprite.toString(), "" + itemID])
                playerInventory[inventorySlot] = 0
            } else if (controller.right.isPressed()) {
                // Inspect Item
                if (notifyText == null) {
                    sendNotify(getDescription(playerInventory[inventorySlot]))
                }
                
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
        // playerFrameIndex = 0
        // playerFrameOffsetIndex = 0
        moved = false
        if (controller.up.isPressed()) {
            playerOne.y += playerSpeed * -1
            moved = true
        } else if (controller.down.isPressed()) {
            playerOne.y += playerSpeed
            moved = true
        }
        
        if (controller.right.isPressed()) {
            playerOne.x += playerSpeed
        } else if (controller.left.isPressed()) {
            playerOne.x += playerSpeed * -1
        }
        
        if (moved) {
            
        } else {
            playerFrameIndex = 0
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
                if (prompter == null) {
                    actionSelectIndex += 1
                    if (actionSelectIndex >= 3) {
                        actionSelectIndex = 0
                    }
                    
                    playerAction.destroy()
                    playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
                    playerAction.setFlag(SpriteFlag.AutoDestroy, true)
                } else {
                    // Pick up
                    close = false
                    for (let dropItem of droppedItemsTable) {
                        if (close) {
                            break
                        } else if (dropItem[0] == prompter.toString()) {
                            for (let index = 0; index < 4; index++) {
                                if (playerInventory[index] == 0) {
                                    playerInventory[index] = parseInt(dropItem[1])
                                    close = true
                                    prompter.setPosition(-1000, -1000)
                                    prompter.setFlag(SpriteFlag.AutoDestroy, true)
                                    sprites.destroy(prompter)
                                    break
                                }
                                
                            }
                        }
                        
                    }
                }
                
            }
            
        }
        
        // Action Text
        textPos = spriteToScreen(playerAction)
        playerAction.x = textPos[0]
        playerAction.y = textPos[1] + (scene.screenHeight() - playerAction.height)
    }
    
    // Notify Text
    if (notifyText != null) {
        textPos = spriteToScreen(notifyText)
        notifyText.x = textPos[0] + (scene.screenWidth() - notifyText.width)
        notifyText.y = textPos[1]
        //  + (scene.screen_height() - playerAction.height)
        if (notifyDisplayTimer.passedMS(2000)) {
            notifyText.setPosition(-1000, -1000)
            notifyText.destroy()
            notifyText = null
        }
        
    }
    
}

//  This will update all nearby enemies alongside load them in and out.
//  So we check where the player is and if an enemy should be their spawn it in if it's not done already. 
function updateEntities() {
    let dist: number;
    
    // Items update
    if (prompter == null) {
        for (let item of sprites.allOfKind(SpriteKind.Item)) {
            dist = calcDistance(item.x, item.y, playerOne.x, playerOne.y)
            if (dist >= 10) {
                continue
            }
            
            if (item.overlapsWith(playerOne)) {
                prompter = item
                break
            }
            
        }
    } else {
        dist = calcDistance(prompter.x, prompter.y, playerOne.x, playerOne.y)
        if (dist >= 10) {
            prompter = null
            pickupPrompt.setPosition(-1000, -1000)
        } else {
            pickupPrompt.setPosition(prompter.x, prompter.y - pickupPrompt.height * 2)
        }
        
    }
    
}

// START of on start
// notify
let notifyText : TextSprite = null
let notifyDisplayTimer = new msDelay()
// Inventory Vars
let inventorySprite = sprites.create(assets.image`inventoryBG`, SpriteKind.Inventory)
let inventoryOpenDelay = new msDelay()
let inventoryInputDelay = new msDelay()
let inventoryOpen = false
let inventorySlot = 0
let invSprites = [sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory), sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory), sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory), sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory), sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory), sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory), sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory), sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory)]
// Prompt
let prompter : Sprite = null
let pickupPrompt = textsprite.create("Press B to pickup", 10, 15)
pickupPrompt.setPosition(-1000, -1000)
let droppedItemsTable = [["", "0"]]
//  START Consts
let maxNumItems = 4
let actionsStrings = ["Inventory", "Attack", "Health Item"]
// In the future add stats window
//  END Consts
//  There is a minimap extension that i could use? maybe get the core game in then start adding features. This is to test the consoles limits.
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
let playerAnimFrame = 1
let playerAnimDelay = new msDelay()
// Player animations
let playerFrameIndex = 0
let playerFrameOffsetIndex = 0
let playerFrames = [assets.image`PlayerIdle`, assets.image`PlayerWalkDown1`, assets.image`PlayerWalkDown2`, assets.image`PlayerWalkDown3`, assets.image`PlayerWalkUp1`, assets.image`PlayerWalkUp2`, assets.image`PlayerWalkUp3`]
// Idle
// Down
// Up
// Left
// Right
// world
// playerOne.x = 3000
// playerOne.y = 3000
// END of on start
// game.debug = True
offScreen()
forever(function on_forever() {
    updatePlayer()
    updateEntities()
})
