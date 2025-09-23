/*===== SHOW NAVBAR  =====*/ 
const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)

    if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
            toggle.classList.toggle('bx-x')
            bodypd.classList.toggle('body-pd')
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

// Elements
const add = document.querySelector("#add");
const semester = document.querySelector("#semester");       
const totalCreditsSelect = document.querySelector("#total-credits-select"); 
const customCredits = document.querySelector("#custom-credits");
const gpaInput = document.querySelector("#gpa");         
const tbody = document.querySelector("#tbody");
const table = document.querySelector("#table");
const calcGp = document.querySelector("#calc-gp");
const clear = document.querySelector("#clear");

// Show/hide custom credits input
totalCreditsSelect.addEventListener("change", () => {
    if (totalCreditsSelect.value === "other") {
        customCredits.style.display = "inline-block";
        customCredits.focus();
    } else {
        customCredits.style.display = "none";
        customCredits.value = "";
    }
});

let semArry = [];

// Add new semester
add.addEventListener("click", () => {
    // Determine selected credits value
    let creditsValue;
    if (totalCreditsSelect.value === "other") {
        creditsValue = parseFloat(customCredits.value);
    } else {
        creditsValue = parseFloat(totalCreditsSelect.value);
    }


// Elements
const add = document.querySelector("#add");
const semester = document.querySelector("#semester");       
const totalCreditsSelect = document.querySelector("#total-credits-select"); 
const customCredits = document.querySelector("#custom-credits");
const gpaInput = document.querySelector("#gpa");         
const tbody = document.querySelector("#tbody");
const table = document.querySelector("#table");
const calcGp = document.querySelector("#calc-gp");
const clear = document.querySelector("#clear");

// Show/hide custom credits input
totalCreditsSelect.addEventListener("change", () => {
    if (totalCreditsSelect.value === "other") {
        customCredits.style.display = "inline-block";
        customCredits.focus();
    } else {
        customCredits.style.display = "none";
        customCredits.value = "";
    }
});

let semArry = [];

// Add new semester
add.addEventListener("click", () => {
    // Determine selected credits value
    let creditsValue;
    if (totalCreditsSelect.value === "other") {
        creditsValue = parseFloat(customCredits.value);
    } else {
        creditsValue = parseFloat(totalCreditsSelect.value);
    }

    if (
        semester.selectedIndex === 0 ||
        !creditsValue ||
        gpaInput.value === "" || gpaInput.value < 0
    ) {
        alert("Wrong input, check and try again");
        return;
    }

    // Create table row
    const tr = document.createElement("tr");
    const tdSemester = document.createElement("td");
    tdSemester.textContent = semester.value;
    const tdCredits = document.createElement("td");
    tdCredits.textContent = creditsValue;
    const tdGpa = document.createElement("td");
    tdGpa.textContent = parseFloat(gpaInput.value).toFixed(2);


    // Action column
    const tdAction = document.createElement("td");
    const delBtn = document.createElement("button1");
    delBtn.classList.add("delete-btn1");
// Use Boxicons trash icon
delBtn.innerHTML = `<i class='bx bx-trash'></i>`;


    // Delete row functionality
    delBtn.addEventListener("click", () => {
        tbody.removeChild(tr); // remove row from table
        semArry = semArry.filter(
            sem => !(sem.semester === semester.value && sem.credits === creditsValue && sem.gpa === parseFloat(gpaInput.value))
        );
        recalcCGPA(); // update result instantly
    });
    
    tdAction.appendChild(delBtn);
    tr.appendChild(tdSemester);
    tr.appendChild(tdCredits);
    tr.appendChild(tdGpa);
    tr.appendChild(tdAction);
    tbody.appendChild(tr);

    table.classList.remove("display-none");
    calcGp.classList.remove("display-none");
    clear.classList.remove("display-none");

    // Save to array
    semArry.push({
        semester: semester.value,
        credits: creditsValue,
        gpa: parseFloat(gpaInput.value)
    });

    recalcCGPA(); // auto-update result

    // Reset inputs
    semester.selectedIndex = 0;
    totalCreditsSelect.selectedIndex = 0;
    customCredits.value = "";
    customCredits.style.display = "none";
    gpaInput.value = "";
});

// Calculate CGPA
function recalcCGPA(){
    let totalCredits = 0;
    let totalWeighted = 0;

    semArry.forEach((sem) => {
        totalCredits += sem.credits;
        totalWeighted += sem.credits * sem.gpa;
    });

    const resultBox = document.getElementById("result-section");
    const totalCreditsEl = document.getElementById("total-credits-display"); // updated ID
    const gpaResultEl = document.getElementById("gpa-result");

    if (totalCredits === 0) {
        resultBox.classList.remove("success");
        resultBox.classList.add("error");
        totalCreditsEl.textContent = "";
        gpaResultEl.textContent = "No semesters added yet!";
        resultBox.classList.remove("display-none");
        return;
    }

    let cgpa = (totalWeighted / totalCredits).toFixed(2);

    resultBox.classList.remove("error");
    resultBox.classList.add("success");
    totalCreditsEl.textContent = `Your total credits: ${totalCredits}`;
    gpaResultEl.textContent = `Your CGPA: ${cgpa}`;
    resultBox.classList.remove("display-none");
};


const exportBtn = document.getElementById("export");

// Show export button whenever table is visible
const showExportButton = () => {
    if (!table.classList.contains("display-none")) {
        exportBtn.classList.remove("display-none");
    } else {
        exportBtn.classList.add("display-none");
    }
};

// Call this after adding a semester or after Calc GP
add.addEventListener("click", showExportButton);
calcGp.addEventListener("click", showExportButton);

// Export / Print functionality
exportBtn.addEventListener("click", () => {
    // Clone table and result section
    const tableClone = table.cloneNode(true);
    const resultClone = document.getElementById("result-section").cloneNode(true);

    // Open print window
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

    // Wait until CSS loads before printing
    printWindow.onload = function () {
        printWindow.print();
        printWindow.close();
    };
});


// Clear everything
clear.addEventListener("click", () => {
    semArry = [];
    tbody.innerHTML = "";
    table.classList.add("display-none");
    calcGp.classList.add("display-none");
    clear.classList.add("display-none");
    exportBtn.classList.add("display-none");

    const resultBox = document.getElementById("result-section");
    resultBox.classList.add("display-none");

    // Reset selects and input
    semester.selectedIndex = 0;
    totalCreditsSelect.selectedIndex = 0;
    customCredits.value = "";
    customCredits.style.display = "none";
    gpaInput.value = "";
});


