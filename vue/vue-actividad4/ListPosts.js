import Post from "./Post.js"
export default {
    name: "ListPosts",
    props: ["posts"],
    template: `
        <router-link :to="{name: 'Formcreateeditpost', params: {btnCreatePost: true, btnSetPost: false} }" >
            <button>Crear Post</button>
        </router-link>
        <section class="posts">
            <Post v-for="(post, index) in posts" :post="post" :index="index"  @delete-post="deletePost(index)"></Post>
        </section>
    `,
    components:{
        Post
    },
    methods:{
        deletePost: function(index){
            this.posts.splice(index, 1);
            localStorage.setItem("posts", JSON.stringify(this.posts));
        },
    }
}