const pics = [
    {
        src: './assets/gallery/talking.jpg',
        class: 'big',
        title: 'Guests at WINS International Womans day event 2024',
        date: 'March 8, 2024',
        details: 'Two people talking and laughing'
    },
    {
        src: './assets/gallery/dance2.jpg',
        class: 'small',
        title: 'Dancers at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Dancers at WINS International Womans day 2024'
    },
    {
        src: './assets/gallery/talking2.jpg',
        class: 'small',
        title: 'Guests watching at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Two people at Interantional womans day 2024'
    },
    {
        src: './assets/gallery/splits2.jpg',
        class: 'big',
        title: 'Contortionist Dancer at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024'
    },
    {
        src: './assets/gallery/speaker.jpg',
        class: 'small',
        title: 'Speaker at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024'
    },
    {
        src: './assets/gallery/speaker2.jpg',
        class: 'small',
        title: 'Speaker at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024'
    },
    {
        src: './assets/gallery/podium.jpg',
        class: 'big',
        title: 'Speaker at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Speaker at WINS International Womans day 2024'
    },
    {
        src: './assets/gallery/podium2.jpg',
        class: 'small',
        title: 'Speaker at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Speaker at WINS International Womans day 2024'
    },
    {
        src: './assets/gallery/mayor.jpg',
        class: 'small',
        title: 'Calgary Mayor Jyoti Gondek at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Calgary Mayor Jyoti Gondek'
    },
    {
        src: './assets/gallery/mayor2.jpg',
        class: 'big',
        title: 'Calgary Mayor Jyoti Gondek at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Calgary Mayor Jyoti Gondek'
    },
    {
        src: './assets/gallery/mayor3.jpg',
        class: 'small',
        title: 'Calgary Mayor Jyoti Gondek at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Calgary Mayor Jyoti Gondek'
    },
    {
        src: './assets/gallery/interview.jpg',
        class: 'small',
        title: 'Wins CEO Karin Ramchuck at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Wins CEO Karin Ramchuck'
    },
    {
        src: './assets/gallery/elder2.jpg',
        class: 'big',
        title: 'Elder at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Elder at WINS International Womans day 2024'
    },
    {
        src: './assets/gallery/dance.jpg',
        class: 'small',
        title: 'Dancers at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Dancers at WINS International Womans day 2024'
    },
    {
        src: './assets/gallery/splits.jpg',
        class: 'small',
        title: 'Contortionist Dancer at International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024' 
    },
];

let gallery = document.getElementById('gallery-section');
let load = function (template) {
    for (let pic of pics) {
        let temp = document.createElement('div');

        temp.innerHTML = template;
        temp.querySelector('article').classList.add(pic.class)
        //Get Picture info
        let img = temp.querySelectorAll('img')[0];
        let hoverText = temp.querySelectorAll('.hover-text')[0];

        //Set Picture info
        img.src = pic.src; 
        img.alt =pic.details;
        hoverText.textContent = pic.title; 
        
        //Add click event 
        let cardElement = temp.querySelector('.gallery-card');
        cardElement.addEventListener('click', ()=>{
            openModal(pic);
            
        });

        gallery.insertAdjacentElement('beforeend',cardElement);
    }
    addBehavior();
}

// Load Gallery Template
function loadTemplate(templatePath) {
    fetch(templatePath)
        .then(response => response.text())
        .then(data => {
            load(data);
        })
        .catch(error => console.error('Error fetching template:', error));
}
loadTemplate('./templates/gallery-card.html');



//Modal section
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let openModal = function (picData) {
    
    let title = document.querySelector(".modal-content h3");
    let date = document.querySelector(".modal-content h4");
    let details = document.querySelector(".modal-content span");
    let img = document.querySelector(".modal-content img");

    title.innerText = picData.title;
    date.innerText = picData.date;
    details.innerText = picData.details;
    img.src = picData.src;

    modal.style.display = "flex";
}

// Close MOdal
let closeModal = function () {
    modal.style.display = "none";
}
span.addEventListener('click', closeModal);

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



const addBehavior = ()=> {
    // ANIMATION for Camera 
    const cameraCard = document.querySelectorAll('.camera-card, #gallery-wrapper');

    if (cameraCard.length) {
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {
            if (entry.target.classList.contains('camera-card')) {
                entry.target.classList.toggle("card-img-animation", entry.isIntersecting);
            } else {
                console.log('asd')
                document.body.classList.toggle("dark-mode", entry.isIntersecting);
                entry.target.classList.toggle("card-img-animation", false);
            }
    
        
        });

    }, {
        threshold: 0.1
    });

    cameraCard.forEach(im => observer.observe(im));
    }

    // ANIMATION for Camera 
    const galleryCard = document.querySelectorAll('.gallery-card');

    if (galleryCard.length) {
    const observerGc = new IntersectionObserver((entries, observerGc) => {

        entries.forEach(entry => {
           
            entry.target.classList.toggle("gallery-card-animation", entry.isIntersecting);
        });

    }, {
        threshold: 0.4
    });

    galleryCard.forEach(im => observerGc.observe(im));
    }
}