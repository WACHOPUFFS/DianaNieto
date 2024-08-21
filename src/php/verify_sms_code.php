<?php
require_once 'cors.php';
require_once 'conexion.php';

// Configurar cabeceras para la respuesta JSON
header('Content-Type: application/json');

// Recibir datos del formulario
$phoneNumber = trim($_POST['phoneNumber']);
$smsCode = trim($_POST['smsCode']);

// Verificar si se proporcionaron todos los datos necesarios
if (empty($phoneNumber) || empty($smsCode)) {
    echo json_encode(array('success' => false, 'message' => 'Datos incompletos.'));
    exit();
}

// Consulta para verificar el código SMS
$query = "SELECT * FROM sms_codes WHERE phone_number = ? AND code = ?";
if ($stmt = $mysqli->prepare($query)) {
    $stmt->bind_param('ss', $phoneNumber, $smsCode);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(array('success' => true, 'message' => 'Código verificado correctamente.'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Código incorrecto.'));
    }

    $stmt->close();
} else {
    // Error al preparar la consulta de selección
    echo json_encode(array('success' => false, 'message' => 'Error al consultar la base de datos.'));
}

// Cerrar la conexión a la base de datos
$mysqli->close();
?>
