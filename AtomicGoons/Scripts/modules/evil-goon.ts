import {AtomicGoons} from "../atomicgoons";

export class EvilGoon {
    pos: any;
    private atomicGoons: any;
    private explosion: HTMLImageElement;
    private explosionTicker: number;
    private explosionSpeed: number;
    private totalExplosionFrame: number;
    private currentExplosionFrame: number;
    private shiftExplosionFrame: number;
    private explosionFrameWidth: number;
    private explosionFrameHeight: number;
    isExploding: boolean;
    constructor(atomicGoons: AtomicGoons, arrow: any) {
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

    update(deltaTime: number) {
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

    draw(context: { drawImage: (arg0: HTMLImageElement, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number, arg7: number, arg8: number) => void; }) {
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