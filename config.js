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
      category: "Cursos de preparación para exámenes estandarizados"
    },

    {
      id: "gre",
      name: "GRE",
      category: "Cursos de preparación para exámenes estandarizados"
    },

    {
      id: "sat",
      name: "SAT",
      category: "Cursos de preparación para exámenes estandarizados"
    },

    {
      id: "toefl",
      name: "TOEFL",
      category: "Cursos de preparación para exámenes estandarizados"
    },

    {
      id: "ielts",
      name: "IELTS",
      category: "Cursos de preparación para exámenes estandarizados"
    },

    {
      id: "academic_english_exams",
      name: "Academic English for Exams",
      category: "Cursos de nivelación"
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
      topic: "verbal"
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
      key: "connectivity",
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
      label: "Antes o durante las clases, el personal administrativo fue amable y atento a cualquier necesidad o duda"
    },

    {
      key: "speed",
      label: "El personal administrativo respondió a tus consultas oportunamente"
    },

    {
      key: "communication",
      label: "El personal administrativo fue claro en explicar el servicio contratado"
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