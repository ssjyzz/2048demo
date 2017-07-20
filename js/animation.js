// 通过动画显示数字
function numAni(i,j,randNumber){
	var numCell = $(`#num-cell-${i}-${j}`);
	numCell.css({
					'background-color':getNumsBgColor(randNumber),
					'color':getNumsColor(randNumber)
					
				});
	numCell.text(randNumber);
	numCell.animate({
		width:'100px',
		height:'100px',
		top:getPosTop(i,j),
		left:getPosLeft(i,j),
	}, 500);
}
// 通过动画移动
function moveAni(fromX,FromY,toX,toY){
	var numCell = $(`#num-cell-${fromX}-${FromY}`);
	numCell.animate({
		top:getPosTop(toX,toY),
		left:getPosLeft(toX,toY),
		'line-height':'100px'
	}, 200);
}