// PDF Download functionality
function downloadCV() {
    const element = document.getElementById('cvContent');

    // Show the CV content temporarily for PDF generation
    element.style.display = 'block';
    element.style.width = '100%';
    element.style.margin = '0 auto';

    // Scroll to top of the page to ensure PDF starts from beginning
    window.scrollTo(0, 0);

    // Small delay to ensure scroll completes
    setTimeout(function () {
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: 'Alaka-Yusuf_Abdulbasit_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                logging: false,
                scrollY: 0,
                scrollX: 0,
                windowHeight: element.scrollHeight
            },
            jsPDF: {
                unit: 'in',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        html2pdf().set(opt).from(element).save().then(function () {
            // Hide the CV content again after PDF generation
            element.style.display = 'none';
        }).catch(function (error) {
            console.error('PDF generation error:', error);
            element.style.display = 'none';
            alert('There was an error generating the PDF. Please try again.');
        });
    }, 100);
}

// Add event listeners to both download buttons
document.getElementById('downloadCV').addEventListener('click', function (e) {
    e.preventDefault();
    downloadCV();
});

document.getElementById('downloadCVAbout').addEventListener('click', function (e) {
    e.preventDefault();
    downloadCV();
});

// Duplicate tool items for infinite carousel effect
document.addEventListener('DOMContentLoaded', function () {
    const toolsTrack = document.querySelector('.tools-track');
    const toolItems = document.querySelectorAll('.tool-item');

    // Duplicate items for seamless infinite scroll
    toolItems.forEach(item => {
        const clone = item.cloneNode(true);
        toolsTrack.appendChild(clone);
    });
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });
});

// Highlight active nav link based on scroll position
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
});

// Project filtering
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show/hide matching projects
            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    project.classList.remove('hide');
                } else {
                    project.classList.add('hide');
                }
            });
        });
    });
});

// Contact form handling - Send to WhatsApp
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form
    if (!name || !email || !message) {
        formStatus.innerHTML = 'Please fill in all fields.';
        formStatus.style.backgroundColor = '#f8d7da';
        formStatus.style.color = '#721c24';
        formStatus.style.border = '1px solid #f5c6cb';
        formStatus.style.display = 'block';
        return;
    }

    // Create WhatsApp message
    const whatsappMessage = `Hello Abdulbasit! 👋

    I'm reaching out from your portfolio website.

    *Name:* ${name}
    *Email:* ${email}

    *Message:*
    ${message}

    Looking forward to hearing from you!`;

    const whatsappURL = `https://wa.me/+2347051927036?text=${encodeURIComponent(whatsappMessage)}`;

    // Show success message
    formStatus.innerHTML = 'Redirecting to WhatsApp... Your message is ready to send!';
    formStatus.style.backgroundColor = '#d4edda';
    formStatus.style.color = '#155724';
    formStatus.style.border = '1px solid #c3e6cb';
    formStatus.style.display = 'block';

    // Open WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappURL, '_blank');

        // Reset form after opening WhatsApp
        setTimeout(() => {
            this.reset();
            formStatus.style.display = 'none';
        }, 2000);
    }, 1000);
});