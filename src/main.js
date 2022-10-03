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

let main = {
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
    main.gfx = lib.loadImage(gameGfxUrl);
    lib.gfx = main.gfx;

    // start game when all data is loaded
    window.onload = function () {

        // init game

        level.tileMap = [...levelData[main.level][0].data];
        level.bgTile = levelData[main.level][0].bgTile;

        main.ball = new Ball();
        player.init();
        window.requestAnimationFrame(gameLoop);
    }
}

function gameLoop() {
    switch(main.currentState) {
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

    lib.setAlpha(main.shadowAlphaValue);
    level.drawBorderShadows(main);
    level.drawBrickShadows(main);
    drawSpriteShadows();
    lib.setAlpha(1.0);

    level.drawBricks(main);
    level.drawBorder();
    drawSprites();
}

function updateGame() {
    player.update();
    main.ball.update(player);
}

function drawSprites() {
    lib.drawSubImageRect(player.x, player.y, player.width, player.height, player.sourceX, player.sourceY);
    lib.drawSubImageRect(main.ball.x, main.ball.y,main.ball.width, main.ball.height, main.ball.sourceX, main.ball.sourceY);
}

function drawSpriteShadows() {
    lib.drawSubImageRect(main.ball.x + main.shadowOffsetX, main.ball.y + main.shadowOffsetY,
                         main.ball.width, main.ball.height, 32, 80);

    lib.drawSubImageRect(player.x + main.shadowOffsetX, player.y + main.shadowOffsetY,
                         player.width, player.height, 0,80);
}

gameInit();