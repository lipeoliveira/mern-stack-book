'use strict';

var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
var helloContinents = Array.from(continents, c => `Hello ${c}!`);
var message = helloContinents.join(' ');

var element = React.createElement(
    'div',
    { title: 'Outer div' },
    React.createElement(
        'h1',
        null,
        'Hello World!'
    ),
    React.createElement(
        'h1',
        null,
        message
    )
);
ReactDOM.render(element, document.getElementById('content'));