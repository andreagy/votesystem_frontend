/*!
* Start Bootstrap - Heroic Features v5.0.6 (https://startbootstrap.com/template/heroic-features)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-heroic-features/blob/master/LICENSE)
*/
// This file is intentionally blank

// Use this file to add JavaScript to your project


// this is the backend URL, you shoud add the endpoint and create a new string.
const backendURL = "https://dcff-194-110-231-227.ngrok-free.app";

document.addEventListener("DOMContentLoaded", fillTopics);


// this is the main topics holder div, add the builded topics to this element.
const mainTopicHolderDiv = document.getElementById('main-topics-holder');


//function here that adds all the topics to the main-topics-holder div
async function fillTopics() {
    const url = backendURL + "/api/getTopics";
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
        const topicContainer = document.createElement('div');
        topicContainer.className = 'col-lg-12 mb-5';
        const cardBorder = document.createElement('div');
        cardBorder.className = 'card bg-light border-0 h-100';
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-left p-4 p-lg-5 pt-0 pt-lg-0';
        const feature = document.createElement('div');
        feature.className = 'feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4';
        const icon = document.createElement('i');
        icon.className = 'bi bi-collection';
        const header = document.createElement('h2');
        header.className = 'fs-4 fw-bold';
        header.innerHTML = topic['Title'];
        const text = document.createElement('p');
        text.className = 'mb-0';
        text.innerHTML = topic['Description'];

        cardBody.appendChild(feature);
        cardBody.appendChild(icon);
        cardBody.appendChild(header);
        cardBody.appendChild(text);

        cardBorder.appendChild(cardBody);
        topicContainer.appendChild(cardBorder);
        mainTopicHolderDiv.appendChild(topicContainer);

    }

}

// function here that opens the single topic details page

