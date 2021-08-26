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

    let courseID = state.targetCourse;
    let courseName = '';
    let desc = '';
    let teacher = state.authUser.lastName;
    let open = null;

    function updateName(e) {
        console.log(e.target.value);
    }

    function updateDesc(e) {
        console.log(e.target.value);
    }

    function updateOpen(e) {
        console.log(e.target.value);
    }

    async function updateCourse() {
        if(courseID && courseName && desc && teacher && open) {
            let response = await fetch(`${env.apiUrl}/course?update=true`, {
                method: 'POST',
                headers: {
                    'Authorization': state.jwt
                },
                body: {
                    classID: courseID,
                    name: courseName,
                    desc: desc,
                    teacher: teacher,
                    open: open
                }
            });
            let data = await JSON.stringify(response);
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