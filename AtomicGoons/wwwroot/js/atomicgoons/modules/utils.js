export function drawCircle(context, posX, posY, rad, color) {
    context.beginPath();
    context.arc(posX, posY, rad, 0, 2 * Math.PI, false);
// context.fillStyle = 'green';
// context.fill();
    context.lineWidth = 5;
    context.strokeStyle = color;
    context.stroke();
}