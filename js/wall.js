class Wall {
    constructor(ctx, { w, h }) {
        this.ctx = ctx;
        this.wallImageInstance = undefined
        this.canvasSize = {
            w: w,
            h: h,
        }

        this.wallSpecs = {
            pos: {
                x: (this.canvasSize.w / 2) - (this.canvasSize.w / 15) / 2,
                y: this.canvasSize.h - this.canvasSize.h / 2 - 30
            },
            size: {
                w: this.canvasSize.w / 15,
                h: this.canvasSize.h / 2
            },
        }
        this.wallInit()
    }
    wallInit() {
        this.wallImageInstance = new Image(),
            this.wallImageInstance.src = "./images/wall.png"
        this.drawWall()
    }

    drawWall() {
        this.ctx.drawImage(
            this.wallImageInstance,
            this.wallSpecs.pos.x,
            this.wallSpecs.pos.y,
            this.wallSpecs.size.w,
            this.wallSpecs.size.h,
        )
    }

}