<?php
include("header.php");
$width = 7;
$height = 6;
$game_level = 1;
?>

    <div class="content" id="game-area">
        <form method="GET" action="play.php" id="form">
            <div class="slider">
                <span>Game Width (7-20):</span>
                <output  id="range_width_disp"><?php echo $width ?></output><br>
                <input class="range-selector" type="range" name="width" id="range_width" value="<?php echo $width ?>" min="7" max="20" oninput="range_width_disp.value = range_width.value">
            </div>
            <div class="slider">
                <span>Game Height (6-20):</span>
                <output  id="range_height_disp"><?php echo $height ?></output><br>
                <input class="range-selector" type="range" name="height" id="range_height" value="<?php echo $height ?>" min="6" max="20" oninput="range_height_disp.value = range_height.value">
            </div>
            <div class="slider">
                <span>Game Level (1-3):</span>
                <output  id="range_game_level_disp"><?php echo $game_level ?></output><br>
                <input class="range-selector" type="range" name="game_level" id="range_game_level" value="<?php echo $game_level ?>" min="1" max="3" oninput="range_game_level_disp.value = range_game_level.value">
            </div>
<!--            <div class="slider">-->
<!--                <span>Connect Quantity:</span>-->
<!--                <output  id="range_connections_disp">--><?php //echo $connections ?><!--</output><br>-->
<!--                <input class="range-selector" type="range" name="connections" id="range_connections" value="--><?php //echo $connections ?><!--" min="4" max="20" oninput="range_connections_disp.value = range_connections.value">-->
<!--            </div>-->
            <input type="submit" value="Play Now!" class="boton">
        </form>
        <ul>
            <li><img src="red_coin.png" height="20"> Coin for human</li>
            <li><img src="blue_coin.png" height="20"> Coin for computer</li>
            <li>Level 1: Computer just do a random draw</li>
            <li>Level 2: If computer has three inline will try to use it </li>
            <li>Level 3: If human has three inline the computar will try to block </li>
            <li class="unavailable">Not available yet:</li>
            <li class="unavailable">Level 4: Detect computer posible win with three cells that are not adjacent</li>
            <li class="unavailable">Level 5: Detect human posible win with three cells that are not adjacent</li>
            <li class="unavailable">Level 6: Computer will draw in a column with more winning posibilities like position a coin adjacent to other existent coin and empty cells in line.</li>
            <li>Higher levels include any lower level</li>
        </ul>
    </div>

 <?php
include("footer.php");