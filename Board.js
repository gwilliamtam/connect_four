class Board
{
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this._columns = [];
        this._winners = [];
        this._connections = 4;
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
        if (column<this._width) {
            if (this._columns[column][0] == 'W') {
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
            for (let n=1; n<this._connections; n++) {
                targetCol = targetCol + directions[i].x;
                targetRow = targetRow + directions[i].y;
                if ((targetCol >= 0) && (targetCol < this._width)
                    && (targetRow >= 0) && (targetRow < this._height)
                ){
                    console.log(targetCol, targetRow);
                    if (this._columns[col][row] === this._columns[targetCol][targetRow]) {
                        console.log(this._columns[col][row], '=', this._columns[targetCol][targetRow]);
                        stack.push([targetCol, targetRow]);
                    }
                }
            }
            if (stack.length >= this._connections) {
                this._winners = stack;
                for (let w=0; w<this._winners.length; w++) {
                    let winEl = document.getElementById(this._winners[w][0] + '-' + this._winners[w][1]);
                    winEl.classList.add('winner');
                }
                return true;
            }
        }

    }

    computerTurn() {
        let done = false;
        while(!done) {
            let randomColumn = Math.floor(Math.random() * (this._width) );
            if (this.columnAvailable(randomColumn)) {
                done = true;
                this.dropCoin(randomColumn, 'B');
            }
        }
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