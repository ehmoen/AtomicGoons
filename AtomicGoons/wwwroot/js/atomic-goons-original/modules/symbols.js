export class Symbols {
    constructor() { }

    drawSound(context, color, offsetX, offsetY, soundOn) {

        const xOffset = offsetX - 50;
        const yOffset = offsetY;

        context.fillStyle = color;
        context.strokeStyle = color;

        context.beginPath();
        context.moveTo(25 + xOffset,0 + yOffset);
        context.lineTo(10 + xOffset, 15 + yOffset);
        context.lineTo(0 + xOffset, 15 + yOffset);
        context.lineTo(0 + xOffset, 35 + yOffset);
        context.lineTo(10 + xOffset, 35 + yOffset);
        context.lineTo(25 + xOffset,50 + yOffset);
        context.fill();

        if(!soundOn) {
            context.beginPath();
            context.moveTo(30 + xOffset, 20 + yOffset);
            context.lineTo(40 + xOffset, 30 + yOffset);
            context.stroke();

            context.beginPath();
            context.moveTo(40 + xOffset, 20 + yOffset);
            context.lineTo(30 + xOffset, 30 + yOffset);
            context.stroke();
        }
    }

    drawMusic(context, color, offsetX, offsetY, musicOn) {

        const xOffset = offsetX - 150;
        const yOffset = offsetY;

        context.fillStyle = color;
        context.strokeStyle = color;

        context.beginPath();
        context.moveTo(10 + xOffset, 50 + yOffset);
        context.lineTo(10 + xOffset, 15 + yOffset);
        context.stroke();

        context.beginPath();
        context.lineTo(40 + xOffset, 0 + yOffset);
        context.lineTo(40 + xOffset, 40 + yOffset);
        context.stroke();

        context.beginPath();
        context.moveTo(10 + xOffset, 20 + yOffset);
        context.lineTo(10 + xOffset, 15 + yOffset);
        context.lineTo(40 + xOffset, 0 + yOffset);
        context.lineTo(40 + xOffset, 5 + yOffset);
        context.fill();

        context.beginPath();
        context.arc(5 + xOffset,50 + yOffset,5,0,2*Math.PI);
        context.fill();

        context.beginPath();
        context.arc(35 + xOffset,40 + yOffset,5,0,2*Math.PI);
        context.fill();

        if(!musicOn) {
            context.beginPath();
            context.moveTo(18 + xOffset, 22 + yOffset);
            context.lineTo(28 + xOffset, 32 + yOffset);
            context.stroke();

            context.beginPath();
            context.moveTo(28 + xOffset, 22 + yOffset);
            context.lineTo(18 + xOffset, 32 + yOffset);
            context.stroke();
        }
    }

    drawLegend(context, color, offsetX, offsetY) {
        const xOffset = offsetX - 250;
        const yOffset = offsetY;

        context.fillStyle = color;
        context.strokeStyle = color;

        context.beginPath();
        context.moveTo(10 + xOffset, 0 + yOffset);
        context.lineTo(10 + xOffset, 15 + yOffset);
        context.lineTo(40 + xOffset, 15 + yOffset);
        context.lineTo(40 + xOffset, 0 + yOffset);
        context.fill();

        context.beginPath();
        context.arc(25 + xOffset,15 + yOffset,15,0,2*Math.PI);
        context.fill();

        context.beginPath();
        context.arc(15 + xOffset,5 + yOffset,15,0,Math.PI);
        context.stroke();

        context.beginPath();
        context.arc(35 + xOffset,5 + yOffset,15,0,Math.PI);
        context.stroke();

        context.beginPath();
        context.moveTo(0 + xOffset, 5 + yOffset);
        context.lineTo(50 + xOffset, 5 + yOffset);
        context.stroke();

        context.beginPath();
        context.moveTo(20 + xOffset, 25 + yOffset);
        context.lineTo(20 + xOffset, 40 + yOffset);
        context.lineTo(30 + xOffset, 40 + yOffset);
        context.lineTo(30 + xOffset, 25 + yOffset)
        context.fill();

        context.beginPath();
        context.moveTo(15 + xOffset, 40 + yOffset);
        context.lineTo(15 + xOffset, 45 + yOffset);
        context.lineTo(35 + xOffset, 45 + yOffset);
        context.lineTo(35 + xOffset, 40 + yOffset);
        context.fill();

        context.beginPath();
        context.moveTo(10 + xOffset, 45 + yOffset);
        context.lineTo(10 + xOffset, 50 + yOffset);
        context.lineTo(40 + xOffset, 50 + yOffset);
        context.lineTo(40 + xOffset, 45 + yOffset)
        context.fill();
    }

}