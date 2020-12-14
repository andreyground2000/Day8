//Task 1
let str = 'Yesterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse. The "mission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first.';

function sherlockHolmes(str) {
   
    let regForAllStr = /(.*?[?!.])(?=\s*[A-ZА-ЯЁ]|$)/g;
    let sortedStr = str.match(regForAllStr);
    let regForWords = /\w+/g;
    
    let sortedArr = [];
    
    let secretString = "";
    
    for (let i = 0; i < sortedStr.length; i++) {
        sortedArr.push(sortedStr[i].replace(/\'/g, "").match(regForWords));
    }
    
    let arrOfLength = sortedArr[0].map(item => {
        return item.length;
    });
    
    for (let i = 0; i < arrOfLength.length; i++) {
        for (let j = i + 1; j < sortedArr.length; j++) {
            if (j === 1) {
                let word = sortedArr[j][arrOfLength[i] - 1];
                word = word.split('');
                let bigL = word[0].toUpperCase();
                word[0] = bigL;
                word = word.join("");
                secretString += word + " ";
                break;
            } 
            if (j === sortedArr.length - 1 && i === arrOfLength.length - 1) {
                let word = sortedArr[j][arrOfLength[i] - 1];
                secretString += word + "." + ' ';
                break;
            }
            let word = sortedArr[j][arrOfLength[i] - 1];
            secretString += word + ' ';
            break;
        }
    }
    
    return secretString;
}

console.log(sherlockHolmes(str));

//Task 2
function game(board, attacks) {
    let wounded = {};
    let allShips = {};
    let res = {
        sunk: 0,
        damaged: 0,
        notTouched: 0,
        points:0
    };

    board.forEach((item) => {
        item.forEach((item2) => {
            if (item2 > 0) {
                if (!allShips[item2]) {
                    allShips[item2] = 1;
                } else {
                    allShips[item2] = allShips[item2] +1;
                }
            }
        });
    });

    let arrayForRes = Object.keys(allShips);

    attacks.forEach(item => {
        let [x, y] = item;
        let shot = board[board.length - y][x - 1];
        if (shot > 0) {
            if (!wounded[shot]) {
                wounded[shot] = 1;
            } else {
                wounded[shot] = wounded[shot] + 1;
            }
        } 
    });
    
    arrayForRes.forEach(item => {
        let shipsCondition = wounded[item] ? wounded[item] : 0;
        switch(shipsCondition) {
            case allShips[item]: 
                res.sunk++;
                res.points++;
                break;
            
            case 0: 
                res.notTouched++;
                res.points--;
                break;
            
            default: 
                res.damaged++;
                res.points += 0.5;
        }
    });
    return res;
  }
  
  
  let board = [[0,0,0,2,2,0],
               [0,3,0,0,0,0],
               [0,3,0,1,0,0],
               [0,3,0,1,0,0]];

  let attacks = [[2, 1], [1, 3], [4, 2]];
  console.log(game(board, attacks));
  
