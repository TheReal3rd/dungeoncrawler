
#START Items definitions
class ItemBase():# This is a template to all Items.
    itemName = "Empty"
    texture = assets.image("""EmptyItem""")

    def __init__(self, name, texture):
        self.itemName = name
        self.texture = texture

    def useItem(self):
        pass

    def getItemName(self):
        return self.itemName

    def canUse(self):
        return False

    def reason(self):
        return ""

class ItemEmpty(ItemBase):
    def __init__(self):
            super().__init__("Empty", assets.image("""EmptyItem"""))

    def useItem(self):
        pass

    def getItemName(self):
        return self.itemName

    def canUse(self):
        return False
    
class ItemHealthPotion(ItemBase):
    def __init__(self):
        super().__init__("HealthPotion", assets.image("""HealthItem""")) 

    def useItem(self):
        if(self.canUse()):
            info.change_life_by(2)
            if(info.life() >= 6):
                info.set_life(5)

    def getItemName(self):
        return self.itemName

    def canUse(self):
        return info.life() != 5

    def reason(self):
        return ""

class ItemBurger(ItemBase):
    def __init__(self):
        super().__init__("Burger", assets.image("""BurgerItem"""))

    def useItem(self):
        if(self.canUse()):
            info.change_life_by(2)
            if(info.life() >= 6):
                info.set_life(5)

    def getItemName(self):
        return self.itemName

    def canUse(self):
        return info.life() != 5
#END Items definitions
#START Utils
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

def clamp(minNum, maxNum, value):
    if(value < minNum):
        return minNum
    if(value > maxNum):
        return maxNum
    return value

def calcDistance(posX1: number, posY1: number, posX2: number, posY2: number):
    xDiff = posX1 - posX2
    yDiff = posY1 - posY2
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff)

def spriteToScreen(textSprite: Sprite):##TODO remove the hardcoded values.
    return (
        clamp(80, 3120, playerOne.x) - ((scene.screen_width() - textSprite.width) / 2) ,
        clamp(116, 3196, (playerOne.y + ((scene.screen_height() - textSprite.height) / 2)))
    )

#END Utils

@namespace
class SpriteKind:
    Item = SpriteKind.create()

def executeAction(actionID):
    if actionID == 0:#Inventory
        print("Inventory Not implmented")
    elif actionID == 1:#Attack
        print("Attack Not implemented")
    elif actionID == 2:#Health Potion TODO add a notify system that pops up to inform the user why they can't drink or use an item.
        for item in playerInventory:
            if item.getItemName() == "HealthPotion":
                if item.canUse():
                    item.useItem()
                    print("Used item")
    
def updatePlayer():
    global playerAction, actionSelectIndex, actionsStrings
    #START Movement
    if controller.up.is_pressed():
        playerOne.y += playerSpeed * -1
    if controller.down.is_pressed():
        playerOne.y += playerSpeed
    if controller.right.is_pressed():
        playerOne.x += playerSpeed
    if controller.left.is_pressed():
        playerOne.x += playerSpeed * -1
    #END Movement
    if controller.A.is_pressed():#Use Actions
        executeAction(actionSelectIndex)
    if controller.B.is_pressed():#Actions
        if(actionSwapDelay.passedMS(500)):
            actionSelectIndex += 1
            if(actionSelectIndex >= 3):
                actionSelectIndex = 0
            playerAction.destroy()
            playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
            playerAction.set_flag(SpriteFlag.AUTO_DESTROY, True)

    textPos = spriteToScreen(playerAction)
    playerAction.x = textPos[0]
    playerAction.y = textPos[1]

#This will update all nearby enemies alongside load them in and out.
#So we check where the player is and if an enemy should be their spawn it in if it's not done already. 
# The range idk why as its best to be hard coded in instead.
def updateEntities():
    pass

def collisionCheck():
    pass
    
#Consts
maxNumItems = 4
actionsStrings = [
    "Inventory",
    "Attack",
    "Health Potion",
]
#Their is a minimap extension that i could use? maybe get the core game in then start adding features. This is to test the consoles limits.

scene.set_background_color(2)
actionSelectIndex = 0
playerLevel = 1
playerSpeed = 0
playerOne: Sprite = None
playerAction: TextSprite = None
playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)
#This not working ill use ids instead. Inheritance might be broken or something.
playerInventory = [0,0,0,0]
levelID = 0
tiles.set_current_tilemap(tilemap("""
    level1
"""))
playerOne = sprites.create(assets.image("""
    PlayerIdle
"""), SpriteKind.player)
playerSpeed = 1
scene.camera_follow_sprite(playerOne)
info.set_life(1)
game.stats = True
actionSwapDelay = msDelay()
inventoryOpen = False

#playerOne.x = 3000
#playerOne.y = 3000

def on_forever():
    updatePlayer()
    updateEntities()
    collisionCheck()
forever(on_forever)
