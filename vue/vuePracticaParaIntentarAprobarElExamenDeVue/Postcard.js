export default {
    name: "Postcard",
    props: ["post", "index"],
    template: `
        <article class="post-card-main">
            <section class="post-card-img">
                <img :src="post.imagePost" alt="">
                {{post.imagePost}}
            </section>
            <section class="post-card-content">
                <h2>{{post.titlePost}}</h2>
                <p>{{post.contentPost}}</p>
                <span>{{post.creationDatePost}}</span>
                <div class="post-card-buttons">
                    <button>Actualizar</button>
                    <button @click="deletePost(index)">Eliminar</button>
                </div>
            </section>
        </article>
    `,
    methods:{
        deletePost: function(index){
            this.$emit("deletePost", index);
        }
    }
}