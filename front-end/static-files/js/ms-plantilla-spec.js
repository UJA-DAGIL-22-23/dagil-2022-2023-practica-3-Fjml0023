/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */

 //HU 04: Ver un listado con todos los datos de todos los jugadores/equipos.---------------------------------
 // SPECS para Jasmine
describe("Prueba de pieTable HU 04", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Plantilla.pieTable()).toBe("</tbody></table>");
        });
});

describe("Prueba de cuerpoTr HU 04", function () {

    // Preparo los datos
    let d = {
       nombre: "el nombre del deportista"
        ,apellidos: "los apellidos del deportista"
        ,fecha_nacimiento: { dia: 467, mes: 589, año: 6023 }
        ,nacionalidad: { pais: "España", comunidad: "Andalucia", provincia: "Jaen"}
        ,años_de_participacion_mundial: [1995,2004]
        ,numero_de_participaciones_juegos_olimpicos: 3
    }

    let p = { data: d }

    // Realizo los expect
    it("debería devolver una fila de tabla con los datos de un deportista",
        function () {
            let msj = Plantilla.cuerpoTr(p)
            expect(msj.includes(d.nombre)).toBeTrue();
            expect(msj.includes(d.apellidos)).toBeTrue();
            expect(msj.includes(d.fecha_nacimiento.dia)).toBeTrue();
            expect(msj.includes(d.fecha_nacimiento.mes)).toBeTrue();
            expect(msj.includes(d.fecha_nacimiento.año)).toBeTrue();
            expect(msj.includes(d.nacionalidad.pais)).toBeTrue();
            expect(msj.includes(d.nacionalidad.comunidad)).toBeTrue();
            expect(msj.includes(d.nacionalidad.provincia)).toBeTrue();
            expect(msj.includes(d.años_de_participacion_mundial)).toBeTrue();
            expect(msj.includes(d.numero_de_participaciones_juegos_olimpicos)).toBeTrue();
        });
});

describe("Prueba de recupera HU 04", function() {
    beforeEach(function() {
      spyOn(window, "fetch").and.returnValue(Promise.resolve({
        status: 200,
        json: function() {
          return Promise.resolve({ data: [] });
        }
      }));
    });
    
    it("Se deberia llamar a 'fetch' con la URL correcta al ejecutar 'Plantilla.recupera'", async function() {
      const urlEsperada = Frontend.API_GATEWAY + "/plantilla/getTodas";
      await Plantilla.recupera(function(data) {});
      expect(window.fetch).toHaveBeenCalledWith(urlEsperada);
    });
  });

  describe("Prueba de cabeceraTable HU 04", function() {
    it("Se deberia devolver una cadena HTML con la cabecera de la tabla", function() {
      const resultadoEsperado =`<table class="listado-deportistas">
        <thead>
        <th>Nombre</th><th>Apellidos</th><th>Fecha Nac</th><th>Nacionalidad</th><th>Años_mundial</th><th>Num_Juegos_olimpicos</th>
        </thead>
        <tbody>
    `;
      const resultadoObtenido = Plantilla.cabeceraTable();
      expect(resultadoObtenido).toEqual(resultadoEsperado);
    });
  });
  

    describe("Prueba de listar HU 04", function () {
        it("debería llamar a recupera", function() {
            // Espía para la funcion recupera
            spyOn(Plantilla, "recupera");
            Plantilla.listar();
        
            expect(Plantilla.recupera).toHaveBeenCalled();            
        });
    });
          
//-----------------------------------------------------------------------------------------------------------
//HU 02: Ver un listado solo con los nombres de todos los jugadores/equipos.---------------------------------
describe("Prueba nombreTr HU 02", function () {

    // Preparo los datos
    let d = {
       nombre: "el nombre del deportista"
    }

    let p = { data: d }

    // Realizo los expect
    it("debería devolver una fila de tabla con el nombre de un deportista",
        function () {
            let msj = Plantilla.nombreTr(p)
            expect(msj.includes(d.nombre)).toBeTrue();
        });
});

describe("Prueba listarnombre HU 02", function() {
    beforeEach(function() {
    // Le paso datos a  recupera() para que devuelva una lista de deportistas
      spyOn(Plantilla, "recupera").and.callFake(function(callback) {
        callback([
          {nombre: "Juan"},
          {nombre: "Pepe"},
          {nombre: "Domi"}
        ]);
      });
    });
    
    it("Se debería llamar a la función Plantilla.imprimenombre al ejecutar Plantilla.listarnombre", function() {
      spyOn(Plantilla, "imprimenombre");
      
      Plantilla.listarnombre();
      
      expect(Plantilla.imprimenombre).toHaveBeenCalled();
    });
  });
//-----------------------------------------------------------------------------------------------------------
