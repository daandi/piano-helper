// The async IIFE is necessary because Chrome <89 does not support top level await.
(async function initPopupWindow() {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    

	const cookieList = document.getElementById("cookie-list");
    const tacDiv = document.getElementById("tac");


	if (tab?.url) {
		try {
			const domain = new URL(tab.url).host.replace('www','');
			const cookieListData = await chrome.cookies.getAll({ domain });
			fillCookieList(cookieListData, cookieList);

            const url = tab.url;
            const tacCookie = await chrome.cookies.get({ name: '__tac', url });
            const tacCookieData = decodeJWT(tacCookie.value);
            displayTAC(tacCookieData);



            const utpCookie = await chrome.cookies.get({ name: '__utp', url });
            const utpData = decodeJWT(utpCookie.value);
            displayUTP(utpData);

            displayAID(tacCookieData.aud);


		} catch (err){
			console.warn(err);
		}
	}

})();

function displayAID(aid) {
    const aidDiv = document.getElementById("aid");
    console.log(aid);
    aidDiv.textContent = aid
}

function displayTAC(tacData) {
    const tacDiv = document.getElementById("tac");
    const pre = document.createElement('pre');
    const tacWithJSONSub = {
        ...tacData,
        sub: JSON.parse(tacData.sub)
    };
    pre.textContent = JSON.stringify(tacWithJSONSub,null,2);

    tacDiv.appendChild(pre);
}

function displayUTP(utpData) {
    const utpDiv = document.getElementById("utp");
    const pre = document.createElement('pre');
    pre.textContent = JSON.stringify(utpData,null,2);

    utpDiv.appendChild(pre);
}

function fillCookieList(cookies, ulElement) {
	if (cookies && cookies.length > 0) {
		cookies.map((c) => {
			const li = document.createElement("li");
			li.appendChild(document.createTextNode(JSON.stringify(c)));
			ulElement.appendChild(li);
		});
	} else {
		const li = document.createElement("li");
		li.appendChild(document.createTextNode("No usable cookies."));
		ulElement.appendChild(li);
	}
}

function decodeJWT(token) {
    console.log(token);
    const data = token.split('.')[1];
    const payload = JSON.parse(atob(data)); // semi correct as it is not exactly atob but well enough in our context

    return payload;
}