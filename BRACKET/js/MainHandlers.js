const relayIp = "wss://danesaber.cf:2224";

try {
    const TAsock = new WebSocket(relayIp);
    TAsock.onmessage = async (event) => {
        const jsonObj = JSON.parse(event.data);

        if (jsonObj.Type === "5") {
            if (jsonObj.command === "createUsers") {
                document.getElementById("TextBox").style.opacity = "0";
                
                setTimeout(() => {
                document.getElementById("RoundText").outerHTML = `<div id="RoundText" class="RoundText">${FormatText(jsonObj.Round)}</div>`;
                document.getElementById("TextBox").style.opacity = "1";
                }, 600);
                return;
            }
        }
    };
} catch (error) {
    console.log(error);
}