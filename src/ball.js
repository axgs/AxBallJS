import lib from './lib';
import level from './level';
import gameStartMessage from './inGameStartMessage';

class Ball {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.sourceX = 32;
        this.sourceY = 72;
        this.shadowSourceX = 32;
        this.shadowSourceY = 80;
        this.width = 6;
        this.height = 4;
        this.dirX = 0;
        this.dirY = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.isOnPaddle = true;
    }

    update(player, game) {
        if (this.isOnPaddle) {
            // ball is attached to player
            this.x = player.x + ((player.width - this.width) / 2);
            this.y = player.y - this.height;

            // ball release from player?
            if (lib.keyFire) {
                this.isOnPaddle = false;
                this.dirX = -1;
                this.dirY = -1;
                this.speedX = 0.8;
                this.speedY = 1.2;
            }
        }
        else {
            // ball movement
            this.x += this.speedX * this.dirX;
            this.y += this.speedY * this.dirY;

            // check brick collision
            let hit = false;

            // simple tile based collision on one point in each direction
            if (this.dirY < 0 && level.getBrickId(this.x + 4, this.y - 1) > 0) {
                this.dirY = 1;
                level.setBrickId(0, this.x + 4, this.y - 1);
                hit = true;
            } else if (this.dirY > 0 && level.getBrickId(this.x + 4, this.y + this.height + 1) > 0) {
                this.dirY = -1;
                level.setBrickId(0, this.x + 4, this.y + this.height + 1);
                hit = true;
            } else if (this.dirX < 0 && level.getBrickId(this.x - 1, this.y + 2) > 0) {
                this.dirX = 1;
                level.setBrickId(0, this.x - 1, this.y + 2);
                hit = true;
            } else if (this.dirX > 0 && level.getBrickId(this.x + this.width + 1, this.y + 2) > 0) {
                this.dirX = -1;
                level.setBrickId(0, this.x + this.width + 1, this.y + 2);
                hit = true;
            }

            if (hit) {
                lib.playSound('brickhit1', -0.5);
            }

            // border & player collision
            hit = false;

            if (this.dirX < 0 && this.x <= 8) {
                this.dirX = 1;
                hit = true;
            } else if (this.dirX > 0 && this.x >= 216 - this.width) {
                this.dirX = -1;
                hit = true;
            } else if (this.dirY < 0 && this.y <= 8) {
                this.dirY = 1;
                hit = true;
            } else if (this.dirY > 0 && this.y > lib.height) {
                this.lost();
                lib.playSound('lostball', -0.5);
            } else if (this.dirY > 0 && lib.collide(player, this)) {
                this.playerCollision(player);
                lib.playSound('paddlehit', -0.5);
            }

            if (hit) {
                lib.playSound('brickhit2', -0.5);
            }
        }
    }

    playerCollision(player) {
        this.dirY = -1;
        let difX = (this.x + this.width / 2) - (player.x + player.width / 2);
        this.dirX = 1;
        if (difX < 0) this.dirX = -1;
        this.speedX = Math.abs(difX / 8);
        if (this.speedX < 0.1) this.speedX = 0.1;
        if (this.speedX > 5) this.speedX = 5;
    }

    lost() {
        this.isOnPaddle = true;
        gameStartMessage.init();
    }
}

export default Ball;