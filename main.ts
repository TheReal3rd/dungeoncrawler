//  TODO list:
//  1. Create enemies. (Multiple types with different behaviour) (Spawn logic done tracking not done.)
//  2. Create Levels. -> TODO create more levels then.
//  3. Add player stats attack, defense and more.
//  Low Prio list:
//  1. Add stats screen
//  2. Inventory doesn't show on the console for some reason. Not sure why?
//  3. Fix Visual bug when Inventory is rendered over a tile map wall.
// Holds Level Door Data that can be iterated through.
class LvlDoorData {
    static pos: number[]
    private ___pos_is_set: boolean
    private ___pos: number[]
    get pos(): number[] {
        return this.___pos_is_set ? this.___pos : LvlDoorData.pos
    }
    set pos(value: number[]) {
        this.___pos_is_set = true
        this.___pos = value
    }
    
    static lvlID: number
    private ___lvlID_is_set: boolean
    private ___lvlID: number
    get lvlID(): number {
        return this.___lvlID_is_set ? this.___lvlID : LvlDoorData.lvlID
    }
    set lvlID(value: number) {
        this.___lvlID_is_set = true
        this.___lvlID = value
    }
    
    static playerPos: number[]
    private ___playerPos_is_set: boolean
    private ___playerPos: number[]
    get playerPos(): number[] {
        return this.___playerPos_is_set ? this.___playerPos : LvlDoorData.playerPos
    }
    set playerPos(value: number[]) {
        this.___playerPos_is_set = true
        this.___playerPos = value
    }
    
    public static __initLvlDoorData() {
        LvlDoorData.pos = [0, 0]
        LvlDoorData.lvlID = 0
        // Some reason i can't set it to -1 just errors out. ¬_¬
        LvlDoorData.playerPos = [0, 0]
    }
    
    constructor(pos: number[], lvlID: number, playerPos: number[]) {
        this.pos = pos
        this.lvlID = lvlID
        this.playerPos = playerPos
    }
    
    public getPos(): number[] {
        return this.pos
    }
    
    public getLvlID(): number {
        return this.lvlID
    }
    
    public getPlayerPos(): number[] {
        return this.playerPos
    }
    
}

LvlDoorData.__initLvlDoorData()

// Movement maybe an A* like movement system? however we have very little processing? So may not work well.
// Maybe a split processing approach?
// 
//  Check whether entity needs to move if so move it. then end the loop and store the index of the current ent.
//  After the game loop has finished we move to the next entity
//  Bascially looping through one entity at a time but not looping through all the ent during on game update.
// 
class EnemyEntityObject {
    static texture: string
    private ___texture_is_set: boolean
    private ___texture: string
    get texture(): string {
        return this.___texture_is_set ? this.___texture : EnemyEntityObject.texture
    }
    set texture(value: string) {
        this.___texture_is_set = true
        this.___texture = value
    }
    
    static pos: number[]
    private ___pos_is_set: boolean
    private ___pos: number[]
    get pos(): number[] {
        return this.___pos_is_set ? this.___pos : EnemyEntityObject.pos
    }
    set pos(value: number[]) {
        this.___pos_is_set = true
        this.___pos = value
    }
    
    static entSprite: Sprite
    private ___entSprite_is_set: boolean
    private ___entSprite: Sprite
    get entSprite(): Sprite {
        return this.___entSprite_is_set ? this.___entSprite : EnemyEntityObject.entSprite
    }
    set entSprite(value: Sprite) {
        this.___entSprite_is_set = true
        this.___entSprite = value
    }
    
    static waypoint: number[]
    private ___waypoint_is_set: boolean
    private ___waypoint: number[]
    get waypoint(): number[] {
        return this.___waypoint_is_set ? this.___waypoint : EnemyEntityObject.waypoint
    }
    set waypoint(value: number[]) {
        this.___waypoint_is_set = true
        this.___waypoint = value
    }
    
    static speed: number
    private ___speed_is_set: boolean
    private ___speed: number
    get speed(): number {
        return this.___speed_is_set ? this.___speed : EnemyEntityObject.speed
    }
    set speed(value: number) {
        this.___speed_is_set = true
        this.___speed = value
    }
    
