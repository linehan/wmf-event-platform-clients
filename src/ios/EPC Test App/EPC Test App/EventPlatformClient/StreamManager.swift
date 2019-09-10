
public struct StreamConfig {
    private var streams: [String: [String: Any]]
    public static func endpointURI() -> String {
        return "https://pai-test.wmflabs.org/streams"
    }
    public init(_ streams: [String: [String: Any]]) {
        self.streams = streams
    }
}

import Foundation

struct StreamManager {

    var configs: StreamConfig? = nil
    let client_token: String = StreamManager.getClientToken()
    let session_token: String = StreamManager.getSessionToken()

    private func loadStreamConfig() -> Void {
        print("attempting to load stream configs")
        let task = URLSession.shared.dataTask(with: URL(string: StreamConfig.endpointURI())!) {
            (responseData, response, _) in
            if let httpResponse = response as? HTTPURLResponse {
                if httpResponse.statusCode == 200 || httpResponse.statusCode == 304 {
                    let json = try? JSONSerialization.jsonObject(with: responseData!, options: []) as? [String: [String: Any]]
                    if json != nil {
                        print(json!.description)
                        /* TODOs:
                         * - set self.configs to StreamConfig(json!); see: https://developer.apple.com/documentation/foundation/url_loading_system/fetching_website_data_into_memory
                         * - add stream config cascading
                         */
                    }
                } else {
                    print("\(httpResponse.statusCode)")
                }
            }
        }
        task.resume()
    }

    static private func getClientToken() -> String {
        return "00000000-0000-0000-0000-000000000000"
    }

    static private func getSessionToken() -> String {
        return "ffffffff-ffff-ffff-ffff-ffffffffffff"
    }

    init() {
        self.loadStreamConfig()
    }

}
