var can1,
    can2,
    ctx1,
    ctx2;

var lastTime,//上一针执行的时间
    deltaTime;//两针间隔时间

//画布宽高
var canHeight,
    canWidth;
//背景图
var bgPic = new Image();
//海葵
var ane;
//果实
var fruit;
//鱼妈妈
var mom;
//小鱼
var baby;
//鼠标坐标
var mx;
var my;

//数据
var data;

//特效
var wave;
var halo;

//漂浮物
var dust;

document.body.onload = game();
function game(){
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
    
}
function init(){
    //获得canvas context
    can1 = document.getElementById('canvas1'),//fishes dust ui circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById('canvas2');//bg ane fruit
    ctx2 = can2.getContext('2d');
    //监听鼠标事件
    can1.addEventListener('mousemove', onMouseMove, false);

    bgPic.src = './src/background.jpg';
    canWidth = can1.width;
    canHeight = can1.height;

    ane = new Ane();
    ane.init();

    fruit = new Fruit();
    fruit.init();

    mom = new Mom();
    mom.init();

    baby = new Baby();
    baby.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    data = new Data();

    wave = new Wave();
    wave.init();

    halo = new Halo();
    halo.init();

    dust = new Dust();
    dust.init();

    ctx1.textAlign = "center";
    ctx1.font = "30px Verdana";
}

function gameloop() {
    requestAnimationFrame(gameloop);//setInterval setTimeout frame pre secont
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime > 40){//毫秒
        deltaTime = 40;
    }

    drawBackground();

    ane.draw();
    
    fruit.monitor();
    fruit.draw();

    ctx1.clearRect(0, 0, canWidth, canHeight);//清除
    mom.draw();
    baby.draw();

    momFruitCollision();
    momBabyCollision();

    data.draw();

    wave.draw();

    halo.draw();

    dust.draw();
}
function onMouseMove(e){
    if(data.gameOver){
        can1.removeEventListener('mousemove', onMouseMove, false);
        return;
    }
    if(e.offsetX || e.layerX){
        mx = e.offsetX == undefined ? e.layerX : e.offsetX;
        my = e.offsetY == undefined ? e.layerY : e.offsetY;
    }
}