/**
 * 大鱼
 */
class Mom {
    constructor(){
        this.x;
        this.y;
        this.angle;//角度
        
        this.bigBodyOrgs = [];
        this.bigBodyBlues = [];
        this.bigBodyCount;
        this.bigBodyLen;

        this.bigEyes = [];//图片帧
        this.bigEyeCount;//执行到那一帧
        this.bigEyeInterval;
        this.bigEyeTimer;
        this.bigEyeLen;

        this.bigTails = [];//图片帧
        this.bigTailCount;//执行到那一帧
        this.bigTailTimer;
        this.bigTailLen;
    }
    init(){
        this.x = canWidth * 0.5;
        this.y = canHeight * 0.5;
        this.angle = 0;
        
        this.bigBodyOrgs = [];
        this.bigBodyBlues = [];
        this.bigBodyCount = 0;
        this.bigBodyLen = 8;
        for (let i = 0; i < this.bigBodyLen; i++) {
            this.bigBodyOrgs[i] = new Image();
            this.bigBodyBlues[i] = new Image();
            this.bigBodyOrgs[i].src = './src/bigSwim' + i + '.png';
            this.bigBodyBlues[i].src = './src/bigSwimBlue' + i + '.png';
        }

        this.bigEyeTimer = 0;
        this.bigEyeInterval = 1000;
        this.bigEyeCount = 0;
        this.bigEyeLen = 2;
        for (let i = 0; i < this.bigEyeLen; i++) {
            this.bigEyes[i] = new Image();
            this.bigEyes[i].src = './src/bigEye' + i + '.png';
        }

        this.bigTailTimer = 0;
        this.bigTailCount = 0;
        this.bigTailLen = 8;
        for (let i = 0; i < this.bigTailLen; i++) {
            this.bigTails[i] = new Image();
            this.bigTails[i].src = './src/bigTail' + i + '.png';
        }
    }
    draw(){
        //大鱼的坐标趋向鼠标的坐标
        this.x = lerpDistance(mx, this.x, 0.98);
        this.y = lerpDistance(my, this.y, 0.98);

        //大鱼的角度趋向于鼠标的角度
        //delta angle , use Math.atan2(y,x)
        var deltaX = mx - this.x;
        var deltaY = my - this.y;
        var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-PI, PI
        this.angle = lerpDistance(beta, this.angle, 0.6);
        //body

        //eye
        this.bigEyeTimer += deltaTime;
        if (this.bigEyeTimer > this.bigEyeInterval) {
            this.bigEyeCount = (this.bigEyeCount + 1) % this.bigEyeLen;
            this.bigEyeTimer %= this.bigEyeInterval;
            if (this.bigEyeCount == 1){
                this.bigEyeTimer = Math.random() * 2000 + 1500; 
            } else {
                this.bigEyeTimer = 200;
            }
        }
        //tail
        this.bigTailTimer += deltaTime;
        if(this.bigTailTimer > 50){
            this.bigTailCount = (this.bigTailCount + 1) % this.bigTailLen;
            this.bigTailTimer %= 50;
        }
        //ctx
        ctx1.save();
        ctx1.translate(this.x, this.y);
        ctx1.rotate(this.angle);

        var bigBody;
        if (data.double == 1){
            bigBody = this.bigBodyOrgs[this.bigBodyCount];
        } else {
            bigBody = this.bigBodyBlues[this.bigBodyCount];
        }
        ctx1.drawImage(
            bigBody, 
            -bigBody.width * 0.5, 
            -bigBody.height * 0.5
        );
        
        var bigEye = this.bigEyes[this.bigEyeCount];
        ctx1.drawImage(
            bigEye, 
            -bigEye.width * 0.5, 
            -bigEye.height * 0.5
        );
        
        var bigTail = this.bigTails[this.bigTailCount];
        ctx1.drawImage(
            bigTail, 
            -bigTail.width * 0.5 + 30, 
            -bigTail.height * 0.5
        );

        ctx1.restore();
    }
}