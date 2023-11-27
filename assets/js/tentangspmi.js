import { CihuyWithoutToken } from "https://c-craftjs.github.io/simpelbi/api.js";

const apiUrl = "https://simbe-dev.ulbi.ac.id/api/v1/datatimspmi/";

// Function to create team member elements
function createTeamMemberElement(item) {
  const teamMember = document.createElement("div");
  teamMember.className =
    "col col-12 col-md-4 flex flex-col items-start text-start p-20 module-col";
  teamMember.innerHTML = `
        <img class="mb-1em" width="660" height="492" src="https://simbe-dev.ulbi.ac.id/static/pictures/${item.foto}" alt="${item.judul}">
        <h4 class="ld-fh-element relative mb-0/5em text-24 font-bold">${item.judul}</h4>
        <div class="ld-fancy-heading p-5 mb-0/6em bg-accent rounded-6">
            <h6 class="ld-fh-element relative p-5 mb-0/5em text-10 uppercase font-normal leading-1em tracking-1 text-gray-400">${item.jabatan}</h6>
        </div>
        <p class="ld-fh-element relative mb-0/5em text-15 leading-1/6em">${item.isi}</p>
    `;
  return teamMember;
}

function updateTeamMembers(data) {
  const teamContainer = document.getElementById("teamContainer");
  teamContainer.innerHTML = ""; // Clear existing team members

  data.forEach((item) => {
    const teamMemberElement = createTeamMemberElement(item);
    teamContainer.appendChild(teamMemberElement);
  });
}

CihuyWithoutToken(apiUrl, (error, data) => {
  if (error) {
    console.error("Error fetching data:", error);
  } else {
    updateTeamMembers(data.data);
  }
});
