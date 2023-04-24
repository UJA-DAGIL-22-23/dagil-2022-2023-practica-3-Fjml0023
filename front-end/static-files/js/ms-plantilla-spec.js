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
                <td><input type="text" class="form-deportista-elemento" disabled
                        id="form-deportista-f_nac" required value="${Plantilla.plantillaTags.FECHA_NAC}" 
                        name="fecha_nacimiento"/></td>
                <td><input type="text" class="form-deportista-elemento editable" disabled
                        id="form-deportista-nacionalidad" required value="${Plantilla.plantillaTags.NACIONALIDAD}" 
                        name="nacionalidad"/></td>        
                <td><input type="text" class="form-deportista-elemento" disabled
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

describe('Pruebas para plantillaTablaDeportistas.actualiza', function() {
  it('debe llamar a Plantilla.sustituyeTags con los argumentos correctos', function() {
    const deportista = { 
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
  
    spyOn(Plantilla, 'sustituyeTags');
  
    Plantilla.plantillaTablaDeportistas.cuerpo;  
    const resultado = Plantilla.plantillaTablaDeportistas.actualiza(deportista);
  
    expect(Plantilla.sustituyeTags).toHaveBeenCalledWith(
      Plantilla.plantillaTablaDeportistas.cuerpo, 
      deportista
    );
  });
  
  it('debe devolver el resultado de Plantilla.sustituyeTags', function() {
    const deportista = { 
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
  
    const resultadoEsperado = 'Un resultado cualquiera';
    spyOn(Plantilla, 'sustituyeTags').and.returnValue(resultadoEsperado);
  
    Plantilla.plantillaTablaDeportistas.cuerpo;
    const resultado = Plantilla.plantillaTablaDeportistas.actualiza(deportista);
  
    expect(resultado).toBe(resultadoEsperado);
  });
});


describe('Pruebas para plantillaFormularioDeportista.actualiza', function() {
  it('debe llamar a Plantilla.sustituyeTags con los argumentos correctos', function() {
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
    
    spyOn(Plantilla, 'sustituyeTags');
    
    Plantilla.plantillaFormularioDeportista.formulario ;
    const resultado = Plantilla.plantillaFormularioDeportista.actualiza(deportista);
    
    expect(Plantilla.sustituyeTags).toHaveBeenCalledWith(
      Plantilla.plantillaFormularioDeportista.formulario, 
      deportista
    );
  });
  
  it('debe devolver el resultado de Plantilla.sustituyeTags', function() {
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
    
    const resultadoEsperado = 'Un resultado cualquiera';
    spyOn(Plantilla, 'sustituyeTags').and.returnValue(resultadoEsperado);
    
    Plantilla.plantillaFormularioDeportista.formulario;
    const resultado = Plantilla.plantillaFormularioDeportista.actualiza(deportista);
    
    expect(resultado).toBe(resultadoEsperado);
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
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    }

    Plantilla.imprimeUnDeportista(deportista);
    
    expect(Plantilla.deportistaComoFormulario).toHaveBeenCalledWith(deportista);
  });
  
  it('debería llamar a Frontend.Article.actualizar con los parámetros correctos', function() {    
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    }
    const formularioMock = '<form>Mocked form</form>';

    Plantilla.imprimeUnDeportista(deportista);
    
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Mostrar un deportista", formularioMock);
  });
  
  it('debería llamar a Plantilla.almacenaDatos con el deportista correcto', function() {    
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    }

    Plantilla.imprimeUnDeportista(deportista);
    
    expect(Plantilla.almacenaDatos).toHaveBeenCalledWith(deportista);
  });
});

