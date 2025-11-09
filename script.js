document.addEventListener('DOMContentLoaded', () => {
    // Dark / Light Mode
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle){
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
    }

    // Scroll Reveal
    const sections = document.querySelectorAll('.section');
    const revealSection = () => {
        const triggerBottom = window.innerHeight * 0.85;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if(sectionTop < triggerBottom){
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
                section.style.transition = 'all 1s ease-out';
            }
        });
    };
    window.addEventListener('scroll', revealSection);
    revealSection();

    // Navbar dinâmica
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(navbar){
            if(window.scrollY > 50){
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Parallax Hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        if(hero) hero.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
    });

    // EmailJS Form
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('status-msg');
    if(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            emailjs.sendForm('service_d1yjbwp', 'template_wmyuvxh', form)
            .then(() => {
                statusMsg.textContent = "Mensagem enviada com sucesso!";
                form.reset();
            }, (err) => {
                statusMsg.textContent = "Erro ao enviar. Tente novamente.";
                console.error(err);
            });
        });
    }
});
