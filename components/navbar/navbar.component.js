const NAVBAR_ELEMENT = document.getElementById("navbar");

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
      console.log(`Navigating to ${e.target.dataset.route}`);
  }

  function logout() {
      console.log("Logging you out!");
  }

  this.render = function() {
    injectStyleSheet();
    injectTemplate( () => {
      document.getElementById('logout').addEventListener('click', logout);
      document.getElementById('nav-to-student-login').addEventListener('click', navigateToView);
      document.getElementById('nav-to-faculty-login').addEventListener('click', navigateToView);
      document.getElementById('nav-to-register').addEventListener('click', navigateToView);
      document.getElementById('nav-to-dashboard').addEventListener('click', navigateToView);
    });
  }
}

export default new NavbarComponent();