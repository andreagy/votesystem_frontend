// this is the backend URL
const backendURL = "https://dcff-194-110-231-227.ngrok-free.app";

document.getElementById('SubmitTopicBttn').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    CreateNewTopic(); // Call the function to handle form submission
});
document.addEventListener("DOMContentLoaded", fillTopics);

// this is the main topics holder div, add the built topics to this element.
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
        },
        mode: 'cors'
    });

    if (!response.ok) throw new Error('Invalid url!');
    const json = await response.json();
    console.log('result', json);

    for (const topic of json) {

        const topicContainer = document.createElement('div');
        topicContainer.className = 'list-group-item';

        //Button expand
        const ButtonExpand = document.createElement('div');
        ButtonExpand.className = 'container mt-4';
        const ButtonExpand1 = document.createElement('p');
        ButtonExpand1.className = 'd-inline-flex gap-1 p-2';

        const ButtonExpand2 = document.createElement('a');
        ButtonExpand2.className = 'btn btn-primary';
        ButtonExpand2.innerText = 'Expand';
        ButtonExpand2.setAttribute('data-bs-toggle', 'collapse');
        ButtonExpand2.setAttribute('href', `#collapseTopic${topic.TopicID}`);
        ButtonExpand2.setAttribute('role', 'button');
        ButtonExpand2.setAttribute('aria-expanded', 'false');
        ButtonExpand2.setAttribute('aria-controls', 'collapseTopic');

        // Add an event listener to the topicContainer
        ButtonExpand2.addEventListener('click', () => {
            // Get the TopicID when the topic is clicked
            const topicID = topic.TopicID;
            console.log('Clicked TopicID:', topicID);
        });
        const url2 = backendURL + "/api/getVotes/"+topic.TopicID;
        console.log(url2);
        const response2 = await fetch(url2, {
            headers: {
                'Access-Control-Allow-Origin': backendURL,
                'Access-Control-Allow-Headers': '*',
                'ngrok-skip-browser-warning': 'true',
            },
            mode: 'cors'
        });

        if (!response2.ok) throw new Error('Invalid url!');
        const json2 = await response2.json();
        console.log('result', json2);

        const cardBorder = document.createElement('h5');
        cardBorder.className = 'mb-1 fs-4';
        cardBorder.innerText = topic.Title;

        const textTime0 = document.createElement('p');
        textTime0.className = 'mb-1';
        textTime0.innerText = topic.Description;

        const textTime = document.createElement('span');
        textTime.className = 'text-muted';
        textTime.innerHTML = "\t[" + topic['StartTime']+"]";

        const cardBody = document.createElement('div');
        cardBody.className = 'd-flex justify-content-start';

        // Count the votes for this topic
        let yesVotes = 0;
        let noVotes = 0;
        json2.forEach(data => {
            if (data.TopicID === topic.TopicID) {
                if (data.VoteType === "Yes") {
                    yesVotes++;
                } else if (data.VoteType === "No") {
                    noVotes++;
                }
            }
        });

        const Span0 = document.createElement('span');
        Span0.className = 'me-2';
        const Span = document.createElement('span');
        Span.className = 'me-2 badge bg-success p-2 fs-6';
        Span.innerText = 'Yes: ' + yesVotes;

        const Span2 = document.createElement('span');
        Span2.className = 'me-2 badge bg-danger p-2 fs-6';
        Span2.innerText = 'No: ' + noVotes;

        const ButtonExpand3 = document.createElement("div");
        ButtonExpand3.className = 'collapse'
        ButtonExpand3.setAttribute('id', `collapseTopic${topic.TopicID}`);
        const ButtonExpand4 = document.createElement("div");
        ButtonExpand4.className = 'card card-body'
        const ButtonExpand5 = document.createElement("div");
        ButtonExpand5.className = 'row'
        const ButtonExpand6 = document.createElement("div");
        ButtonExpand6.className = 'col'
        const ButtonExpand7 = document.createElement("ul");
        ButtonExpand7.className = 'list-group'

        // Loop through combinedData to display information about each user
        json2.forEach(userData => {
            const ButtonExpand8 = document.createElement("li");
            ButtonExpand8.className = 'list-group-item d-flex justify-content-between align-items-center';
            ButtonExpand8.innerHTML = 'User ID:\t' + userData.UserID;

            const voteTypeSpan = document.createElement("span");
            voteTypeSpan.className = 'badge';
            if (userData.VoteType === "Yes") {
                voteTypeSpan.classList.add('bg-success');
            } else {
                voteTypeSpan.classList.add('bg-danger');
            }
            voteTypeSpan.innerText = userData.VoteType;
            ButtonExpand8.appendChild(voteTypeSpan);
            ButtonExpand7.appendChild(ButtonExpand8);
        });

        ButtonExpand6.appendChild(ButtonExpand7);
        ButtonExpand5.appendChild(ButtonExpand6);
        ButtonExpand4.appendChild(ButtonExpand5);
        ButtonExpand3.appendChild(ButtonExpand4);
        ButtonExpand1.appendChild(ButtonExpand2);
        ButtonExpand.appendChild(ButtonExpand1);
        ButtonExpand.appendChild(ButtonExpand3);

        Span0.appendChild(Span);
        Span0.appendChild(Span2);
        cardBody.appendChild(Span0);
        textTime0.appendChild(textTime);
        topicContainer.appendChild(cardBorder);
        topicContainer.appendChild(textTime0);
        topicContainer.appendChild(cardBody);
        topicContainer.appendChild(ButtonExpand);

        mainTopicHolderDiv.appendChild(topicContainer);
    }
}
     //Done!
async function CreateNewTopic(){
        const Title = document.querySelector('#topicTitle').value;
        const Description = document.querySelector('#topicDescription').value;
        const rawStartTime = document.querySelector('#startTime').value;
        const rawEndTime = document.querySelector('#endTime').value;
        // Check if required fields are empty
        if (Title.trim() === '' || Description.trim() === '') {
            window.alert("Please fill out all required fields (Title and/or Description).");
            return; // Stop further execution if required fields are empty
        }
        // Function to format date and time strings into "YYYY-MM-DD HH:MM:SS" format
        const formatDateTime = (dateTimeString) => {
            const [datePart, timePart] = dateTimeString.split('T');
            const [year, month, day] = datePart.split('-');
            const [hour, minute] = timePart.split(':');
            return `${year}-${month}-${day} ${hour}:${minute}:00`;
        };
        // Format start time and end time
        const StartTime = formatDateTime(rawStartTime);
        const EndTime = formatDateTime(rawEndTime);

        const formData = {
            Title: Title,
            Description: Description,
            StartTime: StartTime,
            EndTime: EndTime,
        };

        try {
            console.log('Sending request...');
            const endpoint = backendURL + "/api/createTopic";
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`Failed to submit data. Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Server response:', responseData);
            window.alert("Topic create successfully");
            location.reload(true);
        } catch (error) {
            console.error('Error submitting data:', error.message);
        }
    }//Done!