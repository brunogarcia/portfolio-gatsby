---
template: BlogPost
path: /polymer-lit-element-lit-html
date: 2019-06-25T17:12:36.571Z
title: Polymer con lit-element y lit-html
metaDescription: Polymer con lit-element y lit-html
type: blog
---

Esta semana he estado creando una POC con <a href="https://www.polymer-project.org/">Polymer</a>.

* Como template del proyecto he usado el starter kit de Polymer con PWA.
* La app utiliza la API de reservas de vuelos.
* Se puede realizar una búsqueda por ciudades (Madrid, Barcelona, San Sebastian, Berlin, New York, Amsterdam)
* La respuesta de la API se está imprimiendo en la consola.
* La librería de UI se llama <a href="https://sap.github.io/ui5-webcomponents/">UI5 Web Components</a>, es lo mejor que he podido encontrar. La librería oficial de Google aún esta en fase experimental y tiene muy pocos componentes.
 
## ¿Que he aprendido?
* El entorno de desarrollo esta muy verde. Me ha tocado hacer muchas cosas a mano que en React o Vue simplemente ya funcionan.
* Aún no hay librerías de UI 100% funcionales para Web Components. Las que hay son muy simples y limitan mucho el desarrollo.
* El equipo de Polymer ha creado un par de librerías para trabajar con Web Components
  * <a href="https://lit-element.polymer-project.org/">lit-element</a>: para crear etiquetas custom (por ejemplo <myapp-header>Hello World</myapp-header>)
  * <a href="https://lit-html.polymer-project.org/">lit-html</a>: es un motor de plantillas para pintar dichas etiquetas en el DOM.
* Lo bueno: estas etiquetas custom son nativas, o sea que cualquier navegador puede renderizarlas sin necesidad de pasar por un framework JS.
* Ojo: sigue siendo necesario pasar por un proceso de build (de esto se encarga Polymer).
* Importante: las etiquetas custom creadas con Polymer se pueden usar directamente en proyectos Angular, React o Vue.