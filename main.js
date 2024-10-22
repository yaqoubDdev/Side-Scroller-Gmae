/** @type {HTMLCanvasElement} */
import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import { UI } from './UI.js';

//  this is a test on git branch ignore

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth ;
    canvas.height = 500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 83;
            this.speed = 0;
            this.maxSpeed = 4;

            this.background = new Background(this)
            this.player = new Player(this);
            this.input = new InputHandler(this)
            this.UI = new UI(this);
            
            this.enemies = [];
            this.particles = [];
            this.maxParticle = 50;

            this.enemyTimer = 0
            this.enemyInterval = 1000;
            
            this.debug = true;
            this.score = 0;
            this.fontColor = 'black';

            this.player.currentState = this.player.states[0];
            this.player.currentState.enter()




        }

        update(deltaTime){
            // console.log(this.particles)
            this.background.update()
            this.player.update(this.input.keys, deltaTime);
            // console.log(this.debug)
            // Enemy Handler
            if (this.enemyTimer > this.enemyInterval){
                this.enemyTimer = 0;
                this.addEnemy(this);
            } else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach( enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });

            //  handle Particles

            this.particles.forEach( (particle, index )=> {
                particle.update();
                if (particle.markedForDeletion) this.particles.splice(index, 1)
            })

            if (this.particles.length > this.maxParticle){
                this.particles = this.particles.slice(0, this.maxParticle);
                
            }

            


        }

        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach( enemy => {
                enemy.draw(context); 
            });
            this.particles.forEach( particle => {
                particle.draw(context); 
            });
            this.UI.draw(context)
        }

        addEnemy(){
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
            // console.log(this.enemies);

        }

    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game)
    
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);



        game.draw(ctx);
        game.update(deltaTime)
        requestAnimationFrame(animate)
    }
    animate(0)
});