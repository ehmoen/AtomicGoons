import {Arrow} from './modules/arrow';
import {Timer} from './modules/timer';
import {Goon} from './modules/goon';
import {EvilGoon} from './modules/evil-goon';
// import {drawCircle} from './modules/utils.js';

// Global const
const atomicGoonsCanvas = document.getElementById('atomicgoons-canvas');
const gameButtonRow = document.getElementById("game-button-row-id");
const gameButtonNew = document.getElementById("game-button-new-id");
const soundSettings = document.getElementById("sound-settings");
const musicSettings = document.getElementById("music-settings");
const scoreCounter = document.getElementById("score-counter");

const HEIGHT = window.innerHeight;
const WIDTH = HEIGHT / 2.16;



export class AtomicGoons {
    private myColor: string;
    private numOfGoons: number;
    private arrow: Arrow;
    private timer: Timer;
    private canvas: any;
    private explodingGoon: EvilGoon;
    private soundOn: boolean;
    private musicOn: boolean;
    private gameScene: number;
    private isPaused: boolean;
    width: number;
    height: number;
    private context: any;
    currentWidth: any;
    currentHeight: any;
    private gameButtonNew: HTMLElement;
    private soundSettings: HTMLElement;
    private musicSettings: HTMLElement;
    private background: HTMLImageElement;
    private hero: HTMLImageElement;
    private legends: HTMLImageElement;
    private soundTrack: HTMLAudioElement;
    private goonsInAction: HTMLAudioElement;
    private theme: HTMLAudioElement;
    private shoot: HTMLAudioElement;
    private loose: HTMLAudioElement;
    private lastAnimationFrameTime: number;
    private tick: (time?: number) => void;
    private pauseStartTime: number;
    private goons: any;

    constructor(myCanvas: HTMLElement, gameButtonNew: HTMLElement) {
        window.addEventListener('blur', () => this.blur());
        window.addEventListener('focus', () => this.focus());

        this.myColor = '#25bc3b';
        this.numOfGoons = 5;
        scoreCounter.innerText = String(this.numOfGoons);
        
        this.setupGameAssets();
        this.setupImages();
        this.setupSounds();
        this.setupCanvas(myCanvas);

        this.arrow = new Arrow(this);
        
        this.timer = new Timer(this.callback, this.canvas.width);
        this.timer.isTimeout = false;
        
        this.explodingGoon = new EvilGoon(this, null);
        
        this.newGame(this.numOfGoons);

        this.soundOn = false;
        this.musicOn = true;

        // Game scenes: 0=start, 1=play, 2=legends
        this.gameScene = 0; 

        this.isPaused = false;
        this.togglePaused();

        this.setupGameLoop();
    }

    setupCanvas(myCanvas: HTMLElement) {
        //this.ratio = WIDTH / HEIGHT; //1 / 2.16;// 
        this.canvas = myCanvas;
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;

        this.width = this.canvas.width - 80;
        this.height = this.canvas.height - 80;

        this.context = this.canvas.getContext('2d');
        this.canvas.addEventListener('click', (e: any) => this.onClick(e));
                
        this.currentWidth = this.canvas.width;
        this.currentHeight = this.canvas.height;
    }

    setupGameAssets() {
        this.gameButtonNew = gameButtonNew;
        this.gameButtonNew.addEventListener('click', () => this.startNewGame());
        this.gameButtonNew.focus();
        
        this.soundSettings = soundSettings;
        this.soundSettings.addEventListener('click', () => this.toggleSound(this.soundSettings));

        this.musicSettings = musicSettings;
        this.musicSettings.addEventListener('click', () => this.toggleMusic(this.musicSettings));
    }
    
    setupImages() {
        this.background = new Image();
        this.background.src = '../images/background.png';

        this.hero = new Image();
        this.hero.src = '../images/hero.png';

        this.legends = new Image();
        this.legends.src = '../images/legends.png';
    }
    
