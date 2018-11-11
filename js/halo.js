/**
 * 大鱼喂小鱼产生的圈圈，特效
 */
class Halo{
    constructor(){
        this.x = [];
        this.y = [];
        this.r = [];
        this.alive = [];
        this.num;
    }
    init(){
        this.num = 5;
        for(let i = 0; i < this.num; i++){
            this.x[i] = 0;
            this.y[i] = 0;
            this.alive[i] = false;
            this.r[i] = 0;
        }
    }
    draw(){
        ctx1.save();
        ctx1.lineWidth = 2;
        ctx1.shadowBlur = 10;
        ctx1.shadowClor = "rgba(203, 91, 0, 1)";
        for (let i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                this.r[i] += deltaTime * 0.05;
                if(this.r[i] > 100){
                    this.alive[i] = false;
                    break;
                } 
                var alpha = 1 - this.r[i]/100;
                ctx1.beginPath();
                ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
                ctx1.closePath();
                ctx1.strokeStyle = "rgba(203, 91, 0," + alpha + ")";
                ctx1.stroke()
            }
        }
    }
    born(x, y) {
        for (let i = 0; i < this.num; i++) {
            if (!this.alive[i]) {
                this.alive[i] = true;
                this.x[i] = x;
                this.y[i] = y;
                this.r[i] = 10;
            }
        }
    }
}