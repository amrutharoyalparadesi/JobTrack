

const ADMIN_EMAIL = "admin@jobtrack.com";
const ADMIN_PASSWORD = "admin123";


function getUsers() {

    const users =
        localStorage.getItem("jobtrackUsers");

    if (users === null) {
        return [];
    }

    return JSON.parse(users);
}


function saveUsers(users) {

    localStorage.setItem(
        "jobtrackUsers",
        JSON.stringify(users)
    );
}




const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document.getElementById("name")
                    .value
                    .trim();

            const email =
                document.getElementById("email")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document.getElementById("password")
                    .value;

            const confirmPassword =
                document.getElementById("confirmPassword")
                    .value;

            const message =
                document.getElementById("signupMessage");


            if (password !== confirmPassword) {

                message.textContent =
                    "Passwords do not match.";

                return;
            }


            let users = getUsers();


            const existingUser =
                users.find(function(user) {

                    return user.email === email;

                });


            if (existingUser) {

                message.textContent =
                    "Email is already registered.";

                return;
            }


            const newUser = {

                name: name,

                email: email,

                password: password,

                role: "user"

            };


            users.push(newUser);

            saveUsers(users);


            message.style.color =
                "#16805b";

            message.textContent =
                "Account created successfully!";


            setTimeout(function() {

                window.location.href =
                    "login.html";

            }, 1000);

        }
    );
}



const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const email =
                document.getElementById("email")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document.getElementById("password")
                    .value;

            const message =
                document.getElementById("loginMessage");


            /* ADMIN LOGIN */

            if (
                email === ADMIN_EMAIL &&
                password === ADMIN_PASSWORD
            ) {

                const admin = {

                    name: "Admin",

                    email: ADMIN_EMAIL,

                    role: "admin"

                };


                localStorage.setItem(
                    "jobtrackCurrentUser",
                    JSON.stringify(admin)
                );


                window.location.href =
                    "admin-dashboard.html";

                return;
            }


            /* USER LOGIN */

            const users = getUsers();


            const user =
                users.find(function(user) {

                    return (
                        user.email === email &&
                        user.password === password
                    );

                });


            if (!user) {

                message.textContent =
                    "Invalid email or password.";

                return;
            }


            localStorage.setItem(
                "jobtrackCurrentUser",
                JSON.stringify(user)
            );


            window.location.href =
                "user-dashboard.html";

        }
    );
}



function getApplications() {

    const applications =
        localStorage.getItem(
            "jobtrackApplications"
        );


    if (applications === null) {

        return [];

    }


    return JSON.parse(applications);
}


function saveApplications(applications) {

    localStorage.setItem(
        "jobtrackApplications",
        JSON.stringify(applications)
    );
}


/* =========================================
   ADD / EDIT APPLICATION
========================================= */

const applicationForm =
    document.getElementById("applicationForm");


