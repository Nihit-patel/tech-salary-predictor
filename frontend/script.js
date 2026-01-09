document
  .getElementById("salaryForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    await predictSalary();
  });

async function predictSalary() {
  const resultDiv = document.getElementById("result");
  resultDiv.className = "result-container calculating";
  resultDiv.innerText = "Calculating your salary prediction...";

  // get input values from the frontend
  const yearsCodePro = parseFloat(
    document.getElementById("yearsCodePro").value
  );
  const edLevel = parseInt(document.getElementById("edLevel").value);
  const countryKey = document.getElementById("country").value;
  const orgSize = parseInt(document.getElementById("orgSize").value);
  const remoteWork = document.getElementById("remoteWork").value;

  // create the payload to use the ml model
  const payload = {
    YearsCodePro: yearsCodePro,
    EdLevel_Ordinal: edLevel,
    OrgSize_Ordinal: orgSize,
    [countryKey]: 1,
  };

  // employment type handling
  if (remoteWork === "Remote") {
    payload["RemoteWork_Remote"] = 1;
    payload["RemoteWork_In-person"] = 0;
  } else if (remoteWork === "In-person") {
    payload["RemoteWork_In-person"] = 1;
    payload["RemoteWork_Remote"] = 0;
  } else {
    payload["RemoteWork_In-person"] = 0;
    payload["RemoteWork_Remote"] = 0;
  }

  // developer type handling, only one selected
  const devTypeSelected = document.querySelector(
    'input[name="devType"]:checked'
  );
  if (devTypeSelected) {
    payload[devTypeSelected.value] = 1;
  }

  // selected programming languages handling
  const languages = document.querySelectorAll('input[name="language"]:checked');
  languages.forEach((checkbox) => {
    payload[checkbox.value] = 1;
  });

  // selected databases handling
  const databases = document.querySelectorAll('input[name="database"]:checked');
  databases.forEach((checkbox) => {
    payload[checkbox.value] = 1;
  });

  // selected cloud platforms handling
  const clouds = document.querySelectorAll('input[name="cloud"]:checked');
  clouds.forEach((checkbox) => {
    payload[checkbox.value] = 1;
  });

  // selected frameworks handling
  const frameworks = document.querySelectorAll(
    'input[name="framework"]:checked'
  );
  frameworks.forEach((checkbox) => {
    payload[checkbox.value] = 1;
  });

  // selected tools handling
  const tools = document.querySelectorAll('input[name="tool"]:checked');
  tools.forEach((checkbox) => {
    payload[checkbox.value] = 1;
  });

  try {
    // send to backend
    const response = await fetch(
      "http://localhost:5000/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    resultDiv.className = "result-container success";
    resultDiv.innerHTML = `
            <div>
                <div style="font-size: 1.2rem; color: #666; margin-bottom: 10px;">Predicted Annual Salary</div>
                <div style="font-size: 2.5rem; color: #667eea;">$${data.salary.toLocaleString(
                  undefined,
                  { maximumFractionDigits: 0 }
                )}</div>
            </div>
        `;
  } catch (error) {
    resultDiv.className = "result-container";
    resultDiv.style.color = "#f83737ff";
    resultDiv.innerText =
      "Error: Unable to connect to backend server.";
    console.error("Error:", error);
  }
}

// smooth scrolling
document.getElementById("salaryForm").addEventListener("submit", function () {
  setTimeout(() => {
    document
      .getElementById("result")
      .scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 100);
});
