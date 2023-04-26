class Player {
    constructor(ctx, { w, h }, playerIdValue, wallSpecsValue, gravity, framesCounter) {
        this.ctx = ctx;
        this.image = new Image()
        this.image.src = './images/player_sprite_walk.png'
        this.image.frames = 2;
        this.image.framesIndex = 0;
        this.canvasSize = {
            w: w,
            h: h,
        }
        this.playerID = playerIdValue
        this.playerPos = {
            x: undefined,
            y: undefined
        }
        this.playerSize = {
            w: this.canvasSize.w / 20,
            h: this.canvasSize.w / 20
        }

        this.playerVelocity = {
            x: 0,
            y: 0
        }
        this.wallSpecs = wallSpecsValue
        this.bulletsArr = []
        this.gravity = gravity
        this.framesCounter = framesCounter
        this.init()
        this.setPosition()
    }


    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './images/player_sprite_walk.png'
    }

    setPosition(posX, posY) {
        this.playerPos.x = posX
        this.playerPos.y = posY
    }


    drawPlayer() {

        this.ctx.drawImage(
            this.image,
            this.image.width / this.image.frames * this.image.framesIndex,
            0,
            34,
            50,
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h,

        )
        this.gravityMovement()
        this.bulletsArr.forEach(bullet => bullet.drawBullet())
        this.clearBullets()
    }

    moveRight(velocityValue) {
        this.playerVelocity.x = velocityValue

        if (this.playerID === 'player1') {
            if (this.playerPos.x + this.playerSize.w > this.wallSpecs.pos.x) {
                this.playerVelocity.x *= 0
            }
        }
        if (this.playerID === 'player2') {
            if (this.playerPos.x + this.playerSize.w > this.canvasSize.w) {
                this.playerVelocity.x *= 0
            }
        }
        this.animate(this.framesCounter)
    }

    moveLeft(velocityValue) {
        this.playerVelocity.x = velocityValue
        if (this.playerID === 'player1') {
            if (this.playerPos.x + this.playerSize.w < 0) {
                this.playerVelocity.x *= 0
            }
        }
        if (this.playerID === 'player2') {
            if (this.playerPos.x < this.wallSpecs.pos.x + this.wallSpecs.size.w) {
                this.playerVelocity.x *= 0
            }
        }
        this.animate()
    }

    animate() {
        if (this.framesCounter % 2 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0
        }
    }
    gravityMovement() {
        this.playerPos.x += this.playerVelocity.x
        this.playerPos.y += this.playerVelocity.y

        if (this.playerPos.y + this.playerSize.h < this.canvasSize.h - 50) {
            this.playerVelocity.y += this.gravity
        } else {
            this.playerVelocity.y = 0
        }
        if (this.playerPos.y + this.playerSize.h < 0) {
            this.playerVelocity.y *= 0

        }
    }
    shoot() {
        if (this.bulletsArr.length < 5) {
            this.bulletsArr.push(new Bullet(
                this.ctx,
                this.canvasSize,
                this.playerPos.x,
                this.playerPos.y,
                this.playerID,
                this.gravity));
        }
    }
    clearBullets() {
        this.bulletsArr = this.bulletsArr.filter(bullet => {
            if (this.playerID === 'player1') {
                return bullet.bulletPos.x < this.canvasSize.w

            }
            if (this.playerID === 'player2') {
                return bullet.bulletPos.x > 0
            }
        })
    }



}



