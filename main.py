#TODO list
# 1. Create Inventory system.
# 2. Create enemies. (Multiple types with different behaviour)
# 3. Complete the game world.
# 4. Add player animations.
#Low Prio list
# 1. 


# START Items
# Item list:
# Explination: okay Classes don't work properly so i can't create OOP like item definitions so im going to use ids. (Its gonna be kinda slow)
# 0 = None
# 1 = HealthPotion
# 2 = Burger
# 3 = Iron_Sword (TODO)
# 4 = Wooden_Shield (TODO)
# 5 = Iron_Armour_Set (TODO)
def getImage(itemID):
    if itemID == 1:# Health pot
        return assets.image("""HealthItem""")
    elif itemID == 2:# Burger
        return assets.image("""BurgerItem""")
    else:# None
        return assets.image("""EmptyItem""")


def useItem(itemID):
    if itemID in (1, 2):# Health pot and burger
        if(useCondition(itemID)):
            info.change_life_by(2)
            if(info.life() >= 6):
                info.set_life(5)
    else:# None
        pass



def useCondition(itemID):
    if itemID in (1, 2):# Health pot
        return info.life() != 5
    else:# None
        return True

# END Items
#START Inventory

def offScreen():
    global inventorySprite, buttons
    inventorySprite.set_position(-1000, -1000)
    for x in range(0, 4):
        buttons[x].set_position(-1000, -1000)
            

def onScreen():
    global inventorySprite, buttons
    pos = spriteToScreen(inventorySprite)
    inventorySprite.x = pos[0]
    inventorySprite.y = pos[1]

    yOffset = 23
    for x in range(0, 4):
        pos = spriteToScreen(buttons[x])
        buttons[x].x = pos[0] + (scene.screen_width() - buttons[x].width)
        buttons[x].y = pos[1] + yOffset
        yOffset += 18

        if inventorySlot == x:
            buttons[x].set_image(assets.image("""inventoryButtonLit"""))
        else:
            buttons[x].set_image(assets.image("""inventoryButton0""")) 

#END Inventory
# START Utils
def clamp(minNum: number, maxNum: number, value: number):
    if value < minNum:
        return minNum
    if value > maxNum:
        return maxNum
    return value
def calcDistance(posX1: number, posY1: number, posX2: number, posY2: number):
    xDiff = posX1 - posX2
    yDiff = posY1 - posY2
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
def spriteToScreen(textSprite: Sprite):
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
    global inventoryOpen
    # Health Potion TODO add a notify system that pops up to inform the user why they can't drink or use an item.
    if actionID == 0:# Inventory
        if inventoryOpenDelay.passedMS(200):
            inventoryOpen = not inventoryOpen
            print("Open")

    elif actionID == 1:# Attack
        print("Attack Not implemented")
    elif actionID == 2:
        useItem(1)

def updatePlayer():
    global actionSelectIndex, playerAction, inventoryOpen, inventorySprite, actionSwapDelay, buttons, inventorySlot, inventoryInputDelay
    #Inventory
    if inventoryOpen:
        onScreen()

        if inventoryInputDelay.passedMS(250):
            if controller.up.is_pressed():
                inventorySlot = inventorySlot - 1
            elif controller.down.is_pressed():
                inventorySlot = inventorySlot + 1

        inventorySlot = clamp(0, 3, inventorySlot)

        if controller.B.is_pressed(): 
            if inventoryOpenDelay.passedMS(200):
                inventoryOpen = False
                actionSwapDelay.reset()
                return
        elif controller.A.is_pressed():
            pass
            #TODO add use item functionlity

    else:
        offScreen();

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
def collisionCheck():
    pass

#START of on start
# Consts
maxNumItems = 4
actionsStrings = ["Inventory", "Attack", "Health Potion"]
# Their is a minimap extension that i could use? maybe get the core game in then start adding features. This is to test the consoles limits.
scene.set_background_color(2)
actionSelectIndex = 0
# This not working ill use ids instead. Inheritance might be broken or something.
playerInventory = [0, 0, 0, 0]
levelID = 0
tiles.set_current_tilemap(tilemap("""
    level1
"""))

info.set_life(3)
game.stats = True
actionSwapDelay = msDelay()
#Player
playerSpeed = 1
playerLevel = 1
playerSpeed = 0
playerOne = sprites.create(assets.image("""
    PlayerIdle
"""), SpriteKind.player)
scene.camera_follow_sprite(playerOne)
playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
#Inventory Vars
inventorySprite = sprites.create(assets.image("""inventoryBG"""), SpriteKind.Inventory)
inventoryOpenDelay = msDelay()
inventoryInputDelay = msDelay()
inventoryOpen = False
inventorySlot = 0
buttons = [
    sprites.create(assets.image("""inventoryButton0"""), SpriteKind.Inventory),
    sprites.create(assets.image("""inventoryButton0"""), SpriteKind.Inventory),
    sprites.create(assets.image("""inventoryButton0"""), SpriteKind.Inventory),
    sprites.create(assets.image("""inventoryButton0"""), SpriteKind.Inventory)
]


#Buttons END
#playerOne.x = 3000
#playerOne.y = 3000
#END of on start

def on_forever():
    updatePlayer()
    updateEntities()
    collisionCheck()

    #print(scene.screen_width() +" " + scene.screen_height())
forever(on_forever)
