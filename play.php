<?php
include("header.php");
if (array_key_exists('width', $_GET)) {
    $width = $_GET['width'];
} else {
    $width = 7;
}
if (array_key_exists('height', $_GET)) {
    $height = $_GET['height'];
} else {
    $height = 6;
}
//if (array_key_exists('connections', $_GET)) {
//    $connections = $_GET['connections'];
//} else {
//    $connections = 4;
//}
?>
<div class="game-header">
    <div class="content">
        <form>
            <input type="hidden" id="range-width" value="<?php echo $width; ?>">
            <input type="hidden" id="range-height" value="<?php echo $height; ?>">
            <input type="submit" value="Refresh Game">
        </form>
        <a href="index.php">Change Game Size</a>
    </div>

</div>
<div class="game-area" id="game-board">
</div>

    <script>
        let globals = {};
        $(document).ready(function(){

            function addEvent()
            {
                document.addEventListener("click", (evt) => {
                    let targetElement = evt.target;
                    if (!board.hasWinner()) {
                        if (targetElement.classList.contains('white-coin')) {
                            let col = targetElement.parentElement.parentElement.getAttribute('col-id')
                            if (board.columnAvailable(col)) {
                                board.dropCoin(col);
                                board.processBoardForWinner();
                                if (!board.hasWinner()) {
                                    board.computerTurn();
                                }
                                board.processBoardForWinner();
                            } else {
                                alert('Try another column!');
                            }
                        }
                    }
                });
            }


            let board = new Board($("#range-width").val(), $("#range-height").val());
            board.draw();
            addEvent();
        });
    </script>
    <script src="Board.js"></script>
<?php
include("footer.php");
