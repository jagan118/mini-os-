| Status Code | Name                  | Meaning                        | Example                       |
| ----------- | --------------------- | ------------------------------ | ----------------------------- |
| `200`       | OK                    | Request succeeded              | Data fetched successfully     |
| `201`       | Created               | New resource created           | User registered               |
| `204`       | No Content            | Success, but nothing to return | Item deleted successfully     |
| `400`       | Bad Request           | Client sent invalid data       | Invalid PID, missing fields   |
| `401`       | Unauthorized          | User is not logged in          | Missing JWT token             |
| `403`       | Forbidden             | Logged in, but not allowed     | No permission to kill process |
| `404`       | Not Found             | Resource doesn't exist         | Process with PID not found    |
| `409`       | Conflict              | Resource already exists        | Email already registered      |
| `422`       | Unprocessable Entity  | Validation failed              | Invalid email format          |
| `429`       | Too Many Requests     | Rate limit exceeded            | Too many login attempts       |
| `500`       | Internal Server Error | Unexpected server error        | Database crashed              |
| `502`       | Bad Gateway           | Upstream server failed         | API gateway error             |
| `503`       | Service Unavailable   | Server temporarily unavailable | Server under maintenance      |
