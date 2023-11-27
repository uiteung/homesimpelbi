import { CihuyWithoutToken } from "https://c-craftjs.github.io/simpelbi/api.js";
function fetchAndDisplayContent() {
  const urlParams = new URLSearchParams(window.location.search);
  const id_berita_spmi = urlParams.get("id");

  // Check if id_berita_spmi is available
  if (id_berita_spmi) {
    // Fetch content based on id_berita_spmi using CihuyWithoutToken
    const apiUrl = `https://simbe-dev.ulbi.ac.id/api/v1/databeritaspmi/${id_berita_spmi}`;
    CihuyWithoutToken(apiUrl, (error, data) => {
      if (error) {
        console.error("Error fetching detail content:", error);
      } else {
        // Display content in the #detailContent div
        const detailContent = document.getElementById("detailContent");
        detailContent.innerHTML = `
                    <!-- Modify this section to display the fetched content -->
                    <h3 class="ld-fh-element relative mb-1em text-24">${data.judul}</h3>
                    <p class="ld-fh-element relative mb-1em">${data.isi}</p>
                    <!-- Add other content elements as needed -->
                `;
      }
    });
  } else {
    console.error("No id_berita_spmi provided in the URL.");
  }
}

// Call the function when the page loads
window.onload = fetchAndDisplayContent;
