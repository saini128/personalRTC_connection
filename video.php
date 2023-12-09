<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $callerName = $_POST["callerName"];
    $receiverName = $_POST["receiverName"];

    // Pass values to the video HTML file using a query string
    header("Location: video.html?callerName=$callerName&receiverName=$receiverName");
    exit();
}
?>
