// PDF Download functionality
function downloadCV() {
    const element = document.getElementById('cvContent');
    const opt = {
        margin: 0.5,
        filename: 'Alaka-Yusuf_Abdulbasit_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Show the CV content temporarily for PDF generation
    element.style.display = 'block';

    html2pdf().set(opt).from(element).save().then(function () {
        // Hide the CV content again after PDF generation
        element.style.display = 'none';
    });
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
