/* =====================================================
   MASTER'S COLLEGE SURVEY
   CONFIG.JS
===================================================== */

const CONFIG = {

  schoolName: "Master's College",

  branding: {

    primaryColor: "#550F78",
    secondaryColor: "#960F7D",
    accentColor: "#FFCC00",
    textColor: "#111111"

  },

  courses: [

    {
      id: "gmat",
      name: "GMAT",
      category: "Cursos de preparación"
    },

    {
      id: "gre",
      name: "GRE",
      category: "Cursos de preparación"
    },

    {
      id: "sat",
      name: "SAT",
      category: "Cursos de preparación"
    },

    {
      id: "toefl",
      name: "TOEFL",
      category: "Cursos de preparación"
    },

    {
      id: "ielts",
      name: "IELTS",
      category: "Cursos de preparación"
    },

    {
      id: "academic_english_exams",
      name: "Academic English for Exams",
      category: "Cursos de preparación"
    }

  ],

  classTypes: [

    {
      id: "group",
      name: "Grupal"
    },

    {
      id: "private",
      name: "Privado"
    }

  ],

  teachers: [

    {
      id: "oscar_pina",
      name: "Oscar P.",
      topic: "math"
    },
    {
      id: "elias_arellano",
      name: "Elias A.",
      topic: "verbal"
    },
    {
      id: "martha_aguinaga",
      name: "Martha A.",
      topic: "verbal"
    },
    {
      id: "paul_fernandez",
      name: "Paul F.",
      topic: "math"
    },
    {
      id: "luciana_bruno",
      name: "Luciana B.",
      topic: "verbal"
    },
    {
      id: "karen_weberhofer",
      name: "Karen W.",
      topic: "math"
    }    

  ],

  teacherQuestions: [

    {
      key: "punctuality",
      label: "Es puntual"
    },

    {
      key: "organization",
      label: "Sus clases están bien estructuradas y preparadas"
    },

    {
      key: "expertise",
      label: "El contenido de sus clases me ayuda a incrementar mis conocimientos del examen y mi rendimiento en los simulacros"
    },

    {
      key: "usefulness",
      label: "La calidad de su conexión a  internet es buena y estable"
    },

    {
      key: "recommendation",
      label: "Recomendaría a este profesor"
    }

  ],

  institutionQuestions: [

    {
      key: "materials",
      label: "Los materiales digitales entregados contribuyen a mejorar las habilidades requeridas para el examen"
    },

    {
      key: "administration",
      label: "La atención administrativa fue satisfactoria durante las clases"
    },

    {
      key: "communication",
      label: "Las comunicación del personal administrativo fue clara y oportuna"
    }

  ],

  ratingScale: {

    min: 1,
    max: 5

  },

  npsScale: {

    min: 0,
    max: 10

  }

};

const STEPS = [

    "course",

    "classType",

    "teachers",

    "teacher",

    "institution",

    "nps",

    "comments"

];