    public static __initEnemyEntityObject() {
        EnemyEntityObject.pos = [0, 0]
        // Current position
        EnemyEntityObject.waypoint = [-1, -1]
        // Waypoint Where its moving too.
        EnemyEntityObject.speed = 1
        EnemyEntityObject.entSprite = null
        EnemyEntityObject.texture = null
    }
    
    constructor(texture: string) {
        this.texture = texture
    }
    
    // """En_Witch_Idle"""
    public setPos(pos: number[]) {
        this.pos = pos
    }
    
    public getPos(): number[] {
        return this.pos
    }
    
    public update() {
        
    }
    
    public doMovement() {
        if (this.entSprite == null || this.waypoint == null) {
            return
        }
        
        let cx = this.pos[0]
        let cy = this.pos[1]
        let wx = this.waypoint[0]
        let wy = this.waypoint[1]
        if (calcDistance(cx, cy, wx, wy) > 1) {
            if (cx < wx) {
                cx += this.speed
            } else if (cx > wx) {
                cx -= this.speed
            }
            
            if (cy < wy) {
                cy += this.speed
            } else if (cy > wy) {
                cy -= this.speed
            }
            
        }
        
        this.pos[0] = cx
        this.pos[1] = cy
    }
    
    // self.entSprite.setPosition(cx, cy)
    public getSprite(): Sprite {
        return this.entSprite
    }
    
    public static spawnAll() {
        this.entSprite = sprites.create(assets.image`En_Witch_Idle`, SpriteKind.Enemy)
    }
    
}

EnemyEntityObject.__initEnemyEntityObject()

// Holds Levels Spawn Point data that then uses EnemySpawn Data.
class EnemySpawnPointData {
    static pos: number[]
    private ___pos_is_set: boolean
    private ___pos: number[]
    get pos(): number[] {
        return this.___pos_is_set ? this.___pos : EnemySpawnPointData.pos
    }
    set pos(value: number[]) {
        this.___pos_is_set = true
        this.___pos = value
    }
    
    static trigDist: number
    private ___trigDist_is_set: boolean
    private ___trigDist: number
    get trigDist(): number {
        return this.___trigDist_is_set ? this.___trigDist : EnemySpawnPointData.trigDist
    }
    set trigDist(value: number) {
        this.___trigDist_is_set = true
        this.___trigDist = value
    }
    
    static enemiesList: any[]
    private ___enemiesList_is_set: boolean
    private ___enemiesList: any[]
    get enemiesList(): any[] {
        return this.___enemiesList_is_set ? this.___enemiesList : EnemySpawnPointData.enemiesList
    }
    set enemiesList(value: any[]) {
        this.___enemiesList_is_set = true
        this.___enemiesList = value
    }
    
    static spawned: boolean
    private ___spawned_is_set: boolean
    private ___spawned: boolean
    get spawned(): boolean {
        return this.___spawned_is_set ? this.___spawned : EnemySpawnPointData.spawned
    }
    set spawned(value: boolean) {
        this.___spawned_is_set = true
        this.___spawned = value
    }
    
    public static __initEnemySpawnPointData() {
        EnemySpawnPointData.pos = [0, 0]
        EnemySpawnPointData.trigDist = 0
        EnemySpawnPointData.enemiesList = []
        EnemySpawnPointData.spawned = false
    }
    
    constructor(pos: number[], trigDist: number, enemiesList: any[]) {
        this.pos = pos
        this.trigDist = trigDist
        this.enemiesList = enemiesList
    }
    
    public getPos(): number[] {
        return this.pos
    }
    
    public getTrigDist(): number {
        return this.trigDist
    }
    
    public spawnAll() {
        for (let ent of this.enemiesList) {
            
        }
    }
    
}

EnemySpawnPointData.__initEnemySpawnPointData()

// ent.spawnAll()
function useItem(itemID: number) {
    
    //  None
    if ([1, 2].indexOf(itemID) >= 0) {
        //  Health pot and burger
        info.changeLifeBy(2)
        if (info.life() >= 6) {
            info.setLife(5)
        }
        
    } else if (itemID == 3) {
        //  Sword
        playerAttack += 1
    } else if (itemID == 4) {
        //  Shield
        playerDefense += 1
    }
    
}

