var nums = new Array();
$(function(){
	newGame();
});
// 开始新游戏
function newGame(){
	// 初始化页面
	init();
	/*if (!moveLeft() && !moveRight() && !moveUp() && !moveDown()) {
		return;
	}*/
	// 在随机单元格中生成数字
	generateRamNumber();
	generateRamNumber();
}
// 初始化页面
function init(){
	// 初始化背景单元格位置
	for (var i = 0; i < 4; i++) {
		for(var j = 0;j < 4;j++){
			var gridCell = $('#g-c-' + i + '-' + j);
			gridCell.css({
				'top':getPosTop(i,j),
				'left':getPosLeft(i,j)
			});
		}
	}
	// 初始化数组
	for (var i = 0; i < 4; i++) {
		nums[i] = new Array();
		for (var j = 0; j < 4; j++) {
			nums[i][j] = 0;
		}
	}
	// 动态创建上层单元格并初始化，更新视图
	upDateView();
}

// 更新视图页面
function upDateView () {
	$('.num-cell').remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#container').append(`<div class="num-cell" id="num-cell-${i}-${j}"></div>`);
			var numCell = $(`#num-cell-${i}-${j}`);
			if (nums[i][j] != 0) {
				numCell.css({
					'width':'100px',
					'height':'100px',
					'top':getPosTop(i,j),
					'left':getPosLeft(i,j),
					'background-color':getNumsBgColor(nums[i][j]),
					'color':getNumsColor(nums[i][j])
				});
				numCell.text(nums[i][j]);
			}else{
				numCell.css({
					'width':'0px',
					'height':'0px',
					'top':getPosTop(i,j)+50,
					'left':getPosLeft(i,j)+50
				});
			}
		}
	}
}

/*
	产生随机数(2或4)
	找到随机位置(空单元格)
*/
function generateRamNumber(){
	// 判断是否还有空间，如果没有空位置则游戏结束
		if (noSpace(nums)) {
			return;
		}
	// 找到随机位置
		var count = 0;
		var array = new Array();
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (nums[i][j] == 0) {
					array[count] = i * 4 + j;//i=2,j=1
					count++;
				}
			}
		}
		var n = Math.floor(Math.random()*count);
		var ranX = Math.floor(array[n]/4);
		var ranY = Math.floor(array[n]%4);
	// 随机产生2/4
		var randNumber = Math.random()>0.5?2:4;
		nums[ranX][ranY] = randNumber;
	// 在随机位置上显示随机数字
	numAni(ranX,ranY,randNumber);
}

/*
	实现键盘响应
*/
$(document).keyup(function(event) {
	event.preventDefault();
	// 先判断游戏是否结束
	if ( !(canMoveLeft(nums) || canMoveUp(nums) || canMoveRight(nums) || canMoveDown(nums))){
		alert("game over");
		return;
	}
			
	switch (event.keyCode) {

	case 37://左
		if(canMoveLeft(nums)){
			moveLeft();
			setTimeout(generateRamNumber,210);
		}
		break;
	case 38://上
		if(canMoveUp(nums)){
			moveUp();
			setTimeout(generateRamNumber,210);
		}
		break;
	case 39://右
		if (canMoveRight(nums)) {
			moveRight();
			setTimeout(generateRamNumber,210);	
		}
		break;
	case 40://下
		if (canMoveDown(nums)) {
			moveDown();
			setTimeout(generateRamNumber,210);	
		}
		
		break;
	}

});

