
// Copyright (c) 2017-2019 Chen Peleg
//config js with game comunication ##########
G = {};
// the global data object

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
   let myFileName = location.pathname.split("/").slice(-1)

   G.fileName = myFileName[0].replace(/\.html/ig,"")
   G.saveInLocalStorageKey = 'English_' + G.fileName
   G.saveBooleanValue = 'wasSaved_' + G.fileName


   var urlParams = new URLSearchParams(window.location.search);
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
   if (urlParams.has('api')) {
       if (urlParams.has(G.saveInLocalStorageKey)){
           const isSavedInSession = sessionStorage.getItem(G.saveBooleanValue);
           if (isSavedInSession == 'true') {
               //console.log ('exist In Session Storage')

           } else if (urlParams.has( G.saveInLocalStorageKey)) {

               let loadedGame = JSON.parse(urlParams.get( G.saveInLocalStorageKey));
               sessionStorage.setItem(G.saveInLocalStorageKey, JSON.stringify(loadedGame));
               sessionStorage.setItem(G.saveBooleanValue, 'true')
              // console.log ('game Saved In Session Storage')

           }

       } else {G.isClickGameSaveInSessionStore = true}



       getClicktScript (urlParams.get('api'), urlParams.toString())
   } else {console.log ('no Click site Connection')}

   if (urlParams.has( 'userFullName')){
       G.clickFullNameOfUser = urlParams.get( 'userFullName')
       if (sessionStorage.getItem(G.saveInLocalStorageKey)) {
           let savedGameFromSS = JSON.parse(sessionStorage.getItem(G.saveInLocalStorageKey))
           if (savedGameFromSS.nameOfplayer === G.clickFullNameOfUser ){}
           else {console.log ('not the same player');  sessionStorage.setItem(G.saveBooleanValue, 'false')}
       }
   }
