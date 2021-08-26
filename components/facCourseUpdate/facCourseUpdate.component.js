import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

FacCourseUpdateComponent.prototype = new ViewComponent('facCourseUpdate');
function FacCourseUpdateComponent() {
    let courseNameFieldElement;
    let courseDescFieldElement;
    let courseOpenSelectElement;
    let updateCourseButtonElement;
    let displayTargetCourseSpan;

    let courseID = '';
    let courseName = '';
    let desc = '';
    let teacher = '';
    let open = true;

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

    async function updateCourse() {

        courseID = state.targetCourse;
        teacher = state.authUser.lastName;

        console.log(courseID);
        console.log(courseName);
        console.log(desc);
        console.log(teacher);
        console.log(open);

        let courseReplace = {
            classID: courseID,
            name: courseName,
            desc: desc,
            teacher: teacher,
            open: open
        }

        if(courseID && courseName && desc && teacher) {

            let response = await fetch(`${env.apiUrl}/course?update=true`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.jwt
                },
                body: JSON.stringify(courseReplace)
            });
            let data = await response.json();
            console.log(data);

            router.navigate('/facDashboard');
        } else {
            console.log('That is a falsy user!');
        }
    }

    this.render = function() {
        FacCourseUpdateComponent.prototype.injectTemplate(() => {
            courseNameFieldElement = document.getElementById('course-name');
            courseDescFieldElement = document.getElementById('course-desc');
            courseOpenSelectElement = document.getElementById('open-selector');
            updateCourseButtonElement = document.getElementById('update-course');
            displayTargetCourseSpan = document.getElementById('target-course');

            displayTargetCourseSpan.innerHTML = state.targetCourse;

            updateCourseButtonElement.addEventListener('click', updateCourse);
            courseNameFieldElement.addEventListener('keydown', updateName);
            courseDescFieldElement.addEventListener('keydown', updateDesc);
            courseOpenSelectElement.addEventListener('click', updateOpen);
        });
        FacCourseUpdateComponent.prototype.injectStyleSheet();
    }
}

export default new FacCourseUpdateComponent();