if (applicationForm) {

    const editApplicationId =
        localStorage.getItem(
            "editApplicationId"
        );


    /* LOAD EXISTING APPLICATION */

    if (editApplicationId) {

        const applications =
            getApplications();


        const application =
            applications.find(function(item) {

                return String(item.id) ===
                    String(editApplicationId);

            });


        if (application) {

            const companyInput =
                document.getElementById("company");

            const jobRoleInput =
                document.getElementById("jobRole");

            const locationInput =
                document.getElementById("location");

            const jobTypeInput =
                document.getElementById("jobType");

            const applicationDateInput =
                document.getElementById(
                    "applicationDate"
                );

            const statusInput =
                document.getElementById("status");

            const interviewDateInput =
                document.getElementById(
                    "interviewDate"
                );

            const notesInput =
                document.getElementById("notes");


            if (companyInput) {
                companyInput.value =
                    application.company || "";
            }


            if (jobRoleInput) {
                jobRoleInput.value =
                    application.jobRole || "";
            }


            if (locationInput) {
                locationInput.value =
                    application.location || "";
            }


            if (jobTypeInput) {
                jobTypeInput.value =
                    application.jobType || "";
            }


            if (applicationDateInput) {
                applicationDateInput.value =
                    application.applicationDate || "";
            }


            if (statusInput) {
                statusInput.value =
                    application.status || "Applied";
            }


            if (interviewDateInput) {
                interviewDateInput.value =
                    application.interviewDate || "";
            }


            if (notesInput) {
                notesInput.value =
                    application.notes || "";
            }


            const submitButton =
                applicationForm.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.textContent =
                    "Update Application";

            }

        }

    }


    /* FORM SUBMIT */

    applicationForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const currentUser =
                JSON.parse(
                    localStorage.getItem(
                        "jobtrackCurrentUser"
                    )
                );


            if (!currentUser) {

                window.location.href =
                    "login.html";

                return;
            }


            const company =
                document.getElementById("company")
                    .value
                    .trim();

            const jobRole =
                document.getElementById("jobRole")
                    .value
                    .trim();

            const location =
                document.getElementById("location")
                    .value
                    .trim();

            const jobType =
                document.getElementById("jobType")
                    .value;

            const applicationDate =
                document.getElementById(
                    "applicationDate"
                ).value;

            const status =
                document.getElementById("status")
                    .value;

            const interviewDate =
                document.getElementById(
                    "interviewDate"
                ).value;

            const notes =
                document.getElementById("notes")
                    .value
                    .trim();


            let applications =
                getApplications();


            /* UPDATE EXISTING APPLICATION */

            if (editApplicationId) {

                const applicationIndex =
                    applications.findIndex(
                        function(application) {

                            return String(application.id) ===
                                String(editApplicationId);

                        }
                    );


                if (applicationIndex !== -1) {

                    applications[
                        applicationIndex
                    ] = {

                        ...applications[
                            applicationIndex
                        ],

                        company: company,

                        jobRole: jobRole,

                        location: location,

                        jobType: jobType,

                        applicationDate:
                            applicationDate,

                        status: status,

                        interviewDate:
                            interviewDate,

                        notes: notes

                    };


                    saveApplications(
                        applications
                    );


                    localStorage.removeItem(
                        "editApplicationId"
                    );


                    const message =
                        document.getElementById(
                            "applicationMessage"
                        );


                    if (message) {

                        message.style.color =
                            "#16805b";

                        message.textContent =
                            "Application updated successfully!";

                    }


                    setTimeout(function() {

                        window.location.href =
                            "applications.html";

                    }, 800);


                    return;
                }

            }


            /* CREATE NEW APPLICATION */

            const newApplication = {

                id: Date.now(),

                userEmail:
                    currentUser.email,

                company: company,

                jobRole: jobRole,

                location: location,

                jobType: jobType,

                applicationDate:
                    applicationDate,

                status: status,

                interviewDate:
                    interviewDate,

                notes: notes

            };


            applications.push(
                newApplication
            );


            saveApplications(
                applications
            );


            const message =
                document.getElementById(
                    "applicationMessage"
                );


            if (message) {

                message.style.color =
                    "#16805b";

                message.textContent =
                    "Application saved successfully!";

            }


            setTimeout(function() {

                window.location.href =
                    "applications.html";

            }, 800);

        }
    );
}


/* =========================================
   USER APPLICATIONS
========================================= */

const applicationsContainer =
    document.getElementById(
        "applicationsContainer"
    );


