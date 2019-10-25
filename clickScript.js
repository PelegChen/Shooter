
/* script for communicating with the Click educational website" */
// user id // helpLink // username  + firstname // api game // URL //
function Id_(TheID){
    return document.getElementById(TheID);
};
function Elm_(idname, type0){
    let testIt = Id_(idname);
    if (Is(testIt)) return testIt;
    type0 = type0 || 'div'
    let newElem = document.createElement(type0);
    newElem.id = idname;
    return newElem

}
function stl_(p_elem, p_styles, p_styles2 = {}) {
    let x;
    for (x in p_styles) {
        p_elem.style[x] = p_styles[x];
    }
    for (x in p_styles2) {
        p_elem.style[x] = p_styles2[x];
    }
    p_elem.draggable = false; // maybye cancell ??
    p_elem.onselectstart = function(){ return false };
}
function returnSvg ()  {
    //viewBox="0 0 121 126"
    //width="121pt"
    //height="126pt"
    let svg = `<svg id="rubicClickSVG" viewBox="0 0 150 156">
        <g >  <path style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#7f7f7f;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 75.559089,2.3441803 L 149.19953,25.309391 L 143.98485,116.52764 L 75.855009,155.35372 L 6.9527389,116.50278 L 0.95273842,24.923112 L 75.559089,2.3441803 z "
        />  <path style="opacity:0.9;fill:#3465A7;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 125.60745,35.715968 L 124.53039,65.901819 L 103.17762,76.264509 L 103.79484,44.700558 L 125.60745,35.715968 z "
        />  <path style="opacity:0.9;fill:#CC0001;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000143;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 100.00474,24.909622 L 124.69538,32.687346 L 102.41846,41.518767 L 78.069269,32.673832 L 100.00474,24.909622 z "
        />  <path style="opacity:0.9;fill:#FDE84F;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000215;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 23.329959,35.465938 L 45.481529,44.462012 L 46.281259,76.031739 L 24.301809,65.743079 L 23.329959,35.465938 z "
        />  <path style="opacity:0.9;fill:#FDE84F;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000215;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 24.329859,69.454839 L 46.401219,79.487239 L 47.187899,108.91715 L 25.514319,97.751289 L 24.329859,69.454839 z "
        />  <path style="opacity:0.9;fill:#3465A7;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 124.39369,69.566259 L 123.32262,98.072289 L 102.54567,108.72991 L 102.81959,79.981919 L 124.39369,69.566259 z "
        />  <path style="opacity:0.9;fill:#3465A7;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 122.96189,101.86462 L 121.55471,127.72309 L 100.2795,139.92168 L 102.15827,113.16084 L 122.96189,101.86462 z "
        />  <path style="opacity:0.9;fill:#3465A7;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 143.80791,90.279069 L 142.18059,116.26531 L 124.66543,125.85072 L 125.87789,100.35862 L 143.80791,90.279069 z "
        />  <path style="opacity:0.9;fill:#3465A7;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 144.87994,59.946589 L 143.81922,86.866109 L 126.51386,96.682819 L 127.02344,68.662539 L 144.87994,59.946589 z "
        />  <path style="opacity:0.9;fill:#3465A7;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 147.13472,26.430711 L 145.75932,56.150959 L 127.8246,64.708959 L 128.54397,34.485929 L 147.13472,26.430711 z "
        />  <path style="opacity:0.9;fill:#CC0001;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 120.84875,18.112797 L 145.41326,24.924269 L 127.55206,31.982387 L 103.36968,23.786857 L 120.84875,18.112797 z "
        />  <path style="opacity:0.9;fill:#CC0001;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 94.793178,9.7841231 L 118.60282,17.162198 L 99.398628,22.961601 L 77.566029,15.815 L 94.793178,9.7841231 z "
        />  <path style="opacity:0.9;fill:#CC0001;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 76.146799,3.3542793 L 93.536459,8.9070381 L 74.604809,14.989743 L 57.041439,8.8606911 L 76.146799,3.3542793 z "
        />  <path style="opacity:0.9;fill:#CC0001;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 74.319969,16.444821 L 97.699278,23.780758 L 74.886589,32.034833 L 52.109959,24.049089 L 74.319969,16.444821 z "
        />  <path style="opacity:0.9;fill:#CC0001;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 55.211879,9.7002971 L 72.276099,15.801274 L 49.987879,23.11894 L 31.669649,16.735035 L 55.211879,9.7002971 z "
        />  <path style="opacity:0.9;fill:#CC0001;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 75.316459,33.647249 L 99.325118,42.451686 L 74.939049,51.544909 L 49.959669,42.510232 L 75.316459,33.647249 z "
        />  <path style="opacity:0.9;fill:#CC0001;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 49.303029,24.626463 L 72.262759,32.69665 L 47.352219,41.47519 L 23.946229,32.650303 L 49.303029,24.626463 z "
        />  <path style="opacity:0.9;fill:#CC0001;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 29.146019,17.357476 L 47.049379,23.990542 L 22.348629,31.720153 L 3.3167584,25.318561 L 29.146019,17.357476 z "
        />  <path style="opacity:0.9;fill:#FDE84F;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 2.2349784,26.035941 L 21.239279,34.536941 L 22.455639,65.368599 L 4.3858589,55.720729 L 2.2349784,26.035941 z "
        />  <path style="opacity:0.9;fill:#FDE84F;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 4.4097489,59.690579 L 22.687169,68.870849 L 23.477569,96.977599 L 6.1963189,86.040589 L 4.4097489,59.690579 z "
        />  <path style="opacity:0.9;fill:#FDE84F;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 6.0346289,90.988529 L 24.394189,101.66176 L 24.436979,124.77007 L 7.7871889,115.88018 L 6.0346289,90.988529 z "
        />  <path style="opacity:0.9;fill:#FDE84F;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 47.974269,45.682661 L 72.721069,54.986799 L 72.531929,87.625519 L 48.733029,76.384739 L 47.974269,45.682661 z "
        />  <path style="opacity:0.9;fill:#FDE84F;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 48.716779,80.541989 L 72.562669,91.930899 L 72.750709,123.451 L 49.137979,110.09118 L 48.716779,80.541989 z "
        />  <path style="opacity:0.9;fill:#FDE84F;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 49.725929,114.26275 L 72.663409,126.72967 L 73.281809,152.88988 L 49.711549,139.18115 L 49.725929,114.26275 z "
        />  <path style="opacity:0.9;fill:#3465A7;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 75.612529,87.496679 L 99.556178,77.188609 L 100.37097,45.353026 L 75.768929,54.987529 L 75.612529,87.496679 z "
        />  <path style="opacity:0.9;fill:#3465A7;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 75.783669,121.91666 L 98.625628,110.12618 L 100.01839,81.015499 L 75.803299,91.363539 L 75.783669,121.91666 z "
        />  <path style="opacity:0.9;fill:#3465A7;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 76.086129,153.48391 L 98.019688,140.81621 L 98.464048,114.33469 L 75.469389,126.41039 L 76.086129,153.48391 z "
        />  <path style="opacity:0.9;fill:#FDE84F;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25000072;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" d="M 26.271529,102.34271 L 46.380199,112.92375 L 47.774979,137.98857 L 26.645339,126.48472 L 26.271529,102.34271 z "
        /></g>
    </svg>`;
    return svg
}
function addStyleSheetCss () {

    var css = `
    :root{
        --main-click-move-X:30vmin;
        --main-click-move-Y:-13vmin;
        --main-click-base-X:-30vmin;
    }

    .showClickStripOpen{

        animation-name:clickStripOpen;
        animation-duration: 2s;
        animation-fill-mode: forwards;
    }

    .showClickStripClose {
        animation-name: clickStripClose;
        animation-duration: 1.5s;
        animation-fill-mode: forwards;

    }
    .showClickBoxOut {
        animation-name: clickClose;
        animation-duration: 0.8s;
        animation-fill-mode: forwards;

    }
    .showClickBoxIn{
        animation-name:clickOpen;
        animation-duration: 2s;
        animation-fill-mode: forwards;
    }
    .showClickStripUp{
        animation-name: clickStripUp;
        animation-duration: 1s;
        animation-fill-mode: forwards;

    }




    @keyframes clickClose {
  0% {left: 0%; bottom: 0%;}
  50% {left: 0%; bottom: -13%;  }
  95%   {left: -16.5% ;bottom: -13%; }
  100%  {left: -16.5% ;bottom: -13%; }

  }
    @keyframes clickOpen {
  0%  {left: -16.5% ;bottom: -13%; }
  10% {left: 0%; bottom: -13%;  }
  25% {left: 0%; bottom: 0%;}
  100% {left: 0%; bottom: 0%;}

  }

  @keyframes clickStripUp {
0%  {left: 0.0% ;bottom: -13%; }
10% {left: %; bottom: -13%;  }
40% {left: 0%; bottom: 0%;}
100% {left: 0%; bottom: 0%;}

}

  @keyframes clickStripClose {
  0% {left: 0%; bottom: -13%; }
  15% {left: 0%; bottom: -13%; }
  50% {left: 0%; bottom: -13%;  }
  95%   {left: -16.5% ;bottom: -13%; }
  100%  {left: -16.5% ;bottom: -13%; }

  }
  @keyframes clickStripOpen {
  0%  {left: -16.5% ;bottom: -13%; }
  10% {left: 0%; bottom: -13%;  }
  25% {left: 0%; bottom:-13%;}
  100% {left: 0%; bottom:-13%;}

  }
   .clickPsudoClassSwitch {}
  `
    var style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
    }
