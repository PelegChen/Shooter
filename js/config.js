
// Copyright (c) 2017-2019 Chen Peleg
//config js with game comunication ########## english translate
G = {}; // the global data object
   G.guntype = '2';
   G.targetHeight = 22 //in precentage 20 regular, 30 - big
   G.basicSpeedOfTargets = 14 // 14 - regular, 20 - slower,
   G.Fontsiz1 = 3.5 // current
   G.Fontsiz2 = 7;
   G.Fontsiz3 = 4;
   G.Fontsiz4 = '210%';
   G.Fontsiz5 = '250%';
   G.Fontsiztimer = 5;
   G.Fontsizstage = 4.6;
   G.FontsiznewImprov = 3
   G.devMode = false; // developer mode => esc = endlevel




   G.fileName = location.pathname.split("/").slice(-1)[0].replace(/\.html/ig,"")
   G.saveInLocalStorageKey = G.fileName
   function activateClick (){

       async function getClicktScript(url, urlGetPrams) {
           urlGetPrams += "&gameName=" +  G.saveInLocalStorageKey
           let response = await fetch(url + "?" + urlGetPrams , {
               method: 'GET',
               mode: 'cors',
               cache: 'no-cache',
               credentials: 'same-origin',
               headers: {
                   'Content-Type': 'text/plain',
               },
               redirect: 'follow',
               referrer: 'no-referrer',
           })
           let responseScript = await response.text();
           let script = document.createElement('script');
           script.innerHTML =  responseScript ;//responseScript    // "clickScript.js"
           document.body.appendChild(script)
       }
       function loadGameFrom (source){
           if (source === 'ls') {
               // default loads from css;
           }
           if (source === 'clear') {
               localStorage.setItem(G.saveInLocalStorageKey,false)
           }
           if (source === 'url'){
               let loadedGame = JSON.parse(urlParams.get( G.saveInLocalStorageKey));
               localStorage.setItem(G.saveInLocalStorageKey, JSON.stringify(loadedGame));
           }

       }
       const urlParams = new URLSearchParams(window.location.search);
       const lsString = localStorage.getItem(G.saveInLocalStorageKey)
       const saveFromSS = lsString ? JSON.parse(lsString) : false
       const saveFromURL = urlParams.get(G.saveInLocalStorageKey) || false;
       const urlName = urlParams.get('userFullName') ?  urlParams.get('userFullName') : false
       const lsName = saveFromSS.nameOfplayer || false;
       if (!urlParams.has('api')) {
           console.log('%c no site Connection - game saved on this PC \n אין חיבור לאתר, המשחק ישמר על מחשב זה', 'font-family:david; font-size: 3vmin; background: gold; color:blue;');
           G.saveInLocalStorageKey = G.fileName + "_Local";
           G.isClickGameSaveInSessionStore = false;
           return
       }

       if (saveFromURL && saveFromSS && (urlName === lsName) ){
           const urlTime = Number(saveFromURL.lst_) || 0
           const lsTime =  Number(saveFromSS.lst_) || 0
           const higher = Math.max(urlTime,lsTime)
           if (higher === lsTime) {loadGameFrom ('ls')}
           else if (higher === urlTime) {loadGameFrom ('url')}

       } else if (saveFromSS && (urlName === lsName)) {
           loadGameFrom ('ls')
       } else if (saveFromURL) {
           loadGameFrom ('url')
       } else if (urlName){
           G.clickFullNameOfUser = urlName;
           loadGameFrom ('clear')
       }
       G.isClickGameSaveInSessionStore = true;
       getClicktScript (urlParams.get('api'), urlParams.toString())
   }
   activateClick ()
