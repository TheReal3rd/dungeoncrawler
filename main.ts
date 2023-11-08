//  TODO list:
//  1. Add movement frames to the enemies. add health bars too.
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
        LvlDoorData.lvlID = -1
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

class waypointNode {
    static position: number[]
    private ___position_is_set: boolean
    private ___position: number[]
    get position(): number[] {
        return this.___position_is_set ? this.___position : waypointNode.position
    }
    set position(value: number[]) {
        this.___position_is_set = true
        this.___position = value
    }
    
    static fromPosition: number[]
    private ___fromPosition_is_set: boolean
    private ___fromPosition: number[]
    get fromPosition(): number[] {
        return this.___fromPosition_is_set ? this.___fromPosition : waypointNode.fromPosition
    }
    set fromPosition(value: number[]) {
        this.___fromPosition_is_set = true
        this.___fromPosition = value
    }
    
    public static __initwaypointNode() {
        waypointNode.position = [0, 0]
        waypointNode.fromPosition = [0, 0]
    }
    
    constructor() {
        
    }
    
}

waypointNode.__initwaypointNode()

//  INFO
//  0 = Witch_One
//  1 = Iron_Golem
//  2 = 
class EnemyEntityObject {
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
    
    static textureID: number
    private ___textureID_is_set: boolean
    private ___textureID: number
    get textureID(): number {
        return this.___textureID_is_set ? this.___textureID : EnemyEntityObject.textureID
    }
    set textureID(value: number) {
        this.___textureID_is_set = true
        this.___textureID = value
    }
    
