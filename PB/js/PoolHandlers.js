async function setPool(hash, diff, modifiers) {
    let SongCard = document.getElementById("SongCard").cloneNode(true);

    try {
        const response = await fetch(`https://spi.danesaber.cf/api/bs/hash/${hash}`);
        const data = await response.json();

        SongCard.querySelector(".SongCover").style.background = `url('https://eu.cdn.beatsaver.com/${hash.toLowerCase()}.jpg') 50% 50% / cover`;
        SongCard.querySelector(".SongBoxBG").style.background = `url('https://eu.cdn.beatsaver.com/${hash.toLowerCase()}.jpg') 50% 50% / cover`;
        SongCard.querySelector(".SongArtist").innerText = data.metadata.levelAuthorName;
        SongCard.querySelector(".SongName").innerText = data.metadata.songName;
        SongCard.querySelector(".SongMapper").innerText = data.metadata.songAuthorName;
        SongCard.querySelector(".SongKey").innerText = data.id;
        SongCard.querySelector(".SongLength").innerText = fancyTimeFormat(data.metadata.duration);
    } catch (error) {
        console.error(error);
    }

    SongCard.classList.add(`SongCard${hash}`);
    SongCard.querySelector(".BlurBox").classList.add(`BlurBox${hash}`);
    SongCard.querySelector(".SongPicker").classList.add(`SongPicker${hash}`);

    let diffText, diffColor;
    switch (diff.toLowerCase()) {
        case "easy":
            diffText = "Easy";
            diffColor = "#008055";
            break;
        case "normal":
            diffText = "Normal";
            diffColor = "#1268A1";
            break;
        case "hard":
            diffText = "Hard";
            diffColor = "#BD5500";
            break;
        case "expert":
            diffText = "Expert";
            diffColor = "#B52A1C";
            break;
        case "expertplus":
        case "expert+":
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

    SongCard.style.opacity = "1";
    document.getElementById("Songs").appendChild(SongCard);
}

function setPoolLoop(hash, diff, modifiers) {
    for (let i = 0; i < hash.length; i++) {
        setTimeout(function () {
            if (modifiers) {
            setPool(hash[i], diff[i], modifiers[i]);
            } else {
            setPool(hash[i], diff[i]);
            }
        }, 100 * i);
    }
    
    setTimeout(function () {
        document.getElementById("Songs").style.opacity = "1";
    }, 1500);
}

function guidv4(data) {
    const isGUIDV4 = /^([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)$/i.test(data);
    return isGUIDV4;
}

function setBanned(hash) {
    document.getElementsByClassName(`BlurBox${hash}`)[0].style.background = "rgb(149 27 27 / 48%)";
    document.getElementsByClassName(`SongPicker${hash}`)[0].style.background = "linear-gradient(180deg, #ff6161, #DF8585) border-box;";
    document.getElementsByClassName(`SongPicker${hash}`)[0].style.opacity = "1";
}


function setPicked(hash) {
    document.getElementsByClassName(`BlurBox${hash}`)[0].style.background = "rgb(40 149 27 / 48%)";
    document.getElementsByClassName(`SongPicker${hash}`)[0].style.background = "rgb(40 149 27 / 48%)";
    document.getElementsByClassName(`SongPicker${hash}`)[0].style.opacity = "1";
}

function setMapState(hash, state, actor) {
    const SongCard = document.getElementsByClassName(`SongCard${hash}`)[0];
    const BlurBox = SongCard.getElementsByClassName(`BlurBox${hash}`)[0];
    const Picker = SongCard.getElementsByClassName(`SongPicker${hash}`)[0];
    let image;
    if (guidv4(actor) || MatchType == "PS") {
        if (actor == TeamIDs[0]) {
            image = TeamImages[0];
        } else if (actor == TeamIDs[1]) {
            image = TeamImages[1];
        }
    } else {
        if (actor == PlayerIDs[0]) {
            image = PlayerImages[0];
        } else if (actor == PlayerIDs[1]) {
            image = PlayerImages[1];
        }
    }

    if (state === 'Pick') {
        Picker.src = image;
        Picker.style.opacity = "1";
        BlurBox.style.background = "rgb(40 149 27 / 48%)";
    } else if (state === 'Ban') {
        Picker.src = image;
        Picker.style.opacity = "1";
        BlurBox.style.background = "rgb(149 27 27 / 48%)";
    } else if (state === 'Tiebreaker') {
        Picker.src = './Images/Tiebreaker.png';
        Picker.style.opacity = "1";
        BlurBox.style.background = "rgb(40 149 27 / 48%)";
    }
}