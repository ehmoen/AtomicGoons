import {AtomicGoons} from "../atomicgoons";

export class Arrow {
    private right: { y1: number; x1: number; y2: number; x2: any; y3: any; x3: number };
    private left: { y1: number; x1: number; y2: number; x2: number; y3: any; x3: number };
    private up: { y1: number; x1: number; y2: number; x2: number; y3: number; x3: any };
    private down: { y1: number; x1: number; y2: any; x2: number; y3: number; x3: any };
    private arrowDirection: { y1: number; x1: number; y2: number; x2: any; y3: any; x3: number };
    constructor(atomicGoons: AtomicGoons) {
        //this.atomicGoons = atomicGoons;
        //this.arrowDirection;

        const gameWidth = atomicGoons.currentWidth;
        const gameHeight = atomicGoons.currentHeight;

        const offsetY = (gameHeight / 2) - (gameWidth / 2);

        this.right = {x1: gameWidth / 2, y1: offsetY, x2: gameWidth, y2: gameWidth / 2 + offsetY, x3: gameWidth / 2, y3: gameWidth + offsetY};
        this.left = {x1: gameWidth / 2, y1: offsetY, x2: 0, y2: gameWidth / 2 + offsetY, x3: gameWidth / 2, y3: gameWidth + offsetY};
        this.up = {x1: 0, y1: gameWidth / 2 + offsetY, x2: gameWidth / 2, y2:  offsetY, x3: gameWidth, y3: gameWidth / 2 + offsetY};
        this.down = {x1: 0, y1: gameWidth / 2 + offsetY, x2: gameWidth / 2, y2: gameWidth + offsetY, x3: gameWidth, y3: gameWidth / 2 + offsetY};
    }

    update(_deltaTime: number, direction: number) {
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

    draw(context: { fillStyle: any; beginPath: () => void; moveTo: (arg0: number, arg1: number) => void; lineTo: (arg0: number, arg1: number) => void; fill: () => void; }, color: string) {
        context.fillStyle = color;
        context.beginPath();        
        context.moveTo(this.arrowDirection.x1, this.arrowDirection.y1);
        context.lineTo(this.arrowDirection.x2, this.arrowDirection.y2);
        context.lineTo(this.arrowDirection.x3, this.arrowDirection.y3);
        context.fill();
    }
}