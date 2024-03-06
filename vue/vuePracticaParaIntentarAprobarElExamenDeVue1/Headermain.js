export default{
    name: "Headermain",
    template: `
        <header>
            <nav class="nav">
                <section class="nav-logo">
                    Logo
                </section>
                <section class="nav-links">
                    <router-link :to="{name: 'Formpost', params: {isCreate: true}}" class="nav-link">Crear Post</router-link>
                    <button @click="form">Crear Post button</button>
                </section>
            </nav>
        </header>
    `,
    methods:{
        form: function () {
            this.$router.push({name: "Formpost", params: {isCreate: true}})
        }
    }
}