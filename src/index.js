module.exports =  function solveSudoku(matrix) {

let RefSet= [1, 2, 3, 4, 5, 6, 7, 8, 9];
 
 function RemDuplUniq(){
     
 }
 
 function getUnique(Arr1, Arr2){
     let Arr=Arr1.concat(Arr2).sort((a,b)=>a-b);
     
     let index=[];
     for(let length=Arr.length, i=length-2; i>=0; i--){
         if(Arr[i]===Arr[i+1]){
             Arr.splice(i, 2);
             i=Arr.length-1;
         }
     }
     return Arr;
 }
 //////////////////////////
 function getZeros(matrixStr){
     let ZeroPoss=[];
     let ElemPos=0;
     while(matrixStr.includes("0",ElemPos)){
         ElemPos=matrixStr.indexOf("0",ElemPos);
         ZeroPoss.push(ElemPos);
         ElemPos++;
        }
     return ZeroPoss;
 }
 
 //////////////////////////
 function getStrValues(ElemPos, matrixStr){
     let StartPos=Math.floor(ElemPos/9);
     let StrValues= matrixStr.substring(StartPos,StartPos+9);
     StrValues= StrValues.match(/[1-9]/g).map((item)=>Number(item)).sort((a,b)=>a-b);
     return StrValues;
 }
  function getRawValues(ElemPos, matrixStr){
     let StartPos=Math.floor(ElemPos%9);
     let RawValues=[];
     for(let i=StartPos;i<81;i+=9){
        RawValues.push(matrixStr.charAt(i));
     }
     RawValues=RawValues.map((item)=>Number(item)).sort((a,b)=>a-b);
     RawValues= RawValues.filter((a)=>a!==0);
     return RawValues;
 }
 function getSquarValues(ElemPos, matrixStr){
     let SquarValues=[];
     let InitPos=ElemPos-ElemPos%3-9*(Math.floor(ElemPos/9)%3);
     for(let i=0;i<3;i++){
         for(let j=0;j<19;j+=9){
             SquarValues.push(matrixStr.charAt(InitPos+i+j));
         }
     }
     SquarValues=SquarValues.map((item)=>Number(item)).sort((a,b)=>a-b);
     SquarValues=SquarValues.filter((a)=>a!==0);
     return SquarValues;
 }
 
 ///////////////////
 
     let temp=[];
     let result=[];
     let matrixStr=matrix.toString().replace(/,/g,"");
     let ZeroPoss=[];
     let ValuePoss=[];
     ZeroPoss=getZeros(matrixStr);
     
     for(let i=0, length=ZeroPoss.length; i<length;i++){
     let StringValues= getStrValues(ZeroPoss[i], matrixStr);
     let RawValues=getRawValues(ZeroPoss[i], matrixStr);
     let SquarValues= getSquarValues(ZeroPoss[i], matrixStr);
     let UniqueStringValues= getUnique(RefSet, StringValues);
     let UniqueRawValues=getUnique(RefSet, RawValues);
     let UniqueSquarValues=getUnique(RefSet, SquarValues);
     let Unique;
     Unique=getUnique(UniqueStringValues,UniqueRawValues);
     Unique=getUnique(Unique,UniqueSquarValues);
     ValuePoss[i]=Unique;
     
     //console.log(matrixStr);
     if(ValuePoss[i].length===1){
        matrixStr= matrixStr.substr(0, ZeroPoss[i])+ValuePoss[i]+
         matrixStr.substr(ZeroPoss[i]+1);
     }
     }
     temp=matrixStr.split("").map((item)=>Number(item));
     for(let i=0; i<9; i++){
         result.push(temp.slice(i*9, (i+1)*9));
     }
     //console.log(result);
     
  return result;
}
////////////////////////

