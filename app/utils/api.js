import axios from 'axios';

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

async function getProfile(username) {
    const profile = await axios.get(`https://api.github.com/users/${username}${params}`)
    return profile.data;
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

async function getUserData(player) {
    const [profile, repos] = await Promise.all([ /* Babel polyfill 'Promise' if web browser doesn't support it */
        /* Array of promises (asynchronous) */
        getProfile(player),
        getRepos(player)
    ])
    return {
        profile: profile,
        score: calculateScore(profile, repos)
    }
}

function sortPlayers(players) {
    return players.sort((a,b) => b.score - a.score);
}

/* Notice not using 'export default' */
/* import fetchPopularRepos from '../api' (if use export default) */
/* import { fetchPopularRepos } from '../api' (if use export) */

export async function battle (players) {
    const results = await Promise.all(/* promises */ players.map(getUserData))
        .catch(handleError);
    
    return results === null
    ? results
    : sortPlayers(results);
}

export async function fetchPopularRepos (language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    const repos = await axios.get(encodedURI)
        .catch(handleError);
    return repos.data.items;
}
