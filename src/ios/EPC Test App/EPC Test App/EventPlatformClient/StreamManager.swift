struct StreamConfig {
    var fields: [String:Any]
    init(_ stream_fields: [String:Any]) {
        fields = stream_fields
    }
}

import Foundation

struct StreamManager {

    var config: [String: StreamConfig] = [:]
    let client_token: String = StreamManager.getClientToken()
    let session_token: String = StreamManager.getSessionToken()
    var stream_token: [String: String] = [:]
    var stream_token_refresh_count: [String: Int] = [:]

    private func loadStreamConfig() -> [String: StreamConfig] {
        let sampleStringConfig = [
            "foo": StreamConfig([
                "schema": "foo",
                "sampling_rate": 0.5
            ]),
            "bar": StreamConfig([
                "schema": "bar",
                "sampling_rate": 0.5
            ])
        ]
        return sampleStringConfig
    }

    func tokenInSample(stream_name: String) -> Bool {
        return true
    }

    static private func getClientToken() -> String {
        return "00000000-0000-0000-0000-000000000000"
    }

    static private func getSessionToken() -> String {
        return "ffffffff-ffff-ffff-ffff-ffffffffffff"
    }

    init() {
        self.config = self.loadStreamConfig()
    }

}