//  Main instructions
function executeAction(actionID: number) {
    let projVel: number[];
    let projImage: Image;
    let playerProj: Sprite;
    let itemID2: number;
    
    if (actionID == 0) {
        //  Inventory
        inventoryOpen = !inventoryOpen
    } else if (actionID == 1) {
        //  Attack
        if (playerAttackDelay.passedMS(500)) {
            projVel = null
            projImage = null
            if (playerFrameOffsetIndex == 4) {
                // UP
                projVel = [0, -100]
                projImage = assets.image`AttackUp1`
            } else if (playerFrameOffsetIndex == 0) {
                // DOWN
                projVel = [0, 100]
                projImage = assets.image`AttackDown1`
            } else if (playerFrameOffsetIndex == 12) {
                // RIGHT
                projVel = [100, 0]
                projImage = assets.image`AttackRight1`
            } else if (playerFrameOffsetIndex == 8) {
                // LEFT
                projVel = [-100, 0]
                projImage = assets.image`AttackLeft1`
            }
            
            playerProj = sprites.create(projImage, SpriteKind.PlayerProjectile)
            playerProj.setPosition(playerOne.x, playerOne.y)
            playerProj.setVelocity(projVel[0], projVel[1])
            playerProj.setFlag(SpriteFlag.AutoDestroy, true)
            playerProj.setFlag(SpriteFlag.DestroyOnWall, true)
        }
        
    } else if (actionID == 2) {
        for (let x3 = 0; x3 < 4; x3++) {
            itemID2 = playerInventory[x3]
            if ([1, 2].indexOf(itemID2) >= 0) {
                if (useCondition(itemID2)) {
                    useItem(itemID2)
                    playerInventory[x3] = 0
                    break
                }
                
            }
            
        }
    }
    
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
        let var_ = this.passedMSNoReset(amount)
        if (var_) {
            this.reset()
        }
        
        return var_
    }
    
    public passedMSNoReset(amount: number): boolean {
        if (game.runtime() - this.time >= amount) {
            return true
        } else {
            return false
        }
        
    }
    
}

msDelay.__initmsDelay()

namespace SpriteKind {
    export const Item = SpriteKind.create()
    export const Inventory = SpriteKind.create()
    export const PlayerProjectile = SpriteKind.create()
}

