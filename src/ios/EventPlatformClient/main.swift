import Foundation

print("start")

let mySM = StreamManager()
print("Stream Manager: \(mySM)")

var myRB = HTTPRequestBuffer(capacity: 5, cooldown_ms: 300)

var myEvents: [String] = [
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

let timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { timer in
    print("scheduled timer triggers event posting")

    let myEvent = myEvents.removeFirst()
    myRB.post("https://en.wikipedia.org/api.php", myEvent)

    if myEvents.count == 0 {
        print("ran out of events to post")
        timer.invalidate()
        myRB.pause()
    }
}

RunLoop.current.run()

print("end")
