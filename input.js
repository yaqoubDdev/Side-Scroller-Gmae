export class InputHandler{
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            if (
                (   (e.key === 'ArrowDown' || e.key === 's')||
                    (e.key === 'ArrowUp' || e.key === 'w')  ||
                    (e.key === 'ArrowLeft' || e.key === 'a')||
                    (e.key === 'ArrowRight' || e.key === 'd') ||
                    (e.key === 'Control' || e.key === 'z')
                ) && this.keys.indexOf(e.key) === -1){
                     this.keys.push(e.key);
            }

            else if ( e.key === ' ') this.game.debug = !this.game.debug;
            // console.log(e.key, this.keys);
        });

        window.addEventListener('keyup', e => {
            if (    (e.key === 'ArrowDown' || e.key === 's' )|| 
                    (e.key === 'ArrowUp' || e.key === 'w')  ||
                    (e.key === 'ArrowLeft' || e.key === 'a')||
                    (e.key === 'ArrowRight' || e.key === 'd') ||
                    (e.key === 'Control' || e.key === 'z')){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            // console.log(e.key, this.keys);

        });
    }
}