function updatePlayer() {
    let itemID22: number;
    let tempSprite: Sprite;
    let moved: boolean;
    let close: boolean;
    let textPos: number[];
    
    //  Inventory
    if (inventoryOpen) {
        onScreen()
        if (inventoryInputDelay.passedMS(250)) {
            if (controller.up.isPressed()) {
                inventorySlot += -1
            } else if (controller.down.isPressed()) {
                inventorySlot += 1
            }
            
            if (controller.left.isPressed()) {
                //  Drop Item
                itemID22 = playerInventory[inventorySlot]
                tempSprite = sprites.create(getImage(itemID22), SpriteKind.Item)
                tempSprite.setPosition(playerOne.x, playerOne.y)
                tempSprite.z = playerOne.z - 1
                droppedItemsTable.push(["" + tempSprite, "" + ("" + itemID22)])
                playerInventory[inventorySlot] = 0
            } else if (controller.right.isPressed()) {
                //  Inspect Item
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
            itemID22 = playerInventory[inventorySlot]
            if (useCondition(itemID22)) {
                useItem(itemID22)
                playerInventory[inventorySlot] = 0
            }
            
        }
        
    } else {
        //  START Movement
        moved = false
        if (controller.up.isPressed()) {
            playerOne.y += playerSpeed * -1
            moved = true
            playerFrameOffsetIndex = 4
        } else if (controller.down.isPressed()) {
            // UP
            playerOne.y += playerSpeed
            moved = true
            playerFrameOffsetIndex = 0
        }
        
        // DOWN
        if (controller.right.isPressed()) {
            playerOne.x += playerSpeed
            moved = true
            playerFrameOffsetIndex = 12
        } else if (controller.left.isPressed()) {
            // RIGHT
            playerOne.x += playerSpeed * -1
            moved = true
            playerFrameOffsetIndex = 8
        }
        
        // LEFT
        if (!moved) {
            playerFrameIndex = 0
        } else if (playerAnimDelay.passedMS(150)) {
            playerFrameIndex += 1
            if (playerFrameIndex >= 4) {
                playerFrameIndex = 0
            }
            
            console.log("X: " + playerOne.x + " Y: " + playerOne.y + " TileMap[X: " + Math.trunc(playerOne.x / 16) + " Y: " + Math.trunc(playerOne.y / 16) + "]")
        }
        
        //  Set frame
        playerOne.setImage(playerFrames[playerFrameIndex + playerFrameOffsetIndex])
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
                    //  Pick up
                    close = false
                    for (let dropItem of droppedItemsTable) {
                        if (close) {
                            break
                        } else if (dropItem[0] == "" + prompter) {
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
        
        //  Action Text
        textPos = spriteToScreen(playerAction)
        playerAction.x = textPos[0]
        playerAction.y = textPos[1] + (scene.screenHeight() - playerAction.height)
    }
    
    //  Notify Text
    if (notifyText != null) {
        textPos = spriteToScreen(notifyText)
        notifyText.x = textPos[0] + (scene.screenWidth() - notifyText.width)
        notifyText.y = textPos[1]
        if (notifyDisplayTimer.passedMS(2000)) {
            notifyText.setPosition(-1000, -1000)
            notifyText.destroy()
            notifyText = null
        }
        
    }
    
}

// ## Inventory START 
function useCondition(itemID3: number): boolean {
    if ([1, 2].indexOf(itemID3) >= 0) {
        //  Health pot
        return info.life() != 5
    }
    
    if ([3, 4].indexOf(itemID3) >= 0) {
        return true
    } else {
        //  None
        return false
    }
    
}

function getDescription(itemID4: number): string {
    if (itemID4 == 1) {
        //  Health pot
        return "HP potion heals you."
    } else if (itemID4 == 2) {
        //  Burger
        return "Burger heals you."
    } else if (itemID4 == 3) {
        return "Improve your attack."
    } else if (itemID4 == 4) {
        return "Improve your defense."
    } else if (itemID4 == 5) {
        return "Changes your attack."
    } else {
        //  None
        return "Empty slot."
    }
    
}

//  Item list:
//  Explination: okay Classes don't work properly so i can't create OOP like item definitions so im going to use ids. (Its gonna be kinda slow)
//  0 = None
//  1 = HealthPotion
//  2 = Burger
//  3 = Iron_Sword
//  4 = Wooden_Shield
//  5 - Crossbow
//  6 = Iron_Armour_Set (TODO)
function getImage(itemID5: number): Image {
    if (itemID5 == 1) {
        //  Health pot
        return assets.image`HealthItem`
    } else if (itemID5 == 2) {
        //  Burger
        return assets.image`BurgerItem`
    } else if (itemID5 == 3) {
        return assets.image`SwordItem`
    } else if (itemID5 == 4) {
        return assets.image`ShieldItem`
    } else if (itemID5 == 5) {
        return assets.image`CrossbowItem`
    } else {
        //  None
        return assets.image`EmptyItem`
    }
    
}

// ## Inventory END 
// ## GUI START 
// Sends a notification to the top right of the screen.
function sendNotify(text: string) {
    
    notifyText = textsprite.create(text, 10, 15)
    notifyDisplayTimer.reset()
}

//  Move all Inventory elements offScreen.
function offScreen() {
    inventorySprite.setPosition(-1000, -1000)
    for (let x = 0; x < 8; x++) {
        invSprites[x].setPosition(-1000, -1000)
    }
}

//  Move all Inventory elements onScreen and into correct positions alongside update their image.
function onScreen() {
    
    pos = spriteToScreen(inventorySprite)
    inventorySprite.x = pos[0]
    inventorySprite.y = pos[1]
    yOffset = 23
    for (let x2 = 0; x2 < 4; x2++) {
        pos = spriteToScreen(invSprites[x2])
        invSprites[x2].x = pos[0] + (scene.screenWidth() - invSprites[x2].width)
        invSprites[x2].y = pos[1] + yOffset
        invSprites[x2].z = 200
        invSprites[x2 + 4].z = 210
        if (inventorySlot == x2) {
            invSprites[x2].setImage(assets.image`
                inventoryButtonLit
            `)
        } else {
            invSprites[x2].setImage(assets.image`
                inventoryButton0
            `)
        }
        
        invSprites[x2 + 4].setImage(getImage(playerInventory[x2]))
        pos = spriteToScreen(invSprites[x2 + 4])
        invSprites[x2 + 4].x = pos[0] + (scene.screenWidth() - invSprites[x2 + 4].width)
        invSprites[x2 + 4].y = pos[1] + yOffset
        yOffset += 18
    }
}

// ## GUI END
// ## Enemies Funcs START
// Checks whether entities should spawn or not.
function spawnCheck() {
    
}

//  This will update all nearby enemies alongside load them in and out.
//  So we check where the player is and if an enemy should be their spawn it in if it's not done already.
function updateEntities() {
    let dist: number;
    
    //  Items update
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
    
    for (let playerProj of sprites.allOfKind(SpriteKind.PlayerProjectile)) {
        dist = calcDistance(playerOne.x, playerOne.y, playerProj.x, playerProj.y)
        if (dist >= 60) {
            sprites.destroy(playerProj)
            break
        }
        
    }
}

// ## Enemies Funcs END
// ## Level Functions START
function setLevel() {
    // Set the current level to the levelID
    let lvl = null
    if (levelID == 0) {
        lvl = tilemap`Lv0_Intro`
    } else if (levelID == 1) {
        lvl = tilemap`Lv1_Dun1`
    }
    
    tiles.setCurrentTilemap(lvl)
}

function getLevelDoorData(): LvlDoorData[] {
    let pos: number[];
    if (levelID == 0) {
        pos = [48, 32]
        return [new LvlDoorData([38, 24], 1, pos), new LvlDoorData([39, 24], 1, pos), new LvlDoorData([40, 24], 1, pos), new LvlDoorData([41, 24], 1, pos), new LvlDoorData([42, 24], 1, pos), new LvlDoorData([42, 23], 1, pos), new LvlDoorData([42, 22], 1, pos), new LvlDoorData([42, 21], 1, pos), new LvlDoorData([42, 20], 1, pos)]
    } else if (levelID == 1) {
        return [new LvlDoorData([3, 0], 0, [640, 352]), new LvlDoorData([25, 3], 0, [640, 352])]
    } else {
        return []
    }
    
}

function getLevelEnemyData(): EnemySpawnPointData[] {
    // #Level 1 (0) will have no enemies.
    if (levelID == 1) {
        return [new EnemySpawnPointData([5, 12], 6, [new EnemyEntityObject("En_Witch_Idle")])]
    } else {
        return []
    }
    
}

function updateLevel() {
    let tilePos: number[];
    let newPos: number[];
    let distance: number;
    
    let pos = [Math.trunc(playerOne.x / 16), Math.trunc(playerOne.y / 16)]
    for (let x of getLevelDoorData()) {
        tilePos = x.getPos()
        if (tilePos[0] == pos[0] && tilePos[1] == pos[1]) {
            newPos = x.getPlayerPos()
            playerOne.x = newPos[0]
            playerOne.y = newPos[1]
            levelID = x.getLvlID()
            setLevel()
        }
        
    }
    for (let z of getLevelEnemyData()) {
        tilePos = z.getPos()
        distance = calcDistance(pos[0], pos[1], tilePos[0], tilePos[1])
        if (distance <= z.getTrigDist()) {
            z.spawnAll()
        }
        
    }
}

// y.spawnToWorld() This doesn't work. Not sure why. 
// ## Level Functions END
// ## Maths Funcs start
//  Clamp reduce number within a set range.
function clamp(minNum: number, maxNum: number, value: number): number {
    if (value < minNum) {
        return minNum
    }
    
    if (value > maxNum) {
        return maxNum
    }
    
    return value
}

//  Calculate the pixel distance from one position to another.
function calcDistance(posX1: number, posY1: number, posX2: number, posY2: number): number {
    let xDiff = posX1 - posX2
    let yDiff = posY1 - posY2
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
}

//  Position sprite within game window by calculating the screen size and tile map size.
function spriteToScreen(textSprite: Sprite): number[] {
    //  X_range = 80
    //  Y_range = 60
    //  tile_size = 16
    //  map_size = ? (200)
    //  tile_size * map_size - (X_range or Y_range)
    //  So no real point making it dynamic as you can't. (So i made it dynamic. :D)
    return [clamp(80, 16 * levelSizes[levelID] - 80, playerOne.x) - (scene.screenWidth() - textSprite.width) / 2, clamp(60, 16 * levelSizes[levelID] - 60, playerOne.y) - (scene.screenHeight() - textSprite.height) / 2]
}

// ## Maths Funcs END
// Level info START
let levelSizes = [50, 26]
let levelID = 0
let enemyList = []
let droppedItemsTable = [["", "0"]]
// Level info END
// Draw vars START
let yOffset = 0
let playerFrameIndex = 0
let playerFrameOffsetIndex = 12
let pos : number[] = []
let playerFrames = [assets.image`PlayerWalkDown2`, assets.image`PlayerWalkDown1`, assets.image`PlayerWalkDown2`, assets.image`PlayerWalkDown3`, assets.image`PlayerWalkUp2`, assets.image`PlayerWalkUp1`, assets.image`PlayerWalkUp2`, assets.image`PlayerWalkUp3`, assets.image`PlayerWalkLeft2`, assets.image`PlayerWalkLeft1`, assets.image`PlayerWalkLeft2`, assets.image`PlayerWalkLeft3`, assets.image`PlayerWalkRight2`, assets.image`PlayerWalkRight1`, assets.image`PlayerWalkRight2`, assets.image`PlayerWalkRight3`]
// Draw vars END
// Inventory START
let inventorySlot = 0
let inventoryOpen = false
let inventoryOpenDelay = new msDelay()
let inventoryInputDelay = new msDelay()
let playerInventory = [3, 1, 2, 5]
// Inventory END
//  Action START
let actionSelectIndex = 0
let actionsStrings = ["Inventory", "Attack", "Health Item"]
let actionSwapDelay = new msDelay()
//  Action END
//  Sprites START
let playerOne = sprites.create(assets.image`PlayerWalkRight2`, SpriteKind.Player)
let playerAction : TextSprite = null
let prompter : Sprite = null
let notifyText : TextSprite = null
let inventorySprite = sprites.create(assets.image`inventoryBG`, SpriteKind.Inventory)
let invSprites = [sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory), sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory), sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory), sprites.create(assets.image`inventoryButton0`, SpriteKind.Inventory), sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory), sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory), sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory), sprites.create(assets.image`EmptyItem`, SpriteKind.Inventory)]
let pickupPrompt = textsprite.create("Press B to pickup", 10, 15)
playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
//  Sprites END
// Notify Vars START
let notifyDisplayTimer = new msDelay()
// Notify Vars END
//  Player Stats START
let playerSpeed = 1
let playerLevel = 1
let playerAttack = 1
let playerDefense = 1
let playerAttackDelay = new msDelay()
let playerAnimDelay = new msDelay()
//  Player Stats END
//  Vars MUL START
pickupPrompt.setPosition(-1000, -1000)
scene.setBackgroundColor(2)
game.stats = true
info.setLife(3)
scene.cameraFollowSprite(playerOne)
playerOne.setPosition(0, 261)
//  Vars MUL END
//  Intro Vars and Funcs START
let introComplete = false
function updateIntro() {
    // 21
    
    if (playerAnimDelay.passedMS(150)) {
        playerFrameIndex += 1
        if (playerFrameIndex >= 4) {
            playerFrameIndex = 0
        }
        
    }
    
    playerOne.setImage(playerFrames[playerFrameIndex + playerFrameOffsetIndex])
    if (playerOne.x != 21) {
        playerOne.x += 1
    } else {
        introComplete = true
    }
    
}

//  Intro Vars and Funcs END
setLevel()
offScreen()
forever(function on_forever() {
    if (introComplete == false) {
        updateIntro()
    } else {
        updatePlayer()
        updateEntities()
        updateLevel()
    }
    
})