describe('Pruebas de deportistaComoFormulario', function() {
  beforeEach(function() {
    spyOn(Plantilla.plantillaFormularioDeportista, 'actualiza');
  });
  
  it('debe llamar a plantillaFormularioDeportista.actualiza con el argumento correcto', function() {
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
    
    Plantilla.deportistaComoFormulario(deportista);
    
    expect(Plantilla.plantillaFormularioDeportista.actualiza).toHaveBeenCalledWith(
      deportista
    );
  });
  
  it('debe devolver el resultado de plantillaFormularioDeportista.actualiza', function() {
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
    
    const resultadoEsperado = 'Un resultado cualquiera';
    Plantilla.plantillaFormularioDeportista.actualiza.and.returnValue(resultadoEsperado);
    
    const resultado = Plantilla.deportistaComoFormulario(deportista);
    
    expect(resultado).toBe(resultadoEsperado);
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

describe("Prueba de almacenaDatos", function() {
  it("Almacena correctamente el objeto deportista en Plantilla.deportistaMostrado", function() {
    var deportista = {
      nombre: "Juan",
      apellidos: "Martinez",
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: "Española",
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2 
    };
    
    Plantilla.almacenaDatos(deportista);
    
    expect(Plantilla.deportistaMostrado).toEqual(deportista);
  });
});

describe("Prueba para recuperaDatosAlmacenados", function() {
  it("debe devolver the deportistaMostrado almacenado", function() {
    const deportista = {
      nombre: "Juan",
      apellidos: "Martinez",
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: "Española",
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2 
    };
  
    Plantilla.deportistaMostrado = deportista;
    
    const resultado = Plantilla.recuperaDatosAlmacenados();
  
    expect(resultado).toBe(deportista);
  });
});

describe("Pruebas para Plantilla.form", function() {
  it("debe tener los cuatro campos definidos", function() {
    expect(Plantilla.form).toBeDefined();
    expect(Plantilla.form.NOMBRE).toBeDefined();
    expect(Plantilla.form.APELLIDOS).toBeDefined();
    expect(Plantilla.form.NACIONALIDAD).toBeDefined();
    expect(Plantilla.form.NUM_JJOO).toBeDefined();
  });
  
  it("debe tener los valores correspondientes", function() {
    expect(Plantilla.form.NOMBRE).toBe("form-deportista-nombre");
    expect(Plantilla.form.APELLIDOS).toBe("form-deportista-apellidos");
    expect(Plantilla.form.NACIONALIDAD).toBe("form-deportista-nacionalidad");
    expect(Plantilla.form.NUM_JJOO).toBe("form-deportista-numero_de_participaciones_juegos_olimpicos");
  });
});

describe("Pruebas de habilitarDeshabilitarCamposEditables", function() {
  let formElement1, formElement2, formElement3, formElement4;

  beforeEach(function() {
    // Crear elementos de formulario y agregarlos al DOM
    formElement1 = document.createElement('input');
    formElement1.id = 'form-deportista-nombre';
    document.body.appendChild(formElement1);

    formElement2 = document.createElement('input');
    formElement2.id = 'form-deportista-apellidos';
    document.body.appendChild(formElement2);

    formElement3 = document.createElement('input');
    formElement3.id = 'form-deportista-nacionalidad';
    document.body.appendChild(formElement3);

    formElement4 = document.createElement('input');
    formElement4.id = 'form-deportista-numero_de_participaciones_juegos_olimpicos';
    document.body.appendChild(formElement4);
  });

  afterEach(function() {
    // Eliminar los elementos del formulario del DOM después de cada prueba.
    document.body.removeChild(formElement1);
    document.body.removeChild(formElement2);
    document.body.removeChild(formElement3);
    document.body.removeChild(formElement4);
  });

  it("debe habilitar todos los campos del formulario", function() {

    Plantilla.habilitarDeshabilitarCamposEditables(false);

    // Verificar que los campos estén habilitados
    expect(document.getElementById('form-deportista-nombre').disabled).toBe(false);
    expect(document.getElementById('form-deportista-apellidos').disabled).toBe(false);
    expect(document.getElementById('form-deportista-nacionalidad').disabled).toBe(false);
    expect(document.getElementById('form-deportista-numero_de_participaciones_juegos_olimpicos').disabled).toBe(false);
  });

  it("debe deshabilitar todos los campos del formulario", function() {

    Plantilla.habilitarDeshabilitarCamposEditables(false);

    Plantilla.habilitarDeshabilitarCamposEditables();

    // Verificar que los campos estén deshabilitados
    expect(document.getElementById('form-deportista-nombre').disabled).toBe(true);
    expect(document.getElementById('form-deportista-apellidos').disabled).toBe(true);
    expect(document.getElementById('form-deportista-nacionalidad').disabled).toBe(true);
    expect(document.getElementById('form-deportista-numero_de_participaciones_juegos_olimpicos').disabled).toBe(true);
  });
}); 

describe("Prueba de deshabilitarCamposEditables", function () {
  it("debería llamar a habilitarDeshabilitarCamposEditables con false", function () {
    spyOn(Plantilla, "habilitarDeshabilitarCamposEditables");
    Plantilla.deshabilitarCamposEditables();
    expect(Plantilla.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(true);
  });
});

describe("Prueba de habilitarCamposEditables", function () {
  it("debería llamar a habilitarDeshabilitarCamposEditables con true", function () {
    spyOn(Plantilla, "habilitarDeshabilitarCamposEditables");
    Plantilla.habilitarCamposEditables();
    expect(Plantilla.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
  });
});

describe("Prueba para opcionesMostrarOcultar", function() {
  // Creamos  elementos de prueba
  let elemento1, elemento2, elemento3;

  beforeEach(function() {
    elemento1 = document.createElement('div');
    elemento1.classList.add('clase-prueba');

    elemento2 = document.createElement('span');
    elemento2.classList.add('clase-prueba');

    elemento3 = document.createElement('p');
    elemento3.classList.add('clase-prueba');

    document.body.appendChild(elemento1);
    document.body.appendChild(elemento2);
    document.body.appendChild(elemento3);
    });

  afterEach(function() {
    document.body.removeChild(elemento1);
    document.body.removeChild(elemento2);
    document.body.removeChild(elemento3);
    });

  it("debería cambiar las clases de los elementos para mostrarlos u ocultarlos correctamente", function() {
    Plantilla.opcionesMostrarOcultar('clase-prueba', false);

    // Verificar que los elementos estén ocultos
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);

    Plantilla.opcionesMostrarOcultar('clase-prueba', true);

    // Verificar que los elementos estén visibles
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
    });
});

describe("Prueba de ocultarOpcionesSecundarias", function() {
  // Crea algunos elementos de prueba
  let elemento1, elemento2, elemento3;

  beforeEach(function() {
    elemento1 = document.createElement('div');
    elemento1.classList.add('opcion-secundaria');

    elemento2 = document.createElement('span');
    elemento2.classList.add('opcion-secundaria');

    elemento3 = document.createElement('p');
    elemento3.classList.add('opcion-principal');

    document.body.appendChild(elemento1);
    document.body.appendChild(elemento2);
    document.body.appendChild(elemento3);
  });

  afterEach(function() {
    document.body.removeChild(elemento1);
    document.body.removeChild(elemento2);
    document.body.removeChild(elemento3);
  });

  it("debería ocultar todos los elementos con la clase 'opcion-secundaria'", function() {
    // Llama a la función para ocultar las opciones secundarias.
    Plantilla.ocultarOpcionesSecundarias();

    // Verifica que los elementos con la clase 'opcion-secundaria' estén ocultos
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);

    // Verifica que el elemento con la clase 'opcion-principal' no este oculto
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
  });
});

describe("Prueba de mostrarOpcionesSecundarias", function() {
  // Crea algunos elementos de prueba
  let elemento1, elemento2, elemento3;

  beforeEach(function() {
    elemento1 = document.createElement('div');
    elemento1.classList.add('opcion-secundaria');
    elemento1.classList.add(Frontend.CLASS_OCULTAR);

    elemento2 = document.createElement('span');
    elemento2.classList.add('opcion-secundaria');
    elemento2.classList.add(Frontend.CLASS_OCULTAR);

    elemento3 = document.createElement('p');
    elemento3.classList.add('opcion-principal');

    document.body.appendChild(elemento1);
    document.body.appendChild(elemento2);
    document.body.appendChild(elemento3);
  });

  afterEach(function() {
    document.body.removeChild(elemento1);
    document.body.removeChild(elemento2);
    document.body.removeChild(elemento3);
  });

  it("debería mostrar todos los elementos con la clase 'opcion-secundaria'", function() {
    // Llama a la función para mostrar las opciones secundarias.
    Plantilla.mostrarOpcionesSecundarias();

    // Verifica que los elementos con la clase 'opcion-secundaria' esten visibles
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);

    // Verifica que el elemento con la clase 'opcion-principal' esten ocultos
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
  });
});

describe("Prueba para mostrarOcionesTerciariasEditar", function() {
  // Crea algunos elementos de prueba
  let elemento1, elemento2, elemento3;

  beforeEach(function() {
    elemento1 = document.createElement('div');
    elemento1.classList.add('opcion-terciaria');
    elemento1.classList.add('editar');
    elemento1.classList.add(Frontend.CLASS_OCULTAR);

    elemento2 = document.createElement('span');
    elemento2.classList.add('opcion-terciaria');
    elemento2.classList.add('editar');

    elemento3 = document.createElement('p');
    elemento3.classList.add('opcion-principal');

    document.body.appendChild(elemento1);
    document.body.appendChild(elemento2);
    document.body.appendChild(elemento3);
  });

  afterEach(function() {
    document.body.removeChild(elemento1);
    document.body.removeChild(elemento2);
    document.body.removeChild(elemento3);
  });

  it("debería mostrar todos los elementos con las clases 'opcion-terciaria' y 'editar'", function() {
    // Llama a la función para mostrar las opciones terciarias
    Plantilla.mostrarOcionesTerciariasEditar();

    // Verifica que los elementos con las clases 'opcion-terciaria' y 'editar' esten visibles
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);

    // Verifica que el elemento con la clase 'opcion-principal' esten ocultos
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
  });
});

describe("Prueba para ocultarOcionesTerciariasEditar", function() {
  // Crea algunos elementos de prueba
  let elemento1, elemento2, elemento3;

  beforeEach(function() {
    elemento1 = document.createElement('div');
    elemento1.classList.add('opcion-terciaria');
    elemento1.classList.add('editar');
    elemento1.classList.add(Frontend.CLASS_OCULTAR);

    elemento2 = document.createElement('span');
    elemento2.classList.add('opcion-terciaria');
    elemento2.classList.add('editar');

    elemento3 = document.createElement('p');
    elemento3.classList.add('opcion-principal');

    document.body.appendChild(elemento1);
    document.body.appendChild(elemento2);
    document.body.appendChild(elemento3);
  });

  afterEach(function() {
    document.body.removeChild(elemento1);
    document.body.removeChild(elemento2);
    document.body.removeChild(elemento3);
  });

  it("debería mostrar todos los elementos con las clases 'opcion-terciaria' y 'editar'", function() {
    // Llama a la función para ocultar las opciones terciarias
    Plantilla.ocultarOcionesTerciariasEditar();

    // Verifica que los elementos con las clases 'opcion-terciaria' y 'editar' esten ocultos
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);

    // Verifica que el elemento con la clase 'opcion-principal' esten visible
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
  });
});

describe("Prueba para editar", function() {

  it("debería llamar a las funciones necesarias para editar la plantilla", function() {
    spyOn(Plantilla, "ocultarOpcionesSecundarias");
    spyOn(Plantilla, "mostrarOcionesTerciariasEditar");
    spyOn(Plantilla, "habilitarCamposEditables");

    Plantilla.editar();

    expect(Plantilla.ocultarOpcionesSecundarias).toHaveBeenCalled();
    expect(Plantilla.mostrarOcionesTerciariasEditar).toHaveBeenCalled();
    expect(Plantilla.habilitarCamposEditables).toHaveBeenCalled();
  });
});

describe("Prueba para cancelar", function() {

  it("debería llamar a las funciones necesarias para cancelar la edición de la plantilla", function() {
    spyOn(Plantilla, "imprimeUnDeportista");
    spyOn(Plantilla, "deshabilitarCamposEditables");
    spyOn(Plantilla, "ocultarOcionesTerciariasEditar");
    spyOn(Plantilla, "mostrarOpcionesSecundarias");

    Plantilla.cancelar();

    expect(Plantilla.imprimeUnDeportista).toHaveBeenCalledWith(Plantilla.recuperaDatosAlmacenados());
    expect(Plantilla.deshabilitarCamposEditables).toHaveBeenCalled();
    expect(Plantilla.ocultarOcionesTerciariasEditar).toHaveBeenCalled();
    expect(Plantilla.mostrarOpcionesSecundarias).toHaveBeenCalled();
  });
});
//-----------------------------------------------------------------------------------------------------------
 //HU 12: Modificar el nombre de un jugador/equipo.----------------------------------------------------------

 describe("Prueba de editarNombre", function() {

  it("debería llamar a las funciones necesarias para editar el nombre en la plantilla", function() {
    spyOn(Plantilla, "ocultarOpcionesSecundarias");
    spyOn(Plantilla, "mostrarOcionesTerciariasEditar");
    spyOn(Plantilla, "habilitarCampoNombre");

    Plantilla.editarNombre();

    expect(Plantilla.ocultarOpcionesSecundarias).toHaveBeenCalled();
    expect(Plantilla.mostrarOcionesTerciariasEditar).toHaveBeenCalled();
    expect(Plantilla.habilitarCampoNombre).toHaveBeenCalled();
  });
});


describe('Prueba de habilitarCampoNombre', function() {
  it('debería llamar a habilitarDeshabilitarCampoNombre pasando false y devolver el objeto Plantilla', function() {
    spyOn(Plantilla, 'habilitarDeshabilitarCampoNombre');
    
    var result = Plantilla.habilitarCampoNombre();

    expect(Plantilla.habilitarDeshabilitarCampoNombre).toHaveBeenCalledWith(false);
    expect(result).toEqual(Plantilla);
  });
});


  describe('Pruebas para habilitarDeshabilitarCampoNombre', function() {
    it('deberia deshabilitar todos los campos del formulario si se le pasa true', function() {
      spyOn(document, 'getElementById').and.callFake(function(id) {
        return { disabled: false };
      });
      
      var result = Plantilla.habilitarDeshabilitarCampoNombre(true);

      expect(document.getElementById.calls.count()).toEqual(Object.keys(Plantilla.formNombre).length);
      expect(document.getElementById.calls.allArgs().flat()).toEqual(jasmine.arrayWithExactContents(Object.values(Plantilla.formNombre)));
      expect(result).toEqual(Plantilla);
    });

    it('deberia habilitar el campo nombre del formulario si se le pasa false', function() {
      spyOn(document, 'getElementById').and.callFake(function(id) {
        return { disabled: true };
      });
      
      var result = Plantilla.habilitarDeshabilitarCampoNombre(false);

      expect(document.getElementById.calls.count()).toEqual(Object.keys(Plantilla.formNombre).length);
      expect(document.getElementById.calls.allArgs().flat()).toEqual(jasmine.arrayWithExactContents(Object.values(Plantilla.formNombre)));
      expect(result).toEqual(Plantilla);
    });
    
    it('debería habilitar el campo nombre del formulario por defecto', function() {
      spyOn(document, 'getElementById').and.callFake(function(id) {
        return { disabled: true };
      });
      
      var result = Plantilla.habilitarDeshabilitarCampoNombre();

      expect(document.getElementById.calls.count()).toEqual(Object.keys(Plantilla.formNombre).length);
      expect(document.getElementById.calls.allArgs().flat()).toEqual(jasmine.arrayWithExactContents(Object.values(Plantilla.formNombre)));
      expect(result).toEqual(Plantilla);
    });
  });

    describe('Prueba para formNombre', function() {
      it('debería asignar correctamente los nombres de los campos', function() {
        expect(Plantilla.formNombre.NOMBRE).toEqual("form-deportista-nombre");
      });
    });
  
 //-----------------------------------------------------------------------------------------------------------
  //HU 05:Ver un listado con todos los datos de todos los jugadores/equipos ordenado por el campo del jugador/equipo que el usuario desee.

describe("Prueba de listarOrNombre", function() {
  it("debe llamar a recupera con imprimeOrdenadoNombre como argumento", function() {
    spyOn(Plantilla, "recupera");
    spyOn(Plantilla, "imprimeOrdenadoNombre");

    Plantilla.listarOrNombre();

    expect(Plantilla.recupera).toHaveBeenCalled();
    expect(Plantilla.recupera.calls.argsFor(0)[0]).toBe(Plantilla.imprimeOrdenadoNombre);
  });
});

describe("Prueba de imprimeOrdenadoNombre", function() {
  it("debería ordenar el vector por nombre ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista2, deportista3, deportista1];

    // Llamar a la función que se va a probar
    Plantilla.imprimeOrdenadoNombre(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    expect(vectorDesordenado[0].data.nombre).toEqual(deportista2.data.nombre);
    expect(vectorDesordenado[1].data.nombre).toEqual(deportista1.data.nombre);
    expect(vectorDesordenado[2].data.nombre).toEqual(deportista3.data.nombre);
    
  });
});


describe("listarOrApellidos", function() {
  it("debe llamar a recupera con imprimeOrdenadoApellidos como argumento", function() {
    spyOn(Plantilla, "recupera");
    spyOn(Plantilla, "imprimeOrdenadoApellidos");

    Plantilla.listarOrApellidos();

    expect(Plantilla.recupera).toHaveBeenCalled();
    expect(Plantilla.recupera.calls.argsFor(0)[0]).toBe(Plantilla.imprimeOrdenadoApellidos);
  });
});

describe("Prueba de imprimeOrdenadoApellidos", function() {
  it("debería ordenar el vector por apellidos ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista2, deportista3, deportista1];

    // Llamar a la función que se va a probar
    Plantilla.imprimeOrdenadoApellidos(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    expect(vectorDesordenado[0].data.apellidos).toEqual(deportista2.data.apellidos);
    expect(vectorDesordenado[1].data.apellidos).toEqual(deportista1.data.apellidos);
    expect(vectorDesordenado[2].data.apellidos).toEqual(deportista3.data.apellidos);
    
  });
});


describe("listarOrFecha", function() {
  it("debe llamar a recupera con imprimeOrdenadoFechaNacimiento como argumento", function() {
    spyOn(Plantilla, "recupera");
    spyOn(Plantilla, "imprimeOrdenadoFechaNacimiento");

    Plantilla.listarOrFecha();

    expect(Plantilla.recupera).toHaveBeenCalled();
    expect(Plantilla.recupera.calls.argsFor(0)[0]).toBe(Plantilla.imprimeOrdenadoFechaNacimiento);
  });
});

describe("Prueba de imprimeOrdenadoFechaNacimiento", function() {
  it("debería ordenar el vector por fecha de nacimiento ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista2, deportista3, deportista1];

    // Llamar a la función que se va a probar
    Plantilla.imprimeOrdenadoFechaNacimiento(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    const fechaNacimientoDeportista1 = new Date(1990, 4, 10);
    const fechaNacimientoDeportista2 = new Date(1995, 6, 25);
    const fechaNacimientoDeportista3 = new Date(1985, 2, 12);
    expect(new Date(vectorDesordenado[0].data.fecha_nacimiento.año, vectorDesordenado[0].data.fecha_nacimiento.mes - 1, vectorDesordenado[0].data.fecha_nacimiento.dia)).toEqual(fechaNacimientoDeportista3);
    expect(new Date(vectorDesordenado[1].data.fecha_nacimiento.año, vectorDesordenado[1].data.fecha_nacimiento.mes - 1, vectorDesordenado[1].data.fecha_nacimiento.dia)).toEqual(fechaNacimientoDeportista1);
    expect(new Date(vectorDesordenado[2].data.fecha_nacimiento.año, vectorDesordenado[2].data.fecha_nacimiento.mes - 1, vectorDesordenado[2].data.fecha_nacimiento.dia)).toEqual(fechaNacimientoDeportista2);
    
  });
});


describe("listarOrNacionalidad", function() {
  it("debe llamar a recupera con imprimeOrdenadoNacionalidad como argumento", function() {
    spyOn(Plantilla, "recupera");
    spyOn(Plantilla, "imprimeOrdenadoNacionalidad");

    Plantilla.listarOrNacionalidad();

    expect(Plantilla.recupera).toHaveBeenCalled();
    expect(Plantilla.recupera.calls.argsFor(0)[0]).toBe(Plantilla.imprimeOrdenadoNacionalidad);
  });
});

describe("Prueba de imprimeOrdenadoNacionalidad", function() {
  it("debería ordenar el vector por nacionalidad ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista2, deportista3, deportista1];

    // Llamar a la función que se va a probar
    Plantilla.imprimeOrdenadoNacionalidad(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    expect(vectorDesordenado[0].data.nacionalidad).toEqual("Argentina");
    expect(vectorDesordenado[1].data.nacionalidad).toEqual("Colombia");
    expect(vectorDesordenado[2].data.nacionalidad).toEqual("Mexico");
    
  });
});

  
describe("listarOrAniosMuldial", function() {
  it("debe llamar a recupera con imprimeOrdenadoAniosParticipacionMundial como argumento", function() {
    spyOn(Plantilla, "recupera");
    spyOn(Plantilla, "imprimeOrdenadoAniosParticipacionMundial");

    Plantilla.listarOrAniosMuldial();

    expect(Plantilla.recupera).toHaveBeenCalled();
    expect(Plantilla.recupera.calls.argsFor(0)[0]).toBe(Plantilla.imprimeOrdenadoAniosParticipacionMundial);
  });
});

describe("Prueba de imprimeOrdenadoAniosParticipacionMundial", function() {
  it("debería ordenar el vector por años_de_participación_mundial ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista2, deportista3, deportista1];

    // Llamar a la función que se va a probar
    Plantilla.imprimeOrdenadoAniosParticipacionMundial(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    expect(vectorDesordenado[0].data.años_de_participacion_mundial).toEqual(4);
    expect(vectorDesordenado[1].data.años_de_participacion_mundial).toEqual(2);
    expect(vectorDesordenado[2].data.años_de_participacion_mundial).toEqual(1);
  });
});


describe("listarOrNumJJOO", function() {
  it("debe llamar a recupera con imprimeOrdenadoNumParticipacionesJO como argumento", function() {
    spyOn(Plantilla, "recupera");
    spyOn(Plantilla, "imprimeOrdenadoNumParticipacionesJO");

    Plantilla.listarOrNumJJOO();

    expect(Plantilla.recupera).toHaveBeenCalled();
    expect(Plantilla.recupera.calls.argsFor(0)[0]).toBe(Plantilla.imprimeOrdenadoNumParticipacionesJO);
  });
});

describe("Prueba de imprimeOrdenadoNumParticipacionesJO", function() {
  it("debería ordenar el vector por número de participaciones en Juegos Olímpicos ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista1, deportista3, deportista2];

    // Llamar a la función que se va a probar
    Plantilla.imprimeOrdenadoNumParticipacionesJO(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    expect(vectorDesordenado[0].data.numero_de_participaciones_juegos_olimpicos).toEqual(3);
    expect(vectorDesordenado[1].data.numero_de_participaciones_juegos_olimpicos).toEqual(2);
    expect(vectorDesordenado[2].data.numero_de_participaciones_juegos_olimpicos).toEqual(1);
  });
});

  
