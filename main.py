# TODO list:
# 1. Create enemies. (Spawning, Movement and attacking is done.)
# 2. Create Levels. -> TODO create more levels then.
# 3. Add player stats attack, defense and more.
# Low Prio list:
# 1. Add stats screen
# 2. Inventory doesn't show on the console for some reason. Not sure why?
# 3. Fix Visual bug when Inventory is rendered over a tile map wall.

#Holds Level Door Data that can be iterated through.
class LvlDoorData():
    pos = (0, 0)
    lvlID = -1
    playerPos = (0, 0)

    def __init__(pos, lvlID, playerPos):
        self.pos = pos
        self.lvlID = lvlID
        self.playerPos = playerPos

    def getPos(self):
        return self.pos

    def getLvlID(self):
        return self.lvlID

    def getPlayerPos(self):
        return self.playerPos

#Movement maybe an A* like movement system? however we have very little processing? So may not work well.
#Maybe a split processing approach?
#
# Check whether entity needs to move if so move it. then end the loop and store the index of the current ent.
# After the game loop has finished we move to the next entity
# Bascially looping through one entity at a time but not looping through all the ent during on game update.
#
# INFO
# 0 = Witch_One
# 1 = Iron_Golem
# 2 = 
class EnemyEntityObject():
    pos = (0,0)
    waypoint = (-1, -1)
    speed = 1
    entSprite = None
    textureID: number = -1
    health = 0
    shouldDelete = False
    attackDelay = 0#Sum reason using msDelay doesn't work? Like it only allows one enemy to shoot at a time.

    def __init__(textureID):
      self.textureID = textureID #"""En_Witch_Idle"""
      self.waypoint = None
      if textureID == 0:
          self.health = 50
        
    def setPos(self, pos):
        self.pos = pos

    def getPos(self):
        return self.pos

    def update(self):
        global playerOne, levelSizes, levelID
        if self.entSprite == None:
            self.shouldDelete = True
            return

        if self.health <= 0:
            self.shouldDelete = True
            self.entSprite.set_flag(SpriteFlag.AUTO_DESTROY, False)
            self.entSprite.destroy()
            return
        
        
        self.doMovement()
        
        distToPlayer = calcDistance(self.pos[0], self.pos[1], playerOne.x, playerOne.y)
        if (distToPlayer <= 50):
            if(self.attackDelay >= 25):
                angle = calcAngle(self.pos[0], self.pos[1], playerOne.x, playerOne.y)
                velX = Math.sin(toRadians(angle)) * 95
                velY = Math.cos(toRadians(angle)) * 95

                temp = sprites.create(assets.image("""Witch_Attack"""), SpriteKind.projectile)
                temp.set_position(self.pos[0], self.pos[1])
                temp.set_velocity(-velX, -velY)
                temp.set_flag(SpriteFlag.AUTO_DESTROY, True)
                temp.set_flag(SpriteFlag.DESTROY_ON_WALL, True)
                self.attackDelay = 0
            else:
                self.attackDelay +=1
        else:
            if(distToPlayer <= 80 and self.waypoint == None):
                if (distToPlayer >= 20):
                    #So we going to scan the area. And use raycast to ensure we can move from the current position to the next.
                    #This is done to ensure the enemy can see where they're moving to.
                    #This is all done by tiles. They're 16x16 so dvide by 16.
                    prevDist = 1000
                    closestTile = None
                    for x in range(-5, 5):
                        for y in range(-5, 5):
                            newPos = ((self.pos[0] / 16) + x, (self.pos[1] / 16) + y)
                         
                            #Dist
                            distToPlayer = calcDistance(newPos[0], newPos[1], playerOne.x / 16, playerOne.y / 16)

                            #Raycast
                            angle = calcAngle(self.pos[0] / 16, self.pos[1] / 16, newPos[0], newPos[1])
                            distToPos = calcDistance(self.pos[0] / 16, self.pos[1] / 16, newPos[0], newPos[1])
                            result = raycastTileMap(self.pos[0], self.pos[1], angle, distToPos)

                            if(result.getHitType() != 0):
                                continue

                            if distToPlayer < prevDist:
                                prevDist = distToPlayer
                                closestTile = newPos

                    if prevDist != 1000 or closestTile != None:
                        self.waypoint = (closestTile[0] * 16, closestTile[1] * 16)
                        print(self.waypoint)

        self.entSprite.setPosition(self.pos[0], self.pos[1])


    def doMovement(self):#TODO change this from direct position to velocity.
        if self.entSprite == None or self.waypoint == None:
            return

        cx = self.pos[0]
        cy = self.pos[1]
        wx = self.waypoint[0]
        wy = self.waypoint[1]
        if calcDistance(cx, cy, wx, wy) > 1:
            if cx < wx:
                cx += self.speed
            elif cx > wx:
                cx -= self.speed

            if cy < wy:
                cy += self.speed
            elif cy > wy:
                cy -= self.speed
        else:
            self.waypoint = None
        self.pos[0] = cx
        self.pos[1] = cy

    def getSprite(self):
        return self.entSprite

    def spawnToWorld(self):
        self.entSprite = sprites.create(getEntityTexture(self.textureID), SpriteKind.Enemy)
        self.entSprite.set_flag(SpriteFlag.AUTO_DESTROY, False)
        self.entSprite.set_flag(SpriteFlag.DESTROY_ON_WALL, False)
        return self.entSprite
        
