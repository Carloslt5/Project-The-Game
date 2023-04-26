class Background {
    constructor(ctx, { w, h }, framesCounter) {
        this.ctx = ctx;
        this.backgroundSize = {
            w: w,
            h: h
        }
        this.image = new Image()
        this.image.src = './images/fondoBN.png'

    }
    drawBackground() {
        /*  this.ctx.fillStyle = 'grey'
         this.ctx.fillRect(0, 0, this.backgroundSize.w, this.backgroundSize.h) */
        this.ctx.drawImage(
            this.image,
            0, 0,
            this.backgroundSize.w,
            this.backgroundSize.h
        )
    }

}