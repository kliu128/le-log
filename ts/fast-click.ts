 // From https://gist.github.com/gajus/bbf06ea2e37047b01e70 mainly

declare var require: any;

function init() {
    if ('touchAction' in document.body.style) {
        document.body.style.touchAction = 'manipulation';
    } else {
        require.ensure(['fastclick'], (require) => {
            const FastClick = require('fastclick');

            window.addEventListener('load', () => {
                FastClick.attach(document.body);
            });
        }, 'fastclick');
    }
}

export default init;