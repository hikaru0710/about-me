document.getElementById('contactForm').addEventListener('submit',function(e){
    e.preventDefault();

    clearErrors();

    const formData = new FormData(this);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    const privacy = formData.get('privacy');

    let hasError = false;

    if (!name) {
        showError('name','お名前を入力してください。')
        hasError = true;
    }

    if (!email) {
        showError('email','メールアドレスを入力してください。')
        hasError = true;
    }else if (!validateEmail(email)) {
        showError('email','正しいメールアドレスを入力してください。');
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

    //送信処理//
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled=true;
    subnitBtn.textContent='送信中...';

    //模擬的な送信処理//
    setTimeout(() => {
        showSuccessMeeeage();
        submitBtm.disabled=false;
        submitBtm.textContent='送信する';
        document.getElementByIb('contactForm').reset();
    },2000);
});

function clearErrors(){
    const errorMessages = document.querySelectorAll('.error');
    const formGroups = document.querySelectorAll('.form-group');

    errorMessages.forEach(error =>{
        error.style.display='none';
        error.textContent='';
    })

    formGroups.forEach(group =>{
        group.classList.remove('error');
    })

    document.getElementById('successMessage').style.display='none'

}

function showError(filbName,message){
    const errorElement=document.getElementById(fielName+'Error');
    const formGroup=document.getElementById(fielName).closest('.form-group');

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
