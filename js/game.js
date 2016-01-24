/**
 * Created by Administrator on 2015/8/14.
 */
function Game (){
}

Game.prototype = {
    mainloop:function(){
        ctx.clearRect(0,0,10000,10000)

        //����numberArr
        for(var i=0;i<numberArr.length;i++) {
            for(var k=0;k<numberArr[i].length;k++){
                if(numberArr[i][k]){
                    numberArr[i][k].updateNum();}
                if(numberArr[i][k]){
                    numberArr[i][k].renderNum();
                }
            }
        };


        //����plusArr
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





    //���ǳ�ʼֵ�ý�����Ѱ�ҿ�λ==========================================================
    born:function (){
        var emptyLocation = [];
        for (var i = 0; i < 4; i++) {
            for(var r = 0;r<4;r++ ){
                var thislocation = locationArr[i][r];
                if (thislocation.own == 0) {
                    emptyLocation.push(thislocation);//��û�б�ռ�õ�λ����Ϣ��push��һ��emptylocation����
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

        })//�����emptylocation���������ѡ��һ������


        //����locationArr
        var x =parseInt( emptyLocation[randomLocationNum].MapX / 120)
        var y =parseInt( emptyLocation[randomLocationNum].MapY / 120)
        locationArr[y][x].own = 1;//��Ǳ�ռ��
        locationArr[y][x].key = newNum[randomNum].score;
        //����numberArr
        numberArr[parseInt(originNum.y / 120)][parseInt(originNum.x / 120)] = originNum;


        //���з�ֵ���㣻
        bornOrNot = false;
        jishuqi = 0;
        notEmpty = 0;

        jieliu = true;
        plusFinished = true;

    },


//====================================================================
    //�����¡����
    cloneArr:function(arr,old){
        for(var r = 0;r<4;r++){
            for(var i=0;i<4;i++){
                arr[r][i] = old[r][i];
            }
        }

        return arr;
    },
    //�������˵�up���Ա�Ϊtrue��
    becomeTrue:function(direction){
        for(var i=0;i<4;i++){
            for(var r=0;r<4;r++){
                if(numberArr[r][i]){
                    numberArr[r][i][direction] = true;
                }

            }
        }
    },
    //locationArrӳ�չ�λ
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
    //�ж�����ǰ���Ƿ�һ��,��һ�¾�����һ�¾Ͳ���
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

    //�ж�numberArr���ж��ٸ�ʵ��
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
        //�����е�null����
        for(var n = 0;n<4;n++){//�öһ����ִ���ĴΣ���֤���Ե������
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