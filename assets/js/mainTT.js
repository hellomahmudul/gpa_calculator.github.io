const add = document.querySelector("#add");
const courseCode = document.querySelector("#course-code");
const unitLoad = document.querySelector("#unit-load");
const grade = document.querySelector("#grade");
const tbody = document.querySelector("#tbody");
const tfoot = document.querySelector("#tfoot");
const table = document.querySelector("#table");
const calcGp = document.querySelector("#calc-gp");
const clear = document.querySelector("#clear");

let gpArry = [];

// ==================== GPA Calculation ====================
function recalcGPA() {
  let totalCredits = 0;
  let totalWeighted = 0;

  gpArry.forEach((course) => {
    totalCredits += course.unitLoad;
    totalWeighted += course.unitLoad * course.grade;
  });

  const resultBox = document.getElementById("result-section");
  const totalCreditsEl = document.getElementById("total-credits");
  const gpaResultEl = document.getElementById("gpa-result");

  if (totalCredits === 0) {
    resultBox.classList.remove("success");
    resultBox.classList.add("error");
    totalCreditsEl.textContent = "";
    gpaResultEl.textContent = "No courses added yet!";
    resultBox.classList.remove("display-none");
    return;
  }

  let gpa = (totalWeighted / totalCredits).toFixed(2);

  resultBox.classList.remove("error");
  resultBox.classList.add("success");
  totalCreditsEl.textContent = `Your total credits: ${totalCredits}`;
  gpaResultEl.textContent = `Your GPA: ${gpa}`;
  resultBox.classList.remove("display-none");
}

// ==================== Add new course ====================
add.addEventListener("click", () => {
  if (
    courseCode.value === "" ||
    unitLoad.value <= 0 ||
    grade.selectedIndex === 0
  ) {
    alert("Wrong input, check and try again");
  } else {
    const tr = document.createElement("tr");

    const tdCourseCode = document.createElement("td");
    tdCourseCode.innerHTML = courseCode.value;

    const tdUnitLoad = document.createElement("td");
    tdUnitLoad.innerHTML = unitLoad.value;

    const tdGrade = document.createElement("td");
    tdGrade.innerHTML = grade.options[grade.selectedIndex].text;

    // ===== Delete button cell =====
    const tdAction = document.createElement("td");
    const delBtn = document.createElement("button1");
    delBtn.classList.add("delete-btn1");
    delBtn.innerHTML = `<i class='bx bx-trash'></i>`;
    tdAction.appendChild(delBtn);

    // Add delete event
    delBtn.addEventListener("click", () => {
      // Remove row from DOM
      tr.remove();

      // Remove from array
      gpArry = gpArry.filter(
        (c) =>
          !(
            c.unitLoad === parseFloat(unitLoad.value) &&
            c.grade === parseFloat(grade.options[grade.selectedIndex].value) &&
            c.courseCode === courseCode.value
          )
      );

      recalcGPA();
    });

    tr.appendChild(tdCourseCode);
    tr.appendChild(tdUnitLoad);
    tr.appendChild(tdGrade);
    tr.appendChild(tdAction);
    tbody.appendChild(tr);

    table.classList.remove("display-none");
    calcGp.classList.remove("display-none");
    clear.classList.remove("display-none");

    gpArry.push({
      courseCode: courseCode.value,
      unitLoad: parseFloat(unitLoad.value),
      grade: parseFloat(grade.options[grade.selectedIndex].value),
    });

    // Reset input fields
    courseCode.value = "";
    unitLoad.value = "";
    grade.selectedIndex = 0;
    recalcGPA(); // auto-update result
  }
});

// ==================== Calculate GPA ====================
calcGp.addEventListener("click", recalcGPA);

// ==================== Export / Print ====================
const exportBtn = document.getElementById("export");

// Show export button whenever table is visible
const showExportButton = () => {
  if (!table.classList.contains("display-none")) {
    exportBtn.classList.remove("display-none");
  } else {
    exportBtn.classList.add("display-none");
  }
};
add.addEventListener("click", showExportButton);
calcGp.addEventListener("click", showExportButton);

exportBtn.addEventListener("click", () => {
  const tableClone = table.cloneNode(true);
  const resultClone = document.getElementById("result-section").cloneNode(true);

  const printWindow = window.open("", "", "width=800,height=600");

  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>CGPA_Export</title>
        <link rel="stylesheet" href="assets/css/uni_exportstyle.css">
        <style>
          body { margin:16mm; font-family: Arial, sans-serif; }
          .display-none { display: none !important; }
        </style>
      </head>
      <body>
        ${tableClone.outerHTML}
        ${resultClone.outerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();

  printWindow.onload = function () {
    printWindow.print();
    printWindow.close();
  };
});

// ==================== Clear Table ====================
clear.addEventListener("click", () => {
  gpArry = [];
  tbody.innerHTML = "";
  tfoot.innerHTML = "";

  table.classList.add("display-none");
  calcGp.classList.add("display-none");
  clear.classList.add("display-none");
  exportBtn.classList.add("display-none");

  const resultBox = document.getElementById("result-section");
  resultBox.classList.add("display-none");
});
