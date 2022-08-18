# ProyectoJS
### Proyecto final  del curso ___JS Top Gun Lab.___

## En que consiste la app
La aplicacion `PARKONTROL` se desarrollo para mejorar el rendimiento y automatizar procesos manuales. mas precisamente llevar el registro de vehiculos en un `parqueadero`, poder obtener precios rapidamente y delegar el registro entre personas.


## Funciones
Como funcion principal podemos llevar el `registro` de vehiculos, contando con el nombre, celular, fecha y demas.
tambien podemos `borrar` o `filtrar` estos registros segun sea necesario.
Ademas podremos crear `nuevos usuarios` para que lleven el registro, pudiendo tambien borrar los usuarios creados. 
Podremos revisar en detalle los registros y obtener el calculo de el `precio` en base a las horas o minutos.


## Desarrollo
La aplicacion se desarrollo en casi 3 semanas, y para iniciar con el desarrollo se opto por dividir el proyecto en dos ramas principales back y front.
para empezar se opto por generar primero la parte del `backend`, creando una api que nos permita modificar o revisar la base de datos, teniendo como servicios la parte de usuarios y la parte de vehiculos. contando tambien con algunos midlewares basicos.
Para trabajar en la parte del `FrontEnd` se utilizo `React` y se hicieron diferentes componentes, manejados atraves de un "Layout" para que el codigo estubiera mejor ordenado y legible. contando con 6 interfaces que varian dependiendo el rol del usuario, tambien con un header para navegar por la app y un footer con datos de contacto y copyright. tambien se utilizaron diferentes dependecias entre las cuales se pueden destacar "react-router-dom" y "react-hook-form".
Al momento de acoplar el front con el back utilizamos un archivo llamado apis que contenia los diferentes endpoints para comunicarnos con la base de datos atraves de "axios".


## Iniciar la aplicacion
Para iniciar el proyecto primero debes de clonar el repositorio haciendo un `git clone https://github.com/The-Cristian22/ProyectoJS.git` en la terminal.
despues entras en la carpeta ProyectoJS/front/proyecto y realizas un `npm i`. esperas a que se instalen las dependencias y luego realizas un `npm run start`, esto para correr el `FrontEnd`.
Despues de esto, abres otra terminar, te diriges a la carpeta ProyectoJS/back y realizas otro `npm i`. cuando las dependencias se hayan descargado realizas un `nodemon ./index.js`, y esto pondria a correr el `BackEnd`.

Pasos en codigo: 

$ `git clone https://github.com/The-Cristian22/ProyectoJS.git`

$ `cd ProyectoJS/`

$ `cd front/` 

$ `cd proyecto/` 

$ `npm i`

$ `npm run start`

$ Nueva terminal

$ `cd ProyectoJS/`

$ `cd back/`

$ `npm i`

$ `nodemon ./index.js`
