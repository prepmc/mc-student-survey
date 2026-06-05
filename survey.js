/* =========================================================
   MASTER'S COLLEGE SURVEY
   CORE ENGINE
========================================================= */

const state = {

    currentScreen: 0,

    course: null,

    classType: null,

    selectedTeachers: [],

    teacherRatings: {},

    institution: {

        materials: null,

        administration: null,

        communication: null

    },

    nps: null,

    comments: "",

    submittedAt: null

};

let isSubmitting = false;



/* =========================================================
   APP
========================================================= */

const app = {

    screens: [],

    totalScreens: 0,

    init() {

        this.attachGlobalEvents();

    },

    start() {

        this.buildScreens();

        this.currentScreen = 0;

        this.render();

    },

    buildScreens() {

        this.screens = [

            "course",

            "classType",

            "teachers"

        ];

    },

    render() {

        const screen =
            this.screens[this.currentScreen];

        switch(screen.type || screen) {

            case "course":
                renderCourseScreen();
                break;

            case "classType":
                renderClassTypeScreen();
                break;

            case "teachers":
                renderTeacherSelectionScreen();
                break;

            case "teacher":
                renderTeacherEvaluationScreen(
                    screen.teacher
                );
                break;

            case "institution":
                renderInstitutionScreen();
                break;

            case "nps":
                renderNPSScreen();
                break;

            case "comments":
                renderCommentsScreen();
                break;

            case "success":
                renderSuccessScreen();
                break;

        }

        this.updateProgress();

    },

    next() {

        if(!this.validateCurrentScreen()) {

            showError(
                "Por favor, completa esta sección antes de continuar."
            );

            return;
        }

        this.currentScreen++;

        this.render();

    },

    previous() {

        if(this.currentScreen === 0) {
            return;
        }

        this.currentScreen--;

        this.render();

    },

    updateProgress() {

        const currentStep =
            getCurrentStep();

        const progress =

            ((currentStep + 1)
            / STEPS.length)

            * 100;

        const bar =
            document.getElementById(
                "progressBar"
            );

        if(bar) {

            bar.style.width =
                `${progress}%`;

        }

    },

    validateCurrentScreen() {

        const current =
        this.screens[
            this.currentScreen
        ];

        if(
            typeof current === "object" &&
            current.type === "teacher"
        ) {

            return validateTeacherScreen(
                current.teacher
            );

        }

        switch(current) {

            case "course":

                return (
                    state.course !== null
                );

            case "classType":

                return (
                    state.classType !== null
                );

            case "teachers":

                return (
                    state.selectedTeachers
                        .length > 0
                );

            case "institution":

                return validateInstitution();

            case "nps":

                return (
                    state.nps !== null
                );

            default:

                return true;

        }

    },

    attachGlobalEvents() {

        document.addEventListener(
            "click",
            (event) => {

                if(
                    event.target.id ===
                    "startBtn"
                ) {

                    document
                        .getElementById(
                            "loading-screen"
                        )
                        .remove();

                    app.start();

                }

            }
        );

    }

};



/* =========================================================
   DOM HELPERS
========================================================= */

function getApp() {

    return document.getElementById(
        "app"
    );

}



function createScreenLayout(
    title,
    subtitle,
    content
) {

    return `

    <div class="progress-wrapper">
        <div id="progressBar"></div>
    </div>

    <section class="screen">

        <h2 class="section-title">
            ${title}
        </h2>

        ${
            subtitle
            ?
            `<p class="section-subtitle">
                ${subtitle}
            </p>`
            :
            ""
        }

        ${content}

        <div class="navigation">

            ${
                app.currentScreen > 0
                ?
                `
                <button
                    class="btn-secondary"
                    onclick="app.previous()">

                    Atrás

                </button>
                `
                :
                `<div></div>`
            }

            <button
                class="btn-primary"
                onclick="app.next()">

                Continuar

            </button>

        </div>

    </section>

    `;

}



