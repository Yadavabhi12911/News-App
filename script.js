
const API_KEY = "463fa5282caf45fe871b8f468698c33e";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
  window.location.reload();
}

async function fetchNews(query){
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data =  await res.json();
  console.log(data);
  
  bindData(data.articles);
}
  
function bindData(articles){
  const cardsContainer = document.querySelector(".card-container");
  const newsCardTemplate = document.querySelector(".template-new-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if(!article.urlToImage) return;
      const cardClone = newsCardTemplate.content.cloneNode(true);
       fillDataInCard(cardClone, article);
      cardsContainer.appendChild(cardClone);
    
  });
}


function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;

function onNavItemClick(id){
const navItem = document.getElementById(id);
curSelectedNav?.classList.remove("active");
fetchNews(id);
curSelectedNav = navItem;
curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

// Run this code after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the body element
  const body = document.body;

  // Remove the horizontal scrollbar
  body.style.overflowX = "hidden";
  
});
