import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

StudentDashboardComponent.prototype = new ViewComponent('studentDashboard');

function StudentDashboardComponent(){

    let courseButtonElement;
    let course;
    let courseTableBody;


    //registering a course
    async function registerCourse(e){
        
        state.targetCourse = e.currentTarget.parentElement.children[1].innerText;
        router.navigate('/enrolledCourse');
    }


    //checking the opening course 
    async function courseDashboard(){
       
        courseTableBody.innerHTML = '';

        let response = await fetch(`${env.apiUrl}/course?open=true`, {
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

            //enroll button
            let enrollCourseButton = document.createElement('button');
            enrollCourseButton.setAttribute('class', 'btn btn-primary');
            enrollCourseButton.addEventListener('click', registerCourse);
         
            //appending rows
            row.appendChild(courseIdRows);
            row.appendChild(courseNameRows);
            row.appendChild(courseDescRows);
            row.appendChild(courseTeacherRows);
            row.appendChild(courseOpenRows);
            row.appendChild(enrollCourseButton);

            courseTableBody.appendChild(row);

            courseIdRows.innerText = course[i].classID;
            courseNameRows.innerText = course[i].name;
            courseDescRows.innerText = course[i].desc;
            courseTeacherRows.innerText = course[i].teacher;
            courseOpenRows.innerText = '' + course[i].open;

            enrollCourseButton.innerText = 'Register Course';

            }

        }

    }

        this.render = function(){

            StudentDashboardComponent.prototype.injectTemplate(() => {

                courseButtonElement = document.getElementById('dashboard-form-button');
                courseTableBody = document.getElementById('course-table-body');

                courseButtonElement.addEventListener('click', courseDashboard);
                
            });
            StudentDashboardComponent.prototype.injectStyleSheet();
        }

}

export default new StudentDashboardComponent();