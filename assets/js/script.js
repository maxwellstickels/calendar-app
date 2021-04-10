var dateArea = document.getElementById('currentDay');
var saveBtn = document.getElementsByClassName('saveBtn');
var inputs = JSON.parse(localStorage.getItem('inputs'));
if (inputs === null) {
    inputs = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
}
var today = moment();
dateArea.textContent = today.format("[Today is ]MMMM Do[, ]YYYY");
updateRows();
loadStorage();

var timer = setInterval(function () {
    today = moment();
    updateRows();
    dateArea.textContent = today.format("[Today is ]MMMM Do[, ]YYYY");
}, 60000);

function updateRows() {
    var hr = Number(today.hours());
    var str = '';
    for (var i = 0; i < 24; i++) {
        // str is the id of a time-block
        str = 'time-block' + i;
        // childNodes[3] is the second child (the textarea) of the time-block.
        // childNode[0] and childNode[2] are not objects coded in HTML.
        if (i < hr) {
            document.getElementById(str).childNodes[3].setAttribute("class", "textarea past");
        }
        else if (i > hr) {
            document.getElementById(str).childNodes[3].setAttribute("class", "textarea future");
        }
        else {
            document.getElementById(str).childNodes[3].setAttribute("class", "texarea present");
        }
    }
}

function saveLocal(event) {
    var target = event.target;
    var targetId = target.parentNode.id;
    var idx = Number(targetId.slice(10));
    inputs[idx] = document.getElementById(targetId).childNodes[3].value;
    console.log(inputs);
    localStorage.setItem('inputs', JSON.stringify(inputs));
}

function loadStorage() {
    for (var i = 0; i < 24; i++) {
        str = 'time-block' + i;
        document.getElementById(str).childNodes[3].value = inputs[i];
    }
}

for (var i = 0; i < saveBtn.length; i++) {
    saveBtn[i].addEventListener('click', saveLocal);
}
