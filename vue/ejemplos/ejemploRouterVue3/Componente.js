export default {
    name: "Componente",

    methods: {
        sendHello: function (){
            let username = "Alvaro";
            // En router tiene que estar igual el this.$route.push("/ruta")
            this.$route.push(`/bye/${username}`);
            console.log("hola desde componente");
        }
    },
    template: `
        <div>
            Componente {{this.$route.params.message}}
            <input type="button" value="Send" @click="sendHello">
        </div>
    `

    // Acceder desde el javascript a lo que se pasa por URL
    // this.$route.params.message
}