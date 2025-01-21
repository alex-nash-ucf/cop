<?php
	$inData = getRequestInfo();
	
	$first_name = $inData["firstName"];
	$last_name = $inData["lastName"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contactManagerDB");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// ? is to avoid SQL injection attacks. Act as placeholders to later be binded.
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE UserId = ? AND FirstName = ? AND LastName = ?");
		$stmt->bind_param("iss", $userId, $first_name, $last_name);
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
