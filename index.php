<?php
include("header.php");
$width = 7;
$height = 6;
?>

    <div class="content" id="game-area">
        <form method="GET" action="play.php" id="form">
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
            <input type="submit" value="Play">
        </form>
    </div>

 <?php
include("footer.php");