/* =========================================================
   NOTIFICATIONS
========================================================= */

function showError(message) {

    const toast =
        document.createElement("div");

    toast.className =
        "toast error";

    toast.innerText =
        message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.remove();

    },3000);

}



/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        app.init();

    }
);

/* =========================================================
   COURSE SCREEN
========================================================= */

function renderCourseScreen() {

    const categories = {};

    CONFIG.courses.forEach(course => {

        if (!categories[course.category]) {
            categories[course.category] = [];
        }

        categories[course.category].push(course);

    });

    let html = '';

    Object.entries(categories).forEach(
        ([category, courses]) => {

            html += `
                <div class="course-category">

                    <h3 class="category-title">
                        ${category}
                    </h3>

                    <div class="cards-grid">
            `;

            courses.forEach(course => {

                html += `
                    <div
                        class="option-card ${
                            state.course === course.id
                                ? 'selected'
                                : ''
                        }"

                        data-course="${course.id}"

                        onclick="
                            selectCourse(
                                '${course.id}'
                            )
                        ">

                        ${course.name}

                    </div>
                `;

            });

            html += `
                    </div>
                </div>
            `;

        }
    );

    getApp().innerHTML =
        createScreenLayout(
            "¿Qué curso llevaste?",
            "Selecciona el programa que cursaste.",
            html
        );

}



/* =========================================================
   SELECT COURSE
========================================================= */

function selectCourse(courseId) {

    state.course = courseId;

    document
        .querySelectorAll(
            '[data-course]'
        )
        .forEach(card => {

            card.classList.remove(
                'selected'
            );

        });

    document
        .querySelector(
            `[data-course="${courseId}"]`
        )
        ?.classList.add(
            'selected'
        );

}



/* =========================================================
   CLASS TYPE SCREEN
========================================================= */

function renderClassTypeScreen() {

    const html = `

        <div class="cards-grid">

            ${CONFIG.classTypes.map(type => `

                <div
                    class="option-card ${
                        state.classType === type.id
                        ? 'selected'
                        : ''
                    }"

                    data-class-type="${type.id}"

                    onclick="
                        selectClassType(
                            '${type.id}'
                        )
                    ">

                    ${type.name}

                </div>

            `).join('')}

        </div>

    `;

    getApp().innerHTML =
        createScreenLayout(
            "Modalidad",
            "¿Cómo llevaste tus clases?",
            html
        );

}



/* =========================================================
   SELECT CLASS TYPE
========================================================= */

function selectClassType(typeId) {

    state.classType = typeId;

    document
        .querySelectorAll(
            '[data-class-type]'
        )
        .forEach(card => {

            card.classList.remove(
                'selected'
            );

        });

    document
        .querySelector(
            `[data-class-type="${typeId}"]`
        )
        ?.classList.add(
            'selected'
        );

}



/* =========================================================
   TEACHER SELECTION SCREEN
========================================================= */

function renderTeacherSelectionScreen() {

    const html = `

        <div class="teacher-list">

            ${CONFIG.teachers.map(
                teacher => `

                <label
                    class="teacher-item">

                    <input
                        type="checkbox"

                        value="${teacher.id}"

                        ${
                            state.selectedTeachers.includes(
                                teacher.id
                            )
                            ? 'checked'
                            : ''
                        }

                        onchange="
                            toggleTeacher(
                                '${teacher.id}'
                            )
                        "
                    >

                    <span>
                        ${teacher.name}
                    </span>

                </label>

            `
            ).join('')}

        </div>

    `;

    getApp().innerHTML =
        createScreenLayout(
            "Profesores",
            "Selecciona todos los profesores con los que estudiaste.",
            html
        );

}



/* =========================================================
   TOGGLE TEACHER
========================================================= */