function displayApplications() {

    if (!applicationsContainer) {
        return;
    }


    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "jobtrackCurrentUser"
            )
        );


    if (!currentUser) {

        window.location.href =
            "login.html";

        return;
    }


    const applications =
        getApplications();


    let userApplications =
        applications.filter(
            function(application) {

                return application.userEmail ===
                    currentUser.email;

            }
        );


    const searchInput =
        document.getElementById(
            "searchApplication"
        );


    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    const searchText =
        searchInput
            ? searchInput.value.toLowerCase()
            : "";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "All";


    userApplications =
        userApplications.filter(
            function(application) {

                const company =
                    String(
                        application.company || ""
                    ).toLowerCase();

                const jobRole =
                    String(
                        application.jobRole || ""
                    ).toLowerCase();


                const matchesSearch =
                    company.includes(searchText) ||
                    jobRole.includes(searchText);


                const matchesStatus =
                    selectedStatus === "All" ||
                    application.status ===
                        selectedStatus;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    applicationsContainer.innerHTML =
        "";


    if (userApplications.length === 0) {

        applicationsContainer.innerHTML = `

            <div class="no-applications">

                <h3>
                    No Applications Found
                </h3>

                <p>
                    You haven't added any job applications yet.
                </p>

                <a
                    href="add-application.html"
                    class="btn get-started"
                >
                    Add Application
                </a>

            </div>

        `;

        return;
    }


    userApplications.forEach(
        function(application) {

            const card =
                document.createElement("div");


            card.className =
                "application-card";


            let statusClass =
                "status-applied";


            if (
                String(application.status)
                    .trim()
                    .toLowerCase()
                    === "interview"
            ) {

                statusClass =
                    "status-interview";

            }

            else if (
                String(application.status)
                    .trim()
                    .toLowerCase()
                    === "selected"
            ) {

                statusClass =
                    "status-selected";

            }

            else if (
                String(application.status)
                    .trim()
                    .toLowerCase()
                    === "rejected"
            ) {

                statusClass =
                    "status-rejected";

            }


            card.innerHTML = `

                <div class="application-top">

                    <div>

                        <h2 class="application-company">
                            ${application.company}
                        </h2>

                        <p class="application-role">
                            ${application.jobRole}
                        </p>

                    </div>


                    <span
                        class="status-badge ${statusClass}"
                    >
                        ${application.status}
                    </span>

                </div>


                <div class="application-details">

                    <div class="application-detail">

                        <p>Location</p>

                        <p>
                            ${application.location}
                        </p>

                    </div>


                    <div class="application-detail">

                        <p>Job Type</p>

                        <p>
                            ${application.jobType}
                        </p>

                    </div>


                    <div class="application-detail">

                        <p>Applied On</p>

                        <p>
                            ${application.applicationDate}
                        </p>

                    </div>


                    <div class="application-detail">

                        <p>Interview</p>

                        <p>
                            ${
                                application.interviewDate ||
                                "Not Scheduled"
                            }
                        </p>

                    </div>

                </div>


                ${
                    application.notes
                    ?
                    `
                    <div class="application-notes">

                        <strong>
                            Notes:
                        </strong>

                        ${application.notes}

                    </div>
                    `
                    :
                    ""
                }


                <div
                    class="application-actions"
                    style="
                        display:flex;
                        gap:10px;
                        margin-top:15px;
                    "
                >

                    <button
                        type="button"
                        onclick="editApplication(${application.id})"
                        style="
                            padding:8px 12px;
                            border:1px solid #2f6fed;
                            border-radius:5px;
                            background:#ffffff;
                            color:#2f6fed;
                            cursor:pointer;
                            font-size:14px;
                            font-weight:500;
                        "
                    >
                        Edit Application
                    </button>


                    <button
                        type="button"
                        class="delete-btn"
                        onclick="deleteApplication(${application.id})"
                    >
                        Delete Application
                    </button>

                </div>

            `;


            applicationsContainer.appendChild(
                card
            );

        }
    );

}


/* =========================================
   EDIT APPLICATION
========================================= */

function editApplication(id) {

    const applications =
        getApplications();


    const application =
        applications.find(
            function(item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!application) {

        alert(
            "Application not found."
        );

        return;
    }


    localStorage.setItem(
        "editApplicationId",
        String(id)
    );


    window.location.href =
        "add-application.html";

}


/* =========================================
   DELETE APPLICATION
========================================= */

function deleteApplication(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this application?"
        );


    if (!confirmDelete) {
        return;
    }


    let applications =
        getApplications();


    applications =
        applications.filter(
            function(application) {

                return String(application.id) !==
                    String(id);

            }
        );


    saveApplications(
        applications
    );


    displayApplications();

}


/* =========================================
   USER SEARCH & FILTER
========================================= */

const searchApplication =
    document.getElementById(
        "searchApplication"
    );


if (searchApplication) {

    searchApplication.addEventListener(
        "input",
        displayApplications
    );

}


const statusFilter =
    document.getElementById(
        "statusFilter"
    );


if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        displayApplications
    );

}


