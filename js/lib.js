const lib = {
    ctx: null,                      // canvas drawing context
    gfx: null,                      // spritesheet with all game graphics
    width: 320,                     // game resolution
    height: 200,

    keyLeft: false,                 // key states
    keyRight: false,
    keyFire: false,

    init: function(width, height, gfxImgId) {
        const canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);

        const element = document.getElementById('gameCanvas');
        lib.ctx = element.getContext("2d");

        lib.gfx = document.getElementById(gfxImgId);
    },

    drawSubImageRect: function(x, y, width, height, sourceX, sourceY) {
        lib.ctx.drawImage(lib.gfx, sourceX, sourceY, width, height, Math.floor(x), Math.floor(y), width, height);
    },

    cls: function(hexColor) {
        lib.ctx.fillStyle = '#' + hexColor;
        lib.ctx.fillRect(0, 0, lib.width, lib.height);
    },

    collide: function(obj1, obj2) {
        return (obj1.x + obj1.width >= obj2.x &&
            obj1.y + obj1.height >= obj2.y &&
            obj1.x <= obj2.x + obj2.width &&
            obj1.y <= obj2.y + obj2.height);
    },

    addKeyEvents: function() {
        document.addEventListener("keydown", function(event) {
            switch(event.code) {
                case 'ArrowLeft':
                    lib.keyLeft = true;
                    break;

                case 'ArrowRight':
                    lib.keyRight = true;
                    break;

                case 'Space':
                    lib.keyFire = true;
                    break;
            }
        }, false);

        document.addEventListener("keyup", function(event) {
            switch(event.code) {
                case 'ArrowLeft':
                    lib.keyLeft = false;
                    break;

                case 'ArrowRight':
                    lib.keyRight = false;
                    break;

                case 'Space':
                    lib.keyFire = false;
                    break;
            }
        }, false);
    }
};

export default lib;