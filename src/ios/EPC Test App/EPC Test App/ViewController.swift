//
//  ViewController.swift
//  EPC Test App
//
//  Created by Mikhail Popov on 8/19/19.
//  Copyright © 2019 Wikimedia Foundation. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    //MARK: Properties
    @IBOutlet weak var identifierLabel: UILabel!
    @IBOutlet weak var bucketLabel: UILabel!
    @IBOutlet weak var equalWeightsSwitch: UISwitch!
    @IBOutlet weak var bucketStatsLabel: UILabel!
    @IBOutlet weak var bucketPropsLabel: UILabel!
    @IBOutlet weak var pauseButton: UIButton!
    @IBOutlet weak var unpauseButton: UIButton!

    var id: Identifier = Identifier()
    let prob1 = [0.25, 0.25, 0.25, 0.25];
    let prob2 = [0.40, 0.10, 0.30, 0.20];
    var stats: [Int] = [0, 0, 0, 0];
    var buffer = HTTPRequestBuffer()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        updateInfoLabels()
    }

    func updateInfoLabels() {
        identifierLabel.text = id.toHex()

        let probs = equalWeightsSwitch.isOn ? prob1 : prob2
        let b = Sampling.inBucket(rand: id.randomComponent(), weights: probs)
        stats[b - 1] += 1
        let total = Double(stats.reduce(0, +))

        bucketLabel.text = String(b)
        bucketStatsLabel.text = stats.description + String(format: " = %.0f", total)

        let props: [String] = stats.map() { n in String(format: "%.2f%%", 100 * Double(n) / total) }
        bucketPropsLabel.text = props.joined(separator: ", ")
    }

    func postExampleEvent(event: String) {
        buffer.post("https://pai-test.wmflabs.org/log", ExampleEvent(id: id.toHex(), event: event))
    }

    //MARK: Actions
    @IBAction func stepUp(_ sender: Any) {
        id.step()
        postExampleEvent(event: "step")
        updateInfoLabels()
    }
    @IBAction func regenIdentifier(_ sender: Any) {
        id = Identifier()
        postExampleEvent(event: "regen")
        updateInfoLabels()
    }
    @IBAction func changeWeightsSettings(_ sender: UISwitch) {
        // reset stats
        stats = [0, 0, 0, 0];
        updateInfoLabels()
    }
    @IBAction func flushBuffer(_ sender: Any) {
        buffer.flush()
    }
    @IBAction func pauseBuffer(_ sender: Any) {
        buffer.pause()
        pauseButton.isEnabled = false
        unpauseButton.isEnabled = true
    }
    @IBAction func unpauseBuffer(_ sender: Any) {
        buffer.unpause()
        pauseButton.isEnabled = true
        unpauseButton.isEnabled = false
    }

}
