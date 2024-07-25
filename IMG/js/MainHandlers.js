try {
    var id = new URL(window.location.href).searchParams.get('id');
    var diff = new URL(window.location.href).searchParams.get('d');
    var mods = new URL(window.location.href).searchParams.get('m');
    setMapState(id,diff,mods);
} catch (error) {
    console.log(error);
}

async function setMapState(id,diff,modifiers) {
    let SongCard = document.getElementById("SongCard");

    try {
    const response = await fetch(`https://spi.hawk.quest/api/bs/id/${id}`);
    const data = await response.json();
    console.log(data);

    SongCard.querySelector(".SongCover").style.background = `url('https://eu.cdn.beatsaver.com/${data.versions[0].hash.toLowerCase()}.jpg') 50% 50% / cover`;
    SongCard.querySelector(".SongBoxBG").style.background = `url('https://eu.cdn.beatsaver.com/${data.versions[0].hash.toLowerCase()}.jpg') 50% 50% / cover`;
    SongCard.querySelector(".SongArtist").innerText = data.metadata.levelAuthorName;
    SongCard.querySelector(".SongName").innerText = data.metadata.songName;
    SongCard.querySelector(".SongMapper").innerText = data.metadata.songAuthorName;
    SongCard.querySelector(".SongKey").innerText = data.id;
    SongCard.querySelector(".SongLength").innerText = fancyTimeFormat(data.metadata.duration);

    let diffText, diffColor;
    switch (diff.toLowerCase()) {
        case "1":
            diffText = "Easy";
            diffColor = "#008055";
            break;
        case "2":
            diffText = "Normal";
            diffColor = "#1268A1";
            break;
        case "3":
            diffText = "Hard";
            diffColor = "#BD5500";
            break;
        case "4":
            diffText = "Expert";
            diffColor = "#B52A1C";
            break;
        case "5":
            diffText = "Expert+";
            diffColor = "#454588";
            break;
    }

    SongCard.querySelector(".DiffBox").style.background = diffColor;
    SongCard.querySelector(".DiffName").innerText = diffText;

    if (modifiers) {
    SongCard.querySelector(".ModifiersBox").style.background = diffColor;
    SongCard.querySelector(".ModifiersText").innerText = modifiers;
    SongCard.querySelector(".ModifiersBox").style.opacity = "1";
    }

    } catch (error) {
        console.error(error);
    }
}

function saveImg() {
    //Set html2canvas options
    html2canvas(document.querySelector("#Wrapper"), {
        allowTaint: true,
        useCORS: true,
        backgroundColor: null,
    }).then(canvas => {
        //Save image as png
        var link = document.createElement('a');
        link.download = 'song.png';
        link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        link.click();
    });
}