function toggleTeacher(
    teacherId
) {

    const exists =

        state.selectedTeachers.includes(
            teacherId
        );

    const teacher =

        CONFIG.teachers.find(
            t => t.id === teacherId
        );

    if(exists) {

        state.selectedTeachers =

            state.selectedTeachers.filter(
                t => t !== teacherId
            );

        delete state.teacherRatings[
            teacherId
        ];

    } else {

        state.selectedTeachers.push(
            teacherId
        );

        state.teacherRatings[
            teacherId
        ] = {

            id: teacher.id,

            name: teacher.name,

            punctuality: null,

            organization: null,

            expertise: null,

            usefulness: null,

            recommendation: null

        };

    }

}



/* =========================================================
   BUILD TEACHER SCREENS
========================================================= */

function buildTeacherScreens() {

    const teacherScreens =
        state.selectedTeachers.map(
            teacher => ({
                type: "teacher",
                teacher
            })
        );

    const baseScreens = [

        "course",

        "classType",

        "teachers"

    ];

    const finalScreens = [

        ...baseScreens,

        ...teacherScreens,

        "institution",

        "nps",

        "comments",

        "success"

    ];

    app.screens =
        finalScreens;

    app.totalScreens =
        finalScreens.length;

}



/* =========================================================
   OVERRIDE NEXT()
========================================================= */

const originalNext =
    app.next.bind(app);

app.next = async function() {

    /*console.log("CURRENT SCREEN:", this.currentScreen);
    console.log("CURRENT VALUE:", this.screens[this.currentScreen]);
    console.log("VALIDATION:", this.validateCurrentScreen());*/

    if(
        !this.validateCurrentScreen()
    ) {

        showError(
            "Por favor, completa esta sección antes de continuar."
        );

        return;

    }

    const current =
        this.screens[
            this.currentScreen
        ];

    if(
        current === "teachers"
    ) {

        buildTeacherScreens();

    }

    if(
        current === "comments"
    ) {

        const success =
            await submitSurvey();

        if(!success) {

            showError(
                "No fue posible enviar la encuesta."
            );

            return;

        }

    }

    this.currentScreen++;

    this.render();

};

/* =========================================================
   TEACHER EVALUATION SCREEN
========================================================= */

function renderTeacherEvaluationScreen(
    teacherId
) {

    const teacher =
        state.teacherRatings[
            teacherId
        ];

    let html = `

        <div class="rating-matrix">

            <div class="rating-header">

                <div></div>

                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>

            </div>

    `;

    CONFIG.teacherQuestions.forEach(
        question => {

            html += `

            <div class="rating-row">

                <div class="rating-question">

                    ${question.label}

                </div>

                ${buildRatingCells(
                    teacher.id,
                    question.key,
                    teacher[
                        question.key
                    ]
                )}

            </div>

            `;

        }
    );

    html += `
        </div>
    `;

    getApp().innerHTML =
        createScreenLayout(
            teacher.name,
            "Evalúa tu experiencia con este profesor.",
            html
        );

}



/* =========================================================
   BUILD RATING CELLS
========================================================= */

function buildRatingCells(
    teacherId,
    questionKey,
    currentValue
) {

    let html = "";

    for(
        let score = 1;
        score <= 5;
        score++
    ) {

        html += `

            <div class="rating-cell">

                <input
                    type="radio"

                    name="
                    ${teacherId}
                    -
                    ${questionKey}
                    "

                    value="${score}"

                    ${
                        currentValue === score
                        ? "checked"
                        : ""
                    }

                    onchange="
                        saveTeacherRating(
                            '${teacherId}',
                            '${questionKey}',
                            ${score}
                        )
                    "
                >

            </div>

        `;

    }

    return html;

}



/* =========================================================
   VALIDATE TEACHER SCREEN
========================================================= */

function validateTeacherScreen(
    teacherId
) {

    const teacher =
        state.teacherRatings[
            teacherId
        ];

    return CONFIG.teacherQuestions.every(
        question =>
            teacher[
                question.key
            ] !== null
    );

}






/* =========================================================
   SAVE TEACHER RATING
========================================================= */

