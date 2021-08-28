import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

EnrolledCourseComponent.prototype = new ViewComponent('enrolledCourse');

function EnrolledCourseComponent(){

    let courseButtonElement;
    let course;
    let courseTableBody;


    //canceling the course
    async function cancelCourse(e){
        let cancel = e.currentTarget.parentElement.children[1].innerText;
        console.log(cancel);

        let canceling = {
            classID: cancel
        }

        let response = await fetch(`${env.apiUrl}/enroll?cancel=true`, {

            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': state.jwt
            },

            body: JSON.stringify(canceling)
        });

        let data = await response.json();
        console.log(data);
        courseDashboard();
    }


    //checking the registered course 
    async function registerCourse(){
       
        courseTableBody.innerHTML = '';

        let response = await fetch(`${env.apiUrl}/enroll?enrolled=true`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.jwt
            },
        });

        course = await response.json();

        console.log(course);

        if(course){
            for(let i = 0; i < course.length; i++){

            ///showing all courses    
            let row = document.createElement('tr');
            let courseIdRows = document.createElement('td');
            let courseNameRows = document.createElement('td');
            let courseDescRows = document.createElement('td');
            let courseTeacherRows = document.createElement('td');
            let courseOpenRows = document.createElement('td');

            //cancel button
            let cancelCourseButton = document.createElement('button');
            cancelCourseButton.setAttribute('class', 'btn btn-primary');
            cancelCourseButton.addEventListener('click', cancelCourse);
         
            //appending rows
            row.appendChild(courseIdRows);
            row.appendChild(courseNameRows);
            row.appendChild(courseDescRows);
            row.appendChild(courseTeacherRows);
            row.appendChild(courseOpenRows);
            row.appendChild(cancelCourseButton);

            courseTableBody.appendChild(row);

            courseIdRows.innerText = course[i].classID;
            courseNameRows.innerText = course[i].name;
            courseDescRows.innerText = course[i].desc;
            courseTeacherRows.innerText = course[i].teacher;
            courseOpenRows.innerText = '' + course[i].open;

            cancelCourseButton.innerText = 'Cancel Course';

            }

        }

    }

        this.render = function(){

            EnrolledCourseComponent.prototype.injectTemplate(() => {

                courseButtonElement = document.getElementById('dashboard-form-button');
                courseTableBody = document.getElementById('course-table-body');

                courseButtonElement.addEventListener('click', registerCourse);
                
            });
            EnrolledCourseComponent.prototype.injectStyleSheet();
        }

}

export default new EnrolledCourseComponent();