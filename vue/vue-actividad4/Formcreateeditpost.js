export default {
    name: "Formcreateeditpos",
    props: ["posts"],
    data: function () {
        return {
            titlePost: "",
            contentPost: "",
            authorPost: "",
            imagePost: "",
            creationDatePost: new Date().toLocaleDateString("en-GB"),
            currentPost: null,
            btnCreatePost: null,
            btnSetPost: null
        };
    },
    template: `
        <form class="form">
            <h2 class="form-title" v-if="btnCreatePost">Crear Post</h2>
            <h2 class="form-title" v-if="btnSetPost">Editar Post</h2>
            <label>Titulo:
                <input v-model="titlePost" type="text" name="title">
            </label>

            <label>Contenido:</label>
            <textarea v-model="contentPost" name="content"></textarea>

            <div>
                <label>Autor:</label>
                <select v-model="authorPost">
                    <option>Yo</option>
                    <option>Tu</option>
                    <option>El</option>
                </select>
            </div>

            <input type="file" @change="getSource" ref="fileInput">
            <router-link to="/" v-if="btnCreatePost" @click="createPost">
                <button type="button">Crear Post</button>
            </router-link>
            
            <router-link to="/" v-if="btnSetPost" @click="setPost">
                <button type="button">Guardar cambios</button>
            </router-link>

        </form>
    `,
    methods:{
        createPost: function(){
            let post = {
                titlePost: this.titlePost,
                contentPost: this.contentPost,
                authorPost: this.authorPost,
                imagePost: this.imagePost,
                creationDatePost: this.creationDatePost
            };
            this.posts.push(post);
            localStorage.setItem("posts", JSON.stringify(this.posts));
            this.cleanInputs();
        },
        cleanInputs: function(){
            this.titlePost = "";
            this.contentPost = "";
            this.imagePost = "";
            this.authorPost =  "";
            this.$refs.fileInput.value = null;
        },
        
        getSource: function(event){
            this.imagePost = event.target.files[0].name;
        },

        updatePost: function() {
            this.titlePost = this.posts[this.currentPost].titlePost;
            this.contentPost = this.posts[this.currentPost].contentPost;
            this.imagePost = this.posts[this.currentPost].imagePost;
            this.authorPost =  this.posts[this.currentPost].authorPost;
        },
    
        setPost: function () {
            let setPost = {
                titlePost: this.titlePost,
                contentPost: this.contentPost,
                authorPost: this.authorPost,
                imagePost: this.imagePost,
                creationDatePost: this.creationDatePost
            };
            this.posts.splice(this.currentPost, 1, setPost);
            localStorage.setItem("posts", JSON.stringify(this.posts));
    
            this.currentPost = null;
            this.cleanInputs();
        },
    },
    created() {
        // Acceder a los parámetros de la ruta y asignarlos a las variables de datos
        this.btnCreatePost = this.$route.params.btnCreatePost === 'true';
        this.btnSetPost = this.$route.params.btnSetPost === 'true';
        if(this.$route.params.index != null){
            this.currentPost = Number(this.$route.params.index);
        }
    },
    mounted(){
        // Asi tenemos la posicion del post del cual vamos a editar en el array posts para luego volverlo a guardar en el localStorage
        if(this.currentPost != null){
            this.updatePost(this.currentPost);
        }
    }
}