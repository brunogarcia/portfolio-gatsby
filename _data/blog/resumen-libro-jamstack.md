---
template: BlogPost
path: /resumen-libro-jamstack
date: 2019-09-20T17:12:36.571Z
title: Resumen del libro 'Modern Web Development on the JAMstack'
metaDescription: Resumen del libro Modern Web Development on the JAMstack
type: blog
---

Este fin de semana he terminado de leer el libro 
<a href="https://www.netlify.com/oreilly-jamstack/">Modern Web Development on the JAMstack</a>.

Puedes leer otras criticas del libro en
<a href="https://www.goodreads.com/book/show/50010660-modern-web-development-on-the-jamstack">Goodreads</a>.

## Netlify

Una cosa que considero importante a tener en cuenta:
* Netlify esta detrás del concepto <a href="https://jamstack.org/">JAMstack</a>.
* Los autores del libro trabajan en <a href="https://www.netlify.com">Netlify</a>.
* Netlify organiza las conferencias <a href="https://jamstackconf.com">Jamstack Conf</a> (este año en tres ciudades distintas: San Francisco, NY, London).

De hecho JAMstack es un montón de tecnologías bajo un nombre molón, como en su
momento lo fue Ajax, PWA o RWD.
La diferencia es que Netlify es parte interesada porque su negocio es dar servicios a empresas
que quieren usar este tipo de tecnología.
No me malintepreteis, su plataforma mola mucho, pero es cuanto menos curioso: 
primero creo la necesidad (real o no) y luego te vendo el producto que lo soluciona.

Si has leido algo sobre JAMstack, os podeís saltar los capítulos del 1 al 5.

IMHO: basicamente te venden la idea y realmente no dicen nada nuevo.

## Resumen

La idea principal es pasar de esto:

`Client <-> Web Server (Apache) <-> Application Server (Laravel) <-> API|ORM <-> BD`

A esto:

`Client <-> CDN (static files)`

A continuación paso a explicarlo en detalle:

### Build de la app

Cuando se produce cualquier cambio en el proyecto se ejecuta un `build` en el servidor de CI/CD.

Un `build` se puede generar por:
- Un webhook: un CMS Headless realiza una llamada a un webhook cuando un usuario ha guardado un dato nuevo.
- Un commit: un desarrollador sube un cambio a la rama master.
- etc.

### Static Site Generator

El job `build` se encarga de construir el proyecto con un "Static Site Generator"
(Gatsby, Hugo, Nuxt, hay una lista enorme en https://www.staticgen.com).
Este job se encarga de crear los HTML, CSS, JS y demás assets del proyecto.

Importante: realmente no son 100% estáticos. 

Por ejemplo Gatsby utiliza componentes React y Nuxt trabaja con componentes Vue.
Esto añade una capa de interacción al site: puedes hacer llamadas Ajax,
puedes usar un state management (Redux o Vuex) para los datos y obviamente puedes
separar la lógica de la presentación gracias a los componentes.

### Datos

Cuando el "Static Site Generator" construye el proyecto, tiene que sacar los datos de algun sitio.
Las opciones pueden ser un CMS headless, una API, ficheros estáticos, etc.

### CDN

El job "deploy" se encarga simplemente de subir los assets a un CDN.

Y ya no hay mas pasos :)

## Capítulo 6

Lo interesante del libro es el capítulo 6.

En este capítulo describen un caso real: <a href="https://www.smashingmagazine.com/2020/01/migration-from-wordpress-to-jamstack/">Smashing Magazine</a>
paso de un arquitectura monolítica (Wordpress + Ruby on Rails + Shopify) a una arquitectura serveless con la ayuda de Netlify.

Alert spoiler: no sé si este caso de uso se podrá utilizar para otro tipo de proyectos.
Me explico: Smashing Magazine es un blog (muy grande) con un sistema de suscripción y una tienda online.

No usaron una tecnología en concreto, sino que han tenido que usar varias librerias y
servicios externos, ademas crear algunas otras desde cero (siempre con Netlify de la mano).

¿Qué Static Site Generator usan?
  * <a href="https://gohugo.io/">Hugo</a>. Basicamente porque cada build tiene que crear MILES de artículos, y Hugo era quien mejor performance les ha dado.

¿Cómo gestionan los datos?
  * Usan un Headless CMS llamado <a href="https://www.netlifycms.org/">Netlify CMS</a> conectado a un repositorio Git.

¿Cómo han implementado la tienda online?
  * <a href="https://stripe.com/">Stripe</a> y <a href="https://github.com/netlify/gocommerce">GoCommerce</a> (una librería Netlify)

¿Y el buscador?
  * <a href="https://www.algolia.com/doc/">Algolia</a> (que incluso tienen componentes para React, Vue, Angular, Android, iOS).

¿Y la identidad de los usuarios?
  * <a href="https://github.com/netlify/gotrue">GoTrue</a> (una librería Netlify).

¿Y los comentarios?
  * <a href="https://github.com/netlify/gotell">GoTell</a> (otra librería Netlify)

¿Y el envio de correos?
  * <a href="https://mailchimp.com/">MailChimp</a>

¡Pero no todo se puede ejecutar en el cliente!. ¿Y la seguridad?
  * Para algunas features (por ejemplo las suscripciones) han usado <a href="https://www.netlify.com/products/functions/">Netlify Functions</a>
    (un wrapper de AWS Lambda integrado con los servicios de Netlify).