#Holds Levels Spawn Point data that then uses EnemySpawn Data.
class EnemySpawnPointData():
    nameID = ""
    pos = (0,0)
    trigDist = 0
    enemiesList = []
    spawnRadius = 0

    def __init__(nameID, pos, trigDist, spawnRadius, enemiesList):
        self.pos = pos
        self.trigDist = trigDist
        self.enemiesList = enemiesList
        self.nameID = nameID
        self.spawnRadius = spawnRadius

    def getPos(self):
        return self.pos

    def getTrigDist(self):
        return self.trigDist

    def getEnemiesList(self):
        return self.enemiesList

    def getNameID(self):
        return self.nameID

    def getSpawnRadius(self):
        return self.spawnRadius

#Hit result codes
# 0 = None
# 1 = wall
# 2 = Entities
class RaycastResult():
    pos = (0,0)
    hitType = 0
    origin = (0,0)

    def __init__(origin, pos, hitType):
        self.pos = pos
        self.origin = origin
        self.hitType = hitType

    def getHitType(self):
        return self.hitType

    def getPos(self):
        return self.pos

    def getOrigin(self):
        return self.origin

# Main instructions / Important stuff
def executeAction(actionID: number):
    global inventoryOpen, playerFrameOffsetIndex
    if actionID == 0:
        # Inventory
        inventoryOpen = not (inventoryOpen)
    elif actionID == 1:
        # Attack
        if playerAttackDelay.passedMS(500):
            projVel = None
            projImage = None
            if playerFrameOffsetIndex == 4:#UP
                projVel = (0, -100)
                projImage = assets.image(("""AttackUp1"""))
            elif playerFrameOffsetIndex == 0:#DOWN
                projVel = (0, 100)
                projImage = assets.image(("""AttackDown1"""))
            elif playerFrameOffsetIndex == 12:#RIGHT
                projVel = (100, 0)
                projImage = assets.image(("""AttackRight1"""))
            elif playerFrameOffsetIndex == 8:#LEFT
                projVel = (-100, 0)
                projImage = assets.image(("""AttackLeft1"""))

            playerProj = sprites.create(projImage, SpriteKind.PlayerProjectile)
            playerProj.set_position(playerOne.x, playerOne.y)
            playerProj.set_velocity(projVel[0], projVel[1])
            playerProj.set_flag(SpriteFlag.AUTO_DESTROY, True)
            playerProj.set_flag(SpriteFlag.DESTROY_ON_WALL, True)

    elif actionID == 2:
        for x3 in range(4):
            itemID2 = playerInventory[x3]
            if [1, 2].index(itemID2) >= 0:
                if useCondition(itemID2):
                    useItem(itemID2)
                    playerInventory[x3] = 0
                    break
    elif actionID == 3:
        result = raycastTileMap(playerOne.x, playerOne.y, 45, 10)
        print(result.getHitType())

