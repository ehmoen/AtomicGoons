import {AtomicGoons} from "../atomicgoons";

export class Goon {
    private atomicGoons: AtomicGoons;
    private myImage: HTMLImageElement;
    private shift: number;
    private frameWidth: number;
    private frameHeigth: number;
    private totalFrames: number;
    private currentFrame: number;
    private animeTicker: number;
    private animeSpeed: number;
    private speed: number;
    private pos: { x: number; y: number };
    private direction: number;
    private directionTicker: any;
    private directionChangeSpeed: number;
    constructor(atomicGoons: AtomicGoons, arrow: any) {
        this.atomicGoons = atomicGoons;

        this.myImage = new Image();
        this.myImage.src = "../images/goon.png";

        this.shift = 0;
        this.frameWidth = 70;
        this.frameHeigth = 70;
        this.totalFrames = 19;
        this.currentFrame = 0;
        this.animeTicker = 0;
        this.animeSpeed = 64;

        this.speed = 0.1;
        this.pos = 
        { 
            x: this.atomicGoons.width * Math.random() | 0, 
            y: 80 + (this.atomicGoons.height - 80) * Math.random() | 0 
        };
        // this.pos =
        //     {
        //         x: this.atomicGoons.width * Math.random() | 0,
        //         y: this.atomicGoons.height * Math.random() | 0
        //     };

        this.direction = 4 * Math.random() | 0;

        this.directionTicker = 0;
        this.directionChangeSpeed = 5000; // * Math.random | 0;
    }

    update(deltaTime: number) {

        this.animate(deltaTime);
        this.setDirection(deltaTime);

        if (this.direction === 0) { // Right
            this.pos.x += this.speed * deltaTime;
            if(this.pos.x >= this.atomicGoons.width) {
                this.direction = 1;
            }
        }
        if (this.direction === 1) { // Left
            this.pos.x -= this.speed * deltaTime;
            if(this.pos.x <= 0) {
                this.direction = 0;
            }
        }
        if (this.direction === 2) { // Up
            this.pos.y -= this.speed * deltaTime;
            if(this.pos.y <= 100) {
                this.direction = 3;
            }
            
        }
        if (this.direction === 3) { // Down
            this.pos.y += this.speed * deltaTime;
            if(this.pos.y >= this.atomicGoons.height) {
                this.direction = 2;
            }
        }
    }

    animate(deltaTime: number) {
        if (this.currentFrame === this.totalFrames) {
            this.shift = 0;
            this.currentFrame = 0;
        }

        this.animeTicker += deltaTime;
        if (this.animeTicker > this.animeSpeed) {
            this.currentFrame++;
            this.shift += this.frameWidth;
            this.animeTicker = 0;
        }
    }

    setDirection(deltaTime: number) {
        this.directionTicker += deltaTime;
        if (this.directionTicker > this.directionChangeSpeed) {
            this.direction = 4 * Math.random() | 0;    
            this.directionTicker = 0;
            this.directionChangeSpeed = 5000 * Math.random() | 0;
        }
    }

    drawGoon(context: { drawImage: (arg0: HTMLImageElement, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number, arg7: number, arg8: number) => void; }) {
        context.drawImage(this.myImage, this.shift, 0, this.frameWidth, this.frameHeigth, this.pos.x, this.pos.y, this.frameWidth, this.frameHeigth);
    }
}