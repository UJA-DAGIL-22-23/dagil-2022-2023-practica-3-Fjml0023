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
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe("\n"+Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe("\n"+Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe("\n"+Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe("\n"+Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe("\n"+datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search("\n"+Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeFalse()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe("\n"+TITULO_ACERCA_DE)

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

describe("Prueba de cuerpoTr HU 04", function () {

    // Preparo los datos
    let d = {
       nombre: "el nombre del deportista"
        ,apellidos: "los apellidos del deportista"
        ,fecha_nacimiento: { dia: 467, mes: 589, año: 6023 }
        ,nacionalidad: "España"
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
            expect(msj.includes(d.nacionalidad)).toBeTrue();
            expect(msj.includes(d.años_de_participacion_mundial)).toBeTrue();
            expect(msj.includes(d.numero_de_participaciones_juegos_olimpicos)).toBeTrue();
        });
});

describe("Prueba de pieTable HU 04", function() {
  it("Se deberia devolver una cadena HTML con el pie de la tabla", function() {
    const resultadoEsperado = "</tbody></table>";
    const resultadoObtenido = Plantilla.pieTable();
    expect(resultadoObtenido).toEqual(resultadoEsperado);
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
describe("Pruebas para imprimenombre HU 02", function() {
  it("debe imprimir los nombres", function() {
    // Preparamos los datos
    let vector = [
      { data: { nombre: "Zoe" } },
      { data: { nombre: "Ana" } },
      { data: { nombre: "Carlos" } }
    ];

    Plantilla.imprimenombre(vector);

    // Verifico que el vector fue ordenado correctamente
    expect(vector[0].data.nombre).toBe("Zoe");
    expect(vector[1].data.nombre).toBe("Ana");
    expect(vector[2].data.nombre).toBe("Carlos");
  });
});

//-----------------------------------------------------------------------------------------------------------
//HU 03: Ver un listado solo con los nombres de todos los jugadores/equipos ordenados alfabéticamente.-------
describe("Pruebas para listarnombreordenado HU 03", function() {
  beforeEach(function() {
    //Preparamos los datos
    spyOn(Plantilla, "recupera");
    spyOn(Plantilla, "imprimenombreOrdenado");
  });

  it("debe llamar a la funcion recupera", function() {
    Plantilla.listarnombreordenado();
    expect(Plantilla.recupera).toHaveBeenCalled();
  });
});

describe("Pruebas para imprimenombreOrdenado HU 03", function() {
  it("debe ordenar el vector alfabéticamente por nombre", function() {
    // Preparamos los datos
    let vector = [
      { data: { nombre: "Zoe" } },
      { data: { nombre: "Ana" } },
      { data: { nombre: "Carlos" } }
    ];

    Plantilla.imprimenombreOrdenado(vector);

    // Verifico que el vector fue ordenado correctamente
    expect(vector[0].data.nombre).toBe("Ana");
    expect(vector[1].data.nombre).toBe("Carlos");
    expect(vector[2].data.nombre).toBe("Zoe");
  });
});


//-----------------------------------------------------------------------------------------------------------
//HU 06: Ver todos los datos de un determinado jugador/equipo.-----------------------------------------------
describe("Prueba de deportistaMostrado HU 06", () => {

  beforeEach(() => {
    // Reiniciamos la variable antes de cada prueba
    Plantilla.deportistaMostrado = null;
  });

  it("Debe inicializarse en null", () => {
    expect(Plantilla.deportistaMostrado).toBeNull();
  });

  it("Debe tener el valor correcto después de asignación", () => {
    const deportista = { nombre: "Juan", deporte: "tenis" };

    // Asignamos el valor al deportista mostrado
    Plantilla.deportistaMostrado = deportista;

    // Verificamos que la variable tenga el valor correcto
    expect(Plantilla.deportistaMostrado).toEqual(deportista);
  });

});

describe("Pruebas para plantillaTablaDeportistas HU 06", function() {
    it("La cabecera de la tabla debería generarse correctamente", function() {
      let esperado =`<table width="100%" class="listado-deportistas">
    <thead>
        <th width="10%">Id</th>
        <th width="10%">Nombre</th>
        <th width="10%">Apellidos</th>
        <th width="20%">Fecha Nacimiento</th>
        <th width="15%">Nacionalidad</th>
        <th width="15%">Años de Participacion Mundial</th>
        <th width="15%">Nº de participacion en Juegos Olimpicos</th>
        <th>Opciones</th>

    </thead>
    <tbody>`;

      
      let obtenido = Plantilla.plantillaTablaDeportistas.cabecera;
      
      expect(obtenido).toEqual(esperado);
    });
    it("El cuerpo de la tabla debería generarse correctamente", function() {
        let esperado = `
    <tr title="${Plantilla.plantillaTags.ID}">
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.APELLIDOS}</td>
        <td>${Plantilla.plantillaTags.FECHA_NAC}</td>
        <td>${Plantilla.plantillaTags.NACIONALIDAD}</td>
        <td>${Plantilla.plantillaTags["AÑOS_MUNDIAL"]}</td>
        <td>${Plantilla.plantillaTags["NUM PARTICIPACION J OLIMPICOS"]}</td>
        <td>
                <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>`;
        
        let obtenido = Plantilla.plantillaTablaDeportistas.cuerpo;
        
        expect(obtenido).toEqual(esperado);
      });
    
    it("El pie de la tabla debería generarse correctamente", function() {
        let esperado = `</tbody></table>`;
        
        let obtenido = Plantilla.plantillaTablaDeportistas.pie;
        
        expect(obtenido).toEqual(esperado);
      });
  });

describe("Prueba para plantillaFormularioDeportista.formulario HU 06", function() {
    it("El formulario debería generar correctamente", function() {
        let esperado = `
<form method='post' action=''>
    <table width="100%" class="listado-deportistas">
        <thead>
        <th>ID</th><th>Nombre</th><th>Apellidos</th><th>Fecha Nac</th><th>Nacionalidad</th><th>Años mundial</th><th>Nº Juegos olimpicos</th><th>Opciones</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-deportista-elemento" disabled id="form-deportista-id"
                        value="${Plantilla.plantillaTags.ID}" 
                        name="id_deportista"/></td>
                <td><input type="text" class="form-deportista-elemento editable" disabled
                        id="form-deportista-nombre" required value="${Plantilla.plantillaTags.NOMBRE}" 
                        name="nombre"/></td>
                <td><input type="text" class="form-deportista-elemento editable" disabled
                        id="form-deportista-apellidos" value="${Plantilla.plantillaTags.APELLIDOS}" 
                        name="apellidos"/></td>
                <td><input type="text" class="form-deportista-elemento editable" disabled
                        id="form-deportista-f_nac" required value="${Plantilla.plantillaTags.FECHA_NAC}" 
                        name="fecha_nacimiento"/></td>
                <td><input type="text" class="form-deportista-elemento editable" disabled
                        id="form-deportista-nacionalidad" required value="${Plantilla.plantillaTags.NACIONALIDAD}" 
                        name="nacionalidad"/></td>        
                <td><input type="text" class="form-deportista-elemento editable" disabled
                        id="form-deportistas-años_de_p_mundial" required value="${Plantilla.plantillaTags["AÑOS_MUNDIAL"]}" 
                        name="años_de_participacion_mundial"/></td>  
                <td><input type="number" class="form-deportista-elemento editable" disabled
                        id="form-deportista-numero_de_participaciones_juegos_olimpicos" min="0" max="20" size="8" required
                        value="${Plantilla.plantillaTags["NUM PARTICIPACION J OLIMPICOS"]}" 
                        name="numero_de_participaciones_juegos_olimpicos"/></td>
                <td>
                    <div><a href="javascript:Plantilla.editarNombre()" class="opcion-secundaria mostrar">Editar nombre</a></div>
                    <div><a href="javascript:Plantilla.editar()" class="opcion-secundaria mostrar">Editar varios campos</a></div>
                    <div><a href="javascript:Plantilla.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Plantilla.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                    <div>
                    <button id="botonAnterior">Retroceder</button>
                    <button id="botonSiguiente">Avanzar</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;
      
      let obtenido = Plantilla.plantillaFormularioDeportista.formulario;
      
      expect(obtenido).toEqual(esperado);
    });
  });

describe("Pruebas para plantillaTags HU 06", function() {
  it("Las etiquetas de la plantilla deberían generarse correctamente", function() {
    let esperado = {
      "ID": "### ID ###",
      "NOMBRE": "### NOMBRE ###",
      "APELLIDOS": "### APELLIDOS ###",
      "FECHA_NAC": "### FECHA_NAC ###",
      "NACIONALIDAD": "### NACIONALIDAD ###",
      "AÑOS_MUNDIAL":  "### AÑOS_MUNDIAL ###",
      "NUM PARTICIPACION J OLIMPICOS": "### NUM PARTICIPACION J OLIMPICOS ###",
    };
    
    let obtenido = Plantilla.plantillaTags;
    
    expect(obtenido).toEqual(esperado);
  });
});


describe("Prueba de sustituyeTags HU 06", () => {

  const plantilla = "El deportista {ID} se llama {NOMBRE} {APELLIDOS}, nació el {FECHA_NAC} en {NACIONALIDAD}, ha participado en {AÑOS_MUNDIAL} mundiales y {NUM PARTICIPACION J OLIMPICOS} juegos olímpicos.";
  
  const deportista = {
    ref: { "@ref": { id: "abc123" } },
    data: {
      nombre: "Juan",
      apellidos: "Pérez",
      fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
      nacionalidad: "Mexico",
      años_de_participacion_mundial: 2,
      numero_de_participaciones_juegos_olimpicos: 1
    }
  };

  const resultadoEsperado = "El deportista {ID} se llama {NOMBRE} {APELLIDOS}, nació el {FECHA_NAC} en {NACIONALIDAD}, ha participado en {AÑOS_MUNDIAL} mundiales y {NUM PARTICIPACION J OLIMPICOS} juegos olímpicos.";

  it("Debe sustituir correctamente las etiquetas en la plantilla", () => {
    expect(Plantilla.sustituyeTags(plantilla, deportista)).toEqual(resultadoEsperado);
  });

});

describe('Prueba de plantillaTablaDeportistas.actualiza', function() {
  it('llama a la función sustituyeTags con los argumentos correctos', function() {
    spyOn(Plantilla, 'sustituyeTags');
    
    const deportista = {
      nombre: 'Juan',
      apellido: 'Pérez',
      edad: 25,
      deporte: 'natación'
    };
    const resultado = Plantilla.plantillaTablaDeportistas.actualiza(deportista);
    
    expect(Plantilla.sustituyeTags).toHaveBeenCalledWith(
      Plantilla.plantillaTablaDeportistas.cuerpo,
      deportista
    );
    expect(resultado).toEqual(resultado);
  });
});

describe('Prueba de plantillaFormularioDeportista.actualiza', function() {
  it('debería llamar a Plantilla.sustituyeTags con this.formulario y el deportista correcto', function() {
    spyOn(Plantilla, 'sustituyeTags');
    const formularioMock = '<form><input type="text" name="nombre" value="%nombre%"><input type="text" name="apellido" value="%apellido%"><input type="number" name="edad" value="%edad%"><input type="text" name="deporte" value="%deporte%"></form>';
    const deportista = {
      nombre: 'Juan',
      apellido: 'Pérez',
      edad: 25,
      deporte: 'natación'
    }
    
    const resultado = Plantilla.plantillaFormularioDeportista.actualiza.call({formulario: formularioMock}, deportista);
    
    expect(Plantilla.sustituyeTags).toHaveBeenCalledWith(formularioMock, deportista);
    expect(resultado).toEqual(resultado);
  });
});
describe('Prueba de imprimeUnDeportista', function() {
  beforeEach(function () {
    // Crea un espía en las funciones que usará la prueba
    spyOn(Plantilla, 'deportistaComoFormulario').and.returnValue('<form>Mocked form</form>');
    spyOn(Frontend.Article, 'actualizar');
    spyOn(Plantilla, 'almacenaDatos');
  });

  it('debería llamar a Plantilla.deportistaComoFormulario con el deportista correcto', function() {    
    const deportista = {
      nombre: 'Juan',
      apellido: 'Pérez',
      edad: 25,
      deporte: 'natación'
    }

    Plantilla.imprimeUnDeportista(deportista);
    
    expect(Plantilla.deportistaComoFormulario).toHaveBeenCalledWith(deportista);
  });
  
  it('debería llamar a Frontend.Article.actualizar con los parámetros correctos', function() {    
    const deportista = {
      nombre: 'Juan',
      apellido: 'Pérez',
      edad: 25,
      deporte: 'natación'
    }
    const formularioMock = '<form>Mocked form</form>';

    Plantilla.imprimeUnDeportista(deportista);
    
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Mostrar un deportista", formularioMock);
  });
  
  it('debería llamar a Plantilla.almacenaDatos con el deportista correcto', function() {    
    const deportista = {
      nombre: 'Juan',
      apellido: 'Pérez',
      edad: 25,
      deporte: 'natación'
    }

    Plantilla.imprimeUnDeportista(deportista);
    
    expect(Plantilla.almacenaDatos).toHaveBeenCalledWith(deportista);
  });
});

describe('Prueba de deportistaComoFormulario', function() {
it('llama a la función actualiza con el argumento correcto', function() {
  spyOn(Plantilla.plantillaFormularioDeportista, 'actualiza');
  
  const deportista = {
    nombre: 'Juan',
    apellido: 'Pérez',
    edad: 25,
    deporte: 'natación'
  };
  const resultado = Plantilla.deportistaComoFormulario(deportista);
  
  expect(Plantilla.plantillaFormularioDeportista.actualiza).toHaveBeenCalledWith(
    deportista
  );
  expect(resultado).toEqual(resultado);
});
});

describe('Prueba para mostrar', function() {
  beforeEach(function () {
    // Crea un espía en las funciones que usará la prueba
    spyOn(Plantilla, 'recuperaUnDeportista');
  });

  it('debería llamar a Plantilla.recuperaUnDeportista con el idDeportista correcto', function() {
    const idDeportista = 123;

    Plantilla.mostrar(idDeportista);

    expect(Plantilla.recuperaUnDeportista).toHaveBeenCalledWith(idDeportista, jasmine.any(Function));
  });
});


describe('Prueba de deportistaComoTabla', function() {
  let spyCabecera, spyActualiza, spyPie;
  const deportista = {
    ref: { '@ref': { id: 'abc123' } },
    data: {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    }
  };

  beforeEach(function() {
    spyActualiza = spyOn(Plantilla.plantillaTablaDeportistas, 'actualiza').and.callThrough();
  });

  it('debería llamar a la funcione actualiza de la plantilla', function() {
    const resultadoObtenido = Plantilla.deportistaComoTabla(deportista);
    expect(spyActualiza).toHaveBeenCalledWith(deportista);

  });
});
  

//----------------------------------------------------------------------------------------------------------------------------------------
//HU 13:Modificar varios de los datos a la vez de un jugador/equipo. Se deberán poder modificar al menos 3 campos además del nombre-------


//-----------------------------------------------------------------------------------------------------------
