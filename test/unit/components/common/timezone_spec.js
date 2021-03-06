var assert = require('chai').assert;
var expect = require('chai').expect;
var React = require('react');
var _ = require('lodash');
var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../../../support/TestHelpers');

var ExplorerActions = require('../../../../client/js/app/actions/ExplorerActions');
var ProjectUtils = require('../../../../client/js/app/utils/ProjectUtils');
var Timezone = require('../../../../client/js/app/components/common/timezone.js');

describe('components/common/timezone', function() {

  before(function () {
    this.updateStub = sinon.stub(ExplorerActions, 'update');
  });

  after(function() {
    ExplorerActions.update.restore();
  });

  beforeEach(function () {
    this.updateStub.reset();
    this.model = TestHelpers.createExplorerModel();
    this.component = TestUtils.renderIntoDocument(<Timezone model={this.model} />);
  });

  it('should use the value from the project config if it matches the name', function(){
    var timezoneInput = this.component.refs.timezone.refs.input.getDOMNode();
    timezoneInput.value = 'US/Hawaii (GMT-10:00)';
    TestUtils.Simulate.change(timezoneInput);
    assert.deepPropertyVal(this.updateStub.getCall(0).args[1], 'query.timezone', 'US/Hawaii');
  });

  it('should use the value from the project config if it matches the value', function(){
    var timezoneInput = this.component.refs.timezone.refs.input.getDOMNode();
    timezoneInput.value = 'US/Hawaii';
    TestUtils.Simulate.change(timezoneInput);
    assert.deepPropertyVal(this.updateStub.getCall(0).args[1], 'query.timezone', 'US/Hawaii');
  });

  it('should allow a custom value if there is no match in the project config', function(){
    var timezoneInput = this.component.refs.timezone.refs.input.getDOMNode();
    timezoneInput.value = '-27000';
    TestUtils.Simulate.change(timezoneInput);
    assert.deepPropertyVal(this.updateStub.getCall(0).args[1], 'query.timezone', '-27000');
  });

  it('should allow a custom value if there is no match in the project config', function(){
    var newModel = TestHelpers.createExplorerModel();
    newModel.query.timezone = 'US/Hawaii';
    this.component.setProps({ model: newModel });
    var inputValue = this.component.refs.timezone.refs.input.getDOMNode().value;
    assert.strictEqual(inputValue, 'US/Hawaii');
  });
});