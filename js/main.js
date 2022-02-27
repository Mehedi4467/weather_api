

// search button 
const closeArrow = () => {
    document.getElementById('search').style.right = '-322px';

};
document.getElementById('search-button').addEventListener('click', () => {
    const searchBox = document.getElementById('search');
    searchBox.style.right = '0px';
});

// cell weather api


const weatherApi = async (value = 'dhaka') =>{
    const lowerCaseValue = value;
    console.log(value);
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=0c0ac9b70a2949eb935225029222602&q=${lowerCaseValue}&aqi=no`;
    const res = await fetch(weatherUrl);
    const weather = await res.json();
    const currentLocation = document.getElementById('location');
    const status = document.getElementById('status');
    const weatherIcon = document.getElementById('weather-icon');
    const temp = document.getElementById('temp');
    
    currentLocation.innerText =`${weather.location.name} ${weather.location.country}`;
    status.innerText = weather.current.condition.text;
    weatherIcon.src = weather.current.condition.icon;
    temp.innerText = weather.current.temp_c;

}


// country and city  match whith input name
const filterCountry = async (searchValue) =>{
    const countryUrl = 'https://countriesnow.space/api/v0.1/countries/population/cities';
    const res = await fetch(countryUrl);
    const countrys = await res.json();
    const searchMainBody = document.getElementById('search-main');
    searchMainBody.textContent = '';
    for (const citys of countrys.data){
        
        if(citys.city.toLowerCase().startsWith(searchValue) && searchValue !== ''){
            const div = document.createElement('div');
            div.classList.add('search-result');
            div.innerHTML = `
                <h5>${citys.city}</h5>
            `;
            searchMainBody.appendChild(div);
        }

    }
};



// get input value 
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', async () => {
    const searchValue = searchInput.value;
    const lowerCaseCountryValue = searchValue.toLowerCase();
    filterCountry(lowerCaseCountryValue);

});

// submit and search wether 

document.getElementById('search-main').addEventListener('click', event =>{
    const targetValue = event.target.innerText;
    weatherApi(targetValue);
    closeArrow();
    searchInput.value = '';
});

document.getElementById('submit').addEventListener('click', () => {
    let inputValue = searchInput.value.toLowerCase();
    if (isNaN(inputValue) && inputValue !== ''){
        weatherApi(inputValue);
        closeArrow();
        searchInput.value = '';
    }
});


weatherApi();

