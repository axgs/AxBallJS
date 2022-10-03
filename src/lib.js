const lib = {
    ctx: null,                      // canvas drawing context
    width: 320,                     // game resolution
    height: 200,
    audioContext: null,
    audioEnabled: false,
    keyLeft: false,                 // key states
    keyRight: false,
    keyFire: false,
    sfx: [],

    init(width, height) {
        let canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);

        const element = document.getElementById('gameCanvas');
        this.ctx = element.getContext("2d");

        this.addKeyEvents();
        this.initAudio();
    },

    initAudio() {
        try {
            this.audioContext = new AudioContext();
            this.audioEnabled = true;

        }
        catch(error) {
            console.log(error);
            this.audioEnabled = false;
        }
    },

    loadSound(url, sfxArray) {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.onload = () => {
            this.audioContext.decodeAudioData(request.response, (buffer) => {
                sfxArray.push(buffer);
            });
        }
        request.send();
    },

    playSound(audioBuffer) {
        let source =  this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        source.start(0);
    },

    startGame() {
        this.updateFunction();
        this.renderFunction();
        window.requestAnimationFrame(this.startGame);
    },

    loadImage(url) {
        this.isImageLoading = true;
        let img = new Image();
        img.src = url;
        return img;
    },

    loadAudio(url) {
        let audio = new Audio(url);
        return audio;
    },

    drawSubImageRect(img, x, y, width, height, sourceX, sourceY) {
        this.ctx.drawImage(img, sourceX, sourceY, width, height,
                           Math.floor(x), Math.floor(y), width, height);
    },

    cls(hexColor) {
        this.ctx.fillStyle = '#' + hexColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    },

    setAlpha(value) {
        this.ctx.globalAlpha = value;
    },

    collide(obj1, obj2) {
        return (obj1.x + obj1.width >= obj2.x &&
            obj1.y + obj1.height >= obj2.y &&
            obj1.x <= obj2.x + obj2.width &&
            obj1.y <= obj2.y + obj2.height);
    },

    addKeyEvents() {
        document.addEventListener("keydown", (event) => {
            switch(event.code) {
                case 'ArrowLeft':
                    this.keyLeft = true;
                    break;

                case 'ArrowRight':
                    this.keyRight = true;
                    break;

                case 'Space':
                    this.keyFire = true;
                    break;
            }
        }, false);

        document.addEventListener("keyup", (event) => {
            switch(event.code) {
                case 'ArrowLeft':
                    this.keyLeft = false;
                    break;

                case 'ArrowRight':
                    this.keyRight = false;
                    break;

                case 'Space':
                    this.keyFire = false;
                    break;
            }
        }, false);
    }
};

export default lib;