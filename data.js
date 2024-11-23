// const request = async (url) => {
//     let response = await fetch(`${url}`);
//     return await response.json()
// }
// const users = async () => await request('https://jsonplaceholder.typicode.com/users');
// const postsUser = async (userId) => await request(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`);
// const commentsPost = async (postId) => await request(`https://jsonplaceholder.typicode.com/comments/?postId=${postId}`);

// const load = async () => {
//     let usuarios = await users();
//     let arrayPosts = [];
//     let arrayComments = [];

//     for (const usuario of usuarios) {
//         arrayPosts.push(postsUser(usuario.id))
//     }

//     let responsePost = await Promise.all(arrayPosts);
//     console.log(responsePost); //responsePost aloja el array de los 10 usuarios con sus respectivos posts pero sigue faltando agregar los comments dentro de cada post
    
//     for (let i = 0; i < responsePost.length; i++) {
//         const post = responsePost[i][i];
//         arrayComments.push(commentsPost(post.id))
//     }
//     let responseComments = await Promise.all(arrayComments);
//     console.log(responseComments);//responseComments aloja el array de los 10 usuarios con sus respectivos post y dentro de cada post, sus repectivos comments
// }

// load();

const request = async (url) => {
    let response = await fetch(`${url}`);
    return await response.json();
};

const users = async () => await request('https://jsonplaceholder.typicode.com/users');
const postsUser = async (userId) => await request(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`);
const commentsPost = async (postId) => await request(`https://jsonplaceholder.typicode.com/comments/?postId=${postId}`);

const load = async () => {
    let usuarios = await users();
    let allComments = [];

    for (const usuario of usuarios) {
        // Obtener las publicaciones de cada usuario
        const posts = await postsUser(usuario.id);

        for (const post of posts) {
            // Obtener los comentarios de cada publicación
            const comments = await commentsPost(post.id);
            allComments.push({ postId: post.id, comments });
        }
    }

    console.log(allComments);
};

load();
