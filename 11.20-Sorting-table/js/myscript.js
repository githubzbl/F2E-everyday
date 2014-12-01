$(function () {
	var tdCont = [];     // 每列的td内容存入数组
	var indexOfCol = 0;  // 获取点击的列的索引值
	var cnt = 0;  		 // 每列td内容升序或降序排列

	// 得到要排序的内容
	var getCont = function (indexOfCol) {
		$('tbody tr').each(function() {
			var td = $(this).children('td:eq('+indexOfCol+')').text();
			tdCont.push(td);
		});
	}
	// 降序排列
	var compareUp = function (value1, value2) {
		return value1 - value2;
	}
	// 重新排列表格顺序
	var setCont = function (tdCont) {
		for (var i = 0; i < tdCont.length; i++) {
			$('tbody tr').each(function() {
				var td = $(this).children('td:eq('+indexOfCol+')').text();
				if (td == tdCont[i]) {
				$('tbody').append($(this));
				}
			});
		}
	}
	// 求和
	var sumOfRow = function () {
		$('tbody tr').each(function() {
			var td = 0 , sum = 0;
			var len = $(this).children(':not(.name)').length ;
			for (var i = 1; i < len ; i++) {
				td = parseInt($(this).children('td:eq('+ i +')').text());
				sum = td + sum;
			};
			$(this).children('td.sum').replaceWith('<td class="sum">'+sum+'</td>');
		});
	}();
	//sumOfRow();

	$('thead tr th').click(function() {

		tdCont = [];
		indexOfCol = $(this).index();
		// console.log(indexOfCol);
		getCont(indexOfCol);
		// console.log(tdCont);
		if ( cnt++ % 2 !== 0 ) {
			tdCont.sort(compareUp);
			// console.log(tdCont);
		}
		else {
			tdCont.sort(compareUp).reverse();
			// console.log(tdCont);
		}
		setCont(tdCont);
	});

});




