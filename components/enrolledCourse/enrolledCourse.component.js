import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

EnrolledCourseComponent.prototype = new ViewComponent('enrolledCourse');
function EnrolledCourseComponent() {

    let courseNameElement;
    let courseIDElement;
    let courseOpenElement;
    let courseTeacherElement;
    let courseUsernameElement;
    let targetCourseDisplayElement;
    let courseButtonElement;
    let registerButtonElement;
    let viewButtonElement;

    //let course;
    let courseTableBody;
    let courseTableData;

    //registring for a course
    async function registerCourse() {

        let registering = {
            classID: state.targetCourse.children[0].innerText,
            name: state.targetCourse.children[1].innerText,
            teacher: state.targetCourse.children[3].innerText,
            username: state.authUser.username,
            open: state.targetCourse.children[4].innerText
        }

        if(registering.classID && registering.name && registering.teacher && registering.username){

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

            refreshCourses();
        }
    }

    //canceling the course
    async function cancelCourse(e){
        let cancel = e.currentTarget.parentElement.children[0].innerText;
        console.log(cancel);

        let canceling = {
            classID: cancel,
            username: state.authUser.username
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
        refreshCourses();
    }

     //sending back to studashboard
     async function backToDash() {
        state.targetCourse = '';
        router.navigate('/studentDashboard');
    }

    //viewing all registered
    async function refreshCourses() {

        courseTableBody.innerHTML = '';
                
        let response = await fetch(`${env.apiUrl}/enroll`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.jwt
            }
        });

            let course = await response.json();
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
                row.appendChild(courseTeacherRows);
                row.appendChild(courseUsernameRows);
                row.appendChild(courseOpenRows);
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

    // Checks to see if there is a valid course; hides the course information if that is the case.
    function hideFalseDisplay() {
        if(!state.targetCourse.children[3].innerText) {
            targetCourseDisplayElement.style.display = 'none';
        } else {
            targetCourseDisplayElement.style.display = 'block';
        }
    }

    
    this.render = function() {
        EnrolledCourseComponent.prototype.injectTemplate(() => {

            courseNameElement = document.getElementById('target-coursename');
            courseIDElement = document.getElementById('target-classID');
            courseTeacherElement = document.getElementById('target-teacher');
            courseUsernameElement = document.getElementById('target-username');
            courseOpenElement = document.getElementById('is-target-open');
            targetCourseDisplayElement = document.getElementById('target-course-display');
            viewButtonElement = document.getElementById('view-form-button');
            courseButtonElement = document.getElementById('check-form-button');
            registerButtonElement = document.getElementById('register-form-button');
            courseTableData = document.getElementsByTagName('tr');

            courseNameElement.innerText = state.targetCourse.children[1].innerText;
            courseIDElement.innerText = state.targetCourse.children[0].innerText;
            courseTeacherElement.innerText = state.targetCourse.children[3].innerText;
            courseUsernameElement.innerText = state.authUser.username;
            courseOpenElement.innerText = state.targetCourse.children[4].innerText;

            courseTableBody = document.getElementById('course-table-body');

            viewButtonElement.addEventListener('click', backToDash);
            registerButtonElement.addEventListener('click', registerCourse);
            courseButtonElement.addEventListener('click', refreshCourses);

            refreshCourses();
            hideFalseDisplay();
        });
        EnrolledCourseComponent.prototype.injectStyleSheet();
    }
}

export default new EnrolledCourseComponent();