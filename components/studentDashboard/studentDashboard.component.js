import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

StudentDashboardComponent.prototype = new ViewComponent('studentDashboard');

function StudentDashboardComponent(){

    let courseButtonElement;
    let course;

    //checking the opening course 

    async function courseDashboard(){
       
        studentTableBody.innerHTML = '';

        let response = await fetch(`${env.apiUrl}/enroll`, {
            headers: {
                'Content-Type': 'application/json',
                'Authenization': state.jwt
            },
        });

        course = await response.json();

        console.log(course);

        if(course){
            for(let i = 0; i < course.length; i++)

            let rows = document.createElement('tr');
            let courseIdRow = document.createElement('td');
            let courseNameRow = document.createElement('td');
            let courseDescRow = document.createElement('td');
            let courseTeacherRow = document.createElement('td');
            let courseOpenRow = document.createElement('td');

         
            rows.appendChild(courseIdRow);
            rows.appendChild(courseNameRow);
            rows.appendChild(courseDescRow);
            rows.appendChild(courseTeacherRow);
            rows.appendChild(courseOpenRow);


            studentTableBody.appendChild(rows);

            courseIdRow.innerText = course[i].classID;
            courseNameRow.innerText = course[i].name;
            courseDescRow.innerText = course[i].desc;
            courseTeacherRow.innerText = course[i].teacher;
            courseOpenRow.innerText = '' + course[i].open;


        }

    }

        this.render = function(){

            StudentDashboardComponent.prototype.injectTemplate(() => {

                courseButtonElement = document.getElementById('dashboard-form-button');
                studentTableBody = document.getElementById('student-table-body');

                courseButtonElement.addEventListener('click', courseDashboard);
                
            });
            StudentDashboardComponent.prototype.injectStyleSheet();
        }

}

export default new StudentDashboardComponent();