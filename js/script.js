const overview = document.querySelector(".overview"); // Let's target profile information
const repoList = document.querySelector(".repo-list");
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
};

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const showData = await fetchRepos.json();
    displayRepos(showData);
};

gitRepos();

const displayRepos = function(repos) {
    for(const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};