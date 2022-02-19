/* 
Создать функцию, генерирующую шахматную доску. 
Можно использовать любые html-теги. Доска должна быть верно разлинована на черные и белые ячейки. 
Строки должны нумероваться числами от 1 до 8, столбцы — латинскими буквами A, B, C, D, E, F, G, H.
createChessBord
*/
function createBoard() {

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
    let white = false;

    let board = document.createElement('div');
    board.className = 'chess';

    for (let row = 0; row <= 8; row++) {

        let currentRow = document.createElement('div');
        currentRow.className = 'row';

        for (let cell = 0; cell <= 8; cell++) {
            let contentText;
            let currentCell = document.createElement('div');
            currentCell.className = 'cell';

            if (row == 0) {
                (cell == 0) ? currentCell.classList.add('upCell', 'leftCell') : currentCell.classList.add('upCell');
                contentText = (cell == 0) ? '' : letters[cell - 1];
            }
            else {
                if (cell == 0) {
                    currentCell.classList.add('leftCell');
                }
                else {
                    (white) ? currentCell.classList.add('whiteCell') : currentCell.classList.add('blackCell');
                }
                white = !white
                contentText = (cell == 0) ? numbers[row - 1] : '';
            }

            currentCell.textContent = contentText;
            currentRow.appendChild(currentCell);

        }

        board.appendChild(currentRow);

    }

    document.querySelector('body').appendChild(board);

}

createBoard();