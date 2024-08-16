const API_URL = 'https://vi-evi-back.vercel.app';

document.getElementById('register-form').addEventListener('submit', registerUser);
document.getElementById('login-form').addEventListener('submit', loginUser);
document.getElementById('logout-button').addEventListener('click', logout);

async function registerUser(event) {
    event.preventDefault();

    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const passwordElement = document.getElementById('password');
    const confirmPasswordElement = document.getElementById('confirm-password');

    if (!nameElement || !emailElement || !passwordElement || !confirmPasswordElement) {
        console.error('Um ou mais elementos não foram encontrados.');
        return;
    }

    const name = nameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, confirmpassword: confirmPassword })
        });

        const data = await response.json();
        alert(data.msg);

        if (response.ok) {
            nameElement.value = '';
            emailElement.value = '';
            passwordElement.value = '';
            confirmPasswordElement.value = '';
        }
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        alert('Houve um erro ao tentar registrar o usuário.');
    }
}

async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server responded with an error:', errorData);
            alert('Erro no servidor: ' + errorData.msg);
            return;
        }
    
        const data = await response.json();
        alert(data.msg);
    
        if (response.ok) {
            localStorage.setItem('token', data.token);
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('modal-perfil'));
            if (loginModal) {
                loginModal.hide();
            }
            displayUserProfile();
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
}

function getUserIdFromToken(token) {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.id; 
}

async function displayUserProfile() {

    const token = localStorage.getItem('token');

    if (!token) {
        return;
    }

    const userId = getUserIdFromToken(token);

    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('user-info').textContent = `${data.user.name}`;
            document.getElementById('user-section').style.display = 'block';
            document.getElementById('perfil-icon').style.display = 'none';
        } else {
            alert(data.msg);
        }
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
}

function logout() {
    localStorage.removeItem('token');
    document.getElementById('user-section').style.display = 'none';
    document.getElementById('perfil-icon').style.display = 'block';

}
