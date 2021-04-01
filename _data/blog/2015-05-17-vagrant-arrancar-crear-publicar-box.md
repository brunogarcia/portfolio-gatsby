---
template: BlogPost
path: /vagrant-arrancar-crear-publicar-box
date: 2015-05-17T11:47:30+02:00
title: Vagrant - arrancar, crear y publicar un box
metaDescription: Vagrant - arrancar, crear y publicar un box
type: blog
---

En Poun Studio vamos a comenzar varios proyectos con [Symfony](https://www.symfony.com). Hemos decidido empezar con buen pie creando un entorno virtualizado con [Vagrant](https://www.vagrantup.com/) que nos pueda servir para distintos proyectos y nos ahorre el trabajo de configurar cada entorno en distintas maquinas.

Esto nos servirá para agilizar el flujo de trabajo entre el equipo de desarrollo y los diseñadores. Queremos que todos puedan trabajar y realizar pruebas en un mismo entorno sin preocuparse de engorros procesos de configuración.

En nuestro caso, hemos utilizado como base el box creado por [Scotch.io](https://box.scotch.io/), que ya viene con un entorno <abbr title="Linux, Apache, MySQL, Linux">LAMP</abbr> preinstalado (además de Node, Ruby, Composer, cURL, Git, etc).
A este box le hemos añadido [Symfony](https://www.symfony.com), seguidamente hemos clonado un proyecto desde nuestro repositorio privado en [Bitbucket](https://bitbucket.org/), hemos creado la BD y por último hemos configurado los permisos necesarios para que funcione todo correctamente.

Una vez finalizado este proceso hemos empaquetado un nuevo box personalizado a nuestras necesidades. A partir de este punto nos hemos topado con un pequeño problema: ¿y ahora que hacemos con este box de 600 mb? ¿lo subimos al repositorio? ¿utilizamos dropbox para compartirlo con el resto del equipo?.

Por suerte hemos descubierto [Atlas](https://atlas.hashicorp.com/), un servicio que te permite compartir y actualizar un box privado. Por si esto fuera poco, con Atlas puedes hacer un [deploy](https://atlas.hashicorp.com/features/deploy) en tu servidor virtual y [monitorizar](https://atlas.hashicorp.com/features/maintain) todo el proceso. Por ahora es completamente gratuito, pero funciona tan bien que seguramente dentro de poco tendrás que pagar por usarlo. Atlas es un servicio creado por [Hashicorp](https://www.hashicorp.com/), los mismo que idearon Vagrant.

## Instalar el entorno

Para utilizar Vagrant en local es necesario tener instalado [Vagrant](https://www.vagrantup.com/downloads.html) y [Virtualbox](https://www.virtualbox.org/wiki/Downloads).

## Comando básicos de Vagrant

Arrancar vagrant

```shell
$ vagrant up
```

Suspender vagrant

```shell
$ vagrant halt
```

Acceder por ssh al box

```shell
$ vagrant ssh
```

## Arrancar un box privado

_Si necesitas utilizar un box privado alojado en Atlas_

Primero debes de darte de alta en [Atlas](https://atlas.hashicorp.com/). Seguidamente debes pedir permisos de View, Write o Admin al creador del box. Además el dueño del box debe publicarlo para que sea visible.

Crear una carpeta para el proyecto

```shell
$ mkdir mi_proyecto && cd mi_proyecto
```

Hacer login en local con tu cuenta de [Atlas](https://atlas.hashicorp.com/)

```shell
$ vagrant login
```

Instalar el box privado

```shell
$ vagrant init usuario_admin_atlas/nombre_del_box
```

A partir de aqui ya puedes arrancar vagrant y acceder por ssh

```shell
$ vagrant up
$ vagrant ssh
```

Si el Admin del box realiza cambios puedes actualizarte directamente:

```shell
$ vagrant box update
```

## Crear un nuevo box

_Si necesitas crear un box para un nuevo proyecto_

Es buena idea utilizar un box con una configuracion previa, por ejemplo [Scotch.io Box](https://box.scotch.io/) ya tiene instalado un entorno LAMP

Clonar el box

```shell
$ git clone https://github.com/scotch-io/scotch-box.git nombre_de_tu_proyecto
```

Arrancar vagrant

```shell
$ vagrant up
```

Acceder por ssh

```shell
$ vagrant ssh
```

Realizar las configuraciones necesarias en el box base. Por ejemplo: instalar Symfony o clonar el repositorio del proyecto correspondiente, crear la BD, etc. Configurar el entorno de trabajo: permisos, enlaces simbolicos, etc.

Testear el nuevo entorno

```html
https://192.168.33.10
```

### Preparar el box

Estos pasos vienen documentados en el artículo [How to Create a Vagrant Base Box from an Existing One](https://scotch.io/tutorials/how-to-create-a-vagrant-base-box-from-an-existing-one)

```shell
$ sudo apt-get clean
$ sudo dd if=/dev/zero of=/EMPTY bs=1M
$ sudo rm -f /EMPTY
$ cat /dev/null > ~/.bash_history && history -c && exit
```

Para seguir con los siguientes pasos antes debes salir del entorno virtual y suspender Vagrant

```shell
$ exit
$ vagrant halt
```

Ahora ya puedes empaquetar el nuevo box

```shell
$ vagrant package --output mi_nuevo_proyecto.box
```

Este nuevo box ya lo podemos compartir a través de [Atlas](https://atlas.hashicorp.com/)

## Compartir un box privado

_Si necesitas compartir un nuevo box_

Darse de alta en [Atlas](https://atlas.hashicorp.com/)

Subir el nuevo box. Debes dar permisos de View, Write o Admin al resto del equipo involucrado. Además debes publicar el box.

Si realizas cambios sobre el box, puedes publicarlos directamente en Atlas.
