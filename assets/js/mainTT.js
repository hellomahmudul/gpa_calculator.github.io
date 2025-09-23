/*===== SHOW NAVBAR  =====*/ 
const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            // show navbar
            nav.classList.toggle('show')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
        })
    }
}

showNavbar('header-toggle','nav-bar','body-pd','header')

/*===== LINK ACTIVE  =====*/ 
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
    }
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))

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

// Add new course
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

    tr.appendChild(tdCourseCode);
    tr.appendChild(tdUnitLoad);
    tr.appendChild(tdGrade);
    tbody.appendChild(tr);

    table.classList.remove("display-none");
    calcGp.classList.remove("display-none");
    clear.classList.remove("display-none");

    gpArry.push({
      unitLoad: parseFloat(unitLoad.value),
      grade: parseFloat(grade.options[grade.selectedIndex].value),
    });

    // Reset input fields
    courseCode.value = "";
    unitLoad.value = "";
    grade.selectedIndex = 0;
  }
});

// // Calculate GPA using methodology: sum(c*g) / sum(c)
// calcGp.addEventListener("click", () => {
//   let totalCredits = 0;
//   let totalWeighted = 0;

//   gpArry.forEach((course) => {
//     totalCredits += course.unitLoad;
//     totalWeighted += course.unitLoad * course.grade;
//   });

//   if (totalCredits === 0) {
//     alert("No courses added yet!");
//     return;
//   }

//   let gpa = (totalWeighted / totalCredits).toFixed(2);

//   const tr = document.createElement("tr");

//   const tdTotalUnitLoad = document.createElement("td");
//   tdTotalUnitLoad.innerHTML = `Your total credits: ${totalCredits}`;

//   const tdGpa = document.createElement("td");
//   tdGpa.setAttribute("colspan", "2");
//   tdGpa.innerHTML = `Your GPA: ${gpa}`;

//   tr.appendChild(tdTotalUnitLoad);
//   tr.appendChild(tdGpa);

//   if (tfoot.querySelector("tr") !== null) {
//     tfoot.querySelector("tr").remove();
//   }
//   tfoot.appendChild(tr);
// });

// // Clear everything
// clear.addEventListener("click", () => {
//   gpArry = [];
//   tbody.innerHTML = "";
//   tfoot.innerHTML = "";

//   table.classList.add("display-none");
//   calcGp.classList.add("display-none");
//   clear.classList.add("display-none");
// });


// Calculate GPA using methodology: sum(c*g) / sum(c)
calcGp.addEventListener("click", () => {
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
    // Show error style
    resultBox.classList.remove("success");
    resultBox.classList.add("error");
    totalCreditsEl.textContent = "";
    gpaResultEl.textContent = "No courses added yet!";
    resultBox.classList.remove("display-none");
    return;
  }

  let gpa = (totalWeighted / totalCredits).toFixed(2);

  // Show success style
  resultBox.classList.remove("error");
  resultBox.classList.add("success");
  totalCreditsEl.textContent = `Your total credits: ${totalCredits}`;
  gpaResultEl.textContent = `Your GPA: ${gpa}`;

  resultBox.classList.remove("display-none");
});

clear.addEventListener("click", () => {
  gpArry = [];
  tbody.innerHTML = "";
  tfoot.innerHTML = "";

  table.classList.add("display-none");
  calcGp.classList.add("display-none");
  clear.classList.add("display-none");

  // Hide result box
  const resultBox = document.getElementById("result-section");
  resultBox.classList.add("display-none");
});




  
