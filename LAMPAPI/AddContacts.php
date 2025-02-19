<?php
	$inData = getRequestInfo();
	
	$first_name = $inData["firstName"];
	$last_name = $inData["lastName"];
	$email = $inData["email"];
	$phone_number = $inData["phoneNumber"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contactManagerDB");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
    $stmt = $conn->prepare("INSERT into Contacts (UserID, FirstName, LastName, Phone, Email) VALUES(?,?,?,?,?)");
		$stmt->bind_param("issss", $userId, $first_name, $last_name, $phone_number, $email);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>

