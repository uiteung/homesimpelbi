let currentPage = 1;
let totalPages = 1;

function fetchPeriodeDropdown() {
  fetch("https://simbe-dev.ulbi.ac.id/api/v1/datasiklus")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const dropdown = document.getElementById("periodeDropdown");
        data.data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.idSiklus;
          option.text = `Periode ${item.tahun}`;
          dropdown.appendChild(option);
        });
      } else {
        alert("Failed to fetch dropdown options.");
      }
    })
    .catch((error) => console.error("Error fetching dropdown options:", error));
}

function fetchData(id_siklus, page = 1) {
  fetch(
    `https://simbe-dev.ulbi.ac.id/api/v1/datastandarami?id_siklus=${id_siklus}&page=${page}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        renderTable(data.data.data_query);
        currentPage = data.data.current_page;
        totalPages = data.data.last_page;
        updatePagination();
      } else {
        alert("Failed to fetch data.");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function renderTable(data) {
  const table = document.getElementById("dataTable");
  table.innerHTML = ""; // Clear previous table content

  const headers = [
    "ID Standar",
    "Nama Standar",
    "Pernyataan Standar",
    // "ID Indikator",
    // "Nama Indikator",
    // "Isi Indikator",
    "Prodi Unit",
    "Tahun Periode",
  ];

  const headerMapping = {
    "ID Standar": "id_standar",
    "Nama Standar": "standar",
    "Pernyataan Standar": "isi",
    // "ID Indikator": "id_indikator",
    // "Nama Indikator": "nama_indikator",
    // "Isi Indikator": "isi_indikator",
    // "ID Prodi Unit": "id_prodi_unit",
    "Prodi Unit": "prodi_unit",
    // "ID Siklus": "id_siklus",
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
  data.forEach((item) => {
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

  const tableContainer = document.querySelector(".table-container");
  tableContainer.classList.remove("hidden");
  tableContainer.scrollIntoView({ behavior: "smooth" });
}

function updatePagination() {
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      fetchData(
        document.getElementById("periodeDropdown").value,
        currentPage - 1
      );
    }
  });
  paginationContainer.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      fetchData(
        document.getElementById("periodeDropdown").value,
        currentPage + 1
      );
    }
  });
  paginationContainer.appendChild(nextButton);
}

document.getElementById("submitButton").addEventListener("click", function (e) {
  e.preventDefault();
  const dropdown = document.getElementById("periodeDropdown");
  const id_siklus = dropdown.value;

  if (id_siklus === "option1") {
    alert("Please select a valid Periode.");
    return;
  }

  fetchData(id_siklus);
});

fetchPeriodeDropdown();
