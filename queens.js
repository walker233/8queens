var queens = {

  board: "",
  board_h: null,
  board_w: null,
  c: null,
  ctx: null,
  qSymbol: String.fromCharCode(parseInt('265B',16)),
  pieceOffSet: 3,
  queenList: [],
  drawBoard: function(qList){
    //Clearn board before we draw it.
    this.ctx.clearRect(0,0,this.board_w,this.board_h);
    this.ctx.fillStyle = "black";

    //Draw horizontal
    for (var i=0; i <= this.board_h; i+= this.board_w/8){
      //console.log("moveTo(0,"+i+")");
      this.ctx.moveTo(0,i);
      //console.log("LineTo("+this.board_w+","+i+")");
      this.ctx.lineTo(this.board_w,i);
      this.ctx.stroke();
    }
    //Draw Vertical
    for (var i=0; i <= this.board_w; i+= this.board_w/8){
        //console.log("moveTo("+i+",0)");
        this.ctx.moveTo(i,0);
        //console.log("LineTo("+i+","+this.board_h+")");
        this.ctx.lineTo(i,this.board_h);
        this.ctx.stroke();
    }
    this.drawQueens(qList);
  },
  drawQueenAt: function(row,column){
    var fontSize = this.board_w/8 - 4;
    //console.log("fontSize: "+ fontSize);
    this.ctx.font= fontSize+"px Ariel";
    this.ctx.fillText(
      this.qSymbol,
      this.board_w/8*(row-1)+this.pieceOffSet,
      this.board_h/8*column-this.pieceOffSet
    );
  },
  drawQueens: function(qList){
    //Iterate through list of queens provided
    for(var q=0; q< qList.length; q++){
      this.drawQueenAt(qList[q].row, qList[q].column);
    }
  },
  init_board: function(board,height,width){
    this.board = board;
    this.c = document.getElementById(board);
    this.board_h = this.c.height;
    this.board_w = this.c.width;
    this.ctx = this.c.getContext("2d");
  },
  queenAllowed: function(row,column){
    for(var q=0;q<this.queenList.length; q++){
      if ( this.queenList[q].row == row ||
           this.queenList[q].column == column ||
           ( this.queenList[q].row - row ==
             this.queenList[q].column - column
           )
          )
          return false;
    }
    return true;
  },
  placeQueens: function(){
    //for(var row_start=1; row_start<=8 ; row_start++){

      for(var r=1; r <=8 ; r++){
        for(var c=1; c<= 8; c++){
          if ( this.queenAllowed(r,c) ){
            //Add Queen to list
            this.queenList.push({row: r, column: c});
            setTimeout(function(list) { queens.drawBoard(list); }(this.queenList) ,2000);
            //this.drawBoard();

          }
      }
    }
      /*
      if(this.queenList.length == 8 ){
        break;
      } else {
        this.queenList = [];
      }
    }*/
  },
  main: function(board){
    this.init_board(board);
    this.drawBoard(this.queenList);

    //while(this.queenList.length < 8){
      this.placeQueens();
    //}

    //Draw All Queens for fun.
    /*
    for(var a=1; a <= 8; a++){
      for(var b=1; b <= 8; b++){
        this.drawQueenAt(a,b);
      }
    }
    */

  }

}

queens.main("chessboard",400,400);
