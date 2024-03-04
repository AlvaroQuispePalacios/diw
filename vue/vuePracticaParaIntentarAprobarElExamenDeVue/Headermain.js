export default{
    name: "Headermain",
    template: `
        <header>
            <nav class="nav">
                <section class="nav-logo">
                    Logo
                </section>
                <section class="nav-links">
                    <router-link to="/" class="nav-link">Inicio</router-link>
                    <router-link to="/createPost" class="nav-link">Crear Post</router-link>
                </section>
            </nav>
        </header>
    `
}