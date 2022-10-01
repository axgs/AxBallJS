import Ball from "./ball";
import player from "./player";
import lib from "./lib";

let game = {
    level: 0,
    score: 0,
    balls: 0,
    ball: null,
};

function gameInit() {
    lib.init(320, 200, 'gameGfx');
    lib.addKeyEvents();

    game.ball = new Ball();
    player.init(game);
    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
    updateGame();
    renderGame();
    window.requestAnimationFrame(gameLoop);
}

function renderGame() {
    lib.cls('606');
    lib.drawSubImageRect(player.x, player.y, player.width, player.height, player.sourceX, player.sourceY);
    lib.drawSubImageRect(game.ball.x, game.ball.y,game.ball.width, game.ball.height, game.ball.sourceX, game.ball.sourceY);
}

function updateGame() {
    player.update();
    game.ball.update(player);
}

gameInit();