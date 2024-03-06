import Postcard from "./Postcard.js";
export default{
    name: "Containerposts",
    props: ["posts"],
    template:`
        <div class="container-posts">
            <h1>Posts</h1>
            <Postcard v-for="(post, index) in posts" :post="post" :index="index" @delete-post="deletePost(index)"></Postcard>
        </div>
    `,
    components:{
        Postcard
    },
    methods: {
        deletePost:function(index) {
            this.posts.splice(index, 1);
        }
    }
}