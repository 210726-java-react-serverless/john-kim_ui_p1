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
    let loadCourseButtonElement;
    let courses;
    let courseTableBody;
    let courseTableData;

    // console.log(e.currentTarget.children[0].innerText);
    function deleteCourse(e) {
        console.log(e.currentTarget.parentElement.children[1].innerText);
        $('.toast').toast(option); // TODO: Implement a toast!
    }

    function updateCourse(e) {
        state.targetCourse = e.currentTarget.parentElement.children[1].innerText;
        router.navigate('/facCourseUpdate');
    }

    // This is called to reload the data after any changes to the database.
    function updateCourseList() {
        courseTableBody.innerHTML = '';
        getCourses();
    }

    async function getCourses() {
        // Check to see if courses has been rendered before.
        if(!courses) {
            // Fetch all teacher courses from database
            let response = await fetch(`${env.apiUrl}/course`, {
                headers: {
                    'Authorization': state.jwt
                }
            });
            courses = await response.json();

            console.log(courses);
            
            // Inject a complete table into the HTML through DOM manipulation.
            for(let i=0; i<courses.length; i++) {
                // Create a row and cells for the students table
                let row = document.createElement('tr');
                let courseIdCell = document.createElement('td');
                let courseNameCell = document.createElement('td');
                let courseDescCell = document.createElement('td');
                let courseTeacherCell = document.createElement('td');
                let courseOpenCell = document.createElement('td');
                let deleteCourseButton = document.createElement('button');
                let updateCourseButton = document.createElement('button');

                deleteCourseButton.setAttribute('class', 'btn btn-primary');
                deleteCourseButton.addEventListener('click', deleteCourse);
                updateCourseButton.setAttribute('class', 'btn btn-primary');
                updateCourseButton.addEventListener('click', updateCourse);

                // Append cells to the row
                row.appendChild(courseNameCell);
                row.appendChild(courseIdCell);
                row.appendChild(courseDescCell);
                row.appendChild(courseTeacherCell);
                row.appendChild(courseOpenCell);
                row.appendChild(updateCourseButton);
                row.appendChild(deleteCourseButton);
                
                // Append the row to the pre-existing table
                courseTableBody.appendChild(row);

                // Add student info to the newly appended row
                courseIdCell.innerText = courses[i].classID;
                courseNameCell.innerText = courses[i].name;
                courseDescCell.innerText = courses[i].desc;
                courseTeacherCell.innerText = courses[i].teacher;
                courseOpenCell.innerText = '' + courses[i].open;
                updateCourseButton.innerText = 'Update Course';
                deleteCourseButton.innerText = 'Delete Course';
            }

        } else {
            console.log('That element has already been loaded!');
        }
    }

    this.render = function() {
        FacDashboardComponent.prototype.injectTemplate(() => {
            courseNameFieldElement = document.getElementById('course-name');
            courseIDFieldElement = document.getElementById('course-id');
            courseDescFieldElement = document.getElementById('course-desc');
            courseOpenSelectElement = document.getElementById('open-selector');
            addCourseButtonElement = document.getElementById('add-course');
            loadCourseButtonElement = document.getElementById('get-courses');
            courseTableBody = document.getElementById('course-table-body');
            courseTableData = document.getElementsByTagName('tr');
    

            addCourseButtonElement.addEventListener('click', null);
            loadCourseButtonElement.addEventListener('click', getCourses);
        });
        FacDashboardComponent.prototype.injectStyleSheet();
    }
}

export default new FacDashboardComponent();