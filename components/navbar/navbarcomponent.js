const NAVBAR_ELEMENT = document.getElementById("navbar");

function NavbarComponent() {

    let template=`
    <nav class="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Expand at md</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample04">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a id="logout" class="nav-item" href="#">Logout</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown04" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown04">
            <li id="nav-to-student-login" class="dropdown-item" data-route="/login">Student Login</a></li>
            <li id="nav-to-faculty-login" class="dropdown-item" data-route="/faclogin">Faculty Login</a></li>
            <li id="nav-to-register" class="dropdown-item" data-route="/register">Register</a></li>
            <li id="nav-to-dashboard" class="dropdown-item" data-route="/dashboard">Dashboard</a></li>
            </ul>
          </li>
        </ul>
        <form>
          <input class="form-control" type="text" placeholder="Search" aria-label="Search">
        </form>
      </div>
    </div>
  </nav>`

  function injectTemplate() {
      NAVBAR_ELEMENT.innerHTML = template;
  }

  function navigateToView(e) {
      console.log(`Navigating to ${e.target.dataset.route}`);
  }

  function logout() {
      console.log("Logging you out!");
  }

  this.render = function() {
    injectTemplate();
    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('nav-to-student-login').addEventListener('click', navigateToView);
    document.getElementById('nav-to-faculty-login').addEventListener('click', navigateToView);
    document.getElementById('nav-to-register').addEventListener('click', navigateToView);
    document.getElementById('nav-to-dashboard').addEventListener('click', navigateToView);
  }
}

export default new NavbarComponent();