export class Goon {
    constructor(atomicGoons, arrow) {
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

    update(deltaTime) {

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

    animate(deltaTime) {
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

    setDirection(deltaTime) {
        this.directionTicker += deltaTime;
        if (this.directionTicker > this.directionChangeSpeed) {
            this.direction = 4 * Math.random() | 0;    
            this.directionTicker = 0;
            this.directionChangeSpeed = 5000 * Math.random() | 0;
        }
    }

    drawGoon(context) {
        context.drawImage(this.myImage, this.shift, 0, this.frameWidth, this.frameHeigth, this.pos.x, this.pos.y, this.frameWidth, this.frameHeigth);
    }
}