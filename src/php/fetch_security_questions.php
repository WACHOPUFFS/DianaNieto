<?php
require_once 'cors.php';
require_once 'conexion.php';

// Configurar cabeceras para la respuesta JSON
header('Content-Type: application/json');

// Recibir datos del formulario
$email = trim($_POST['email']);

// Verificar si se proporcionó un correo electrónico válido
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(array('success' => false, 'message' => 'Correo electrónico no válido'));
    exit();
}

// Consultar la base de datos para obtener las preguntas secretas
$query = "SELECT question1, question2 FROM security_questions WHERE email = ?";
if ($stmt = $mysqli->prepare($query)) {
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Obtener las preguntas secretas
        $questions = $result->fetch_assoc();
        echo json_encode(array('success' => true, 'questions1' => $questions['question1'], 'questions2' => $questions['question2']));
    } else {
        // No se encontraron preguntas para este correo electrónico
        echo json_encode(array('success' => false, 'message' => 'Preguntas de seguridad no encontradas.'));
    }

    $stmt->close();
} else {
    // Error al preparar la consulta de selección
    echo json_encode(array('success' => false, 'message' => 'Error al consultar la base de datos.'));
}

// Cerrar la conexión a la base de datos
$mysqli->close();
?>
