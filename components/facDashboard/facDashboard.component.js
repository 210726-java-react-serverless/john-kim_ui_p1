import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

FacDashboardComponent.prototype = new ViewComponent('facDashboard');
function FacDashboardComponent() {

    let courseWelcomeSpan;
    let courseNameFieldElement;
    let courseIDFieldElement;
    let courseDescFieldElement;
    let courseOpenSelectElement;
    let addCourseButtonElement;
    let loadCourseButtonElement;
    let courses;
    let courseTableBody;
    let courseTableData;

    let courseID = '';
    let courseName = '';
    let desc = '';
    let teacher = '';
    let open = true;

    function updateCourseID(e) {
        courseID = e.target.value;
        console.log(e.target.value);
    }

    function updateName(e) {
        courseName = e.target.value;
        console.log(e.target.value);
    }

    function updateDesc(e) {
        desc = e.target.value;
        console.log(e.target.value);
    }

    function updateOpen(e) {
        if(e.target.value === 'Open') {
            open = true;
            console.log(open);
        } else {
            open = false;
            console.log(open);
        }
    }

    async function addNewCourse() {

        teacher = state.authUser.lastName;

        console.log(courseID);
        console.log(courseName);
        console.log(desc);
        console.log(teacher);
        console.log(open);

        let course = {
            classID: courseID,
            desc: desc,
            name: courseName,
            open: open,
            teacher: teacher    
        }

        if(courseID && courseName && desc && teacher) {

            let response = await fetch(`${env.apiUrl}/course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.jwt
                },
                body: JSON.stringify(course)
            });
            let data = await response.json();
            console.log(data);

            getCourses();
        } else {
            console.log('That is a falsy course!');
        }
    }

    // console.log(e.currentTarget.children[0].innerText);
    async function deleteCourse(e) {
        let forDeletion = e.currentTarget.parentElement.children[1].innerText;
        console.log(forDeletion);
        // $('.toast').toast(option); // TODO: Implement a toast!

        let deletion = {
            classID: forDeletion
        }

        let response = await fetch(`${env.apiUrl}/course?delete=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.jwt
            },
            body: JSON.stringify(deletion)
        });

        let data = await response.json();
        console.log(data);
        getCourses();
    }

    function updateCourse(e) {
        state.targetCourse = e.currentTarget.parentElement.children[1].innerText;
        router.navigate('/facCourseUpdate');
    }

    async function getCourses() {
        // Make courses null in order to avoid repeats.
        courseTableBody.innerHTML = '';
        
        // Fetch all teacher courses from database
        let response = await fetch(`${env.apiUrl}/course`, {
            headers: {
                'Authorization': state.jwt
            }
        });
        courses = await response.json();
        
        console.log(courses);
        if (courses) {
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
            console.log('Sorry, but you do not have any courses!');
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
            courseWelcomeSpan = document.getElementById('welcome-name');
    

            addCourseButtonElement.addEventListener('click', addNewCourse);
            loadCourseButtonElement.addEventListener('click', getCourses);
            courseWelcomeSpan.innerText = state.authUser.lastName;
            courseNameFieldElement.addEventListener('keyup', updateName);
            courseIDFieldElement.addEventListener('keyup', updateCourseID);
            courseDescFieldElement.addEventListener('keyup', updateDesc);
            courseOpenSelectElement.addEventListener('click', updateOpen);
        });
        FacDashboardComponent.prototype.injectStyleSheet();
    }
}

export default new FacDashboardComponent();