import lib from "./lib";

const level = {
    width: 13,
    height: 21,
    brickWidth: 16,
    brickHeight: 8,
    tileMap:[],

    draw: function() {
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

    getBrickId: function(x, y) {
        let xm = Math.floor((x - 8) / this.brickWidth);
        let ym = Math.floor((y - 8) / this.brickHeight);
        if (xm < 0 || ym < 0 || xm > this.width || ym > this.height) return -1;
        return this.tileMap[xm + (ym * this.width)];
    }
};

export default level;