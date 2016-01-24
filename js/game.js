/**
 * Created by Administrator on 2015/8/14.
 */
function Game (){
}

Game.prototype = {
    mainloop:function(){
        ctx.clearRect(0,0,10000,10000)

        //生产numberArr
        for(var i=0;i<numberArr.length;i++) {
            for(var k=0;k<numberArr[i].length;k++){
                if(numberArr[i][k]){
                    numberArr[i][k].updateNum();}
                if(numberArr[i][k]){
                    numberArr[i][k].renderNum();
                }
            }
        };


        //生产plusArr
        for(var i=0;i<plusingArr.length;i++) {
            for(var k=0;k<plusingArr[i].length;k++){
                if(plusingArr[i][k]){
                    plusingArr[i][k].update();}
                if(plusingArr[i][k]){
                    plusingArr[i][k].render();
                }
            }
        };
    },




    run:function(){
        var self = this;
        setInterval(self.mainloop,1000/FPS);
    },





    //这是初始值得建立，寻找空位==========================================================
    born:function (){
        var emptyLocation = [];
        for (var i = 0; i < 4; i++) {
            for(var r = 0;r<4;r++ ){
                var thislocation = locationArr[i][r];
                if (thislocation.own == 0) {
                    emptyLocation.push(thislocation);//将没有被占用的位置信息都push到一个emptylocation数组
                }
            }

        }


        var randomLocationNum = _.random(0, emptyLocation.length - 1);
        var randomNum = _.random(0, newNum.length - 1)

        var originNum = new Number({
            numX: newNum[randomNum].numX,
            numY: newNum[randomNum].numY,
            MapX: emptyLocation[randomLocationNum].MapX,
            MapY: emptyLocation[randomLocationNum].MapY,
            score: newNum[randomNum].score

        })//从这个emptylocation数组中随机选择一个数字


        //更改locationArr
        var x =parseInt( emptyLocation[randomLocationNum].MapX / 120)
        var y =parseInt( emptyLocation[randomLocationNum].MapY / 120)
        locationArr[y][x].own = 1;//标记被占用
        locationArr[y][x].key = newNum[randomNum].score;
        //更改numberArr
        numberArr[parseInt(originNum.y / 120)][parseInt(originNum.x / 120)] = originNum;


        //所有阀值清零；
        bornOrNot = false;
        jishuqi = 0;
        notEmpty = 0;

        jieliu = true;
        plusFinished = true;

    },


//====================================================================
    //数组克隆部门
    cloneArr:function(arr,old){
        for(var r = 0;r<4;r++){
            for(var i=0;i<4;i++){
                arr[r][i] = old[r][i];
            }
        }

        return arr;
    },
    //让所有人的up属性变为true；
    becomeTrue:function(direction){
        for(var i=0;i<4;i++){
            for(var r=0;r<4;r++){
                if(numberArr[r][i]){
                    numberArr[r][i][direction] = true;
                }

            }
        }
    },
    //locationArr映照归位
    locationRefresh:function(){

        for(var i=0;i<4;i++){
            for(var r=0;r<4;r++){
                if(numberArr[r][i]){
                    locationArr[r][i].own = 1;
                    locationArr[r][i].key = numberArr[r][i].score;
                }else{
                    locationArr[r][i].own = 0;
                }
            }
        }
    },
    //判断作用前后是否一致,不一致就生，一致就不生
    judgeIfBorn:function(){

        for(var i=0;i<4;i++){
            for(var r=0;r<4;r++){
                if(numberArr[r][i]){
                    if(!newArr[r][i]){
                        bornOrNot = true;
                        break
                    }else{
                        for(var k in numberArr[r][i]){
                            if(numberArr[r][i][k] != newArr[r][i][k]){
                                bornOrNot = true;
                                console.log(bornOrNot)
                                break
                            }
                        }
                    }

                }

            }
        }

    },

    //判断numberArr中有多少个实体
    isNotEmpty:function(){
        for(var i=0;i<4;i++){
            for(var r=0;r<4;r++){
                if(numberArr[r][i]){
                    notEmpty++
                }
            }
        }
    },


//====================================================================
    upclear:function(){
        //让所有的null往后
        for(var n = 0;n<4;n++){//让兑换语句执行四次，保证可以到达最后
            for(var i=0;i<4;i++){
                for(var r = 0; r<3;r++){
                    if(!numberArr[r][i]){

                        numberArr[r][i] = numberArr[r+1][i];
                        numberArr[r+1][i] = null;
                        if(numberArr[r][i]){
                            numberArr[r][i].arrY = r;
                        }

                    }
                }
            }
        }
    },

    downclear:function(){
        for(var n =0 ;n<4;n++){
            for(var i=0;i<4;i++){
                for(var r=3;r>=1;r--){
                    if(!numberArr[r][i]){
                        numberArr[r][i] = numberArr[r-1][i];
                        numberArr[r-1][i] = null;
                        if(numberArr[r][i]){
                            numberArr[r][i].arrY = r;
                        }
                    }

                }
            }
        }
    },

    rightclear:function(){
        for(var n=0;n<4;n++){
            for(var i=3;i>=1;i--){
                for(var r=0;r<4;r++){
                    if(!numberArr[r][i]){
                        numberArr[r][i] = numberArr[r][i-1];
                        numberArr[r][i-1] = null;
                        if(numberArr[r][i]){
                            numberArr[r][i].arrX= i;
                        }
                    }
                }
            }
        }
    },

    leftclear:function(){
        for(var n=0;n<4;n++){
            for(var i=0;i<3;i++){
                for(var r=0;r<4;r++){
                    if(!numberArr[r][i]){
                        numberArr[r][i] = numberArr[r][i+1];
                        numberArr[r][i+1] = null;
                        if(numberArr[r][i]){
                            numberArr[r][i].arrX = i;
                        }
                    }
                }

            }
        }
    }


}