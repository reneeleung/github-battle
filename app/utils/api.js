import axios from 'axios';

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username) {
    return axios.get(`https://api.github.com/users/${username}${params}`)
        .then(({ data }) => data); // using arrow functions for anonymous functions and destructuring .then((user) => user.data);
}

function getRepos(username) {
    return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

function getStarCount(repos) {
    return repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore({ followers }, repos) {
    var totalStars = getStarCount(repos);
    return followers * 3 + totalStars;
}

function handleError(error) {
    console.warn(error);
    return null;
}

function getUserData(player) {
    return Promise.all([ /* Babel polyfill 'Promise' if web browser doesn't support it */
        /* Array of promises (asynchronous) */
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos]) => (/* implicit return */ {
        profile: profile,
        score: calculateScore(profile, repos)
    }));
}

function sortPlayers(players) {
    return players.sort((a,b) => b.score - a.score);
}

/* Notice not using 'export default' */
/* import fetchPopularRepos from '../api' (if use export default) */
/* import { fetchPopularRepos } from '../api' (if use export) */

export function battle (players) {
    return Promise.all(/* promises */ players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError);
}

export function fetchPopularRepos (language) {
    var encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    return axios.get(encodedURI)
        .then(({ data }) => data.items);
}
