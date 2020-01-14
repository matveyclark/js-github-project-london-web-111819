// GLOBAL VARIABLES / CONSTANTS

const searchURI = 'https://api.github.com/search/users?q='
const repoURI = 'https://api.github.com/users/'
const usersList = document.querySelector('#user-list')
const searchForm = document.querySelector('#github-form')
const repoList = document.querySelector('#repos-list')

// API FUNCTIONS

function get(url, username) {
    return fetch(url + username)
    .then(response => response.json())
}

function show(url, username) {
    return fetch(url + username + '/repos')
    .then(resp => resp.json())
}
// FUNCTIONS

function createCardForUsers(user) {
    let div = document.createElement('div')
    let h1 = document.createElement('h1')
    h1.textContent = user.login
    let description = document.createElement('p')
    let repoLink = document.createElement('a')
    repoLink.href = user.repos_url
    repoLink.textContent = 'Repos'
    description.append(repoLink)
    div.append(h1, description)
    usersList.appendChild(div)
    repoLink.addEventListener('click', renderAllUserRepos)
}

function createRepoLink(repo) {
    let li = document.createElement('li')
    li.textContent = repo.name
    repoList.appendChild(li)
}

function findUsersAndRender(event) {
     event.preventDefault()
     get(searchURI, event.target.search.value)
    .then(users => {
        users.items.forEach(createCardForUsers)
    })
}

function renderAllUserRepos() {
    show(repoURI, 'matveyclark')
    .then(repos => {
        repos.forEach(createRepoLink)
    })
}

// EVENT LISTENERS
searchForm.addEventListener('submit', findUsersAndRender)