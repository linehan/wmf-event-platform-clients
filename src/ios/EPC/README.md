# Event Platform Client - iOS

Output of `EventPlatformClient` (executable built from [main.swift](EventPlatformClient/main.swift))

```
Stream Manager: StreamManager(config: ["SessionLength": EventPlatformClient.StreamConfig(fields: ["field1": "A", "field3": 3.0, "field2": 2])], client_token: "clientID", session_token: "sessionID", stream_token: ["stream name": "token"], stream_token_refresh_count: ["stream name": 0])
posting event to request buffer
posting event to request buffer
posting event to request buffer
posting event to request buffer
posting event to request buffer
capacity reached, flushing buffer
sending '{ "banner_id": "A", "action": "impression" }' to endpoint at https://en.wikipedia.org/api.php
sending '{ "banner_id": "B", "action": "impression" }' to endpoint at https://en.wikipedia.org/api.php
sending '{ "banner_id": "B", "action": "click" }' to endpoint at https://en.wikipedia.org/api.php
sending '{ "banner_id": "C", "action": "impression" }' to endpoint at https://en.wikipedia.org/api.php
posting event to request buffer
posting event to request buffer
posting event to request buffer
posting event to request buffer
capacity reached, flushing buffer
sending '{ "banner_id": "C", "action": "click" }' to endpoint at https://en.wikipedia.org/api.php
sending '{ "banner_id": "D", "action": "impression" }' to endpoint at https://en.wikipedia.org/api.php
sending '{ "banner_id": "D", "action": "click" }' to endpoint at https://en.wikipedia.org/api.php
sending '{ "banner_id": "E", "action": "impression" }' to endpoint at https://en.wikipedia.org/api.php
posting event to request buffer
posting event to request buffer
Requests remaining in buffer: [(url: "https://en.wikipedia.org/api.php", data: "{ \"banner_id\": \"F\", \"action\": \"impression\" }"), (url: "https://en.wikipedia.org/api.php", data: "{ \"banner_id\": \"G\", \"action\": \"impression\" }"), (url: "https://en.wikipedia.org/api.php", data: "{ \"banner_id\": \"G\", \"action\": \"click\" }")]
Program ended with exit code: 0
```
