# Todo App Frontend
## Características
Este  frontend es una aplicación de gestión de tareas construida con React, Redux Toolkit, React Router, y Thunk para manejar tareas y autenticación.
### Las características principales incluyen:
- Autenticación de usuario: Registro e inicio de sesión utilizando tokens JWT.
- Rutas protegidas: Las rutas de la aplicación están protegidas y solo son accesibles para usuarios autenticados.
- Gestión de tareas: Funcionalidad completa de CRUD para la gestión de tareas.
- Filtros de tareas: Filtrado de tareas por estado (completadas o pendientes).
- Almacenamiento de estado global: Manejo del estado global mediante Redux Toolkit.
- Notificaciones: Las acciones en la aplicación generan notificaciones para el usuario.

### Requisitos previos
Antes de empezar, asegúrate de tener lo siguiente instalado:
- Node.js (versión 12 o superior)
- npm (versión 6 o superior)
- API de backend para manejar las solicitudes de registro, inicio de sesión y gestión de tareas.

### Instalación
1. Clona el repositorio en tu máquina local:
git clone https://github.com/cristhiancao9/FRONT-TO-DO-LIST/tree/feature/redux-integration
2. Accede al directorio del proyecto:
cd FRONT-TO-DO-LIST
3. Instala las dependencias:
npm install
4. Configura la URL de la API en el archivo `.env` en la raíz del proyecto:
Seran enviadas por correo electrónico
5. Inicia la aplicación:
npm run dev

### Scripts disponibles
- `npm run dev`: Ejecuta la aplicación en modo desarrollo.
- `npm run build`: Crea una versión optimizada para producción.

### Rutas
- `/public/login`: Página de inicio de sesión.
- `/public/register`: Página de registro.
- `/tasks`: Página principal de la lista de tareas (restringida a usuarios autenticados).
Estructura del proyecto
- `/app`: Contiene las vistas y componentes principales de la aplicación.
- `/features`: Contiene los slices de Redux para manejar el estado de autenticación y tareas.
- `/layout`: Estructura de layout pública y privada.
- `/components`: Componentes reutilizables como cards, inputs y tablas.
- `/utils`: Funciones auxiliares, como las notificaciones.

### Redux Toolkit
Este proyecto utiliza Redux Toolkit para manejar el estado global de la aplicación. Los slices que se manejan son:
1. `authSlice`: Maneja el estado de autenticación, incluyendo login, logout y manejo de tokens JWT.
2. `tasksSlice`: Maneja el estado de las tareas, incluyendo las operaciones de CRUD.

### API Endpoints
El frontend se comunica con un backend mediante los siguientes endpoints:
1. `POST /auth/register`: Registrar un nuevo usuario.
2. `POST /auth/login`: Autenticar al usuario.
3. `GET /tasks`: Obtener la lista de tareas del usuario autenticado.
4. `POST /tasks`: Agregar una nueva tarea.
5. `PUT /tasks/:id`: Editar una tarea existente.
6. `DELETE /tasks/:id`: Eliminar una tarea.

### Dependencias
- React: Librería para construir interfaces de usuario.
- Redux Toolkit: Para manejar el estado global de la aplicación.
- React Router: Para manejar la navegación entre las rutas.
- Thunk: Para manejar acciones asíncronas en Redux.
- CSS Modules: Para estilos encapsulados en los componentes.
DevDependencias
- ESLint: Para analizar el código y mantener la consistencia.
- Vite: Para el empaquetado y desarrollo rápido del proyecto.

