/**
 * 碰撞检测：
 * 大鱼吃果实
 * 大鱼喂小鱼
 */
function  momFruitCollision() {
    if(data.gameOver){
        return;
    }
    for(let i = 0; i < fruit.num; i++){
        if(fruit.alive[i]){
            //得到果实和大鱼的直线距离
            let l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
            if(l < 900){
                //果实被eated
                fruit.dead(i);
                //果实+1
                data.fruitNum++;
                //大鱼吃到果实，身体渐渐变色，当达到最大值，不再变
                mom.bigBodyCount++;
                if (mom.bigBodyCount > mom.bigBodyLen -1){
                    mom.bigBodyCount = mom.bigBodyLen - 1;
                }
                //吃到蓝色果实
                if (fruit.type[i] == 'blue'){
                    data.double = 2;
                }
                //出现圈圈
                wave.born(fruit.x[i], fruit.y[i]);
            }
        }
    }
}
function momBabyCollision () {
    if(data.fruitNum <= 0 || data.gameOver){
        return;
    }
    let l = calLength2(mom.x, mom.y, baby.x, baby.y);
    if(l < 900){
        //baby recover
        baby.babyBodyCount = 0;
        //mom 
        mom.bigBodyCount = 0;//当大于碰到小鱼，归零
        //score update
        data.addScore();
        //圈圈出现
        halo.born(baby.x, baby.y);
    }
}