const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

window.addEventListener('load', () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active'); 
    setTimeout(() => {
        header.classList.add('active');
    }, 1100); 
    const currentHash = window.location.hash || '#home';
    updateActiveNavLink(currentHash);
});

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const updateActiveNavLink = (activeId) => {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
};

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth' 
        });
        updateActiveNavLink(targetId);
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});
logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#home').scrollIntoView({
        behavior: 'smooth'
    });
    updateActiveNavLink('#home');
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});
const observerOptions = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.7 
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentSectionId = `#${entry.target.id}`;
            updateActiveNavLink(currentSectionId);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});
const resumeBtns = document.querySelectorAll('.resume-btn');
resumeBtns.forEach((btn,idx)=>{
    btn.addEventListener('click',()=>{
        const resumeDetails = document.querySelectorAll('.resume-detail')
        resumeBtns.forEach(btn=>{
            btn.classList.remove('active');
        });
        btn.classList.add('active');
        resumeDetails.forEach(detail =>{
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
    });
});
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
let index = 0;
const totalPortfolioItems = document.querySelectorAll('.portfolio-detail').length;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
    arrowLeft.classList.toggle('disabled', index === 0);
    arrowRight.classList.toggle('disabled', index === totalPortfolioItems - 1);
}
activePortfolio();

arrowRight.addEventListener('click',() => {
    if (index < totalPortfolioItems - 1){
        index++;
    }
    activePortfolio();
});

arrowLeft.addEventListener('click',() => {
    if (index > 0){
        index--;
    }
    activePortfolio();
});

emailjs.init("X_YtlzHwOEdzOg-Yo");
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

emailjs.send("service_n3b1lgb", "template_3izeui7", {
  full_name: this.full_name.value,
  email: this.email.value,
  phone_number: this.phone_number.value,
  subject: this.subject.value,
  body: this.body.value
})
.then(() => {
  alert("Message sent successfully!");
  this.reset();
}, (error) => {
  alert("Failed to send message: " + error.text);
  console.error("EmailJS Error:", error);
});

  });
}

