export default {
    name: "Goodbyee",
    methods: {
        sendGoodbye: function (){
            this.$route.push("/bye");
            console.log("hola desde GoodBye");
        }
    },
    template: `
        <div>
            Componente {{this.$route.params.message}}
            <input type="button" value="Sendg" @click="sendGoodbye">
        </div>
    `

    // Acceder desde el javascript a lo que se pasa por URL
    // this.$route.params.message
}