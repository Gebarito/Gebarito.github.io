function getLanguage(){
    var langOpt = document.getElementById("languageSelect");
    var value = langOpt.value;

    return value;
}

function setLanguage(currentLang){
    fetch('assets/JSON/profileText.json').then(response => response.json())
    .then(data=>{
        const bio = document.getElementById('Bio');
        const navHome = document.getElementById('home');
        const navContact = document.getElementById('contacts');
        const navProject = document.getElementById('goto-projects');
        const projectsHeaderTitle = document.getElementById('projects-H2');

        if (data[currentLang]) {
            bio.textContent = data[currentLang].bio;
            navHome.textContent = data[currentLang].navHome;
            navContact.textContent = data[currentLang].navContact;
            navProject.textContent = data[currentLang].navProject;
            projectsHeaderTitle.textContent = data[currentLang].navProject;
        } else {
            bio.textContent = "Student looking for internship";
            navHome.textContent = "Home";
            navContact.textContent = "Contact";
            navProject.textContent = "Project";
          }
          
    }).catch(error =>{
        console.log("Erro ao carregar JSON", error);
    })
}

function downloadCV(currentLanguage){
    const fileName = 'joao_gebara_curriculum' + currentLanguage + ".pdf";
    const fileURL = 'assets/PDF/';
    const link = document.getElementById('CurriculumDownloader');
    
    link.href = fileURL;
    link.download = fileName;
    link.target = '_blank';
}

function displayProjects(currentLanguage){
    fetch('assets/JSON/projectsText.json')
    .then(response=>response.json())
    .then(data=>{
        const projectsContainer = document.getElementById("projectsContainer");
        projectsContainer.innerHTML = '';

        const projectsList = data[currentLanguage];
        for(const key in projectsList){
            if(projectsList.hasOwnProperty(key)){
                const project = projectsList[key];

                const projectElement = document.createElement('div');
                projectElement.classList.add('project');
          
                const titleElement = document.createElement('a');
                titleElement.textContent = project.Title;
                titleElement.href = project.link_to;
          
                const bodyElement = document.createElement('p');
                bodyElement.textContent = project.Body;
          
                // Adiciona os elementos ao contêiner de projetos
                projectElement.appendChild(titleElement);
                projectElement.appendChild(bodyElement);
                projectsContainer.appendChild(projectElement);
            }
        }
    });
}

function scrollToSection() {
    const section = document.getElementById("projectsSession");
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setLanguage(getLanguage());
    displayProjects(getLanguage());

    document.getElementById("languageSelect").addEventListener("change", function() {
        const language = getLanguage();
        
        setLanguage(language);
        displayProjects(language);
    });
    document.getElementById('CurriculumDownloader').addEventListener("click", function(){
        downloadCV(getLanguage());
    })
    document.getElementById('goto-projects').addEventListener("click", function(){
        scrollToSection();
    })
});
