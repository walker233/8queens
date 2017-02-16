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
  queenAllowed: function(row,column,qList){

    for(var q=0;q < qList.length; q++){
      if ( qList[q].row == row ||
           ( //Positive slope rise 1, run 1 same number
             qList[q].row - row ==
             qList[q].column - column
           ) ||
           (
             qList[q].row - row ==
             - (qList[q].column - column)
           )
          )
          return false;
    }
    return true;
  },
  placeQueens: function(queensList, col){
    //we are placing for the column represented by the input
    if (col == (8 + 1)) {
      this.queenList.push(queensList);
      console.log("Total Solutions so far: " + this.queenList.length );
      console.log(queensList);
      return true;
    } else {

      for(var row=1; row <= 8; row++){
        if (this.queenAllowed(row,col,queensList)){
          queensList.push( { row: row, column: col} );
        if ( this.placeQueens(queensList,col+1) ){
          return true;
        }
          queensList.pop();
        }

      }
    }
  },
  main: function(board){
    this.init_board(board);
    this.drawBoard(this.queenList);

    //while(this.queenList.length < 8){
      this.placeQueens([],1);

      for( var i = 0; i < this.queenList.length; i++){
        console.log("Solution " + i );
        console.log(this.queenList[i]);
        this.drawBoard( this.queenList[i] );
      }


  }

}

queens.main("chessboard",400,400);
