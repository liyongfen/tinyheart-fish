/**
 * 海底漂浮物
 */
class Dust {
    constructor(){
        this.x = [];
        this.y = [];
        this.amp = [];//振幅
        this.pic = [];
        this.NO = [];
        this.num;
        this.alpha = 0;
    }
    init(){
        this.num = 30;
        for(let i = 0; i < 7; i++){
            this.pic[i] = new Image();
            this.pic[i].src = './src/dust' + i + '.png';
        }
       
        for (let i = 0; i < this.num; i++) {
            this.x[i] = Math.random() * canWidth;
            this.y[i] = Math.random() * canHeight;
            this.amp[i] = 20 + Math.random() * 15;
            this.NO[i] = Math.floor(Math.random() * 7);//[0,7)
        }
        this.alpha = 0
    }
    draw(){
        this.alpha += deltaTime * 0.0008;
        let l = Math.sin(this.alpha);
        for (let i = 0; i < this.num; i++) {
            let NO = this.NO[i];
      
            ctx1.drawImage(this.pic[NO], this.x[i] + this.amp[i] * l, this.y[i]);
        } 
    }
}