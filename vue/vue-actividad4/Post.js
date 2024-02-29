export default {
    name: "Post",
    props: ["post", "index"],
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
                    <router-link :to="{name: 'Formcreateeditpost', params: {btnCreatePost: false, btnSetPost: true, index: index}}">
                        <button>Actualizar</button>
                    </router-link>

                    <button @click="deletePost(index)">Eliminar</button>
                </div>
            </section>
        </article>
    `,
    methods: {
        deletePost: function(index){
            this.$emit("deletePost", index);
        }
    }
    
}