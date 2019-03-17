import Phaser from 'phaser';

import fullScreen from '../services/fullscreen.js';
import assets from '../config/asset.js';
import style from '../styles/styles.js';

export default class extends Phaser.State {

    init(){

    }

    preload(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.forceOrientation(true, false);
        this.scale.enterIncorrectOrientation.add(this.handleIncorrect,this);
        this.scale.leaveIncorrectOrientation.add(this.handleCorrect,this);
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    create(){
        //this.game.input.onUp.add(this.gofull, this);



        this.progressTxt = this.add.text(950,448,'0%',style.preload_txt);
        this.progressTxt.anchor.setTo(0.5,0.5);

        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);

        for(let key in assets){
            this.load.atlasJSONHash(key,assets[key].image,null,assets[key].data);
        }

        this.load.resetLocked = true;

        document.getElementById('connector').style.display = "none";

        this.load.start();

    }

    loadStart(){

    }

    fileComplete(progress, cacheKey, success, totalLoaded, totalFiles){
        this.progressTxt.text = progress + "%";
    }

    loadComplete(){
        //this.loadRot.stop();
        this.state.start('Lobby');
    }

    handleCorrect(){
        if(!this.game.device.desktop){
            document.getElementById("land_scape").style.display="none";
        }
    }

    handleIncorrect(){
        if(!this.game.device.desktop){
            document.getElementById("land_scape").style.display="block";
        }
    }

    gofull(){
        if(!this.game.device.desktop){
            fullScreen();
        }
    }
}
