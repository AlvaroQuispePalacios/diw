export default{
    name: "Postcard",
    props: ["post", "index"],
    template:`
        <article class="post-card-main">
            <section class="post-card-img">
                <img src="" alt="imagen">
            </section>
            <section class="post-card-content">
                <h2>{{post.titlePost}}</h2>
                <p>{{post.contentPost}}</p>
                <p>{{post.authorPost}}</p>
                <span>{{post.creationDatePost}}</span>
                <div class="post-card-buttons">
                    <button @click="goToUpdate">Actualizar</button>
                    <button @click="deletePost">Eliminar</button>
                </div>
            </section>
        </article>
    `,
    methods:{
        goToUpdate: function (){
            this.$router.push({name: "Formpost", params:{index: this.index}});
        },
        deletePost: function(){
            this.$emit("deletePost", this.index);
        }
    }
}