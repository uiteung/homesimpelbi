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
