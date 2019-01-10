//beacon
var target = null;
var targetStatus = false;

function smartInterval() {
    if (!target) {
        ultraInterval = setInterval(checkTarget, 200);
    }
}
smartInterval();

function checkTarget() {
    //console.log('function checkTarget in progress...');
    target = document.querySelector('.lp_desktop');
    if (!target) {
        return targetStatus = false;
    } else {
        //clearThisInterval();
        handleChatText();
        return targetStatus = true;
    }
}

function clearThisInterval() {
    //console.log('function clearThisInterval have worked');
    clearInterval(ultraInterval);
}

function handleChatText() {
    var submitButton = document.querySelector('.lp_submit_button');
    if (submitButton) {
        submitButton.onclick = function() {
            var errorsText = document.querySelectorAll('.lp_surveyError_wrapper');
            if (errorsText.length > 0) {
                for (var i = 0; i <= errorsText.length; i++) {
                    errorsText[i].style.display = "block";
                }
            }
        }
    }
    var ourTextBlock = document.querySelector('.lp_lpview_title.lp_title');
    var ourTextTitles = document.querySelectorAll('.lp_top-text');
    if (ourTextBlock) {
        ourTextBlock.textContent = "Prepare your question and try to ask again";
        ourTextTitles[1].textContent = "See you later!";
    }

}

//gallery and video

var videoElem = document.getElementById("video");
var playButton = document.getElementById("playbutton");
var currentWidth = window.innerWidth;
var videoWrapper = document.getElementsByClassName('video-block__video_wrapper')[0];
var allBody = document.getElementsByTagName('html')[0];
var currentHeight = document.getElementsByTagName('html')[0].getBoundingClientRect().height;
var fullScreenButton = document.getElementById("fullScreen");

function fullScrennMode() {
    if (videoWrapper.classList.contains("fullscreenVideo")) {
        videoWrapper.classList.remove("fullscreenVideo");
        allBody.classList.remove("blackout");
        fullScreenButton.classList.remove("fullscreened");
        if (currentWidth < 1280) {
            fullScreenButton.style.bottom = "10px";
            fullScreenButton.style.top = "unset";
        }
    } else {
        var videoPosition = document.getElementById("video").getBoundingClientRect();
        videoWrapper.classList.add("fullscreenVideo");
        allBody.classList.add("blackout");
        fullScreenButton.classList.add("fullscreened");
        if (currentWidth < 1280) {
            fullScreenButton.style.bottom = "unset";
            fullScreenButton.style.top = videoPosition.top + (videoPosition.height + 10) + "px";
        }
    }
}

playButton.addEventListener('dblclick', fullScrennMode, false);
playButton.addEventListener("click", handlePlayButton, false);
//playVideo();
async function playVideo() {
    try {
        await videoElem.play();
        playButton.classList.add("playing");
        playButton.style.opacity = "0";
        if (playButton.classList.contains("paused")) {
            playButton.classList.remove("paused");
        }
    } catch (err) {
        playButton.className = "error";
    }
}

function handlePlayButton() {
    if (videoElem.paused) {
        window.addEventListener("keypress", handlePlayButton2, false);
        videoElem.setAttribute('muted', 'false');
        playVideo();
    } else {
        videoElem.pause();
        if (playButton.classList.contains("playing")) {
            playButton.classList.remove("playing");
        }
        playButton.classList.add("paused");
        playButton.style.opacity = "1";
    }
}

function handlePlayButton2(event) {
    event.preventDefault();
    var keyCode = event.keyCode;

    if (keyCode == 32) {
        if (videoElem.paused) {
            playVideo();
        } else {
            videoElem.pause();
            if (playButton.classList.contains("playing")) {
                playButton.classList.remove("playing");
            }

            playButton.classList.add("paused");
            playButton.style.opacity = "1";
        }
    }
}

window.onscroll = function() {
    if (window.scrollY > 2700) {
        videoElem.style.height = "100%";
        videoElem.style.width = "100%";
        videoElem.style.opacity = "1";
    } else {
        videoElem.removeAttribute('style');
    }
}

