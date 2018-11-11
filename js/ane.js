/*
 *海葵 
 */
class Ane{
    constructor(){
        //start point, control point, end point(sin)
        this.rootx = [];//根部
        this.headx = [];//头部
        this.heady = [];
        this.amp = [];//振幅
        this.alpha = 0;
        this.num = 50;
    }
    init(){//确定海葵的位置
        for(let i = 0; i < this.num; i++){
            this.rootx[i] = i * 16 + Math.random() * 20;//水平
            this.headx[i] = this.rootx[i];
            this.heady[i] = canHeight - 250 + Math.random() * 50;//高度
            this.amp[i] = Math.random() * 50 + 50;//左右位置
        }
    }
    draw(){
        this.alpha += deltaTime * 0.0008;
        var l = Math.sin(this.alpha);//[-1,1]

        ctx2.save();//保留一些样式，不需要每次的绘制
        ctx2.globalAlpha = 0.6;
        ctx2.lineWidth = 20;
        ctx2.lineCap = 'round';
        ctx2.strokeStyle = "#3b154e";
        //beginPath moveTo lineTo stroke strokeStyle lineWidth lineCap globalAlpha
        for (let i = 0; i < this.num; i++) {
            ctx2.beginPath();
            ctx2.moveTo(this.rootx[i], canHeight);
            this.headx[i] = this.rootx[i] + l * this.amp[i];
            ctx2.quadraticCurveTo(
                this.rootx[i], 
                canHeight - 100, //控制点
                this.headx[i], 
                this.heady[i]
            );
            ctx2.stroke();
        }
        ctx2.restore();
    }
}