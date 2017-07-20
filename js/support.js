// 获取距离上面位置
function getPosTop(i,j){
	return 20+120*i;
}
// 获取距离左边位置
function getPosLeft(i,j){
	return 20+120*j;
}
// 获取数字背景颜色
function getNumsBgColor(num){
	switch( num ){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}

// 获取数字的颜色
function getNumsColor(num){
	if (num <= 4) {
		return '#776e65';
	}else{
		return '#fff';
	}
}

//判断还有没有空间了
function noSpace(nums){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(nums[i][j] == 0){
				return false;
			} 
		}
	}
	return true;
} 
/*
	判断是否能移动
	1.左边没有数字;
	2.左边数字和自己相等;
*/
function canMoveLeft(nums){
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (nums[i][j] != 0) {
				if (nums[i][j-1] == 0 || nums[i][j-1] == nums[i][j]) {
				return true;
				}
			}
			
		}
	}
	return false;
}
function canMoveRight(nums){
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (nums[i][j] != 0) {
				if (nums[i][j+1] == 0 || nums[i][j+1] == nums[i][j]) {
				return true;
				}
			}
			
		}
	}
	return false;
}
function canMoveUp(nums){
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (nums[i][j] != 0) {
				if (nums[i-1][j] == 0 || nums[i-1][j] == nums[i][j]) {
				return true;
				}
			}
			
		}
	}
	return false;
}

function canMoveDown(nums){
	for (var i = 2; i >= 0; i--) {
		for (var j = 0; j < 4; j++) {
			if (nums[i][j] != 0) {
				if (nums[i+1][j] == 0 || nums[i+1][j] == nums[i][j]) {
				return true;
				}
			}
			
		}
	}
	return false;
}
// 判断水平方向上是否有障碍物 i  k   j   nums
function noBlockHorizontal(row,col1,col2,nums){
	for (var m = col1+1; m < col2; m++) {
		if (nums[row][m] !=0) {
			return false;
		}
	}
	return true;
}
// 判断竖直方向上是否有障碍物
function noBlockvertical(row1,row2,col,nums){
	for (var m = row1+1; m < row2; m++) {
		if (nums[m][col] !=0) {
			return false;
		}
	}
	return true;
}

