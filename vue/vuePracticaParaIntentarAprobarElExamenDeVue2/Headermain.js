export default {
    name: "Headermain",
    template: `
        <header>
            <nav class="nav">
                <section class="nav-logo">
                    Logo
                </section>
                <section class="nav-links">
                    <button @click="goToContainerPosts">Crear Post button</button>
                    <button @click="goToForm">Crear Post button</button>
                </section>
            </nav>
        </header>
    `,
    methods:{
        goToForm: function(){
            this.$router.push({name: "Formpost"});
        },
        goToContainerPosts: function () {
            this.$router.push({name: "Containerposts"})
        }
    }
}