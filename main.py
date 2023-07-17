#TODO list:
# 2. Create enemies. (Multiple types with different behaviour)
# 3. Complete the game world.
# 4. Add player animations.
# 5. Add player stats attack, defense and more.
#Low Prio list:
# 1. Add stats screen
# 2. Inventory doesn't show on the console for some reason. Not sure why?

# START Items
# Item list:
# Explination: okay Classes don't work properly so i can't create OOP like item definitions so im going to use ids. (Its gonna be kinda slow)
# 0 = None
# 1 = HealthPotion
# 2 = Burger
# 3 = Iron_Sword
# 4 = Wooden_Shield
# 5 = Iron_Armour_Set (TODO)
def getImage(itemID):
    if itemID == 1:# Health pot
        return assets.image("""HealthItem""")
    elif itemID == 2:# Burger
        return assets.image("""BurgerItem""")
    elif itemID == 3:
        return assets.image("""SwordItem""")
    elif itemID == 4:
        return assets.image("""ShieldItem""")
    else:# None
        return assets.image("""EmptyItem""")

def useItem(itemID):
    global playerAttack, playerDefense
    if itemID in (1, 2):# Health pot and burger
        info.change_life_by(2)
        if(info.life() >= 6):
            info.set_life(5)
    elif itemID == 3:#Sword
        playerAttack += 1
    elif itemID == 4:#Shield
        playerDefense += 1
    else:# None
        pass

def useCondition(itemID):
    if itemID in (1, 2):# Health pot
        return info.life() != 5
    if itemID in (3, 4):
        return True
    else:# None
        return False

def getDescription(itemID):
    if itemID == 1:# Health pot
        return "HP potion heals you."
    elif itemID == 2:# Burger
        return "Burger heals you."
    elif itemID == 3:
        return "Improve your attack."
    elif itemID == 4:
        return "Improve your defense."
    else:# None
        return "Empty slot."

# END Items
#START Inventory

#Move all Inventory elements offScreen.
def offScreen():
    global inventorySprite, invSprites
    inventorySprite.set_position(-1000, -1000)
    for x in range(0, 8):
        invSprites[x].set_position(-1000, -1000)
            
#Move all Inventory elements onScreen and into correct positions alongside update their image.
def onScreen():
    global inventorySprite, invSprites, playerInventory
    pos = spriteToScreen(inventorySprite)
    inventorySprite.x = pos[0]
    inventorySprite.y = pos[1]

    yOffset = 23
    for x in range(0, 4):
        pos = spriteToScreen(invSprites[x])
        invSprites[x].x = pos[0] + (scene.screen_width() - invSprites[x].width)
        invSprites[x].y = pos[1] + yOffset
        invSprites[x].z = 200
        invSprites[x + 4].z = 210

        if inventorySlot == x:
            invSprites[x].set_image(assets.image("""inventoryButtonLit"""))
        else:
            invSprites[x].set_image(assets.image("""inventoryButton0""")) 

        invSprites[x + 4].set_image(getImage(playerInventory[x]))
        pos = spriteToScreen(invSprites[x + 4])
        invSprites[x + 4].x = pos[0] + (scene.screen_width() - invSprites[x + 4].width)
        invSprites[x + 4].y = pos[1] + yOffset
        yOffset += 18

#END Inventory
# START Utils
#Clamp reduce number within a set range.
def clamp(minNum: number, maxNum: number, value: number):
    if value < minNum:
        return minNum
    if value > maxNum:
        return maxNum
    return value

#Calculate the pixel distance from one position to another.
def calcDistance(posX1: number, posY1: number, posX2: number, posY2: number):
    xDiff = posX1 - posX2
    yDiff = posY1 - posY2
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff)

#Position sprite within game window by calculating the screen size and tile map size.
def spriteToScreen(textSprite: Sprite):
    global playerOne
    # X_range = 80
    # Y_range = 60
    # tile_size = 16
    # map_size = ? (200)
    # tile_size * map_size - (X_range or Y_range)
    #So no real point making it dynamic as you can't.
    return [
        clamp(80, 3120, playerOne.x) - (scene.screen_width() - textSprite.width) / 2,
        clamp(60, 3140, playerOne.y) - (scene.screen_height() - textSprite.height) / 2
        ]

