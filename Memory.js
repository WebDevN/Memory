let [c00, c01, c02, c10, c11, c12] = [
    document.getElementById("00"),
    document.getElementById("01"),
    document.getElementById("02"),
    document.getElementById("10"),
    document.getElementById("11"),
    document.getElementById("12")
];

const board = {
    ids: [c00, c01, c02, c10, c11, c12],
    randIndices: [],
    clrOpt: ["red", "red", "green", "green", "blue", "blue"],
    randIds: [],
    clrSet: [],
    idSet: [],
    clrMatched: [],
    fails: 0
}

let n;
for (let i = 0; i < 6; i++) {
    do {
        n = Math.floor(Math.random() * 6);
    } 
    while (board.randIndices.includes(n));
    board.randIndices.push(n);
}

board.randIds = board.randIndices.map(num => board.ids[num]);

let j = 0;
function flip(event) {  
    let cell = document.getElementById(event.target.id); 
    for (let i = 0; i < 6; i++) {
        if (cell === board.ids[i]) {
            event.target.style.backgroundColor = board.clrOpt[board.randIds.indexOf(cell)];
            board.clrSet.push(board.clrOpt[board.randIds.indexOf(cell)]);
            board.idSet.push(board.ids.indexOf(cell));
            j++;
            if (j == 2) {
                result();
            }
        }
    } 
}

function result() {  
    if (board.clrSet[0] == board.clrSet[1]) {
        j = 0;
        setTimeout(function() {alert("MATCH!")}, 500);
        board.clrSet = [];
        board.clrMatched.push(...board.idSet);
        board.ids[board.idSet[0]].removeAttribute("onclick");
        board.ids[board.idSet[1]].removeAttribute("onclick");
        board.idSet = [];
        for (let i = 0; i < 6; i++) {
            board.ids[i].style.backgroundColor = "white";
        }
        for (let i = 0; i < board.clrMatched.length; i++) {
            board.ids[board.clrMatched[i]].style.backgroundColor = 
                board.clrOpt[board.randIds.indexOf(board.ids[board.clrMatched[i]])];
        }
        if (board.clrMatched.length == 6) {
            setTimeout(winAlert, 500);
        }
    } else {
        setTimeout(afterDelay, 500);   
    }   
}

let f = document.getElementById("fails");
function afterDelay() {
    alert("Try again.")
    j = 0;
    board.clrSet = [];
    board.idSet = [];
    for (let i = 0; i < 6; i++) {
        board.ids[i].style.backgroundColor = "white";
    }
    for (let i = 0; i < board.clrMatched.length; i++) {
        board.ids[board.clrMatched[i]].style.backgroundColor = 
            board.clrOpt[board.randIds.indexOf(board.ids[board.clrMatched[i]])];
    }
    board.fails++;
    f.innerHTML = board.fails;
}

function winAlert() {
    alert("You WIN!!!");
    setTimeout(() => location.reload(), 2000);
}