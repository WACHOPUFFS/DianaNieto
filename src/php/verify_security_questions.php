<?php
require_once 'cors.php';
require_once 'conexion.php';

// Configurar cabeceras para la respuesta JSON
header('Content-Type: application/json');

// Recibir datos del formulario
$email = trim($_POST['email']);
$question1 = trim($_POST['question1']);
$answer1 = trim($_POST['answer1']);
$question2 = trim($_POST['question2']);
$answer2 = trim($_POST['answer2']);

// Verificar si se proporcionaron todos los datos necesarios
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($question1) || empty($answer1) || empty($question2) || empty($answer2)) {
    echo json_encode(array('success' => false, 'message' => 'Datos incompletos.'));
    exit();
}

// Consultar la base de datos para verificar las respuestas
$query = "SELECT * FROM security_questions WHERE email = ? AND question1 = ? AND answer1 = ? AND question2 = ? AND answer2 = ?";
if ($stmt = $mysqli->prepare($query)) {
    $stmt->bind_param('sssss', $email, $question1, $answer1, $question2, $answer2);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(array('success' => true, 'message' => 'Respuestas correctas.'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Respuestas incorrectas.'));
    }

    $stmt->close();
} else {
    // Error al preparar la consulta de selección
    echo json_encode(array('success' => false, 'message' => 'Error al consultar la base de datos.'));
}

// Cerrar la conexión a la base de datos
$mysqli->close();
?>