if (applicationsContainer) {

    displayApplications();

}


/* =========================================
   ADMIN DASHBOARD
========================================= */

function loadAdminDashboard() {

    const adminTotalUsers =
        document.getElementById(
            "adminTotalUsers"
        );

    const adminTotalApplications =
        document.getElementById(
            "adminTotalApplications"
        );

    const adminInterviews =
        document.getElementById(
            "adminInterviews"
        );

    const adminSelected =
        document.getElementById(
            "adminSelected"
        );


    if (!adminTotalUsers) {
        return;
    }


    const users =
        getUsers();

    const applications =
        getApplications();


    adminTotalUsers.textContent =
        users.length;


    adminTotalApplications.textContent =
        applications.length;


    const interviews =
        applications.filter(
            function(application) {

                return (
                    String(application.status)
                        .trim()
                        .toLowerCase()
                    === "interview"
                );

            }
        );


    const selected =
        applications.filter(
            function(application) {

                return (
                    String(application.status)
                        .trim()
                        .toLowerCase()
                    === "selected"
                );

            }
        );


    adminInterviews.textContent =
        interviews.length;


    adminSelected.textContent =
        selected.length;

}


if (
    document.getElementById(
        "adminTotalUsers"
    )
) {

    loadAdminDashboard();

}


/* =========================================
   MANAGE USERS
========================================= */

const usersTableBody =
    document.getElementById(
        "usersTableBody"
    );


function displayUsers() {

    if (!usersTableBody) {
        return;
    }


    const users =
        getUsers();


    usersTableBody.innerHTML =
        "";


    if (users.length === 0) {

        usersTableBody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="no-users"
                >
                    No registered users found.
                </td>

            </tr>

        `;

        return;
    }


    users.forEach(
        function(user, index) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${user.name}
                </td>

                <td>
                    ${user.email}
                </td>

                <td>

                    <span class="user-role">
                        User
                    </span>

                </td>

                <td>

                    <button
                        class="remove-user-btn"
                        onclick="deleteUser('${user.email}')"
                    >
                        Delete
                    </button>

                </td>

            `;


            usersTableBody.appendChild(
                row
            );

        }
    );

}


function deleteUser(email) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this user?"
        );


    if (!confirmDelete) {
        return;
    }


    let users =
        getUsers();


    users =
        users.filter(
            function(user) {

                return user.email !==
                    email;

            }
        );


    saveUsers(users);


    let applications =
        getApplications();


    applications =
        applications.filter(
            function(application) {

                return application.userEmail !==
                    email;

            }
        );


    saveApplications(
        applications
    );


    displayUsers();

}


if (usersTableBody) {

    displayUsers();

}


/* =========================================
   ALL APPLICATIONS - ADMIN
========================================= */

const allApplicationsContainer =
    document.getElementById(
        "allApplicationsContainer"
    );


