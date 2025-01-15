<?php
	$inData = getRequestInfo();
	
	$first_name = $inData["firstName"];
	$last_name = $inData["lastName"];
	$email = $inData["email"];
	$username = $inData["username"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Users (UserId, FirstName, LastName, Username, Password) VALUES(?,?,?,?,?)");
		$stmt->bind_param("issss", $userId, $first_name, $last_name, $username, $password);
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