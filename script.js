let studentsArray =
    JSON.parse(localStorage.getItem("students")) || [];
function saveStudents() {
    localStorage.setItem(
        "students",
        JSON.stringify(studentsArray)
    );
}
function updateStatistics() {
    const totalStudents =
        document.getElementById("totalStudents");

    const totalFaculties =
        document.getElementById("totalFaculties");

    const totalSemesters =
        document.getElementById("totalSemesters");
    // Total students
    if (totalStudents) {
        totalStudents.textContent =
            studentsArray.length;
    }
    // Unique faculties
    if (totalFaculties) {
        const faculties = new Set();
        studentsArray.forEach(function (student) {
            if (student.faculty) {
                faculties.add(student.faculty);
            }
        });

        totalFaculties.textContent =
            faculties.size;
    }
    // Unique semesters
    if (totalSemesters) {

        const semesters = new Set();

        studentsArray.forEach(function (student) {

            if (student.semester) {
                semesters.add(student.semester);
            }

        });

        totalSemesters.textContent =
            semesters.size;
    }
}
function displayStudentPreview() {

    const preview =
        document.getElementById("studentPreview");

    const emptyMessage =
        document.getElementById("emptyStudents");
    // Not on home page
    if (!preview) {
        return;
    }
    preview.innerHTML = "";
    // No students
    if (studentsArray.length === 0) {

        if (emptyMessage) {
            emptyMessage.style.display = "block";
        }

        return;
    }


    if (emptyMessage) {
        emptyMessage.style.display = "none";
    }


    // Show latest 3 students
    const recentStudents =
        studentsArray.slice(-3).reverse();


    recentStudents.forEach(function (student) {

        preview.innerHTML += `

            <div class="student-preview-item">

                <div class="preview-avatar">
                    ${
                        student.name
                            ? student.name.charAt(0).toUpperCase()
                            : "S"
                    }
                </div>

                <div class="preview-info">

                    <strong>
                        ${student.name || "Unknown Student"}
                    </strong>

                    <span>
                        ${student.faculty || "No faculty"}
                    </span>

                </div>

            </div>

        `;
    });
}


function displaystudent() {

    const tableBody =
        document.getElementById("studentTableBody");


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

function deletestudent(index) {

    const student =
        studentsArray[index];


    if (!student) {
        alert("Student not found.");
        return;
    }


    const confirmDelete =
        confirm(
            `Are you sure you want to delete ${student.name}?`
        );


    if (!confirmDelete) {
        return;
    }


    studentsArray.splice(index, 1);

    saveStudents();

    displaystudent();

    updateStatistics();

    displayStudentPreview();
}


function editstudent(index) {

    if (!studentsArray[index]) {
        alert("Student not found.");
        return;
    }


    localStorage.setItem(
        "editIndex",
        index
    );


    window.location.href =
        "addstudent.html";
}



function viewstudent() {

    window.location.href =
        "viewdetail.html";
}

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


    const student = {

        name: nameElement.value.trim(),

        email: emailElement.value.trim(),

        contact: contactElement.value.trim(),

        address: addressElement.value.trim(),

        faculty: facultyElement.value,

        semester: semesterElement.value

    };




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


        localStorage.removeItem(
            "editIndex"
        );

    } else {

        studentsArray.push(student);
    }


    saveStudents();



    window.location.href =
        "manage.html";
}


function prepareEditForm() {

    const storedEditIndex =
        localStorage.getItem("editIndex");


    const nameInput =
        document.getElementById("name");


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

        localStorage.removeItem(
            "editIndex"
        );

        return;
    }


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


    const heading =
        document.querySelector(
            ".form-header h1"
        );


    if (heading) {
        heading.textContent =
            "Edit Student";
    }


    const description =
        document.querySelector(
            ".form-header p"
        );


    if (description) {

        description.textContent =
            "Update the student's information below";
    }


    const submitButton =
        document.querySelector(
            '.btn-primary[type="submit"]'
        );


    if (submitButton) {

        submitButton.textContent =
            "Update Student";
    }
}

function displayAllStudents() {

    const studentGrid =
        document.getElementById("studentGrid");


    if (!studentGrid) {
        return;
    }


    studentGrid.innerHTML = "";


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
    studentsArray.forEach(function (student, index) {

        const firstLetter =
            student.name
                ? student.name.charAt(0).toUpperCase()
                : "S";


        studentGrid.innerHTML += `

            <article class="student-card">

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


                <div class="student-details">

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
document.addEventListener(
    "DOMContentLoaded",
    function () {
        // Home page
        updateStatistics();
        displayStudentPreview();
        // Manage page
        displaystudent();
        // Add student page
        prepareEditForm();
        // Detail page
        displayAllStudents();
    }
);
