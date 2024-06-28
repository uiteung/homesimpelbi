document.getElementById("submitButton").addEventListener("click", function (e) {
  e.preventDefault();
  const dropdown = document.getElementById("periodeDropdown");
  const id_siklus = dropdown.value;

  if (id_siklus === "option1") {
    alert("Please select a valid Periode.");
    return;
  }

  fetch(
    `https://simbe-dev.ulbi.ac.id/api/v1/datastandarami?id_siklus=${id_siklus}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const tableContainer = document.querySelector(".table-container");
        const table = document.getElementById("dataTable");
        table.innerHTML = ""; // Clear previous table content

        const headers = [
          "ID Standar",
          "Nama Standar",
          "Pernyataan Standar",
          "Prodi Unit",
          "Tahun Periode",
        ];

        const headerMapping = {
          "ID Standar": "id_standar",
          "Nama Standar": "standar",
          "Pernyataan Standar": "isi",
          "ID Prodi Unit": "id_prodi_unit",
          "Prodi Unit": "prodi_unit",
          "ID Siklus": "id_siklus",
          "Tahun Periode": "tahun",
        };

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headers.forEach((header) => {
          const th = document.createElement("th");
          th.textContent = header;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        const getalldata = data.data.data_query;
        getalldata.forEach((item) => {
          const row = document.createElement("tr");
          headers.forEach((header) => {
            const td = document.createElement("td");
            td.textContent = item[headerMapping[header]] || "";
            td.setAttribute("data-label", header);
            row.appendChild(td);
          });
          tbody.appendChild(row);
        });
        table.appendChild(tbody);

        tableContainer.classList.remove("hidden");
        tableContainer.scrollIntoView({ behavior: "smooth" });
      } else {
        alert("Failed to fetch data.");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});
