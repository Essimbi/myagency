// Premièrement, incluez la bibliothèque EmailJS dans votre HTML
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Initialisation de EmailJS avec votre User ID
// Remplacez 'YOUR_USER_ID' par votre ID EmailJS
(function() {
    emailjs.init('UrgjD9FFDFiFXHLzp');
})();

// Sélection du formulaire et ajout de l'écouteur d'événement
const form = document.querySelector('.form-box');
const submitBtn = document.querySelector('.submit-btn');

// Fonction de validation d'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const phoneRegex = /^[62][0-9]{8}$/;

// Regex plus flexible qui accepte les espaces et tirets comme séparateurs
const phoneRegexWithSeparators = /^[62]([0-9]{2}[\s.-]?){3}[0-9]{2}$/;

// Regex qui accepte aussi le format international (+237)
const phoneRegexComplete = /^(?:\+237|237)?[62][0-9]{8}$/;


// Fonction de validation de numéro de téléphone
function isValidCameroonPhone(phone) {
    // Supprime tous les espaces, tirets et points du numéro
    const cleanPhone = phone.replace(/[\s.-]/g, '');
    return phoneRegexComplete.test(cleanPhone);
}

// Fonction pour afficher les messages d'erreur
function showError(inputElement, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    // Supprime l'ancien message d'erreur s'il existe
    const existingError = inputElement.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    inputElement.parentElement.appendChild(errorDiv);
}

// Fonction pour supprimer les messages d'erreur
function removeError(inputElement) {
    const errorDiv = inputElement.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Gestion de la soumission du formulaire
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupération des valeurs du formulaire
    const firstName = document.getElementById('ijowk-6').value.trim();
    const lastName = document.getElementById('indfi-4').value.trim();
    const email = document.getElementById('ipmgh-6').value.trim();
    const phone = document.getElementById('imgis-5').value.trim();
    const message = document.getElementById('i5vyy-6').value.trim();
    
    // Validation des champs
    let isValid = true;
    
    // Validation du nom
    if (firstName.length < 2) {
        showError(document.getElementById('ijowk-6'), 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    } else {
        removeError(document.getElementById('ijowk-6'));
    }
    
    // Validation du prénom
    if (lastName.length < 2) {
        showError(document.getElementById('indfi-4'), 'Le prénom doit contenir au moins 2 caractères');
        isValid = false;
    } else {
        removeError(document.getElementById('indfi-4'));
    }
    
    // Validation de l'email
    if (!isValidEmail(email)) {
        showError(document.getElementById('ipmgh-6'), 'Veuillez entrer une adresse email valide');
        isValid = false;
    } else {
        removeError(document.getElementById('ipmgh-6'));
    }
    
    // Validation du téléphone
    if (!isValidCameroonPhone(phone)) {
        showError(document.getElementById('imgis-5'), 'Veuillez entrer un numéro de téléphone valide');
        isValid = false;
    } else {
        removeError(document.getElementById('imgis-5'));
    }
    
    // Validation du message
    if (message.length < 10) {
        showError(document.getElementById('i5vyy-6'), 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    } else {
        removeError(document.getElementById('i5vyy-6'));
    }
    
    if (isValid) {
        // Désactiver le bouton pendant l'envoi
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        
        // Préparation des données pour l'envoi
        const templateParams = {
            to_email: email,
            from_name: `${firstName} ${lastName}`,
            to_name: `${firstName} ${lastName}`,
            message: message,
            reply_to: email,
            phone: phone
        };
        
        // Envoi de l'email via EmailJS
        // Remplacez 'YOUR_SERVICE_ID' et 'YOUR_TEMPLATE_ID' par vos IDs EmailJS
        emailjs.send('service_qg3tj1b', 'template_pk8ddwm', templateParams)
            .then(function(response) {
                // Réinitialisation du formulaire
                form.reset();
                // Message de succès
                alert('Votre message a été envoyé avec succès ! Nous vous contacterons bientôt.');
            }, function(error) {
                alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
            })
            .finally(() => {
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            });
    }
});

// Ajout des styles pour les messages d'erreur
const style = document.createElement('style');
style.textContent = `
    .input.error {
        border-color: red;
    }
    
    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);