function saveTeacherRating(
    teacherId,
    questionKey,
    score
) {

    state.teacherRatings[
        teacherId
    ][questionKey] = score;

}







/* =========================================================
   INSTITUTION SCREEN
========================================================= */

function renderInstitutionScreen() {

    let html = `

        <div class="rating-matrix">

            <div class="rating-header">

                <div></div>

                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>

            </div>

    `;

    CONFIG.institutionQuestions.forEach(
        question => {

            html += `

                <div class="rating-row">

                    <div class="rating-question">

                        ${question.label}

                    </div>

                    ${buildInstitutionCells(
                        question.key,
                        state.institution[
                            question.key
                        ]
                    )}

                </div>

            `;

        }
    );

    html += `
        </div>
    `;

    getApp().innerHTML =
        createScreenLayout(
            "Experiencia institucional",
            "Evalúa los aspectos generales de Master's College.",
            html
        );

}



/* =========================================================
   BUILD INSTITUTION CELLS
========================================================= */

function buildInstitutionCells(
    questionKey,
    currentValue
) {

    let html = "";

    for(
        let score = 1;
        score <= 5;
        score++
    ) {

        html += `

            <div class="rating-cell">

                <input
                    type="radio"

                    name="
                    institution-
                    ${questionKey}
                    "

                    value="${score}"

                    ${
                        currentValue === score
                        ? "checked"
                        : ""
                    }

                    onchange="
                        saveInstitutionRating(
                            '${questionKey}',
                            ${score}
                        )
                    "
                >

            </div>

        `;

    }

    return html;

}




/* =========================================================
   SAVE INSTITUTION RATING
========================================================= */

function saveInstitutionRating(
    questionKey,
    score
) {

    state.institution[
        questionKey
    ] = score;

}





/* =========================================================
   VALIDATE INSTITUTION
========================================================= */

function validateInstitution() {

    return CONFIG
        .institutionQuestions
        .every(
            question => {

                const value =
                    state.institution[
                        question.key
                    ];

                return (
                    value !== null &&
                    value !== undefined
                );

            }
        );

}




/* =========================================================
   NPS SCREEN
========================================================= */

function renderNPSScreen() {

    let html = `

        <div class="nps-wrapper">

            <div class="nps-labels">

                <span>
                    Nada probable
                </span>

                <span>
                    Extremadamente probable
                </span>

            </div>

            <div class="nps-grid">

    `;

    for(
        let score = 0;
        score <= 10;
        score++
    ) {

        html += `

            <button
                class="
                    nps-btn
                    ${
                        state.nps === score
                        ? "selected"
                        : ""
                    }
                "

                data-score="${score}"

                onclick="
                    selectNPS(${score})
                ">

                ${score}

            </button>

        `;

    }

    html += `
            </div>
        </div>
    `;

    getApp().innerHTML =
        createScreenLayout(
            "Recomendación",
            "¿Qué tan probable es que recomiendes Master's College a un amigo, familiar o colega?",
            html
        );

}




/* =========================================================
   SAVE NPS
========================================================= */

function selectNPS(score) {

    state.nps = score;

    document
        .querySelectorAll(
            '.nps-btn'
        )
        .forEach(btn => {

            btn.classList.remove(
                'selected'
            );

        });

    document
        .querySelector(
            `[data-score="${score}"]`
        )
        ?.classList.add(
            'selected'
        );

}





/* =========================================================
   COMMENTS SCREEN
========================================================= */

function renderCommentsScreen() {

    const html = `

        <textarea
            id="commentsField"

            placeholder="Comparte cualquier comentario, sugerencia o recomendación.
            "
        >${state.comments}</textarea>

    `;

    getApp().innerHTML =
        createScreenLayout(
            "Comentarios finales",
            "Este campo es opcional.",
            html
        );

    const textarea =
        document.getElementById(
            "commentsField"
        );

    textarea.addEventListener(
        "input",
        (e) => {

            state.comments =
                e.target.value;

        }
    );

}





