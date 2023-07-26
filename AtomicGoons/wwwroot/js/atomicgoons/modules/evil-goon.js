export class EvilGoon {
    constructor(atomicGoons, arrow) {
        this.atomicGoons = atomicGoons;

        this.explosion = new Image();
        this.explosion.src = "../images/evil-goon.png";

        this.pos = { x: 0, y: 0 };

        this.explosionTicker = 0;
        this.explosionSpeed = 16;
        this.totalExplosionFrame = 70;
        this.currentExplosionFrame = 0;
        this.shiftExplosionFrame = 0;
        this.explosionFrameWidth = 100;
        this.explosionFrameHeight = 100;

        this.isExploding = false;
    }

    update(deltaTime) {
        if (this.isExploding) {
            if (this.currentExplosionFrame === this.totalExplosionFrame) {
                this.currentExplosionFrame = 0;
                this.shiftExplosionFrame = 0;
                this.isExploding = false;
                this.atomicGoons.newGame();
            }

            this.explosionTicker += deltaTime;
            if (this.explosionTicker > this.explosionSpeed) {
                this.currentExplosionFrame++;
                this.shiftExplosionFrame += this.explosionFrameWidth;
                this.explosionTicker = 0;
            }
        }
    }

    draw(context) {
        if (this.isExploding) {
            context.drawImage(this.explosion, 
                              this.shiftExplosionFrame, 
                              0, 
                              this.explosionFrameWidth, 
                              this.explosionFrameHeight, 
                              this.pos.x - 15, 
                              this.pos.y - 20, 
                              this.explosionFrameWidth, 
                              this.explosionFrameHeight);
        }
    }
}