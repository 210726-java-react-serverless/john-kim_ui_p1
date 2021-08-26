import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

EnrolledCourseComponent.prototype = new ViewComponent('enrolledCourse');

function EnrolledCourseComponent(){

    let enrolledFieldElement;
    let enrolledButtonElement;
    let errorMessageElement;

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

        let response = await fetch(`${env.apiUrl}/enroll`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enrolledInfor)
        });
        // Take the header and log it
        let jwt = response.headers.get('Authorization');
        
        if (jwt === null) {
            console.log('Sorry! Token not found!');
        } else {
            state.jwt = jwt;
        }

        let data = await response.json();
        status = response.status;

        state.authUser = data;
        console.log(data);

        router.navigate('/studentDashboard'); 

    }

        this.render = function(){

            EnrolledCourseComponent.prototype.injectTemplate(() => {

                enrolledButtonElement = document.getElementById('dashboard-form-button');
                errorMessageElement = document.getElementById('error-msg');

                enrolledFieldElement = document.getElementById('login-form-enrolled');
                enrolledFieldElement.addEventListener('keyup', updateEnrolled);

                enrolledButtonElement.addEventListener('click', enrolledDashboard);
                
            });
            EnrolledCourseComponent.prototype.injectStyleSheet();
        }

}

export default new EnrolledCourseComponent();