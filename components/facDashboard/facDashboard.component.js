import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

FacDashboardComponent.prototype = new ViewComponent('facDashboard');
function FacDashboardComponent() {

    let courseNameFieldElement;
    let courseIDFieldElement;
    let courseDescFieldElement;
    let courseOpenSelectElement;
    let addCourseButtonElement;
    let courseTableBody;

    let welcomeSpanElement;

    async function getCourses() {
    // Fetch all teacher courses from database
    let response = await fetch(`${env.apiUrl}/course`, {
        credentials: "include"
    });
    let courses = await response.json();

    console.log(courses);

    // // Create a row and cells for the students table
    // let row = document.createElement('tr');
    // let courseIdCell = document.createElement('td');
    // let courseNameCell = document.createElement('td');
    // let courseDescCell = document.createElement('td');
    // let courseTeacherCell = document.createElement('td');
    // let courseOpenCell = document.createElement('td');

    // // Append cells to the row
    // row.appendChild(courseIdCell);
    // row.appendChild(courseNameCell);
    // row.appendChild(courseDescCell);
    // row.appendChild(courseTeacherCell);
    // row.appendChild(courseOpenCell);

    // // Append the row to the pre-existing table
    // courseTableBody.appendChild(row);

    // Add student info to the newly appended row
    // studentIdCell.innerText = idGen.next().value;
    // studentNameCell.innerText = studentName;
    // studentMajorCell.innerText = studentMajor;  
}

    this.render = function() {
        FacDashboardComponent.prototype.injectTemplate(() => {
            courseNameFieldElement = document.getElementById('course-name');
            courseIDFieldElement = document.getElementById('course-id');
            courseDescFieldElement = document.getElementById('course-desc');
            courseOpenSelectElement = document.getElementById('open-selector');
            addCourseButtonElement = document.getElementById('add-course');
            courseTableBody = document.getElementById('course-table-body');

            let currentUserName = state.authUser.lastName;
            welcomeSpanElement = document.getElementById('user-name');
            welcomeSpanElement.innerText = currentUserName;

            addCourseButtonElement.addEventListener('click', getCourses);
        });
        FacDashboardComponent.prototype.injectStyleSheet();
    }
}

export default new FacDashboardComponent();