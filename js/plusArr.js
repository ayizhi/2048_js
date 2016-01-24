/**
 * Created by Administrator on 2015/8/27.
 */
function plusArr(obj){
    this.numX = obj.numX;
    this.numY = obj.numY;
    this.w = 100;
    this.h = 100;
    this.arrX = obj.arrX;
    this.arrY = obj.arrY;
    this.x = obj.X;
    this.y = obj.y;

    this.image = imagesArr[0]
    this.score = obj.score;

    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;
}

plusArr.prototype = {
    update:function(){

        if(this.up){
            if(this.y>this.arrY*120+20){
                this.y -= 20;
                bornOrNot = true;
                plusFinished = false;

            }else{
                this.up = false;
                plusFinished = true;
                this._changNum();
                //生
                this._plusMoveAndBorn();
                //删除
                plusingArr[this.arrY+1][this.arrX] = null;
            }
        };

        if(this.down){
            if(this.y<this.arrY*120+20){
                this.y += 20;
                bornOrNot = true;
                plusFinished = false;


            }else{
                this.down = false;
                plusFinished = true;

                this._changNum();
                this._plusMoveAndBorn();
                plusingArr[this.arrY-1][this.arrX] = null;
            }
        };

        if(this.left){
            if(this.x>this.arrX*120+20){
                this.x -= 20;
                bornOrNot = true;
                plusFinished = false;


            }else{
                this.left = false;
                plusFinished = true;

                this._changNum();
                this._plusMoveAndBorn();
                plusingArr[this.arrY][this.arrX+1] = null;
            }
        };

        if(this.right){
            if(this.x<this.arrX*120+20){
                this.x += 20;
                bornOrNot = true;
                plusFinished = false;


            }else{
                this.right = false;
                plusFinished = true;

                this._changNum();
                this._plusMoveAndBorn();
                plusingArr[this.arrY][this.arrX-1] = null;
            }
        };


    },
    render:function(){
        ctx.drawImage(this.image,this.numX,this.numY,this.w,this.h,this.x,this.y,this.w,this.h)

    },
    _changNum:function(){
        //变数字
        for(var i=0;i<allNumLocationArr.length;i++){
            if(this.score ==allNumLocationArr[i].score){
                this.numX = allNumLocationArr[i].numX
                this.numY = allNumLocationArr[i].numY
            }
        }

        //变numberArr数字
        for(var i=0;i<allNumLocationArr.length;i++){
            for(var r=0;r<4;r++){
                for(var k=0;k<4;k++){
                    if(numberArr[r][k]){
                        if(numberArr[r][k].score == allNumLocationArr[i].score){
                            numberArr[r][k].numX = allNumLocationArr[i].numX
                            numberArr[r][k].numY = allNumLocationArr[i].numY
                        }
                    }

                }
            }

        }

    },
    //当bornOrNot判定为true时，也就是可以生，但是没有发生移动，那么，就生
    _plusMoveAndBorn:function(){
        if(bornOrNot ){
            if(!hasmove ){
                game.born();
            }
        }
    },



}