var bodyHeight = document.getElementsByTagName('body')[0].getBoundingClientRect().height; // document.body.scrollHeight
var bodyWidth = document.getElementsByTagName('body')[0].getBoundingClientRect().width;
var ourPopUp = document.getElementsByClassName('pop-up__block')[0];
var ourPopUpContent = document.getElementsByClassName('pop-up__block_content')[0];
var ourPopUpBanner = document.getElementsByClassName('pop-up__block_img')[0];
var ourPopUpText = document.getElementsByClassName('pop-up__block_text')[0];
var ourPopUpClose = document.getElementsByClassName('pop-up__block_close')[0];

ourPopUpContent.onclick = function(event) {
    event.stopPropagation();
};

var popUpGalleryImgsWrapp = document.getElementsByClassName('superposition');
var popUpGalleryImgsArray = Array.from(popUpGalleryImgsWrapp);

popUpGalleryImgsArray.forEach(function(currentValue) {
    currentValue.onclick = function(event) {
        event.stopPropagation();
        var currentImg = currentValue.children[1].children[0];
        var currentHTML = currentValue.children[2].innerHTML; // currentValue.children[2]
        ourPopUp.style.display = "flex";
        var viewportHeight = window.innerHeight;
        var viewportWidth = window.innerWidth;
        var coeficient = (viewportHeight / viewportWidth) * 100;

        if (coeficient < 65) {
            coeficient = 65;
        }
        if (device.mobile() && device.landscape()) {
            coeficient = 94;
            ourPopUp.style.position = "absolute";
        }

        var currentContentWidth = ourPopUpContent.getBoundingClientRect().width;
        ourPopUpContent.style.animationName = "blurCustomEffect";
        ourPopUpContent.style.animationDuration = "1.4s";
        ourPopUpContent.style.opacity = 1;
        ourPopUpContent.style.left;
        ourPopUpBanner.src = currentImg.src;
        ourPopUpBanner.style.width = coeficient + 'vw';
        var currentImgWidth = ourPopUpBanner.getBoundingClientRect().width;
        ourPopUpText.innerHTML = currentHTML;
        ourPopUpText.style.width = currentImgWidth + 'px';
        var currentContentHeight = ourPopUpContent.getBoundingClientRect().height;
        var difference = (viewportHeight - currentContentHeight) / 2;

        if (viewportWidth > 1760) {
            difference = 0;
        }

        ourPopUp.style.top = (-745 + difference) + "px";
    }
});

ourPopUpClose.onclick = function() {
    ourPopUp.style.display = 'none';
    ourPopUp.style.position = "fixed";
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;

    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
        ourPopUp.style.display = 'none';
        ourPopUp.style.position = "fixed";
        videoWrapper.classList.remove("fullscreenVideo");
        allBody.classList.remove("blackout");
    }
};

window.addEventListener("click", function(event) {
    var targetForEvent = event.target;

    if (targetForEvent !== ourPopUpContent && ourPopUp.style.display == "flex") {
        ourPopUp.style.display = 'none';
        ourPopUp.style.position = "fixed";
    }
});




document.addEventListener("DOMContentLoaded", function() {
    var mainVideoBlock = document.getElementsByClassName("video-block__video_wrapper")[0];
    var videoParrent = document.getElementsByClassName("video-block")[0];
    var videoHeight = mainVideoBlock.getBoundingClientRect().height;

    function createAdditionalVideo() {
        var scrollTop = window.pageYOffset;
        var currentScrollFromVideo = videoParrent.getBoundingClientRect().top;
        var startPoint = (-1 * currentScrollFromVideo);

        if (startPoint > videoHeight) {
            mainVideoBlock.classList.add('additional-video');
        } else {
            mainVideoBlock.classList.remove('additional-video');
        }
    };

    document.addEventListener("scroll", createAdditionalVideo);
    window.addEventListener("resize", createAdditionalVideo);
    window.addEventListener("orientationChange", createAdditionalVideo);
});
