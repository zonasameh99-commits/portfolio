/* ==========================================================
   EDIT YOUR PROJECTS HERE
   - category must be one of: "Web Apps", "Interactive", "Tools", "Experiments"
   - image: path like "assets/images/my-project.jpg" (leave "" for a generated preview)
   - github / live: leave "" if not available (buttons show as disabled)
   - placeholder: true shows a "Placeholder" tag. Delete it once real.
   ========================================================== */
const featured = {
  title: "Featured Project Name",
  description: "Replace this with a short story of your best project: what it does, who it is for, and what you are proud of in how it was built.",
  technologies: ["HTML", "CSS", "JavaScript"],
  features: ["Replace with a key feature", "Replace with another feature", "Replace with a technical highlight"],
  image: "",
  github: "",
  live: "",
  placeholder: true
};

const projects = [
  { title: "Task Board", description: "Placeholder: a drag-and-drop task board that runs fully in the browser.", category: "Web Apps", technologies: ["HTML", "CSS", "JavaScript"], image: "", github: "", live: "", placeholder: true },
  { title: "Particle Playground", description: "Placeholder: an interactive canvas experience that reacts to the cursor.", category: "Interactive", technologies: ["JavaScript", "Canvas"], image: "", github: "", live: "", placeholder: true },
  { title: "CSS Snippet Library", description: "Placeholder: a searchable set of copy-ready CSS patterns.", category: "Tools", technologies: ["HTML", "CSS", "JavaScript"], image: "", github: "", live: "", placeholder: true },
  { title: "Palette Lab", description: "Placeholder: a small tool for building and checking color palettes.", category: "Tools", technologies: ["CSS", "JavaScript"], image: "", github: "", live: "", placeholder: true },
  { title: "Weather Dashboard", description: "Placeholder: a responsive dashboard that loads live data from a public API.", category: "Web Apps", technologies: ["HTML", "CSS", "JavaScript", "API"], image: "", github: "", live: "", placeholder: true },
  { title: "Scroll Motion Study", description: "Placeholder: an experiment with scroll-driven animation and layout.", category: "Experiments", technologies: ["CSS", "JavaScript"], image: "", github: "", live: "", placeholder: true }
];
const FILTERS = ["All", "Web Apps", "Interactive", "Tools", "Experiments"];
const CATEGORY_LABEL = { "Web Apps": "Web App", "Interactive": "Interactive Experience", "Tools": "Developer Tool", "Experiments": "Creative Web Project" };
