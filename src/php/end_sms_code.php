<?php
require_once 'cors.php';
require_once 'conexion.php';
require_once 'sms_service.php'; // Suponiendo que tienes un servicio para manejar el envío de SMS

// Configurar cabeceras para la respuesta JSON
header('Content-Type: application/json');

// Recibir datos del formulario
$phoneNumber = trim($_POST['phoneNumber']);

// Verificar si se proporcionó un número de teléfono válido
if (empty($phoneNumber)) {
    echo json_encode(array('success' => false, 'message' => 'Número de teléfono no proporcionado.'));
    exit();
}

$smsCode = rand(100000, 999999); // Genera un código de 6 dígitos

// Guarda el código en la base de datos para verificarlo después
$query = "INSERT INTO sms_codes (phone_number, code) VALUES (?, ?)";
if ($stmt = $mysqli->prepare($query)) {
    $stmt->bind_param('ss', $phoneNumber, $smsCode);
    if ($stmt->execute()) {
        if (sendSMS($phoneNumber, "Tu código de verificación es: $smsCode")) {
            echo json_encode(array('success' => true, 'message' => 'Código SMS enviado.'));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Error al enviar el SMS.'));
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error al guardar el código SMS.'));
    }

    $stmt->close();
} else {
    // Error al preparar la consulta de inserción
    echo json_encode(array('success' => false, 'message' => 'Error al preparar la consulta de inserción.'));
}

// Cerrar la conexión a la base de datos
$mysqli->close();
?>
