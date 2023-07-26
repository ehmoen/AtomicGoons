import { Symbols } from './symbols.js';
import { Arrow } from './arrow.js';
import { Timer } from './timer.js';
import { Goon } from './goon.js';
import { EvilGoon } from './evil-goon.js';

export class AtomicGoons {
    constructor(myCanvas) {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('blur', () => this.blur());
        window.addEventListener('focus', () => this.focus());

        // images ------------------------------------------------
        this.background = new Image();
        this.background.src = '../images/background.png';

        this.hero = new Image();
        this.hero.src = '../images/hero.png';

        this.legends = new Image();
        this.legends.src = '../images/legends.png';

        // sounds ------------------------------------------------
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

        this.myColor = '#25bc3b';
        this.offsetY = 30;
        this.WIDTH = 375;
        this.HEIGHT = 667;
        this.ratio = this.WIDTH / this.HEIGHT;

        this.canvas = myCanvas;
        this.canvas.minWidth = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        //this.canvas.height = this.canvas.width * this.ratio;

        this.width = this.canvas.width - 80;
        this.height = this.canvas.height - 80;

        this.context = this.canvas.getContext('2d');
        this.canvas.addEventListener('click', (e) => this.onClick(e));

        this.currentWidth = null;
        this.currentHeight = null;

        this.resize();

        this.symbols = new Symbols()
        this.arrow = new Arrow(this, this.offsetY);
        this.timer = new Timer(this.callback, this.canvas.width);
        this.timer.isTimeout = false;
        this.explodingGoon = new EvilGoon(this);

        this.numOfGoons = 5;
        this.newGame(this.numOfGoons);
        this.soundOn = false;
        this.musicOn = false;
        this.gameScene = 0; // Game scenes: 0=start, 1=play, 2=legends

        this.isPaused = false;
        this.togglePaused();

        // score-"font"
        this.CHAR_PIXEL = 10;
        this.CHARS = [
            '111101101101111',
            '010010010010010',
            '111001111100111',
            '111001111001111',
            '101101111001001',
            '111100111001111',
            '111100111101111',
            '111001001001001',
            '111101111101111',
            '111101111001111',
        ].map(str => {
            const canvas = document.createElement('canvas');
            const s = this.CHAR_PIXEL;
            canvas.height = s * 5;
            canvas.width = s * 3;
            const context = canvas.getContext('2d');
            context.fillStyle = this.myColor;
            str.split('').forEach((fill, i) => {
                if (fill === '1') {
                    context.fillRect((i % 3) * s, (i / 3 | 0) * s, s, s);
                }
            });
            return canvas;
        });

        //
        // Game loop
        //
        //let lastTime = 0;
        this.lastAnimationFrameTime = 0;
        this.tick = (time = 0) => {
            if (!this.isPaused) {
                console.log(time / 60);
                const deltaTime = time - this.lastAnimationFrameTime;
                this.lastAnimationFrameTime = time;
                this.update(deltaTime);
                this.draw();
                requestAnimationFrame(this.tick);

            }
        };

        setTimeout((e)=>{
            this.draw();
           
        }, 100);

        //this.tick();
    }

    resize() {

        this.currentHeight = window.innerHeight;
        this.currentWidth = this.currentHeight * this.ratio;

        const ua = navigator.userAgent.toLowerCase();
        const android = ua.indexOf('android') > -1;
        const ios = (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1);

        if (android || ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        this.canvas.style.width = this.currentWidth + 'px';
        this.canvas.style.height = this.currentHeight + 'px';

        window.setTimeout(() => {
            window.scrollTo(0, 1);
        }, 1);

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
        }
        else {
            this.lastAnimationFrameTime += (now - this.pauseStartTime);
        }
    }

    drawScore(context) {
        const align = (this.width / 2) - 50;
        const cw = this.CHAR_PIXEL * 4;
        const chars = this.numOfGoons.toString().split('');
        const offset = align - (cw * chars.length / 2) + this.CHAR_PIXEL / 2;
        chars.forEach((char, pos) => {
            context.drawImage(this.CHARS[char | 0], offset + pos * cw, 30);
        });
    }

