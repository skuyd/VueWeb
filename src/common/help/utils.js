export default {
    getWindowSize: function() {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    },
    mergeArray: function(arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            for (var j = 0; j < arr2.length; j++) {
                if (arr1[i] === arr2[j]) {
                    arr1.splice(i, 1); //利用splice函数删除元素，从第i个位置，截取长度为1的元素
                }
            }
        }
        //alert(arr1.length)
        for (var i = 0; i < arr2.length; i++) {
            arr1.push(arr2[i]);
        }
        return arr1;
    },
    removeArray: function(arr1, arr2) {
        var arr = arr1;
        arr2.forEach(d => {
            arr = arr.filter(item => item !== d);
        });
        return arr;

    }

}