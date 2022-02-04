const overview = document.querySelector(".overview");
const username = "Stef612";

const repoList =  document.querySelector(".repo-list");

const getUserInfo = async function(){
    const profile = await fetch(`https://api.github.com/users/${username}`);
    const data = await profile.json();
    console.log(data);
    displayUser(data);
};
getUserInfo();
const displayUser = function(data)
{
    const div = document.createElement("div");
    div.innerHTML=`
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(div);
}
const getRepoInfo = async function(){
    const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const data = await repos.json();
    console.log(data);
    displayRepos(data);
};
getRepoInfo();
const displayRepos = function (data){
    for (let repo of data){
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    } 
};