import Ball from './ball';
import player from './player';
import level from './level';
import title from './title';

// const hitSfxUrl = require('url:../assets/sfx/hit1.wav');
const gameGfxUrl = require('url:../assets/gamegfx.png');

import lib from './lib';
import { levelData } from './level/levelData';

const state = {
    game: 1,
    gameInit: 2,
    title: 3,
    gameover: 4
};

let game = {
    gfx: null,                              // img element
    level: 0,
    score: 112,
    balls: 0,
    ball: null,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    shadowAlphaValue: 0.5,
    playfieldOffsetX: 8,
    playfieldOffsetY: 8,
    currentState: state.game
};

function gameInit() {
    lib.init(320, 200, 'gameGfx');
    lib.addKeyEvents();

    // preload data
    game.gfx = lib.loadImage(gameGfxUrl);
    lib.gfx = game.gfx;

    // start game when all data is loaded
    window.onload = function () {

        // init game

        level.tileMap = [...levelData[game.level][0].data];
        level.bgTile = levelData[game.level][0].bgTile;

        game.ball = new Ball();
        player.init();
        window.requestAnimationFrame(gameLoop);
    }
}

function gameLoop() {
    switch(game.currentState) {
        case state.game:
            updateGame();
            renderGame();
            break;

        case state.title:
            title.update();
            title.render();
    }
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