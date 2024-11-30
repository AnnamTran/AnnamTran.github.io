const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

const lost = urlParams.get('lost')
const loc = urlParams.get('loc')

if (lost){
    console.log('lost is present');
    fetch("https://tnv-ha.de/api/webhook/-U7ODD4hYj4kTEN6QMzjcrSJn", {mode: 'no-cors'}).then(
        (response) => window.location.href = '/lost/?loc=true');
} else {
    console.log('lost is absent!');
}


if (loc){
    console.log('loc is present');
    var btn = document.getElementById("locbutton");
    btn.style.display = 'block';
} else {
    console.log('loc is absent!');
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendPosition);
  } else {
    console.log('no location');
  }
}

function sendPosition(position) {
  var base_url = "https://tnv-ha.de/api/webhook/-U7ODD4hYj4kTEN6QMzjcrSJn?value1=";
  base_url = base_url + position.coords.latitude + "&value2=" + position.coords.longitude;
  fetch(base_url, {mode: 'no-cors'}).then(
        (response) => console.log('sent location'));
}
