import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

const APIKEY = '1e98a1e15bbc0d1c8b6db372b9b094aa';
let resultatAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement')


if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {

    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    AppelAPI(long,lat);

  }, () => {
    alert('You refused the geolocalisation, the Weather App cannot work, Please active it !')
  })
}

function AppelAPI(long,lat) {
  
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=en&appid=${APIKEY}`)
  .then((reponse) => {
    return reponse.json();
  })
  .then((data) => {

    resultatAPI = data;

    temps.innerText = resultatAPI.current.weather[0].description;
    temperature.innerText = `${Math.trunc(resultatAPI.current.temp)}°`;
    localisation.innerText = resultatAPI.timezone;

    // les heures , par tranche de 3, avec leur temperature.

    let heureActuelle = new Date().getHours();

    for(let i = 0; i < heure.length; i++) {
      
      let heureIncr = heureActuelle + i * 3;

      if(heureIncr > 24) {
          heure[i].innerText = `${heureIncr - 24} h`;
      } else if(heureIncr === 24) {
        heure[i].innerText = '00 h'
      } else {
        heure[i].innerText = `${heureIncr} h`; 
      }
    }


      // temp pour 3 heures

      for(let j = 0; j < tempPourH.length; j++) {
        tempPourH[j].innerText = `${Math.trunc(resultatAPI.hourly[j * 3].temp)}°`
      }


      // trois premières lettres des jours 

      for(let k = 0; k < tabJoursEnOrdre.length; k ++) {
        joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
      }

      // Temp par jour

      for(let m = 0; m < 7; m++) {
        tempJoursDiv[m].innerText = `${Math.trunc(resultatAPI.daily[m + 1].temp.day)}°`
      }

      // Icone dynamique

      if(heureActuelle >= 6 && heureActuelle < 21) {
        imgIcone.src = `ressources/jour/${resultatAPI.current.weather[0].icon}.svg`
      } else {
        imgIcone.src = `ressources/nuit/${resultatAPI.current.weather[0].icon}.svg`
      }

      chargementContainer.classList.add('disparition');

  })

}