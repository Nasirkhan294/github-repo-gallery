const overview = document.querySelector(".overview"); // profile information target point
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