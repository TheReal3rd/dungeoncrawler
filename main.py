#TODO list:
# 2. Create enemies. (Multiple types with different behaviour)
# 3. Complete the game world.
# 4. Add player animations.
# 5. Add player stats attack, defense and more.
# 6. Add notification system to notify the user on certain stats and reasons.
# 7. Inventory add item interact options (Use, Drop, Inspect)
#Low Prio list:
# 1. Add stats screen

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
    global playerSpeed, playerOne, actionSelectIndex, playerAction, inventoryOpen, inventorySprite, actionSwapDelay, invSprites, inventorySlot, inventoryInputDelay
    #Inventory
    if inventoryOpen:
        onScreen()

        if inventoryInputDelay.passedMS(250):
            if controller.up.is_pressed():
                inventorySlot += -1
            elif controller.down.is_pressed():
                inventorySlot += 1
                
            if controller.left.is_pressed():
                pass#Drop Item
            elif controller.right.is_pressed():
                pass#Inspect

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
        if controller.up.is_pressed():
            playerOne.y += playerSpeed * -1

        elif controller.down.is_pressed():
            playerOne.y += playerSpeed

        if controller.right.is_pressed():
            playerOne.x += playerSpeed

        elif controller.left.is_pressed():
            playerOne.x += playerSpeed * -1

        # END Movement
        if controller.A.is_pressed():
            # Use Actions
            if inventoryOpenDelay.passedMS(200):
                executeAction(actionSelectIndex)
        if controller.B.is_pressed():
            # Actions
            if actionSwapDelay.passedMS(500):
                actionSelectIndex += 1
                if actionSelectIndex >= 3:
                    actionSelectIndex = 0
                    
                playerAction.destroy()
                playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
                playerAction.set_flag(SpriteFlag.AUTO_DESTROY, True)

        #Action Text
        textPos = spriteToScreen(playerAction)
        playerAction.x = textPos[0]
        playerAction.y = textPos[1] + (scene.screen_height() - playerAction.height)



# This will update all nearby enemies alongside load them in and out.
# So we check where the player is and if an enemy should be their spawn it in if it's not done already. 
def updateEntities():
    pass

#START of on start
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

# START Consts
maxNumItems = 4
actionsStrings = ["Inventory", "Attack", "Health Item"]#In the future add stats window
# END Consts
# Their is a minimap extension that i could use? maybe get the core game in then start adding features. This is to test the consoles limits.
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

#playerOne.x = 3000
#playerOne.y = 3000
#END of on start
#game.debug = True
offScreen()
def on_forever():
    updatePlayer()
    updateEntities()
forever(on_forever)
