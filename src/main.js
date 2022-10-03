import Ball from './ball';
import player from './player';
import level from './level';
import title from './title';

import lib from './lib';
import { levelData } from './level/levelData';

const hitSfxUrl = require('url:../assets/sfx/hit1.ogg');
const gameGfxUrl = require('url:../assets/gamegfx.png');

const state = {
    game: 1,
    gameInit: 2,
    title: 3,
    gameover: 4
};

let game = {
    gfx: null,                              // img element
    sfx: [],
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
    lib.init(320, 200);
    lib.addKeyEvents();

    // preload data
    game.gfx = lib.loadImage(gameGfxUrl);
    lib.loadSound(hitSfxUrl, game.sfx);

    // init game
    level.tileMap = [...levelData[game.level][0].data];
    level.bgTile = levelData[game.level][0].bgTile;

    game.ball = new Ball();
    player.init();

    window.requestAnimationFrame(gameLoop);
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
    level.drawBackground(game);

    lib.setAlpha(game.shadowAlphaValue);
    level.drawBorderShadows(game);
    level.drawBrickShadows(game);
    drawSpriteShadows();
    lib.setAlpha(1.0);

    level.drawBricks(game);
    level.drawBorder(game);
    drawSprites();
}

function updateGame() {
    player.update();
    game.ball.update(player, game);
}

function drawSprites() {
    lib.drawSubImageRect(game.gfx, player.x, player.y, player.width, player.height, player.sourceX, player.sourceY);
    lib.drawSubImageRect(game.gfx, game.ball.x, game.ball.y,game.ball.width, game.ball.height, game.ball.sourceX, game.ball.sourceY);
}

function drawSpriteShadows() {
    lib.drawSubImageRect(game.gfx,game.ball.x + game.shadowOffsetX, game.ball.y + game.shadowOffsetY,
            game.ball.width, game.ball.height, game.ball.shadowSourceX, game.ball.shadowSourceY);

    lib.drawSubImageRect(game.gfx,player.x + game.shadowOffsetX, player.y + game.shadowOffsetY,
                         player.width, player.height, player.shadowSourceX, player.shadowSourceY);
}

gameInit();