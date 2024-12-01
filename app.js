
import { solicitud } from "./modulos.js"; //Se importa la función solicitud definida en modulos.js.

const cargar = async () => { //Se define una función asincrónica llamada cargar, que será la encargada de realizar varias solicitudes a la API y procesar los datos obtenidos.
    const users = await solicitud("users"); // Llama a la función solicitud con el endpoint "users", obteniendo la lista de usuarios. Al usar await, espera a que la solicitud termine antes de continuar.
    const respuesta = await Promise.all( // Para cada usuario en la lista users, se ejecuta una operación asincrónica. Promise.all espera a que todas las promesas en el arreglo se completen antes de continuar.
        users.map(async (user) => { // users.map crea un arreglo de promesas (una por cada usuario).
            const albumes = await solicitud(`albums?userId=${user.Id}`); //Obtiene los álbumes del usuario actual mediante una solicitud al endpoint "albums" con el parámetro userId.
            const foticos = await Promise.all( //  Para cada álbum, realiza una operación asincrónica para obtener las fotos asociadas. Crea un arreglo de promesas (una por álbum) y espera a que todas se completen.
                albumes.map(async (album) => {
                    const fotos = await solicitud(`photos?albumId=${album.Id}`); // Obtiene las fotos de un álbum específico mediante una solicitud al endpoint "photos" con el parámetro albumId.
                    return {...albumes, fotos}  // Retorna un objeto que contiene los datos del álbum junto con las fotos asociadas.
        })
            )

            const tareas = await solicitud(`todos?userId=${user.Id}`); // Obtiene las tareas asociadas al usuario actual mediante una solicitud al endpoint "todos" con el parámetro userId.
            const tareaCompletada = tareas.filter(tarea => tarea.completed); // Filtra las tareas completadas del usuario actual (aquellas donde completed es true).
            const tareaPendiente = tareas.filter(tarea => !tarea.completed);  // Filtra las tareas pendientes (donde completed es false).

            const posts = await solicitud(`posts/?userId=${user.Id}`);  // Obtiene los posts del usuario actual mediante una solicitud al endpoint "posts" con el parámetro userId.
            const postComentarios = await Promise.all( // Para cada post, realiza una operación asincrónica para obtener los comentarios asociados.
                posts.map(async (post) => {
                    const comentarios = await solicitud(`comments/?postId=${post.Id}`);  // Obtiene los comentarios de un post específico mediante una solicitud al endpoint "comments" con el parámetro postId.
                    return { ...post, comentarios } // Retorna un objeto que contiene los datos del post junto con los comentarios asociados.
                })
            );
            return { ...user, posts: postComentarios, albumcitos: foticos, completada: tareaCompletada, pendiente: tareaPendiente };  // Crea un objeto consolidado que incluye toda la información del usuario: posts (con comentarios), álbumes (con fotos), tareas completadas y tareas pendientes.
        })
    );
    return respuesta; // Retorna un arreglo con la información consolidada de todos los usuarios.
};

cargar().then((a) => { // Llama a la función cargar y muestra en consola la información consolidada de todos los usuarios cuando la operación asincrónica se complete.
    console.log(a);
});
