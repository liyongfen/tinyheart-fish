/**
 * 大鱼吃果实产生的圈圈，特效
 */
class Wave{
    constructor(){
        this.x = [];
        this.y = [];
        this.alive = [];
        this.r = [];// 半径
        this.num;//数量
    }
    init(){
        this.x;
        this.y;
        this.num = 10;
        for (let i = 0; i < this.num; i++) {
            this.alive[i] = false;
            this.r[i] = 0;
            this.x[i] = 0;
            this.y[i] = 0;
        }
    }
    draw(){
        ctx1.save();
        ctx1.lineWidth = 2;
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = "white";
        for(let i = 0; i < this.num; i++){
            if(this.alive[i]){
                //draw
                this.r[i] += deltaTime * 0.04;
                if(this.r[i] > 50){
                    this.alive[i] = false;
                    break;
                } 
                var alpha = 1 - this.r[i] / 50;

                ctx1.beginPath();
                ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
                ctx1.closePath();
                ctx1.strokeStyle = "rgba(255,255,255,"+ alpha+")";
                ctx1.stroke();
            }
        }
        ctx1.restore();
    }
    born(x, y){//一次只出生一个
        for (let i = 0; i < this.num; i++) {
            if (!this.alive[i]) {
                //born
                this.alive[i] = true;
                this.r[i] = 10;
                this.x[i] = x;
                this.y[i] = y;
                return;
            }
        }
    }
}