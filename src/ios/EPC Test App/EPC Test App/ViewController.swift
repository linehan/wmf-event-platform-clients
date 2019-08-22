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
    @IBOutlet weak var numberOfBucketsLabel: UILabel!
    @IBOutlet weak var bucketLabel: UILabel!
    @IBOutlet weak var numberOfBucketsStepper: UIStepper!

    var id: Identifier = Identifier()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        updateInfoLabels()
    }

    func updateInfoLabels() {
        identifierLabel.text = id.toHex()
        bucketLabel.text = String(id.inBucket(buckets: Int(numberOfBucketsStepper.value)))
    }

    //MARK: Actions
    @IBAction func stepUp(_ sender: Any) {
        id.step()
        updateInfoLabels()
    }
    @IBAction func regenIdentifier(_ sender: Any) {
        id = Identifier()
        updateInfoLabels()
    }
    @IBAction func changeNumberOfBuckets(sender: UIStepper) {
        let n_buckets: Int = Int(sender.value)
        var str_buckets: String = "\(n_buckets) bucket"
        if (n_buckets > 1) {
            str_buckets += "s"
        }
        numberOfBucketsLabel.text = str_buckets
        updateInfoLabels()
    }

}
