import lib from './lib';

class Ball {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.sourceX = 32;
        this.sourceY = 72;
        this.width = 8;
        this.height = 5;
        this.speedX = 0;
        this.speedY = 0;
        this.isOnPaddle = true;
    }

    update(player, game) {
        if (this.isOnPaddle) {
            this.x = player.x + ((player.width - this.width) / 2);
            this.y = player.y - this.height-1;

            if (lib.keyFire) {
                this.isOnPaddle = false;
                this.speedX = -1;
                this.speedY = -2;
            }
        }
        else {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.speedX < 0 && this.x <= 8) {
                this.speedX = Math.abs(this.speedX);
            } else if (this.speedX > 0 && this.x >= 256 - this.width) {
                this.speedX = -Math.abs(this.speedX);
            } else if (this.speedY < 0 && this.y <= 8) {
                this.speedY = Math.abs(this.speedY);
            } else if (this.speedY > 0 && this.y > lib.height) {
                this.lost();
            } else if (this.speedY > 0 && lib.collide(player, this)) {
                this.playerCollision(player);
            }
        }
    }

    playerCollision(player) {
        this.speedY = -Math.abs(this.speedY);
        let difX = (this.x + this.width / 2) - (player.x + player.width / 2);
        this.speedX = Math.abs(this.speedX);
        if (difX < 0) this.speedX = -Math.abs(this.speedX);
    }

    lost() {
        this.isOnPaddle = true;
    }

}

export default Ball;