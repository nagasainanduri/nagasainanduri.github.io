let count = 0;
const loadingText = document.getElementById("loadingNumber");
const lcontent = document.querySelector(".lcontent");
const wiper = document.querySelector(".wiper");
const preLoader = document.querySelector(".pre-loader");
const loadingContainer = document.querySelector(".loading-container");

function updateLoading() {
    if (count < 100) {  
        count++;
        loadingText.textContent = count;
        setTimeout(updateLoading, 8);
    } else {
        triggerWipeEffect();
    }
}

function triggerWipeEffect() {

    const wipeOverlay = document.createElement("div");
    wipeOverlay.classList.add("wipe-overlay");
    lcontent.appendChild(wipeOverlay);
    wipeOverlay.style.animation = "wipe 1s ease-in-out forwards";

    setTimeout(() => {
        lcontent.innerHTML = '<div class="wipe-overlay"></div>INITIALIZING';
        wiper.style.animation = "wipeEffect 3s ease-in-out forwards";
        preLoader.style.animation = "fadeOut 2s ease-in-out 0.30s forwards";

        wiper.addEventListener("animationend", (event) => {
            if (event.animationName === "wipeEffect") {
                setTimeout(() => {
                    wiper.style.animation = "fadeOut 1s ease-in-out forwards";
                },);
            }
        });
        wiper.addEventListener("animationend", (event) => {
            if (event.animationName === "fadeOut") {
                loadingContainer.remove();
            }
        });

    }, 100);
}

updateLoading();
