
(function() {
    "use strict";
    
    // Code shamelessly taken from 
    // https://github.com/visionmedia/debug/blob/master/browser.js, under the 
    // MIT license: https://github.com/visionmedia/debug/blob/master/LICENSE
    // (The MIT License)
    // 
    // Copyright (c) 2014 TJ Holowaychuk <tj@vision-media.ca>
    // 
    // Permission is hereby granted, free of charge, to any person obtaining a 
    // copy of this software and associated documentation files (the 
    // 'Software'), to deal in the Software without restriction, including 
    // without limitation the rights to use, copy, modify, merge, publish, 
    // distribute, sublicense, and/or sell copies of the Software, and to 
    // permit persons to whom the Software is furnished to do so, subject to 
    // the following conditions:
    // 
    // The above copyright notice and this permission notice shall be included 
    // in all copies or substantial portions of the Software.
    // 
    // THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS 
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
    // IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
    // CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
    // TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
    // SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    // 
    function useColors() {
        // is webkit? http://stackoverflow.com/a/16459606/376773
        return ('WebkitAppearance' in document.documentElement.style) ||
            // is firebug? http://stackoverflow.com/a/398120/376773
            (window.console && (console.firebug || (console.exception && console.table))) ||
            // is firefox >= v31?
            // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
            (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
    }
    
    // Code shamelessly copied from https://github.com/isitchristmas/web, under 
    // the MIT license: https://github.com/isitchristmas/web/blob/master/LICENSE
    // Copyright (C) 2014, Eric Mill
    // 
    // Permission is hereby granted, free of charge, to any person obtaining a 
    // copy of this software and associated documentation files (the 
    // "Software"), to deal in the Software without restriction, including 
    // without limitation the rights to use, copy, modify, merge, publish, 
    // distribute, sublicense, and/or sell copies of the Software, and to 
    // permit persons to whom the Software is furnished to do so, subject to 
    // the following conditions:
    // 
    // The above copyright notice and this permission notice shall be included 
    // in all copies or substantial portions of the Software.
    // 
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
    // IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
    // CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
    // TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
    // SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    // 
    window.log = function(message) {
        // if in plain-text mode, strip out %c and don't pass on extra args
        if (!useColors())
            console.log(message.replace(/%c/gi, ''));
        else {
            // if any args beyond message, pass them on
            var args = Array.prototype.slice.call(arguments, [1]);
            if (args.length > 0)
                console.log.apply(console, [message].concat(args));
            // otherwise, assume plain text bare message
            else
                console.log(message);
        }
    }
}());