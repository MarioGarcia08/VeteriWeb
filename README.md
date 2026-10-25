# Administrador de Pacientes de Veterinaria

Aplicación full stack para que un veterinario gestione sus pacientes. Incluye una interfaz React, una API REST con Express y persistencia en MongoDB Atlas.

## Funcionalidades

- Registro, confirmación de cuenta, inicio de sesión y cierre de sesión.
- Recuperación y cambio de contraseña.
- Perfil del veterinario.
- Alta, consulta, edición y eliminación de pacientes.
- Autenticación de rutas privadas mediante JWT.
- Envío de mensajes de confirmación y recuperación mediante SMTP.

## Tecnologías

- **Frontend:** React 18, Vite, React Router, Axios y Tailwind CSS.
- **Backend:** Node.js, Express, Mongoose, MongoDB, bcrypt, JWT y Nodemailer.

## Requisitos

- Node.js 18 o posterior y npm.
- Un clúster de MongoDB Atlas activo o una instancia compatible.
- Un usuario de base de datos con permisos de lectura y escritura.
- Credenciales de un servidor SMTP para enviar correos de confirmación y recuperación.

## Configuración

El backend y el frontend están en repositorios Git independientes. Configura cada carpeta por separado. **No subas archivos `.env` ni compartas sus valores:** contienen credenciales.

### Backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Edita `backend/.env`:

- `MONGO_URI`: URI de conexión proporcionada por Atlas.
- `JWT_SECRET`: secreto aleatorio y privado para firmar tokens.
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER` y `EMAIL_PASS`: credenciales SMTP.
- `FRONTEND_URL`: dirección del frontend; localmente es `http://localhost:5173`.
- La aplicación selecciona la base de datos `AdministradorPacientesVeterinaria`.

### Frontend

```powershell
cd frontend
npm install
Copy-Item .env.example .env
```

Edita `frontend/.env` y configura `VITE_BACKEND_URL`. Para desarrollo local:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Ejecutar en desarrollo

Abre dos terminales desde la raíz del proyecto:

```powershell
cd backend
npm run dev
```

```powershell
cd frontend
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173). El backend escucha en el puerto `4000` por defecto y debe mostrar en la terminal que se conectó a MongoDB antes de anunciar que el servidor está listo.

Para registrar una cuenta, utiliza un correo que puedas abrir y sigue el enlace de confirmación. Inicia sesión con la contraseña elegida durante el registro. Las cuentas de veterinario y sus pacientes están relacionadas; una cuenta nueva no hereda pacientes de otra cuenta.

## Comprobaciones y compilación

Desde `frontend`:

```powershell
npm run lint
npm run build
```

El build de producción se genera en `frontend/dist`. Desde `backend`, `npm start` inicia el servidor sin Nodemon. No hay un script de pruebas automatizadas configurado actualmente.

## Estructura

```text
backend/    API Express, modelos, rutas, controladores y conexión MongoDB
frontend/   Aplicación React, páginas, componentes y configuración Vite
```

Consulta [backend/README.md](./backend/README.md) y [frontend/README.md](./frontend/README.md) para instrucciones específicas de cada parte.

## Estado de publicación

Las carpetas `backend` y `frontend` tienen historiales Git y remotos GitHub separados. Este README está en la carpeta contenedora, que actualmente no es un repositorio Git; por tanto, no se incluirá al subir esos dos repositorios por separado. Para publicarlo también, habría que crear un repositorio monolítico que contenga ambas carpetas o mantener una copia de la documentación general en uno de los repositorios.

Antes de publicar, revisa los cambios en cada repositorio y confirma que no se hayan añadido credenciales ni datos personales. El frontend compila para producción; el lint actual reporta errores preexistentes que deben corregirse antes de considerar el código completamente limpio.
