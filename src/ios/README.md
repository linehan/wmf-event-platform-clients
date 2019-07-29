# Event Platform Client - iOS

Output of `EventPlatformClient` (executable built from [main.swift](EventPlatformClient/main.swift))

```
start
Stream Manager: StreamManager(config: ["SessionLength": EventPlatformClient.StreamConfig(fields: ["field2": 2, "field1": "A", "field3": 3.0])], client_token: "clientID", session_token: "sessionID", stream_token: ["stream name": "token"], stream_token_refresh_count: ["stream name": 0])
initializing a request buffer with capacity of 5 requests and cooldown of 300ms
scheduled timer triggers event posting
scheduled timer triggers event posting
flushing unpaused buffer holding 2 events
sending '{ "banner_id": "A", "action": "impression" }' to endpoint at https://en.wikipedia.org/api.php
sending '{ "banner_id": "B", "action": "impression" }' to endpoint at https://en.wikipedia.org/api.php
scheduled timer triggers event posting
scheduled timer triggers event posting
scheduled timer triggers event posting
flushing unpaused buffer holding 3 events
sending '{ "banner_id": "B", "action": "click" }' to endpoint at https://en.wikipedia.org/api.php
sending '{ "banner_id": "C", "action": "impression" }' to endpoint at https://en.wikipedia.org/api.php
sending '{ "banner_id": "C", "action": "click" }' to endpoint at https://en.wikipedia.org/api.php
scheduled timer triggers event posting
scheduled timer triggers event posting
scheduled timer triggers event posting
flushing unpaused buffer holding 3 events
sending '{ "banner_id": "D", "action": "impression" }' to endpoint at https://en.wikipedia.org/api.php
sending '{ "banner_id": "D", "action": "click" }' to endpoint at https://en.wikipedia.org/api.php
sending '{ "banner_id": "E", "action": "impression" }' to endpoint at https://en.wikipedia.org/api.php
scheduled timer triggers event posting
scheduled timer triggers event posting
scheduled timer triggers event posting
ran out of events to post
pausing request buffer
Program ended with exit code: 9
```
