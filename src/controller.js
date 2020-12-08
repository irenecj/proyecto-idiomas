//----------------------------------------------------------------------------
//          CLASE CONTROLADORA
//----------------------------------------------------------------------------

const Idioma = require("./idioma.js");
const Traduccion = require("./traduccion.js");
const Cotidiano = require("./cotidiano.js");
class Controller {

  constructor(){
    this.idioma = new Idioma("Español","Francés");
  }

  //método para añadir una traducción al listado -> HU2
  nuevaTraduccion(palabra,significado){
    this.idioma.aniadirVocab(palabra,significado);
  }

  //método para obtener todo el listado de vocabulario -> HU1
  todasTraducciones(){
    var traducciones = this.idioma.mostrarVocab();
    return traducciones;
  }

  //método para obtener una traducción concreta del listado a partir de la palabra -> HU3
  traduccion(palabra){
    var significado = this.idioma.mostrarPalabra(palabra);
    return significado;
  }


  //método para cambiar el significado de una palabra concreta -> HU4
  cambioSignificado(palabra,significadoNuevo){
    this.idioma.cambiarSignificado(palabra,significadoNuevo);
  }
}

module.exports = Controller;
