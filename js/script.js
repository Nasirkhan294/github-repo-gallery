const overview = document.querySelector(".overview"); // Let's target profile information
const repoList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const username = "Nasirkhan294";

const githubGallery = async function () {
    const userdata = await fetch(`https://api.github.com/users/${username}`);
    const data = await userdata.json();
    githubUserData(data);
};

githubGallery();

const githubUserData = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt = "user avatar" src = ${data.avatar_url}/>
    </figure >
    <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(div);
    gitRepos(username);
};

const gitRepos = async function (username) {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const showData = await fetchRepos.json();
    displayRepos(showData);
};



const displayRepos = function(repos) {
    filterInput.classList.remove("hide");
    for(const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(e) {
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function(repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languagesData = await fetchLanguages.json();

    const languages = [];
    for(let language in languagesData) {
        languages.push(language);
        displaySpecificRepo(repoInfo, languages)
    }
};

const displaySpecificRepo = function(repoInfo, languages) {
    backToReposButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allRepos.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
};

backToReposButton.addEventListener("click", function() {
    allRepos.classList.remove("hide");
    repoData.classList.add("hide");
    backToReposButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchInput = e.target.value;
    const repos = document.querySelectorAll(".repo");
    for(const repo of repos) {
        if(!repo.innerText.toLowerCase().includes(searchInput.toLowerCase())) {
            repo.classList.add("hide");
        } else {
            repo.classList.remove("hide");
        }
    }
});

