/*!
* Start Bootstrap - Heroic Features v5.0.6 (https://startbootstrap.com/template/heroic-features)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-heroic-features/blob/master/LICENSE)
*/
// This file is intentionally blank

// Use this file to add JavaScript to your project

// this is the backend URL, you shoud add the endpoint and create a new string.
const backendURL = "https://dcff-194-110-231-227.ngrok-free.app";

document.getElementById('SubmitTopicBttn').addEventListener('submit', CreateNewTopic);
document.addEventListener("DOMContentLoaded", fillTopics);
//document.addEventListener("DOMContentLoaded", fillSingleTopics); // change later as needed

// this is the main topics holder div, add the builded topics to this element.
const mainTopicHolderDiv = document.getElementById('VotesGroup');

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
        topicContainer.className = 'list-group-item';

            const cardBorder = document.createElement('h5');
            cardBorder.className = 'mb-1 fs-4';
            cardBorder.innerText = topic.Title;

            const textTime = document.createElement('p');
            textTime.className = 'text-muted';
            textTime.innerHTML = "Time: "+topic['StartTime'];

            const cardBody = document.createElement('div');
            cardBody.className = 'd-flex justify-content-start';
                const Span = document.createElement('span');
                Span.className = 'me-2 badge bg-success p-2 fs-6';
                Span.innerText = 'Yes: 10'; //change for the correct json attribute +topic['yes']
                const Span2 = document.createElement('span');
                Span2.className = 'me-2 badge bg-danger p-2 fs-6';
                Span2.innerText = 'No: 2';  //change for the correct json attribute +topic['no']
                const Span3 = document.createElement('span');
                Span3.className = 'me-2 badge bg-warning p-2 fs-6';
                Span3.innerText = 'Abstain: 0'; //change for the correct json attribute +topic['abstain']

        cardBody.appendChild(Span);
        cardBody.appendChild(Span2);
        cardBody.appendChild(Span3);
        topicContainer.appendChild(cardBorder);
        topicContainer.appendChild(textTime);
        topicContainer.appendChild(cardBody);

        mainTopicHolderDiv.appendChild(topicContainer);
    }
} //Done!
// function here that opens the single topic details page
/*
async function fillSingleTopics(){
    const TopicID = document.querySelector('#exampleFormControlInput1').value;
    const url = backendURL + "/api/getTopic/"+TopicID;

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

}
// function here that creates a new topic

 */
async function CreateNewTopic(){
    //evt.preventDefault(); // Prevent the default form submission behavior

    const Title = document.querySelector('#topicTitle').value;
    const Description = document.querySelector('#topicDescription').value;
    const StartDate = document.querySelector('#startTime').value;
    const EndDates = document.querySelector('#endTime').value;

    const formData = {
        Title: Title,
        Description: Description,
        StartDate: StartDate,
        EndDates: EndDates,
    };

    try {
        const endpoint = backendURL + "/api/createTopic";
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