const solicitud = async (url) => {
    const respuesta = await fetch(`${url}`);
    return await respuesta.json()
}
const usuarios = async () => await solicitud('https://jsonplaceholder.typicode.com/users');
const postsUsuario = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`);
const comentariosPost = async (postId) => await solicitud(`https://jsonplaceholder.typicode.com/comments/?postId=${postId}`);
const albums = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
const fotosAlbum = async (albumId) => await solicitud(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);

const cargar = async () => {
    const users = await usuarios();
    const respuesta = await Promise.all(
        users.map(async (user) => {
            
            const albumes = await albums(user.id);
            const foticos = await Promise.all(
                albumes.map(async (album) => {
                    const fotos = await fotosAlbum(album.id);
                    return {...albumes, fotos}
                })
            )

            const posts = await postsUsuario(user.id);
            const postComentarios = await Promise.all(
                posts.map(async (post) => {
                    const comentarios = await comentariosPost(post.id);
                    return { ...post, comentarios }
                })
            );
            
            return { ...user, posts: postComentarios, albumcitos: foticos };
            
})
);
console.log(respuesta);
}

cargar();
