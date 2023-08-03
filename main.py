# TODO list:
# 1. Create enemies. (Multiple types with different behaviour)
# 2. Complete the game world.
# 3. Add player stats attack, defense and more.
# Low Prio list:
# 1. Add stats screen
# 2. Inventory doesn't show on the console for some reason. Not sure why?
# 3. Fix Visual bug when Inventory is rendered over a tile map wall.

class EnemySpawnData():
    pos = (0,0)
    rangeOffset = 0
    trigDist = 0
    enemiesList = []

    def __init__(pos, rangeOffset, trigDist, enemiesList):
        self.pos = pos
        self.rangeOffset = rangeOffset
        self.trigDist = trigDist
        self.enemiesList = enemiesList

    def getPos(self):
        return self.pos

    def getOffset(self):
        return self.rangeOffset

    def getTrigDist(self):
        return self.trigDist

    def getEnemiesList(self):
        return self.enemiesList

@namespace
class SpriteKind:
    Item = SpriteKind.create()
    Inventory = SpriteKind.create()
    PlayerProjectile = SpriteKind.create()

def useItem(itemID: number):
    global playerAttack, playerDefense
    # None
    if [1, 2].index(itemID) >= 0:
        # Health pot and burger
        info.change_life_by(2)
        if info.life() >= 6:
            info.set_life(5)
    elif itemID == 3:
        # Sword
        playerAttack += 1
    elif itemID == 4:
        # Shield
        playerDefense += 1
    else:
        pass
# Main instructions
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
# END Inventory
# START Utils
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

# Clamp reduce number within a set range.
def clamp(minNum: number, maxNum: number, value: number):
    if value < minNum:
        return minNum
    if value > maxNum:
        return maxNum
    return value
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
                droppedItemsTable.append([str(tempSprite), "" + str(itemID22)])
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
                    if actionSelectIndex >= 3:
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
# Position sprite within game window by calculating the screen size and tile map size.
def spriteToScreen(textSprite: Sprite):
    # X_range = 80
    # Y_range = 60
    # tile_size = 16
    # map_size = ? (200)
    # tile_size * map_size - (X_range or Y_range)
    # So no real point making it dynamic as you can't.
    return [clamp(80, 3120, playerOne.x) - (scene.screen_width() - textSprite.width) / 2,
        clamp(60, 3140, playerOne.y) - (scene.screen_height() - textSprite.height) / 2]
def sendNotify(text: str):
    global notifyText
    notifyText = textsprite.create(text, 10, 15)
    notifyDisplayTimer.reset()
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

        
def useCondition(itemID3: number):
    if [1, 2].index(itemID3) >= 0:
        # Health pot
        return info.life() != 5
    if [3, 4].index(itemID3) >= 0:
        return True
    else:
        # None
        return False
# Calculate the pixel distance from one position to another.
def calcDistance(posX1: number, posY1: number, posX2: number, posY2: number):
    global xDiff, yDiff
    xDiff = posX1 - posX2
    yDiff = posY1 - posY2
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
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
    else:
        # None
        return "Empty slot."
# END Items
# START Inventory
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

#Checks whether entities should spawn or not.
def spawnCheck():
    pass

# START Items
# Item list:
# Explination: okay Classes don't work properly so i can't create OOP like item definitions so im going to use ids. (Its gonna be kinda slow)
# 0 = None
# 1 = HealthPotion
# 2 = Burger
# 3 = Iron_Sword
# 4 = Wooden_Shield
# 5 = Iron_Armour_Set (TODO)
def getImage(itemID5: number):
    if itemID5 == 1:
        # Health pot
        return assets.image("""
            HealthItem
        """)
    elif itemID5 == 2:
        # Burger
        return assets.image("""
            BurgerItem
        """)
    elif itemID5 == 3:
        return assets.image("""
            SwordItem
        """)
    elif itemID5 == 4:
        return assets.image("""
            ShieldItem
        """)
    else:
        # None
        return assets.image("""
            EmptyItem
        """)
yOffset = 0
pos: List[number] = []
yDiff = 0
xDiff = 0
playerFrameIndex = 0
playerFrameOffsetIndex = 0
inventorySlot = 0
inventoryOpen = False
playerFrames: List[Image] = []
playerOne: Sprite = None
actionSelectIndex = 0
playerAction: TextSprite = None
playerInventory: List[number] = []
actionsStrings: List[str] = []
droppedItemsTable: List[List[str]] = []
pickupPrompt: TextSprite = None
invSprites: List[Sprite] = []
inventorySprite: Sprite = None
# Prompt
prompter: Sprite = None
# START of on start
# notify
notifyText: TextSprite = None
notifyDisplayTimer = msDelay()
# Inventory Vars
inventorySprite = sprites.create(assets.image("""
    inventoryBG
"""), SpriteKind.Inventory)
inventoryOpenDelay = msDelay()
inventoryInputDelay = msDelay()
invSprites = [sprites.create(assets.image("""
            inventoryButton0
        """),
        SpriteKind.Inventory),
    sprites.create(assets.image("""
            inventoryButton0
        """),
        SpriteKind.Inventory),
    sprites.create(assets.image("""
            inventoryButton0
        """),
        SpriteKind.Inventory),
    sprites.create(assets.image("""
            inventoryButton0
        """),
        SpriteKind.Inventory),
    sprites.create(assets.image("""
        EmptyItem
    """), SpriteKind.Inventory),
    sprites.create(assets.image("""
        EmptyItem
    """), SpriteKind.Inventory),
    sprites.create(assets.image("""
        EmptyItem
    """), SpriteKind.Inventory),
    sprites.create(assets.image("""
        EmptyItem
    """), SpriteKind.Inventory)]
pickupPrompt = textsprite.create("Press B to pickup", 10, 15)
pickupPrompt.set_position(-1000, -1000)
droppedItemsTable = [["", "0"]]
# START Consts
maxNumItems = 4
actionsStrings = ["Inventory", "Attack", "Health Item"]
# In the future add stats window
# END Consts
# There is a minimap extension that i could use? maybe get the core game in then start adding features. This is to test the consoles limits.
scene.set_background_color(2)
tiles.set_current_tilemap(tilemap("""
    level1
"""))
game.stats = True
# This not working ill use ids instead. Inheritance might be broken or something.
playerInventory = [3, 1, 2, 4]
info.set_life(3)
actionSwapDelay = msDelay()
playerSpeed = 1
playerLevel = 1
playerAttack = 1
playerDefense = 1
playerAttackDelay = msDelay()
playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
playerOne = sprites.create(assets.image("""
    PlayerIdle
"""), SpriteKind.player)
scene.camera_follow_sprite(playerOne)
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
playerAnimDelay = msDelay()
# world
enemySpawnData = [EnemySpawnData((557, 278), 50, 50, [])]##TODO before this should create the enemy logic first.

# END of on start
# game.debug = True


offScreen()
def on_forever():
    updatePlayer()
    updateEntities()
    print("X: "+playerOne.x+" Y: "+playerOne.y)
forever(on_forever)
