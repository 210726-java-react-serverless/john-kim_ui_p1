import navbarComponent from './components/navbar/navbar.component.js';
import loginComponent from './components/login/login.component.js';
import facLoginComponent from './components/facLogin/facLogin.component.js';
import facDashboardComponent from './components/facDashboard/facDashboard.component.js';
import landingComponent from './components/landing/landing.component.js';

import { Router } from './util/router.js';

// ----------------------------------------------------------------------------

let routes = [
    {
        path: '/login',
        component: loginComponent
    },
    {
        path: '/facLogin',
        component: facLoginComponent
    },
    {
        path: '/facDashboard',
        component: facDashboardComponent
    },
    {
        path: '/landing',
        component: landingComponent
    }
]

const router = new Router(routes);

window.onload = () => {
    console.log(navbarComponent);
    navbarComponent.render();
    router.navigate('/landing');
}

export default router;