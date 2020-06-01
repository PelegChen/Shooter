// Copyright (c) 2017-2019 Chen Peleg version 1.3 10/2019

// declaring globals
function setGlobal() {
    if (typeof G == "undefined") { G = {} }
    G.guntype = G.guntype || ''; // '' = regular gun, '2' = paint gun
    G.targetHeight = G.targetHeight || 20 //in precentage 20 regular, 30 - big
    G.basicSpeedOfTargets = G.basicSpeedOfTargets || 14 // 14 - regular, 20 - slower,
    G.onlyOneDirection = G.onlyOneDirection || false // if only one direction set to true
    G.Fontsiz1 = G.Fontsiz1 || 3.5
    G.Fontsiz2 = G.Fontsiz2 || 7;
    G.Fontsiz3 = G.Fontsiz3 || 4;
    G.Fontsiz4 = G.Fontsiz4 || '210%';
    G.Fontsiz5 = G.Fontsiz5 || '250%';
    G.Fontsiztimer = G.Fontsiztimer || 5;
    G.Fontsizstage = G.Fontsizstage || 4.6;
    G.FontsiznewImprov = G.FontsiznewImprov || 3
    G.devMode = G.devMode || false; // developer mode => esc = endlevel
    G.devMode = true;
    G.EstimatedtargetGroups = G.EstimatedtargetGroups || 0 // G.maxtargePerWord // later change it to 0 -
    G.finalLevel = G.finalLevel || 20 // the level with the finish notice;
    G.maxnumberOfSigns = G.maxnumberOfSigns || 12 // that the code searches

    /*----------------------------------------------------------*/

    G.word = []; // remember you dont need to randomize all of them, just the ones seen on screen as aposed to the card game
    G.loadImg = []; // arrary that stores the status of loaded images;
    G.targettimers = []; // array that contains target timers;
    G.gunrightLimit = 75 // sets the right limit for the gun in precentage (90)
    G.gunleftLimit = 40 // // sets the left limit for the gun in precentage(50)
    G.gunbottomLimit = -30 // (-60)
    G.guntopLimit = 0 // this must be 0 so the gun wont be hidden

    G.maxtargePerWord = 2;
    G.numberOfloads = 0; // number of images loaded;
    G.Wasloaded = "Loaded" // const that says img was loaded
    G.WasNotloadedYet = "Wasn't loaded yet" // const that says img was not loaded yet
    G.loadingError = "Load Error" //  const that says img  had an error wile loaded
    G.TargetIdMutiplayer = 1000 // the word number multiplayer to handle the different targets
    G.LoaderColor = "#800000"
    G.justFired = false;
    G.numOffoundSigns = G.maxnumberOfSigns // later change it to 0 -


    G.pointsPerTarget = 1;
    G.PenaltyPerTarget = 1;
    G.isGunloading = [];
    G.isGunloading[1] = false;
    G.isGunloading[2] = false;
    G.ispause = false;
    G.isSoundOn = true;
    G.IsclearBoard = false;
    G.gameType = {};
    G.isPlaying = false;
    G.gameType.countdown = false;
    G.gameType.static = false;
    G.gameType.hitWords = false
    G.isGun2 = true;
    G.isOneHandLoading = false;
    G.lastFiredGun = 1;
    G.rememberCurtainX = [];
    G.upgrade = G.upgrade || {};
    G.upgrade.timesFailed = 0;
    G.upgrade.bulletsUpgrade = [];
    G.upgrade.loadUpgrade = [];
    G.upgrade.hitUpgrade = [];
    G.upgrade.twoGunsUpgrade = [];
    G.upgrade.tokens = 0; // you can have one upgradepre token
    G.upgrade.HitstreakFor2guns = 3;
    G.upgrade.pointsAugmentation = 1.5;
    G.upgrade.maxBullets = 5; // 5 start // +2 first // +2 second // + 1 2guns
    G.upgrade.playerPoints = 0;
    G.upgrade.playerRank = 1;
    G.upgrade.playerLevel = 1;
    G.upgrade.nameOfplayer = G.clickFullNameOfUser || '';

    G.ShowWoodsign = true;
    G.lastLightsign = '';
    G.lastBulletStatus = G.playerBullets;

    G.targetsHit = 0;
    G.targetsNeedHit = 10;
    G.pointsPerTaugmentor = 20; //20
    G.playerBullets = G.upgrade.maxBullets;
    G.gunloadingTime = 4000;
    G.gunloadingChange = 0.65;
    G.XpExponential = 1.75;
    G.XpFirstRank = 20;
    G.EN = G.isLanguageEnglish || false;
    G.TXT = {};

}
general_functions: {

    document.onkeydown = function(evt) {
        if (!G.devMode || !G.isPlaying) { return };
        G.upgrade.cheat = true;
        evt = evt || window.event;
        if ("key" in evt) {
            switch (evt.key) {
                case '1':
                    newLevel(true);
                    G.upgrade.cheat = true;
                    break;
                case '2':
                    newLevel(true, true);
                    G.upgrade.cheat = true;
                    break;
                case '3':
                    G.upgrade.playerPoints += (G.upgrade.pointsAugmentation * 10);
                    updatehud();
                    G.upgrade.cheat = true;;
                    break;
            }
        }
    };

    function Elm(idname, type0) {
        let testIt = Id(idname);
        if (Is(testIt)) return testIt;
        type0 = type0 || 'div'
        let newElem = document.createElement(type0);
        newElem.id = idname;
        return newElem

    }

    function mOverEffect(obj, size = 1.5, speed = 20) {
        obj.addEventListener('mouseover', () => expand(obj, size, speed))
        obj.addEventListener('mouseout', () => shrink(obj, 1, speed))

    }

    function expand(obj, finS = 1.5, speed = 20) {
        function getscale(obj) {
            let scala = obj.style.transform;
            let res = Number(scala.replace(/[^0-9.]/g, ''));
            return res;
        }

        let finsize = 1.5
        let t = getscale(obj) || 1;
        let p = 0.1


        function adder(obj) {
            if (obj.className == 'downScaling') { setTimeout(() => adder(obj), 300); return }
            obj.className = 'upScaling';

            obj.style.transform = 'scale(' + t + ')';
            t += p;
            if (t <= finsize) { setTimeout(() => adder(obj), 20) } else {
                obj.className = 'noScale'
            }
        }
        adder(obj)

    }

    function shrink(obj, finS = 1, speed = 20) {
        function getscale(obj) {
            let scala = obj.style.transform;
            let res = Number(scala.replace(/[^0-9.]/g, ''));
            return res
        }
        let finsize = finS
        let t = getscale(obj);
        let p = 0.1

        function diminisher(obj) {
            if (obj.className == 'upScaling') { return }
            obj.className = 'downScaling';
            obj.style.transform = 'scale(' + t + ')'
            t -= p;
            if (t >= finsize) { setTimeout(() => diminisher(obj), speed) } else {
                obj.className = 'noScaling'
            }
        }
        diminisher(obj);

    }

    function Is(obj) {

        try {
            let rt = obj instanceof HTMLElement;

            return rt

        } catch (e) {
            let = rt2(typeof obj === "object") &&
                (obj.nodeType === 1) && (typeof obj.style === "object") &&
                (typeof obj.ownerDocument === "object");

            return rt2;
        }
    }

    function iStyle(type) {
        let obj = {};
        let textDir = 'rtl';
        let alignTxt = 'right';
        if (G.EN) {
            textDir = 'ltr';
            alignTxt = 'left'
        }
        switch (type) {
            case 'text':

                obj = {
                    'fontSize': G.Fontsiz1 + 'vmax',
                    'fontSize': G.Fontsiz1 + 'vmin',
                    'fontFamily': 'noot',
                    'textAlign': alignTxt,
                    'direction': textDir,
                    'color': 'white',
                    'fontWeight': 'bolder',
                    'textShadow': '0.1vw 0.5vh 1px black,-1px -1px 1px black,-1px 1px 1px black, 1px -1px 1px black, 9px 8px 0px rgba(0,0,0,0.15)',
                }
                break;
            case 1:
                obj = {
                    "backgroundSize": "100%",
                    "backgroundRepeat": "no-repeat",
                    'overflow': 'hidden',
                    'opacity': '1',
                }
                break;

        }
        return obj
    }

    function test(var1, var2) {
        G.devMode = true;
        return 'develope mode is On'
    }

    function Id(TheID) {
        return document.getElementById(TheID);
    };

    function tShadow(borderline = 1, bordercolor = "black") {
        let txt = '';
        borderline = 6 // erase
        const shadowsize = 3;
        const units = "px" + " ";

        function borderLoop(line, offset) {
            let txt1 = '';
            for (let i = 1; i <= 4; i++) {
                let s1 = 3 % i ? '-' : ''
                let s2 = i < 3 ? '' : '-'
                txt1 += s1 + (line - offset) + units + s2 + line + units;
                txt1 += "0 " + bordercolor + ",";
            }
            return txt1;
        }

        txt = borderLoop(borderline, 0)
        txt += borderLoop(borderline + 3, 5)
        txt += (borderline * shadowsize) + units + (borderline * shadowsize) + units + "3px " + "rgba(0,0,0,0.3)";

        return txt
    }

    function stl(p_elem, p_styles, p_styles2 = {}) {
        let x;
        for (x in p_styles) {
            p_elem.style[x] = p_styles[x];
        }
        for (x in p_styles2) {
            p_elem.style[x] = p_styles2[x];
        }


        p_elem.draggable = false;
        p_elem.onselectstart = function() { return false };
    }

    function StylelFader(element, ms = 50, fadeIn = false) {
        var op = 1; // initial opacity
        let finOp = 0.001
        if (!fadeIn) {
            var timerOut = setInterval(function() {
                let real = Is(element);
                if ((op <= finOp) || (!real)) { clearInterval(timerOut); return }
                if (element.style.opacity) {} else return;
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";

                op -= 0.1;

            }, ms);


        } else {
            op = 0.1
            var timerIn = setInterval(function() {
                let real = Is(element);

                if (op >= 1 || (!real)) {
                    clearInterval(timerIn);
                }
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op += 0.05;
            }, ms);

        }
    }

    function Pre2Num(precent) {
        return Number(precent.replace("%", ''))
    }

    function getRandomInt(max) {
        return (Math.floor(Math.random() * Math.floor(max))) + 1
    }

    function XptoRank(stage = (G.upgrade.playerRank - 1)) {
        let pointsTonextStage = Math.round((Math.pow(G.XpExponential, stage)) * G.XpFirstRank)
        if (pointsTonextStage < G.XpFirstRank) { return 0 }
        return pointsTonextStage
    }

    function deleteChildren(elem) {
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    }

    function sinusOne(num) { // gets sinus function results from 0 to 1
        let r = Math.round(Math.sin(num / 10) * 100 + 100) / 200
        return r;
    }

    function areTargetsOnBoard() {
        let tc = Id('targetscontainer');
        let child = tc.childNodes
        if (child[0]) {} else { return false }
        for (i in child) {

            let isTarget = child[i].id.search('target')
            if (isTarget !== -1) { return true }
        }
        return false
    }

    function storeInLocal(command) {
        var createEvent = (actionType, key, value) => {
            let ev = new Event('storage');
            ev.key = key;
            ev.value = value
            ev.actionType = actionType;
            return window.dispatchEvent(ev)
        }


        switch (command) {
            case 'save':
                localStorage.setItem(G.saveInLocalStorageKey, JSON.stringify(G.upgrade));
                createEvent('save', G.saveInLocalStorageKey, JSON.stringify(G.upgrade));
                break;
            case 'check':
                if (G.upgrade.nameOfplayer) { return true } else { return false }

                break;

            case 'load':
                var retrievedObject = localStorage.getItem(G.saveInLocalStorageKey);
                console.log(retrievedObject)
                if (retrievedObject) { G.upgrade = JSON.parse(retrievedObject); }

                break;

            case 'reset':
                if (G.isTheGameConnectedToClick) { alert(G.TXT.cantResteGameDoWithClicl); break }
                localStorage.removeItem(G.saveInLocalStorageKey);

                break;
        }
    }

}

