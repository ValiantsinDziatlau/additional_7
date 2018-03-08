module.exports =  function solveSudoku(matrix){
//////////////////////////////////////////////    
function getZeroPositions(matrix){
    let ZeroPositions=[];
    for(let r=0; r<9; r++){
        for(let c=0; c<9; c++){
            if (matrix[r][c]===0){
                ZeroPositions.push([r,c]);
            }
        }
    }
    return ZeroPositions;
}
///////////////////////////////////////////////
function RowValueChck(matrix, row, col, value){
    for(let c=0; c<9; c++){
        if(matrix[row][c]===value){
            return false;
        }
        }
        return true;    
}
///////////////////////////////////////////////////
function ColumnValueChck(matrix, row, col, value){
for(let r=0; r<9; r++){
        if(matrix[r][col]===value){
            return false;
        }
        }
        return true;    
}

/////////////////////////////////////////////////////
function SquarValueChck(matrix, row, col, value){
    let initRow=row-row%3;
    let InitCol=col-col%3;
    //let result=[];
    for(let c=InitCol; c<InitCol+3;c++){
        for(let r=initRow; r<initRow+3; r++){
            //result.push(matrix[r][c]);
            if(matrix[r][c]===value){
            return false;
        }
        }
    }
    return true;
}
////////////////////////////////////////////////////
function ValueChck(matrix, row, col, value){
    if(RowValueChck(matrix, row, col, value)&&
    ColumnValueChck(matrix, row, col, value)&&
    SquarValueChck(matrix, row, col, value)){
        return true;
    }
    return false;
}
////////////////////////////////////////////////////
let ZeroPositions=getZeroPositions(matrix);
let CurValue;
let Status=false;
let ZeroAmount=ZeroPositions.length;
for(let i=0; i<ZeroAmount; i++){
    let row=ZeroPositions[i][0];
    let col=ZeroPositions[i][1];
    Status=false;
    CurValue=matrix[row][col]+1;
    while(!Status&&CurValue<10){
       if(ValueChck(matrix, row, col, CurValue)===true){
          Status=true;
          matrix[row][col]=CurValue;
       }else{
           CurValue++;
       } 
    }
    if(CurValue===10){
        i-=2;
        matrix[row][col]=0;
    }
}


    return matrix;
}

