<?php
$webhook = "https://discord.com/api/webhooks/1444174098149277790/4n5lh8XSSxwibbKdYYRSGAXZMA41dvaqccqHI-1navjvO1ze2Dp6ShwtxxUhUyR7pZpa";

$payload = json_decode(file_get_contents('php://input'), true);

if ($payload) {
    $ch = curl_init($webhook);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch);
    curl_close($ch);
}
?>