class msDelay():#This breaks blocks. and its annoying.
    time = 0

    def __init__(self):
        time = game.runtime()

    def reset(self):
        self.time = game.runtime()

    def passedMS(self, amount):
        var = self.passedMSNoReset(amount)
        if(var):
            self.reset()
        return var

    def passedMSNoReset(self, amount):
        if(game.runtime() - self.time >= amount):
            return True
        else:
            return False

@namespace
class SpriteKind:
    Item = SpriteKind.create()
    Inventory = SpriteKind.create()
    PlayerProjectile = SpriteKind.create()

def updatePlayer():
    global inventorySlot, inventoryOpen, playerFrameOffsetIndex, playerFrameIndex, actionSelectIndex, playerAction, notifyText
    # Inventory
    if inventoryOpen:
        onScreen()
        if inventoryInputDelay.passedMS(250):
            if controller.up.is_pressed():
                inventorySlot += -1
            elif controller.down.is_pressed():
                inventorySlot += 1
            if controller.left.is_pressed():
                # Drop Item
                itemID22 = playerInventory[inventorySlot]
                tempSprite = sprites.create(getImage(itemID22), SpriteKind.Item)
                tempSprite.set_position(playerOne.x, playerOne.y)
                tempSprite.z = playerOne.z - 1
                droppedItemsTable.append([str(tempSprite), str(itemID22)])
                playerInventory[inventorySlot] = 0
            elif controller.right.is_pressed():
                # Inspect Item
                if notifyText == None:
                    sendNotify(getDescription(playerInventory[inventorySlot]))
        inventorySlot = clamp(0, 3, inventorySlot)
        if controller.A.is_pressed():
            if inventoryOpenDelay.passedMS(200):
                inventoryOpen = False
                offScreen()
                actionSwapDelay.reset()
        elif controller.B.is_pressed():
            itemID22 = playerInventory[inventorySlot]
            if useCondition(itemID22):
                useItem(itemID22)
                playerInventory[inventorySlot] = 0
    else:
        # START Movement
        moved = False
        if controller.up.is_pressed():
            playerOne.y += playerSpeed * -1
            moved = True
            playerFrameOffsetIndex = 4#UP
        elif controller.down.is_pressed():
            playerOne.y += playerSpeed
            moved = True
            playerFrameOffsetIndex = 0#DOWN
        if controller.right.is_pressed():
            playerOne.x += playerSpeed
            moved = True
            playerFrameOffsetIndex = 12#RIGHT
        elif controller.left.is_pressed():
            playerOne.x += playerSpeed * -1
            moved = True
            playerFrameOffsetIndex = 8#LEFT
        if not (moved):
            playerFrameIndex = 0
        elif playerAnimDelay.passedMS(150):
            playerFrameIndex += 1
            if playerFrameIndex >= 4:
                playerFrameIndex = 0
            #print("X: "+playerOne.x+" Y: "+playerOne.y + " TileMap[X: "+ int(playerOne.x / 16)+ " Y: "+int(playerOne.y / 16)+"]")
        # Set frame
        playerOne.set_image(playerFrames[playerFrameIndex + playerFrameOffsetIndex])
        # END Movement
        if controller.A.is_pressed():
            # Use Actions
            if inventoryOpenDelay.passedMS(200):
                executeAction(actionSelectIndex)
        if controller.B.is_pressed():
            # Actions
            if actionSwapDelay.passedMS(500):
                if prompter == None:
                    actionSelectIndex += 1
                    if actionSelectIndex >= actionsStrings.length:
                        actionSelectIndex = 0
                    playerAction.destroy()
                    playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
                    playerAction.set_flag(SpriteFlag.AUTO_DESTROY, True)
                else:
                    # Pick up
                    close = False
                    for dropItem in droppedItemsTable:
                        if close:
                            break
                        elif dropItem[0] == str(prompter):
                            for index in range(4):
                                if playerInventory[index] == 0:
                                    playerInventory[index] = int(dropItem[1])
                                    close = True
                                    prompter.set_position(-1000, -1000)
                                    prompter.set_flag(SpriteFlag.AUTO_DESTROY, True)
                                    sprites.destroy(prompter)
                                    break
        # Action Text
        textPos = spriteToScreen(playerAction)
        playerAction.x = textPos[0]
        playerAction.y = textPos[1] + (scene.screen_height() - playerAction.height)
    # Notify Text
    if notifyText != None:
        textPos = spriteToScreen(notifyText)
        notifyText.x = textPos[0] + (scene.screen_width() - notifyText.width)
        notifyText.y = textPos[1]
        if notifyDisplayTimer.passedMS(2000):
            notifyText.set_position(-1000, -1000)
            notifyText.destroy()
            notifyText = None


