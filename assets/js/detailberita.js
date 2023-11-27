import { CihuyWithoutToken } from "https://c-craftjs.github.io/simpelbi/api.js";

function populateNews(data) {
  const sortedData = data.sort(
    (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
  );
  const selectedData = sortedData.slice(0, 3);
  const newsContainer = document.getElementById("newsContainer");

  selectedData.forEach((item) => {
    const article = document.createElement("div");
    article.className = "w-33percent flex mb-30 px-15 md:w-full";
    article.innerHTML = `
        <article class="lqd-lp relative lqd-lp lqd-lp-style-16 text-start post-${item.id_berita_spmi} post type-post status-publish format-standard has-post-thumbnail hentry category-blog-single tag-beauty">
          <!-- ... Your news content structure ... -->
        </article>
      `;
    newsContainer.appendChild(article);
  });
}

// Fetch data from the API
const apiUrl = "https://simbe-dev.ulbi.ac.id/api/v1/databeritaspmi/";
CihuyWithoutToken(apiUrl, (error, data) => {
  if (error) {
    console.error("Error fetching data:", error);
  } else {
    populateNews(data.data);
  }
});
