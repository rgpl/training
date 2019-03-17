import 'pixi';
import 'p2';
import Phaser from 'phaser';
import style from '../styles/styles.js';

import fullScreen from '../services/fullscreen.js';

export default class extends Phaser.State {
    init() {

    }
    preload(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
    create(){
        this.gameName = this.add.text(this.world.centerX, 448, 'Save the Animal', style.preload_txt);
        this.gameName.anchor.setTo(0.5, 0.5);

        this.playButton = this.add.text(this.world.centerX,558,'Play',style.preload_txt);
        this.playButton.inputEnabled = true;

        this.playButton.events.onInputDown.add(()=>{
            this.state.start('Game');
        }, this);
    }
    render(){

    }
}