    setupSounds() {
        this.soundTrack = new Audio();
        this.goonsInAction = new Audio();
        this.goonsInAction.loop = true;
        this.goonsInAction.src = '../sounds/song-goons-in-action.mp3';

        this.theme = new Audio();
        this.theme.loop = true;
        this.theme.src = '../sounds/song-main-theme.mp3';

        this.shoot = new Audio();
        this.shoot.src = '../sounds/fx-shoot.mp3';

        this.loose = new Audio();
        this.loose.src = '../sounds/fx-loose.mp3';
    }
    
    setupGameLoop() {
        this.lastAnimationFrameTime = 0;
        this.tick = (time = 0) => {
            if (!this.isPaused) {
                const deltaTime = time - this.lastAnimationFrameTime;
                this.lastAnimationFrameTime = time;
                this.update(deltaTime);
                this.draw();
                requestAnimationFrame(this.tick);
            }
        };

        setTimeout(() => {
            this.draw();
        }, 100);
    }
    
    blur() {
        if (!this.isPaused) {
            this.togglePaused();
        }
    }

    focus() {
        if (this.isPaused) {
            this.togglePaused();
        }
    }

    togglePaused() {
        let now = +new Date();
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.pauseStartTime = now;
        } else {
            this.lastAnimationFrameTime += (now - this.pauseStartTime);
        }
    }
    
    toggleSound(element: HTMLElement) {
        this.soundOn = !this.soundOn;
        
        if(this.soundOn){
            element.innerHTML = `<svg class="overview-icon">
                                    <use href="/images/sprite.svg#volume-on"></use>
                                 </svg>`;
        } else {
            element.innerHTML = `<svg class="overview-icon">
                                    <use href="/images/sprite.svg#volume-off"></use>
                                 </svg>`;
        }
        
        this.playMusic();
    }

    toggleMusic(element: HTMLElement) {
        this.musicOn = !this.musicOn;

        if(this.musicOn){
            element.innerHTML = `<svg class="overview-icon">
                                    <use href="/images/sprite.svg#music-on"></use>
                                 </svg>`;
        } else {
            element.innerHTML = `<svg class="overview-icon">
                                    <use href="/images/sprite.svg#music-off"></use>
                                 </svg>`;
        }
        
        this.playMusic();
    }

    
    drawScore(score: string | number) {
        scoreCounter.innerText = String(score);
    }

    startNewGame() {
        //if (this.gameScene === 0) {
        this.playGoonsInAction();

        if (this.isPaused) {
            this.togglePaused();
            this.tick();
        }
        this.gameScene = 1;
        gameButtonRow.classList.add("visibility-hidden");
        //}
    }

    onClick(e: { clientX: number; clientY: number; }) {
        let evilGoon = this.goons[0];
        // Gets CSS pos, and width/height 
        // Subtract the 'left' of the canvas from the X/Y positions to make (0,0) the top left of the canvas
        const cRect = this.canvas.getBoundingClientRect();
        const {clientY, clientX} = e;
        const canvasX = Math.round(clientX - cRect.left);   
        const canvasY = Math.round(clientY - cRect.top);   

        let mousePointer = {
            x: canvasX,
            y: canvasY
        };
        
        if (this.timer.isTimeout) {
            this.gameScene = 1;
            this.timer.isTimeout = false;
            if (this.isPaused) {
                this.togglePaused();
                this.tick();
            }
        } else if (this.isColliding(mousePointer, evilGoon)) {
            this.increaseGoons(evilGoon);
        } else { // missing evil goon, init new game
            this.gameOver();
            gameButtonRow.classList.remove("visibility-hidden");
        }
    }

    playGoonsInAction() {
        this.soundTrack.pause();
        this.soundTrack.currentTime = 0;
        this.soundTrack = this.goonsInAction;
        this.soundTrack.load();
        this.playMusic();
    }

    // TODO: rename callback
    callback() {
        if (atomicGoons.gameScene === 1) {
            atomicGoons.timer.isTimeout = false;
            atomicGoons.gameOver();
        }
    }

    gameOver() {
        if (this.soundOn) {
            this.loose.play();
        }

        this.saveScore(String(this.numOfGoons));
        //console.log(this.numOfGoons);

        this.soundTrack.pause();
        this.soundTrack.currentTime = 0;
        this.soundTrack = this.theme;
        this.soundTrack.load();
        this.playMusic();
        this.numOfGoons = 5;
        this.newGame(this.numOfGoons);
        this.timer.isTimeout = false;
        this.gameScene = 3;// *game-over*
        this.timer.reset(0);

        if (!this.isPaused) {
            this.togglePaused();
            this.drawGameOver();
        }
    }

    increaseGoons(evilGoon: { pos: any; }) {
        if (this.soundOn) {
            this.shoot.play().then();
        }
        this.explodingGoon.pos = evilGoon.pos;
        this.explodingGoon.isExploding = true;
        this.goons.splice(0, 1);
        this.numOfGoons++;
        this.timer.reset(this.numOfGoons);

        this.drawScore(this.numOfGoons);
    }

    isColliding(point: { x: any; y: any; }, goon: { pos: { x: number; y: number; }; }) {
        if ((point.x > goon.pos.x && point.x < goon.pos.x + 70) && (point.y > goon.pos.y && point.y < goon.pos.y + 70)) {
            return true;
        }
        return false;
    }

    newGame(numOfGoons: number) {
        this.goons = [];

        for (let i = 0; i <= this.numOfGoons - 1; i++) {
            this.goons.push(new Goon(this, null));
        }
    }

    update(time: number) {
        if (this.explodingGoon.isExploding) {
            this.explodingGoon.update(time);
            this.goons.forEach((g: { animate: (arg0: number) => any; }) => g.animate(time));
        } else {
            this.goons.forEach((g: { update: (arg0: number) => any; }) => g.update(time));
            this.arrow.update(time, this.goons[0].direction);
            this.timer.update(time);
        }
    }

    //
    // Drawing----------------------------------------------------------------------------------------------------------------------------------------
    //
    draw() {
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameScene === 0) {
            this.drawStartGame();
        } else if (this.gameScene === 1) {
            this.context.drawImage(this.background, 0, 0, this.background.width, this.background.height, 0, 0, this.canvas.width, this.canvas.height);
            this.drawHeader();
            this.drawGameArea();
        } else if (this.gameScene === 2) {
            this.drawLegends();
        } else if (this.gameScene === 3) {
            this.drawGameOver();
        }
    }

    drawHeader() {
        this.arrow.draw(this.context, "#ffff0011");
        this.timer.draw(this.context, this.myColor);
        //this.drawScore(this.context);
    }

    drawGameArea() {
        this.goons.forEach((g: { drawGoon: (arg0: any) => any; }) => g.drawGoon(this.context));
        this.explodingGoon.draw(this.context);
    }

    drawStartGame() {
        this.context.drawImage(this.hero, 0, 0, this.hero.width, this.hero.height, 0, 0, this.canvas.width, this.canvas.height);
    }

    drawLegends() {
        this.context.drawImage(this.background, 0, 0, this.background.width, this.background.height, 0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.legends, 0, 0, this.legends.width, this.legends.height, 0, 0, this.canvas.width, this.canvas.height);
    }

    drawGameOver() {
        this.context.drawImage(this.hero, 0, 0, this.hero.width, this.hero.height, 0, 0, this.canvas.width, this.canvas.height);


        // setTimeout(() => {
        //     let t = confirm("Vil du lagre scoren din?");
        //     }, 1000);
    }

    //
    // Audio -----------------------------------------------------------------------------------------------------------------------------------------
    //
    playMusic() {
        if (this.musicOn && this.soundOn) {
            this.soundTrack.play();
        } else {
            this.soundTrack.pause();
            this.soundTrack.currentTime = 0;
        }
    }


    saveScore(score: string) {
        
        console.log("Save Score from js")
        
        const formData = new FormData();
        formData.append("Score", score);

        fetch("/AtomicGoons/UpdateUserSetting/", {method: "post", body: formData})
            .then((response) => {
                if (!response.ok) {
                    throw (`${response.status}: ${response.statusText}`);
                }
                return response.text();
            })
            .then((result) => {
                // const updateDiv = document.getElementById(updateDivId);
                // setInnerHtml(updateDiv, result);
            })
            .catch((err) => console.log("ERROR:", err.message));
    }
}

const atomicGoons = new AtomicGoons(atomicGoonsCanvas, gameButtonNew);