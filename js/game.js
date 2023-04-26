const GameApp = {
    appName: 'Stick_Man_VS_Stick_Man',
    author: "Carlos_Liao&&Miguel_Siesto",
    version: "0.0.1",
    license: undefined,
    description: "Project developed in a week for Ironhack",
    ctx: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    background: undefined,
    wall: undefined,
    players: {
        player1: undefined,
        player2: undefined,
    },
    hitCounterP1: 0,
    hitCounterP2: 0,
    framesCounter: 0,
    gravity: undefined,
    fps: 60,
    init() {
        this.setContext()
        this.setDimensions()
        this.start()
    },

    setContext() { this.ctx = document.querySelector('canvas').getContext('2d') },

    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        document.querySelector('canvas').setAttribute('width', this.canvasSize.w)
        document.querySelector('canvas').setAttribute('height', this.canvasSize.h)
    },

    start() {
        this.createBackground()
        this.setGravity()
        this.createWall()
        this.createPlayer()
        setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.setEventListeners()
            this.hitPlayer1() ? this.hitCounterP1++ : null
            this.hitPlayer2() ? this.hitCounterP2++ : null
            this.checkLifes()
            console.log(this.hitCounterP1, this.hitCounterP2)
            this.bouncingBulletsPlayer1()
            this.bouncingBulletsPlayer2()
            this.framesCounter > 300 ? this.framesCounter = 0 : this.framesCounter++
        }, 1700 / this.fps)


    },
    setGravity() { this.gravity = this.canvasSize.h / 365 },

    setEventListeners() {
        document.onkeydown = event => {
            const { key } = event
            if (key == 'a') { this.players.player1.moveLeft(-20) }
            if (key == 'd') { this.players.player1.moveRight(20) }
            if (key == 'w') { this.players.player1.playerVelocity.y -= 40 }
            if (key == ' ') { this.players.player1.shoot() }
            if (key == 'ArrowLeft') { this.players.player2.moveLeft(-20) }
            if (key == 'ArrowRight') { this.players.player2.moveRight(20) }
            if (key == 'ArrowUp') { this.players.player2.playerVelocity.y -= 40 }
            if (key == 'l') { this.players.player2.shoot() }
        }
        document.onkeyup = event => {
            const { key } = event
            if (key == 'a') { this.players.player1.moveLeft(0) }
            if (key == 'd') { this.players.player1.moveRight(0) }
            if (key == 'w') { this.players.player1.playerVelocity.y }
            if (key == 'ArrowLeft') { this.players.player2.moveLeft(0) }
            if (key == 'ArrowRight') { this.players.player2.moveRight(0) }
            if (key == 'ArrowUp') { this.players.player2.playerVelocity.y }
        }
    },


    createPlayer() {
        this.players.player1 = new Player(
            this.ctx,
            this.canvasSize,
            "player1",
            this.wall.wallSpecs,
            this.gravity,
            this.framesCounter,
        )

        this.players.player1.setPosition(50, this.canvasSize.h - 500)

        this.players.player2 = new Player(
            this.ctx,
            this.canvasSize,
            "player2",
            this.wall.wallSpecs,
            this.gravity,
            this.framesCounter,
        )
        this.players.player2.setPosition(this.canvasSize.w - 150, this.canvasSize.h - 500)
    },

    createWall() {
        this.wall = new Wall(this.ctx, this.canvasSize)
    },

    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize)
    },
    hitPlayer1() {
        return this.players.player2.bulletsArr.some(bullet => {
            return (
                //P1 GOLPEA A P2
                this.players.player1.playerPos.x < bullet.bulletPos.x + bullet.bulletSize.w &&
                this.players.player1.playerPos.x + this.players.player1.playerSize.w > bullet.bulletPos.x &&
                this.players.player1.playerPos.y < bullet.bulletPos.y + bullet.bulletSize.h &&
                this.players.player1.playerSize.h + this.players.player1.playerPos.y > bullet.bulletPos.y
                ||  //P1 SE GOLPEA A SI MISMO
                this.players.player2.playerPos.x < bullet.bulletPos.x + bullet.bulletSize.w &&
                this.players.player2.playerPos.x + this.players.player2.playerSize.w > bullet.bulletPos.x &&
                this.players.player2.playerPos.y < bullet.bulletPos.y + bullet.bulletSize.h &&
                this.players.player2.playerSize.h + this.players.player2.playerPos.y > bullet.bulletPos.y
            )
        })
    },

    hitPlayer2() {
        return this.players.player1.bulletsArr.some(bullet => {
            return (
                //P1 GOLPEA A P2
                this.players.player2.playerPos.x < bullet.bulletPos.x + bullet.bulletSize.w &&
                this.players.player2.playerPos.x + this.players.player2.playerSize.w > bullet.bulletPos.x &&
                this.players.player2.playerPos.y < bullet.bulletPos.y + bullet.bulletSize.h &&
                this.players.player2.playerSize.h + this.players.player2.playerPos.y > bullet.bulletPos.y
                ||  //P1 SE GOLPEA A SI MISMO
                this.players.player1.playerPos.x < bullet.bulletPos.x + bullet.bulletSize.w &&
                this.players.player1.playerPos.x + this.players.player1.playerSize.w > bullet.bulletPos.x &&
                this.players.player1.playerPos.y < bullet.bulletPos.y + bullet.bulletSize.h &&
                this.players.player1.playerSize.h + this.players.player1.playerPos.y > bullet.bulletPos.y
            )
        })
    },
    checkLifes() {

        if (this.hitCounterP1 === 1) {
            document.getElementById('heart-3').style.visibility = 'hidden'
        }
        if (this.hitCounterP1 === 2) {
            document.getElementById('heart-2').style.visibility = 'hidden'
        }
        if (this.hitCounterP1 === 3) {
            document.getElementById('heart-1').style.visibility = 'hidden'
            document.getElementById('P2_wins').style.visibility = 'visible'

        }
        if (this.hitCounterP2 === 1) {
            document.getElementById('heart-4').style.visibility = 'hidden'
        }
        if (this.hitCounterP2 === 2) {
            document.getElementById('heart-5').style.visibility = 'hidden'
        }
        if (this.hitCounterP2 === 3) {
            document.getElementById('heart-6').style.visibility = 'hidden'
            document.getElementById('P1_wins').style.visibility = 'visible'
        }
    },

    bouncingBulletsPlayer1() {
        this.players.player1.bulletsArr = this.players.player1.bulletsArr.filter(bullet => {
            if (bullet.bulletPos.x > this.wall.wallSpecs.pos.x &&
                bullet.bulletPos.x < this.wall.wallSpecs.pos.x + this.wall.wallSpecs.size.w &&
                bullet.bulletPos.y > this.canvasSize.h / 2 - 70
            ) {
                return false
            }
            return true
        })

    },

    bouncingBulletsPlayer2() {
        this.players.player2.bulletsArr = this.players.player2.bulletsArr.filter(bullet => {
            if (bullet.bulletPos.x < this.wall.wallSpecs.pos.x + this.wall.wallSpecs.size.w &&
                bullet.bulletPos.x > this.wall.wallSpecs.pos.x &&
                bullet.bulletPos.y > this.canvasSize.h / 2 - 70
            ) {
                return false
            }
            return true
        })
    },

    drawAll() {
        this.background.drawBackground()
        this.wall.drawWall()
        this.players.player1.drawPlayer()
        this.players.player2.drawPlayer()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    }


}