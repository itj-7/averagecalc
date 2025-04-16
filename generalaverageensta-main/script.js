const modulesTable = document.getElementById('modules-table');
const generalAverageSpan = document.getElementById('general-average');

// Module lists
const mi1Modules = [
  { name: "Electricity", coeff: 3 },
  { name: "Office Tools and Web", coeff: 1 },
  { name: "Mathematical Analysis 1", coeff: 5 },
  { name: "Algorithmics and Static Data Structures", coeff: 5 },
  { name: "Computer Architecture 1", coeff: 4 },
  { name: "Algebra 1", coeff: 3 },
  { name: "Introduction to Operating Systems 1", coeff: 3 },
  { name: "Written Expression (FRANCAIS)", coeff: 2 }
];

const mi2Modules = [
  { name: "Business Economics", coeff: 2 },
  { name: "Mathematical Analysis 3", coeff: 5 },
  { name: "Computer Architecture 2", coeff: 4 },
  { name: "Fundamental Electronics 2", coeff: 4 },
  { name: "English 2", coeff: 2 },
  { name: "Algebra 3", coeff: 3 },
  { name: "File Structures and Data Structures", coeff: 4 },
  { name: "Probability and Statistics 1", coeff: 4 }
];

// Total coefficients for each program
const totalCoeffs = {
  mi1: 26,
  mi2: 28,
};

// Track the currently loaded program
let currentProgram = null;

// Load functions
function loadMI1() {
  currentProgram = "mi1";
  loadModules(mi1Modules);
}

function loadMI2() {
  currentProgram = "mi2";
  loadModules(mi2Modules);
}


// Populate the table dynamically
function loadModules(modules) {
  // Clear the table
  modulesTable.innerHTML = `
    <tr>
      <th>Module</th>
      <th>Coefficient</th>
      <th>TD</th>
      <th>Exam</th>
      <th>Module Average</th>
    </tr>
  `;

  // Add rows for each module
  modules.forEach((module, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${module.name}</td>
      <td>${module.coeff}</td>
      <td><input type="number" min="0" max="20" oninput="calculateAverages()" id="td-${index}"></td>
      <td><input type="number" min="0" max="20" oninput="calculateAverages()" id="exam-${index}"></td>
      <td id="module-avg-${index}">0.00</td>
    `;
    modulesTable.appendChild(row);
  });

  // Reset general average
  generalAverageSpan.textContent = "0.00";
}

// Calculate module and general averages
function calculateAverages() {
  const tableRows = Array.from(modulesTable.rows).slice(1); // Skip header row
  let totalWeightedAverage = 0;

  tableRows.forEach((row, index) => {
    const coeff = parseInt(row.cells[1].textContent); // Get coefficient from the table
    const td = parseFloat(document.getElementById(`td-${index}`).value) || 0;
    const exam = parseFloat(document.getElementById(`exam-${index}`).value) || 0;

    // Calculate module average
    const moduleAverage = (0.4 * td) + (0.6 * exam);
    row.cells[4].textContent = moduleAverage.toFixed(2); // Update module average cell

    // Update total weighted average
    totalWeightedAverage += moduleAverage * coeff;
  });

  // Calculate general average
  const totalCoeff = totalCoeffs[currentProgram] || 0;
  const generalAverage = totalCoeff ? totalWeightedAverage / totalCoeff : 0;
  generalAverageSpan.textContent = generalAverage.toFixed(2);
}
