
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
    if controller.A.is_pressed():#Attack
        pass
    if controller.B.is_pressed():#Actions
        actionSelectIndex += 1
        if(actionSelectIndex >= 4):
            actionSelectIndex = 0
        playerAction.set_text(actionsStrings[actionSelectIndex])

    playerAction.x = (playerOne.x - 80) + (playerAction.width / 2)
    playerAction.y = playerOne.y + 56
        
def updateEntities(range2: number):
    pass
    
#Consts
maxNumItems = 4
actionsStrings = [
    "Open Inventory",
    "Attack",
    "Health Potion",
]

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




def on_forever():
    updatePlayer()
forever(on_forever)
