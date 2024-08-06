console.log('Client side javascript file is loaded!')

const btn = document.getElementById('btn');
const input = document.getElementById('in');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const location = input.value;

    msg1.innerText = 'Loading......';
    msg2.innerText = '';
    const url = `/weather?address=${encodeURIComponent(location)}`;

    fetch(url).then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.error) {
                msg1.innerText = data.error;
            }
            else {
                msg1.innerText = data.location;
                msg2.innerText = data.forcast;
            }
        });
});