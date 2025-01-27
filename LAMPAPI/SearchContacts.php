<?php

	$inData = getRequestInfo();
	
    $searchName = $inData["searchName"];
	$searchCount = $inData["searchCount"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contactManagerDB");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        //LIMIT CONTACTS RECIEVED
        $limit = isset($inData["limit"]) ? intval($inData["limit"]) : 10;


        $contactName = "%" . $searchName . "%"; // FOR FINDING SIMILAR NAMES

        $stmt = $conn->prepare("
            SELECT * FROM Contacts 
            WHERE (FirstName LIKE ? OR LastName LIKE ? OR Email LIKE ? OR Phone LIKE ?) AND UserID = ? 
            ORDER BY FirstName ASC, LastName ASC 
            LIMIT ?
        ");

        $stmt->bind_param("ssssis", $contactName, $contactName, $contactName, $contactName, $userId, $limit);
        $stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			// $searchResults .= '"' . $row["FirstName"] . ' ' . $row["LastName"] .'"';
			$searchResults .= '{"FirstName" : "' . $row["FirstName"] . '" , "LastName" : "' . $row["LastName"] . '" , "Phone" : "' . $row["Phone"] . '" , "Email" : "' . $row["Email"] . '"}';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
		$stmt->close();
		$conn->close();
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
