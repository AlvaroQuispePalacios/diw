const store = Pinia.defineStore("counter", {
    state: () => ({
        //   count: 0
        posts: [""],
        saludar: "Hola"
    }),
    getters: {
        //   double: (state) => state.count * 2,
    },
    actions: {

        getPosts: function(){
            if (localStorage.getItem("posts") != null) {
                this.posts = JSON.parse(localStorage.getItem("posts"));
            } else {
                console.log("No existen post para mostrar");
                this.posts = [];
            }
        }
    },
});

export default store;
