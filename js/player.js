class Player {
    constructor(ctx, { w, h }, playerIdValue, wallSpecsValue, framesCounter, movements) {
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
        this.activeShoot = false
        this.movements = movements
        this.wallSpecs = wallSpecsValue
        this.bulletsArr = []
        this.gravity = 1
        this.framesCounter = framesCounter
        this.init()
        this.setPosition()
    }

    init() {
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
            this.image.width / this.image.frames,
            50,
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h,

        )
        this.move()
        this.bulletsArr.forEach(bullet => bullet.drawBullet())
        this.clearBullets()
    }

    animate() {
        if (this.framesCounter % 2 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0
        }
    }

    move() {
        this.playerPos.y += this.playerVelocity.y
        this.playerPos.x += this.playerVelocity.x

        //Movimientos verticales automaticos
        if (this.playerPos.y + this.playerSize.h < this.canvasSize.h - 50) {
            this.playerVelocity.y += this.gravity
        } else {
            this.playerVelocity.y = 0
        }

        if (this.playerPos.y + this.playerSize.h < 0) {
            this.playerVelocity.y *= 1
        }
        //Movimientos de player 1
        if (this.playerID === 'player1') {
            if (this.movements.isPlayer1MovingRight) {
                if (this.playerPos.x + this.playerSize.w > this.wallSpecs.pos.x) {
                    this.playerVelocity.x = 0
                } else {
                    this.playerVelocity.x = 10
                    this.animate()
                }
            } else {
                this.playerVelocity.x = 0
            }
            if (this.movements.isPlayer1MovingLeft) {
                if (this.playerPos.x < 0) {
                    this.playerVelocity.x = 0
                } else {
                    this.playerVelocity.x = -10
                }
                this.animate()
            }
            if (this.movements.isPlayer1Jumping) {
                if (this.playerPos.y < 0) {
                    this.playerVelocity.y = 0

                } else {
                    this.playerVelocity.y = -10
                }
                this.animate()
            }
        }

        //Movimientos del player 2
        if (this.playerID === 'player2') {
            if (this.movements.isPlayer2MovingRight) {
                if (this.playerPos.x + this.playerSize.w > this.canvasSize.w) {
                    this.playerVelocity.x = 0
                } else {
                    this.playerVelocity.x = 10
                    this.animate()
                }
            } else {
                this.playerVelocity.x = 0
            }
            if (this.movements.isPlayer2MovingLeft) {
                if (this.playerPos.x < this.wallSpecs.pos.x + this.wallSpecs.size.w) {
                    this.playerVelocity.x = 0
                } else {
                    this.playerVelocity.x = -10
                }
                this.animate()
            }
            if (this.movements.isPlayer2Jumping) {
                if (this.playerPos.y < 0) {
                    this.playerVelocity.y = 0
                } else {
                    this.playerVelocity.y = -10
                    this.animate()
                }
            }

        }

    }

    shoot() {
        if (this.bulletsArr.length < 6) {
            this.bulletsArr.push(new Bullet(
                this.ctx,
                this.canvasSize,
                this.playerPos.x,
                this.playerPos.y,
                this.playerID,
                this.gravity));
        }
    }
    /*   shoot() {
          this.activeShoot = true
          if (this.activeShoot) {
              if (this.bulletsArr.length < 6) {
                  this.bulletsArr.push(new Bullet(
                      this.ctx,
                      this.canvasSize,
                      this.playerPos.x,
                      this.playerPos.y,
                      this.playerID,
                      this.gravity)
                  )
                  console.log(this.activeShoot)
                  this.activeShoot = false
              }
          }
          console.log(this.bulletsArr)
      } */

    clearBullets() {
        this.bulletsArr = this.bulletsArr.filter(bullet => {
            if (this.playerID === 'player1') {
                if (bullet.bulletPos.x < this.canvasSize.w) {
                    return true
                }
                if (bullet.bulletPos.x > 0 || bullet.bulletPos.x + bullet.bulletSize.w > this.canvasSize.w) {
                    return false
                }
            }
            if (this.playerID === 'player2') {
                if (bullet.bulletPos.x > 0) {
                    return true
                }
                if (bullet.bulletPos.x < 0 || bullet.bulletPos.x + bullet.bulletSize.w > this.canvasSize.w) {
                    return false
                }
            }
        })
    }



}



