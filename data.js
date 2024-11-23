
const request = async (url) => {
    let response = await fetch (`${url}`);
    return await response.json()
}

const users = async () => await request(`https://jsonplaceholder.typicode.com/users`);
const postsUser = async (userId) => await request(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`);
const commentsPost = async (postId) => await request(`https://jsonplaceholder.typicode.com/comments/?postId=${postId}`);

const load = async () => {
    let usuarios = await users();
    let arrayPosts = [];
    let arrayComments = [];

    for(const usuario of usuarios){
        arrayPosts.push(postsUser(usuario.id))
    }

    let responsePost = await Promise.all(arrayPosts);

    for(let i = 0; i < responsePost.length; i++){
        arrayComments.push(commentsPost(post.id))
    }
    let responseComments = await Promise.all(arrayComments);

    console.log(responseComments);
}
  
load();