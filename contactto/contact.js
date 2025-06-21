document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    clearErrors();
    
    const formData = new FormData(this);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    const privacy = formData.get('privacy');
    
    let hasError = false;
    
    if (!name) {
        showError('name', 'お名前を入力してください。');
        hasError = true;
    }
    
    if (!email) {
        showError('email', 'メールアドレスを入力してください。');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError('email', '正しいメールアドレスを入力してください。');
        hasError = true;
    }
    
    if (!message) {
        showError('message', 'メッセージを入力してください。');
        hasError = true;
    } else if (message.length < 10) {
        showError('message', 'メッセージは10文字以上で入力してください。');
        hasError = true;
    }
    
    if (!privacy) {
        showError('privacy', 'プライバシーポリシーに同意してください。');
        hasError = true;
    }
    
    if (hasError) {
        return;
    }
    
    // 送信処理
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...'; // subnitBtn → submitBtn
    
    // 模擬的な送信処理
    setTimeout(() => {
        showSuccessMessage(); // showSuccessMeeeage → showSuccessMessage
        submitBtn.disabled = false; // submitBtm → submitBtn
        submitBtn.textContent = '送信する'; // submitBtm → submitBtn
        document.getElementById('contactForm').reset(); // getElementByIb → getElementById
    }, 2000);
});

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error');
    const formGroups = document.querySelectorAll('.form-group');
    
    errorMessages.forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
    
    formGroups.forEach(group => {
        group.classList.remove('error');
    });
    
    document.getElementById('successMessage').style.display = 'none';
}

function showError(fieldName, message) { // filbName → fieldName
    const errorElement = document.getElementById(fieldName + 'Error'); // fielName → fieldName
    const formGroup = document.getElementById(fieldName).closest('.form-group'); // fielName → fieldName
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    formGroup.classList.add('error');
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth' });
}
