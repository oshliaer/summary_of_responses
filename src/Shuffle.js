var notmove = [0];

function getShuffleData() {
    var form = FormApp.openById(ID_FORM);
    var elmnts = form.getItems();
    var s = '';
    for (var i in elmnts) {
        s += '[' + elmnts[i].getTitle() + ' ' + elmnts[i].getIndex() + '] ';
    }
    return s;
}

function test() {
    ID_FORM = '1PCUrZlPIXdhqGPyobm7pR78dN0dy07AQqpP4ZVVGJCo';
}

function shuffleIt() {
    ID_FORM = '1PCUrZlPIXdhqGPyobm7pR78dN0dy07AQqpP4ZVVGJCo';
    var form = FormApp.openById(ID_FORM);
    var elmnts = form.getItems();
    var arr = [];
    var narr = [];

    function addToarr(a, i) {
        if (elmnts[i].getType() == FormApp.ItemType.IMAGE) {
            a.push([elmnts[i], elmnts[++i]])
        } else {
            a.push([elmnts[i]]);
        }
    }
    for (var i = 0; i < elmnts.length; i++) {
        if (notmove.indexOf(i) > -1) {
            addToarr(narr, i);
        } else {
            addToarr(arr, i);
        }
    }
    /*  arr.forEach(function(sarr){
    var str = '';
    sarr.forEach(function(m){ str += '[' + m.getTitle() + ' ' + m.getIndex() + '] '})
    Logger.log(str);
    });
  
  
    var counter = arr.length, temp, index;
  
    // While there are elements in the array
    while (counter > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
    }
    var i = 0;
    arr.forEach(function(sarr){
    sarr.forEach(function(m){ form.moveItem(m, i++)})
    });
    */
}
