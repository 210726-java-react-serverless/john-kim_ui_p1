import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

LandingComponent.prototype = new ViewComponent('landing');
function LandingComponent() {
    let studentPortalLogo;
    let facultyPortalLogo;

    this.render = function() {
        LandingComponent.prototype.injectTemplate(() => {
            // Initialize any clickable site objects here!
            studentPortalLogo = document.getElementById('student-portal');
            facultyPortalLogo = document.getElementById('staff-portal');

            studentPortalLogo.addEventListener('click', router.navigate('/login'));
            facultyPortalLogo.addEventListener('click', router.navigate('/facLogin'));
        });
        LandingComponent.prototype.injectStyleSheet();
    }
}

export default new LandingComponent();