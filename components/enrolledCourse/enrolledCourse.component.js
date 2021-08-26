import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

EnrolledCourseComponent.prototype = new ViewComponent('enrolledCourse');

function EnrolledCourseComponent(){

    let courseFieldElement;
    let enrolledFieldElement;

    let courseButtonElement;
    let enrolledButtonElement;
    let errorMessageElement;

    let course = '';
    let enrolled = '';


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

        router.navigate('/studentDashboard'); 

    }

        this.render = function(){

            StudentDashboardComponent.prototype.injectTemplate(() => {

                courseButtonElement = document.getElementById('dashboard-form-button');
                enrolledButtonElement = document.getElementById('dashboard-form-button');
                errorMessageElement = document.getElementById('error-msg');

                courseFieldElement = document.getElementById('login-form-course');
                enrolledFieldElement = document.getElementById('login-form-enrolled');

                courseFieldElement.addEventListener('keyup', updateCourse);
                enrolledFieldElement.addEventListener('keyup', updateEnrolled);

                courseButtonElement.addEventListener('click', courseDashboard);
                enrolledButtonElement.addEventListener('click', enrolledDashboard);
                
            });
            StudentDashboardComponent.prototype.injectStyleSheet();
        }

}

export default new StudentDashboardComponent();