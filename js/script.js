const overview = document.querySelector(".overview");
const username = "Stef612";

const repoList =  document.querySelector(".repo-list");

const repoClass = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");



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
};

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

repoList.addEventListener("click",function(e){
    if (e.target.matches("h3")){
        let repoName = e.target.innerHTML;
        //console.log(repoName);
        getRepo(repoName);
    }
})

const getRepo = async function(repoName){
    const repo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (let key in languageData){
        languages.push(key);
    }
    console.log(languages);
    displayRepo(repoInfo,languages);
};

const displayRepo = function(repoInfo,languages){
    repoData.innerHTML="";
    const div = document.createElement("div");
    div.innerHTML=`
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
    repoData.classList.remove("hide");
    repoClass.classList.add("hide");
}