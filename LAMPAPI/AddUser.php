<?php
	$inData = getRequestInfo();
	
	$first_name = $inData["firstName"];
	$last_name = $inData["lastName"];
	$username = $inData["username"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contactManagerDB");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT * FROM Users WHERE Login = ?");
		$stmt->bind_param("s", $username);
        $stmt->execute();

		$result = $stmt->get_result();
		$rows = mysqli_num_rows($result);
		if ($rows == 0){
			// DO NOT ADD ID, SQL TAKES CARE OF IT
      $stmt->close();
			$stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)");
			$stmt->bind_param("ssss", $first_name, $last_name, $username, $password);

			$stmt->execute();
			$stmt->close();
			$conn->close();
		} else
		{
			returnWithError("Username unavailable.");
		}

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