def sendNotify(text):
    global notifyText, notifyDisplayTimer
    notifyText = textsprite.create(text, 10, 15)
    notifyDisplayTimer.reset()

class msDelay():#This breaks blocks. and its annoying.
    time = 0

    def __init__(self):
        time = game.runtime()

    def reset(self):
        self.time = game.runtime()

    def passedMS(self, amount):
        if(game.runtime() - self.time >= amount):
            self.reset()
            return True
        else:
            return False

    def passedMSNoReset(self, amount):
        if(game.runtime() - self.time >= amount):
            return True
        else:
            return False

# END Utils
#Kind defs
@namespace
class SpriteKind:
    Item = SpriteKind.create()
@namespace
class SpriteKind:
    Inventory = SpriteKind.create()

#Main instructions
def executeAction(actionID: number):
    global inventoryOpen, inventoryOpenDelay
    if actionID == 0:# Inventory
        inventoryOpen = not inventoryOpen
    elif actionID == 1:# Attack
        print("Attack Not implemented")
    elif actionID == 2:
        for x in range(0, 4):
            itemID = playerInventory[x]
            if itemID in (1, 2):
                if useCondition(itemID):
                    useItem(itemID)
                    playerInventory[x] = 0
                    break

def updatePlayer():
    global droppedItemsTable, prompter, notifyText, notifyDisplayTimer, playerInventory, playerSpeed, playerOne, actionSelectIndex, playerAction, inventoryOpen, inventorySprite, actionSwapDelay, invSprites, inventorySlot, inventoryInputDelay
    #Inventory
    if inventoryOpen:
        onScreen()

        if inventoryInputDelay.passedMS(250):
            if controller.up.is_pressed():
                inventorySlot += -1
            elif controller.down.is_pressed():
                inventorySlot += 1
                
            if controller.left.is_pressed():#Drop Item
                itemID = playerInventory[inventorySlot]
                tempSprite = sprites.create(getImage(itemID), SpriteKind.Item)
                tempSprite.set_position(playerOne.x, playerOne.y)
                tempSprite.z = playerOne.z - 1
                droppedItemsTable.append((tempSprite.to_string(), ""+itemID))
                playerInventory[inventorySlot] = 0
            elif controller.right.is_pressed():#Inspect Item
                if notifyText == None:
                    sendNotify(getDescription(playerInventory[inventorySlot]))

        inventorySlot = clamp(0, 3, inventorySlot)
        if controller.A.is_pressed(): 
            if inventoryOpenDelay.passedMS(200):
                inventoryOpen = False
                offScreen()
                actionSwapDelay.reset()
        elif controller.B.is_pressed():
            itemID = playerInventory[inventorySlot]
            if useCondition(itemID):
                useItem(itemID)
                playerInventory[inventorySlot] = 0
    else:
        # START Movement
       
        #playerFrameIndex = 0
        #playerFrameOffsetIndex = 0
        
        moved = False
        if controller.up.is_pressed():
            playerOne.y += playerSpeed * -1
            moved = True

        elif controller.down.is_pressed():
            playerOne.y += playerSpeed
            moved = True

        if controller.right.is_pressed():
            playerOne.x += playerSpeed

        elif controller.left.is_pressed():
            playerOne.x += playerSpeed * -1

        if moved:
            pass
        else:
            playerFrameIndex = 0

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
                else:#Pick up
                    close = False
                    for dropItem in droppedItemsTable:
                        if close:
                            break
                        else:
                            if dropItem[0] == prompter.to_string():
                                for index in range(0, 4):
                                    if playerInventory[index] == 0:
                                        playerInventory[index] = int(dropItem[1])
                                        close = True
                                        prompter.set_position(-1000, -1000)
                                        prompter.set_flag(SpriteFlag.AUTO_DESTROY, True)
                                        sprites.destroy(prompter)
                                        break

        #Action Text
        textPos = spriteToScreen(playerAction)
        playerAction.x = textPos[0]
        playerAction.y = textPos[1] + (scene.screen_height() - playerAction.height)

    #Notify Text
    if notifyText != None:
        textPos = spriteToScreen(notifyText)
        notifyText.x = textPos[0] + (scene.screen_width() - notifyText.width)
        notifyText.y = textPos[1]# + (scene.screen_height() - playerAction.height)
        if notifyDisplayTimer.passedMS(2000):
            notifyText.set_position(-1000,-1000)
            notifyText.destroy()
            notifyText = None


