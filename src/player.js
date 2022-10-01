import lib from './lib';
import level from './level';

const player = {
    x: 0,
    y: 0,
    width: 32,
    height: 8,
    sourceX: 0,
    sourceY: 72,
    speed: 0,

    init() {
        this.x = (lib.width - this.width) / 2;
        this.y = lib.height - this.height * 2;
        this.speed = 2;
    },

    update() {
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