
#START Items definitions
class ItemBase():
    itemName = "Empty"
    texture = assets.image("""EmptyItem""")

    def __init__(self, itemName, texture):
        self.itemname = itemName
        self.texture = texture

    def useItem(self):
        pass

    def getName(self):
        return self.itemName

    def canUse(self):
        return False

class ItemEmpty(ItemBase):
    def __init__(self):
            super().__init__("Empty", assets.image("""EmptyItem"""))

    def useItem(self):
        pass

    def getName(self):
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

    def getName(self):
        return self.itemName

    def canUse(self):
        return info.life() != 5

class ItemBurger(ItemBase):
    def __init__(self):
        super().__init__("Burger", assets.image("""BurgerItem"""))

    def useItem(self):
        if(self.canUse()):
            info.change_life_by(2)
            if(info.life() >= 6):
                info.set_life(5)

    def getName(self):
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
#END Utils


@namespace
class SpriteKind:
    Item = SpriteKind.create()

def updatePlayer():
    global playerAction, actionSelectIndex, actionsStrings
    if controller.up.is_pressed():
        playerOne.y += playerSpeed * -1
    if controller.down.is_pressed():
        playerOne.y += playerSpeed
    if controller.right.is_pressed():
        playerOne.x += playerSpeed
    if controller.left.is_pressed():
        playerOne.x += playerSpeed * -1
    if controller.A.is_pressed():#Use Actions
        pass
    if controller.B.is_pressed():#Actions
        if(actionSwapDelay.passedMS(500)):
            actionSelectIndex += 1
            if(actionSelectIndex >= 3):
                actionSelectIndex = 0
            playerAction.destroy()
            playerAction = textsprite.create(actionsStrings[actionSelectIndex], 10, 15)


    playerAction.x = clamp(
        Math.max(playerOne.x - ((scene.screen_width() - playerAction.width) / 2), (playerAction.width / 2)), 
        3118,
        playerOne.x - ((scene.screen_width() - playerAction.width) / 2)
    )
    #Good
    playerAction.y = clamp(116, 3196, (playerOne.y + ((scene.screen_height() - playerAction.height) / 2)))
        
    print("X: "+ playerOne.x +" Y:"+playerOne.y+ " width: "+playerAction.width+ " X2:"+ playerAction.x)

def updateEntities(range2: number):
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
playerInventory: List[any] = []
levelID = 0
tiles.set_current_tilemap(tilemap("""
    level1
"""))
playerOne = sprites.create(assets.image("""
    PlayerIdle
"""), SpriteKind.player)
playerSpeed = 1
scene.camera_follow_sprite(playerOne)
info.set_life(5)
game.stats = True
actionSwapDelay = msDelay()

playerOne.x = 3000
#playerOne.y = 3000

def on_forever():
    updatePlayer()
    updateEntities(16)#TODO why did i put a range value here?
    collisionCheck()
forever(on_forever)
