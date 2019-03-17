import Phaser from 'phaser';
const EventEmitter = require('events');
import Animal from './Animal.js';

export default class PlayArea extends Phaser.Group {
    constructor(game, name, init) {
        super(game, game.world, name, false, true);
        this.game = game;
        this.events = new EventEmitter();
        this.animals = ['deer','chicken','crocodile','elephant','fox','girafe','panda'];
        this.isAnimalCollided = false;
        this.pushAnimalsDown();
    }

    pushAnimalsDown(){
        this.createAnimal();
    }

    createAnimal(){
        let index = Math.floor(Math.random() * 7);
        let a_n = this.animals[index];
        let animal = new Animal(this.game, this.game.world.centerX, 0, 'animal','animal_'+a_n+'.png');
        this.add(animal);
        this.game.physics.arcade.enable(animal);
        animal.body.collideWorldBounds = true;
        animal.body.gravity.y = 50;
        animal.body.onCollide = new Phaser.Signal();
        animal.body.onCollide.add(this.hitSprite, this);

        animal.body.onWorldBounds = new Phaser.Signal();
        animal.body.onWorldBounds.add(this.onWorldHit, this);
        //console.log('creating animal->',a_n);
        this.animalCreated = false;
        this.isAnimalCollided = false;

    }
    hitSprite(spr1,spr2){
        if (!this.isAnimalCollided && !this.animalCreated) {
            this.isAnimalCollided = true;
            spr1.inputEnabled = false;
            spr2.inputEnabled = false;
            spr1.body.onCollide.dispose();
            spr2.body.onCollide.dispose();
            spr1.body.onWorldBounds.dispose();
            spr2.body.onWorldBounds.dispose();
            spr1.body.gravity.y = 200;
            spr2.body.gravity.y = 200;
            if (spr1.name === spr2.name) {
                spr1.destroy();
                spr2.destroy();
            }
            if (!this.animalCreated) {
                this.animalCreated = true;
                this.createAnimal();
            }
        }

    }

    onWorldHit(spr, up, down, left, right) {
        if(down && !this.isAnimalCollided){

            spr.inputEnabled = false;
            spr.body.gravity.y=0;
            spr.body.onWorldBounds.dispose();
            spr.body.onCollide.dispose();
            this.isAnimalCollided = true;
            console.log("world");
            if(!this.animalCreated){
                this.animalCreated = true;
                this.createAnimal();
                this.isAnimalCollided = false;
            }
        }
    }

}