function setTXT() {
    if (G.EN) {
        G.TXT = {

            ableTosave: " You can save your progress on this computer, ",
            yourProgWasSaved: " Your progress is now saved ",
            onWebSite: " on website ",
            ifYouAreNot: " If you are not ",
            pressBeginNewGame: " You can press  ‘ begin new game'  ",
            connectedThroughSite: " Connected through the site ",
            save: " Save ",
            beginNewGame: " Begin a new game ",
            youFinishedLevel: " You've finish level ",
            timeIsUp: " Time is up ",
            IAmNot: " I am not ",
            tryToShootTargetsByWords: " Shoot the targets according to the sign  ",
            quickDraw: " Quick draw! ",
            youMustHitAt: " Hit ",
            targetsBeforeTimeUp: " targets before the time is up ",
            youMustHitInCorrectOrder: " Hit all targets in the correct order ",
            youMustHit: " Hit ",
            correctHitsInArow: " correct hits in a streak ",
            cantResteGameDoWithClicl: " Can't reset, please reset through the site interface ",
            rank: " Rank ",
            youGainedRank: " You've gained a new rank! New upgrqdes available ",
            youGainedRankAndYouHave: " You've gained a rank and have ",
            existigngUpgradesAreIncolor: " Your current upgrades are in full color: ",
            upgradesAvalable: " upgrades available ",
            targetBank: " Target bank ",
            upgrades: " Upgrades ",
            theGoalOfTheGameIs: " Your goal is to finish all the levels by shooting at the right objects. Some of the levels have a time limit. After gaining points, you can advance in rank and win upgrade options. ",
            savingToThisPC: " Save to this PC ",
            youFinishedTheGame: "   🏆🏆 You've finished the game! 🏆🏆  ",
            youCanStartAnewGame: " You can start a new game by: save to this pc -> start a new game. ",
            youCanContinueButItsHard: " You can also continue playing but the levels would be harder ",
            connectedThroughSiteYouMustLogout: " Connected through the site. Please reset using the site interface. ",
            nameMustHave2chars: " Name has to  ",
            fromNowtourProgWillBeSaved: " From now on, your game progress would be saved. ",
            saveWasNotFoundRefreshThewindow: " No saved game was found. You can start a new game by refreshing the tab. ",
            doYouWantToDeleteAndStartNew: " Are you sure you want to delete all progress and start a new game? ",
            theseAre: " These are ",
            instructions0: " Instruction: ",
            beginLevel: " Begin level  ",





        }
        return
    }
    G.TXT = {
        /////
        ableTosave: "ניתן לשמור את ההתקדמות על המחשב הזה",
        yourProgWasSaved: ' ההתקדמות שלך במשחק נשמרת',
        onWebSite: ' באתר ',
        ifYouAreNot: 'אם את/ה לא ',
        pressBeginNewGame: 'ניתן ללחוץ על התחלת משחק חדש',
        connectedThroughSite: ' מחובר דרך האתר. יש להתנתק מהאתר ולהתחיל משחק חדש. ',
        save: "שמירה",
        beginNewGame: "התחלת משחק חדש",
        youFinishedLevel: 'סיימת את שלב',
        timeIsUp: 'נגמר הזמן',
        IAmNot: 'אני לא   ',
        tryToShootTargetsByWords: 'נסו לירות על המטרות לפי המילה שמופיעה בשלט למעלה',
        quickDraw: 'שליפה מהירה!',
        youMustHitAt: ' עליכם לפגוע ב ',
        targetsBeforeTimeUp: 'מטרות לפני שנגמר הזמן ',
        youMustHitInCorrectOrder: ' עליכם לפגוע בכל המטרות בסדר הנכון ',
        youMustHit: 'עליכם לפגוע ',
        correctHitsInArow: ' פגיעות נכונות ברצף ',

        cantResteGameDoWithClicl: 'לא ניתן לאפס משחק, נא לאפס דרך ממשק קליק',
        rank: "דרגה ",
        youGainedRank: "עלית בדרגה ! שיפורים חדשים זמינים",
        youGainedRankAndYouHave: 'עלית בדרגה ויש לך',
        existigngUpgradesAreIncolor: "השיפורים הקיימים מופיעים בצבע:",
        upgradesAvalable: 'שיפורים זמינים.',
        targetBank: "בנק מטרות",
        upgrades: "שיפורים",
        theGoalOfTheGameIs: "המטרה במשחק לעבור את השלבים, על ידי ירי על התמונות הנכונות. חלק מהשלבים מוגבלים בזמן. אחרי צבירת נקודות, אפשר להרוויח דרגות, ולזכות בשיפורים.",
        savingToThisPC: "שמירה למחשב זה",
        youFinishedTheGame: "  🏆🏆 סיימת את המשחק ! 🏆🏆 ",
        youCanStartAnewGame: "ניתן להתחיל משחק חדש על ידי : שמירה למחשב זה -> התחלת משחק חדש.",
        youCanContinueButItsHard: "אפשר גם להמשיך לשחק אך השלבים יהיו קשים יותר !",
        connectedThroughSiteYouMustLogout: 'מחובר דרך האתר.  יש להתנתק דרך האתר או לאפס את המשחק דרך הממשק.',
        nameMustHave2chars: 'שם צריך להכיל לפחות 2 אותיות',
        fromNowtourProgWillBeSaved: ", מעכשיו ההתקדמות שלך במשחק תישמר",
        saveWasNotFoundRefreshThewindow: 'לא נמצא מידע שמור. ניתן להתחיל משחק חדש על ידי רענון החלון.',
        doYouWantToDeleteAndStartNew: 'האם אתם מעוניינים למחוק את כל ההתקדמות ולהתחיל משחק חדש ?',
        theseAre: "אלו ה",
        instructions0: "הוראות:",
        beginLevel: "התחל שלב",
        cantResteGameDoWithClicl: "מחובר דרך האתר. יש לאפס משחק דרך ממשק האתר."










    }



}

function buildMedia() {
    function gunMove(event) {
        if (!G.isPlaying) { return };
        if (G.justFired === true && !G.isGun2) { return };

        function moving(gunNumber) {
            const windowWide = window.innerWidth;
            const windowHigh = window.innerHeight;
            const precentlimit = 4; // the precent of deifference when the gun "jumps"
            let gunXgap = G.gunrightLimit - G.gunleftLimit;
            let gunYgap = G.guntopLimit - G.gunbottomLimit;
            let x = event.clientX;
            let y = event.clientY;
            let elem = Id("gun");

            function blanceGunJump(StyElem, shouldBe) {
                let fixingx = 0; // fixing the gun jump gap;
                let current = Pre2Num(StyElem);
                if (Math.abs(shouldBe - current) > precentlimit) {
                    fixingx = (shouldBe - current) / (precentlimit * 2);
                    return (current + fixingx) + "%";
                } else { return shouldBe + "%" };
            }
            if (gunNumber == 2) { elem = Id("gun2"); }
            let xRelativeLocation = x / windowWide;
            let yRelativeLocation = y / windowHigh;
            let shoulBeleft = (G.gunleftLimit + (gunXgap * xRelativeLocation));
            let shoulBebottom = (G.guntopLimit - (gunYgap * yRelativeLocation));
            let currentLeft = Pre2Num(elem.style.left);
            let currentbottom = Pre2Num(elem.style.bottom)
            const leftalign = -110 // onlyfor gun 2
            elem.style.left = blanceGunJump(elem.style.left, shoulBeleft);
            if (gunNumber == 2) { elem.style.left = (shoulBeleft + leftalign) + "%" }
            elem.style.bottom = blanceGunJump(elem.style.bottom, shoulBebottom);
        }
        if (!G.isGunloading[1]) { moving(1) };
        if (G.isGun2 && !G.isGunloading[2]) { moving(2) }

    }

    function toggleSound() {
        let volumeButton = Id('volumeButton')
        if (G.isSoundOn == true) {
            G.isSoundOn = false;
            volumeButton.src = "data/volumeoff.png"
        } else if (G.isSoundOn == false) {
            G.isSoundOn = true;
            volumeButton.src = "data/volumeon.png";
        }

    }

    function bulildwords() {
        function SetLoadValue(TheEvent, valueOFload) {
            let TheId = TheEvent.path["0"].id;
            if (TheId.indexOf("sign") >= 0) {
                TheId = TheId.replace(/\D/g, '');
                TheId = Number(TheId);
                G.loadImg[TheId].sign = valueOFload;
            } else if (TheId.indexOf("target") >= 0) {
                TheId = TheId.replace(/\D/g, '');
                TheId = Number(TheId);
                let targetGrpup = Math.round(TheId / G.TargetIdMutiplayer)
                let numberOftarget = TheId - (targetGrpup * G.TargetIdMutiplayer);
                G.loadImg[targetGrpup].target[numberOftarget] = valueOFload;
            }
        }
        for (var x = 1; x <= G.maxnumberOfSigns; x++) {
            G.word[x] = {};
            G.loadImg[x] = {}; // object that says if img was loaded
            G.word[x].sign = new Image();
            G.word[x].sign.id = "sign" + x;
            let signUrl = "signs/sign (" + x + ").png";
            G.word[x].sign.classList.add("contentsign");
            G.loadImg[x].sign = G.WasNotloadedYet;
            G.word[x].sign.onload = function(event) {
                SetLoadValue(event, G.Wasloaded);
            };
            G.word[x].sign.onerror = function(event) {
                SetLoadValue(event, G.loadingError)
            };
            G.word[x].sign.src = signUrl;
            G.word[x].target = [];
            G.loadImg[x].target = [];
            for (var i = 1; i <= G.maxtargePerWord; i++) {
                var targetUrl = "targets" + i + "/target (" + x + ").png";
                G.word[x].target[i] = new Image()
                let numberfortheId = (x * G.TargetIdMutiplayer) + i;
                G.word[x].target[i].id = "target" + numberfortheId;
                G.word[x].target[i].src = targetUrl;
                G.word[x].target[i].className = "offBoard";
                G.word[x].target[i].addEventListener("mousedown", shootSomeTarget, false);


                G.loadImg[x].target[i] = G.WasNotloadedYet;
                G.word[x].target[i].onload = function(event) {
                    SetLoadValue(event, G.Wasloaded)
                }
                G.word[x].target[i].onerror = function(event) {
                    SetLoadValue(event, G.loadingError)
                }
            }
        }
    }

    function buildsounds() {
        G.sound = {}
        G.sound.gunshot = new Audio('data/shotSound' + G.guntype + '.mp3');
        playSound(G.sound.gunshot, true);
        G.sound.singlebullet = new Audio('data/singlebullet.mp3');
        playSound(G.sound.singlebullet, true);
        G.sound.finished = new Audio('data/finished.mp3');
        playSound(G.sound.finished, true);
        G.sound.twoguns = new Audio('data/twoguns.mp3');
        playSound(G.sound.twoguns, true);
        G.sound.timeup = new Audio('data/timeup.mp3');
        playSound(G.sound.timeup, true);
        G.sound.beep = new Audio('data/beep.mp3');
        playSound(G.sound.beep, true);
        G.sound.hitsound = new Audio('data/hitsound.mp3');
        playSound(G.sound.hitsound, true);
        G.sound.buzzer = new Audio('data/buzzer.mp3');
        playSound(G.sound.buzzer, true);
        G.sound.gunload = new Audio('data/gunload.mp3');
        playSound(G.sound.gunload, true);
        G.sound.upgrade = new Audio('data/upgrade.mp3');
        playSound(G.sound.upgrade, true);
        G.sound.endLevel = new Audio('data/endLevel.mp3');
        playSound(G.sound.endLevel, true);
        G.sound.voice = [];
        for (i = 1; i <= G.maxnumberOfSigns; i++) {
            let vUrl = 'voice/Voice (' + i + ').mp3'
            G.sound.voice[i] = new Audio(vUrl);

        }
    }

    function buildGun(Isgun2 = false) {

        var guncontainer = document.createElement("div");
        let theId = "";
        let guncontainer_left = "30%";
        let guncontainer_right = "40%";
        let direction = 1;
        let gunposition = G.gunrightLimit;
        if (Isgun2) {
            theId = "2";
            guncontainer_sideposition = "20%";
            direction = -1;
            guncontainer_left = "-10%";
            guncontainer_right = "70%";
            gunposition = 100 - G.gunrightLimi;
        }
        guncontainer.id = "guncontainer" + theId;

        stl(guncontainer, {
            'position': 'absolute',
            'bottom': "-5%",
            'right': guncontainer_right,
            "left": guncontainer_left,
            'height': "30%",
            'width': "80%",
            "zIndex": "14",
            'overflow': 'visible',
            'cursor': "url('data/crosshair.png'), auto"
        })
        var pagecontainer = Id("pagecontainer")
        pagecontainer.appendChild(guncontainer)
        var gun = document.createElement("div");
        gun.id = "gun" + theId;
        stl(gun, {
            'position': 'absolute',
            'bottom': "-100.01%", // 00
            'left': ((gunposition - 30) + '%'),
            'height': "100%",
            'width': "100%",
            'background': "url('data/gun" + G.guntype + ".png')",
            "backgroundSize": "30%",
            "zIndex": "14",
            'overflow': 'visible',
            "backgroundRepeat": "no-repeat",
            'transform': 'scaleX(' + direction + ')',

        })

        guncontainer.appendChild(gun);
        guncontainer.addEventListener("mousemove", gunMove);
    }

    function buildHud() {
        G.ranksArry = ['', 'מתחיל', 'חובבן', 'טוראי', 'שולף', 'מקצוען', 'אקדוחן', 'קלע', 'שריף', 'צלף', 'אלוף', 'גנרל']
        if (G.EN) {
            G.ranksArry = ['Beginer', 'Amateur', 'Private', 'Slinger', 'Professional', 'Gunner', 'Marksman', 'Sheriff', 'Sharpshooter', 'Sniper', 'Champion']
        }
        G.Numbersfont = "noot" //noot
        let hud = document.createElement("div");
        let pointsSrc = "data/points.png";
        let stageSrc = "data/stage.png";
        if (G.EN) {
            pointsSrc = "data/pointsEN.png";
            stageSrc = "data/stageEN.png";
        }
        let stagePhoto = document.createElement("img");
        stagePhoto.src = stageSrc;
        stagePhoto.id = 'stagePhoto';

        let pointPhoto = document.createElement("img");
        pointPhoto.src = pointsSrc;
        pointPhoto.id = 'pointPhoto';
        let bullets = document.createElement("div");
        bullets.id = 'bullets';
        let points = document.createElement('div');
        points.id = "points";
        let stage = document.createElement('div');
        stage.id = "stage";

        let rank = document.createElement('div');
        stage.classList.add("console-text")
        rank.classList.add("console-text")
        rank.id = "rank";
        let textDir = 'rtl';
        let alignTxt = 'right';
        if (G.EN) {
            textDir = 'ltr';
            alignTxt = 'left'
        }
        // stl(rank, {
        //     'position': 'fixed',
        //     'textAlign': alignTxt,
        //     'verticalAlign': 'baseline',
        //     'top': '15.5%',
        //     'right': '67.7%',
        //     'height': '4%',
        //     'width': '20%',
        //     "zIndex": '6',
        //     'fontFamily': 'noot',
        //     'color': 'white',
        //     'fontWeight': 'bolder',
        //     'position': 'fixed',
        //     'width': '20%',
        //     'height': '10%',
        //     'fontSize': G.Fontsiz3 + 'vmax',
        //     'fontSize': G.Fontsiz3 + 'vmin',
        //     'textShadow': '0.5vw 0.5vh 1px black,-1px -1px 1px black,-1px 1px 1px black, 1px -1px 1px black, 9px 8px 0px rgba(0,0,0,0.15)'

        // })
        stl(stagePhoto, {
            'position': 'fixed',
            'top': '9%',
            'left': '28%',
            'height': '5%',
            'width': '5%',
            "zIndex": '5'
        });
        stl(pointPhoto, {
            'position': 'fixed',
            'top': '2%',
            'left': '27%',
            'height': '5%',
            'width': '6%',
            "zIndex": '10'
        });
        stl(hud, {
            'position': 'relative',
            'top': '5%',
            'left': '3%',
            'height': '80%',
            'width': '30%',
            'scr': '',
            "zIndex": '4'
        });
        stl(points, {
            'position': 'fixed',
            'fontSize': G.Fontsiz4,
            'fontWeight': 'bold',
            'fontFamily': 'noot',
            'verticalAlign': 'baseline',
            'top': '1.6%',
            'left': '11%',
            'height': '5%',
            'width': '22%',
            //'backgroundColor':'red',
            'boxShadow': '0.2vmax 0.3vmax 1px 1px rgba(63,107,169, 0.3)',
            "background": "linear-gradient(90deg, red 0%, transparent , transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
            "border": "0.5vh solid black",
            "borderColor": 'black',
            "border-radius": "15vh",
            //"background-clip": "content-box",
            "padding": "0.0%",
            "backgroundSize": "100%",
            "zIndex": '9'
        })

        // stl(stage, {
        //     'position': 'fixed',
        //     'fontSize': G.Fontsizstage,
        //     'fontWeight': 'bold',
        //     'fontFamily': 'noot',
        //     'textAlign': 'left',
        //     'verticalAlign': 'baseline',
        //     'top': '9%',
        //     'left': '25.5%',
        //     'height': '6%',
        //     'width': '6%',
        //     "zIndex": '6',
        // })
        stl(bullets, {
            'position': 'fixed',
            'fontSize': '210%',
            'fontWeight': 'bold',
            'fontFamily': 'noot',
            'textAlign': 'left',
            'verticalAlign': 'baseline',
            'top': '9%',
            'left': '11%',
            'height': '10%', // 5  12
            'width': '12%',
            "zIndex": '2',
            'padding': '0%',
            'overflow': 'hidden'

        })
        Id("plaque").appendChild(hud);
        hud.id = "hud";
        pointstxt = document.createElement("text");
        pointstxt.id = "pointstxt";
        pointstxt.innerHTML = G.upgrade.playerPoints;

        let ranktxt = G.TXT.rank + G.upgrade.playerRank + " ";
        let rankName = G.ranksArry[G.upgrade.playerRank] || G.ranksArry[G.ranksArry.length - 1]
        ranktxt += rankName
        rank.innerHTML = ranktxt;

        stl(pointstxt, {
            'position': 'fixed',
            'fontFamily': 'noot',
            'left': '14%',
            'color': 'white',
            'fontWeight': 'bolder',
            'position': 'fixed',
            'width': '20%',
            'height': '20%',
            'fontSize': G.Fontsiz1 + 'vmax',
            'fontSize': G.Fontsiz1 + 'vmin',
            'textShadow': '0.5vw 0.5vh 1px black,-1px -1px 1px black,-1px 1px 1px black, 1px -1px 1px black, 9px 8px 0px rgba(0,0,0,0.15)'

        })
        points.appendChild(pointstxt);

        //points G.upgrade.playerPoints
        stagetxt = document.createElement("text");
        stagetxt.id = "stagetxt";
        stagetxt.classList.add("console-text")
        stagetxt.innerHTML = G.upgrade.playerLevel;
        // stl(stagetxt, {
        //     'fontFamily': 'noot',
        //     'color': 'white',
        //     'fontWeight': 'bolder',
        //     'position': 'fixed',
        //     'width': '20%',
        //     'height': '20%',
        //     'fontSize': G.Fontsizstage + 'vmax',
        //     'fontSize': G.Fontsizstage + 'vmin',
        //     'textShadow': '0.5vw 0.5vh 1px black,-1px -1px 1px black,-1px 1px 1px black, 1px -1px 1px black, 9px 8px 0px rgba(0,0,0,0.15)'

        // })
        stage.appendChild(stagetxt);

        G.bulletDistance = 9;
        for (let i = 1; i <= G.playerBullets; i++) {

            let Onebullet = document.createElement("img");
            Onebullet.src = "data/bullet.png";
            stl(Onebullet, {
                'position': 'absolute',
                'top': '0%',
                'left': (i * G.bulletDistance) + '%',
                'height': '50%',
                'padding': '0%',
                'width': '10%'
            })

            bullets.appendChild(Onebullet)

        }

        hud.appendChild(points)
        hud.appendChild(stage)
        hud.appendChild(bullets)
        hud.appendChild(stagePhoto)
        hud.appendChild(pointPhoto);
        hud.appendChild(rank)
        updatehud();

    }
    let gallery_sideposition = "10%"
    let top_curtain = "13%";
    document.body.style.overflow = 'hidden';
    document.getElementById('pageBody').addEventListener('dragstart', function() { return false; }, false);
    var drone = Id("ErrorCheck");
    drone.innerHTML = "";
    var pagebackground = Id("pageBody");

    var pagecontainer = document.createElement("div");
    pagecontainer.id = "pagecontainer";

    document.body.appendChild(pagecontainer);
    var galleryContainer = document.createElement("div");
    galleryContainer.id = "galleryContainer";
    stl(pagecontainer, {
        'position': 'absolute',
        'height': '100%',
        'width': '99%',
        'overflow': 'hidden',

    });
    // stl(galleryContainer, {
    //     'position': 'fixed',
    //     'display': 'inline-block',
    //     'right': gallery_sideposition,
    //     "left": gallery_sideposition,
    //     'height': "100%",
    //     'width': "80%",
    //     'overflow': 'hidden',
    //     "zIndex": "1"
    // });
    stl(galleryContainer, {
        'cursor': "url('data/crosshair.png'), auto"

    });
    let leftpole = document.createElement("div");
    leftpole.id = "leftpole"
    let rightpole = document.createElement("div");
    rightpole.id = "rightpole"
    let leftcurtain = document.createElement("div");
    leftcurtain.id = "leftcurtain"
    let rightcurtain = document.createElement("div");
    rightcurtain.id = "rightcurtain"
    let plaque = document.createElement("div");
    plaque.id = "plaque"
    let bottomgallery = document.createElement("div");
    bottomgallery.id = "bottomgallery"
    let lightsign = document.createElement("div");
    lightsign.id = "lightsign"
    let botoom_of_sign = document.createElement("div");
    botoom_of_sign.id = "botoom_of_sign";

    // stl(leftcurtain, {
    //     'position': 'absolute',
    //     "top": "17%",
    //     "left": "-15%", // -15 // -60
    //     'height': "80%",
    //     'width': "70%",
    //     'background': "url('data/curtain.png')",
    //     "backgroundSize": "100%",
    //     'overflow': 'hidden',
    //     "zIndex": "10",
    //     "backgroundRepeat": "no-repeat",
    // });

    // stl(rightcurtain, {
    //     'position': 'absolute',
    //     "top": "17%",
    //     "left": "30%", // 30 // 90
    //     'height': "80%",
    //     'width': "70%",
    //     'background': "url('data/curtain.png')",
    //     "backgroundSize": "100%",
    //     'overflow': 'hidden',
    //     "zIndex": "10",
    //     "backgroundRepeat": "no-repeat",
    //     'transform': 'scaleX(-1)',

    // });
    // stl(leftpole, {
    //     'position': 'fixed',
    //     "top": top_curtain,
    //     "left": gallery_sideposition,
    //     'height': "100%",
    //     'width': "10%",
    //     'background': "url('data/side_pole.png')",
    //     "backgroundSize": "90%",
    //     "zIndex": "10",
    //     "backgroundRepeat": "no-repeat",
    // });
    // stl(rightpole, {
    //     'position': 'fixed',
    //     "top": top_curtain,
    //     "right": gallery_sideposition,
    //     'height': "100%",
    //     'width': "10%",
    //     'background': "url('data/side_pole.png')",
    //     "backgroundSize": "90%",
    //     "zIndex": "10",
    //     'transform': 'scaleX(-1)',
    //     "backgroundRepeat": "no-repeat",
    // });
    // stl(plaque, {
    //     'position': 'fixed',
    //     "bottom": "72%",
    //     "left": (Pre2Num(gallery_sideposition) - 2) + "%",
    //     'height': "23vw", //50%
    //     'width': (104 - (Pre2Num(gallery_sideposition) * 2)) + "%",
    //     'background': "url('data/plaque.png')",
    //     "backgroundSize": "100%",
    //     "zIndex": "11",
    //     "backgroundRepeat": "no-repeat",
    // });
    // stl(lightsign, {
    //     'position': 'fixed',
    //     "bottom": "72%",
    //     "left": 35 + "%",
    //     'height': "15vw", //31%
    //     'width': 30 + "%",
    //     'background': "url('data/light_sign.png')",
    //     "backgroundSize": "100%",
    //     "zIndex": "12",
    //     "backgroundRepeat": "no-repeat",
    // });
    // stl(bottomgallery, {
    //     'position': 'fixed',
    //     "bottom": "0%",
    //     "left": gallery_sideposition,
    //     'height': "30%",
    //     'width': (100 - (Pre2Num(gallery_sideposition) * 2)) + "%",
    //     'background': "url('data/bottomgallery.png')",
    //     "backgroundSize": "100%",
    //     "zIndex": "3",
    //     "backgroundRepeat": "no-repeat",
    // });
    stl(botoom_of_sign, {
        'position': 'fixed',
        "bottom": "72%",
        "left": 35 + "%",
        'height': "4vw", //31%
        'width': 30 + "%",
        //'backgroundColor': "blue",
        "backgroundSize": "100%",
        "zIndex": "25",
        "backgroundRepeat": "no-repeat",
    });
    galleryContainer.appendChild(bottomgallery);
    galleryContainer.appendChild(leftcurtain);
    galleryContainer.appendChild(rightcurtain);
    galleryContainer.appendChild(leftpole);
    galleryContainer.appendChild(rightpole);

    galleryContainer.appendChild(plaque);
    plaque.appendChild(lightsign);
    galleryContainer.appendChild(botoom_of_sign);
    pagecontainer.appendChild(galleryContainer);
    var wood = document.createElement("div");
    wood.id = "wood"
    var targetscontainer = document.createElement("div");
    targetscontainer.id = "targetscontainer"
    var wood_sideposition = "12%"
    var wood_topposition = "16%"
        // stl(wood, {
        //     'position': 'fixed',
        //     "top": wood_topposition,
        //     'right': wood_sideposition,
        //     "left": wood_sideposition,
        //     'height': "60%", //60%
        //     'width': "74%",
        //     'background': "url('data/wood.jpg')",
        //     "backgroundSize": "100%",
        //     "backgroundRepeat": "no-repeat",
        //     'overflow': 'hidden',
        //     'filter': "blur(1px)",
        //     "zIndex": "3"
        // })
    stl(targetscontainer, {
        'position': 'fixed',
        "top": wood_topposition,
        'right': wood_sideposition,
        "left": wood_sideposition,
        'height': "63%",
        'width': "74%",
        "backgroundSize": "100%",
        "backgroundRepeat": "no-repeat",
        'overflow': 'hidden',
        "zIndex": "5"
    })
    galleryContainer.appendChild(wood);
    galleryContainer.appendChild(targetscontainer);
    galleryContainer.addEventListener("mousemove", gunMove);
    galleryContainer.addEventListener("mousedown", gunFiring, false)

    let buttonsUI = document.createElement('div');
    buttonsUI.id = 'buttonsUI';
    // stl(buttonsUI, {
    //     'position': 'absolute',
    //     'top': '8%',
    //     'right': '3%',
    //     'height': '80%',
    //     'width': '30%',
    //     'scr': '',
    //     "zIndex": '4'
    // });;
    Id("plaque").appendChild(buttonsUI);
    let volumeButton = document.createElement('img');
    volumeButton.src = "data/volumeon.png";
    volumeButton.id = "volumeButton";
    // stl(volumeButton, {
    //     'position': 'absolute',
    //     'top': '50%',
    //     'left': '70%',
    //     'height': '25%',
    //     "zIndex": '24'
    // });
    volumeButton.addEventListener('click', toggleSound);
    buttonsUI.appendChild(volumeButton);
    let pauseButton = document.createElement('img');
    pauseButton.src = "data/pause.png";
    pauseButton.id = "pauseButton";
    // stl(pauseButton, {
    //     'position': 'fixed',
    //     'top': '2.2%',
    //     'left': '76%',
    //     'height': '9.5%',
    //     "zIndex": '24'
    // });
    pauseButton.addEventListener('click', togglePause);
    buttonsUI.appendChild(pauseButton);
    let timer = document.createElement('div');
    timer.id = "timer";
    // stl(timer, {
    //     'position': 'absolute',
    //     'top': '53%',
    //     'height': '22%',
    //     'width': '30%',
    //     'fontSize': G.Fontsiztimer + 'vmax',
    //     'fontSize': G.Fontsiztimer + 'vmin',
    //     'fontFamily': 'noot',
    //     'left': '8%',
    //     'color': 'white',
    //     'fontWeight': 'bolder',
    //     'textShadow': '0.5vw 0.5vh 1px black,-1px -1px 1px black,-1px 1px 1px black, 1px -1px 1px black, 9px 8px 0px rgba(0,0,0,0.15)'

    // });

    buttonsUI.appendChild(timer);
    bulildwords();
    buildsounds();
    buildHud();
    buildGun();
    if (G.isGun2) { buildGun(2) }

}

