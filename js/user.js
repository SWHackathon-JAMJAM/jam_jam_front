/* signIn, signUp */
const nextToPw = document.querySelector('#next');
const nextToPlay = document.querySelector('#next-done');

if (nextToPlay === null) {
    nextToPw.addEventListener('click', (event) => {
        // check name
        window.location = 'signIn.html';
    });
} else {
    nextToPlay.addEventListener('click', (event) => {
        // check pw
        window.location = 'gameStart.html';
    });
}