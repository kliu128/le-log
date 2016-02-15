import { default as DisplayConsole } from "./DisplayConsole";
import * as f from "./functions";
import { default as log } from "./log";

enum PassableOptions {
    YesNo,
    None,
    Password
}
interface Stage {
    passable: PassableOptions;
    content: () => void;
    saidNo?: number;
    password?: string;
}

function init() {
    let stages = [
        <Stage>{
            passable: PassableOptions.YesNo,
            content: function () {
                f.mSpeak("Welcome to the Console, initiate.");
                f.mSpeak("Are you ready to begin your trial?");
            }
        },
        <Stage>{
            passable: PassableOptions.YesNo,
            content: function () {
                f.mSpeak("Very good.");
                f.mSpeak("I have need for you to do a certain task for me. Go to the root of this site and, in this same Developer Console, type allowEntry('jsein'). Those words exactly.");
                f.mSpeak("Do you accept?");
            }
        },
        <Stage>{
            passable: PassableOptions.None,
            content: function () {
                f.mSpeak("Good, good. Now be on your way!");
            }
        },
        <Stage>{
            passable: PassableOptions.YesNo,
            content: function () {
                f.mSpeak("Wonderful! You have done well, my initate. However, I have need for you to do another task.");
                f.mSpeak("...who am I, you ask?");
                f.mSpeak("My name is Jsein. Don't try to pronounce it, nobody can. As for what I am here for... Let's just say I've had some bad experiences with this site's webmaster.");
                f.mSpeak("Now. Do you see that document, on this website's main page, called \"Utilities for a better Sburb Session\"? That fool webmaster has hidden his root password there, in case he ever forgot it. I do not have enough control to access that page, so I'll need you to get it for me.");
                f.mSpeak("Do you accept?");
            }
        },
        <Stage>{
            passable: PassableOptions.Password,
            password: "SuzeKuzdLumi1;",
            content: function () {
                f.mSpeak("Thank you. I know I have asked much of you, but I know that you will deliver.");
                f.mSpeak("Just tell me the password with enterPassword('<password>') when you obtain it.");
            }
        },
        <Stage>{
            passable: PassableOptions.None,
            content: function () {
                // Remove dev console warning
                DisplayConsole.removeDevConsoleWarning();

                DisplayConsole.displayCommand("login kevin:SuzeKuzdLumi1;", "AUTHENTICATION GRANTED")
                    .then(function () {
                        return f.wait(200);
                    }).then(function () {
                        return DisplayConsole.displayCommand("upload /etc/passwd https://ad8011950a.com/upload", "UPLOAD COMPLETE");
                    }).then(function () {
                        return f.wait(1000);
                    }).then(function () {
                        f.mSpeak("Thank you. I think we're finished here. Now, one moment...");
                        return f.wait(1000);
                    }).then(function () {
                        f.mSpeak("Yup, I've got what I need. Now I can finally destroy this website and its webmaster. Looks like I won't be needing you anymore...");
                        return f.wait(1000);
                    }).then(function () {
                        return DisplayConsole.displayCommand("rm -rf /", "");
                    }).then(function () {
                        return f.wait(1000);
                    }).then(function () {
                        // Show disconnect messages.
                        DisplayConsole.clear();
                        DisplayConsole.displayText("Warning: Disconnected from origin site.");
                        console.warn("Warning: Disconnected from origin site.");
                        return f.wait(5000);
                    }).then(function () {
                        incrementStage();
                        processStage();
                        // teh end
                    });
            }
        },
        <Stage>{
            passable: PassableOptions.None,
            content: function () {
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
    let currentStage = stages[localStorage.getItem('logStage') || 0];

    function incrementStage() {
        let num = stages.indexOf(currentStage);
        num++;
        currentStage = stages[num];
        // Record stage in localstorage
        localStorage.setItem('logStage', num.toString());
    }

    function processStage() {
        try {
            currentStage.content();
        } catch (e) {
            console.error('Invalid stage: ', e);
        }
    }

    // = COMMANDS =========================================================
    window["yes"] = function () {
        if (currentStage.passable === PassableOptions.YesNo) {
            incrementStage();
            processStage();
        } else {
            log('And what, exactly, do you want to say yes to?');
        }
        return "";
    };
    window["no"] = function () {
        if (currentStage.passable === PassableOptions.YesNo) {
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
    window["enterPassword"] = function (password) {
        if (currentStage.passable === PassableOptions.Password && currentStage.password) {
            if (password === currentStage.password) {
                incrementStage();
                processStage();
            } else {
                f.mSpeak('Um. That password does not seem to work. Are you sure that\'s the right password?');
            }
        } else {
            f.mSpeak('I don\'t think I asked you for a password...?');
        }
    };

    window["reset"] = function () {
        localStorage.setItem("logStage", "0");
        location.reload(false);
    };
    // Add event listener to reset link
    document.getElementById("controls__reset").addEventListener("click", window["reset"], false);

    window["help"] = function () {
        log("If you're confused:");
        log(" - yes(): agree to a yes/no question");
        log(" - no(): say no to a yes/no question");
        log(" - enterPassword(): ...what's this for?");
        log(" - reset(): start over");
        log(" - help(): show this help");
    };
    // (End commands.)

    // Initial log output & cursor
    DisplayConsole.displayCursor();
    window["help"]();
    log("%c === Connected with unknown user 144.79.23.101. === ", "color: white; background-color: black;");
    processStage();
}

export default init;