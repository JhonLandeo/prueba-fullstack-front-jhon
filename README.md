# prueba-fullstack-front-jhon

This template should help get you started developing with Vue 3 in Vite.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build

# Task Manager SPA

Este proyecto es una aplicación de una sola página (SPA) desarrollada con **Vue.js** que permite gestionar tareas consumiendo una API de backend. Incluye funcionalidades para listar, crear, editar y eliminar tareas, actualizando la interfaz de usuario en tiempo real.

## **Características**

- Mostrar una lista de todas las tareas con opciones para editar y eliminar.
- Formulario para crear nuevas tareas.
- Formulario para editar tareas existentes.
- Actualización de la interfaz de usuario en tiempo real sin recargar la página.
- Notificaciones de éxito o error después de cada operación.

---

## **Requisitos Previos**

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes componentes:

- **Node.js** (versión 14 o superior)
- **npm** o **yarn**

---

## Configuración del Archivo `.env`

Para que la aplicación funcione correctamente y pueda comunicarse con la API de backend, es necesario configurar un archivo `.env` en la raíz del proyecto.

### Pasos para Configurar el Archivo `.env`

1. **Crear el Archivo**  
   Crea un archivo llamado `.env` en la raíz del proyecto.

2. **Definir la URL Base de la API**  
   Agrega la siguiente configuración al archivo:

   ```plaintext
   VITE_API_BASE_URL=http://localhost:8000/api


## **Instalación**

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/JhonLandeo/prueba-fullstack-front-jhon.git


```

## **Estructura de Rutas**

- **/login**: Vista para que el usuario ingrese su correo y contraseña para autenticar.
- **/register**: Vista para que el usuario se registre con su nombre, correo y contraseña.
- **/main**: Vista principal donde se gestionan las tareas (solo accesible para usuarios autenticados).

---

## **Dependencias del Proyecto**

Este proyecto utiliza varias librerías y tecnologías para mejorar la experiencia de desarrollo y usuario:

- **Vue 3**: Framework principal para la construcción de la SPA.
- **Vite**: Herramienta de construcción rápida y moderna.
- **Vue Router**: Para gestionar las rutas y la navegación entre vistas.
- **Axios**: Para realizar solicitudes HTTP a la API.
- **BootstrapVue**: Librería de componentes UI basada en Bootstrap para Vue.js.
- **SweetAlert2**: Para mostrar alertas estilizadas y fáciles de usar en la interfaz de usuario.
- **JWT (JSON Web Tokens)**: Para gestionar la autenticación de usuarios de forma segura.
- **localStorage**: Para almacenar el token de autenticación y mantener la sesión del usuario entre recargas de página.

---

## **Notas Adicionales**

- Si encuentras algún error o problema con la aplicación, asegúrate de verificar la configuración de la API y que el servidor backend esté corriendo correctamente.
- El sistema de autenticación se basa en JWT, y el token se guarda en el `localStorage` del navegador. Asegúrate de que el token se envíe correctamente en los encabezados de las solicitudes API.
