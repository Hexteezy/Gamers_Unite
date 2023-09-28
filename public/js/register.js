const registerFormHandler = async (event) => {
    event.preventDefault();

    const newName = document.querySelector('#name-signup').value.trim();
    const newEmail = document.querySelector('#email-signup').value.trim();
    const newPassword = document.querySelector('#password-signup').value.trim();
    const newUserName = document.querySelector('#username-signup').value.trim();

    if (newEmail && newPassword && newUserName && newName) {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({ name: newName, email: newEmail, password: newPassword, gamertag: newUserName }),
            headers: { 'Content-Type': 'application/json'},
        });
        
        if (response.ok) {
            document.location.replace('/');
    
        } else {
            alert('Failed to log in!')
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', registerFormHandler);