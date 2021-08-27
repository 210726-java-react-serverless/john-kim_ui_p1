import navbarComponent from './components/navbar/navbar.component.js';
import loginComponent from './components/login/login.component.js';
import registerComponent from './components/register/register.component.js';
import studentDashboardComponent from './components/studentDashboard/studentDashboard.component.js';
import facLoginComponent from './components/facLogin/facLogin.component.js';
import facDashboardComponent from './components/facDashboard/facDashboard.component.js';
import landingComponent from './components/landing/landing.component.js';
<<<<<<< HEAD
import enrolledCourseComponent from './components/enrolledCourse/enrolledCourse.component.js';
=======
import facCourseUpdateComponent from './components/facCourseUpdate/facCourseUpdate.component.js';
>>>>>>> 0b7429284e64aa576c00919815566e1054363dde

import { Router } from './util/router.js';

// ----------------------------------------------------------------------------

let routes = [
    {
        path: '/login',
        component: loginComponent
    },

    {
        path: '/register',
        component: registerComponent
    },

    {
        path: '/studentDashboard',
        component: studentDashboardComponent
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
    },
<<<<<<< HEAD

    {
        path: '/enrolledCourse',
        component: enrolledCourseComponent
=======
    {
        path: '/facCourseUpdate',
        component: facCourseUpdateComponent
>>>>>>> 0b7429284e64aa576c00919815566e1054363dde
    }
]

const router = new Router(routes);

window.onload = () => {
    console.log(navbarComponent);
    navbarComponent.render();
    router.navigate('/landing');
}

export default router;