import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

EnrolledCourseComponent.prototype = new ViewComponent('enrolledCourse');
function EnrolledCourseComponent() {

    let courseNameFieldElement;
    let courseIDFieldElement;
    let courseOpenSelectElement;
    let courseTeacherFieldElement;
    let courseUsernameFieldElement;

    let courseButtonElement;
    let registerButtonElement;

    let course;
    let courseTableBody;
    let courseTableData;

    let courseID = '';
    let courseName = '';
    let open = true;
    let teacher = '';
    let username = '';

    function updateCourseID(e) {
        courseID = e.target.value;
        console.log(e.target.value);
    }

    function updateName(e) {
        courseName = e.target.value;
        console.log(e.target.value);
    }

    function updateTeacher(e) {
        teacher = e.target.value;
        console.log(e.target.value);
    }

    function updateUsername(e) {
        username = e.target.value;
        console.log(e.target.value);
    }

    function updateOpen(e) {
        if(e.target.value === 'Open') {
            open = true;
            console.log(open);
        }
    }

    async function registerCourse() {

        let registering = {
            classID: courseID,
            name: courseName,
            teacher: teacher,
            username: username,
            open: open

        }

        if(courseID && courseName && teacher && username){

        let response = await fetch(`${env.apiUrl}/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.jwt
            },
            body: JSON.stringify(registering)
        });
        let data = await response.json();
        console.log(data);

        addCourse();
        }
    }

    async function addCourse() {
                // Make courses null in order to avoid repeats.
            courseTableBody.innerHTML = '';
                
                // Fetch all teacher courses from database
            let response = await fetch(`${env.apiUrl}/enroll?enrolled=true`, {
                headers: {
                    'Authorization': state.jwt
                    }
            });

            course = await response.json();
            console.log(course)

        if(course){
            for(let i = 0; i < course.length; i++){
    
                ///showing all courses    
                let row = document.createElement('tr');
                let courseIdRows = document.createElement('td');
                let courseNameRows = document.createElement('td');
                let courseOpenRows = document.createElement('td');
                let courseTeacherRows = document.createElement('td');
                let courseUsernameRows = document.createElement('td');

    
                //cancel button
                let cancelCourseButton = document.createElement('button');
                cancelCourseButton.setAttribute('class', 'btn btn-primary');
                cancelCourseButton.addEventListener('click', cancelCourse);
             
                //appending rows
                row.appendChild(courseIdRows);
                row.appendChild(courseNameRows);
                row.appendChild(courseOpenRows);
                row.appendChild(courseTeacherRows);
                row.appendChild(courseUsernameRows);
                row.appendChild(cancelCourseButton);
        
                courseTableBody.appendChild(row);
        
                courseIdRows.innerText = course[i].classID;
                courseNameRows.innerText = course[i].name;
                courseTeacherRows.innerText = course[i].teacher;
                courseUsernameRows.innerText = course[i].username;
                courseOpenRows.innerText = '' + course[i].open;
        
                cancelCourseButton.innerText = 'Cancel Course';
    
            }
        }

    }
    

    this.render = function() {
        EnrolledCourseComponent.prototype.injectTemplate(() => {

            courseNameFieldElement = document.getElementById('course-name');
            courseIDFieldElement = document.getElementById('course-id');
            courseTeacherFieldElement = document.getElementById('course-teacher');
            courseUsernameFieldElement = document.getElementById('course-username');
            courseOpenSelectElement = document.getElementById('open-selector');

            courseButtonElement = document.getElementById('check-form-button');
            registerButtonElement = document.getElementById('register-form-button');
            courseTableData = document.getElementsByTagName('tr');

            courseTableBody = document.getElementById('course-table-body');

            registerButtonElement.addEventListener('click', registerCourse);
            courseButtonElement.addEventListener('click', addCourse);
            courseNameFieldElement.addEventListener('keydown', updateName);
            courseIDFieldElement.addEventListener('keydown', updateCourseID);
            courseOpenSelectElement.addEventListener('click', updateOpen);
            courseUsernameFieldElement.addEventListener('keydown', updateUsername);
            courseTeacherFieldElement.addEventListener('keydown', updateTeacher);


        });
        EnrolledCourseComponent.prototype.injectStyleSheet();
    }
}

export default new EnrolledCourseComponent();