class Bullet {
    constructor(ctx, { w, h }, playerPosX, playerPosY, playerIDValue, gravity) {
        this.ctx = ctx
        this.imageInstance = undefined
        this.canvasSize = {
            w: w,
            h: h
        }
        this.playerID = playerIDValue
        this.bulletPos = {
            x: playerPosX,
            y: playerPosY
        }
        this.bulletSize = {
            w: 30,
            h: 30,
        }
        this.bulletVelocity = {
            x: 55,
            y: 50
        }
        this.gravity = gravity * 7
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = "./images/banana.png"
    }
    drawBullet() {
        this.ctx.drawImage(
            this.imageInstance,
            this.bulletPos.x,
            this.bulletPos.y,
            30,
            30
        )
        this.move()
    }
    move() {

        if (this.playerID === "player1") {
            this.bulletPos.y -= this.bulletVelocity.y   //horizontalidad de las balas
            this.bulletPos.x += this.bulletVelocity.x
            if (this.bulletPos.y < this.canvasSize.h / 2) { this.bulletVelocity.y -= this.gravity } ///gravedad de las balas
            if (this.bulletPos.y > this.canvasSize.h - 100) { this.turnY() }    //rebota abajo
            if (this.bulletPos.y < 0) { this.turnY() }  //rebota arriba 
        }
        if (this.playerID === "player2") {
            this.bulletPos.y -= this.bulletVelocity.y    //horizontalidad
            this.bulletPos.x -= this.bulletVelocity.x
            if (this.bulletPos.y < this.canvasSize.h / 2) { this.bulletVelocity.y -= this.gravity } //gravedad de las balas
            if (this.bulletPos.y > this.canvasSize.h - 100) { this.turnY() } //rebota abajo
            if (this.bulletPos.y < 0) { this.turnY() }//rebota arriba
        }
    }
    turnY() { this.bulletVelocity.y *= -1 }
    turnX() { this.bulletVelocity.x *= -1 }

}