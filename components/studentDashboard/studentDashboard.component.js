import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

StudentDashboardComponent.prototype = new ViewComponent('studentDashboard');

function StudentDashboardComponent(){

    let courseFieldElement;
    let registerFieldElement;
    let cancelFieldElement;
    let enrolledFieldElement;

    let courseButtonElement;
    let registerButtonElement;
    let cancelButtonElement;
    let enrolledButtonElement;
    let errorMessageElement;

    let course = '';
    let register = '';
    let cancel = '';
    let enrolled = '';

    //checking the opening course
    function updateCourse(e){
        course = e.target.value;
        console.log(course);
    }

    function updateErrorMsg(){
        if(errorMessage){
            errorMessageElement.removeAttribute('hidden');
            errorMessageElement.innerText = errorMessage;
        }else {
            errorMessageElement.setAttribute('hidden', 'true');
            errorMessageElement.innerText = '';
        }
    }

    async function courseDashboard(){
        if(!course){
            updateErrorMsg('Please enter your answer!');
            return;
        }else{
            updateErrorMsg('');
        }

        let  courseInfor = {
            course: course,
        }

        let status = 0;

        let response = await fetch(`${env.apiUrl}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'appplication/json'
            },
            
            body: JSON.stringify(courseInfor)
        });

        let data = await response.json();

        status = response.status;

        state.authUser = data;
        console.log(data);

        router.navigate('course'); 

    }

    //registering for a new course
    function updateRegister(e){
        register = e.target.value;
        console.log(register);
    }

    function updateErrorMsg(){
        if(errorMessage){
            errorMessageElement.removeAttribute('hidden');
            errorMessageElement.innerText = errorMessage;
        }else {
            errorMessageElement.setAttribute('hidden', 'true');
            errorMessageElement.innerText = '';
        }
    
    }

    async function registerCourseDashboard(){
        if(!register){
            updateErrorMsg('Please enter your answer!');
            return;
        }else{
            updateErrorMsg('');
        }

        let  registerInfor = {
            register: register,
        }

        let status = 0;

        let response = await fetch(`${env.apiUrl}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'appplication/json'
            },
            
            body: JSON.stringify(registerInfor)
        });

        let data = await response.json();

        status = response.status;

        state.authUser = data;
        console.log(data);

        router.navigate('register'); 

    }

    //canceling a course
    function updateCancel(e){
        cancel = e.target.value;
        console.log(cancel);
    }

    function updateErrorMsg(){
        if(errorMessage){
            errorMessageElement.removeAttribute('hidden');
            errorMessageElement.innerText = errorMessage;
        }else {
            errorMessageElement.setAttribute('hidden', 'true');
            errorMessageElement.innerText = '';
        }
    }

    async function cancelDashboard(){
        if(!cancel){
            updateErrorMsg('Please enter your answer!');
            return;
        }else{
            updateErrorMsg('');
        }

        let  cancelInfor = {
            cancel: cancel,
        }

        let status = 0;

        let response = await fetch(`${env.apiUrl}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'appplication/json'
            },
            
            body: JSON.stringify(cancelInfor)
        });

        let data = await response.json();

        status = response.status;

        state.authUser = data;
        console.log(data);

        router.navigate('cancel'); 

    }

    //viewing the registered course
    function updateEnrolled(e){
        enrolled = e.target.value;
        console.log(enrolled);
    }

    function updateErrorMsg(){
        if(errorMessage){
            errorMessageElement.removeAttribute('hidden');
            errorMessageElement.innerText = errorMessage;
        }else {
            errorMessageElement.setAttribute('hidden', 'true');
            errorMessageElement.innerText = '';
        }
    
    }
    
    async function enrolledDashboard(){
        if(!enrolled){
            updateErrorMsg('Please enter your answer!');
            return;
        }else{
            updateErrorMsg('');
        }

        let  enrolledInfor = {
            enrolled: enrolled,
        }

        let status = 0;

        let response = await fetch(`${env.apiUrl}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'appplication/json'
            },
            
            body: JSON.stringify(enrolledInfor)
        });

        let data = await response.json();

        status = response.status;

        state.authUser = data;
        console.log(data);

        router.navigate('course'); 

    }

        this.render = function(){

            StudentDashboardComponent.prototype.injectTemplate(() => {

                courseButtonElement = document.getElementById('dashboard-form-button');
                registerButtonElement = document.getElementById('dashboard-form-button');
                cancelButtonElement = document.getElementById('dashboard-form-button');
                enrolledButtonElement = document.getElementById('dashboard-form-button');
                errorMessageElement = document.getElementById('error-msg');

                courseFieldElement = document.getElementById('login-form-course');
                registerFieldElement = document.getElementById('login-form-register');
                cancelFieldElement = document.getElementById('login-form-cancel');
                enrolledFieldElement = document.getElementById('login-form-enrolled');

                courseFieldElement.addEventListener('keyup', updateCourse);
                registerFieldElement.addEventListener('keyup', updateRegister);
                cancelFieldElement.addEventListener('keyup', updateCancel);
                enrolledFieldElement.addEventListener('keyup', updateEnrolled);

                courseButtonElement.addEventListener('click', courseDashboard);
                registerButtonElement.addEventListener('click', registerCourseDashboard);
                cancelButtonElement.addEventListener('click', cancelDashboard);
                enrolledButtonElement.addEventListener('click', enrolledDashboard);
                
            });
            StudentDashboardComponent.prototype.injectStyleSheet();
        }

}

export default new StudentDashboardComponent();