<?php
// Retrieve the task and email data sent from the client-side code
$task = $_POST['task'];
$email = $_POST['email'];

// Perform server-side validation and sanitization of the data if required
// ...

// Use a PHP email library or API to send the email
// Example using PHPMailer library:
require 'vendor/autoload.php';

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->setFrom('sundari.ec21@bitsathy.ac.in', 'Sundari P');
$mail->addAddress($email);
$mail->Subject = 'New Task Added';
$mail->Body = "A new task has been added to your todo list:\n\n$task";

if ($mail->send()) {
  http_response_code(200); // Email sent successfully
} else {
  http_response_code(500); // Failed to send email
}
?>

