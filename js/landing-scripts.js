/*!
* Start Bootstrap - Full Width Pics v5.0.6 (https://startbootstrap.com/template/full-width-pics)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-full-width-pics/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
document.addEventListener("DOMContentLoaded", fillRegisteredESPs);
document.addEventListener('submit', submitRegistrationESPs);

// function here to get all the devices and fill the form select with the device options
async function fillRegisteredESPs() {
    const url = backendURL + "/api/getRegisteredESPs";
    console.log(url);
    const response = await fetch(url, {
        headers: {
            'Access-Control-Allow-Origin': backendURL,
            'Access-Control-Allow-Headers': '*',
            'ngrok-skip-browser-warning': 'true',
        }, mode: 'cors'
    });
    if (!response.ok) throw new Error('Invalid url!');
    const json = await response.json();
    console.log('result', json);
    for (const topic of json) {
        const topicContainer = document.createElement('form-select'); //consider changing to 'form'
        topicContainer.className = 'col-lg-12 mb-5';
        const cardBorder = document.createElement('div');
        cardBorder.className = 'card bg-light border-0 h-100';
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center p-4 p-lg-5 pt-0 pt-lg-0';
        const feature = document.createElement('div');
        feature.className = 'feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4';
        const icon = document.createElement('i');
        icon.className = 'bi bi-collection';
        const header = document.createElement('h2');
        header.className = 'fs-4 fw-bold';
        header.innerHTML = "Device: "+topic['DeviceID'];
        const text = document.createElement('p');
        text.className = 'mb-0';
        text.innerHTML = "MacAddress: "+topic['MacAddress'];

        cardBody.appendChild(feature);
        cardBody.appendChild(icon);
        cardBody.appendChild(header);
        cardBody.appendChild(text);

        cardBorder.appendChild(cardBody);
        topicContainer.appendChild(cardBorder);
        mainTopicHolderDiv.appendChild(topicContainer);
    }
}

// function here to handle register form submit
async function submitRegistrationESPs(){
    evt.preventDefault(); // Prevent the default form submission behavior

    const usernameValue = document.querySelector('#username').value;
    const espIDValue = document.querySelector('#espID').value;

    const formData = {
        username: usernameValue,
        espID: espIDValue,
    };

    try {
        const endpoint = backendURL + "/api/assignUserToESP";
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error(`Failed to submit data. Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log('Server response:', responseData);
        window.alert("User assigned to ESP successfully.");
    } catch (error) {
        console.error('Error submitting data:', error.message);
    }
}