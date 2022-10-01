import Ball from "./ball";
import player from "./player";
import lib from "./lib";

let game = {
    level: 0,
    score: 0,
    balls: 0,
    ball: null,
    brickWidth: 16,
    brickHeight: 8
};

function gameInit() {
    lib.init(320, 200, 'gameGfx');
    lib.addKeyEvents();

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
    lib.cls('606');
    drawLevel();
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

function drawLevel() {
    const xOffset = 8;
    const yOffset = 8;

    for(let y = 0; y < 21; y++) {
        for(let x = 0; x < 13; x++) {
            let sourceX = 16;
            let sourceY = 0;
            lib.drawSubImageRect(xOffset + x * game.brickWidth, yOffset + y * game.brickHeight,
                                 game.brickWidth, game.brickHeight,
                                 sourceX, sourceY);
        }
    }
}

gameInit();