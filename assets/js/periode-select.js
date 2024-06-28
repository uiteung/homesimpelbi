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
        const tableContainer = document.getElementById("tableContainer");
        tableContainer.innerHTML = ""; // Clear previous table
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const headers = [
          "ID Standar",
          "Standar",
          "Isi",
          "ID Indikator",
          "Nama Indikator",
          "Isi Indikator",
          "ID Prodi Unit",
          "Prodi Unit",
          "ID Siklus",
          "Tahun",
        ];
        const headerRow = document.createElement("tr");
        headers.forEach((header) => {
          const th = document.createElement("th");
          th.textContent = header;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        data.data.forEach((item) => {
          const row = document.createElement("tr");
          Object.values(item).forEach((value) => {
            const td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
          });
          tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        tableContainer.classList.remove("hidden");
        tableContainer.scrollIntoView({ behavior: "smooth" });
      } else {
        alert("Failed to fetch data.");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});
