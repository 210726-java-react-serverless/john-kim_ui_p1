const NAVBAR_ELEMENT = document.getElementById("navbar");
import router from '../../app.js';
import state from '../../util/state.js';

function NavbarComponent() {

  let template = '';
  let frag = 'components/navbar/navbar.component';

  function injectTemplate(callback) {
    if(template){
      NAVBAR_ELEMENT.innerHTML = template;
    } else {
      fetch(`${frag}.html`)
        .then(resp => resp.text())
        .then(html => {
          template = html;
          NAVBAR_ELEMENT.innerHTML = template;
          callback();
        })
        .catch(err => console.error(err));
    }
  }

  function injectStyleSheet() {
    let dynamicStyle = document.getElementById('nav-css');
    if(dynamicStyle) dynamicStyle.remove();
    dynamicStyle = document.createElement('link');
    dynamicStyle.id = 'nav-css'
    dynamicStyle.rel = 'stylesheet';
    dynamicStyle.href = `${frag}.css`;
    document.head.appendChild(dynamicStyle);
  }

  function navigateToView(e) {
      router.navigate(`${e.target.dataset.route}`);
  }

  function logout() {
    if(state.authUser) {
      console.log('Logging you out!');
      state.authUser = null;
      router.navigate('/landing');
    } else {
      console.log('You are not logged in!');
    }
  }

  function goToHome() {
    try {
      if(state.authUser.lastName) {
        router.navigate('/facDashboard');
      } else if(state.authUser) {
        router.navigate('/studentDashboard');
      } 
    } catch(TypeError) {
      router.navigate('/landing');
    }
  }

  function login(e) {
    try {
      if(state.authUser.lastName) {
        console.log('You are already logged in as a Faculty member!');
        router.navigate('/facDashboard');
      } else if(state.authUser) {
        console.log('You are already logged in as a Student!');
        router.navigate('/studentDashboard');
      } 
    } catch(TypeError) {
      navigateToView(e);
    }
  }

  this.render = function() {
    injectStyleSheet();
    injectTemplate( () => {
      document.getElementById('logout').addEventListener('click', logout);
      document.getElementById('nav-to-student-login').addEventListener('click', navigateToView);
      document.getElementById('nav-to-faculty-login').addEventListener('click', navigateToView);
      document.getElementById('nav-to-register').addEventListener('click', navigateToView);
      document.getElementById('nav-to-dashboard').addEventListener('click', navigateToView);
      document.getElementById('login').addEventListener('click', login);
      document.getElementById('home-link').addEventListener('click', goToHome);
      document.getElementById('brand').addEventListener('click', goToHome);
    });
  }
}

export default new NavbarComponent();