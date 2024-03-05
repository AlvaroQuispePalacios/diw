export default{
    name: "Formcreatepost",
    props: ["posts"],
    data: function() {
        return {
            isCreate: true,
            index: null,
            titlePost: "",
            contentPost: "",
            creationDatePost: new Date().toLocaleDateString("en-GB"),
            imagePost: null
        };
    },
    template: `
        <form>
            <h2 v-if="isCreate">Crear Post</h2>
            <h2 v-else>Actualizar Post</h2>

            <label>Titulo</label>
            <input type="text" placeholder="Titulo" v-model="titlePost">
            <label>Contenido</label>
            <textarea v-model="contentPost"></textarea>
            <input type="file" @change="getSource" ref="fileInput">

            <button v-if="isCreate" @click="createPost">Crear Post</button>
            <button v-else @click="actualizarPost">Actualizar Post</button>
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
        },
        cargarDatos: function(){
            this.titlePost = this.posts[this.index].titlePost;
            this.contentPost = this.posts[this.index].contentPost;
            this.imagePost = this.posts[this.index].imagePost;
        },
        actualizarPost: function () {
            let setPost = {
                titlePost: this.titlePost,
                contentPost: this.contentPost,
                imagePost: this.imagePost,
                creationDatePost: this.creationDatePost
            }
            this.posts.splice(this.index, 1, setPost);
            localStorage.setItem("posts", JSON.stringify(this.posts)),
            this.$router.push("/");
        }
    },
    mounted(){
        if(this.$route.params.isCreate == 'false'){
            this.isCreate = false;
            // console.log(this.$route.params.isCreate);
        }
        if(this.$route.params.index != undefined){
            this.index = Number(this.$route.params.index);
            // console.log(this.$route.params.index);
            // console.log(this.index);
        }

        if(this.index != null){
            this.cargarDatos();
        }

    }
}