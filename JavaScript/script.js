// Ensure everything runs only after the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        // Add fixed-top class only if it's not present already
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // Use a custom class for styling
            // Ensure you have CSS rules for .scrolled state in style.css
            // e.g., .navbar.scrolled { padding: 10px 0 !important; transition: all 0.3s; }
            navbar.style.padding = '10px 0'; 
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.padding = '15px 0'; // Initial padding
        }
    });

    // --- Chatbot Logic (Refined for robustness) ---
    const chatBtn = document.getElementById('chatBtn');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    // chatContent is not strictly needed here, but kept for context:
    // const chatContent = document.getElementById('chatContent'); 
    
    // **CHECK: Make sure the IDs 'chatBtn', 'chatBox', and 'closeChat' exist in your HTML**
    if (chatBtn && chatBox && closeChat) {
        
        // Listener to open/toggle the chatbox
        chatBtn.addEventListener('click', () => {
            // Toggles the visibility of the chat box
            chatBox.classList.toggle('active'); 
            // Optional: Toggles the style/icon of the chat button itself
            chatBtn.classList.toggle('active'); 
        });

        // Listener to close the chatbox
        closeChat.addEventListener('click', () => {
            chatBox.classList.remove('active');
            chatBtn.classList.remove('active');
        });
    } else {
        console.warn("Chatbot elements (chatBtn, chatBox, or closeChat) not found in the DOM.");
    }


    // --- Bootstrap Validation ---
    // Applies validation styles to forms with class 'needs-validation'
    (function () {
        'use strict'
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    })()

    // --- Gallery Logic ---
    const images = document.querySelectorAll(".gallery-img");
    const modalImg = document.getElementById("modal-img");
    const galleryModalElement = document.getElementById("galleryModal");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (galleryModalElement && images.length > 0) {
        const galleryModal = new bootstrap.Modal(galleryModalElement);
        let galleryIndex = 0;

        // Function to update the modal image
        const updateModalImage = () => {
            modalImg.src = images[galleryIndex].src;
        };

        // Open modal on image click
        images.forEach(img => {
            img.addEventListener("click", () => {
                // Ensure the index attribute exists and is valid
                const dataIndex = img.getAttribute("data-index");
                if (dataIndex !== null) {
                    galleryIndex = parseInt(dataIndex);
                    updateModalImage();
                    galleryModal.show();
                }
            });
        });

        // Previous image
        prevBtn.addEventListener("click", () => {
            galleryIndex = (galleryIndex - 1 + images.length) % images.length;
            updateModalImage();
        });

        // Next image
        nextBtn.addEventListener("click", () => {
            galleryIndex = (galleryIndex + 1) % images.length;
            updateModalImage();
        });
    }

}); // End of DOMContentLoaded


// --- Global function for Chatbot options (Must be global to be accessed by HTML 'onclick') ---

/**
 * Handles the user selection from chatbot options and generates a bot response.
 * @param {string} option - The selected option text.
 */
function sendOption(option) {
    const chatContent = document.getElementById('chatContent');
    if (!chatContent) return; 

    // 1. Add User Selection
    const userMsg = document.createElement('div');
    userMsg.classList.add('user-msg');
    userMsg.textContent = option;
    chatContent.appendChild(userMsg);

    // 2. Clear existing options
    // Find the options container and remove it to prevent clutter
    const optionsDiv = chatContent.querySelector('.chat-options');
    if (optionsDiv) optionsDiv.remove();

    // 3. Simulate Bot Typing/Response
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.classList.add('bot-msg');
        
        switch(option) {
            case 'Fee Structure':
                botMsg.innerText = "Our fee structure varies by program. FSc is approx 5k/month. Please visit the Admissions page for details.";
                break;
            case 'Timings':
                botMsg.innerText = "Morning Shift: 8:00 AM - 1:00 PM. Evening Shift: 3:00 PM - 8:00 PM.";
                break;
            case 'Admission Process':
                botMsg.innerText = "You can apply online via the 'Online Admissions' page or visit our campus with 2 passport size photos and result card.";
                break;
            case 'Contact Number':
                botMsg.innerText = "You can reach us at 0300-1234567 or 0242-123456.";
                break;
            default:
                botMsg.innerText = "How else can I help you? You can select an option again.";
        }
        
        chatContent.appendChild(botMsg);
        chatContent.scrollTop = chatContent.scrollHeight; // Auto scroll to bottom
        
        // 4. Re-add options for continuous conversation
        setTimeout(() => {
             const newOptionsDiv = document.createElement('div');
             newOptionsDiv.classList.add('chat-options', 'mt-3');
             newOptionsDiv.innerHTML = `
                 <button onclick="sendOption('Fee Structure')">Fee Structure</button>
                 <button onclick="sendOption('Admission Process')">Admission Process</button>
                 <button onclick="sendOption('Timings')">Class Timings</button>
                 <button onclick="sendOption('Contact Number')">Contact Number</button>
             `;
             chatContent.appendChild(newOptionsDiv);
             chatContent.scrollTop = chatContent.scrollHeight;
        }, 500); // 500ms delay after bot response
        
    }, 500); // 500ms delay for bot response
}