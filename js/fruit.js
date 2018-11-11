/*
 *果实 
 */
class Fruit{
    constructor(){
        this.x = [];
        this.y = [];
        this.alive = [];//bool
        this.aneNO = [];
        this.l = [];//记录图片的大小
        this.speed = [];//记录成长和往上飘的速度
        this.type = [];//果实类型
        this.num = 30;
        this.orange = new Image();
        this.blue = new Image();
    }
    init(){
        this.orange.src = './src/fruit.png';
        this.blue.src = './src/blue.png';
        for(let i = 0; i < this.num; i++){
            this.alive[i] = false;
            this.x[i] = 0;
            this.y[i] = 0;
            this.speed[i] =  Math.random() * 0.017 + 0.003;//[0.003, 0.02]
            this.type[i] = '';
            //果实出生
            this.born(i);
        }
    }
    draw(){
        for (let i = 0; i < this.num; i++) {//find an ane , grow, fly up
            if(!this.alive[i]){//
                continue;
            }
            let pic;
            if (this.type[i] === 'orange') {//设置果实类型
                pic = this.orange;
            } else {
                pic = this.blue;
            }
            if (this.l[i] <= 14){//果实在长大
                let NO = this.aneNO[i];
                this.x[i] = ane.headx[NO];
                this.y[i] = ane.heady[NO];
                this.l[i] += this.speed[i] * deltaTime;
            } else {//往上飘
                this.y[i] -= this.speed[i] * 7 * deltaTime;
            }
            if(this.y[i] < 10){
                this.alive[i] = false;
            }
            
            ctx2.drawImage(pic, 
                this.x[i] - this.l[i]* 0.5, 
                this.y[i] - this.l[i] * 0.5,
                this.l[i],
                this.l[i]
            );
        } 
    }
    born(i){
        this.aneNO[i] = Math.floor(Math.random() * ane.num);//随意选择一个海葵
        this.l[i] = 0;
        this.alive[i] = true;
        if(Math.random() > 0.3){
            this.type[i] = 'orange';
        } else {
            this.type[i] = 'blue';
        }
    }
    dead(i) {
        this.alive[i] = false;
    }
    monitor(){
        var num = 0;
        for (let i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                num++;
            }
        }
        if(num < 15){//当果实小于15个，生成一个新的果实
            this.send(); 
        }
    }
    send(){
        for (let i = 0; i < this.num; i++) {
            if(!this.alive[i]){
                this.born(i);
                return;
            }
        }
    }
}