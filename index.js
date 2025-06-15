// chrome://extensions/
let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

tabBtn.addEventListener("click", function () {
  createFetchableDevEnvironment.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
    }
  );
});

deleteBtn.addEventListener("dblclick", function () {
  myLeads = [];
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

const savedLeads = localStorage.getItem("myLeads");
if (savedLeads) {
  myLeads = JSON.parse(savedLeads);
}

render(myLeads);

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}
