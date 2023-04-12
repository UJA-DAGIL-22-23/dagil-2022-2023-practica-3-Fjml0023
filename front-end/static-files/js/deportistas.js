/**
 * @file deportistas.js
 * @description Funciones para el procesamiento de la info enviada por el MS Deportistas
 * @author Francisco Javier Martinez Lomas
 * @date 07-abr-2023
 */

"use strict";

/// Creo el espacio de nombres
let Deportistas = {};

/// Nombre de los campos del formulario para editar una deportista
Deportistas.form = {
    NOMBRE: "form-deportista-nombre",
    APELLIDOS: "form-deportista-apellidos",
    FECHA_DE_NACIMIENTO:{
        DIA: "form-deportista-dia",
        MES: "form-deportista-mes",
        ANIO: "form-deportista-anio",
    },
    NACIONALIDAD:{
        PAIS: "form-deportista-pais",
        COMUNIDAD: "form-deportista-comunidad",
        PROVINCIA: "form-deportista-provincia",
    },
    ANIOS_MULDIAL: "form-deportista-mundial",
    NUMERO_JUEGOS_OLIMPICOS: "form-deportista-juegos"
}
/*
Personas.form = {
    NOMBRE: "form-persona-nombre",
    APELLIDOS: "form-persona-apellidos",
    EMAIL: "form-persona-email",
    ANIO: "form-persona-anio",
}*/

/// Objeto para almacenar los datos de la deportista que se está mostrando
Deportistas.deportistaMostrada = null

// Tags que voy a usar para sustituir los campos
Deportistas.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "EMAIL": "### EMAIL ###",
    "AÑO ENTRADA": "### AÑO ENTRADA ###",
}
/// Plantilla para poner los datos de una deportista en un tabla dentro de un formulario
Deportistas.plantillaFormularioDeportista = {}


// Cabecera del formulario
Deportistas.plantillaFormularioDeportista.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-deportistas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Apellidos</th><th width="10%">eMail</th>
            <th width="15%">Año contratación</th><th width="25%">Acciones</th>
        </thead>
        <tbody>
            <tr title="${Deportistas.plantillaTags.ID}">
                <td><input type="text" class="form-deportista-elemento" disabled id="form-deportista-id"
                        value="${Deportistas.plantillaTags.ID}" 
                        name="id_deportista"/></td>
                <td><input type="text" class="form-deportista-elemento editable" disabled
                        id="form-deportista-nombre" required value="${Deportistas.plantillaTags.NOMBRE}" 
                        name="nombre_deportista"/></td>
                <td><input type="text" class="form-deportista-elemento editable" disabled
                        id="form-deportista-apellidos" value="${Deportistas.plantillaTags.APELLIDOS}" 
                        name="apellidos_deportista"/></td>
                <td><input type="email" class="form-deportista-elemento editable" disabled
                        id="form-deportista-email" required value="${Deportistas.plantillaTags.EMAIL}" 
                        name="email_deportista"/></td>
                <td><input type="number" class="form-deportista-elemento editable" disabled
                        id="form-deportista-anio" min="1950" max="2030" size="8" required
                        value="${Deportistas.plantillaTags["AÑO ENTRADA"]}" 
                        name="año_entrada_deportista"/></td>
                <td>
                    <div><a href="javascript:Deportistas.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Deportistas.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Deportistas.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;


/// Plantilla para poner los datos de varias deportistas dentro de una tabla
Deportistas.plantillaTablaDeportistas = {}


// Cabecera de la tabla
Deportistas.plantillaTablaDeportistas.cabecera = `<table width="100%" class="listado-deportistas">
                    <thead>
                        <th width="10%">Id</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="10%">eMail</th>
                        <th width="15%">Año contratación</th>
                        <th width="15%">Acciones</th>

                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una deportista
Deportistas.plantillaTablaDeportistas.cuerpo = `
    <tr title="${Deportistas.plantillaTags.ID}">
        <td>${Deportistas.plantillaTags.ID}</td>
        <td>${Deportistas.plantillaTags.NOMBRE}</td>
        <td>${Deportistas.plantillaTags.APELLIDOS}</td>
        <td>${Deportistas.plantillaTags.EMAIL}</td>
        <td>${Deportistas.plantillaTags["AÑO ENTRADA"]}</td>
        <td>
                    <div><a href="javascript:Deportistas.mostrar('${Deportistas.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

// Pie de la tabla
Deportistas.plantillaTablaDeportistas.pie = `        </tbody>
             </table>
             `;


/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la deportista que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Deportista} Deportista Objeto con los datos de la deportista que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Deportistas.sustituyeTags = function (plantilla, deportista) {
    return plantilla
        .replace(new RegExp(Deportistas.plantillaTags.ID, 'g'), deportista.ref['@ref'].id)
        .replace(new RegExp(Deportistas.plantillaTags.NOMBRE, 'g'), deportista.data.nombre)
        .replace(new RegExp(Deportistas.plantillaTags.APELLIDOS, 'g'), deportista.data.apellidos)
        .replace(new RegExp(Deportistas.plantillaTags.EMAIL, 'g'), deportista.data.email)
        .replace(new RegExp(Deportistas.plantillaTags["AÑO ENTRADA"], 'g'), deportista.data.año_entrada)
}

