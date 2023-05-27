export class Timer {
    constructor(atomicGoonsCallback, timeLeft) {
        this.atomicGoonsCallback = atomicGoonsCallback;
        this.startPosition = 0;
        this.fullPosition = timeLeft;
        this.timeLeft = timeLeft;
        this.timerTicker = 0;
        this.timerSpeed = 10;
        this.isTimeout = false;
    }

    update(deltaTime) {
        //console.log(this.timerSpeed);
        this.timerTicker += deltaTime;
        if(this.timerTicker > this.timerSpeed) {
            this.timeLeft-= 1;
            this.timerTicker = 0;
        }

        // lost the game
        if(this.timeLeft < this.startPosition) {
            if(this.isTimeout === false) {
                this.isTimeout = true;
                this.atomicGoonsCallback();
                this.reset(0);
            }
        }
    }

    draw(context, color) {
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(this.startPosition, 0);
        context.lineTo(this.startPosition, 15);
        context.lineTo(this.timeLeft, 15);
        context.lineTo(this.timeLeft, 0);
        context.lineTo(this.startPosition, 0);
        context.fill();
    }

    reset(numberOfGoons) {
        this.timerSpeed = 10 + numberOfGoons*2;
        this.timeLeft = this.fullPosition;
    }
}