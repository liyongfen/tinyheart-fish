/**
 * 分值计算
 */
class Data{
    constructor(){
        this.fruitNum = 0;//果实数量
        this.double = 1;//是否吃到蓝色果实
        this.score = 0;//分值
        this.gameOver = false;//游戏结束
        this.alpha = 0;
    }
    reset(){
        this.fruitNum = 0;//果实数量
        this.double = 1;//是否吃到蓝色果实
    }
    draw(){
        var w = can1.width;
        var h = can1.height;

        ctx1.save();
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = "white";
        ctx1.fillStyle = 'white';
        ctx1.fillText('score: ' + this.score, w * 0.5, 50);

        if(this.gameOver){
            this.alpha += deltaTime * 0.0005;
            if(this.alpha > 1){
                this.alpha = 1;
            }
            ctx1.fillStyle = "rgba(255, 255, 255, "+ this.alpha +")"
            ctx1.fillText('game over', w * 0.5 , h * 0.5);
        }
        ctx1.restore();
    }
    addScore(){
        this.score += this.fruitNum * 100 * this.double;
        this.reset();
    }
}