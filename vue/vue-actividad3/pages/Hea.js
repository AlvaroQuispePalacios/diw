export default {
    name: "Hea",
    template: `
    <header>
        <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary navbar-dark">
            <div class="container">
              <a class="navbar-brand" href="#">
                <img src="../img/LogoEchado.png" alt="DuckType">
              </a>
              <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
                <div class="navbar-nav ms-lg-auto">
                    <a class="nav-link" href="./userData.html" >
                        <img src="" class="userImg rounded-circle" width="40px" id="userAvatarWeb">
                        <span id="userNameWeb"></span>
                    </a>
                    <a class="nav-link" href="./userIndex.html"">Home</a>
                    <a class="nav-link" href="#">Contact</a>
                    <a class="nav-link" id="logOut" href="../index.html">Log Out</a>
                </div>
              </div>
            </div>
          </nav> 
    </header>
    `,
};