### Inventory START 
def useCondition(itemID3: number):
    if [1, 2].index(itemID3) >= 0:
        # Health pot
        return info.life() != 5
    if [3, 4].index(itemID3) >= 0:
        return True
    else:
        # None
        return False
def getDescription(itemID4: number):
    if itemID4 == 1:
        # Health pot
        return "HP potion heals you."
    elif itemID4 == 2:
        # Burger
        return "Burger heals you."
    elif itemID4 == 3:
        return "Improve your attack."
    elif itemID4 == 4:
        return "Improve your defense."
    elif itemID4 == 5:
        return "Changes your attack."
    else:
        # None
        return "Empty slot."

# Item list:
# Explination: okay Classes don't work properly so i can't create OOP like item definitions so im going to use ids. (Its gonna be kinda slow)
# 0 = None
# 1 = HealthPotion
# 2 = Burger
# 3 = Iron_Sword
# 4 = Wooden_Shield
# 5 - Crossbow
# 6 = Iron_Armour_Set (TODO)
def getImage(itemID5: number):
    if itemID5 == 1:# Health pot
        return assets.image("""HealthItem""")
    elif itemID5 == 2:# Burger
        return assets.image("""BurgerItem""")
    elif itemID5 == 3:
        return assets.image("""SwordItem""")
    elif itemID5 == 4:
        return assets.image("""ShieldItem""")
    elif itemID5 == 5:
        return assets.image("""CrossbowItem""")
    else:
        # None
        return assets.image("""EmptyItem""")

def useItem(itemID: number):
    global playerAttack, playerDefense
    # None
    if [1, 2].index(itemID) >= 0:# Health pot and burger
        info.change_life_by(2)
        if info.life() >= 6:
            info.set_life(5)
    elif itemID == 3:# Sword
        playerAttack += 1
    elif itemID == 4:# Shield
        playerDefense += 1
### Inventory END 



### GUI START 
#Sends a notification to the top right of the screen.
def sendNotify(text: str):
    global notifyText
    notifyText = textsprite.create(text, 10, 15)
    notifyDisplayTimer.reset()
# Move all Inventory elements offScreen.
def offScreen():
    inventorySprite.set_position(-1000, -1000)
    for x in range(8):
        invSprites[x].set_position(-1000, -1000)
# Move all Inventory elements onScreen and into correct positions alongside update their image.
def onScreen():
    global pos, yOffset
    pos = spriteToScreen(inventorySprite)
    inventorySprite.x = pos[0]
    inventorySprite.y = pos[1]
    yOffset = 23
    for x2 in range(4):
        pos = spriteToScreen(invSprites[x2])
        invSprites[x2].x = pos[0] + (scene.screen_width() - invSprites[x2].width)
        invSprites[x2].y = pos[1] + yOffset
        invSprites[x2].z = 200
        invSprites[x2 + 4].z = 210
        if inventorySlot == x2:
            invSprites[x2].set_image(assets.image("""
                inventoryButtonLit
            """))
        else:
            invSprites[x2].set_image(assets.image("""
                inventoryButton0
            """))
        invSprites[x2 + 4].set_image(getImage(playerInventory[x2]))
        pos = spriteToScreen(invSprites[x2 + 4])
        invSprites[x2 + 4].x = pos[0] + (scene.screen_width() - invSprites[x2 + 4].width)
        invSprites[x2 + 4].y = pos[1] + yOffset
        yOffset += 18

