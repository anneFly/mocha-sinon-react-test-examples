const expect = require('expect');
const sinon = require('sinon');
const React = require('react');
const ReactDOM= require('react-dom');
const TestUtils = require('react-addons-test-utils');

const { StarterView, MainCourseView, SushiView } = require('./demo2.jsx');


describe('React example', function() {
    it('test StarterView', function() {
        const view = TestUtils.renderIntoDocument(
            <StarterView dish='soup' />
        );

        const div = TestUtils.findRenderedDOMComponentWithTag(view, 'div');
        expect(div.textContent).toBe('Now serving soup.');

        const dish = TestUtils.findRenderedDOMComponentWithClass(view, 'dish');
        expect(dish.textContent).toBe('soup');

        const spans = TestUtils.scryRenderedDOMComponentsWithTag(view, 'span');
        expect(spans[1].className).toInclude('yummy');
    });

    it('test MainCourseView', function () {
        const view = TestUtils.renderIntoDocument(
            <MainCourseView />
        );
        expect(view.state.selected).toNotExist();

        const radios = TestUtils.scryRenderedDOMComponentsWithTag(view, 'input');
        TestUtils.Simulate.change(radios[1]);

        expect(view.state.selected).toBe('fish');
        const selection = TestUtils.findRenderedDOMComponentWithClass(view, 'selection');
        expect(selection.textContent).toBe('You will get fish.');
    });

    it('test SushiView', function () {
        const container = document.createElement('div');
        const view = ReactDOM.render(<SushiView type="sashimi" />, container);

        ReactDOM.render(<SushiView type="nigiri" />, container);
        let answer = TestUtils.findRenderedDOMComponentWithTag(view, 'p');
        expect(answer.textContent).toBe('Om nom nom nom');

        ReactDOM.render(<SushiView type="nigiri" />, container);
        answer = TestUtils.findRenderedDOMComponentWithTag(view, 'p');
        expect(answer.textContent).toBe('next please');
        container.remove();
    });
});
