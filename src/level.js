import lib from "./lib";

const level = {
    width: 13,
    height: 21,
    brickWidth: 16,
    brickHeight: 8,
    tileMap:[],

    drawBricks: function() {
        const xOffset = 8;
        const yOffset = 8;

        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                let tileId = this.tileMap[x + (y * this.width)];

                if (tileId > 0) {
                    let sourceX = (tileId - 1) * 16;
                    let sourceY = 0;
                    lib.drawSubImageRect(xOffset + x * this.brickWidth, yOffset + y * this.brickHeight,
                        this.brickWidth, this.brickHeight, sourceX, sourceY);
                }
            }
        }
    },

    drawBorder: function() {
        lib.drawSubImageRect(0, 0, 8, 8, 0, 48);
        lib.drawSubImageRect(216, 0, 8, 8, 16, 48);

        for (let x = 1; x < 27; x++) {
            lib.drawSubImageRect(x * 8, 0, 8, 8, 8, 48);
        }

        for (let y = 1; y < 24; y++) {
            lib.drawSubImageRect(0, y * 8, 8, 8, 0, 56);
            lib.drawSubImageRect(216, y * 8, 8, 8, 16, 56);
        }
    },

    getBrickId: function(x, y) {
        let xm = Math.floor((x - 8) / this.brickWidth);
        let ym = Math.floor((y - 8) / this.brickHeight);
        if (xm < 0 || ym < 0 || xm > this.width || ym > this.height) return -1;
        return this.tileMap[xm + (ym * this.width)];
    },

    setBrickId: function(id, x, y) {
        let xm = Math.floor((x - 8) / this.brickWidth);
        let ym = Math.floor((y - 8) / this.brickHeight);
        if (xm >= 0 || ym >= 0 || xm <= this.width || ym <= this.height) {
            this.tileMap[xm + (ym * this.width)] = id;
        }
    }
};

export default level;