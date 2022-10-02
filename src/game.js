import Ball from './ball';
import player from './player';
import level from './level';

import lib from './lib';
import { levelData } from './level/levelData';

let game = {
    level: 0,
    score: 112,
    balls: 0,
    ball: null,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    shadowAlphaValue: 0.5,
    playfieldOffsetX: 8,
    playfieldOffsetY: 8
};

function gameInit() {
    lib.init(320, 200, 'gameGfx');
    lib.addKeyEvents();

    level.tileMap = [...levelData[game.level]];
    game.ball = new Ball();
    player.init();

    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
    updateGame();
    renderGame();
    window.requestAnimationFrame(gameLoop);
}

function renderGame() {
    lib.cls('000');
    level.drawBackground();

    lib.setAlpha(game.shadowAlphaValue);
    level.drawBorderShadows(game);
    level.drawBrickShadows(game);
    drawSpriteShadows();
    lib.setAlpha(1.0);

    level.drawBricks(game);
    level.drawBorder();
    drawSprites();
}

function updateGame() {
    player.update();
    game.ball.update(player);
}

function drawSprites() {
    lib.drawSubImageRect(player.x, player.y, player.width, player.height, player.sourceX, player.sourceY);
    lib.drawSubImageRect(game.ball.x, game.ball.y,game.ball.width, game.ball.height, game.ball.sourceX, game.ball.sourceY);
}

function drawSpriteShadows() {
    lib.drawSubImageRect(game.ball.x + game.shadowOffsetX, game.ball.y + game.shadowOffsetY,
                         game.ball.width, game.ball.height, 32, 80);

    lib.drawSubImageRect(player.x + game.shadowOffsetX, player.y + game.shadowOffsetY,
                         player.width, player.height, 0,80);

}

gameInit();