# This will update all nearby enemies alongside load them in and out.
# So we check where the player is and if an enemy should be their spawn it in if it's not done already. 
def updateEntities():
    global prompter, playerOne
    #Items update
    if prompter == None:
        for item in sprites.all_of_kind(SpriteKind.Item):
            dist = calcDistance(item.x, item.y, playerOne.x, playerOne.y)
            if(dist >= 10):
                continue
                    
            if item.overlaps_with(playerOne):
                prompter = item
                break
    else:
        dist = calcDistance(prompter.x, prompter.y, playerOne.x, playerOne.y)
        if(dist >= 10):
            prompter = None
            pickupPrompt.set_position(-1000, -1000)
        else:
            pickupPrompt.set_position(prompter.x, prompter.y - (pickupPrompt.height * 2))

#START of on start
#notify
notifyText: TextSprite = None 
notifyDisplayTimer = msDelay()

#Inventory Vars
inventorySprite = sprites.create(assets.image("""inventoryBG"""), SpriteKind.Inventory)
inventoryOpenDelay = msDelay()
inventoryInputDelay = msDelay()
inventoryOpen = False
inventorySlot = 0
invSprites = [
    sprites.create(assets.image("""inventoryButton0"""), SpriteKind.Inventory),
    sprites.create(assets.image("""inventoryButton0"""), SpriteKind.Inventory),
    sprites.create(assets.image("""inventoryButton0"""), SpriteKind.Inventory),
    sprites.create(assets.image("""inventoryButton0"""), SpriteKind.Inventory),
    sprites.create(assets.image("""EmptyItem"""), SpriteKind.Inventory),
    sprites.create(assets.image("""EmptyItem"""), SpriteKind.Inventory),
    sprites.create(assets.image("""EmptyItem"""), SpriteKind.Inventory),
    sprites.create(assets.image("""EmptyItem"""), SpriteKind.Inventory)
]
#Prompt
prompter: Sprite = None
pickupPrompt: TextSprite = textsprite.create("Press B to pickup", 10, 15)
pickupPrompt.set_position(-1000,-1000)
droppedItemsTable = [
    ("", "0")
]

# START Consts
maxNumItems = 4
actionsStrings = ["Inventory", "Attack", "Health Item"]#In the future add stats window
# END Consts
# There is a minimap extension that i could use? maybe get the core game in then start adding features. This is to test the consoles limits.
scene.set_background_color(2)
tiles.set_current_tilemap(tilemap("""
    level1
"""))
game.stats = True
#Player
actionSelectIndex = 0
# This not working ill use ids instead. Inheritance might be broken or something.
playerInventory = [3, 1, 2, 4]
info.set_life(3)
actionSwapDelay = msDelay()
playerAction: TextSprite = None
playerOne: Sprite = None
playerSpeed = 1
playerLevel = 1
playerAttack = 1
playerDefense = 1
playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
playerOne = sprites.create(assets.image("""
    PlayerIdle
"""), SpriteKind.player)
scene.camera_follow_sprite(playerOne)
playerAnimFrame = 1
playerAnimDelay = msDelay()
#Player animations
playerFrameIndex = 0
playerFrameOffsetIndex = 0
playerFrames = [
    #Idle
    assets.image("""PlayerIdle"""),
    #Down
    assets.image("""PlayerWalkDown1"""),
    assets.image("""PlayerWalkDown2"""),
    assets.image("""PlayerWalkDown3"""),
    #Up
    assets.image("""PlayerWalkUp1"""),
    assets.image("""PlayerWalkUp2"""),
    assets.image("""PlayerWalkUp3"""),
    #Left
    #Right
]

#world

#playerOne.x = 3000
#playerOne.y = 3000
#END of on start
#game.debug = True
offScreen()
def on_forever():
    updatePlayer()
    updateEntities()
forever(on_forever)
