class Arrow {
    constructor(atomicGoons, offsetY) {
        this.atomicGoons = atomicGoons;
        this.arrowDirection;

        const offsetX = 20; //this.atomicGoons.width;

        this.right = { x1: 25 + offsetX, y1:0 + offsetY, x2: 50 + offsetX, y2:25 + offsetY, x3: 25 + offsetX, y3:50 + offsetY };
        this.left = { x1: 25 + offsetX, y1:0 + offsetY, x2: 0 + offsetX, y2:25 + offsetY, x3: 25 + offsetX, y3:50 + offsetY };
        this.up = { x1: 0 + offsetX, y1:25 + offsetY, x2: 25 + offsetX, y2:0 + offsetY, x3: 50 + offsetX, y3:25 + offsetY };
        this.down = { x1: 0 + offsetX, y1:25 + offsetY, x2: 25 + offsetX, y2:50 + offsetY, x3: 50 + offsetX, y3:25 + offsetY };
    }

    update(deltaTime, direction) {
        if (direction === 0) { 
            this.arrowDirection = this.right;
        }
        if (direction === 1) {
            this.arrowDirection = this.left;
        }
        if (direction === 2) { 
            this.arrowDirection = this.up;
        }
        if (direction === 3) { 
            this.arrowDirection = this.down;
        }
    }

    draw(context, color) {
        context.fillStyle = color;
        context.beginPath();        
        context.moveTo(this.arrowDirection.x1, this.arrowDirection.y1);
        context.lineTo(this.arrowDirection.x2, this.arrowDirection.y2);
        context.lineTo(this.arrowDirection.x3, this.arrowDirection.y3);
        context.fill();
    }
}

export { Arrow };