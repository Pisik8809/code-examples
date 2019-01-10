//clever input

const inputArea = document.getElementById('input');
const section = document.getElementsByClassName('our-input')[0];
//console.log(section);
const action = document.getElementById('action');
const currentButton = document.getElementById('current');
$('#action').on('click', function() {
    let currentData = $('#input').val();
    currentButton.innerHTML = currentData;
    let currentDataLength = currentButton.textContent.length;
    console.log(currentDataLength);
    for (let i = 0; i < currentDataLength; i++) {
        inputArea.value += '  ';
    }
    let fantomEl = document.createElement('span');
    fantomEl.classList.add('fly');
    fantomEl.innerHTML = currentData;
    section.appendChild(fantomEl);
    let currentWidth = fantomEl.offsetWidth;
    console.log(currentWidth);
    fantomEl.style.left += currentWidth + 'px';
    //inputArea.value = '';
});

//clever adress

var ourNode = document.querySelector('.fa-ul>li+li+li+li+li');
console.log(ourNode.textContent);
var ourAdress1 = ourNode.textContent;
var firstAdressPart = ourAdress1.split(' ');
firstAdressPart.splice(2, 0, "<br>");
var nextAdress = firstAdressPart.join(' ');
console.log(firstAdressPart);
console.log(nextAdress);
ourNode.innerHTML = nextAdress;
ourNode.insertAdjacentHTML('beforeEnd', '<br>маг. 2: пл. Павловская 2;');

var adressNode = document.getElementsByClassName('address')[0];
adressNode.style.marginTop = '-10px';
adressNode.insertAdjacentHTML('afterbegin', '<h5><i class="fa fa-map-marker-alt"></i><span>Наш адрес</span></h5>');

var firstPhone = document.querySelector('.phone>.show-phone.dropdown-toggle.show-after.padding>span');
firstPhone.removeAttribute('onclick');
var firstPhoneText = firstPhone.textContent;
firstPhone.textContent = '';
var newPhoneLink = document.createElement('a');
newPhoneLink.textContent = firstPhoneText;
newPhoneLink.setAttribute('href', `tel:${firstPhoneText}`);
firstPhone.appendChild(newPhoneLink);

var mailIcon = document.getElementsByClassName('fa-envelope')[0];
var mailTextNode = $(mailIcon).parent();
var mailText = mailIcon.nextSibling.textContent;
var newMailLink = document.createElement('a');
newMailLink.textContent = mailText;
newMailLink.setAttribute('href', `mailto:${mailText}`);
console.log(newMailLink);
mailTextNode.html(function() {
    return '<i class="fa fa-envelope"></i>' + '<a href="' + newMailLink + '">' + mailText + '</a>';
});

var phoneIcon = document.getElementsByClassName('fa-phone')[0];
var phoneTextNode = $(phoneIcon).parent();
var phoneText = phoneIcon.nextSibling.textContent;
var newPhoneLink = document.createElement('a');
newPhoneLink.textContent = phoneText;
newPhoneLink.setAttribute('href', `tel:${phoneText}`);
console.log(newPhoneLink);
phoneTextNode.html(function() {
    return '<i class="fa fa-phone"></i>' + '<a href="' + newPhoneLink + '">' + phoneText + '</a>';
});

//img picker

var input = document.querySelector('#image_uploads');
var preview = document.querySelector('#pop-up_img-picker');

input.style.opacity = 0;
input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
    /*while(preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }*/

    var curFiles = input.files;
    if (curFiles.length === 0) {
        var para = document.createElement('p');
        para.textContent = 'No files currently selected for upload';
        preview.appendChild(para);
    } else {
        /*var list = document.querySelector('#pop-up_img-picker');
        preview.appendChild(list);*/
        for (var i = 0; i < curFiles.length; i++) {
            var firstTag = document.createElement('a');
            firstTag.setAttribute('href', '#');
            firstTag.onclick = function(e) {
                event.preventDefault();
            }
            var secondTag = document.createElement('figure');
            var imgText = document.createElement('figcaption');
            if (validFileType(curFiles[i])) {
                imgText.textContent = 'File name: ' + curFiles[i].name.substring(0,

                        16) + ', file size ' + returnFileSize(curFiles[i].size) +
                    '.';
                var image = document.createElement('img');
                image.style.width = 120 + 'px';
                image.src = window.URL.createObjectURL(curFiles[i]);
                secondTag.appendChild(image);
                secondTag.appendChild(imgText);
                firstTag.appendChild(secondTag);
            } else {
                imgText.textContent = 'File name ' + curFiles[i].name + ': Not a valid file type. Update your selection.';
                firstTag.appendChild(imgText);
            }

            preview.appendChild(firstTag);
        }
    }
}
var fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
]

function validFileType(file) {
    for (var i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true;
        }
    }

    return false;
}

function returnFileSize(number) {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number > 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number > 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}


var xhr = new XMLHttpRequest();

xhr.open("POST", 'http://reducetpromos.com/manager-panel/get-uploads?route=', true);

xhr.send();


if (xhr.status != 200) {
    // обработать ошибку
    console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: 

    Not Found
} else {
    // вывести результат
    console.log(xhr.responseText); // responseText -- текст ответа.
}

//sticky nav menu

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var nav = document.getElementsByTagName('nav')[0];

    window.onscroll = function() {
        var scrolled = window.pageYoffset || document.documentElement.scrollTop;
        var target = nav;

        if (scrolled > 0) {
            target.style.position = 'fixed';
            target.style.top = 0 + 'px';
            target.style.left = 0 + 'px';
            target.style.right = 0 + 'px';
            target.style.zIndex = 2;
        } else {
            target.style.position = 'static';
        }

    }

}

//create "to top" button

function creatLink() {
    var newButton = document.createElement('button');
    document.body.appendChild(newButton);
    newButton.innerHTML = '<i class="fa fa-lg fa-arrow-up"></i>';
    newButton.style.width = '50px';
    newButton.style.height = '40px';
    newButton.style.background = 'transparent';
    newButton.style.textDecoration = 'none';
    newButton.style.padding = '5px 10px';
    newButton.style.position = 'fixed';
    newButton.style.zIndex = '1000';
    newButton.style.bottom = '25px';
    newButton.style.right = '40px';

    function scrollTop() {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 777);
    }
    newButton.addEventListener('click', scrollTop);
}


creatLink();