    static health: number
    private ___health_is_set: boolean
    private ___health: number
    get health(): number {
        return this.___health_is_set ? this.___health : EnemyEntityObject.health
    }
    set health(value: number) {
        this.___health_is_set = true
        this.___health = value
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
    
    static shouldDelete: boolean
    private ___shouldDelete_is_set: boolean
    private ___shouldDelete: boolean
    get shouldDelete(): boolean {
        return this.___shouldDelete_is_set ? this.___shouldDelete : EnemyEntityObject.shouldDelete
    }
    set shouldDelete(value: boolean) {
        this.___shouldDelete_is_set = true
        this.___shouldDelete = value
    }
    
    static damageDelay: number
    private ___damageDelay_is_set: boolean
    private ___damageDelay: number
    get damageDelay(): number {
        return this.___damageDelay_is_set ? this.___damageDelay : EnemyEntityObject.damageDelay
    }
    set damageDelay(value: number) {
        this.___damageDelay_is_set = true
        this.___damageDelay = value
    }
    
    static attackDelay: number
    private ___attackDelay_is_set: boolean
    private ___attackDelay: number
    get attackDelay(): number {
        return this.___attackDelay_is_set ? this.___attackDelay : EnemyEntityObject.attackDelay
    }
    set attackDelay(value: number) {
        this.___attackDelay_is_set = true
        this.___attackDelay = value
    }
    
    static vel: number[]
    private ___vel_is_set: boolean
    private ___vel: number[]
    get vel(): number[] {
        return this.___vel_is_set ? this.___vel : EnemyEntityObject.vel
    }
    set vel(value: number[]) {
        this.___vel_is_set = true
        this.___vel = value
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
        EnemyEntityObject.pos = null
        EnemyEntityObject.vel = [0, 0]
        EnemyEntityObject.waypoint = [0, 0]
        EnemyEntityObject.speed = 1
        EnemyEntityObject.entSprite = null
        EnemyEntityObject.textureID = -1
        EnemyEntityObject.health = 0
        EnemyEntityObject.shouldDelete = false
        EnemyEntityObject.attackDelay = 0
        // Sum reason using msDelay doesn't work? Like it only allows one enemy to shoot at a time.
        EnemyEntityObject.damageDelay = 0
    }
    
    constructor(textureID: number) {
        this.waypoint = null
        this.textureID = textureID
        // """En_Witch_Idle"""
        if (textureID == 0) {
            this.health = 3
        }
        
    }
    
    public setPos(pos: number[]) {
        this.pos = pos
    }
    
    public getPos(): number[] {
        return [this.entSprite.x, this.entSprite.y]
    }
    
    public update() {
        let angle: number;
        let velX: number;
        let velY: number;
        let temp: Sprite;
        let spritePos: number[];
        let playerTilePos: number[];
        let closestTilePos: number[];
        let tileDistToPlayer: number;
        let currentTilePos: number[];
        let tempDist: number;
        let tempAngle: number;
        let result: RaycastResult;
        
        if (this.entSprite == null) {
            this.shouldDelete = true
            return
        }
        
        if (this.health <= 0) {
            this.shouldDelete = true
            this.entSprite.setFlag(SpriteFlag.AutoDestroy, false)
            this.entSprite.destroy()
            return
        }
        
        let pos = [this.entSprite.x, this.entSprite.y]
        // canSeePlayer = False
        let distToPlayer = calcDistance(pos[0], pos[1], playerOne.x, playerOne.y)
        this.doMovement()
        if (this.damageDelay != 0) {
            this.damageDelay -= 1
        }
        
        if (distToPlayer <= 50) {
            if (this.attackDelay >= 80) {
                angle = calcAngle(pos[0], pos[1], playerOne.x, playerOne.y)
                velX = Math.sin(toRadians(angle)) * 90
                velY = Math.cos(toRadians(angle)) * 90
                temp = sprites.create(assets.image`Witch_Attack`, SpriteKind.EnemyProjectile)
                temp.setPosition(pos[0], pos[1])
                temp.setVelocity(-velX, -velY)
                temp.setFlag(SpriteFlag.AutoDestroy, true)
                temp.setFlag(SpriteFlag.DestroyOnWall, true)
                this.attackDelay = 0
            } else {
                this.attackDelay += 1
            }
            
        } else if (distToPlayer <= 80 && this.waypoint == null) {
            if (distToPlayer >= 20) {
                // Pathing START
                spritePos = [this.entSprite.x, this.entSprite.y]
                playerTilePos = [toTilePos(playerOne.x), toTilePos(playerOne.y)]
                closestTilePos = null
                tileDistToPlayer = 1000
                for (let offsetX = -5; offsetX < 5; offsetX++) {
                    for (let offsetY = -5; offsetY < 5; offsetY++) {
                        currentTilePos = [toTilePos(this.entSprite.x) + offsetX, toTilePos(this.entSprite.y) + offsetY]
                        // If its a wall skip we can't walk to it.
                        if (tiles.tileAtLocationIsWall(tiles.getTileLocation(currentTilePos[0], currentTilePos[1]))) {
                            continue
                        }
                        
                        // Check whether we can see the tile.
                        tempDist = calcDistance(currentTilePos[0], currentTilePos[1], playerTilePos[0], playerTilePos[1])
                        tempAngle = calcAngle(currentTilePos[0], currentTilePos[1], playerTilePos[0], playerTilePos[1])
                        result = raycastTileMap(spritePos[0], spritePos[1], tempAngle, tempDist)
                        if (result.getHitType() == 1) {
                            continue
                        }
                        
                        if (tileDistToPlayer > tempDist) {
                            tileDistToPlayer = tempDist
                            closestTilePos = currentTilePos
                        }
                        
                    }
                }
                if (closestTilePos != null && tileDistToPlayer != 1000) {
                    this.waypoint = [closestTilePos[0] * 16 + 8, closestTilePos[1] * 16 + 8]
                }
                
            }
            
        }
        
        // Pathing END
        if (this.pos == null) {
            this.entSprite.setPosition(this.pos[0], this.pos[1])
        }
        
        this.entSprite.setVelocity(this.vel[0], this.vel[1])
    }
    
    public dealDamage() {
        if (this.damageDelay == 0) {
            this.health -= 1
            this.damageDelay = 20
        }
        
        if (this.health <= 0) {
            this.kill()
        }
        
    }
    
    public kill() {
        
        this.getSprite().setFlag(SpriteFlag.AutoDestroy, false)
        sprites.destroy(this.getSprite())
        enemyList.removeElement(this)
    }
    
    public doMovement() {
        let vel: number[];
        if (this.entSprite == null || this.waypoint == null) {
            return
        }
        
        let pos = this.getPos()
        let vx = 0
        let vy = 0
        let cx = pos[0]
        let cy = pos[1]
        let wx = this.waypoint[0]
        let wy = this.waypoint[1]
        let distToPoint = calcDistance(cx, cy, wx, wy)
        if (distToPoint > 1.5) {
            vel = movementVelocity(90, calcAngle(cx, cy, wx, wy))
            vx += -vel[0]
            vy += -vel[1]
        } else {
            this.waypoint = null
        }
        
        this.vel[0] = vx
        this.vel[1] = vy
    }
    
    public getSprite(): Sprite {
        return this.entSprite
    }
    
    public spawnToWorld(): Sprite {
        this.entSprite = sprites.create(getEntityTexture(this.textureID), SpriteKind.Enemy)
        this.entSprite.setFlag(SpriteFlag.AutoDestroy, false)
        this.entSprite.setFlag(SpriteFlag.DestroyOnWall, false)
        this.entSprite.setPosition(this.pos[0], this.pos[1])
        return this.entSprite
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
    
    static enemiesList: number[]
    private ___enemiesList_is_set: boolean
    private ___enemiesList: number[]
    get enemiesList(): number[] {
        return this.___enemiesList_is_set ? this.___enemiesList : EnemySpawnPointData.enemiesList
    }
    set enemiesList(value: number[]) {
        this.___enemiesList_is_set = true
        this.___enemiesList = value
    }
    
    static nameID: string
    private ___nameID_is_set: boolean
    private ___nameID: string
    get nameID(): string {
        return this.___nameID_is_set ? this.___nameID : EnemySpawnPointData.nameID
    }
    set nameID(value: string) {
        this.___nameID_is_set = true
        this.___nameID = value
    }
    
    static spawnRadius: number
    private ___spawnRadius_is_set: boolean
    private ___spawnRadius: number
    get spawnRadius(): number {
        return this.___spawnRadius_is_set ? this.___spawnRadius : EnemySpawnPointData.spawnRadius
    }
    set spawnRadius(value: number) {
        this.___spawnRadius_is_set = true
        this.___spawnRadius = value
    }
    
    public static __initEnemySpawnPointData() {
        EnemySpawnPointData.nameID = ""
        EnemySpawnPointData.pos = [0, 0]
        EnemySpawnPointData.trigDist = 0
        EnemySpawnPointData.enemiesList = []
        EnemySpawnPointData.spawnRadius = 0
    }
    
    constructor(nameID: string, pos: number[], trigDist: number, spawnRadius: number, enemiesList: number[]) {
        this.pos = pos
        this.trigDist = trigDist
        this.enemiesList = enemiesList
        this.nameID = nameID
        this.spawnRadius = spawnRadius
    }
    
    public getPos(): number[] {
        return this.pos
    }
    
    public getTrigDist(): number {
        return this.trigDist
    }
    
    public getEnemiesList(): number[] {
        return this.enemiesList
    }
    
    public getNameID(): string {
        return this.nameID
    }
    
    public getSpawnRadius(): number {
        return this.spawnRadius
    }
    
}

EnemySpawnPointData.__initEnemySpawnPointData()

// Hit result codes
//  0 = None
//  1 = wall
//  2 = Entities
class RaycastResult {
    static pos: number[]
    private ___pos_is_set: boolean
    private ___pos: number[]
    get pos(): number[] {
        return this.___pos_is_set ? this.___pos : RaycastResult.pos
    }
    set pos(value: number[]) {
        this.___pos_is_set = true
        this.___pos = value
    }
    
    static origin: number[]
    private ___origin_is_set: boolean
    private ___origin: number[]
    get origin(): number[] {
        return this.___origin_is_set ? this.___origin : RaycastResult.origin
    }
    set origin(value: number[]) {
        this.___origin_is_set = true
        this.___origin = value
    }
    
    static hitType: number
    private ___hitType_is_set: boolean
    private ___hitType: number
    get hitType(): number {
        return this.___hitType_is_set ? this.___hitType : RaycastResult.hitType
    }
    set hitType(value: number) {
        this.___hitType_is_set = true
        this.___hitType = value
    }
    
    public static __initRaycastResult() {
        RaycastResult.pos = [0, 0]
        RaycastResult.hitType = 0
        RaycastResult.origin = [0, 0]
    }
    
    constructor(origin: number[], pos: number[], hitType: number) {
        this.pos = pos
        this.origin = origin
        this.hitType = hitType
    }
    
    public getHitType(): number {
        return this.hitType
    }
    
    public getPos(): number[] {
        return this.pos
    }
    
    public getOrigin(): number[] {
        return this.origin
    }
    
}

RaycastResult.__initRaycastResult()

//  Main instructions / Important stuff
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
    export const EnemyProjectile = SpriteKind.create()
    export const Debug = SpriteKind.create()
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
                droppedItemsTable.push(["" + tempSprite, "" + itemID22])
                playerInventory[inventorySlot] = 0
            } else if (controller.right.isPressed()) {
                //  Inspect Item
                sendNotify(getDescription(playerInventory[inventorySlot]))
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
                    if (actionSelectIndex >= actionsStrings.length) {
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

// ## Inventory END 
// ## GUI START 
// Sends a notification to the top right of the screen.
function sendNotify(text: string) {
    
    if (notifyText == null) {
        notifyText = textsprite.create(text, 10, 15)
        notifyDisplayTimer.reset()
    }
    
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
    
    // Player Projectile loop
    for (let playerProj of sprites.allOfKind(SpriteKind.PlayerProjectile)) {
        dist = calcDistance(playerOne.x, playerOne.y, playerProj.x, playerProj.y)
        if (dist >= 60) {
            sprites.destroy(playerProj)
            continue
        }
        
        for (let ent1 of enemyList) {
            if (ent1.getSprite().overlapsWith(playerProj)) {
                ent1.dealDamage()
            }
            
        }
    }
    // Enemy Projectile loop
    if (playerHurtDelay.passedMSNoReset(1000)) {
        for (let enemyProj of sprites.allOfKind(SpriteKind.EnemyProjectile)) {
            dist = calcDistance(playerOne.x, playerOne.y, enemyProj.x, enemyProj.y)
            if (dist >= 20) {
                continue
            }
            
            if (playerOne.overlapsWith(enemyProj)) {
                info.changeLifeBy(-1)
                playerHurtDelay.reset()
            }
            
        }
    }
    
    // Entity update
    for (let ent of enemyList) {
        ent.update()
    }
}

function getEntityTexture(texID: number): Image {
    if (texID == 0) {
        return assets.image`En_Witch_Idle`
    } else {
        return null
    }
    
}

// ## Enemies Funcs END
// ## Level Functions START
function setLevel() {
    // Set the current level to the levelID
    
    spawnedAreas = []
    droppedItemsTable = []
    destroyAllEntities()
    sprites.destroyAllSpritesOfKind(SpriteKind.Item)
    let lvl = null
    if (levelID == 0) {
        lvl = tilemap`Lv0_Intro`
    } else if (levelID == 1) {
        lvl = tilemap`Lv1_Dun1`
    } else if (levelID == 2) {
        lvl = tilemap`Lv1_Dun2`
    }
    
    tiles.setCurrentTilemap(lvl)
}

function getLevelDoorData(): LvlDoorData[] {
    let pos: number[];
    if (levelID == 0) {
        pos = [48, 32]
        return [new LvlDoorData([38, 24], 1, pos), new LvlDoorData([39, 24], 1, pos), new LvlDoorData([40, 24], 1, pos), new LvlDoorData([41, 24], 1, pos), new LvlDoorData([42, 24], 1, pos), new LvlDoorData([42, 23], 1, pos), new LvlDoorData([42, 22], 1, pos), new LvlDoorData([42, 21], 1, pos), new LvlDoorData([42, 20], 1, pos)]
    } else if (levelID == 1) {
        // Room 1
        return [new LvlDoorData([3, 0], 0, [640, 352]), new LvlDoorData([25, 3], 2, [31, 56])]
    } else if (levelID == 2) {
        // Spawn
        // Room 2
        return [new LvlDoorData([25, 3], 0, [640, 352]), new LvlDoorData([25, 3], 0, [640, 352])]
    } else {
        // #TODO set to chest room Level ID
        return []
    }
    
}

function getLevelEnemyData(): EnemySpawnPointData[] {
    // No point to add Cache as its called once anyway. So the bool isn't changing???
    
    // #Level 1 (0) will have no enemies.
    if (levelID == 1) {
        return [new EnemySpawnPointData("HallWay1", [5, 12], 8, 4, [0]), new EnemySpawnPointData("HallWay2", [18, 9], 8, 4, [0, 0])]
    } else {
        return []
    }
    
}

function updateLevel() {
    let tilePos: number[];
    let newPos: number[];
    let distance: number;
    let temp: EnemyEntityObject;
    
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
        if (spawnedAreas.indexOf(z.getNameID()) >= 0) {
            continue
        }
        
        tilePos = z.getPos()
        distance = calcDistance(pos[0], pos[1], tilePos[0], tilePos[1])
        if (distance <= z.getTrigDist()) {
            for (let eid of z.getEnemiesList()) {
                // Create the new sprite and add to the entity list.
                temp = new EnemyEntityObject(eid)
                while (true) {
                    pos = [Math.floor((tilePos[0] + randint(-z.getSpawnRadius(), z.getSpawnRadius())) * 16), Math.floor((tilePos[1] + randint(-z.getSpawnRadius(), z.getSpawnRadius())) * 16)]
                    if (!tiles.tileAtLocationIsWall(tiles.getTileLocation(pos[0] / 16, pos[1] / 16))) {
                        break
                    }
                    
                }
                temp.setPos(pos)
                temp.spawnToWorld()
                temp.update()
                enemyList.push(temp)
            }
            spawnedAreas.push(z.getNameID())
        }
        
    }
}

function destroyAllEntities() {
    
    for (let z of enemyList) {
        z.getSprite().setFlag(SpriteFlag.AutoDestroy, false)
        sprites.destroy(z.getSprite())
    }
    enemyList = []
}

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

// Ensures the given angle is within the limits.
function wrapDegrees(degrees: number): number {
    let d = degrees % 360
    if (d >= 180.0) {
        d -= 360.0
    }
    
    if (d < -180.0) {
        d += 360.0
    }
    
    return d
}

// Converts radians to degrees.
function toDegrees(radians: number): number {
    return radians * 57.29577951308232
}

// Calculates the angle from one position to another.
function calcAngle(fromPosX: number, fromPosY: number, toPosX: number, toPosY: number): number {
    let xDiff = fromPosX - toPosX
    let yDiff = fromPosY - toPosY
    return wrapDegrees(toDegrees(Math.atan2(xDiff, yDiff)))
}

// TODO add this
function movementVelocity(speed: number, angle: number): number[] {
    let velX = Math.sin(toRadians(angle)) * speed
    let velY = Math.cos(toRadians(angle)) * speed
    return [velX, velY]
}

// Shoots a raycast from a position. using angle and distance limiter. (TileMap)
//  0 = None
//  1 = wall
//  2 = Entities
function raycastTileMap(posX: number, posY: number, angle: number, distance: number): RaycastResult {
    let currentPosX = Math.floor(posX / 16)
    let currentPosY = Math.floor(posY / 16)
    let step = 0
    let sin = Math.sin(toRadians(angle))
    let cos = Math.cos(toRadians(angle))
    let toPos = [currentPosX + distance * cos, currentPosY + distance * sin]
    while (step != distance) {
        currentPosX += Math.round(1 * cos)
        currentPosY += Math.round(1 * sin)
        step += 1
        // debugSprite.set_position((currentPosX * 16), (currentPosY * 16))
        if (tiles.tileAtLocationIsWall(tiles.getTileLocation(currentPosX, currentPosY))) {
            return new RaycastResult([posX, posY], [currentPosX, currentPosY], 1)
        }
        
    }
    return new RaycastResult([posX, posY], [currentPosX, currentPosY], 0)
}

// Shoots a raycast from a position. using angle and distance limiter.
function raycast(posX: any, posY: any, angle: number, distance: number, spriteKind: any): RaycastResult {
    let currentPosX = posX
    let currentPosY = posY
    let step = 0
    let sin = Math.sin(toRadians(angle))
    let cos = Math.cos(toRadians(angle))
    let toPos = [currentPosX + distance * cos, currentPosY + distance * sin]
    // spriteScan = step % 16 == 1
    // print(step % 16)
    while (step != distance) {
        currentPosX += 1 * cos
        currentPosY += 1 * sin
        step += 1
    }
    // if spriteScan:
    //     for sprite in sprites.all_of_kind(spriteKind):
    //         distToSprite = calcDistance(currentPosX, currentPosY, sprite.x, sprite.y)
    //         if distToSprite >= 2:
    //             continue
    //             
    //         if spriteIntersectCheck(currentPosX, currentPosY, sprite):
    //             return RaycastResult((posX, posY), (currentPosX, currentPosY), 2)
    // TODO add objects return.
    return new RaycastResult([posX, posY], [currentPosX, currentPosY], 0)
}

// Converts degrees to radians.
function toRadians(degrees: number): number {
    return degrees * Math.PI / 180
}

// Converts normal position value to a TileMap row / column position value. only indervidual values. such as X or Y not a pair.
function toTilePos(posXY: number): number {
    return Math.floor(posXY / 16)
}

function spriteIntersectCheck(posX: any, posY: any, sprite: Sprite): boolean {
    if (sprite.x >= posX && sprite.x + sprite.width <= posX || sprite.y >= posY && sprite.y + sprite.height <= posY) {
        return true
    } else {
        return false
    }
    
}

// ## Maths Funcs END
// Level info START
let levelSizes = [50, 26]
let levelID = 0
let spawnedAreas : String[] = []
// Yes kinda cringe but a bool didn't work. So this stores the NameID of areas that have spawned its enemies.
let enemyList : EnemyEntityObject[] = []
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
let playerHurtDelay = new msDelay()
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
// TODO set to original
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
// debugSprite = sprites.create(assets.image("""Waypoint_Debug"""), SpriteKind.Debug)
setLevel()
offScreen()
forever(function on_forever() {
    // print(debugSprite.x + " | "+debugSprite.y)
    if (introComplete == false) {
        updateIntro()
    } else {
        updatePlayer()
        updateEntities()
        updateLevel()
    }
    
})
