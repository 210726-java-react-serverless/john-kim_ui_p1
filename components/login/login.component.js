import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

LoginComponent.prototype = new ViewComponent('login');
function LoginComponent() {

    let usernameFieldElement;
    let passwordFieldElement;
    let loginButtonElement;
    let errorMessageElement;

    let username = '';
    let password = '';

    function logUsername(e) {
        username = e.target.value;
        console.log(username);
    }

    function logPassword(e) {
        password = e.target.value;
        console.log(password);
    }

    function updateErrorMsg(errorMessage) {
        if(errorMessage) {
            errorMessageElement.removeAttribute('hidden');
            errorMessageElement.innerText = errorMessage;
        } else {
            errorMessageElement.setAttribute('hidden', 'true');
            errorMessageElement.innerText = '';
        }
    }

    async function login() {

        if(!username || !password) {
            updateErrorMsg('You need to input both a username and a password!');
            return;
        } else {
            updateErrorMsg('');
        }

        let credentials = {
            username: username,
            password: password
        }

        let status = 0;

        let response = await fetch(`${env.apiUrl}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        let data = await response.json();

        status = response.status;

        state.authUser = data;
        console.log(data);

        router.navigate('studentDashboard'); // TODO: Implement the dashboard!
    }

    this.render = function() {
        LoginComponent.prototype.injectTemplate(() => {
            usernameFieldElement = document.getElementById('login-form-username');
            passwordFieldElement = document.getElementById('login-form-password');
            loginButtonElement = document.getElementById('login-form-button');
            errorMessageElement = document.getElementById('error-msg');

            usernameFieldElement.addEventListener('keyup', logUsername);
            passwordFieldElement.addEventListener('keyup', logPassword);
            loginButtonElement.addEventListener('click', login);
        });
        LoginComponent.prototype.injectStyleSheet();
    }
}

export default new LoginComponent();