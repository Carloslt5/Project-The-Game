class Background {
    constructor(ctx, { w, h }) {
        this.ctx = ctx;
        this.backgroundSize = {
            w: w,
            h: h
        }
    }
    drawBackground() {
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(0, 0, this.backgroundSize.w, this.backgroundSize.h)
    }
}