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

    <div class="game-header" id="game-area">
        <form method="GET" action="index.php" id="form">
            <div class="slider">
                <span>Game Width:</span>
                <output  id="range_width_disp"><?php echo $width ?></output><br>
                <input class="range-selector" type="range" name="width" id="range_width" value="<?php echo $width ?>" min="7" max="20" oninput="range_width_disp.value = range_width.value">
            </div>
            <div class="slider">
                <span>Game Height:</span>
                <output  id="range_height_disp"><?php echo $height ?></output><br>
                <input class="range-selector" type="range" name="height" id="range_height" value="<?php echo $height ?>" min="6" max="20" oninput="range_height_disp.value = range_height.value">
            </div>
<!--            <div class="slider">-->
<!--                <span>Connect Quantity:</span>-->
<!--                <output  id="range_connections_disp">--><?php //echo $connections ?><!--</output><br>-->
<!--                <input class="range-selector" type="range" name="connections" id="range_connections" value="--><?php //echo $connections ?><!--" min="4" max="20" oninput="range_connections_disp.value = range_connections.value">-->
<!--            </div>-->
        </form>
    </div>

    <div class="game-area" id="game-board">

    </div>

<script>
    let globals = {};
    $(document).ready(function(){
        $(".range-selector").on("change", function() {
            board = new Board($("#range_width").val(), $("#range_height").val());
            board.draw();
            document.getElementById('form').submit();
        });

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


        let board = new Board($("#range_width").val(), $("#range_height").val());
        board.draw();
        addEvent();
    });
</script>


 <?php
include("footer.php");