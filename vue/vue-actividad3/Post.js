export default {
    name: "Post",
    props: ["post"],
    template: `
        <article>
            <section>
                Imagen
                {{post.imagePost}}
            </section>
            <section>
                <h2>{{post.titlePost}}</h2>
                <p>{{post.contentPost}}</p>
                <div>{{post.authorPost}}</div>
                
            </section>
            
            {{post.creationDatePost}}

        </article>
    `
}