function playSound(Snd, pause) {
    if (G.isSoundOn == true && !pause) {

        //Snd.pause();
        Snd.currentTime = 0;
        Snd.play();
    }
    if (pause) { Snd.pause(); }
}

function togglePause(upgraded = false, finished = false) {

    function blacker(gry = 0, blr = 0, brt = 100, dir = -1) {
        if (dir == 1 && G.ispause == true) { return }
        if (dir == -1 && G.ispause == false) { return }
        let gc = Id('galleryContainer');
        let pb = Id('pageBody');
        if (dir == -1) {
            gry < 90 ? gry++ : "";
            blr < 4 ? blr++ : "";
            brt > 50 ? brt-- : ""
        };
        if (dir == 1) {
            gry > 0 ? gry-- : "";
            blr > 0 ? blr-- : "";
            brt < 100 ? brt++ : ""
        };
        let styleobject = { 'filter': "grayscale(" + gry + "%) blur(" + blr + "px)  brightness(" + brt + "%)", }
        stl(gc, styleobject)
        stl(pb, styleobject)
        setTimeout(() => {
            if (gry > 250 && dir == -1) { return };
            if (gry < 1 && dir == 1) { return };
            blacker(gry, blr, brt, dir)
        }, 5)
    }
    let pauseButton = Id('pauseButton')

    if (G.ispause == true) {
        G.ispause = false;
        pauseButton.src = "data/play.png";

        menu('delete');
        //    setTimeout(function(){moveCurtain('open');},100)
        //blacker (150,20,40,1)
    } else if (G.ispause == false) {
        if (upgraded == true) { menu('upgradesFromGame') } else if (finished) {
            menu('finished')
        } else {
            menu('settings')
        }
        G.ispause = true;
        pauseButton.src = "data/pause.png";
        //    setTimeout(function(){moveCurtain('close');},100)
        //blacker (10,0,100,-1)
    }




}

