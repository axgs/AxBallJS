import lib from './lib';
import level from './level';

class Ball {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.sourceX = 32;
        this.sourceY = 72;
        this.width = 6;
        this.height = 4;
        this.speedX = 0;
        this.speedY = 0;
        this.isOnPaddle = true;
    }

    update(player) {
        if (this.isOnPaddle) {
            // ball is attached to player
            this.x = player.x + ((player.width - this.width) / 2);
            this.y = player.y - this.height;

            // ball release from player?
            if (lib.keyFire) {
                this.isOnPaddle = false;
                this.speedX = -1;
                this.speedY = -2;
            }
        }
        else {
            // ball movement
            this.x += this.speedX;
            this.y += this.speedY;

            // check brick collision
            let hit = false;

            if (this.speedY < 0 && level.getBrickId(this.x + 4, this.y - 1) > 0) {
                this.speedY = Math.abs(this.speedY);
                level.setBrickId(0, this.x + 4, this.y - 1);
                hit = true;
            } else if (this.speedY > 0 && level.getBrickId(this.x + 4, this.y + this.height + 1) > 0) {
                this.speedY = -Math.abs(this.speedY);
                level.setBrickId(0, this.x + 4, this.y + this.height + 1);
                hit = true;
            } else if (this.speedX < 0 && level.getBrickId(this.x - 1, this.y + 2) > 0) {
                this.speedX = Math.abs(this.speedX);
                level.setBrickId(0, this.x - 1, this.y + 2);
                hit = true;
            } else if (this.speedX > 0 && level.getBrickId(this.x + this.width + 1, this.y + 2) > 0) {
                this.speedX = -Math.abs(this.speedX);
                level.setBrickId(0, this.x + this.width + 1, this.y + 2);
                hit = true;
            }

            if (hit) {
            }

            // border & player collision
            if (this.speedX < 0 && this.x <= 8) {
                this.speedX = Math.abs(this.speedX);
            } else if (this.speedX > 0 && this.x >= 216 - this.width) {
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