function displayAllApplications() {

    if (!allApplicationsContainer) {
        return;
    }


    const applications =
        getApplications();

    const users =
        getUsers();


    const searchInput =
        document.getElementById(
            "adminSearchApplication"
        );


    const statusFilter =
        document.getElementById(
            "adminStatusFilter"
        );


    const searchText =
        searchInput
            ? searchInput.value.toLowerCase()
            : "";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "All";


    let filteredApplications =
        applications.filter(
            function(application) {

                const user =
                    users.find(
                        function(user) {

                            return user.email ===
                                application.userEmail;

                        }
                    );


                const userName =
                    user
                        ? String(user.name)
                            .toLowerCase()
                        : "";


                const company =
                    String(
                        application.company || ""
                    ).toLowerCase();


                const jobRole =
                    String(
                        application.jobRole || ""
                    ).toLowerCase();


                const matchesSearch =

                    company.includes(
                        searchText
                    )

                    ||

                    jobRole.includes(
                        searchText
                    )

                    ||

                    userName.includes(
                        searchText
                    );


                const matchesStatus =

                    selectedStatus === "All"

                    ||

                    String(application.status)
                        .trim()
                    === selectedStatus;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    allApplicationsContainer.innerHTML =
        "";


    if (
        filteredApplications.length === 0
    ) {

        allApplicationsContainer.innerHTML = `

            <div class="no-applications">

                <h3>
                    No Applications Found
                </h3>

                <p>
                    There are no applications
                    matching your search.
                </p>

            </div>

        `;

        return;
    }


    filteredApplications.forEach(
        function(application) {

            const user =
                users.find(
                    function(user) {

                        return user.email ===
                            application.userEmail;

                    }
                );


            const card =
                document.createElement("div");


            card.className =
                "application-card";


            let statusClass =
                "status-applied";


            const normalizedStatus =
                String(application.status)
                    .trim()
                    .toLowerCase();


            if (
                normalizedStatus ===
                "interview"
            ) {

                statusClass =
                    "status-interview";

            }

            else if (
                normalizedStatus ===
                "selected"
            ) {

                statusClass =
                    "status-selected";

            }

            else if (
                normalizedStatus ===
                "rejected"
            ) {

                statusClass =
                    "status-rejected";

            }


            card.innerHTML = `

                <div class="application-top">

                    <div>

                        <h2 class="application-company">
                            ${application.company}
                        </h2>

                        <p class="application-role">
                            ${application.jobRole}
                        </p>

                    </div>


                    <span
                        class="status-badge ${statusClass}"
                    >
                        ${application.status}
                    </span>

                </div>


                <div class="application-details">

                    <div class="application-detail">

                        <p>
                            Applicant
                        </p>

                        <p>
                            ${
                                user
                                ? user.name
                                : "Unknown User"
                            }
                        </p>

                    </div>


                    <div class="application-detail">

                        <p>
                            Email
                        </p>

                        <p>
                            ${application.userEmail}
                        </p>

                    </div>


                    <div class="application-detail">

                        <p>
                            Location
                        </p>

                        <p>
                            ${application.location}
                        </p>

                    </div>


                    <div class="application-detail">

                        <p>
                            Applied On
                        </p>

                        <p>
                            ${application.applicationDate}
                        </p>

                    </div>

                </div>


                ${
                    application.notes
                    ?
                    `
                    <div class="application-notes">

                        <strong>
                            Notes:
                        </strong>

                        ${application.notes}

                    </div>
                    `
                    :
                    ""
                }

            `;


            allApplicationsContainer.appendChild(
                card
            );

        }
    );

}


if (allApplicationsContainer) {

    displayAllApplications();

}


/* =========================================
   ADMIN SEARCH & FILTER
========================================= */

const adminSearchApplication =
    document.getElementById(
        "adminSearchApplication"
    );


if (adminSearchApplication) {

    adminSearchApplication.addEventListener(
        "input",
        displayAllApplications
    );

}


const adminStatusFilter =
    document.getElementById(
        "adminStatusFilter"
    );


if (adminStatusFilter) {

    adminStatusFilter.addEventListener(
        "change",
        displayAllApplications
    );

}


/* =========================================
   USER DASHBOARD
========================================= */

function loadUserDashboard() {

    const totalApplications =
        document.getElementById(
            "totalApplications"
        );


    const appliedCount =
        document.getElementById(
            "appliedApplications"
        ) ||
        document.getElementById(
            "appliedCount"
        );


    const interviewCount =
        document.getElementById(
            "interviewApplications"
        ) ||
        document.getElementById(
            "interviewCount"
        );


    const selectedCount =
        document.getElementById(
            "selectedApplications"
        ) ||
        document.getElementById(
            "selectedCount"
        );


    const recentApplications =
        document.getElementById(
            "recentApplications"
        );


    if (!totalApplications) {
        return;
    }


    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "jobtrackCurrentUser"
            )
        );


    if (!currentUser) {

        window.location.href =
            "login.html";

        return;
    }


    const applications =
        getApplications();


    const userApplications =
        applications.filter(
            function(application) {

                return application.userEmail ===
                    currentUser.email;

            }
        );


    totalApplications.textContent =
        userApplications.length;


    const applied =
        userApplications.filter(
            function(application) {

                return (
                    String(application.status)
                        .trim()
                        .toLowerCase()
                    === "applied"
                );

            }
        );


    const interviews =
        userApplications.filter(
            function(application) {

                return (
                    String(application.status)
                        .trim()
                        .toLowerCase()
                    === "interview"
                );

            }
        );


    const selected =
        userApplications.filter(
            function(application) {

                return (
                    String(application.status)
                        .trim()
                        .toLowerCase()
                    === "selected"
                );

            }
        );


    if (appliedCount) {

        appliedCount.textContent =
            applied.length;

    }


    if (interviewCount) {

        interviewCount.textContent =
            interviews.length;

    }


    if (selectedCount) {

        selectedCount.textContent =
            selected.length;

    }


    if (!recentApplications) {
        return;
    }


    recentApplications.innerHTML =
        "";


    if (userApplications.length === 0) {

        recentApplications.innerHTML = `

            <div class="no-applications">

                <div style="font-size:40px;">
                    📁
                </div>

                <h3>
                    No applications yet
                </h3>

                <p>
                    Start tracking your job applications
                    by adding your first application.
                </p>

                <a
                    href="add-application.html"
                    class="btn get-started"
                >
                    Add Application
                </a>

            </div>

        `;

        return;
    }


    const recent =
        userApplications
            .slice()
            .reverse()
            .slice(0, 3);


    recent.forEach(
        function(application) {

            let statusClass =
                "status-applied";


            const normalizedStatus =
                String(application.status)
                    .trim()
                    .toLowerCase();


            if (
                normalizedStatus ===
                "interview"
            ) {

                statusClass =
                    "status-interview";

            }

            else if (
                normalizedStatus ===
                "selected"
            ) {

                statusClass =
                    "status-selected";

            }

            else if (
                normalizedStatus ===
                "rejected"
            ) {

                statusClass =
                    "status-rejected";

            }


            const card =
                document.createElement("div");


            card.className =
                "dashboard-application";


            card.innerHTML = `

                <div>

                    <h3>
                        ${application.company}
                    </h3>

                    <p>
                        ${application.jobRole}
                    </p>

                    <small>
                        ${application.location}
                    </small>

                </div>


                <span
                    class="status-badge ${statusClass}"
                >
                    ${application.status}
                </span>

            `;


            recentApplications.appendChild(
                card
            );

        }
    );

}