function moveCurtain(action = 'open') {
    if (G.curtainMoving) { return }
    G.curtainMoving = true;
    const leftOpen = -62;
    const leftClose = -10 // left closed 30
    const rightOpen = 90;
    const rightClose = 45 // left open -15
    let advance = 1;

    function moving(direction) {
        let adding = direction * (advance++/ 30);
            if (action == 'open') {
                if (xleft > leftOpen) { leftcurtain.style.left = xleft + "%" }
                if (xright < rightOpen) { rightcurtain.style.left = xright + "%" }
            } else if (action == 'close') {
                if (xleft < leftClose) { leftcurtain.style.left = xleft + "%" }
                if (xright > rightClose) { rightcurtain.style.left = xright + "%" }
            }
            xleft += adding; xright += (adding * -1); advance++
        }
        leftcurtain = Id('leftcurtain');
        rightcurtain = Id('rightcurtain')

        leftcurtainX = leftcurtain.style.left;
        rightcurtainX = rightcurtain.style.left;
        xleft = Pre2Num(leftcurtain.style.left);
        xright = Pre2Num(rightcurtain.style.left);
        rightcurtainX = Id('rightcurtain').style.left;
        let dir = 1;
        if (action == 'open') { dir = -1 }
        var timer1 = setInterval(() => {
            moving(dir)
        }, 15)
        setTimeout(() => {
            G.curtainMoving = false;
            clearInterval(timer1);
        }, 1000);




    }

    function gunHidesOrComesUp(direction = -1, gunNumber = 1, directAction = "") {

        const VerticalGunmove = 1.2;
        let gun = Id("gun");
        if (gunNumber == 2) { gun = Id("gun2"); }
        let y = gun.style.bottom;
        y = Pre2Num(y);
        (direction == -1) ? (G.gunlastY = y) : "";
        let FinalY = (direction == -1) ? -100 : G.gunlastY;

        function lowerGun(finalHieght) {
            let momentum = (Math.abs(y) / 50) * 3; // makes the gun move in a momentum
            setTimeout(() => {
                y = y + (direction * momentum) // (direction * VerticalGunmove)
                gun.style.bottom = y + "%";
                if (y > finalHieght && (direction == -1)) { lowerGun(FinalY) }
                if (y < finalHieght && (direction == 1)) { lowerGun(FinalY) }
            }, 1)
        }
        if (directAction == 'up') { FinalY = -3 }
        lowerGun(FinalY);
    }

    function checkLoadstatus() {
        let numberOfloads = 0
        let numberoferrors = 0
        let numberofundetermin = 0
        let numberOfsigns = 0
        for (let x = 1; x <= G.maxnumberOfSigns; x++) {
            let check = G.loadImg[x].sign;
            if (check == G.Wasloaded) {
                numberOfloads++;
                numberOfsigns++;
            } else if (check == G.loadingError) {
                numberoferrors++
            } else if (check == G.WasNotloadedYet) {
                numberofundetermin++
            }
            for (let y = 1; y <= G.maxtargePerWord; y++) {
                let check2 = G.loadImg[x].target[y];
                if (check2 == G.Wasloaded) {
                    numberOfloads++
                } else if (check2 == G.loadingError) {
                    numberoferrors++
                } else if (check2 == G.WasNotloadedYet) {
                    numberofundetermin++
                }
            }
        }
        let precentOfLoaded = (numberoferrors + numberOfloads) * 100 / (G.maxnumberOfSigns * (G.maxtargePerWord + 1))
        G.numOffoundSigns = numberOfsigns;
        G.EstimatedtargetGroups = Math.ceil((numberOfloads - numberOfsigns) / numberOfsigns);
        return Math.round(precentOfLoaded);
    }

    function visuaGamelLoader(isForsave = false) {
        function GameloadingAnimation(status = "draw", precent = 0, isStartOfGame = false) {
            if (status == "draw") {

                let galleryContainer = Id("galleryContainer");
                var loadContainer = document.createElement("div");
                loadContainer.id = "loadContainer";
                galleryContainer.appendChild(loadContainer)
                var loadContainerText = document.createElement("p");
                loadContainerText.id = "loadContainerText";
                loadContainer.appendChild(loadContainerText);
                let bordercolor = "#800000";
                let backgroundLoadcolor = G.LoaderColor;
                let tp = 63
                if (isForsave) { tp = 87 }

                stl(loadContainer, {
                    "position": "fixed",
                    'height': "5%",
                    'width': "50%",
                    "left": "25%",
                    "top": tp + "%",
                    "background": "linear-gradient(90deg, red 0%, transparent , transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
                    "zIndex": "13",
                    "border": "5px solid black",
                    "borderColor": bordercolor,
                    "border-radius": "15px",
                    "background-clip": "content-box",
                    "padding": "0.3%",
                    "backgroundSize": "100%"
                })
                loadContainerText.innerHTML = precent
                stl(loadContainerText, { "position": "absolute", "top": "0%", 'width': "100%", "textAlign": "center", "fontSize": "200%", "letterSpacing": "2px", "fontFamily": "'noot', Times, serif", "fontWieght": "bold", "verticalAlign": "super", "marginTop": "1%", "marginBottom": "1%", "fontWeight": "bold" })


            } else if (status == "update") {
                var loadContainer = Id("loadContainer");
                var loadContainerText = Id("loadContainerText")
                let theBackround = "linear-gradient(90deg, red, " + G.LoaderColor + "  " + precent + "%, transparent , transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
                stl(loadContainer, { "background": theBackround })
                if (precent >= 100) { precent = 100 }
                loadContainerText.innerHTML = "";
                loadContainerText.innerHTML = precent + "%"
            } else if (status == "end") {
                var loadContainer = Id("loadContainer");
                StylelFader(loadContainer, 60);
                var parent = loadContainer.parentElement;
                parent.removeChild(loadContainer)
                if (isForsave) {} else { return newLevel(); }


            }

        }
        GameloadingAnimation("draw");
        var TheLoading = 0
        var MyInterval =
            setInterval(function() {
                //GameloadingAnimation ("update",TheLoading);
                if (TheLoading <= checkLoadstatus()) {
                    GameloadingAnimation("update", TheLoading)
                    TheLoading++
                } else if (TheLoading >= 100) {
                    clearInterval(MyInterval);
                    var loadContainer = Id("loadContainer");
                    GameloadingAnimation("end");
                }
            }, 1)
    }

    function gunFiring(event) {
        function gunRecoil(gunNumber = 1) {
            const gunRecoiljumpXY = 4;
            const speedOFmovment = 11

            function addedRecoil(Styleproperty, distance = gunRecoiljumpXY) {
                if (gunNumber == 2) { distance = distance * -1 }
                Styleproperty = Number(Styleproperty.replace("%", ''))
                Styleproperty += distance;
                return Styleproperty + "%"
            }

            let myElement = Id("gun");
            if (gunNumber == 2) { myElement = Id("gun2") }
            var gun = myElement;
            const msOfflare = 100

            let TheGunUrl = "url('data/gunfire" + G.guntype + ".png')";
            stl(gun, {
                'background': TheGunUrl,
                'height': "100%",
                'width': "100%",
                "backgroundSize": "30%",
                "zIndex": "14",
                "backgroundRepeat": "no-repeat"
            })
            var timer1 = setTimeout(function() {
                TheGunUrl = "url('data/gun" + G.guntype + ".png')"
                stl(gun, {
                    'background': TheGunUrl,
                    'height': "100%",
                    'width': "100%",
                    "backgroundSize": "30%",
                    "zIndex": "14",
                    "backgroundRepeat": "no-repeat"
                })

            }, msOfflare);

            for (x = 1; x < speedOFmovment; x++) {
                let themovement = gunRecoiljumpXY / 20;
                if (x > (speedOFmovment / 2)) { themovement = (themovement * -1) };
                setTimeout(function() {
                    let theleft = addedRecoil(myElement.style.left, themovement);
                    let thebottom = addedRecoil(myElement.style.bottom, themovement);
                    myElement.style.left = theleft;
                    myElement.style.bottom = thebottom
                }, speedOFmovment * x - x)
            }

        } //put this inside gunFiring

        if (event.button !== 0 || (!G.isPlaying && !G.ispause)) { return };
        if (G.isGunloading[1] && !G.isGun2) { return }
        if (G.isGunloading[1] && G.isGunloading[2]) { return }
        if (G.isGun2 && G.isOneHandLoading && (G.isGunloading[2] || G.isGunloading[1])) {
            if (G.isGunloading[2]) { G.lastFiredGun = 1 } else if (G.isGunloading[1]) { G.lastFiredGun = 2 }
        } else if (G.isGun2) {
            if (G.lastFiredGun == 2) { G.lastFiredGun = 1 } else if (G.lastFiredGun == 1) { G.lastFiredGun = 2 }
        }
        const msOfrecoil = 300

        let theIdOftar = event.target
        if (theIdOftar.id.search('target') == -1) {
            switch (theIdOftar.id) {
                case "galleryContainer":
                case 'plaque':
                case 'hole':
                case 'botoom_of_sign':
                case 'leftpole':
                case 'rightpole':
                    break;
                case 'jump2banks':
                    menu('targetbank');
                    return;
                    break;
                case 'jump2save':
                    menu('saving');
                    return;
                    break
                case 'jump2upgrad':
                    menu('upgrades');
                    return;
                    break
                case 'back2game':
                    togglePause();
                    return;
                    break;
                case 'back2menu':
                    menu('back2settings');
                    return;
                    break;
                default:

            }
        }
        if (theIdOftar.id == 'volumeButton' || theIdOftar.id == 'pauseButton' || G.ispause || theIdOftar.id == 'newUpgrades') { return };

        function fadeHoles(Thehole) {
            let timeOffade = 50; // speed of the fade Ranks
            let timeOfshowingShot = 4000 // 1 seconds the shot hole lives
            setTimeout(function() { StylelFader(Thehole, timeOffade) }, timeOfshowingShot)
            setTimeout(function() {
                let check = Is(Thehole);
                if (!check) { return };
                check = Is(Thehole.parentElement);
                if (!check) { return };
                let parent = Thehole.parentElement;
                parent.removeChild(Thehole);
            }, timeOfshowingShot * 2);
        }
        playSound(G.sound.gunshot);
        G.playerBullets--
            updatehud();

        // drawing a hole
        let x = event.clientX;
        let y = event.clientY;
        let hole = document.createElement("img");
        hole.id = "hole"
        hole.src = "data/bullethole" + G.guntype + ".png";
        hole.className = "gunhole";
        stl(hole, {
            'margin': '0px',
            'padding': '0px',
            'transform': 'translate(-10%,-10%)',
            'border': 'none',
            'position': 'fixed',
            'left': x + "px",
            'top': y + "px",
            'height': "7%",
            'width': "3%",
            "backgroundSize": "100%",
            "backgroundRepeat": "no-repeat",
            //'overflow': 'hidden',
            "zIndex": "6"
        })
        Id("targetscontainer").appendChild(hole);
        fadeHoles(hole)
        gunRecoil(G.lastFiredGun) // G.isGun2

        G.justFired = true;

        var timer2 = setTimeout(function() { G.justFired = false }, msOfrecoil)
        if (G.playerBullets <= 0) {
            if (!G.isGun2) { gunLoading(1); }
            if (G.isGun2 && !G.isGunloading[1]) { gunLoading(1); }
            if (G.isGun2 && !G.isGunloading[2]) { gunLoading(2); }
        } else if (G.isGun2 && G.isOneHandLoading && G.playerBullets < G.upgrade.maxBullets / 2) {
            if (!G.isGunloading[1] && !G.isGunloading[2])
                gunLoading(G.lastFiredGun, true);
        }

    }

    function gunLoading(gunNumber = 1, canPfire = false) {
        let cursor = 1

        function blockFireWhileLoading() {
            if (G.isGun2 && (G.isGunloading[1] == false || G.isGunloading[2] == false)) {
                stl(Id('galleryContainer'), { 'cursor': "url('data/crosshair.png'), auto" });
                return
            }
            if (!G.isGun2 && !G.isGunloading[1]) { return }
            cursor++;
            cursor > 2 ? cursor = 1 : 0
            stl(Id('galleryContainer'), { 'cursor': "url('data/loadcursor" + cursor + ".png'), auto" });
            setTimeout(() => {
                //    stl(Id('galleryContainer'), {'cursor': "url('data/loadcursor"  + cursor + ".png'), auto"});
                if (!G.isGun2 || G.isGunloading[1] && G.isGunloading[2]) { blockFireWhileLoading() }

            }, 300)
        }

        function EndGunloading(gunNumber) {
            G.isGunloading[gunNumber] = false;

            stl(Id('galleryContainer'), { 'cursor': "url('data/crosshair.png'), auto" });
            G.playerBullets = G.upgrade.maxBullets;
            updatehud();
        }
        if (gunNumber == 1) {
            if (G.isGunloading[1] == true) { return };
            G.isGunloading[1] = true;
        }
        if (gunNumber == 2) {
            if (G.isGunloading[2] == true) { return };
            G.isGunloading[2] = true;
        }
        setTimeout(() => { gunHidesOrComesUp(-1, gunNumber) }, 300)
        setTimeout(() => { gunHidesOrComesUp(1, gunNumber) }, G.gunloadingTime - 300)
        setTimeout(() => { EndGunloading(gunNumber) }, G.gunloadingTime)
        blockFireWhileLoading()
        playSound(G.sound.gunload);


    }

    function stopWatch(countdown, stopTheCount) { // starts the stoper
        G.stopWatchTIME = 0;
        let TimeClicks = 0
        if (countdown) { TimeClicks = countdown * 10 };
        let ChangeTimeInterval = 100 //change time interval every X milisecinds

        function timePrint() {

            if (G.ispause) { return };
            let timertxt = Id('timer');
            let theColor = 'white'
            G.minutes = G.minutes || 0;
            G.seconds = G.seconds || 0;
            G.gameRank = 1; // time is not part of the stage;
            G.ChallangeLost = false;
            let formattedminutes = ("0" + G.minutes).slice(-2);
            let formattedseconse = ("0" + G.seconds).slice(-2);
            G.miliseconds = G.miliseconds || 0;
            let TheTimeText = formattedminutes + ":" + formattedseconse + "." + G.miliseconds;
            if (G.isPlaying === false) { timertxt.innerHTML = TheTimeText; return };
            if (countdown && TimeClicks > 0) { TimeClicks-- } else if (!countdown) { TimeClicks++ };
            G.seconds = Math.floor(TimeClicks / ChangeTimeInterval * 10) - (G.minutes * 60);
            var str = TimeClicks + "0";
            G.miliseconds = str.charAt(str.length - 2); // geting only the last Char of the TIME clicks wich is the ones
            if (G.seconds >= 0) {} else { G.seconds = 0 };
            G.minutes = Math.floor(Math.floor(TimeClicks / ChangeTimeInterval * 10) / 60);

            if (countdown && (G.seconds < 10) && (G.minutes == 0)) { theColor = 'yellow'; }
            if (countdown && (G.seconds < 10) && (G.minutes == 0) && (G.miliseconds < 4 && G.miliseconds > 1)) { TheTimeText = '' };
            if (countdown && (G.seconds < 11) && (G.minutes == 0) && (G.miliseconds == 2) && (G.seconds != 0)) { playSound(G.sound.beep) }




            timertxt.style.color = theColor;
            timertxt.innerHTML = TheTimeText;
            if (countdown && (TimeClicks == 0)) { newLevel(true, true) }




        }

        if (stopTheCount) {
            G.stopWatchTIME = 0;
            clearInterval(G.stopWatch);
            G.minutes = 0;
            G.seconds = 0;
            G.miliseconds = 0;
            timePrint();
            return
        }

        G.stopWatch = setInterval(function() { timePrint(); }, ChangeTimeInterval);
    }

    function updatehud(dontCheckTheScore = false) {

        //if (G.hudJustTpdated){return}
        G.hudJustTpdated = true;
        setTimeout(() => { G.hudJustTpdated = false }, 700)
            //if(storeInLocal ('check')) {storeInLocal ('save')};



        let newTok = false;

        function newUpgradesNotice(newToken) {
            let ad = 1;
            let returnsForNEW = 10
            let tms = 1
            let maxSize = 1.4;
            let sizeTim = 10
            let scale = 1

            function sizer(dir = 1) {
                scale += (0.02 * dir);
                newUpgrades.style.transform = 'scale(' + scale + ')'
                if (dir == 1 && scale < maxSize) { setTimeout(() => { sizer(dir) }, sizeTim) } else if (dir == 1 && scale >= maxSize) { setTimeout(() => { sizer(-1) }, sizeTim) } else if (dir == -1 && scale > 1) { setTimeout(() => { sizer(-1) }, sizeTim) }
            }

            function colorChanger(c) {
                let c2 = 200;
                let c3 = 100;
                let newUpgrades = Id('newUpgrades')
                let theColor = 'rgba(' + c + ',' + c2 + ',' + c3 + ')';
                newUpgrades.style.color = theColor
                c += (ad * 7);
                if (c > 254) {
                    ad = -1;
                    tms++
                };
                if (c < 1) { ad = 1 };
                if (tms > returnsForNEW) { return }

                setTimeout(() => colorChanger(c), 10)
            }

            if (!Id("newUpgrades")) {
                let newUpgrades = document.createElement('div');
                newUpgrades.id = "newUpgrades";
                let textDir = 'rtl';
                let alignTxt = 'right';
                if (G.EN) {
                    textDir = 'ltr';
                    alignTxt = 'left'
                }
                stl(newUpgrades, {
                    'position': 'fixed',
                    'textAlign': alignTxt,
                    'verticalAlign': 'baseline',
                    'top': '13.5%',
                    'right': '12.7%',
                    "zIndex": '6',
                    'fontFamily': 'noot',
                    'color': 'yellow',
                    'fontWeight': 'bolder',
                    'position': 'fixed',
                    'width': '20%',
                    'height': '10%',
                    'fontSize': G.FontsiznewImprov + 'vmax',
                    'fontSize': G.FontsiznewImprov + 'vmin',
                    'textShadow': '0.5vw 0.5vh 1px black,-1px -1px 1px black,-1px 1px 1px black, 1px -1px 1px black, 9px 8px 0px rgba(0,0,0,0.15)'

                })

                newUpgrades.innerHTML = G.TXT.youGainedRank;
                newUpgrades.addEventListener('click', () => { if (!G.ispause) { togglePause(true) } })
                Id('hud').appendChild(newUpgrades);
                sizer();


            }
            if (newToken) { colorChanger(0) }
        }

        let pointsTonextStage = XptoRank()
        if (G.upgrade.playerPoints >= pointsTonextStage) {
            G.upgrade.playerRank++;
            G.upgrade.tokens++;
            newTok = true;

        }
        if (!G.upgrade.tokens && Id("newUpgrades")) { Id('hud').removeChild(Id('newUpgrades')) }
        if (G.upgrade.tokens) { newUpgradesNotice(newTok) }
        pointsTonextStage = XptoRank()


        function updateText(elem, text) {
            elemnt = Id(elem);
            elemnt.innerHTML = text;
        }

        let ranktxt = G.TXT.rank + G.upgrade.playerRank + ":  ";
        let rankName = G.ranksArry[G.upgrade.playerRank] || G.ranksArry[G.ranksArry.length - 1]
        ranktxt += rankName


        updateText("pointstxt", G.upgrade.playerPoints + "/" + pointsTonextStage);
        updateText("stagetxt", G.upgrade.playerLevel)
        updateText('rank', ranktxt)



        bullets = Id("bullets");
        while (bullets.firstChild) {
            bullets.removeChild(bullets.firstChild);
        }
        let delay = 80;
        if (G.playerBullets == G.upgrade.maxBullets && (G.lastBulletStatus != G.playerBullets)) {} else { delay = 0 }
        G.lastBulletStatus = G.playerBullets;
        for (let i = 1; i <= G.upgrade.maxBullets; i++) {
            let Onebullet = document.createElement("img");
            Onebullet.src = "data/bullet.png";
            stl(Onebullet, {
                'position': 'absolute',
                'top': '0%',
                'left': (i * G.bulletDistance) + '%',
                'height': '50%',
                'padding': '0%',
                'width': '10%',

            })
            if (G.playerBullets < i) { stl(Onebullet, { 'opacity': '0.2' }) }


            setTimeout(() => { bullets.appendChild(Onebullet) }, delay * i)

        }
        const advanceColor = "GhostWhite  ";
        const bkrndColor = "LimeGreen"
        let botoomXp = G.upgrade.playerRank == 1 ? 0 : XptoRank((G.upgrade.playerRank - 2))
        let xpbetweenStages = XptoRank() - botoomXp
        let xpplayerThisRank = G.upgrade.playerPoints - botoomXp
        let precentxp = xpplayerThisRank / xpbetweenStages * 100;

        let precent = 100 - precentxp;

        let theBackround = "linear-gradient(90deg, Yellow      , " + advanceColor + "  " + precent + "%, " + bkrndColor + "," + bkrndColor + "," + bkrndColor + "," + bkrndColor + "," + bkrndColor + "," + bkrndColor + "," + bkrndColor + "," + bkrndColor + " )"
        stl(Id("points"), { "background": theBackround })
        if (dontCheckTheScore) { return }
        if (!G.gameType.static || G.gameType.draw) { checkScore() } else if (G.gameType.static) {
            let tarOnBoar = areTargetsOnBoard();
            if (!tarOnBoar) { checkScore() }
        }

    }

    function addTarget(x, y, direction) {

        let targetscontainer = Id("targetscontainer")
        let target = {};
        target.className = "onBoard"
        let safty = 0;
        while (target.className == "onBoard") {
            var Wrnd = getRandomInt(G.numOffoundSigns);
            var Trnd = getRandomInt(G.EstimatedtargetGroups)
            target = G.word[Wrnd].target[Trnd]
            safty++;
            if (safty > 10000) { return }
        }

        stl(target, {
            "display": "inherit"
        });
        target.setAttribute("class", "onBoard");
        targetscontainer.appendChild(target);
        let h = window.innerHeight;
        let w = window.innerWidth
            //let preheight = Pre2Num(target.style.bottom) // try to fix bug
        let widthRatio = target.naturalWidth / target.naturalHeight * (h / w);
        stl(target, {
            'position': 'absolute',
            'left': x + '%',
            'bottom': (y + "%"),
            'transform': 'scaleX(' + direction + ')', // transform image
            'overflow': 'hidden',
            // 'height': (G.targetHeight + "%"),
            // 'width': ((G.targetHeight * widthRatio) + "%"), //curren set proper width ratio
            "backgroundSize": "100%",
            "backgroundRepeat": "no-repeat",
            'opacity': '1',
            "zIndex": "9"
        })
        return target


    }

    function clearTargets() {
        function targetsSetOffBoard() {
            for (x in G.word) {
                for (i in G.word[x].target) {
                    G.word[x].target[i].className = "offBoard";

                }
            }

        }
        targetsSetOffBoard();
        G.IsclearBoard = true;
        deleteChildren(Id('targetscontainer'));
        deleteChildren(Id('lightsign'));

        setTimeout(() => { G.IsclearBoard = false }, 100)
    }

    function moveTargets(speed = 15, hieght = 20, direction = -1) {
        if (G.IsclearBoard) { return };
        const pace = 0.25 * direction; // pace = 0.25 => it's the lowest advance that can have fast pace
        const startleft = 50 - (50 * direction);
        const tar_stall = 100 // ms
        function isLastTargtNear() {
            let nearx = 25 // 25% near the previos target
            let neary = 10 // 8% near the y axis
            let children = Id("targetscontainer").childNodes
            for (let i in children) {
                if (children[i].style && children[i].className !== "gunhole") {
                    let left = Pre2Num(children[i].style.left) || false
                    let bottom = Pre2Num(children[i].style.bottom) || 5 // hieght
                    if ((Math.abs(startleft - left) < nearx) && (Math.abs(bottom - hieght) < neary)) {
                        let name = Math.round((Number(children[i].id.replace("target", ""))) / G.TargetIdMutiplayer);
                        return true
                    };

                }
            }
            return false
        }
        let stallTheTar = isLastTargtNear();
        if (stallTheTar) {
            setTimeout(() => {
                moveTargets(speed, hieght, direction)
            }, tar_stall)
            return
        }
        hieght > 70 ? hieght = 70 : '' // 70 is max hieght for the targets
        hieght < 15 ? hieght = 15 : '' // 15 os the min hieght for the targets
        let target = addTarget(startleft, hieght, direction);
        let mytimer = setInterval(function() { //the timer that moves the target
            if (G.ispause == true) { return }
            let left = target.style.left;
            left = (Pre2Num(left) + pace);
            let isoffboard = (target.className === "offBoard")
            if (left < -10 || left > 102 || isoffboard) { // kills the target

                clearInterval(mytimer);
                if (target.parentNode == null) { return };
                target.setAttribute("class", "offBoard");
                target.parentNode.removeChild(target);
                if (G.isPlaying) {
                    moveTargets(speed, hieght, direction)

                }
            }
            if (!G.isPlaying) { setTimeout(() => { clearInterval(mytimer) }, 4000) }

            let sinmodifier = 1;
            let sinradius = 1.4
            let sinus = Math.sin(left / sinradius) * sinmodifier;
            target.style.left = left + "%";
            target.style.bottom = (hieght + sinus) + "%"
        }, speed)

    }

    function shootSomeTarget(event) {



        function missed(idOftarget) {
            if (G.isGunloading[1] == true) { return };
            setTimeout(function() { playSound(G.sound.buzzer) }, 100)
            G.hitStreak = 0;
            let numOfsign = Math.round(idOftarget / G.TargetIdMutiplayer)
            if (G.PenaltyPerTarget && !G.upgrade.hitUpgrade[2]) {
                showPointsAfterHit("-" + G.PenaltyPerTarget, "target" + idOftarget, 'LightCoral');
                G.upgrade.playerPoints -= G.PenaltyPerTarget;
                if (G.upgrade.playerPoints <= 0) { G.upgrade.playerPoints = 0 } else if (G.upgrade.playerPoints <= XptoRank(G.upgrade.playerRank - 2)) { G.upgrade.playerPoints = XptoRank(G.upgrade.playerRank - 2) };
                updatehud()
            }


            Id("target" + idOftarget).className = "offBoard"; // this caused the bugs
            stl(Id("target" + idOftarget), {
                'opacity': '0'
                    //"display":"none"
            });

        }

        function hit(idOftarget) {
            if (G.isGunloading[1] == true) { return };
            setTimeout(function() { playSound(G.sound.hitsound) }, 100)
            let numOfsign = Math.round(idOftarget / G.TargetIdMutiplayer)
                //let numberOftarget = (numOfsign * G.TargetIdMutiplayer) - idOftarget;
            let id = "sign" + numOfsign;
            let oldsign = Id(id)
            let lightS = Id("lightsign")
            lightS.removeChild(oldsign)
                //Id("target" + idOftarget).className = "offBoard"; // this caused the bug
            let isAugmented = 1;
            if (G.upgrade.hitUpgrade[1]) { isAugmented = G.upgrade.pointsAugmentation }
            let pointsAdded = Math.ceil(G.pointsPerTarget * isAugmented)
            G.upgrade.playerPoints += pointsAdded
            G.targetsHit++
                G.hitStreak++
                let rand = getRandomInt(100)
            if (G.upgrade.loadUpgrade[3] && ((G.playerBullets + 2) < G.upgrade.maxBullets) && (G.playerBullets > 0) && (rand > 65)) {
                G.playerBullets += 2;
                setTimeout(() => {
                    showPointsAfterHit("+2", 'gun', 'white', 120, {
                        'fontSize': '8vmax',
                        'fontSize': '8vmin'
                    })
                    playSound(G.sound.singlebullet)
                }, 300)
            }
            showPointsAfterHit("+" + pointsAdded, "target" + idOftarget, 'Chartreuse');

            if ((G.isGun2 == false) && (G.upgrade.twoGunsUpgrade[1]) && (G.hitStreak >= G.upgrade.HitstreakFor2guns)) {
                G.isGun2 = true;
                playSound(G.sound.twoguns)
            }
            updatehud()
            stl(Id("target" + idOftarget), {
                'opacity': '0'
                    //"display":"none"
            });
            if (G.gameType.draw && G.isPlaying) {
                let tarcon = Id('targetscontainer')
                child = tarcon.childNodes
                for (i in child) {
                    StylelFader(child[i], 5)
                };
                setTimeout(() => {
                    tarcon.style.opacity = '1';
                    clearTargets();
                    builddrawlevel()
                }, 700);
                return
            }
            setWord();
        } // put this function inside shootSomeTarget

        if (event.button !== 0 || G.ispause == true || event.target.style.opacity == '0') { return };

        let numOfsign = G.currentWord.replace(/\D/g, '');
        numOfsign = Number(numOfsign)
        let tar = event.target.id;

        tar = tar.replace(/\D/g, '');
        let targetid = tar;
        tar = Math.round(tar / G.TargetIdMutiplayer)
        tar == numOfsign ? hit(targetid) : missed(targetid)
        if (G.gameType.static) {
            let tarOnBoar = areTargetsOnBoard()
            if (!tarOnBoar) {
                clearTargets();
                setTimeout(() => { build9staticLevel(); }, 300)
                setTimeout(() => { setWord() }, 500);
            }
        }


    }

    function setWord() {

        if (!G.isPlaying) { return }
        //G.gameType.hitWords = false
        function IsWordOnboard(numOfword) {
            let children = Id("targetscontainer").childNodes
            let num = 0
            for (let i in children) {
                if (children[i].style && children[i].className !== "gunhole") {
                    num++;
                    id0 = children[i].id;
                    tar = id0.replace(/\D/g, '');
                    tar = Math.round(tar / G.TargetIdMutiplayer)
                    if (numOfword == tar && (children[i].style.opacity == 1)) { return true }

                }
            }
            return false
        }
        let rndSign = getRandomInt(G.numOffoundSigns);
        if (G.gameType.static == true) {
            let breaking = 0
            while (true) {
                breaking++
                if (IsWordOnboard(rndSign)) { break }
                if (breaking > 100) {
                    G.IsclearBoard = true;
                    clearTargets();
                    break
                }
                rndSign = getRandomInt(G.numOffoundSigns);
            }
        }
        if (G.IsclearBoard) { return }
        sign = G.word[rndSign].sign;
        lightsign = Id("lightsign");
        let child = lightsign.childNodes
        if (child[0]) {
            for (i in child) {
                let isTarget = child[i].id.search('sign')
                if (isTarget !== -1) { return }
            }
        }
        lightsign.appendChild(sign)
            // stl(sign, {
            //     'position': 'relative',
            //     "top": "15%",
            //     "left": "11%",
            //     'height': "60%",
            //     'width': 78 + "%",
            //     "backgroundSize": "100%",
            //     "zIndex": "13",
            //     "backgroundRepeat": "no-repeat",
            // });
        G.currentWord = sign.id;
        setTimeout(() => { playSound(G.sound.voice[rndSign]) }, 400)




    }

    function showPointsAfterHit(ptext, targetid, color, speed = 40, styleObject) {

        tar = Id(targetid);
        let left = tar.style.left
        if (targetid == 'gun' && !G.isGun2) { left = '80%' }
        let bottom = tar.style.bottom
        if (targetid == 'gun') { bottom = '5%' }
        let svg = document.createElement('div');
        svg.id = "show points"
        stl(svg, {
            'fontSize': G.Fontsiz2 + 'vmax',
            'fontSize': G.Fontsiz2 + 'vmin',
            'position': 'absolute',
            'bottom': bottom,
            'left': left,
            'width': '10%',
            'height': '10%',
            'zIndex': '23'
        })
        if (styleObject) { stl(svg, styleObject) }
        Id('targetscontainer').appendChild(svg);
        txt = document.createElement("text");
        txt.innerHTML = ptext;
        stl(txt, {
            'fontFamily': 'noot',
            //-webkit-background-clip: text;
            //-webkit-text-fill-color: transparent
            'color': color,
            'fontWeight': 'bolder',
            'position': 'fixed',
            'width': '20%',
            'height': '20%',
            'textShadow': '0.5vw 0.5vh 1px black,-2px -2px 1px black,-2px 2px 1px black, 2px -2px 1px black, 9px 8px 0px rgba(0,0,0,0.15)'

        })
        svg.appendChild(txt);
        let startposition = Pre2Num(svg.style.bottom);
        let time2 = setTimeout(() => {
            if (svg == null) { return };
            StylelFader(svg, 10);
        }, speed - 38)
        let timer1 = setInterval(() => {
            if (svg == null) { return }
            svg.style.bottom = (Pre2Num(svg.style.bottom) + 1) + "%"
            if (Pre2Num(svg.style.bottom) - 5 > startposition) { svg.style.visibility = "hidden" }
            if (Pre2Num(svg.style.bottom) - 20 > startposition) {
                clearInterval(timer1);
                let tc = Id('targetscontainer')
                if (Is(svg) && tc.contains(svg)) {
                    tc.removeChild(svg)
                };
            }
        }, speed)

    }

    function buildMovementLevel(NumOfLevel) {
        G.gameType.static = false;
        NumOfLevel = NumOfLevel || 1;
        let tarPerRow = 5;
        let rows = 3;
        let hieghts = [0, 0, 37, 60];
        let speed = G.basicSpeedOfTargets;
        let i = 1;
        let gapBetweenTargets = ((100 / tarPerRow) - 7) / 0.25 * speed // pace const from movetargets, hte -7 is to reduec the target distance so the dont "follow" each other

        for (r = 1; r <= rows; r++) {
            let h = hieghts[r];
            let rndspeed = getRandomInt(Math.floor(Math.sqrt(speed * 6))) - 1;
            let rndDirec = getRandomInt(2) == 1 ? -1 : 1
            if (G.onlyOneDirection) { rndDirec = 1 };
            for (t = 1; t <= tarPerRow; t++) {
                G.targettimers[i] = setTimeout(function() { moveTargets(speed - rndspeed, h, rndDirec) }, t * gapBetweenTargets);
                i++;

            }


        }




    }

    function build9staticLevel(NumOfLevel) {

        G.gameType.static = true;
        G.gameType.hitWords = false

        const numberOftargers = 9
        let hieghts = [0, 15, 39, 62];
        let placesOnrow = [0, 20, 45, 72];

        function placeTarget(x, y) {

            let targetscontainer = Id("targetscontainer")
            let target = {};
            target.className = "onBoard"
            while (target.className == "onBoard") {
                let Wrnd = getRandomInt(G.numOffoundSigns);
                let Trnd = getRandomInt(G.EstimatedtargetGroups)
                target = G.word[Wrnd].target[Trnd]
            }

            let h = window.innerHeight;
            let w = window.innerWidth
            let widthRatio = target.naturalWidth / target.naturalHeight * (h / w);
            stl(target, {
                'position': 'absolute',
                'left': x + '%',
                'bottom': (y + "%"),

                'overflow': 'hidden',
                'height': (G.targetHeight + "%"),
                'width': ((G.targetHeight * widthRatio) + "%"), //curren set proper width ratio
                "backgroundSize": "100%",
                "backgroundRepeat": "no-repeat",
                'opacity': '1',
            });

            target.setAttribute("class", "onBoard");
            targetscontainer.appendChild(target);
        }
        for (row = 1; row <= 3; row++) {
            for (tarInRow = 1; tarInRow <= 3; tarInRow++) {
                y = hieghts[row];
                x = placesOnrow[tarInRow];
                addTarget(x, y, 1)
            }
        }



    }

    function builddrawlevel() {
        G.gameType.static = true;

        function timedstart() {
            gunHidesOrComesUp(1, 1, 'up');
            if (G.isGun2) { gunHidesOrComesUp(1, 2, 'up') }
            for (i = 1; i <= 3; i++) { addTarget(i * 25, 55, 1); }
            setWord('static');
        }

        let tim = 800; //the time for each number
        let styleObj = {
            'position': 'absolute',
            'bottom': '55%',
            'left': '50%',
            'width': '20%',
            'height': '20%',
            'fontSize': '20vmin',
            'zIndex': '23'
        }
        for (i = 3; i >= 0; i--) {
            let t = i
            setTimeout(() => {
                if (t == 0) {
                    if (G.ispause) {
                        setTimeout(() => {
                            clearTargets();
                            builddrawlevel()
                        }, 700);
                        return
                    }
                    timedstart()
                } else {

                    showPointsAfterHit(t, "targetscontainer", 'yellow', 150, styleObj)
                }
            }, tim * (4 - i))
        }
    }

    function menu(type = 'settings') {

        function upgrade(mission, numOfUpgrade) {
            let UpgrdStatus = false;
            let canItUpgrade = false;
            let upGrd = false;
            if (mission == 'upgradeNum') {
                upGrd = true;
                playSound(G.sound.upgrade)
            }
            switch (numOfUpgrade) {
                case 11:
                    UpgrdStatus = G.upgrade.loadUpgrade[1]
                    if (upGrd) {
                        G.upgrade.loadUpgrade[1] = true;
                        G.gunloadingTime = G.gunloadingTime * G.gunloadingChange
                    }
                    canItUpgrade = true;;
                    break;
                case 21:
                    UpgrdStatus = G.upgrade.loadUpgrade[2]
                    if (upGrd) {
                        G.upgrade.loadUpgrade[2] = true;
                        G.gunloadingTime = G.gunloadingTime * G.gunloadingChange
                    }
                    canItUpgrade = G.upgrade.loadUpgrade[1];;
                    break;
                case 31:
                    UpgrdStatus = G.upgrade.loadUpgrade[3]
                    if (upGrd) { G.upgrade.loadUpgrade[3] = true }
                    canItUpgrade = G.upgrade.loadUpgrade[2];;
                    break;
                case 12:
                    UpgrdStatus = G.upgrade.bulletsUpgrade[1]
                    if (upGrd) {
                        G.upgrade.bulletsUpgrade[1] = true;
                        G.upgrade.maxBullets += 2;
                        G.playerBullets = G.upgrade.maxBullets
                    }
                    canItUpgrade = true;;
                    break;
                case 22:
                    UpgrdStatus = G.upgrade.bulletsUpgrade[2]
                    if (upGrd) {
                        G.upgrade.bulletsUpgrade[2] = true;
                        G.upgrade.maxBullets += 2;
                        G.playerBullets = G.upgrade.maxBullets
                    }
                    canItUpgrade = G.upgrade.bulletsUpgrade[1];
                    break;
                case 13:
                    UpgrdStatus = G.upgrade.hitUpgrade[1]
                    if (upGrd) { G.upgrade.hitUpgrade[1] = true }
                    canItUpgrade = true;;
                    break;
                case 23:
                    UpgrdStatus = G.upgrade.hitUpgrade[2]
                    if (upGrd) { G.upgrade.hitUpgrade[2] = true }
                    canItUpgrade = G.upgrade.hitUpgrade[1];;
                    break;
                case 32:
                    UpgrdStatus = G.upgrade.twoGunsUpgrade[1]
                    if (upGrd) {
                        G.upgrade.twoGunsUpgrade[1] = true;
                        G.upgrade.maxBullets += 1;
                        G.playerBullets = G.upgrade.maxBullets
                    }
                    canItUpgrade = (G.upgrade.hitUpgrade[2] || G.upgrade.bulletsUpgrade[2]);
                    break;
                case 41:
                    UpgrdStatus = G.upgrade.twoGunsUpgrade[2]
                    if (upGrd) { G.upgrade.twoGunsUpgrade[2] = true } // two hand loading
                    canItUpgrade = G.upgrade.twoGunsUpgrade[1];
                    break;
                case 42:
                    UpgrdStatus = G.upgrade.twoGunsUpgrade[3]
                    if (upGrd) { G.upgrade.twoGunsUpgrade[3] = true } // always 2
                    canItUpgrade = G.upgrade.twoGunsUpgrade[1];
                    break;

            }
            /*setting the upgrades*/
            //if (G.upgrade.twoGunsUpgrade[1]) {G.isGun2 = true;}
            if (G.upgrade.twoGunsUpgrade[2]) { G.isOneHandLoading = true; }
            if (G.upgrade.twoGunsUpgrade[3]) { G.isGun2 = true; }
            if (mission == 'isUpgradetrue') { return UpgrdStatus; }
            if (mission == 'canItUpgrade') { return canItUpgrade; }
            if (mission == 'clear') {
                for (i = 1; i < 4; i++) {
                    G.upgrade.bulletsUpgrade[i] = false;
                    G.upgrade.loadUpgrade[i] = false;
                    G.upgrade.hitUpgrade[i] = false;
                    G.upgrade.twoGunsUpgrade[i] = false;
                }
            } // clears the variables

            if (G.upgrade.tokens > 0) {



            }
        }

        function drawRankupSign() {
            function animateAvupgrades(number) {
                let num = number
                let t = 1
                let bonus = Id('bonus' + number)

                function shadower(num) {
                    let tm = 10;
                    if (t == 1) { t = getRandomInt(200) }
                    let sin = sinusOne(t);
                    let css = sin * 20 + 5;
                    bonus.style.filter = "invert(" + css + "%)"
                    t++ // 'boxShadow':'0.2vmax 0.3vmax 1px 1px rgba(63,107,169, 0.7)'
                    let upg = upgrade('isUpgradetrue', num)
                    if (G.ShowWoodsign && !upg) { setTimeout(() => { shadower(num) }, 10) }

                }
                shadower(number)



            }

            function writeLightsign() {
                return;
                lightsign = Id('lightsign');
                let textDir = 'rtl';
                let alignTxt = 'right';
                if (G.EN) {
                    textDir = 'ltr';
                    alignTxt = 'left'
                }
                deleteChildren(lightsign);

                let textsign = document.createElement('div');
                textsign.id = 'textsign';
                stl(textsign, {
                    'position': 'absolute',
                    "top": "23%",
                    "left": "11%",
                    'height': "47%",
                    'width': 78 + "%",
                    "backgroundSize": "100%",
                    'fontSize': G.Fontsiz1 + 'vmax',
                    'fontSize': G.Fontsiz1 + 'vmin',
                    'fontFamily': 'noot',
                    'textAlign': textAlign,
                    'direction': textDir,
                    'color': 'white',
                    'fontWeight': 'bolder',
                    'textShadow': '0.1vw 0.5vh 1px black,-1px -1px 1px black,-1px 1px 1px black, 1px -1px 1px black, 9px 8px 0px rgba(0,0,0,0.15)',
                    "zIndex": "13",
                    "backgroundRepeat": "no-repeat",
                })
                lightsign.appendChild(textsign)



                let myText = G.TXT.youGainedRankAndYouHave;
                let noimprove = G.TXT.existigngUpgradesAreIncolor;
                myText += "&nbsp&nbsp" + G.upgrade.tokens + "&nbsp&nbsp";
                myText += G.TXT.upgradesAvalable
                myText += '';

                if (G.upgrade.tokens < 1) { myText = noimprove }
                textsign.innerHTML = myText

            }
            let wood = Id("woodsign");
            deleteChildren(wood);
            const file = "url('data/levelUp/bonus"
            const ratio = 11
            let morex = 3
            let bnsNum = 0;
            for (x = 1; x <= 4; x++) {
                for (y = 3; y >= 1; y--) {
                    let morex = 3;
                    let moresize = 0;
                    if (x >= 4) {
                        morex = 4;
                        moresize = 3
                    }

                    bnsNum = (x * 10) + y;
                    if (bnsNum == 33 || bnsNum == 43) { continue }
                    let bonus = document.createElement('div');
                    bonus.id = 'bonus' + bnsNum
                    let dx = (x * (ratio + morex)) + 10;
                    let dy = (y * ratio) + 12;
                    let isEng = '';
                    if (G.EN) { isEng = "EN" }
                    let theUrl = file + bnsNum + isEng + ".png')"
                    stl(bonus, {
                        'position': 'absolute',
                        'right': dx + '%',
                        'top': dy + "%",
                        'overflow': 'hidden',
                        'height': (10 + moresize + "%"),
                        'width': (13 + moresize + "%"),
                        'background': theUrl,
                        'backgroundColor': 'rgba(253,253,253,0.5)',
                        'boxShadow': '0.2vmax 0.3vmax 1px 1px rgba(63,107,169, 0.7)',

                        'borderRadius': "7px",
                        "backgroundSize": "100%",

                        "backgroundRepeat": "no-repeat",
                        'opacity': '1',
                        "zIndex": "9"
                    })
                    switch (bnsNum) {
                        case 32:
                            stl(bonus, {
                                'top': dy + 3 + "%",
                                'height': (15 + moresize + "%"),
                                'width': (17 + moresize + "%"),



                            })
                            break;

                        case 31:
                            stl(bonus, {
                                'right': dx + 2 + '%',
                                'top': dy + 3 + "%",
                            })
                            break;
                        case 41:

                            stl(bonus, {
                                'top': dy + 5 + "%",
                            })
                            break;
                        case 42:
                            stl(bonus, {
                                'top': dy + 8 + "%",
                            })


                    }
                    let grey = upgrade('isUpgradetrue', bnsNum)
                    if (!grey) {
                        stl(bonus, {
                            'border': '0.1vmax  solid rgba(63,107,169, 0.7)',
                            'filter': "grayscale(140%) contrast(40%)",
                        })


                    }

                    bonus.addEventListener('click', clickUpgrade);
                    wood.appendChild(bonus);
                    if (G.upgrade.tokens > 0 && !upgrade('isUpgradetrue', bnsNum) && upgrade('canItUpgrade', bnsNum)) { animateAvupgrades(bnsNum) };



                }
            }

            writeLightsign();
            drawReurnSingns();


        }

        function drawSettingsSign() {
            drawReurnSingns('back2game');
            let wood = Id("woodsign");
            let txtstyle = iStyle('text');
            let instructions = document.createElement('div');
            instructions.id = 'instructions';
            let jump2upgrad = document.createElement('div');
            jump2upgrad.id = 'jump2upgrad';
            let jump2banks = document.createElement('div');
            jump2banks.id = 'jump2banks';
            let jump2save = document.createElement('div');
            jump2save.id = 'jump2save'



            // stl(jump2save, txtstyle, {
            //         'position': 'absolute',
            //         'right': '45%',
            //         'top': "40%",
            //         'height': (13 + "%"),
            //         'width': (13 + "%"),
            //         'background': 'url("data/loadcursor2.png")',
            //         'backgroundRepeat': 'no-repeat',
            //         'backgroundSize': '40%',
            //         'textAlign': 'center',
            //     })
            // stl(jump2banks, {
            //     'position': 'absolute',
            //     'right': '27%',
            //     'top': "40%",
            //     'height': (13 + "%"),
            //     'width': (13 + "%"),
            //     'textAlign': 'center',
            //     'backgroundColor': 'rgba(253,253,253,0.8)',
            //     'borderRadius': "20px",
            //     'background': 'url("targets1/target (1).png")',
            //     "backgroundSize": "100%",
            // }, txtstyle);
            // stl(jump2upgrad, {
            //     'position': 'absolute',
            //     'right': '70%',
            //     'top': "40%",
            //     'height': (13 + "%"),
            //     'width': (13 + "%"),
            //     'textAlign': 'center',
            //     'backgroundColor': 'rgba(253,253,253,0.8)',
            //     'borderRadius': "20px",
            //     'background': 'url("data/gun' + G.guntype + '.png")',
            //     "backgroundSize": "100%",
            // }, txtstyle);
            // stl(instructions, {
            //     'position': 'absolute',
            //     'right': '25%',
            //     'top': "22%",
            //     'height': (13 + "%"),
            //     'width': (60 + "%"),
            //     'backgroundColor': 'rgba(253,253,253,0.05)',
            //     'borderRadius': "20px",
            //     "backgroundSize": "100%",
            //     'overflow': 'hidden',
            //     "backgroundRepeat": "no-repeat",
            //     'opacity': '1',
            //     "zIndex": "9"
            // })
            // stl(instructions, txtstyle);


            let targetTxt = G.TXT.targetBank;
            let upgTxt = G.TXT.upgrades;
            let insTxt = "&nbsp" + G.TXT.theGoalOfTheGameIs
            if (isFinished) {
                insTxt = '<font color="yellow">' + G.TXT.youFinishedTheGame + "<br>";
                insTxt += G.TXT.youCanStartAnewGame
                insTxt += "<br>" + G.TXT.youCanContinueButItsHard
                playSound(G.sound.finished)
            }

            instructions.innerHTML = insTxt;
            jump2upgrad.innerHTML = upgTxt;
            jump2banks.innerHTML = targetTxt;
            jump2save.innerHTML = G.TXT.savingToThisPC
            mOverEffect(back2game, 1.5, 10);
            mOverEffect(jump2upgrad, 1.5, 10);
            mOverEffect(jump2save, 1.5, 10);
            mOverEffect(jump2banks, 1.5, 10);


            wood.appendChild(instructions);
            wood.appendChild(jump2upgrad);
            wood.appendChild(jump2banks);
            wood.appendChild(jump2save);

        }

        function drawSaveSign() {
            let textDir = 'rtl';
            if (G.EN) { textDir = 'ltr' }

            function submitF(formArray) {

                if (G.isTheGameConnectedToClick) {
                    Formtext.innerHTML = '<span style="color:red;">' + G.TXT.connectedThroughSiteYouMustLogout + '</span>';
                    return;
                }
                if (formArray === 'clear') {
                    if (!storeInLocal('check')) {
                        Formtext.innerHTML = G.TXT.saveWasNotFoundRefreshThewindow;
                        return;
                    }
                    let tx = G.TXT.doYouWantToDeleteAndStartNew
                    if (confirm(tx)) {
                        storeInLocal('reset');
                        location.reload()
                    }
                    return
                }
                let input = Id('input').value
                if (input.length < 2) { Formtext.innerHTML = G.TXT.nameMustHave2chars; return }
                G.upgrade.nameOfplayer = input;
                visuaGamelLoader(true);
                Formtext.innerHTML = '&nbsp';
                let inputName = input;
                inputName += G.TXT.fromNowtourProgWillBeSaved
                setTimeout(() => {
                    StylelFader(Formtext, 50, true)
                    Formtext.innerHTML = inputName;
                }, 50)
                storeInLocal('save')

            }
            let woodsign = Id('woodsign');
            drawReurnSingns();
            let styleObj = {
                'fontSize': '3vmax',
                'fontFamily': 'noot',
                'textAlign': 'center',
                'direction': textDir,
                'fontWeight': 'bolder',
                'backgroundColor': 'rgba(253,253,253, 0.3)',
                'borderRadius': '14px',
                'margin': 'auto',
            }
            let form = document.createElement("form");
            form.setAttribute('method', "post");
            form.setAttribute('action', "javascript:");
            form.addEventListener('submit', (f) => { submitF(f) })
            let input = document.createElement("input");
            input.id = 'input';
            input.setAttribute('type', "text");
            input.setAttribute('name', "username");
            let submit = document.createElement("input"); //input element, text
            let clear = document.createElement("input")
            let br1 = document.createElement('br');
            let br2 = document.createElement('br');
            let textNd = document.createElement('p')
            let Formtext = document.createElement('p')

            let txt = G.TXT.ableTosave


            if (storeInLocal('check') || G.isTheGameConnectedToClick) {

                txt = G.upgrade.nameOfplayer + ', ';
                txt += G.TXT.yourProgWasSaved;
                if (G.isTheGameConnectedToClick) { txt += G.TXT.onWebSite }
            }
            if (type == 'iAmNot') {
                txt = G.TXT.ifYouAreNot + '&nbsp'
                txt += G.upgrade.nameOfplayer + '&nbsp'
                txt += G.TXT.pressBeginNewGame
                if (G.isTheGameConnectedToClick) {
                    txt = '<span style="color:red;">';
                    txt += G.TXT.connectedThroughSite + '</span>'
                }
            }
            Formtext.innerHTML = txt


            submit.setAttribute('type', "submit");
            submit.setAttribute('value', G.TXT.save);
            clear.setAttribute('type', "button");
            clear.setAttribute('value', G.TXT.beginNewGame);
            clear.addEventListener('click', () => { submitF('clear') })
            form.classList.add("saveform")
                // stl(form, {
                //     'position': 'absolute',
                //     'top': '20%',
                //     'left': '15%',
                //     'width': '60%',
                //     'display': 'inline-block',
                //     'textAlign': 'center'

            // })
            // stl(Formtext, iStyle('text'), { 'textAlign': 'center', })
            stl(input, styleObj);
            // stl(submit, styleObj);
            // stl(clear, styleObj)
            form.appendChild(Formtext);
            form.appendChild(input);
            form.appendChild(br1);
            form.appendChild(br2);
            form.appendChild(submit);
            form.appendChild(textNd)
            form.appendChild(clear);
            woodsign.appendChild(form);



        }

        function drawReurnSingns(type = '') {
            if (type !== 'back2menu') {
                let wood = Id("woodsign");
                let back2game = document.createElement('div');
                back2game.id = 'back2game';
                let backSing = "url('data/back2game.png')";
                if (G.EN) {
                    backSing = "url('data/back2gameEN.png')"
                }
                // stl(back2game, {
                //     'position': 'absolute',
                //     'right': '45%',
                //     'top': "57%",
                //     'overflow': 'hidden',
                //     'height': (6 + "%"),
                //     'width': (17 + "%"),
                //     'background': backSing,
                //     'backgroundColor': 'rgba(253,253,253,0.2)',
                //     'borderRadius': "20px",
                //     "backgroundSize": "100%",
                //     "backgroundRepeat": "no-repeat",
                //     'opacity': '1',
                //     "zIndex": "9"
                // })
                mOverEffect(back2game, 1.5, 10);
                wood.appendChild(back2game);

            }
            if (type !== 'back2game') {
                let wood = Id("woodsign");
                let back2menu = document.createElement('div');
                back2menu.id = 'back2menu';
                // stl(back2menu, {
                //     'position': 'absolute',
                //     'right': '36%',
                //     'top': "56%",
                //     'overflow': 'hidden',
                //     'height': (4 + "%"),
                //     'width': (4 + "%"),
                //     'background': "url('data/arrow.png')",
                //     'backgroundColor': 'rgba(253,253,253,0.2)',
                //     'borderRadius': "7px",
                //     "backgroundSize": "100%",
                //     //'transform': 'rotate(80deg)',
                //     "backgroundRepeat": "no-repeat",
                //     'opacity': '1',
                //     "zIndex": "9"
                // })
                mOverEffect(back2menu, 1.5, 10);
                wood.appendChild(back2menu);


            }

        }

        function drawTargetIndex() {
            const tSize = 5;

            function placeTarget(type, num, x, y) {
                let targetscontainer = Id("targetscontainer")
                let target = {};
                target.className = "onBoard"

                target = document.createElement('img')

                tSource = G.word[num].target[1].src;
                if (type == 'sign') { tSource = G.word[num].sign.src }
                target.src = tSource;

                let h = window.innerHeight;
                let w = window.innerWidth
                let widthRatio = target.naturalWidth / target.naturalHeight * (h / w);
                stl(target, {
                    'position': 'absolute',
                    'left': x + '%',
                    'bottom': (y + "%"),
                    'overflow': 'hidden',
                    'height': (tSize + "%"),
                    'width': ((tSize * widthRatio) + "%"), //curren set proper width ratio
                    "backgroundSize": "100%",
                    'backgroundColor': ' rgba(254,254,254,0.25)',
                    'borderRadius': '15px',
                    "backgroundRepeat": "no-repeat",
                    'opacity': '1',
                    'zIndex': '14'
                });

                target.setAttribute("class", "onBoard");
                woodsign.appendChild(target);
            }

            woodsign = Id('woodsign');
            const targetPerLine = 8
            let lines = Math.ceil(G.numOffoundSigns / targetPerLine)
            let y1 = 70;
            let yAdd = 10;
            for (y = 1; y <= lines; y++) {
                yAdd -= 12;
                for (Prei = 1; Prei <= targetPerLine; Prei++) {
                    if (y == lines && Prei > (G.numOffoundSigns % targetPerLine)) { continue }
                    i = Prei + (targetPerLine * (y - 1))
                    placeTarget('target', i, (Prei + 1) * (tSize * 1.5), y1 + yAdd)
                    placeTarget('sign', i, (Prei + 1) * (tSize * 1.5), y1 + tSize + yAdd)
                }
            }
            drawReurnSingns();

        }

        function clickUpgrade(event) {
            targetId = event.target.id;
            theNumber = Number(targetId.replace("bonus", ''));
            let ispossible = upgrade('canItUpgrade', theNumber)
            let isUpgradetrue = upgrade('isUpgradetrue', theNumber)
            if (G.upgrade.tokens && ispossible && !isUpgradetrue) {
                G.upgrade.tokens--;
                upgrade('upgradeNum', theNumber);
                drawRankupSign();
                updatehud()

            }

        }
        let isFinished = false;

        const sp = 9;
        let ws;

        function woodSign(op = 0) {
            let gallery_sideposition = "10%"
            let woodsign = document.createElement("div");
            woodsign.id = 'woodsign'
            let woodsigncontainer = document.createElement("div");
            woodsigncontainer.id = 'woodsigncontainer'
                // stl(woodsign, {
                //     'position': 'fixed',
                //     "bottom": "-20vh",
                //     "left": (Pre2Num(gallery_sideposition) - 2) + 4.3 + "%",
                //     'height': "60vw", //50%
                //     'width': (104 - (Pre2Num(gallery_sideposition) * 2)) + "%",
                //     //'background': "url('data/woodsign.png')",
                //     "backgroundSize": "90%",
                //     "zIndex": "12",
                //     "backgroundRepeat": "no-repeat",
                //     'opacity': 'inherit'
                // });
                // stl(woodsigncontainer, {
                //     'position': 'fixed',
                //     "bottom": "-27vh",
                //     "left": (Pre2Num(gallery_sideposition) - 2) + 4.3 + "%",
                //     'height': "60vw", //50%
                //     'width': (104 - (Pre2Num(gallery_sideposition) * 2)) + "%",
                //     'background': "url('data/woodsign.png')",
                //     "backgroundSize": "90%",
                //     "zIndex": "33",
                //     "backgroundRepeat": "no-repeat",
                //     'opacity': op
                // });
            Id('galleryContainer').appendChild(woodsigncontainer); //current - targetcontainer
            Id('woodsigncontainer').appendChild(woodsign);
        }

        switch (type) {
            case 'iAmNot':
                woodSign(0);
                drawSaveSign()
                ws = Id('woodsigncontainer')
                setTimeout(() => { StylelFader(ws, sp, true); }, 1)
                break;
            case 'back2settings':
                menu('clear');
                setTimeout(() => {
                    let ws = Id('woodsign');
                    StylelFader(ws, sp, true)
                    drawSettingsSign();
                }, 550);
                break;
            case 'finished':
                isFinished = true;

            case 'settings':
                woodSign(0);
                drawSettingsSign()
                ws = Id('woodsigncontainer')
                setTimeout(() => { StylelFader(ws, sp, true); }, 1)
                break;
            case 'delete':

                if (G.isPlaying && !G.gameType.draw) {
                    let tarNum = (Number(G.currentWord.replace("sign", "")))
                    let sign = G.word[tarNum].sign;
                    // stl(sign, {
                    //     'position': 'absolute',
                    //     "top": "15%",
                    //     "left": "11%",
                    //     'height': "60%",
                    //     'width': 78 + "%",
                    //     "backgroundSize": "100%",
                    //     "zIndex": "13",
                    //     "backgroundRepeat": "no-repeat",
                    // });
                    // Id('lightsign').appendChild(sign)
                }
                ws = Id('woodsigncontainer')
                StylelFader(ws, sp);
                setTimeout(() => { Id('woodsigncontainer').remove() }, 150);

                break;
            case 'clear':
                ws = Id('woodsign');
                StylelFader(ws, sp);
                setTimeout(() => { deleteChildren(ws) }, 150);
                break;
            case 'targetbank':
                menu('clear');
                setTimeout(() => {
                    ws = Id('woodsign');
                    StylelFader(ws, sp, true)
                    drawTargetIndex();

                }, 550);
                break;
            case 'saving':
                menu('clear');
                setTimeout(() => {
                    ws = Id('woodsign');
                    StylelFader(ws, sp, true)
                    drawSaveSign();

                }, 550);
                break;
            case 'upgrades':
                menu('clear');
                setTimeout(() => {
                    ws = Id('woodsign');
                    StylelFader(ws, sp, true)
                    drawRankupSign();
                }, 550);
                break;
            case 'upgradesFromGame':
                woodSign(0);
                drawRankupSign()
                ws = Id('woodsigncontainer')
                setTimeout(() => { StylelFader(ws, sp, true); }, 1)
                break;

        }

    }

    function checkScore() {


        if (!G.isPlaying) { return }
        if (G.gameType.moving && (!G.gameType.streak) && G.targetsHit >= G.targetsNeedHit) { newLevel(true); return }
        if (G.gameType.draw && (G.targetsHit >= G.targetsNeedHit)) { newLevel(true); return }
        if (G.gameType.static && G.targetsHit >= G.targetsNeedHit) { newLevel(true); return }
        if (G.gameType.streak && G.hitStreak >= G.targetsNeedHit) { newLevel(true); return }
    }

    function newLevel(finish = false, timeup = false) {


        function getTypeOflevel(playerLv) {
            const levelMechanics = 4
            let leveladder = 0;
            if (playerLv > 3) { leveladder = 2 }
            let leveltype = ((playerLv + leveladder) % levelMechanics) + leveladder
            return leveltype;
        }

        function clear(id0) {
            if (!Id(id0)) { return }
            let obj = Id(id0)
            StylelFader(obj);
            setTimeout(() => {
                let check = Is(obj);
                if (!check) { return };
                check = Is(obj.parentNode);
                if (!check) { return };
                obj.parentNode.removeChild(obj)
            }, 200)
        }

        function endLevel() {

            G.isPlaying = false;
            let newTok = false;
            let maxSize = 1.8;

            function flasherNlarger() {
                let ad = 1;
                let returnsForNEW = 100
                let tms = 1
                let scale = 0.6

                function colorChanger(c) {

                    let r = 250;
                    let b = 20;
                    scale += 0.02;
                    if (scale > maxSize) { scale = maxSize }
                    let endbutton = Id('endbutton')
                    if (!endbutton) { return };
                    let theColor = 'rgba(' + r + ',' + c + ',' + b + ')';
                    endbutton.style.color = theColor
                    c += (ad * 7);
                    if (c > 254) {
                        ad = -1;
                        tms++
                    };
                    if (c < 1) { ad = 1 };
                    endbutton.style.transform = 'scale(' + scale + ')';
                    endbuttonBg.style.transform = endbutton.style.transform
                    if (tms > returnsForNEW) { return }

                    setTimeout(() => colorChanger(c), 10)
                }
                colorChanger(0)
            }
            if (!timeup) { playSound(G.sound.endLevel) } else {
                stopWatch(0, true);
                playSound(G.sound.timeup);
                G.upgrade.timesFailed++
            }
            if (Is(Id('endbutton'))) { var endbutton = Id('endbutton'); var endbuttonBg = Id('endbuttonBg') } else {
                var endbutton = document.createElement('div');
                endbutton.id = 'endbutton';
                var endbuttonBg = document.createElement('div');
                endbuttonBg.id = 'endbuttonBg';
            }
            stl(endbutton, iStyle('text'), {
                'position': 'fixed',
                'left': '10%',
                'top': '45%',
                'height': '40%',
                'width': '50%',
                'fontSize': G.Fontsiz2 + 'vmin',
                'backgroundColor': 'rgba (240,240,240, 0.6)',
                'zIndex': '20',
                'fontFamily': 'noot',
            })
            stl(endbuttonBg, iStyle('text'), {
                'position': 'fixed',
                'left': '10%',
                'top': '45%',
                'height': '40%',
                'width': '50%',
                'fontSize': G.Fontsiz2 + 'vmin',
                'fontFamily': 'noot',
                'backgroundColor': 'rgba (240,240,240, 0.6)',
                'zIndex': '10',
                'textShadow': '-12px 8px 40px rgba(254,254,254,1), 9px 8px 40px rgba(254,254,254,1), 9px -10px 40px rgba(254,254,254,1)',

            })

            let finishText = "&nbsp" + G.TXT.youFinishedLevel + "&nbsp&nbsp&nbsp&nbsp" + G.upgrade.playerLevel + " &nbsp" + "!"

            if (timeup) { finishText = G.TXT.timeIsUp }

            endbutton.innerHTML = finishText

            endbuttonBg.innerHTML = endbutton.innerHTML;

            Id('galleryContainer').appendChild(endbutton)
            Id('galleryContainer').appendChild(endbuttonBg)
            flasherNlarger()

            setTimeout(() => {
                    clear('endbutton');
                    clear('endbuttonBg');
                    moveCurtain('close');
                    if (!timeup) {
                        G.upgrade.playerLevel++;
                        G.upgrade.timesFailed = 0;
                    };
                    if (storeInLocal('check')) { storeInLocal('save'); }
                    updatehud(true);
                    setTimeout(() => {
                        clearTargets();
                        curtainScreen();
                        stopWatch(0, true);
                    }, 800);
                    gunHidesOrComesUp(-1, 1);
                    if (G.isGun2) { gunHidesOrComesUp(-1, 2) }
                }, 3000)
                //endbutton.addEventListener('click', ()=>{initiateLevels()})


        }

        function curtainScreen() {


            initiateLevels(true);
            let newTok = false;
            let try1 = document.getElementById("gamesign")
            let gamesign;
            if (try1) { gamesign = try1 } else {

                gamesign = new Image;
                gamesign.id = "gamesign";
                gamesign.src = "signs/gamesign.png"

            }
            let lightsign = Id('lightsign')
            lightsign.appendChild(gamesign)


            // stl(gamesign, {
            //     'position': 'absolute',
            //     "top" : "15%",
            //     "left": "11%",
            //     'height': "60%",
            //     'width': 78 + "%",
            //     "backgroundSize": "100%",
            //     "zIndex": "13",
            //     "backgroundRepeat": "no-repeat",
            // });



            function flasher() {
                let ad = 1;
                let returnsForNEW = 100
                let tms = 1

                function colorChanger(c) {
                    if (!Id('startbutton')) { return }
                    let c2 = 200;
                    let c3 = 100;
                    let startbutton = Id('startbutton')
                    let theColor = 'rgba(' + c + ',' + c2 + ',' + c3 + ')';
                    startbutton.style.color = theColor
                    c += (ad * 7);
                    if (c > 254) {
                        ad = -1;
                        tms++
                    };
                    if (c < 1) { ad = 1 };
                    if (tms > returnsForNEW) { return }

                    setTimeout(() => colorChanger(c), 10)
                }
                colorChanger(0)
            }
            if (Id('stageinfo')) {
                var stageinfo = Id('stageinfo');
                var startbutton = Id('startbutton')
                var startbuttonBg = Id('startbuttonBg')
            } else {
                var stageinfo = document.createElement('div');
                stageinfo.id = 'stageinfo'
                var startbutton = document.createElement('div');
                startbutton.id = 'startbutton';
                var startbuttonBg = document.createElement('div');
                startbuttonBg.id = 'startbuttonBg';
            }
            let areYouHim = Elm('areYouHim');


            areYouHim.innerHTML = '<br>' + G.TXT.IAmNot + G.upgrade.nameOfplayer;
            let Lvltyp = getTypeOflevel((G.upgrade.playerLevel))
            let extraInstructions = '';
            let needToHitPerStage = initiateLevels(true);
            if (G.upgrade.playerLevel == 1) { Lvltyp = 1 }

            switch (Lvltyp) {
                case 1: //extraInstructions = '';
                    extraInstructions = G.TXT.tryToShootTargetsByWords;
                    break;
                case 2:
                    extraInstructions = G.TXT.quickDraw + '<br>'
                case 3:
                    extraInstructions += G.TXT.youMustHitAt + '&nbsp' + needToHitPerStage + '&nbsp' + G.TXT.targetsBeforeTimeUp;
                    break;
                case 4:
                    extraInstructions = G.TXT.youMustHitInCorrectOrder;
                    break;
                case 5:
                    extraInstructions = G.TXT.youMustHit + '&nbsp' + needToHitPerStage + '&nbsp' + G.TXT.correctHitsInArow
                    break;
            }
            stl(areYouHim, iStyle('text'), {
                    'position': 'fixed',
                    'left': '34%',
                    'top': '71%',
                    'textAlign': 'center',
                    'height': '10%',
                    'width': '30%',
                    'fontSize': '3vmin',
                    'opacity': '1',
                    'backgroundColor': 'rgba (240,240,240, 0.9)',
                    'zIndex': '20',

                })
                // stl(stageinfo, iStyle('text'), {
                //     'position': 'fixed',
                //     'left': '30%',
                //     'top': '30%',
                //     'height': '20%',
                //     'width': '30%',
                //     'fontSize': G.Fontsiz1 + 'vmin',
                //     'opacity': '0',
                //     'backgroundColor': 'rgba (240,240,240, 0.6)',
                //     'zIndex': '20',

            // })
            stl(startbutton, iStyle('text'), {
                'position': 'fixed',
                //'textAlign': 'center',
                'left': '30%', // 30 ORIGIN
                'top': '50%',
                'height': '20%',
                'width': '30%',
                'fontSize': G.Fontsiz2 + 'vmin',
                'backgroundColor': 'rgba (240,240,240, 0.6)',
                'zIndex': '20',
                'opacity': '0',


            })
            stl(startbuttonBg, iStyle('text'), {
                'position': 'fixed',
                'left': '30%',
                'top': '50%',
                'height': '20%',
                'width': '30%',
                'fontSize': G.Fontsiz2 + 'vmin',
                'backgroundColor': 'rgba (240,240,240, 0.6)',
                'zIndex': '10',
                'textShadow': '-12px 8px 40px rgba(254,254,254,1), 9px 8px 40px rgba(254,254,254,1), 9px -10px 40px rgba(254,254,254,1)',
                'opacity': '0',

            })
            let instructions = '';

            if (G.upgrade.nameOfplayer) { instructions += G.upgrade.nameOfplayer + " , " + G.TXT.theseAre }
            instructions += G.TXT.instructions0 + '<br>'
            instructions += extraInstructions;

            stageinfo.innerHTML = instructions;
            startbutton.innerHTML = G.TXT.beginLevel + "  &nbsp &nbsp" + G.upgrade.playerLevel
            startbuttonBg.innerHTML = startbutton.innerHTML;
            Id('galleryContainer').appendChild(stageinfo)
            Id('galleryContainer').appendChild(startbutton)
            Id('galleryContainer').appendChild(startbuttonBg)
            if (storeInLocal('check')) { Id('galleryContainer').appendChild(areYouHim) };
            StylelFader(stageinfo, 50, true);
            StylelFader(startbutton, 50, true);
            StylelFader(startbuttonBg, 50, true)
            flasher()
            startbutton.addEventListener('click', () => { initiateLevels() })
            areYouHim.addEventListener('click', () => {
                menu('iAmNot');
                G.ispause = true;
                pauseButton.src = "data/pause.png";
            })
            if ((G.isGun2 == true) && (G.upgrade.twoGunsUpgrade[1]) && (!G.upgrade.twoGunsUpgrade[3])) {
                G.isGun2 = false;
                gunHidesOrComesUp(-1, 2);
            }

            if (G.upgrade.playerLevel === G.finalLevel || G.upgrade.playerLevel === (G.finalLevel + 1)) {
                setTimeout(() => { togglePause(false, true) }, 1000)
            }

        }

        function initiateLevels(justVars = false) {
            if (!justVars) {
                clear('stageinfo');
                clear('startbutton');
                clear('startbuttonBg');
                clear('areYouHim');
                let gs = Id('gamesign');
                if (gs) { gs.remove(); };

                setTimeout(function() { moveCurtain('open'); }, 1)
                    // general values for all levels
            }
            G.targetsHit = 0;
            G.hitStreak = 0;
            if (!justVars) { G.isPlaying = true };
            G.gameType.moving = false;
            G.gameType.countdown = false;
            G.gameType.draw = false;
            G.gameType.static = false;
            G.gameType.hitWords = false;
            G.gameType.streak = false;
            /*level*/
            let Lvltype = getTypeOflevel(G.upgrade.playerLevel)
            let LvlChallange = Math.ceil((G.upgrade.playerLevel - 1) / 4);
            const baseTime = 70 //seconds
            const baseSubstTime = 5 // seconds to reduct
            const expoPertarget = 2;
            G.pointsPerTarget = (Math.pow(LvlChallange, 2) + 1);
            G.PenaltyPerTarget = Math.round(G.pointsPerTarget / 2);
            let stp = 30;
            stp = baseTime - (baseSubstTime * LvlChallange)
            stp += (G.upgrade.timesFailed * baseSubstTime)

            let t;
            switch (Lvltype) {
                case 1:
                    t = 12;
                    break;
                case 2:
                    t = 5;
                    break;
                case 3:
                    t = 15;
                    break;
                case 4:
                    t = 18;
                    break;
                case 5:
                    t = 10
            } // 5 15 18 10
            t += LvlChallange;
            G.targetsNeedHit = t - 1;
            if (Lvltype == 3) { G.targetsNeedHit -= 4 }

            if (justVars) { return G.targetsNeedHit }

            switch (Lvltype) {
                case 1: // free shooting 20 targets
                    G.gameType.moving = true;
                    //G.targetsNeedHit = 12

                    gunHidesOrComesUp(1, 1, 'up');
                    if (G.isGun2) { gunHidesOrComesUp(1, 2, 'up') }
                    stopWatch();
                    buildMovementLevel();
                    setWord();
                    break;
                case 2: // draw 3 targets vs time
                    G.gameType.draw = true;
                    G.gameType.static = false
                    G.gameType.countdown = true;
                    //G.targetsNeedHit = 5 // should be more
                    stopWatch(stp);
                    builddrawlevel()

                    break;

                case 3: // moving && timer
                    G.gameType.moving = true;
                    //G.targetsNeedHit = 5
                    gunHidesOrComesUp(1, 1, 'up');
                    if (G.isGun2) { gunHidesOrComesUp(1, 2, 'up') }
                    stopWatch(stp);
                    buildMovementLevel();
                    setWord();
                    break;
                case 4: // 9 targets hit at least 20 && time;

                    G.gameType.draw = false;
                    G.gameType.static = true
                    G.gameType.countdown = true;
                    stopWatch(stp);
                    build9staticLevel();
                    setWord();
                    break;
                case 5: // moving hit 10 streak;
                    G.gameType.streak = true;
                    G.gameType.moving = true;
                    //G.targetsNeedHit = 2 // streak;
                    gunHidesOrComesUp(1, 1, 'up');
                    if (G.isGun2) { gunHidesOrComesUp(1, 2, 'up') }
                    stopWatch(stp);
                    buildMovementLevel();
                    setWord();
                    break;
            }
            var tableObject = {}
            tableObject.player_level = G.upgrade.playerLevel;
            tableObject.Lvltype = getTypeOflevel();
            tableObject.Leveltype = LvlChallange;
            tableObject.stoper = stp;


        }
        if (finish) { endLevel() } else if (!timeup) { curtainScreen() }

    }

    /* the program: */

    setGlobal();
    setTXT();
    storeInLocal('load');
    buildMedia();
    G.isGun2 = false;
    if (G.upgrade.twoGunsUpgrade[3]) { G.isGun2 = true }


    visuaGamelLoader(false)
    setTimeout(function() { checkLoadstatus(); }, 1000); //need this to get the randomizer to work