### GUI END



### Enemies Funcs START
# This will update all nearby enemies alongside load them in and out.
# So we check where the player is and if an enemy should be their spawn it in if it's not done already.
def updateEntities():
    global prompter
    # Items update
    if prompter == None:
        for item in sprites.all_of_kind(SpriteKind.Item):
            dist = calcDistance(item.x, item.y, playerOne.x, playerOne.y)
            if dist >= 10:
                continue
            if item.overlaps_with(playerOne):
                prompter = item
                break
    else:
        dist = calcDistance(prompter.x, prompter.y, playerOne.x, playerOne.y)
        if dist >= 10:
            prompter = None
            pickupPrompt.set_position(-1000, -1000)
        else:
            pickupPrompt.set_position(prompter.x, prompter.y - pickupPrompt.height * 2)

    for playerProj in sprites.all_of_kind(SpriteKind.PlayerProjectile):
        dist = calcDistance(playerOne.x, playerOne.y, playerProj.x, playerProj.y)
        if dist >= 60:
            sprites.destroy(playerProj)
            break

    for ent in enemyList:
        ent.update()


def getEntityTexture(texID: number):
    if texID == 0:
        return assets.image("""En_Witch_Idle""")
    else:
        return None
### Enemies Funcs END



### Level Functions START
def setLevel():#Set the current level to the levelID
    global spawnedAreas, droppedItemsTable
    spawnedAreas = []
    droppedItemsTable = []
    destroyAllEntities()
    sprites.destroy_all_sprites_of_kind(SpriteKind.Item)
    
    lvl = None
    if levelID == 0:
        lvl = tilemap("""Lv0_Intro""")
    elif levelID == 1:
        lvl = tilemap("""Lv1_Dun1""")
    tiles.set_current_tilemap(lvl)

def getLevelDoorData():
    if levelID == 0:
        pos = (48,32)
        return [
                    LvlDoorData((38,24), 1, pos),
                    LvlDoorData((39,24), 1, pos),
                    LvlDoorData((40,24), 1, pos),
                    LvlDoorData((41,24), 1, pos),
                    LvlDoorData((42,24), 1, pos),
                    LvlDoorData((42,23), 1, pos),
                    LvlDoorData((42,22), 1, pos),
                    LvlDoorData((42,21), 1, pos),
                    LvlDoorData((42,20), 1, pos),
                ]
    elif levelID == 1:
        return [
                    LvlDoorData((3, 0), 0, (640, 352)),
                    LvlDoorData((25,3), 0, (640, 352))
                ]
    else:
        return []

def getLevelEnemyData():#No point to add Cache as its called once anyway. So the bool isn't changing???
    global levelID
    ##Level 1 (0) will have no enemies.
    if levelID == 1:
        return [
            EnemySpawnPointData("HallWay1", (5,12), 8, 4, [0,0])
        ]
    else:
        return []

def updateLevel():
    global levelID, playerOne, spawnedAreas
    pos = (int(playerOne.x / 16), int(playerOne.y / 16))
    for x in getLevelDoorData():
        tilePos = x.getPos()
        if tilePos[0] == pos[0] and tilePos[1] == pos[1]:
            newPos = x.getPlayerPos()
            playerOne.x = newPos[0]
            playerOne.y = newPos[1]
            levelID = x.getLvlID()
            setLevel()

    for z in getLevelEnemyData():
        if z.getNameID() in spawnedAreas:
            continue

        tilePos = z.getPos()
        distance = calcDistance(pos[0], pos[1], tilePos[0], tilePos[1])
        if distance <= z.getTrigDist():
            for eid in z.getEnemiesList():

                #Create the new sprite and add to the entity list.
                temp = EnemyEntityObject(eid)

                while True:
                    pos = (
                        Math.floor((tilePos[0] + randint(-z.getSpawnRadius(), z.getSpawnRadius())) * 16), 
                        Math.floor((tilePos[1] + randint(-z.getSpawnRadius(), z.getSpawnRadius())) * 16)
                        )
                    if not tiles.tile_at_location_is_wall(tiles.get_tile_location(pos[0] / 16, pos[1] / 16)):
                        break
                
                temp.setPos(pos)
                temp.spawnToWorld()
                temp.update()

                enemyList.append(temp)
            spawnedAreas.append(z.getNameID())

