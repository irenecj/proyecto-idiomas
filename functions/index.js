const funciones = require('./bot.js');

exports.handler = async event => {
  var body = JSON.parse(event.body);
  if(body.message != undefined){
    var id_chat = body.message.chat.id; //id que identifica el chat
    var mensaje = body.message.text; //aquello que escribe el usuario
    var respuesta;
    var pal;

    var expresion = /\/buscar (.+)/
    var expresion2 = /\/cambiarsig (.+)/
    var expresion3 = /\/clasificar (.+)/

    var encontrada = mensaje.match(expresion)

    // ahora tenemos que ver las diferentes opciones que puede introducir el usuario

    if(mensaje == "/start"){
      respuesta = "¡Bienvenido a su cuaderno de vocabulario!";
    }else if(mensaje == "/listadovocab"){
      respuesta = funciones.listadoVocab();
    }else if(mensaje.match(expresion)){
      var palabra = mensaje.split(" ")[1];
      respuesta = funciones.palabraConcreta(palabra);
    }else if(mensaje.match(expresion2)){
      var palabra = mensaje.split(" ")[1];
      var significado = mensaje.split("-")[1];
      respuesta = funciones.cambiarSignificado(palabra,significado)
    }else if(mensaje.match(expresion3)){
      var letra = mensaje.split(" ")[1];
      respuesta = funciones.clasifLetra(letra);
    }else if(mensaje == "/listadoexpresiones"){
      respuesta = funciones.listadoExpresiones();
    }else if(mensaje == "/listadofrases"){
      respuesta = funciones.listadoFrases();
    }else if(mensaje == "/help"){
      respuesta = "/start - comenzar a usar el bot \n/listadovocab - muestra un listado del vocabulario registrado \n/listadoexpresiones - muestra un listado de las expresiones populares \n/listadofrases - muestra un listado de frases cotidianas \n/buscar <palabra> - devuelve la palabra junto con su significado \n/cambiarsig <palabra> - <significadoNuevo> - cambia el significado de la palabra \n/clasificar <letra> - muestra las palabras que comienzar por dicha letra"
    }else{
      respuesta = "Los comandos disponibles son: /start, /help, /listadovocab, /buscar <palabra>, /cambiarsig <palabra - significadoNuevo>, /clasificar <letra>, /listadoexpresiones, /listadofrases"
    }

    return {
      statusCode: 200,
      body: JSON.stringify({text:respuesta, method:'sendMessage', chat_id:id_chat}),
      headers:{
          'Content-Type': 'application/json'
        }
    }
  }else{
    respuesta = " ";
    return{
      statusCode: 200,
      body: respuesta.toString()
    }
  }

}