/**
 * Actualiza el cuerpo de la tabla con los datos de la deportista que se le pasa
 * @param {Deportista} Deportista Objeto con los datos de la deportista que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Deportistas.plantillaTablaDeportistas.actualiza = function (deportista) {
    return Deportistas.sustituyeTags(this.cuerpo, deportista)
}

/**
 * Actualiza el formulario con los datos de la deportista que se le pasa
 * @param {Deportista} Deportista Objeto con los datos de la deportista que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Deportistas.plantillaFormularioDeportista.actualiza = function (deportista) {
    return Deportistas.sustituyeTags(this.formulario, deportista)
}

/**
 * Función que recuperar todas las deportistas llamando al MS Deportistas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Deportistas.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio deportistas
    try {
        const url = Frontend.API_GATEWAY + "/deportistas/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorDeportistas = null
    if (response) {
        vectorDeportistas = await response.json()
        callBackFn(vectorDeportistas.data)
    }
}

/**
 * Función que recuperar todas las deportistas llamando al MS Deportistas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idDeportista Identificador de la deportista a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Deportistas.recuperaUnaDeportista = async function (idDeportista, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/deportistas/getPorId/" + idDeportista
        const response = await fetch(url);
        if (response) {
            const deportista = await response.json()
            callBackFn(deportista)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}


/**
 * Imprime los datos de una deportista como una tabla usando la plantilla del formulario.
 * @param {deportista} Deportista Objeto con los datos de la deportista
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Deportistas.deportistaComoTabla = function (deportista) {
    return Deportistas.plantillaTablaDeportistas.cabecera
        + Deportistas.plantillaTablaDeportistas.actualiza(deportista)
        + Deportistas.plantillaTablaDeportistas.pie;
}


/**
 * Imprime los datos de una deportista como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {deportista} Deportista Objeto con los datos de la deportista
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Deportistas.deportistaComoFormulario = function (deportista) {
    return Deportistas.plantillaFormularioDeportista.actualiza( deportista );
}


/**
 * Función para mostrar en pantalla todas las deportistas que se han recuperado de la BBDD.
 * @param {Vector_de_deportistas} vector Vector con los datos de las deportistas a mostrar
 */

Deportistas.imprimeMuchasDeportistas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Deportistas.plantillaTablaDeportistas.cabecera
    vector.forEach(e => msj += Deportistas.plantillaTablaDeportistas.actualiza(e))
    msj += Deportistas.plantillaTablaDeportistas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de deportistas", msj)
}

/**
 * Función para mostrar en pantalla los detalles de una deportista que se ha recuperado de la BBDD por su id
 * @param {Deportista} deportista Datos de la deportista a mostrar
 */

Deportistas.imprimeUnaDeportista = function (deportista) {
    // console.log(deportista) // Para comprobar lo que hay en vector
    let msj = Deportistas.deportistaComoFormulario(deportista);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una deportista", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Deportistas.almacenaDatos(deportista)
}

/**
 * Almacena los datos de la deportista que se está mostrando
 * @param {Deportista} deportista Datos de la deportista a almacenar
 */

Deportistas.almacenaDatos = function (deportista) {
    Deportistas.deportistaMostrada = deportista;
}

/**
 * Recupera los valores almacenados de la deportista que se estaba mostrando
 * @return Datos de la deportista a almacenada
 */

Deportistas.recuperaDatosAlmacenados = function () {
    return this.deportistaMostrada;
}

/**
 * Función principal para recuperar las deportistas desde el MS y, posteriormente, imprimirlas.
 */
Deportistas.listar = function () {
    Deportistas.recupera(Deportistas.imprimeMuchasDeportistas);
}


/**
 * Función principal para mostrar los datos de una deportista desde el MS y, posteriormente, imprimirla.
 * @param {String} idDeportista Identificador de la deportista a mostrar
 */
Deportistas.mostrar = function (idDeportista) {
    this.recuperaUnaDeportista(idDeportista, this.imprimeUnaDeportista);
}


/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Deportistas.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Deportistas.form) {
        document.getElementById(Deportistas.form[campo]).disabled = deshabilitando
    }
    return this
}


/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Deportistas.deshabilitarCamposEditables = function () {
    Deportistas.habilitarDeshabilitarCamposEditables(true)
    return this
}


/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Deportistas.habilitarCamposEditables = function () {
    Deportistas.habilitarDeshabilitarCamposEditables(false)
    return this
}


/**
 * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Deportistas.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Deportistas.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}


/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Deportistas.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Deportistas.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}


/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Deportistas.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}


/**
 * Función que permite modificar los datos de una deportista
 */
Deportistas.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una deportista
 */
Deportistas.cancelar = function () {
    this.imprimeUnaDeportista(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}


/**
 * Función para guardar los nuevos datos de una deportista
 */
Deportistas.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/deportistas/setTodo/"
        let id_deportista = document.getElementById("form-deportista-id").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_deportista": id_deportista,
                "nombre_deportista": document.getElementById("form-deportista-nombre").value,
                "apellidos_deportista": document.getElementById("form-deportista-apellidos").value,
                "email_deportista": document.getElementById("form-deportista-email").value,
                "año_entrada_deportista": document.getElementById("form-deportista-anio").value
            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const deportista = await response.json()
            alert(deportista)
        }
        */
        Deportistas.mostrar(id_deportista)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}



