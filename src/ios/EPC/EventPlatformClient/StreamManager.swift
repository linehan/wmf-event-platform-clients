struct StreamConfig {
    var fields: [String:Any]
    init(_ stream_fields: [String:Any]) {
        fields = stream_fields
    }
}

import Foundation

struct StreamManager {

    var config: [String: StreamConfig] = [
        "stream name": StreamConfig(["field": true])
    ]
    var client_token = "client identifier"
    var session_token = "session identifier"
    var stream_token = ["stream name": "token"]
    var stream_token_refresh_count = ["stream name": 0]

    private func loadStreamConfig() -> [String: StreamConfig] {
        let sampleStringConfig = [
            "SessionLength": StreamConfig([
                "field1": "A",
                "field2": 2,
                "field3": 3.0
            ])
        ]
        return sampleStringConfig
    }

    func tokenInSample(stream_name: String) -> Bool {
        return true
    }

    private func getClientToken() -> String {
        return "clientID"
    }

    private func getSessionToken() -> String {
        return "sessionID"
    }

    init() {
        config = loadStreamConfig()
        client_token = getClientToken()
        session_token = getSessionToken()
    }

}
