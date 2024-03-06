export default{
    name: "Formpost",
    props: ["posts"],
    data: function (){
        return{
            isCreate: true,
            index: null,
            titlePost: "",
            contentPost: "",
            authorPost: "",
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
            <label>Autor</label>
            <select v-model="authorPost">
                <option>Yo</option>
                <option>Tu</option>
                <option>El</option>
            </select>
            <input type="file" @change="getSource" ref="fileInput">

            <button v-if="isCreate" @click="createPost">Crear Post</button>
            <button v-else @click="updatePost">Guardar cambios</button>
        </form>
    `,
    methods:{
        getSource: function (event) {
            this.imagePost = event.target.files[0].name;
        },
        createPost: function(){
            let post = {
                titlePost: this.titlePost,
                contentPost: this.contentPost,
                authorPost: this.authorPost,
                creationDatePost: this.creationDatePost,
                imagePost: this.imagePost
            }

            this.posts.push(post);
            this.$router.push({name: "Containerposts"});
        },
        cargarDatos: function () {
            this.titlePost = this.posts[this.index].titlePost;
            this.contentPost = this.posts[this.index].contentPost;
            this.authorPost = this.posts[this.index].authorPost;
            this.imagePost = this.posts[this.index].imagePost;
        },
        updatePost: function () {
            let setPost = {
                titlePost: this.titlePost,
                contentPost: this.contentPost,
                authorPost: this.authorPost,
                creationDatePost: this.creationDatePost,
                imagePost: this.imagePost
            }
            this.posts.splice(this.index, 1, setPost);
            this.$router.push({name: "Containerposts"});
        }

    },
    mounted(){
        if(this.$route.params.index != undefined){
            this.index = Number(this.$route.params.index);
            console.log(this.index);
        }

        if(this.index != null){
            this.isCreate = false;
            this.cargarDatos();
        }
    }
}