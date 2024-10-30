/*eslint-disable*/
const locations = JSON.parse(document.getElementById("map").dataset.locations);
console.log(locations)
mapboxgl.accessToken =
"pk.eyJ1IjoiYnJpYW5tdWpqdW5pIiwiYSI6ImNtMnZqczhwZzBmcHIycXNoNWNhamUxNDMifQ.x-DYXkpc8_yIALACV0dKPw";

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 1,
    center: [30, 15]
});