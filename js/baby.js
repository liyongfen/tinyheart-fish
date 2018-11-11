/**
 * 小鱼
 */
class Baby{
    constructor(){
        this.x;
        this.y;
        this.angle;

        this.babyBodys = [];
        this.babyBodyCount;//执行到那一帧
        this.babyBodyTimer;
        this.babyBodyLen;

        this.babyEyes = [];
        this.babyEyeCount;
        this.babyEyeTimer;
        this.babyEyeInterval;
        this.babyEyeLen;

        this.babyTails = [];//图片帧
        this.babyTailCount;//执行到那一帧
        this.babyTailTimer;
        this.babyTailLen;

    }
    init(){
        this.x = canWidth * 0.5  - 50;
        this.y = canHeight * 0.5 + 50;
        this.angle = 0;

        this.babyBodys = [];
        this.babyBodyCount = 0;//执行到那一帧
        this.babyBodyTimer = 300;
        this.babyBodyLen = 20;
        for (let i = 0; i < this.babyBodyLen; i++) {
            this.babyBodys[i] = new Image();
            this.babyBodys[i].src = './src/babyFade' + i + '.png';
        }

        this.babyEyeCount = 0;
        this.babyEyeTimer = 0;
        this.babyEyeInterval = 1000;
        this.babyEyeLen = 2;
        for (let i = 0; i < this.babyEyeLen; i++) {
            this.babyEyes[i] = new Image();
            this.babyEyes[i].src = './src/babyEye' + i + '.png';
        }

        this.babyTailTimer = 0;
        this.babyTailCount = 0;
        this.babyTailLen = 8;
        for (let i = 0; i < this.babyTailLen; i++) {
            this.babyTails[i] = new Image();
            this.babyTails[i].src = './src/babyTail' + i + '.png';
        }
    }
    draw(){
        //lerp x, y
        this.x = lerpDistance(mom.x, this.x, 0.98);
        this.y = lerpDistance(mom.y, this.y, 0.98);

        //lerp angle
        var deldaX = mom.x - this.x;
        var deldaY = mom.y - this.y;
        var beta = Math.atan2(deldaY, deldaX) + Math.PI;
        this.angle = lerpAngle(beta, this.angle, 0.6);


        //baby body
        this.babyBodyTimer += deltaTime;
        if (this.babyBodyTimer > 300) {
            this.babyBodyCount = (this.babyBodyCount + 1);
            this.babyBodyTimer %= 300; //清一次数据
            if (this.babyBodyCount > this.babyBodyLen - 1){
                this.babyBodyCount = this.babyBodyLen - 1;
                //game over
                data.gameOver = true;
            }
           
        }
        //baby eye count
        this.babyEyeTimer += deltaTime;
        if (this.babyEyeTimer > this.babyEyeInterval) {
            this.babyEyeCount = (this.babyEyeCount + 1) % this.babyEyeLen;
            this.babyEyeTimer %= this.babyEyeInterval; //清一次数据
            if(this.babyEyeCount == 0){
                this.babyEyeInterval = Math.random() * 1500 + 2000;//[2000, 3500)
            } else {
                this.babyEyeInterval = 200;
            }
        }
        //baby tail count
        this.babyTailTimer += deltaTime;
        if (this.babyTailTimer > 50) {
            this.babyTailCount = (this.babyTailCount + 1) % this.babyTailLen;
            this.babyTailTimer %= 50; //清一次数据
        }
        //ctx
        ctx1.save();
        ctx1.translate(this.x, this.y);//0,0点为this.x, this.y
        ctx1.rotate(this.angle);

        var babyBody = this.babyBodys[this.babyBodyCount];
        ctx1.drawImage(
            babyBody,
            -babyBody.width * 0.5,
            -babyBody.height * 0.5
        );

        var babyEye = this.babyEyes[this.babyEyeCount];
        ctx1.drawImage(
            babyEye, 
            -babyEye.width * 0.5, 
            -babyEye.height * 0.5
        );
        
        var babyTail = this.babyTails[this.babyTailCount];
        ctx1.drawImage(
            babyTail, 
            -babyTail.width * 0.5 + 23, 
            -babyTail.height * 0.5
        );
        ctx1.restore();
    }
}