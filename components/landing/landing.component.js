import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

LandingComponent.prototype = new ViewComponent('landing');
function LandingComponent() {
    this.render = function() {
        LandingComponent.prototype.injectTemplate(() => {
            // Initialize any clickable site objects here!
        });
        LandingComponent.prototype.injectStyleSheet();
    }
}

export default new LandingComponent();