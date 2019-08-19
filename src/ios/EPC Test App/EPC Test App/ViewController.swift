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
    @IBOutlet weak var stringIdentifierLabel: UILabel!
    @IBOutlet weak var hexIdentifierLabel: UILabel!

    var id: Identifier = Identifier()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        updateIdentifierLabels()
    }

    func updateIdentifierLabels() {
        stringIdentifierLabel.text = id.asString(separator: "·")
        hexIdentifierLabel.text = id.asHex()
    }

    //MARK: Actions
    @IBAction func stepUp(_ sender: Any) {
        id.step()
        updateIdentifierLabels()
    }
    @IBAction func regenIdentifier(_ sender: Any) {
        id = Identifier()
        updateIdentifierLabels()
    }

}
