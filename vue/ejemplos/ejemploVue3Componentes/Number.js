export default {
    name: "Number",
    props: ["numero"],
    methods: {
        clickNumber: function(item){
            this.$emit("clicked-number", item);
        }
    },
    template: `
        <div>
            <input type="button" v-bind:value="numero" @click="clickNumber(numero)">
        </div>
    `
}