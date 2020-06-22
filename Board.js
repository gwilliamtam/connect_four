class Board
{
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this._columns = [];
        this._winners = [];
        this._connections = 4;
        this._posible_winner = [];
    }

    draw() {
        let gameBoard = document.getElementById("game-board");
        gameBoard.innerHTML = '';
        let row = 0;
        let col = 0;
        for (col=0; col<this._width; col++) {
            this._columns[col] = [];
            let colEl = document.createElement('div');
            colEl.setAttribute('class', 'col');
            colEl.setAttribute('col-id', col.toString());
            for (row=0; row<this._height; row++) {
                let whiteCoin = document.createElement('div');
                whiteCoin.setAttribute('id', col.toString() + '-' + row.toString());
                whiteCoin.setAttribute('class', 'white-coin');
                whiteCoin.setAttribute('title', col.toString() + '-' + row.toString());
                let cellEl = document.createElement('div');
                cellEl.setAttribute('class', 'cell');
                cellEl.setAttribute('row-id', row.toString());
                cellEl.appendChild(whiteCoin);
                colEl.appendChild(cellEl);
                this._columns[col][row] = 'W';
            }

            gameBoard.appendChild(colEl);
        }
    }

    columnAvailable(column) {
        if (parseInt(column)<parseInt(this._width)) {
            if (this._columns[column][0] === 'W') {
                return true;
            }
        }
        return false;
    }

    dropCoin(columnNumber, color = 'R') {
        for(let row=0; row<this._columns[columnNumber].length; row++) {
            if (row<this._height) {
                if (this._columns[columnNumber][row] == 'W') {
                    if (color == 'R') {
                        this.makeCellRed(columnNumber, row);
                    } else {
                        this.makeCellBlue(columnNumber, row);
                    }
                    if (row>0) {
                        this.makeCellWhite(columnNumber, row-1);
                    }
                }
            }
        }
    }

    processBoardForWinner() {
        for(let col=0; col<this._width; col++) {
            for(let row=0; row<this._height; row++) {
                if (this._columns[col][row] !== 'W') {
                    if (this.checkWinnerCell(col, row)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    hasWinner() {
        if (this._winners.length >= this._connections) {
            return true;
        }
        return false;
    }

    checkWinnerCell(col, row) {
        let searchConnections = this._connections;

        let directions = [
            {'x': 1, 'y': 0},
            {'x': 1, 'y': 1},
            {'x': 0, 'y': 1},
            {'x': 1, 'y': -1},
        ];
        for (let i=0; i<directions.length; i++) {
            let stack = [];
            let targetCol = col;
            let targetRow = row
            stack.push([col, row]);
            for (let n=1; n<searchConnections; n++) {
                targetCol = targetCol + directions[i].x;
                targetRow = targetRow + directions[i].y;
                if ((targetCol >= 0) && (targetCol < this._width)
                    && (targetRow >= 0) && (targetRow < this._height)
                ){
                    if (this._columns[col][row] === this._columns[targetCol][targetRow]) {
                        stack.push([targetCol, targetRow]);
                    }
                }
            }
            if (stack.length >= searchConnections) {
                this._winners = stack;
                if (searchConnections === this._connections) {
                    for (let w=0; w<this._winners.length; w++) {
                        let winEl = document.getElementById(this._winners[w][0]
                            + '-' + this._winners[w][1]);
                        winEl.classList.add('winner');
                    }
                }
                return true;
            }
        }

    }

    computerTurn() {
        // find if computer Blue has a posible winner position
        this.findPossibleWinner("B");
        if (this._posible_winner.length>0) {
            console.log("Computer has ", this._posible_winner.length, " posible(s) winner(s) cell(s): ", this._posible_winner);
            this.dropCoin(this._posible_winner[0][0], 'B');
            return;
        }

        // find if human Red has a posible winner position
        this.findPossibleWinner("R");
        if (this._posible_winner.length>0) {
            console.log("Human has ", this._posible_winner.length, " posible(s) winner(s) cell(s): ", this._posible_winner);
            this.dropCoin(this._posible_winner[0][0], 'B');
            return;
        }
        // just do a random draw
        let done = false;
        while(!done) {
            let randomColumn = Math.floor(Math.random() * (this._width) );
            if (this.columnAvailable(randomColumn)) {
                done = true;
                this.dropCoin(randomColumn, 'B');
                return;
            }
        }
    }

    findPossibleWinner(color) {
        this._posible_winner = [];
        let listTopEmptyCells = [];
        // repeat for every column
        for (let col=0; col<this._width; col++) {
            // find lowest empty cell
            for (let row=0; row<this._height; row++) {
                if (this._columns[col][row] !== 'W') {
                    if (row>0) {
                        listTopEmptyCells.push([col,row-1]);
                        row = this._height;
                    }
                }
            }
            if (this._columns[col][this._height - 1] === 'W') {
                listTopEmptyCells.push([col,this._height - 1]);
            }
        }
        for (let i=0; i<listTopEmptyCells.length; i++) {
            if (this.isPosibleWinner(listTopEmptyCells[i][0], listTopEmptyCells[i][1], color)) {
                this._posible_winner.push(listTopEmptyCells[i]);
            }
        }
    }

    isPosibleWinner(col, row, color) {
        let searchConnections = this._connections - 1;
        let directions = [
            {'x': -1, 'y': -1},
            {'x': -1, 'y': 0},
            {'x': -1, 'y': 1},
            {'x': 0, 'y': 1},
            {'x': 1, 'y': 1},
            {'x': 1, 'y': 0},
            {'x': 1, 'y': -1},
        ];
        for (let i=0; i<directions.length; i++) {
            let stack = [];
            let targetCol = col;
            let targetRow = row
            for (let n=0; n<searchConnections; n++) {
                targetCol = targetCol + directions[i].x;
                targetRow = targetRow + directions[i].y;
                if ((targetCol >= 0) && (targetCol < this._width)
                    && (targetRow >= 0) && (targetRow < this._height)
                ){
                    if (this._columns[targetCol][targetRow] === color) {
                        stack.push([targetCol, targetRow]);
                    }
                }
            }
            if (stack.length >= searchConnections) {
                return true;
            }
        }
        return false;

    }

    makeCellWhite(col, row) {
        let id = col + '-' + row;
        let cellEl = document.getElementById(id);
        if (cellEl.classList.contains('red-coin')) {
            cellEl.classList.remove('red-coin');
        }
        if (cellEl.classList.contains('blue-coin')) {
            cellEl.classList.remove('blue-coin');
        }
        cellEl.classList.add('white-coin');
        this._columns[col][row] = 'W';
    }

    makeCellBlue(col, row) {
        let id = col + '-' + row;
        let cellEl = document.getElementById(id);
        if (cellEl.classList.contains('white-coin')) {
            cellEl.classList.remove('blue-coin');
        }
        if (cellEl.classList.contains('red-coin')) {
            cellEl.classList.remove('red-coin');
        }
        cellEl.classList.add('blue-coin');
        this._columns[col][row] = 'B';
    }

    makeCellRed(col, row) {
        let id = col + '-' + row;
        let cellEl = document.getElementById(id);
        if (cellEl.classList.contains('white-coin')) {
            cellEl.classList.remove('blue-coin');
        }
        if (cellEl.classList.contains('blue-coin')) {
            cellEl.classList.remove('blue-coin');
        }
        cellEl.classList.add('red-coin');
        this._columns[col][row] = 'R';
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    static get columns() {
        return this._columns;
    }
    get winner() {
        return this._winner;
    }
}