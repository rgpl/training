import 'pixi';
import 'p2';
import Phaser from 'phaser';


import fullScreen from '../services/fullscreen.js';
import PlayArea from '../components/PlayArea.js';
import ScoreBoard from '../components/ScoreBoard.js';

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
        this.connector = this.add.group();

        this.forceSingleUpdate = true;
        this.time.advancedTiming = true;
        this.stage.disableVisibilityChange = true;
        this.input.maxPointers = 1;

        var bounds = new Phaser.Rectangle(0, 0, 1000, 831);

        //  Create a graphic so you can see the bounds
        var graphics = this.game.add.graphics(bounds.x, bounds.y);
        graphics.beginFill(0x000077);
        graphics.drawRect(0, 0, bounds.width, bounds.height);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.setBounds(0, 0, 1000, 831);

        this.playField = new PlayArea(this.game,'play-area');
        this.game.world.bringToTop(this.playField);
        this.game.physics.arcade.enable(this.playField);

        this.scoreBoard = new ScoreBoard(this.game,'score-board');


    }

    update(){
        this.game.physics.arcade.collide(this.playField);
    }

    render(){
        //this.game.debug.text(this.game.time.fps, 44, 150, "#ffffff", "30px Arial");
        //this.game.debug.text(Phaser.CanvasPool.getTotal(), 44, 200, "#ffffff", "30px Arial");
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


    hideCon(){
        //this.loadRot.stop();
        this.connector.visible = false;
    }
}