if (
    document.getElementById(
        "totalApplications"
    )
) {

    loadUserDashboard();

}


/* =========================================
   PAGE ACCESS PROTECTION
   FIXED VERSION
========================================= */

const currentUser =
    JSON.parse(
        localStorage.getItem(
            "jobtrackCurrentUser"
        )
    );


const currentPage =
    window.location.pathname
        .split("/")
        .pop();


/* =========================================
   USER PAGES
========================================= */

const userPages = [

    "user-dashboard.html",

    "add-application.html",

    "applications.html"

];


if (
    userPages.includes(currentPage)
) {

    if (!currentUser) {

        window.location.href =
            "login.html";

    }

    else if (
        currentUser.role !== "user"
    ) {

        window.location.href =
            "admin-dashboard.html";

    }

}


/* =========================================
   ADMIN PAGES
========================================= */

const adminPages = [

    "admin-dashboard.html",

    "manage-users.html",

    "all-applications.html"

];


if (
    adminPages.includes(currentPage)
) {

    if (!currentUser) {

        window.location.href =
            "login.html";

    }

    else if (
        currentUser.role !== "admin"
    ) {

        window.location.href =
            "user-dashboard.html";

    }

}


/* =========================================
   LOGOUT
========================================= */

document.addEventListener(
    "click",
    function(event) {

        const clickedElement =
            event.target.closest("a");


        if (!clickedElement) {
            return;
        }


        const linkText =
            clickedElement.textContent
                .trim()
                .toLowerCase();


        if (linkText === "logout") {

            event.preventDefault();


            localStorage.removeItem(
                "jobtrackCurrentUser"
            );


            window.location.href =
                "login.html";

        }

    }
);