def destroyAllEntities():
    global enemyList
    for z in enemyList:
        z.getSprite().set_flag(SpriteFlag.AUTO_DESTROY, False)
        sprites.destroy( z.getSprite())

### Level Functions END



### Maths Funcs start
# Clamp reduce number within a set range.
def clamp(minNum: number, maxNum: number, value: number):
    if value < minNum:
        return minNum
    if value > maxNum:
        return maxNum
    return value
# Calculate the pixel distance from one position to another.
def calcDistance(posX1: number, posY1: number, posX2: number, posY2: number):
    xDiff = posX1 - posX2
    yDiff = posY1 - posY2
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
# Position sprite within game window by calculating the screen size and tile map size.
def spriteToScreen(textSprite: Sprite):
    # X_range = 80
    # Y_range = 60
    # tile_size = 16
    # map_size = ? (200)
    # tile_size * map_size - (X_range or Y_range)
    # So no real point making it dynamic as you can't. (So i made it dynamic. :D)
    return [clamp(80, (16 * levelSizes[levelID]) - 80 , playerOne.x) - (scene.screen_width() - textSprite.width) / 2,
        clamp(60, (16 * levelSizes[levelID]) - 60, playerOne.y) - (scene.screen_height() - textSprite.height) / 2]
#Ensures the given angle is within the limits.
def wrapDegrees(degrees):
    d = degrees % 360
    if d >= 180.0:
        d -= 360.0
    if d < -180.0:
        d += 360.0
    return d
#Converts radians to degrees.
def toDegrees(radians):
    return radians * 57.29577951308232
#Calculates the angle from one position to another.
def calcAngle(fromPosX, fromPosY, toPosX, toPosY):
    xDiff = fromPosX - toPosX
    yDiff = fromPosY - toPosY
    return wrapDegrees(toDegrees(Math.atan2(xDiff, yDiff)))

def movementVelocity(fromPosX, fromPosY, toPosX, toPosY):
    angle = calcAngle(fromPosX, fromPosY, toPosX, toPosY)
    


#Shoots a raycast from a position. using angle and distance limiter. (TileMap)
def raycastTileMap(posX, posY, angle, distance):
    currentPosX = posX / 16
    currentPosY = posY / 16
    step = 0
    
    sin = Math.sin(toRadians(angle))
    cos = Math.cos(toRadians(angle))
    toPos = (currentPosX + (distance * cos), currentPosY + (distance * sin))

    while step != distance:
        currentPosX += 1 * cos
        currentPosY += 1 * sin
        step += 1

        if(tiles.tile_at_location_is_wall(tiles.get_tile_location(int(currentPosX), int(currentPosY)))):
            return RaycastResult((posX, posY), (currentPosX, currentPosY), 1)
    return RaycastResult((posX, posY), (currentPosX, currentPosY), 0)

#Shoots a raycast from a position. using angle and distance limiter.
def raycast(posX, posY, angle, distance, spriteKind):
    currentPosX = posX
    currentPosY = posY
    step = 0
    
    sin = Math.sin(toRadians(angle))
    cos = Math.cos(toRadians(angle))
    toPos = (currentPosX + (distance * cos), currentPosY + (distance * sin))

    while step != distance:
        currentPosX += 1 * cos
        currentPosY += 1 * sin
        step += 1

        print(currentPosX+" "+currentPosY+" | "+step)

        #TODO add objects return.
    return RaycastResult((posX, posY), (currentPosX, currentPosY), 0)

#Converts degrees to radians.
def toRadians(degrees):
    return degrees * Math.PI / 180
### Maths Funcs END



