/*!
* Start Bootstrap - Full Width Pics v5.0.6 (https://startbootstrap.com/template/full-width-pics)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-full-width-pics/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
const backendURL = "https://dcff-194-110-231-227.ngrok-free.app";

document.addEventListener("DOMContentLoaded", fillRegisteredESPs);
document.addEventListener("DOMContentLoaded", fillUnassignESPs);
document.getElementById('unassignButton').addEventListener('click', UnassignESPs);
document.getElementById('unassignAllButton').addEventListener('click', UnassignAllESPs);
document.getElementById('SubmitButton').addEventListener('click', submitRegistrationESPs);
//document.addEventListener('submit', submitRegistrationESPs);

// function here to get all the devices and fill the form select with the device options
async function fillRegisteredESPs() {
    try {
        const url = backendURL + "/api/getRegisteredESPs";
        console.log(url);
        const response = await fetch(url, {
            headers: {
                'Access-Control-Allow-Origin': backendURL,
                'Access-Control-Allow-Headers': '*',
                'ngrok-skip-browser-warning': 'true',
            }, mode: 'cors'
        });
        if (!response.ok) {
            throw new Error('Invalid URL or failed to fetch data.');
        }
        const json = await response.json();
        console.log('Result:', json);
        const topicContainer = document.getElementById('registeredSEPSs'); // Consider changing to 'form'
        for (const esp of json) {
            const espInfoElement = document.createElement('div');
            espInfoElement.textContent = `${esp.DeviceIndex}`;
            topicContainer.appendChild(espInfoElement);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
// function here to get all the devices and fill the form select with the device options
async function fillUnassignESPs() {
    try {
        const url = backendURL + "/api/getUnassignedESPs";
        console.log(url);
        const response = await fetch(url, {
            headers: {
                'Access-Control-Allow-Origin': backendURL,
                'Access-Control-Allow-Headers': '*',
                'ngrok-skip-browser-warning': 'true',
            }, mode: 'cors'
        });
        if (!response.ok) {
            throw new Error('Invalid URL or failed to fetch data.');
        }
        const json = await response.json();
        console.log('Result:', json);
        const topicContainer = document.getElementById('SelectDeviceForm');
        for (const esp of json) {
            const espInfoElement = document.createElement('option');
            espInfoElement.textContent = `${esp.DeviceIndex}`;
            topicContainer.appendChild(espInfoElement);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
// function here that Unassign one ESPs
async function UnassignESPs() {
    try {
        const DeviceID = document.querySelector('#registeredSEPSs').value;

        const endpoint = backendURL + "/api/unassignESP";
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ espID: DeviceID }),
        });

        if (!response.ok) {
            throw new Error(`Failed to submit data. Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Server response:', responseData);
        window.alert("ESP unassigned successfully.");
    } catch (error) {
        console.error('Error submitting data:', error.message);
        window.alert("Failed to unassign ESP. Please try again.");
    }
}
// function here that Unassign ALL ESPs
async function UnassignAllESPs() {
    try {
        const endpoint = backendURL + "/api/unassignAllESPs";
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to submit data. Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log('Server response:', responseData);
        window.alert("All ESP unassigned successfully.");
    } catch (error) {
        console.error('Error submitting data:', error.message);
        window.alert("Failed to unassign ESP. Please try again.");
    }
}
// function here to handle register form submit
async function submitRegistrationESPs(){
    //evt.preventDefault(); // Prevent the default form submission behavior

    const usernameValue = document.querySelector('#exampleFormControlInput1').value;
    const espIDValue = document.querySelector('#SelectDeviceForm').value;

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