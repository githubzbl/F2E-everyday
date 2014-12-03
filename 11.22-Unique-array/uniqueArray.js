var array = [2, 4, 8, 9, 20, 2, 4, 9];
array = uniqueArray(array);
function uniqueArray (array) {
	var result = [];
	array.sort(compare);
	for ( var i in array ) {
		if ( result.indexOf(array[i]) == -1) {
			result.push(array[i]);
		};
	}
	return result;
}
console.log(array);
// array1.sort(compare);  //  排序后会不会快一些？
// var array2 = [];
// for (var i = 0; i < array1.length; i++) {
// 	if (array2.indexOf(array1[i]) == -1) {
// 		array2.push(array1[i]);
// 	}
// };
function compare (value1, value2) {
	 return value2 - value1;
}
// console.log(array2);