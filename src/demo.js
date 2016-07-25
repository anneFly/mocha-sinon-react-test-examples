const $ = require('jquery');

function getRecommendedMeal () {
    $.ajax({
        url: '/get/food/recommendation/',
        success (meal) {
            $('body').append(`<p>${meal.name} is rated ${meal.rating}</p>`);
        },
        error () {
            $('body').append('<p>Could not fetch recommendation.</p>');
        }
    });
}

function getIngredientsOfRecommendation () {
    const getIngredients = function (mealId) {
        $.ajax({
            url: `/ingredients/${mealId}/`,
            success (ingredients) {
                $('body').append(`<p>${ingredients.join(', ')}</p>`);
            },
        });
    };

    const getRecommendation = function () {
        $.ajax({
            url: '/get/food/recommendation/',
            success (meal) {
                $('body').append(`<h1>${meal.name}</h1>`);
                getIngredients(meal.id);
            },
        });
    };

    getRecommendation();
}

function getPieOutOfTheOven () {
    const pie = {
        state: 'too hot',
    };

    window.setTimeout(function () {
        pie.state = 'ready';
    }, 60000);

    return pie;
}

function checkMuffin () {
    const muffin ={
        state: 'baking',
    };

    const checkState = function () {
        $.ajax({
            url: '/muffin/ready/',
            success (response) {
                if (response.ready) {
                    muffin.state = 'ready';
                } else {
                    window.setTimeout(checkState, 1000);
                }
            },
        });
    };
    checkState();
    return muffin;
}

module.exports = {
    getRecommendedMeal,
    getIngredientsOfRecommendation,
    getPieOutOfTheOven,
    checkMuffin,
};
