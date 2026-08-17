/* =========================================
   STUDENT MANAGEMENT SYSTEM
   SINGLE JAVASCRIPT FILE
========================================= */


/* =========================================
   LOAD STUDENTS
========================================= */

let studentsArray =
    JSON.parse(localStorage.getItem("students")) || [];


/* =========================================
   SAVE STUDENTS
========================================= */

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(studentsArray)
    );
}


/* =========================================
   DISPLAY STUDENTS IN MANAGE PAGE
========================================= */

function displaystudent() {

    const tableBody =
        document.getElementById("studentTableBody");

    // If not on manage.html
    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    if (studentsArray.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-message">
                    No students found.
                </td>
            </tr>
        `;

        return;
    }


    studentsArray.forEach(function (student, index) {

        tableBody.innerHTML += `
            <tr>

                <td>${student.name || "-"}</td>

                <td>${student.email || "-"}</td>

                <td>${student.contact || "-"}</td>

                <td>${student.address || "-"}</td>

                <td>${student.faculty || "-"}</td>

                <td>${student.semester || "-"}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deletestudent(${index})">
                        Delete
                    </button>

                    <button
                        class="edit-btn"
                        onclick="editstudent(${index})">
                        Edit
                    </button>

                    <button
                        class="view-btn"
                        onclick="viewstudent()">
                        View
                    </button>

                </td>

            </tr>
        `;
    });
}


/* =========================================
   DELETE STUDENT
========================================= */

function deletestudent(index) {

    const student = studentsArray[index];

    if (!student) {
        alert("Student not found.");
        return;
    }


    const confirmDelete = confirm(
        `Are you sure you want to delete ${student.name}?`
    );


    if (!confirmDelete) {
        return;
    }


    studentsArray.splice(index, 1);

    saveStudents();

    displaystudent();
}


/* =========================================
   EDIT STUDENT
========================================= */

function editstudent(index) {

    if (!studentsArray[index]) {
        alert("Student not found.");
        return;
    }


    localStorage.setItem(
        "editIndex",
        index
    );


    window.location.href = "addstudent.html";
}


/* =========================================
   VIEW ALL STUDENTS
========================================= */

function viewstudent() {

    /*
        We do NOT save selectedstudent.

        Detail.html displays ALL students
        from the studentsArray/localStorage.
    */

    window.location.href = "Detail.html";
}


/* =========================================
   ADD / UPDATE STUDENT
========================================= */

function getName(event) {

    event.preventDefault();


    const nameElement =
        document.getElementById("name");

    const emailElement =
        document.getElementById("email");

    const contactElement =
        document.getElementById("contact");

    const addressElement =
        document.getElementById("address");

    const facultyElement =
        document.getElementById("faculty");

    const semesterElement =
        document.getElementById("semester");


    // Check form elements
    if (
        !nameElement ||
        !emailElement ||
        !contactElement ||
        !addressElement ||
        !facultyElement ||
        !semesterElement
    ) {
        return;
    }


    const name =
        nameElement.value.trim();

    const email =
        emailElement.value.trim();

    const contact =
        contactElement.value.trim();

    const address =
        addressElement.value.trim();

    const faculty =
        facultyElement.value;

    const semester =
        semesterElement.value;


    /* =========================================
       CREATE STUDENT OBJECT
    ========================================= */

    const student = {

        name: name,

        email: email,

        contact: contact,

        address: address,

        faculty: faculty,

        semester: semester

    };


    /* =========================================
       CHECK EDIT MODE
    ========================================= */

    const storedEditIndex =
        localStorage.getItem("editIndex");


    if (
        storedEditIndex !== null &&
        storedEditIndex !== ""
    ) {

        const index =
            Number(storedEditIndex);


        if (
            !Number.isNaN(index) &&
            studentsArray[index]
        ) {

            studentsArray[index] =
                student;

        }


        // Remove edit mode
        localStorage.removeItem("editIndex");

    } else {

        // Add new student
        studentsArray.push(student);

    }


    /* =========================================
       SAVE
    ========================================= */

    saveStudents();


    /* =========================================
       RESET FORM
    ========================================= */

    const form =
        document.getElementById("studentForm");


    if (form) {
        form.reset();
    }


    /* =========================================
       GO TO MANAGE PAGE
    ========================================= */

    window.location.href =
        "manage.html";
}


/* =========================================
   PREPARE EDIT FORM
========================================= */

function prepareEditForm() {

    const storedEditIndex =
        localStorage.getItem("editIndex");


    const nameInput =
        document.getElementById("name");


    // Not on addstudent.html
    if (
        storedEditIndex === null ||
        !nameInput
    ) {
        return;
    }


    const index =
        Number(storedEditIndex);


    const student =
        studentsArray[index];


    if (!student) {

        localStorage.removeItem("editIndex");

        return;
    }


    /* =========================================
       FILL FORM
    ========================================= */

    document.getElementById("name").value =
        student.name || "";

    document.getElementById("email").value =
        student.email || "";

    document.getElementById("contact").value =
        student.contact || "";

    document.getElementById("address").value =
        student.address || "";

    document.getElementById("faculty").value =
        student.faculty || "";

    document.getElementById("semester").value =
        student.semester || "";


    /* =========================================
       CHANGE HEADING
    ========================================= */

    const heading =
        document.querySelector(".form-header h1");


    if (heading) {

        heading.textContent =
            "Edit Student";
    }


    /* =========================================
       CHANGE DESCRIPTION
    ========================================= */

    const description =
        document.querySelector(".form-header p");


    if (description) {

        description.textContent =
            "Update the student's information below";
    }


    /* =========================================
       CHANGE SUBMIT BUTTON
    ========================================= */

    const submitButton =
        document.querySelector(
            '.btn-primary[type="submit"]'
        );


    if (submitButton) {

        submitButton.textContent =
            "Update Student";
    }
}


/* =========================================
   DISPLAY ALL STUDENTS
   Detail.html
========================================= */

function displayAllStudents() {

    const studentGrid =
        document.getElementById("studentGrid");


    // Not on Detail.html
    if (!studentGrid) {
        return;
    }


    studentGrid.innerHTML = "";


    /* =========================================
       NO STUDENTS
    ========================================= */

    if (studentsArray.length === 0) {

        studentGrid.innerHTML = `

            <div class="no-students">

                <div class="no-students-icon">
                    🎓
                </div>

                <h2>
                    No Students Registered
                </h2>

                <p>
                    There are currently no students
                    registered in the system.
                </p>

            </div>

        `;

        return;
    }


    /* =========================================
       DISPLAY EVERY STUDENT
    ========================================= */

    studentsArray.forEach(function (student, index) {

        const firstLetter =
            student.name
                ? student.name.charAt(0).toUpperCase()
                : "S";


        studentGrid.innerHTML += `

            <article class="student-card">


                <!-- Card Header -->

                <div class="student-card-header">

                    <div class="card-avatar">
                        ${firstLetter}
                    </div>


                    <div>

                        <h2>
                            ${student.name || "Unknown Student"}
                        </h2>

                        <span>
                            Student #${index + 1}
                        </span>

                    </div>

                </div>


                <!-- Student Information -->

                <div class="student-details">


                    <!-- Email -->

                    <div class="detail-item">

                        <span>📧</span>

                        <div>

                            <small>
                                Email
                            </small>

                            <strong>
                                ${student.email || "-"}
                            </strong>

                        </div>

                    </div>


                    <!-- Contact -->

                    <div class="detail-item">

                        <span>📱</span>

                        <div>

                            <small>
                                Contact
                            </small>

                            <strong>
                                ${student.contact || "-"}
                            </strong>

                        </div>

                    </div>


                    <!-- Address -->

                    <div class="detail-item">

                        <span>📍</span>

                        <div>

                            <small>
                                Address
                            </small>

                            <strong>
                                ${student.address || "-"}
                            </strong>

                        </div>

                    </div>


                    <!-- Faculty -->

                    <div class="detail-item">

                        <span>🎓</span>

                        <div>

                            <small>
                                Faculty
                            </small>

                            <strong>
                                ${student.faculty || "-"}
                            </strong>

                        </div>

                    </div>


                    <!-- Semester -->

                    <div class="detail-item">

                        <span>📚</span>

                        <div>

                            <small>
                                Semester
                            </small>

                            <strong>
                                ${student.semester || "-"}
                            </strong>

                        </div>

                    </div>


                </div>

            </article>

        `;
    });
}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Manage.html
        displaystudent();


        // Addstudent.html
        prepareEditForm();


        // Detail.html
        displayAllStudents();

    }
);
