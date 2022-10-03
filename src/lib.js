const lib = {
    ctx: null,                      // canvas drawing context
    width: 320,                     // game resolution
    height: 200,
    audioContext: null,
    sfxGainNode: null,
    isAudioEnabled: false,
    keyLeft: false,                 // key states
    keyRight: false,
    keyFire: false,
    sfx: [],                        // array to hold all loaded sounds
    gfx: [],                        // array to hold all loaded graphics

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
            this.sfxGainNode =  this.audioContext.createGain();
            this.isAudioEnabled = true;

        }
        catch(error) {
            this.isAudioEnabled = false;
        }
    },

    loadSound(url, soundIdName) {
        if(this.isAudioEnabled) {
            let request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            request.onload = () => {
                this.audioContext.decodeAudioData(request.response, (buffer) => {
                    this.sfx[soundIdName] = buffer;
                });
            }
            request.send();
        }
    },

    // gainValue = from -1.0 to 2.0
    playSound(soundIdName, gainValue) {
        if(this.isAudioEnabled) {
            let source =  this.audioContext.createBufferSource();
            source.buffer = lib.sfx[soundIdName];
            source.connect(this.sfxGainNode);
            source.connect(this.audioContext.destination);
            this.sfxGainNode.connect(this.audioContext.destination);
            this.setSfxGain(gainValue);
            source.start(0);
        }
    },

    setSfxGain(value) {
        if (value < -1) {
            value = -1;
        } else if (value > 2) {
            value = 2;
        }

        this.sfxGainNode.gain.value = value;
    },

    loadImage(url, imgIdName) {
        let img = new Image();
        img.src = url;
        this.gfx[imgIdName] = img;
    },

    drawSubImageRect(imgNameId, x, y, width, height, sourceX, sourceY) {
        this.ctx.drawImage(this.gfx[imgNameId], sourceX, sourceY, width, height,
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