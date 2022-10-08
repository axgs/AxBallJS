import lib from './lib';

let player = {
    x: 0,
    y: 0,
    width: 32,
    height: 8,
    sourceX: 0,
    sourceY: 72,
    shadowSourceX: 0,
    shadowSourceY: 80,
    speed: 0,

    init: function() {
        this.x = (240 - this.width) / 2;
        this.y = lib.height - this.height * 2;
        this.speed = 2;
    },

    update: function() {
        if (lib.keyLeft) {
            this.x -= this.speed;
            if (this.x <= 8) this.x = 8;
        } else if (lib.keyRight) {
            this.x += this.speed;
            if (this.x >= 216 - this.width) this.x = 216 - this.width;
        }
    }
};

export default player;