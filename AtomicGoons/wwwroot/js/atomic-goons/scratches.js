const HEIGHT = window.innerHeight;
const WIDTH = HEIGHT / 2.16; //375;
const ratio = WIDTH / HEIGHT;

const myCanvas = document.getElementById("atomicgoons-canvas");
const context = myCanvas.getContext('2d');

myCanvas.width = WIDTH;
myCanvas.height = HEIGHT;

myCanvas.addEventListener('click', (e) => onCanvasClick(e));

const currentWidth = HEIGHT * ratio;

function onCanvasClick(e) {
    
    let offsetTop = myCanvas.offsetTop;
    let offsetLeft = myCanvas.offsetLeft;
    let scale = currentWidth / WIDTH;
    let mousePointer = {
        x: (e.clientX - offsetLeft) / scale,
        y: (e.clientY - offsetTop) / scale
    };
    console.log(mousePointer);
}