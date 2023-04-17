const input = document.querySelector('input')
const result = document.querySelector('.result')
const loading = document.querySelector('#loading')
const errorModal = document.querySelector('.modal')
const close = document.querySelector('.close')
const errorMessage = document.querySelector('.errorMessage')
const tableHeader = document.querySelector('th')
const tableColumns = document.querySelectorAll('td')
close.addEventListener('click', ()=> {
    errorModal.style.display = 'none'
    errorMessage.textContent = ''
})
input.addEventListener('keyup', (event)=>{
    if (event.key == 'Enter') {
        result.className = 'result'
        result.style.display = 'none'
        loading.classList.add('loading')
        const location = input.value
        fetch('http://api.weatherapi.com/v1/current.json?key=6f3d7d1ad12e426ea1e105058222803&q='+location)
        .then(res => {
            errorModal.style.display = 'none'
            errorMessage.textContent = ''
            res.json().then(data => {
                if (data.error) {
                    errorModal.style.display = 'block'
                    errorMessage.textContent = data.error.message;
                    loading.classList.remove('loading');
                } else {
                    result.style.display = 'block'
                    loading.classList.remove('loading');
                    result.classList.add('box');
                    addResponseToTable(data);
                }
            })
        })
        .catch(err=>{
            errorModal.style.display = 'block';
            errorMessage.textContent = err.error.message;
            loading.classList.remove('loading');
        })
    }
})
function addResponseToTable(data) {
    tableHeader.textContent = data.location?.name;
    let display = data.current?.condition?.text?.toLowerCase();
    let boxClass = display === 'sunny' ? 'sunny' : display?.includes('clear') ? 'clear' : display?.includes('cloudy') || display?.includes('overcast') ? 'cloudy' :
                    display?.includes('rain') || display?.includes('drizzle') ? 'rain' : display?.includes('snow') ? 'snow' : 'fog';
    result.classList.add(boxClass);
    valueArray = [data.location?.localtime, data.current?.condition?.text, data.current?.temp_c,
        `${data.location?.region}, ${data.location?.country}`, `Winds: ${data.current?.wind_kph} ${data.current?.wind_dir}`,
        `Humidity: ${data.current?.humidity}`];
    let index = 0;
    for(let column of tableColumns) {
        column.textContent = valueArray[index++];
        if (index === 2) {
            const img = document.createElement('img');
            img.src = data.current?.condition?.icon;
            column.appendChild(img);
        }
    }
}