    onClick(e) {
        let evilGoon = this.goons[0];
        let offsetTop = this.canvas.offsetTop;
        let offsetLeft = this.canvas.offsetLeft;
        let scale = this.currentWidth / this.WIDTH;
        let mousePointer = {
            x: (e.clientX - offsetLeft) / scale,
            y: (e.clientY - offsetTop) / scale
        };

        if (this.timer.isTimeout) {
            this.gameScene = 1;
            this.timer.isTimeout = false;
            if (this.isPaused) {
                this.togglePaused();
                this.tick();
            }
            return;
        }

        // start game ---------------------------------------
        if(this.gameScene === 0 ) {
            this.playGoonsInAction();

            if (this.isPaused) {
                this.togglePaused();
                this.tick();
            }
            this.gameScene = 1;
            return;
        }

        // mouse pointer on header (top 85 px) --------------
        if (mousePointer.y < 85) {
            if (mousePointer.x > this.canvas.width - 75) { // sound icon
                this.soundOn = !this.soundOn;
                this.playMusic(); 
            }
            if (mousePointer.x < this.canvas.width - 75 && mousePointer.x > this.canvas.width - 175) { // music icon
                this.musicOn = !this.musicOn;
                this.playMusic(); 
            }
            if (mousePointer.x < this.canvas.width - 175 && mousePointer.x > this.canvas.width - 275) { // legends icon
                this.gameScene = 2; // *legends*
                if (!this.isPaused) {
                    this.togglePaused();
                    this.drawLegends();
                }
            }

            // for testing...
            // if (mousePointer.x < this.canvas.width - 300) {
            //     this.increaseGoons(evilGoon);
            // }
        }

        // mouse pointer on the game area under the header --
        else if(mousePointer.y > 85) {
            if (this.isPaused) {
                this.playGoonsInAction();
                this.togglePaused();
                this.gameScene = 1;
                this.tick();               
            }

            else if (this.isColliding(mousePointer, evilGoon)) {
                this.increaseGoons(evilGoon);
            }
            else { // missing evil goon, init new game
                this.gameOver();
            }
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
        if(this.soundOn) {
            this.loose.play();
        }

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

    increaseGoons(evilGoon) {
        if(this.soundOn) {
            this.shoot.play();
        }
        this.explodingGoon.pos = evilGoon.pos;
        this.explodingGoon.isExploding = true;
        this.goons.splice(0, 1);
        this.numOfGoons++;
        this.timer.reset(this.numOfGoons);
    }

    isColliding(point, goon) {
        if ((point.x > goon.pos.x && point.x < goon.pos.x + 70) && (point.y > goon.pos.y && point.y < goon.pos.y + 70)) {
            return true;
        }
        return false;
    }

    newGame() {
        this.goons = [];

        for (let i = 0; i <= this.numOfGoons - 1; i++) {
            this.goons.push(new Goon(this));
        }
    }

    update(time) {
        if (this.explodingGoon.isExploding) {
            this.explodingGoon.update(time);
            this.goons.forEach(g => g.animate(time));
        }
        else {
            this.goons.forEach(g => g.update(time));
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
        }
        else if (this.gameScene === 1) {
            this.context.drawImage(this.background, 0, 0, this.background.width, this.background.height, 0, 0, this.canvas.width, this.canvas.height);
            this.drawHeader();
            this.drawGameArea();
        }
        else if (this.gameScene === 2) {
            this.drawLegends();
        }
        else if (this.gameScene === 3) {
            this.drawGameOver();
        }
    }

    drawHeader() {
        this.symbols.drawSound(this.context, this.myColor, this.canvas.width, this.offsetY, this.soundOn);
        this.symbols.drawMusic(this.context, this.myColor, this.canvas.width, this.offsetY, this.musicOn);
        this.symbols.drawLegend(this.context, this.myColor, this.canvas.width, this.offsetY);
        this.arrow.draw(this.context, "#ffff00");

        this.timer.draw(this.context, this.myColor);
        this.drawScore(this.context);
    }

    drawGameArea() {
        this.goons.forEach(g => g.drawGoon(this.context));
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
    }

    //
    // Audio -----------------------------------------------------------------------------------------------------------------------------------------
    //
    playMusic() {
        if(this.musicOn && this.soundOn) {
            this.soundTrack.play();
        }
        else {
            this.soundTrack.pause();
            this.soundTrack.currentTime = 0;
        }
    }
}
