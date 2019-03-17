import Phaser from 'phaser'

export default class Animal extends Phaser.Sprite {
    constructor(game, x, y, asset, animal) {
        super(game, x, y, asset, animal)
        this.anchor.setTo(0.5);
        this.scale.setTo(2);
        this.name = animal.split('_')[1];
        this.inputEnabled = true;
        this.createKey();
    }

    createKey(){
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    }

    update() {
        if(this.inputEnabled){
            if (this.upKey.isDown) {
                this.angle += 90;
            }
            else if (this.downKey.isDown) {
                this.angle -= 90;
            }

            if (this.leftKey.isDown) {
                this.x -= 10;
            }
            else if (this.rightKey.isDown) {
                this.x += 10;
            }
        }
    }
}
