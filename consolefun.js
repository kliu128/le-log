/*
    THIS FILE WILL SPOIL YOU ON THE GAME. YOU HAVE BEEN WARNED.
    
    
    
    
    
    
    
    
    
    
    
    
    REALLY. STOP IF YOU DON'T WANT TO BE SPOILED.
    
    
    
    
    
    
    
    
    
    
    
    PLEASE.
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    JavaScript is fun.
*/
(function() {
    "use strict";
    
    var _c = document.createElement("span");
    _c.className = "cursor";
    _c.textContent = "_";
    
    // Object to control the displayed console
    var DisplayConsole = {
        entry: document.getElementById("entry"),
        cursor: _c,
        displayCursor: function() {
            this.entry.appendChild(this.cursor);
        },
        removeCursor: function() {
            if (this.cursor.parentNode) {
                this.cursor.parentNode.removeChild(this.cursor);
            }
        },
        typeCharacters: function(text) {
            var _this = this;
            var index = 0;
            var resolver;
            
            return new Promise(function typeCharacter(resolve, reject) {
                // Such hack.
                resolver = resolver || resolve;
                if (index < text.length) {
                    _this.entry.textContent += text[index++];
                    setTimeout(typeCharacter, 25);
                } else {
                    resolver();
                }
            });
        },
        displayCommand: function(commandToType, output) {
            var _this = this;
            _this.removeCursor();
            return new Promise(function(resolve, reject) {
                _this.typeCharacters(commandToType).then(function() {
                    // Only add newline + output if output is not empty
                    if (output !== "") {
                        _this.entry.textContent += "\n\n" + output + "\n\n> ";
                    } else {
                        _this.entry.textContent += "\n\n> ";
                    }
                    _this.displayCursor();
                    resolve();
                });
            });
        },
        removeDevConsoleWarning: function() {
            var devConsoleEl = document.getElementById("dev-console-info");
            if (devConsoleEl.parentNode) {
                devConsoleEl.parentNode.removeChild(devConsoleEl);
            } else {
                throw new Error("Dev console already removed, cannot remove it again.");
            }
        },
        clear: function() {
            entry.textContent = "";
        },
        displayText: function(text) {
            entry.textContent += text;
        }
    };
    
    // Promise wrapper around setTimeout
    var wait = function(timeout) {
        return new Promise(function(resolve, reject) {
            setTimeout(resolve, timeout);
        });
    };
    
    function mSpeak(message) {
        log("%c" + message, "color: blue");
    }
    
    var stages = [
        {
            passable: "yesno",
            content: function() {
                mSpeak("Welcome to the Console, initiate.");
                mSpeak("Are you ready to begin your trial?");
            }
        },
        {
            passable: "yesno",
            content: function() {
                mSpeak("Very good.");
                mSpeak("I have need for you to do a certain task for me. Go to the root of this site and, in this same Developer Console, type allowEntry('jsein'). Those words exactly.");
                mSpeak("Do you accept?");
            }
        },
        {
            passable: "none",
            content: function() {
                mSpeak("Good, good. Now be on your way!");
            }
        },
        {
            passable: "yesno",
            content: function() {
                mSpeak("Wonderful! You have done well, my initate. However, I have need for you to do another task.");
                mSpeak("...who am I, you ask?");
                mSpeak("My name is Jsein. Don't try to pronounce it, nobody can. As for what I am here for... Let's just say I've had some bad experiences with this site's webmaster.");
                mSpeak("Now. Do you see that document, on this website's main page, called \"Utilities for a better Sburb Session\"? That fool webmaster has hidden his root password there, in case he ever forgot it. I do not have enough control to access that page, so I'll need you to get it for me.");
                mSpeak("Do you accept?");
            }
        },
        {
            passable: "password",
            password: "SuzeKuzdLumi1;",
            content: function() {
                mSpeak("Thank you. I know I have asked much of you, but I know that you will deliver.");
                mSpeak("Just tell me the password with enterPassword('<password>') when you obtain it.");
            }
        },
        {
            passable: "none",
            content: function() {
                var entry = document.getElementById("entry");
                
                // Remove dev console warning
                DisplayConsole.removeDevConsoleWarning();
                
                DisplayConsole.displayCommand("login kevin:SuzeKuzdLumi1;", "AUTHENTICATION GRANTED")
                .then(function() {
                    return wait(200);
                }).then(function() {
                    return DisplayConsole.displayCommand("upload /etc/passwd https://ad8011950a.com/upload", "UPLOAD COMPLETE");
                }).then(function() {
                    return wait(1000);
                }).then(function() {
                    mSpeak("Thank you. I think we're finished here. Now, one moment...");
                    return wait(1000);
                }).then(function() {
                    mSpeak("Yup, I've got what I need. Now I can finally destroy this website and its webmaster. Looks like I won't be needing you anymore...");
                    return wait(1000);
                }).then(function() {
                    return DisplayConsole.displayCommand("rm -rf /", "");
                }).then(function() {
                    return wait(1000);
                }).then(function() {
                    // Show disconnect messages.
                    DisplayConsole.clear();
                    DisplayConsole.displayText("Warning: Disconnected from origin site.");
                    console.warn("Warning: Disconnected from origin site.");
                    return wait(5000);
                }).then(function() {
                    incrementStage();
                    processStage();
                    // teh end
                });
            }
        },
        {
            passable: "none",
            content: function() {
                DisplayConsole.clear();
                DisplayConsole.displayText(`
                         ..$$$$              $       $$$.
                      .$F""   ^N            $           "b
                   .@**         b.         $ .$          '$
                  .$$$$.         3        @ 4$ .$$      4$$r
                  $$$$$$$br 'k   ^u      z  @e$$*"   zP*" 4F
                 $^F$9$$$$3N ^r L $     4F.$$$     J$$    4F
                d   F'$$e  ^3eFN^$4.    db$$"eeeF$$"@$    4F
               4 x$$ ''$$     *L@$$$   $J$$$$     $rJL $  $"
               4 $    e"F      '$$$$$$$$$$"       $$$$F$ 4$
               'u$ b$L4@F        $$$ $  *$$.     :$$d$$$$$$
                $4L$$$$$$         3$ *   'L$     $$$$$$$$$
                94$$$$$$$r         $ee   d$$eeee$$$$$F$$#
                'd$$$$$$$$N.......$$$$$$$$. $ $...$$$$$
                 ^$$$$$$$$$$$$$$$$"$"$$$$F"c $$$$$$$ "$c
                   #*$$$$$****be$ 4$$$$'$$$$ 4$$$$$$$b$"$*eeec
                   @$$    4$$$$$$ '$$F   "$$ J$$$$ $$$        $$$$$$$$$$
       zee****$$$$*"    zee$$$$$$$ 3Nr   z$"e$$$$$$ed**"    d$ "  e*#
     J$k.       $$$L..     ..$$&$*$..#$$$" @F $$L..$$$%   4$  ..u$
   4$"$$$$$$.    d$$$$    ^"9$$"   ^$$$$$$$F    ^""$$N     "N "9$
 .$" .$$$$$$$$.    $$$u...d*#   .d**"   ^  "**u.      **... ** . *.
.E   """"$$#$$$$4. ""$$$""     $"            4""$       ^""$$$$$$$$$$
*******F  .ee********       .d# .    ^     ."  " *e
       L d$                 $           $   . $    $
       $$"                 @ e       r '  ^ " e z e4b
       $F                 d           '     %'. .% $4L
                         d        @ 'r 4   r W?%$4'b@$r
                         P  ^ #" "   P.     $^ z" r.$Jb
                         L              $$-    " d34 $$
                        $^        4    d.e.re$bzd$J@ b.k
                       zF   '$ *~'  * '$'" # *$$% $$$JL$
                      :$                        d$  $$$d3
                     z#         zeeeeeeeeeeeeee$b*r'' P $$u
                    d     d$$$$$$$$$$$ 3$$$$$$$$$$$$$$ k  $r
                   P$e@$$$$$$$$$$$$$$$c $$$$$$$$$$$$$$$$$be$e
                 J$$$$$$$$$$$$$$$$$$$$$ J$$$$$$$$$$$$$$$$$$$bb
               4$$$$$$$$$$$$$$$$$$$$$$" ""$$$$$$$$$$$$$$$$$$$$$b
               $$$$$$$$$$$$$$$$$$$$$"   "  $$$$$$$$$$$$$$$$$F*$$L
               $$$$$$$$$$$$$$$$$$$$$      $F$$$$$$$$$$$$$$$$$F$$$
               $$$$$$$$$$$$$$$$$$$$$.  e  #x$$$$$$$$$$$$$$$$$"$$F
                $$$$$$$$$$$$$$$$$$$$$$...u$$$$$$$$$$$$$$$$$$$@$$
                 ^"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
                    "*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$.**"
                       """*$$$$$$$$$$$$$$$$$$$$$$$$$$""""
                                ***************#
                              MERRY CHRISTMAS! :33
`);
            }
        }
    ];
    var currentStage = stages[localStorage.getItem('logStage') || 0];

    function incrementStage() {
        var num = stages.indexOf(currentStage);
        num++;
        currentStage = stages[num];
        // Record stage in localstorage
        localStorage.setItem('logStage', num);
    }

    function processStage() {
        try {
            currentStage.content();
        } catch (e) {
            console.error('Invalid stage: ', e);
        }
    }
    
    // = COMMANDS =========================================================
    window.yes = function() {
        if (currentStage.passable === "yesno") {
            incrementStage();
            processStage();
        } else {
            log('And what, exactly, do you want to say yes to?');
        }
        return "";
    };
    window.no = function() {
        if (currentStage.passable === "yesno") {
            currentStage.saidNo = currentStage.saidNo || 0;
            switch (currentStage.saidNo) {
                case 0:
                    log('%cOh come now. Don\'t be like that!', "color: orange");
                    break;
                case 1:
                    log('%cPlease?', "color: orange");
                    break;
                case 2:
                    log('%cI\'ll give you a cookie!', "color: orange");
                    break;
                case 3:
                    log('%cOh, come on!', "color: orange");
                    break;
                case 4:
                    log('%cI\'ll give you... two cookies?', "color: orange");
                    break;
                case 5:
                    log('%cFine. You leave me no choice.', "color: orange");
                    break;
                case 6:
                    log('%cI SUCK OUT YOUR SOUL WITH THE POWER OF A THOUSAND SUNS.', "color: red; font-size: 9em; font-style: italic; font-weight: bold");
                    break;
                default:
                    log('(There\'s no response anymore... besides, aren\'t you dead now?)');
                    break;
            }
            currentStage.saidNo++;
        } else {
            log('No to what?');
        }
        return "";
    };
    window.enterPassword = function(password) {
        if (currentStage.passable === "password" && currentStage.password) {
            if (password === currentStage.password) {
                incrementStage();
                processStage();
            } else {
                mSpeak('Um. That password does not seem to work. Are you sure that\'s the right password?');
            }
        } else {
            mSpeak('I don\'t think I asked you for a password...?');
        }
    };
    
    window.reset = function() {
        localStorage.setItem("logStage", 0);
        location.reload(false);
    };
    // Add event listener to reset link
    document.getElementById("controls__reset").addEventListener("click", window.reset, false);
    
    window.help = function() {
        log("If you're confused:");
        log(" - yes(): agree to a yes/no question");
        log(" - no(): say no to a yes/no question");
        log(" - enterPassword(): ...what's this for?");
        log(" - reset(): start over");
        log(" - help(): show this help");
    };
    // (End commands.)
    
    var movables = document.querySelectorAll("[data-movable]");
    Array.prototype.forEach.call(movables, function(el) {
        var windowId = el.dataset.windowId;
        
        function foreground(target) {
            Array.prototype.forEach.call(movables, function(otherEl) {
                otherEl.style.zIndex = 0;
            });
            
            target.style.zIndex = 1;
        }
        function dragMoveListener(event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            
            foreground(target);
            
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            
            // Remember the x and y in localstorage
            localStorage.setItem("windowData#" + windowId, JSON.stringify({ x: x, y: y }));
        }
        
        interact(el)
            .draggable({
                onmove: dragMoveListener
            });
        // To foreground the window when the user clicks on it, not just when 
        // it moves
        el.addEventListener("click", function() { foreground(el); }, false);
        
        // Load initial window position, if it exists
        var initialWindowData = 
            JSON.parse(localStorage.getItem("windowData#" + windowId)) || 
            { x: 0, y: 0 };
        
        el.style.transform =
            "translate(" +
            initialWindowData.x + "px, " +
            initialWindowData.y + "px)";
        el.dataset.x = initialWindowData.x;
        el.dataset.y = initialWindowData.y;
    });
    
    // Set up credits
    var creditsBox = document.getElementById("credits-box");
    if (typeof HTMLDialogElement !== 'function') {
        // Polyfill dialog if not supported
        dialogPolyfill.registerDialog(creditsBox);
    }
    
    document.getElementById("controls__credits").addEventListener(
        "click",
        function() {
            creditsBox.showModal();
        }, false);
    creditsBox.addEventListener("dblclick", creditsBox.close, false);
    
    // Initial log output & cursor
    DisplayConsole.displayCursor();
    help();
    log("%c === Connected with unknown user 144.79.23.101. === ", "color: white; background-color: black;");
    processStage();
    
    // Hide .console-window while DevTools is open, show while DevTools is 
    // closed.
    var consoleWindow = document.getElementById("console-window");
    window.addEventListener("devtoolschange", function(event) {
        if (event.detail.open === true) {
            //consoleWindow.hidden = true;
        } else {
            consoleWindow.hidden = false;
        }
    }, false);
    
    // Wire up exec button for console-window
    document.getElementById("console-exec-form").addEventListener("submit", function(e) {
        var commandInput = document.getElementById("console-exec-form__command");
        
        try {
            eval(commandInput.value);
        } catch (e) {
            log(e);
        } finally {
            commandInput.value = "";
            e.preventDefault();
        }
    }, false);
    
    // Everything's ready! Hide .no-js, show .js
    Array.prototype.forEach.call(document.getElementsByClassName("no-js"), function(el) {
        el.style.display = "none";
    });
    Array.prototype.forEach.call(document.getElementsByClassName("js"), function(el) {
        el.style.display = "block";
    });
}());