const url = "https://jsonplaceholder.typicode.com/"; // Se define la base de la URL de la API que se usará para realizar las solicitudes HTTP.

export const solicitud = async (endpoint) => { // Se exporta una función llamada solicitud que será utilizada en otros archivos. Esta función es asincrónica porque utiliza async.
    const respuesta = await fetch(`${url}${endpoint}`); // Se realiza una solicitud HTTP usando fetch a la URL formada por concatenar url con el endpoint que se pasa como argumento a la función.
    return await respuesta.json(); // Se convierte y retorna la respuesta de la solicitud HTTP (que está en formato JSON) a un objeto de JavaScript.
}



// //Estas funciones son wrappers para la función solicitud, cada una con una URL específica para obtener diferentes tipos de datos (usuarios, posts, comentarios, álbumes, fotos, tareas) de la API JSONPlaceholder.
// const usuarios = async () => await solicitud('https://jsonplaceholder.typicode.com/users');
// const postsUsuario = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`);
// const comentariosPost = async (postId) => await solicitud(`https://jsonplaceholder.typicode.com/comments/?postId=${postId}`);
// const albums = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
// const fotosAlbum = async (albumId) => await solicitud(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
// const tareasId = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
