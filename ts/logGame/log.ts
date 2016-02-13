"use strict";
    
// Code shamelessly taken & slightly edited from 
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
        (window.console && (console["firebug"] || (console["exception"] && console["table"]))) ||
        // is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}
    
// Output to both Dev Console & fake dev console window
// YOU HAVE NO IDEA HOW LONG THIS TOOK.
function output(text: string, ...args: string[]) {
    // Guarantee that it's a string, sometimes it isn't (like when an invalid 
    // expression is `eval`ed and then an Error is passed in)
    text = text.toString();

    let styleParts = text.split(/(%c&#?[a-zA-Z0-9]+);/g);
    let elementArr: HTMLSpanElement[] = [];
    let output = document.getElementById("output");

    // First argument can be styled, parse it
    for (let i = 0; i < styleParts.length; i++) {
        let span = document.createElement("span");

        if (styleParts[i].substring(0, 2) === "%c") {
            // Styled element, get style and remove that element from iteration
            span.style.cssText = args[i];
            args.splice(i, 1);

            span.textContent = styleParts[i].substring(2, styleParts[i].length);
        } else {
            span.textContent = styleParts[i];
        }

        elementArr.push(span);
    }

    // Concatenate the rest of the arguments (with the style arguments 
    // removed) and output.
    if (args.length > 0) {
        let restOfText = document.createElement("span");
        restOfText.textContent = args.join();
        elementArr.push(restOfText);
    }
    
    elementArr.forEach(function (el) { output.appendChild(el); });
    output.innerHTML += "\n";

    // Aand output to console.
    console.log.apply(console, arguments);
}
    
// Code shamelessly copied & edited from https://github.com/isitchristmas/web, 
// under the MIT license: https://github.com/isitchristmas/web/blob/master/LICENSE
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
export default (function (message: string, ...args: string[]) {
    // if in plain-text mode, strip out %c and don't pass on extra args
    if (!useColors())
        output(message.replace(/%c/gi, ''));
    else {
        // if any args beyond message, pass them on to output
        if (args.length > 0)
            output.apply(console, [message].concat(args));
        // otherwise, assume plain text bare message
        else
            output(message);
    }
});