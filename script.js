'use strict';

document.addEventListener('submit', async function(evt) {
    evt.preventDefault();
    const inputValue = document.querySelector('#input').value;
    try {
        //const proxy = 'https://cors-anywhere.herokuapp.com/';
        const proxy = 'https://api.allorigins.win/get?url=';
        const search = 'https://api.tvmaze.com/search/shows?q=' + inputValue;
        const url = proxy + (search);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Invalid input!');
        const json = await response.json();
        console.log('result', json);

        const s = document.getElementById('shows');
        for (const pic of json) {
            const show = pic['show'];
            const article = document.createElement('article');
            article.classList = ['card'];
            const h2 = document.createElement('h2');
            h2.innerHTML = show['name'];
            article.appendChild(h2);
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = show['image'] ?
                show['image']['medium'] :
                'https://via.placeholder.com/243x342?text=' + show['name'];
            img.alt = show['name'];
            figure.appendChild(img);
            const figcaption = document.createElement('figcaption');
            const a = document.createElement('a');
            a.href = show['url'];
            a.target = '_blank';
            a.innerHTML = 'Learn more';
            figcaption.appendChild(a);
            figure.appendChild(figcaption);
            const p = document.createElement('p');
            const p2 = document.createElement('p');
            let genres = '| ';
            for (const genre of show['genres']) {
                genres += genre + ' | ';
            }
            p2.innerHTML = (genres !== '| ') ? genres : '| (no genre given) |';
            p.innerHTML = show['summary'];
            article.appendChild(figure);
            article.appendChild(p2);
            article.appendChild(p);
            s.appendChild(article);
        }
    } catch (e) {
        console.log('error', e);
    }
});