#Level info START
levelSizes = [ 50, 26 ]
levelID = 1#TODO remember to set back to 0 when done.
spawnedAreas: List[String] = []#Yes kinda cringe but a bool didn't work. So this stores the NameID of areas that have spawned its enemies.
enemyList: List[EnemyEntityObject] = []
droppedItemsTable = [["", "0"]]
#Level info END



#Draw vars START
yOffset = 0
playerFrameIndex = 0
playerFrameOffsetIndex = 12
pos: List[number] = []
playerFrames = [
    assets.image("""PlayerWalkDown2"""),
    assets.image("""PlayerWalkDown1"""),
    assets.image("""PlayerWalkDown2"""),
    assets.image("""PlayerWalkDown3"""),
    assets.image("""PlayerWalkUp2"""),
    assets.image("""PlayerWalkUp1"""),
    assets.image("""PlayerWalkUp2"""),
    assets.image("""PlayerWalkUp3"""),
    assets.image("""PlayerWalkLeft2"""),
    assets.image("""PlayerWalkLeft1"""),
    assets.image("""PlayerWalkLeft2"""),
    assets.image("""PlayerWalkLeft3"""),
    assets.image("""PlayerWalkRight2"""),
    assets.image("""PlayerWalkRight1"""),
    assets.image("""PlayerWalkRight2"""),
    assets.image("""PlayerWalkRight3""")]
#Draw vars END



#Inventory START
inventorySlot = 0
inventoryOpen = False
inventoryOpenDelay = msDelay()
inventoryInputDelay = msDelay()
playerInventory = [3, 1, 2, 5]
#Inventory END



# Action START
actionSelectIndex = 0
actionsStrings = ["Inventory", "Attack", "Health Item", "TEST Raycast"]
actionSwapDelay = msDelay()
# Action END



# Sprites START
playerOne = sprites.create(assets.image("""PlayerWalkRight2"""), SpriteKind.player)
playerAction: TextSprite = None
prompter: Sprite = None
notifyText: TextSprite = None
inventorySprite = sprites.create(assets.image("""inventoryBG"""), SpriteKind.Inventory)
invSprites = [
    sprites.create(assets.image("""inventoryButton0"""),SpriteKind.Inventory),
    sprites.create(assets.image("""inventoryButton0"""),SpriteKind.Inventory),
    sprites.create(assets.image("""inventoryButton0"""),SpriteKind.Inventory),
    sprites.create(assets.image("""inventoryButton0"""),SpriteKind.Inventory),
    sprites.create(assets.image("""EmptyItem"""), SpriteKind.Inventory),
    sprites.create(assets.image("""EmptyItem"""), SpriteKind.Inventory),
    sprites.create(assets.image("""EmptyItem"""), SpriteKind.Inventory),
    sprites.create(assets.image("""EmptyItem"""), SpriteKind.Inventory)
]
pickupPrompt = textsprite.create("Press B to pickup", 10, 15)
playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
# Sprites END



#Notify Vars START
notifyDisplayTimer = msDelay()
#Notify Vars END



# Player Stats START
playerSpeed = 1
playerLevel = 1
playerAttack = 1
playerDefense = 1
playerAttackDelay = msDelay()
playerAnimDelay = msDelay()
# Player Stats END



# Vars MUL START
pickupPrompt.set_position(-1000, -1000)
scene.set_background_color(2)
game.stats = True
info.set_life(3)
scene.camera_follow_sprite(playerOne)
playerOne.setPosition(40, 40) #Original 0, 261
# Vars MUL END



# Intro Vars and Funcs START
introComplete = True#TODO set to original

def updateIntro():#21
    global introComplete, playerFrameIndex, playerAnimDelay, playerOne
    if playerAnimDelay.passedMS(150):
        playerFrameIndex += 1
        if playerFrameIndex >= 4:
            playerFrameIndex = 0

    playerOne.set_image(playerFrames[playerFrameIndex + playerFrameOffsetIndex])

    if playerOne.x != 21:
        playerOne.x += 1
    else:
        introComplete = True

# Intro Vars and Funcs END



setLevel()
offScreen()
def on_forever():
    if introComplete == False:
        updateIntro();
    else:
        updatePlayer()
        updateEntities()
        updateLevel()
forever(on_forever)
