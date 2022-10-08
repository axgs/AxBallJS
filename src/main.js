import Ball from './ball';
import player from './player';
import level from './level';
import title from './title';
import gameStartMessage from './inGameStartMessage';

import lib from './lib';
import { levelData } from './level/levelData';

// assets
const gameGfxUrl = require('url:../assets/gamegfx.png');

const sfxUrlList = [
    {name:'brickhit1', url: require('url:../assets/sfx/hit1.ogg') },
    {name:'brickhit2', url: require('url:../assets/sfx/hit2.ogg') },
    {name:'paddlehit', url: require('url:../assets/sfx/paddlehit.ogg') },
    {name:'lostball', url: require('url:../assets/sfx/ball_lost.ogg') },
];

const state = {
    game: 1,
    gameInit: 2,
    title: 3,
    gameover: 4
};

let game = {
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
    preload();

    window.onload = () => {
        // init game
        level.tileMap = [...levelData[game.level][0].data];
        level.bgTile = levelData[game.level][0].bgTile;

        level.init(lib.gfx['gamegfx']);
        game.ball = new Ball();
        player.init();

        lib.ctx.drawImage(level.backgroundCanvas, 0, 0);
        lib.addKeyEvents();
        gameStartMessage.init();

        window.requestAnimationFrame(gameLoop);
    }
}

function preload() {
    lib.loadImage(gameGfxUrl, 'gamegfx');

    sfxUrlList.forEach( (sfxList) => {
        lib.loadSound(sfxList.url, sfxList.name);
    });
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

function updateGame() {
    player.update();
    game.ball.update(player, game);
    gameStartMessage.update();
}

function renderGame() {
    lib.cls('000');

    lib.ctx.drawImage(level.backgroundCanvas, game.playfieldOffsetX, game.playfieldOffsetX, 320,200);

    lib.setAlpha(game.shadowAlphaValue);
    level.drawBorderShadows(game);
    level.drawBrickShadows(game);
    drawSpriteShadows();
    lib.setAlpha(1.0);

    level.drawBricks(game);
    level.drawBorder();

    drawSprites();

    gameStartMessage.draw();
    drawNumberFont(level.brickCount, 232, 8);
}

function drawSprites() {
    lib.drawSubImageRect('gamegfx', player.x, player.y, player.width, player.height, player.sourceX, player.sourceY);
    lib.drawSubImageRect('gamegfx', game.ball.x, game.ball.y,game.ball.width, game.ball.height, game.ball.sourceX, game.ball.sourceY);
}

function drawSpriteShadows() {
    lib.drawSubImageRect('gamegfx',game.ball.x + game.shadowOffsetX, game.ball.y + game.shadowOffsetY,
            game.ball.width, game.ball.height, game.ball.shadowSourceX, game.ball.shadowSourceY);

    lib.drawSubImageRect('gamegfx',player.x + game.shadowOffsetX, player.y + game.shadowOffsetY,
                         player.width, player.height, player.shadowSourceX, player.shadowSourceY);
}

function drawNumberFont(value, x, y) {
    const s = value.toString();
    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i) - 48;
        lib.drawSubImageRect('gamegfx', x + i * 7, y, 6,7, code * 8, 120);
    }
}

gameInit();