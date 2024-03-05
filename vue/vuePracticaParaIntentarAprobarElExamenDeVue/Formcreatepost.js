export default{
    name: "Formcreatepost",
    props: ["posts"],
    data: function() {
        return {
            
            titlePost: "",
            contentPost: "",
            creationDatePost: new Date().toLocaleDateString("en-GB"),
            imagePost: null
        };
    },
    template: `
        <form>
            <h2 >Crear Post</h2>
            <label>Titulo</label>
            <input type="text" placeholder="Titulo" v-model="titlePost">
            <label>Contenido</label>
            <textarea v-model="contentPost"></textarea>
            <input type="file" @change="getSource" ref="fileInput">
            <button @click="createPost">Crear Post</button>
        </form>
    `,
    methods:{
        getSource: function (event) {
            this.imagePost = event.target.files[0].name;
        },
        createPost: function() {
            let post = {
                titlePost: this.titlePost,
                contentPost: this.contentPost,
                imagePost: this.imagePost,
                creationDatePost: this.creationDatePost
            }
            this.posts.push(post);
            localStorage.setItem("posts", JSON.stringify(this.posts));
            this.$router.push("/");
        }
    }
}