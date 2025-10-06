// function majorityElement(nums) {
//     let numMap = new Map();
//     let result;
  
// for(let num of nums){
// numMap.set(num,(numMap.get(num) +1 || 1 ));
// }

// numMap.forEach((num,i)=>{
//     if(num > Math.floor(nums.length/2)){
//         result =  i;
//         console.log(i,num)
//     }
// })
// return result;
// };

// console.log(majorityElement([2,2,1,1,1,2,2]));




function searchMatrix(matrix,target) {
    for(let i=0;i<matrix.length;i++){
        for(let j=matrix[i].length;j>0;j--){
            if(target > matrix[i][j]){
            continue
            }

            else if(matrix[i][j] === target){
                return true;
            } 

        }
    }
return false;
}; 


console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]],  3));