function buildClickInterface (firstName, lastName, userName) {
    const greyColor = `rgba(150,150,150)`
    var isCubeAlwaysShown = true;
    //isCubeAlwaysShown =false;
    let clickWrapper = Elm_ ('clickWrapper');
    stl_(clickWrapper,{position:"fixed" ,  width: "20%", bottom: "-13%",left: "-16.6%", height: "20%", background:'yellow', zIndex:1000 ,  direction: "rtl", fontFamily: 'Arial', fontSize: "2.5vmin", opacity:1, borderRadius:"0.5vmin",overflow:"hidden", boxShadow: "0.5vmin 0.5vmin 3vmin 1vmin rgba(0,0,0,.8)"})
    let clickContainer = Elm_ ('clickContainer ');
    stl_(clickContainer ,{ width: "100%", height: "100%", background:'yellow' , fontFamily: 'Arial', opacity:1, borderRadius:"1vmin"})
    let svg = returnSvg()
    let clickHeader = Elm_('clickHeader'); stl_(clickHeader,{ top:"0%", width: "100%", height: "27%", background:'gold' , padding: "2%",whiteSpace: "nowrap" ,overflow:"ellipsis"})
    let clicBody = Elm_('clicBody'); stl_(clicBody,{ top: clickHeader.style.height, width: "100%", height: "60%" , padding: "2%"})
    let cube = Elm_ ('clickCube'); cube.innerHTML = svg ; stl_(cube,{float:"right" , display: 'inline-block'})
    let clickHeaderText = Elm_ ('clickHeaderText'); stl_(clickHeaderText,{float:"right" , display: 'inline-block', height: "87%",  width: "78%", paddingRight: '2%', margin: '2%', whiteSpace: "nowrap" ,textOverflow:"ellipsis", overflow:"hidden"})
    let clickCheckBoxIsAlwaysOpen =  Elm_ ('clickCheckBoxIsAlwaysOpen')
    let check = clickCheckBoxIsAlwaysOpen;check.style.fontSize = "2.8vmin" ; check.style.transform =  'scaleY(0.8)'; check.style.cursor = 'pointer' ; check.style.letterSpacing = '-0.1vmin';check.innerHTML = '<b><span id="clickAutoHide" style= color:'+ greyColor +' ;">מוקטן לפינה</span>&nbsp&nbsp&nbsp<span id="clickAlwaysOpen">גלוי תמיד</span> &nbsp&nbsp&nbsp&nbsp &nbsp&nbsp <span id="clickHelpLink" style="text-align:left ; color:#0000CD"> עזרה </span>'
    check.style.color = 'black'
    //type="checkbox" name="vehicle1" value="Bike"
    let clickBodyText  = Elm_ ('clickBodyText '); stl_ ( clickBodyText, {height: "10%", whiteSpace: "nowrap" ,textOverflow:"ellipsis", overflow:"hidden"})
    clickBodyText.style.height = "70%"
    clickHeader.appendChild(cube) ; clickHeader.appendChild(clickHeaderText );
    clickHeaderText.innerHTML = '<b><span style="font-size:3.5vmin; text-shadow:0.1vmin 0.1vmin #585858, 0.2vmin 0.2vmin #585858; ">' + ' קליק ' + "</span > <span id ='clickheaderMessage' style=' white-space: nowrap; text-overflow:ellipsis'></span>" + "<span id ='clickheaderMessageWorking'></span></b>"
    clickContainer.appendChild(clickHeader)
    clickContainer.appendChild(clicBody)
    clicBody.appendChild(clickBodyText) //check
    clicBody.appendChild(check)
    clickWrapper.appendChild (clickContainer)
    document.body.appendChild (clickWrapper)

    Id_('rubicClickSVG').style.width = "5.5vmin"
    Id_('clickheaderMessage').style.fontSize = '2.5vmin'
    Id_('clickheaderMessage').innerHTML = "שלום יוסי !" + " האתר נטען בהצלחה, ועכשיו אתה מחובר אליו"
    clickBodyText.innerHTML = "<b>" + 'מחובר בתור יוסי עומסי' + "</b>"
    clickBodyText.innerHTML += 'משתמש: Yosimksfdhjk'+ "" + "במשחק יריות גליעה למטרה" + "עוד הרבה מלל שלא באמת יכול להיכנס לכאן וחבל שכך או בעצם טוב שכך"
    const timeTocloseBox = 2000; // 4000 .  use 2000 for testing
    var closeTimer = '' //setTimeout(closeClickBox,timeTocloseBox)
    var dontReopenYet = false;

    Id_('clickHelpLink').addEventListener("click", function(event) {
        alert ('help')
    })
    Id_('clickAlwaysOpen').addEventListener("click", function(event){
        isCubeAlwaysShown = true;
        stl_(Id_('clickAlwaysOpen'),{color:"black"})
        stl_(Id_('clickAutoHide'),{color:greyColor})
    }) //clickAutoHide
    Id_('clickAutoHide').addEventListener("click", function(event){
        isCubeAlwaysShown = false;
        stl_(Id_('clickAlwaysOpen'),{color:greyColor})
        stl_(Id_('clickAutoHide'),{color:"black"})})

    clickWrapper.addEventListener("mouseover", function(event){;
        if (isCubeAlwaysShown) {return}
        if (dontReopenYet){return}
        if (clickWrapper.classList.contains('showClickStripOpen')){
            clickWrapper.classList.remove('showClickBoxOut');
            clickWrapper.classList.remove('showClickStripOpen')

            clickWrapper.classList.add('showClickStripUp'); return



        } else { clickWrapper.classList.add('showClickBoxIn');clickWrapper.classList.remove('showClickBoxOut')  }

        if(closeTimer){clearTimeout(closeTimer)};  closeTimer = setTimeout(closeClickBox,timeTocloseBox)
    })
    function closeClickBox () {
        if (isCubeAlwaysShown) {return}
        dontReopenYet = true
        clickWrapper.classList.add('showClickBoxOut');
        clickWrapper.classList.remove('showClickBoxIn');
        clickWrapper.classList.remove('showClickStripUp');
        setTimeout(()=>{dontReopenYet = false},1500)

    }

    if (isCubeAlwaysShown) { clickWrapper.classList.add('showClickBoxIn'); stl_(Id_('clickAlwaysOpen'),{color:"black"})
    stl_(Id_('clickAutoHide'),{color:greyColor}) } else { stl_(Id_('clickAlwaysOpen'),{color:greyColor})
    stl_(Id_('clickAutoHide'),{color:"black"})}


}
function showForBrief (ms = 4000){
    let closeStrip=() =>{
        clickWrapper.classList.remove('showClickStripOpen')
        if (clickWrapper.classList.contains('showClickStripOpen')) {return}
        clickWrapper.classList.add('showClickStripClose')
    }

    let clickWrapper = Id_ ('clickWrapper'); //clickWrapper.classList.add('showClickBoxOut')
    if (clickWrapper.classList.contains('showClickBoxIn')){return}
    clickWrapper.classList.remove('showClickBoxOut');
    clickWrapper.classList.remove('showClickStripClose')
    clickWrapper.classList.add('showClickStripOpen')
    setTimeout(closeStrip,ms)
}
function clickIconFlicker (cycles = 4) {
    if (Id_('clickCube').classList.contains('clickPsudoClassSwitch') ){alert ('alreadyclicking'); return}
    Id_('clickCube').classList.add('clickPsudoClassSwitch') ;
    var cycleCount = 1
    function changeClickIconColor (ms){
        let reHue = (deg) => {
            degtrs = (Math.sin(deg) * 50) + 50

            let fltr =  "invert(" + degtrs +"%) "//"hue-rotate("+ deg + "deg)"
            Id_('clickCube').style.filter = fltr
            deg += 0.3 ;
            if (deg > 11) {deg = 4.5;cycleCount++}
            if (cycleCount > cycles ){
                Id_('clickCube').classList.remove('clickPsudoClassSwitch')
                return
            }
            d = deg

            setTimeout (()=>{reHue (d)}, ms)
        }
        reHue (4)
    }
    changeClickIconColor (30)
}
buildClickInterface ();
addStyleSheetCss ();
clickIconFlicker (5);
function getLocalStorage () {
    const items = {...localStorage}
//    console.log (items)
}
getLocalStorage ()

// from stackOverflow:

function onStorageEvent(storageEvent){
    console.log(storageEvent);
}

window.addEventListener('storage', onStorageEvent, false);
//window.dispatchEvent( new Event('storage') )
// setTimeout(clickIconFlicker ,3220)
// setTimeout(clickIconFlicker ,6220)

//Id_('clickWrapper').style.left = 0;
//Id_('clickWrapper').style.bottom = 0;
