import { CihuyWithoutToken } from "https://c-craftjs.github.io/simpelbi/api.js";

function populateTable(data) {
  const tableBody = document.getElementById("tableBody");

  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="py-2 px-4 border-b">${index + 1}</td>
        <td class="py-2 px-4 border-b">${item.judul}</td>
        <td class="py-2 px-4 border-b">${item.file}</td>

        <td class="py-2 px-4 border-b">
          <a href="${
            item.link_dokumen
          }" class="text-blue-500 hover:underline" download>Download</a>
        </td>
      `;
    tableBody.appendChild(row);
  });
  //
}
const apiUrlDataDokumen =
  "https://simbe-dev.ulbi.ac.id/api/v1/datakepuasanmahasiswa/";
CihuyWithoutToken(apiUrlDataDokumen, (error, data) => {
  if (error) {
    console.error("Error fetching data:", error);
  } else {
    populateTable(data.data);
    console.log(data.data);
  }
});

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
          <div class="lqd-lp-img rounded-4 overflow-hidden relative mb-2rem">
            <figure class="relative bg-cover bg-center w-full">
              <img width="720" height="400" src="${item.gambar}" class="w-full" alt="${item.judul}">
            </figure>
          </div>
          <header class="lqd-lp-header mb-1em">
            <h2 class="entry-title lqd-lp-title h5 m-0">${item.judul}</h2>
          </header>
          <div class="lqd-lp-excerpt mb-1em">
            <p>${item.isi}</p>
          </div>
          <footer class="lqd-lp-footer relative z-2">
            <a href="#" class="btn btn-naked uppercase tracking-0/1em size-sm font-bold lqd-lp-read-more items-center text-12">
              <span class="btn-line btn-line-before inline-block relative text-secondary text-12"></span>
              <span class="btn-txt inline-block text-secondary">Continue Reading</span>
              <span class="btn-line btn-line-after inline-block text-secondary relative">
                <svg class="inline-block absolute" xmlns="http://www.w3.org/2000/svg" width="12" height="32" viewbox="0 0 12 32" style="height: 2em;">
                  <path fill="currentColor" d="M8.375 16L.437 8.062C-.125 7.5-.125 6.5.438 5.938s1.563-.563 2.126 0l9 9c.562.562.624 1.5.062 2.062l-9.063 9.063c-.312.312-.687.437-1.062.437s-.75-.125-1.063-.438c-.562-.562-.562-1.562 0-2.125z"></path>
                </svg>
              </span>
            </a>
          </footer>
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
