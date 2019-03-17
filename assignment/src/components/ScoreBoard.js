import Phaser from 'phaser';
const EventEmitter = require('events');

export default class ScoreBoard extends Phaser.Group{
    constructor(game, name, init){
        super(game,game.world,name);
        this.createBoard();
    }

    createBoard(){
        var bounds = new Phaser.Rectangle(1000, 0, 478, 831);

        //  Create a graphic so you can see the bounds
        var graphics = this.game.add.graphics(bounds.x, bounds.y);
        graphics.beginFill(0x000077);
        graphics.drawRect(0, 0, bounds.width, bounds.height);
    }
}
