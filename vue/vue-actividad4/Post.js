export default {
    name: "Post",
    props: ["post"],
    methods: {
        updatePost: function(index){
            // Le dice al padre que algo pasa
            this.$emit("updatePost", index);
        },
        deletePost: function(index){
            this.$emit("deletePost", index);
        }
    },
    template: `
        <article class="post-main">
            <section class="post-img">
                <img v-bind:src="post.imagePost" alt="imgPost">
            </section>
            <section class="post-content">
                <h2 class="post-content-header">{{post.titlePost}}</h2>
                <p class="post-content-text">{{post.contentPost}}</p>
                <div class="post-content-footer">
                    <span>
                        {{post.authorPost}}
                    </span>
                    <span>
                        {{post.creationDatePost}}
                    </span>
                </div>
                <div class="post-content-botones">
                    <button @click="updatePost(index)">Actualizar</button>
                    <button @click="deletePost(index)">Eliminar</button>
                </div>
            </section>
        </article>
    `
}