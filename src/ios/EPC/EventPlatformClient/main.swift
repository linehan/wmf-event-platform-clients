import Foundation

let mySM = StreamManager()
print("Stream Manager: \(mySM)")

var myRB = HTTPRequestBuffer(capacity: 4, cooldown_ms: 60)

let myEvents: [String] = [
    "{ \"banner_id\": \"A\", \"action\": \"impression\" }",
    "{ \"banner_id\": \"B\", \"action\": \"impression\" }",
    "{ \"banner_id\": \"B\", \"action\": \"click\" }",
    "{ \"banner_id\": \"C\", \"action\": \"impression\" }",
    "{ \"banner_id\": \"C\", \"action\": \"click\" }",
    "{ \"banner_id\": \"D\", \"action\": \"impression\" }",
    "{ \"banner_id\": \"D\", \"action\": \"click\" }",
    "{ \"banner_id\": \"E\", \"action\": \"impression\" }",
    "{ \"banner_id\": \"F\", \"action\": \"impression\" }",
    "{ \"banner_id\": \"G\", \"action\": \"impression\" }",
    "{ \"banner_id\": \"G\", \"action\": \"click\" }"
]

for myEvent in myEvents {
    print("posting event to request buffer")
    myRB.post("https://en.wikipedia.org/api.php", myEvent)
}

print("Requests remaining in buffer: \(myRB.buffer)")
