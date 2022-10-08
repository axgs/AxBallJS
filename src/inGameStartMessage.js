import lib from "./lib";

let gameStartMessage = {
    active: false,
    x: 0,
    y: 0,
    width: 92,
    height: 18,
    sourceX: 80,
    sourceY: 120,
    speedY: 0,
    delay: 0,
    state: 0,

    init: function () {
        if (!this.active) {
            this.active = true;
            this.x = (224 - this.width) / 2;
            this.y = -this.height;
            this.delay = 10;
            this.state = 0;
            this.speedY = 6;
        }
    },

    draw: function() {
        if (this.active) {
            lib.drawSubImageRect('gamegfx', this.x, this.y, this.width, this.height, this.sourceX, this.sourceY);
        }
    },

    update: function() {
        if (this.active) {
            switch(this.state) {
                case 0:
                    this.y += this.speedY;
                    this.speedY -= 0.18;
                    if (this.speedY < 0) {
                        this.speedY = 0;
                        this.state = 1;
                    }
                    break;

                case 1:
                    this.delay -= 0.1;
                    if (this.delay < 0) {
                        this.state = 2;
                        this.speedX = 0;

                    }
                    break;

                case 2:
                    this.speedY += 0.1;
                    if (this.speedY > 4) this.speedY = 4;
                    this.y += this.speedY;
                    if (this.y > 200) {
                        this.init();
                        this.active = false;
                    }
                    break;
            }

        }
    }
};

export default gameStartMessage;
