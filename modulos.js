const url = "https://jsonplaceholder.typicode.com/";


export const solicitud = async (endpoint) => { //async: Indica que esta función es asíncrona, lo que significa que puede realizar operaciones que toman tiempo sin bloquear el hilo principal de ejecución.
    const respuesta = await fetch(`${url}`); // Realiza una solicitud HTTP a la URL proporcionada. await hace que la función espere hasta que se obtenga la respuesta.
    return await respuesta.json() //  Convierte la respuesta de la solicitud (que está en formato JSON) a un objeto JavaScript.
}


//Estas funciones son wrappers para la función solicitud, cada una con una URL específica para obtener diferentes tipos de datos (usuarios, posts, comentarios, álbumes, fotos, tareas) de la API JSONPlaceholder.
const usuarios = async () => await solicitud('https://jsonplaceholder.typicode.com/users');
const postsUsuario = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`);
const comentariosPost = async (postId) => await solicitud(`https://jsonplaceholder.typicode.com/comments/?postId=${postId}`);
const albums = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
const fotosAlbum = async (albumId) => await solicitud(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
const tareasId = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
