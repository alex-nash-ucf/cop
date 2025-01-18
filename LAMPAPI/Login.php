
<?php

	$inData = getRequestInfo();
	
	$login = $inData["login"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contactManagerDB");

	if( $conn->connect_error ) // CONNECTION UNSUCCESSFUL 
	{
		returnWithError( $conn->connect_error );
	}
	else // CONNECTION SUCCESSFUL 
	{
        // PREPARING QUERY
		$stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=? AND Password =?"); 
		$stmt->bind_param("ss", $inData["login"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();

        // PROCESSING RESULT
		if( $row = $result->fetch_assoc()) { returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );}
		else{ returnWithError("No Records Found"); }

		$stmt->close();
		$conn->close();
	}
	
    // GET INPUT
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

    // SEND AS JSON
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
    // RETURN 
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