/*
	向左移动
	需要对每个数字的左边进行判断，选择最佳落脚点，落脚点有两种情况
	1.落脚点没有数字，并且在移动的时候没有障碍物
	2.落脚点数字和自己相等，并且在移动中，没有障碍物
*/
function moveLeft(){
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {//j=1最左边一列不用移动
			if (nums[i][j] != 0) {
				for (var k = 0; k < j; k++) {
											// 第i行k-j列之间是否有障碍物
					if (nums[i][k] == 0 && noBlockHorizontal(i,k,j,nums)) {
						// 移动操作
						moveAni(i,j,i,k);
						nums[i][k] = nums[i][j];//从i,j移动到i，k
						nums[i][j] = 0;//将原来的位置设为0
						break;
					}else if (nums[i][k] == nums[i][j] && noBlockHorizontal(i,k,j,nums)) {
						moveAni(i,j,i,k);
						nums[i][k] += nums[i][j];
						nums[i][j] =0;
						break;
					}
				}
			}
		}
	}
	setTimeout(upDateView,200);
}
/*
	向右移动
	需要对每个数字的左边进行判断，选择最佳落脚点，落脚点有两种情况
	1.落脚点没有数字，并且在移动的时候没有障碍物
	2.落脚点数字和自己相等，并且在移动中，没有障碍物
*/
function moveRight(){
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {//j=1最右边一列不用移动
			if (nums[i][j] != 0) {
				for (var k = 3; k > j; k--) {
											// 第i行k-j列之间是否有障碍物
					if (nums[i][k] == 0 && noBlockHorizontal(i,j,k,nums)) {
						// 移动操作
						moveAni(i,j,i,k);
						nums[i][k] = nums[i][j];//从i,j移动到i，k
						nums[i][j] = 0;//将原来的位置设为0
						break;
					}else if (nums[i][k] == nums[i][j] && noBlockHorizontal(i,j,k,nums)) {
						moveAni(i,j,i,k);
						nums[i][k] += nums[i][j];
						nums[i][j] = 0;
						break;
					}
				}
			}
		}
	}
	setTimeout(upDateView,200);
}

/*
	向上移动
	需要对每个数字的左边进行判断，选择最佳落脚点，落脚点有两种情况
	1.落脚点没有数字，并且在移动的时候没有障碍物
	2.落脚点数字和自己相等，并且在移动中，没有障碍物
*/
function moveUp(){
	for (var i = 1; i < 4; i++) {//i=1最上边一行不用移动
		for (var j = 0; j < 4; j++) {
			if (nums[i][j] != 0) {
				for (var k = 0; k < i; k++) {
											// 第j列k-i行之间是否有障碍物
					if (nums[k][j] == 0 && noBlockvertical(k,i,j,nums)) {
						// 移动操作
						moveAni(i,j,k,j);
						nums[k][j] = nums[i][j];//从i,j移动到i，k
						nums[i][j] = 0;//将原来的位置设为0
						break;
					}else if (nums[k][j] == nums[i][j] && noBlockvertical(k,i,j,nums)) {
						moveAni(i,j,k,j);
						nums[k][j] += nums[i][j];
						nums[i][j] =0;
						break;
					}
				}
			}
		}
	}
	setTimeout(upDateView,200);
}
/*
	向下移动
	需要对每个数字的左边进行判断，选择最佳落脚点，落脚点有两种情况
	1.落脚点没有数字，并且在移动的时候没有障碍物
	2.落脚点数字和自己相等，并且在移动中，没有障碍物
*/
function moveDown(){
	for (var i = 2; i >=0; i--) {//i=1最下边一行不用移动
		for (var j = 0; j < 4; j++) {
			if (nums[i][j] != 0) {
				for (var k = 3; k > i; k--) {
											// 第j列k-i行之间是否有障碍物
					if (nums[k][j] == 0 && noBlockvertical(i,k,j,nums)) {
						// 移动操作
						moveAni(i,j,k,j);
						nums[k][j] = nums[i][j];//从i,j移动到i，k
						nums[i][j] = 0;//将原来的位置设为0
						break;
					}else if (nums[k][j] == nums[i][j] && noBlockvertical(i,k,j,nums)) {
						moveAni(i,j,k,j);
						nums[k][j] += nums[i][j];
						nums[i][j] =0;
						break;
					}
				}
			}
		}
	}
	setTimeout(upDateView,200);
}