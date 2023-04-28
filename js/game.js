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
    fps: 60,
    movements: {
        isPlayer1MovingLeft: false,
        isPlayer1MovingRight: false,
        isPlayer1Jumping: false,
        isPlayer1Shooting: false,

        isPlayer2MovingLeft: false,
        isPlayer2MovingRight: false,
        isPlayer2Jumping: false,
        isPlayer2Shooting: false,
    },

    init() {
        this.setContext()
        this.setDimensions()
        this.start()
    },

    setContext() {
        this.ctx = document.querySelector('canvas').getContext('2d')
    },

    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth - 2,
            h: window.innerHeight - 2
        }
        document.querySelector('canvas').setAttribute('width', this.canvasSize.w)
        document.querySelector('canvas').setAttribute('height', this.canvasSize.h)
    },

    start() {
        this.createBackground()
        this.createWall()
        this.createPlayer()
        this.interval = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.setEventListeners()
            this.hitPlayer1() ? this.hitCounterP1++ : null
            this.hitPlayer2() ? this.hitCounterP2++ : null
            this.checkLifes()
            this.bouncingBulletsPlayer1()
            this.bouncingBulletsPlayer2()
            this.framesCounter > 300 ? this.framesCounter = 0 : this.framesCounter++
        }, 1700 / this.fps)


    },

    setEventListeners() {
        document.addEventListener('keydown', event => {
            const { key } = event;
            if (key === 'a') { this.movements.isPlayer1MovingLeft = true; }
            if (key === 'd') { this.movements.isPlayer1MovingRight = true; }
            if (key === 'w') { this.movements.isPlayer1Jumping = true; }
            if (key === ' ') { this.players.player1.shoot(); }
            if (key === 'ArrowLeft') { this.movements.isPlayer2MovingLeft = true; }
            if (key === 'ArrowRight') { this.movements.isPlayer2MovingRight = true; }
            if (key === 'ArrowUp') { this.movements.isPlayer2Jumping = true; }
            if (key === 'l') { this.players.player2.shoot(); }
        });

        document.addEventListener('keyup', event => {
            const { key } = event;
            if (key === 'a') { this.movements.isPlayer1MovingLeft = false; }
            if (key === 'd') { this.movements.isPlayer1MovingRight = false; }
            if (key === 'w') { this.movements.isPlayer1Jumping = false; }
            if (key === 'ArrowLeft') { this.movements.isPlayer2MovingLeft = false; }
            if (key === 'ArrowRight') { this.movements.isPlayer2MovingRight = false; }
            if (key === 'ArrowUp') { this.movements.isPlayer2Jumping = false }
        })
    },


    createPlayer() {
        this.players.player1 = new Player(
            this.ctx,
            this.canvasSize,
            "player1",
            this.wall.wallSpecs,
            this.framesCounter,
            this.movements,

        )

        this.players.player1.setPosition(50, this.canvasSize.h - 500)

        this.players.player2 = new Player(
            this.ctx,
            this.canvasSize,
            "player2",
            this.wall.wallSpecs,
            this.framesCounter,
            this.movements,
        )
        this.players.player2.setPosition(this.canvasSize.w - 150, this.canvasSize.h - 500)
    },

    createWall() {
        this.wall = new Wall(this.ctx, this.canvasSize)
    },

    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize, this.framesCounter)
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
            document.getElementById('heart-5').style.visibility = 'hidden'
        }
        if (this.hitCounterP1 === 2) {
            document.getElementById('heart-4').style.visibility = 'hidden'
        }
        if (this.hitCounterP1 === 3) {
            document.getElementById('heart-3').style.visibility = 'hidden'
        }
        if (this.hitCounterP1 === 4) {
            document.getElementById('heart-2').style.visibility = 'hidden'
        }
        if (this.hitCounterP1 === 5) {
            document.getElementById('heart-1').style.visibility = 'hidden'
            document.getElementById('P2_wins').style.visibility = 'visible'
            this.gameOver()
        }
        if (this.hitCounterP2 === 1) {
            document.getElementById('heart-6').style.visibility = 'hidden'
        }
        if (this.hitCounterP2 === 2) {
            document.getElementById('heart-7').style.visibility = 'hidden'
        }
        if (this.hitCounterP2 === 3) {
            document.getElementById('heart-8').style.visibility = 'hidden'
        }
        if (this.hitCounterP2 === 4) {
            document.getElementById('heart-9').style.visibility = 'hidden'
        }
        if (this.hitCounterP2 === 5) {
            document.getElementById('heart-10').style.visibility = 'hidden'
            document.getElementById('P1_wins').style.visibility = 'visible'
            this.gameOver()
        }
    },
    //Limpieza y rebote de bullets
    bouncingBulletsPlayer1() {
        this.players.player1.bulletsArr = this.players.player1.bulletsArr.filter(bullet => {
            if (bullet.bulletPos.x > this.wall.wallSpecs.pos.x &&
                bullet.bulletPos.x < this.wall.wallSpecs.pos.x + this.wall.wallSpecs.size.w &&
                bullet.bulletPos.y > this.canvasSize.h / 2 - 70) {
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
    },

    gameOver() {
        clearInterval(this.interval)
    }


}