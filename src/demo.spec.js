const expect = require('expect');
const sinon = require('sinon');
const $ = require('jquery');

const { getRecommendedMeal, getIngredientsOfRecommendation, getPieOutOfTheOven, checkMuffin } = require('./demo.js');


describe('AJAX example', function() {
    let ajaxStub;

    beforeEach(function () {
        document.body.innerHTML = '';
        ajaxStub = sinon.stub($, 'ajax');
    });

    afterEach(function () {
        $.ajax.restore();
    });

    it('get food recommendation - success', function() {
        ajaxStub.yieldsTo('success', {name: 'pizza', rating: 4.2});
        getRecommendedMeal();
        const result = document.querySelector('p');
        expect(result.textContent).toBe('pizza is rated 4.2');
    });

    it('get food recommendation - error', function() {
        ajaxStub.yieldsTo('error');
        getRecommendedMeal();
        const result = document.querySelector('p');
        expect(result.textContent).toBe('Could not fetch recommendation.');
    });

    it('get ingredients for recommended meal', function() {
        ajaxStub.onCall(0).yieldsTo('success', {name: 'Pizza Funghi', id: 3})
                .onCall(1).yieldsTo('success', ['mushrooms', 'cheese']);
        getIngredientsOfRecommendation();
        const headline = document.querySelector('h1');
        expect(headline.textContent).toBe('Pizza Funghi');
        const ingredients = document.querySelector('p');
        expect(ingredients.textContent).toBe('mushrooms, cheese');

        const args = ajaxStub.getCall(1).args;
        expect(args[0].url).toBe('/ingredients/3/');
    });
});

describe('timeout example', function() {
    let clock;

    beforeEach(function () {
        document.body.innerHTML = '';
        clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        clock.restore();
    });

    it('get pie from the oven', function() {
        const pie = getPieOutOfTheOven();
        expect(pie.state).toBe('too hot');
        clock.tick(30000);
        expect(pie.state).toNotBe('ready');
        clock.tick(30000);
        expect(pie.state).toBe('ready');
    });
});

describe('polling example', function() {
    let clock;
    let ajaxStub;

    beforeEach(function () {
        document.body.innerHTML = '';
        clock = sinon.useFakeTimers();
        ajaxStub = sinon.stub($, 'ajax');
    });

    afterEach(function () {
        clock.restore();
        $.ajax.restore();
    });

    it('check if muffins are ready', function() {
        ajaxStub.onCall(0).yieldsTo('success', {ready: false})
                .onCall(1).yieldsTo('success', {ready: false})
                .onCall(2).yieldsTo('success', {ready: true});

        const muffin = checkMuffin();
        expect(muffin.state).toBe('baking');

        clock.tick(1000);
        expect(muffin.state).toBe('baking');

        clock.tick(1000);
        expect(muffin.state).toBe('ready');
    });
});