/* =========================================================
   SUCCESS SCREEN
========================================================= */

function renderSuccessScreen() {

    getApp().innerHTML = `

        <section class="success">

            <img src="logo.png" alt="Master's College" class="logo">

            <div class="success-icon">

                ✓

            </div>

            <h2>

                ¡Gracias por compartir tu experiencia!

            </h2>

            <p>

                Tus respuestas nos ayudan a seguir mejorando la calidad académica y el servicio que brindamos a nuestros estudiantes.

            </p>

            <p>

                Master's College valora tu opinión.

            </p>

        </section>

    `;

}




/* =========================================================
   BUILD PAYLOAD
========================================================= */

function buildPayload() {

    const payload = {

        Timestamp:
            new Date().toISOString(),

        Course:
            state.course,

        ClassType:
            state.classType,

        Institution_Materials:
            state.institution.materials,

        Institution_Administration:
            state.institution.administration,

        Institution_Communication:
            state.institution.communication,

        NPS:
            state.nps,

        Comments:
            state.comments || ""

    };

    const selectedTeachers =

        state.selectedTeachers.map(
            teacherId =>

                state.teacherRatings[
                    teacherId
                ]
        );

    for(
        let i = 1;
        i <= 20;
        i++
    ) {

        const teacher =

            selectedTeachers[
                i - 1
            ];

        payload[
            `Teacher_${i}_ID`
        ] = teacher?.id || "";

        payload[
            `Teacher_${i}_Name`
        ] = teacher?.name || "";

        payload[
            `Teacher_${i}_Punctuality`
        ] = teacher?.punctuality || "";

        payload[
            `Teacher_${i}_Organization`
        ] = teacher?.organization || "";

        payload[
            `Teacher_${i}_Expertise`
        ] = teacher?.expertise || "";

        payload[
            `Teacher_${i}_Usefulness`
        ] = teacher?.usefulness || "";

        payload[
            `Teacher_${i}_Recommendation`
        ] = teacher?.recommendation || "";

    }

    return payload;

}




/* =========================================================
   CONFIG
========================================================= */

const GAS_URL = "https://script.google.com/a/macros/masterscollege.com.pe/s/AKfycbwK3vditBrrdjB0VWsHLX20NPjE5fQkQhoN1oP4HIE4Iaw9KQ6MKSH4ZUkDsQD2gHUepQ/exec";





/* =========================================================
   SUBMIT
========================================================= */

async function submitSurvey() {

    if(state.submittedAt) {

        console.log(
            "Encuesta ya enviada."
        );

        return true;

    }

    if(isSubmitting) {

        return false;

    }

    if(!GAS_URL) {

        console.log(
            "Google Apps Script no configurado."
        );

        return true;

    }

    isSubmitting = true;

    setSubmittingState(
        true
    );

    const payload =
        buildPayload();

    const DEBUG = false;

    if(DEBUG) {

        console.log(payload);

    }

    try {

        const response =
            await fetch(
                GAS_URL,
                {
                    method: "POST",

                    body:
                        JSON.stringify(
                            payload
                        )
                }
            );

        if(response.ok) {

            state.submittedAt =
                new Date().toISOString();

        }

        return response.ok;

    }
    catch(error) {

        console.error(error);

        return false;

    }
    finally {

        isSubmitting = false;

        setSubmittingState(
            false
        );

    }

}

function getCurrentStep() {

    const current =
        app.screens[
            app.currentScreen
        ];

    const screenType =

        typeof current === "object"

        ? current.type

        : current;

    return STEPS.indexOf(
        screenType
    );

}

function setSubmittingState(
    isLoading
) {

    const button =
        document.querySelector(
            ".btn-primary"
        );

    if(!button) {
        return;
    }

    if(isLoading) {

        button.disabled = true;

        button.innerHTML =
            "Enviando...";

    }
    else {

        button.disabled = false;

        button.innerHTML =
            "Continuar";

    }

}