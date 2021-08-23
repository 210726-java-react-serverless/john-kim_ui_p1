import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

RegisterComponent.prototype = new ViewComponent('register');

function RegisterComponent(){

    let firstNameFieldElement;
    let lastNameFieldElement;
    let emailFieldElement;
    let usernameFieldElement;
    let passwordFieldElement;
    let registerButtonElement;
    let errorMessageElement;

    let firstName = '';
    let lastName = '';
    let email = '';
    let username = '';
    let password = '';

    function updateFirstName(e){
        firstName = e.target.value;
        console.log(firstName);
    }

    function updateLastName(e){
        lastName = e.target.value;
        console.log(lastName);
    }

    function updateEmail(e){
        email = e.target.value;
        console.log(email);
    }

    function updateUsername(e){
        username = e.target.value;
        console.log(username);
    }

    function updatePassword(e){
        password = e.target.value;
        console.log(password);
    }

    function updateErrorMsg(errorMessage){
        if(errorMessage){
            errorMessageElement.removeAttribute('hidden');
            errorMessageElement.innerText = errorMessage;
        } else {
            errorMessageElement.setAttribute('hidden', 'true');
            errorMessageElement.innerText = '';
        }
    }

    async function register(){

        if(!username || !password || !email || !firstName || !lastName){
            updateErrorMsg('You need to enter all required information');
            return;
        } else {
            updateErrorMsg('');
        }

        let credentials = {

            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        }

        let status = 0;

        let response = await fetch(`${env.apiUrl}/register`, {
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

        router.navigate('/login');

    }    

        this.render = function(){

            RegisterComponent.prototype.injectTemplate(() => {

                firstNameFieldElement = document.getElementById('login-form-firstName');
                lastNameFieldElement = document.getElementById('login-form-lastName');
                emailFieldElement = document.getElementById('login-form-email');
                usernameFieldElement = document.getElementById('login-form-username');
                passwordFieldElement = document.getElementById('login-form-password');
                registerButtonElement = document.getElementById('register-form-button');
                errorMessageElement = document.getElementById('error-msg');

                firstNameFieldElement.addEventListener('keyup', updateFirstName);
                lastNameFieldElement.addEventListener('keyup', updateLastName);
                emailFieldElement.addEventListener('keyup', updateEmail);
                usernameFieldElement.addEventListener('keyup', updateUsername);
                passwordFieldElement.addEventListener('keyup', updatePassword);
                registerButtonElement.addEventListener('click', register);
            });
            RegisterComponent.prototype.injectStyleSheet();
        }
}

export default new RegisterComponent();