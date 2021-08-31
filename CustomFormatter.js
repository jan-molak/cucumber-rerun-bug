const { formatterHelpers, Status, Formatter } = require('@cucumber/cucumber')
const {
    getGherkinExampleRuleMap,
    getGherkinScenarioMap,
    getGherkinStepMap,
} = require('@cucumber/cucumber/lib/formatter/helpers/gherkin_document_parser')

module.exports = class CustomFormatter extends Formatter {
    constructor(options) {
        super(options);

        options.eventBroadcaster.on('envelope', this._parseEnvelope.bind(this))
    }

    _parseEnvelope(envelope) {
        if (envelope.testCaseStarted) {
            this._onTestCaseStarted(envelope.testCaseStarted)
        }
    }

    _onTestCaseStarted(testCaseStarted) {
        const testCaseAttempt = this.eventDataCollector.getTestCaseAttempt(testCaseStarted.id)

        const location = formatterHelpers.PickleParser.getPickleLocation(testCaseAttempt)

        this.log(`Test case started (${ testCaseStarted.id }), location: ${JSON.stringify(location) }\n`)
    }
}
