
import { solicitud } from "./modulos.js";


const cargar = async () => {//Indica que esta función también es asíncrona.
    const users = await solicitud("users"); //Obtiene una lista de todos los usuarios.
    const respuesta = await Promise.all(  //Crea un arreglo de promesas, una por cada usuario. 
        users.map(async (user) => {
        
            const albumes = await solicitud(`albums?userId=${userId}`); // Obtiene los álbumes del usuario actual.
            const foticos = await Promise.all(  // Obtiene las fotos de cada álbum del usuario.
                albumes.map(async (album) => { 
                    const fotos = await solicitud(`photos?albumId=${albumId}`); 
                    return (...albumes, fotos)
                })
            )

            const tareas = await tareasId (user.id); //Obtiene las tareas del usuario
            const tareasCompletadas = tareas.filter(tarea => tarea.complete); //Filtra las tareas en completadas 
            const tareasPendiente = tareas.filter(tarea => !tarea.complete); //Filtra las tareas pendientes.
            
            const posts = await postsUsuario(user.id); //Obtiene los posts del usuario.
            const postComentarios = await Promise.all( //Obtiene los comentarios de cada post del usuario.
                posts.map(async (post) => {
                    const comentarios = await comentariosPost(post.id);
                    return { ...post, comentarios }
                })
            );
            
            return { ...user, posts: postComentarios, albumcitos: foticos, completada: tareasCompletadas, pendiente:  tareasPendiente }; // Crea un nuevo objeto con información del usuario, sus posts (con comentarios), álbumes (con fotos), tareas completadas y pendientes.
            //Al inicio de la línea, los tres puntos antes de user indican que queremos crear un nuevo objeto.
}) // Después de la copia de las propiedades de user, se agregan nuevas propiedades al nuevo objeto: posts, albumcitos, completada y pendiente.
);
console.log(respuesta); //Imprime en la consola el resultado final, que es un arreglo de objetos, cada uno representando un usuario con toda su información relacionada.
}

cargar();
