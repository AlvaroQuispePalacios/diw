import Post from "./Post.js"
export default {
    name: "ListPosts",
    props: ["posts"],
    template: `
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