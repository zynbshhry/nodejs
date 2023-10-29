




const x=document.querySelector('#weather')
var city = 'Mashhad'
var counrtry='Iran'
async function getWeather(lat,lon){
    try{
        let lon=59.60
        let lat=36.29
        let apiKey = "68f6096cba2a4aa8d78d433294ca4ae3"
        let apiUrl ="https://api.openweathermap.org/data/2.5/weather?";
        const res=await fetch(`${apiUrl}lat=${lat}&lon=${lon}&lang=fa&appid=${apiKey}&units=metric` ,{
            method:'GET',
            contentType:'application/json'
        })
        const data=await res.json()
        console.log(data)
    }catch(err){
        console.log(err)
    }
} 
const successMessage = (position) => {
  console.log(position);
  };
  const errorMessage = (error) => {
  console.log(error);
  };
  navigator.geolocation.getCurrentPosition(successMessage, errorMessage);  
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}
getLocation()
