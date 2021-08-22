import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

FacDashboardComponent.prototype = new ViewComponent('facDashboard');
function FacDashboardComponent() {
    this.render = function() {
        FacDashboardComponent.prototype.injectTemplate(() => {
            // You can put any clickable components in here, as well as their event listeners!
        });
        FacDashboardComponent.prototype.injectStyleSheet();
    }
}

export default new FacDashboardComponent();