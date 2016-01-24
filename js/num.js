/**
 * Created by Administrator on 2015/8/14.
 */
var allNumLocationArr = [
    {numX:600,numY:20 ,score:2},  {numX:720,numY:20,score:4},  {numX:840,numY:20,score:8},  {numX:960,numY:20,score:16},
    {numX:600,numY:140,score:32}, {numX:720,numY:140,score:64}, {numX:840,numY:140,score:128}, {numX:960,numY:140,score:256},
    {numX:600,numY:260,score:512}, {numX:720,numY:260,score:1024}, {numX:840,numY:260,score:2048},
]

var newNum = [
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:600,numY:20 ,score:2},{numX:600,numY:20 ,score:2},
    {numX:720,numY:20,score:4},{numX:720,numY:20,score:4},{numX:720,numY:20,score:4},{numX:720,numY:20,score:4},
    {numX:840,numY:20,score:8}
]

function Number(obj){

    this.numX = obj.numX;
    this.numY = obj.numY;
    this.w = 100;
    this.h = 100;
    this.arrX = parseInt(obj.MapX/120);
    this.arrY = parseInt(obj.MapY/120);
    this.x = obj.MapX;
    this.y = obj.MapY;

    this.image = imagesArr[0]
    this.score = obj.score;

    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;


}

Number.prototype = {


    updateNum:function(){


        if(this.up){
            //第一步，让所有对象去到调整过后的位置；
            if(this.y>(this.arrY*120+20)){
                this.y -= 20;

                hasmove = true;
            }else{
                this.up = false

                this._afterMoveBorn();


            }
        };


        if(this.down){
            //第一步，让所有对象去到调整过后的位置；
            if(this.y<(this.arrY*120+20)){
                this.y += 20;

                hasmove = true;
            }else{
                this.down = false

                this._afterMoveBorn();

            }
        };

        if(this.right){
            if(this.x<(this.arrX*120+20)){
                this.x += 20;

                hasmove = true;
            }else{
                this.right = false

                this._afterMoveBorn();

            }
        };

        if(this.left){
            if(this.x>(this.arrX*120+20)){
                this.x -= 20;
                hasmove = true;
            }else{
                this.left = false

                this._afterMoveBorn();

            }
        };



    }
    ,

    renderNum:function(){
        ctx.drawImage(this.image,this.numX,this.numY,this.w,this.h,this.x,this.y,this.w,this.h)
    },


    //运动完了，属性都变为false后，让numberArr生，并且变数字；
    _afterMoveBorn:function(){
        //生
        if(bornOrNot){
            jishuqi++
            //console.log(jishuqi)
            if(jishuqi == notEmpty ){//numberArr中都运动完了
                    game.born();
            }

        }
    }

}




