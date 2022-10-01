const lib = {
    ctx: null,                      // canvas drawing context
    gfx: null,                      // spritesheet with all game graphics
    width: 320,                     // game resolution
    height: 200,

    keyLeft: false,                 // key states
    keyRight: false,
    keyFire: false,

    init(width, height, gfxImgId) {
        const canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);

        const element = document.getElementById('gameCanvas');
        this.ctx = element.getContext("2d");

        this.gfx = document.getElementById(gfxImgId);
    },

    drawSubImageRect(x, y, width, height, sourceX, sourceY) {
        this.ctx.drawImage(lib.gfx, sourceX, sourceY, width, height,
                           Math.floor(x), Math.floor(y), width, height);
    },

    cls(hexColor) {
        this.ctx.fillStyle = '#' + hexColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
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