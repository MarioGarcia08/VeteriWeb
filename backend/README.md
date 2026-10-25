# Backend — Administrador de Pacientes de Veterinaria

API REST creada con Node.js, Express y Mongoose. Gestiona veterinarios y pacientes, autentica rutas privadas con JWT y utiliza MongoDB.

## Requisitos

- Node.js 18 o posterior y npm.
- MongoDB Atlas activo o una instancia compatible.
- Usuario de base de datos de MongoDB con permisos de lectura y escritura.
- Servidor SMTP para correos de confirmación y recuperación de contraseña.

## Instalación

Desde esta carpeta:

```powershell
npm install
Copy-Item .env.example .env
```

Completa `backend/.env` con tus propios valores:

| Variable | Descripción |
| --- | --- |
| `MONGO_URI` | URI privada de MongoDB Atlas o MongoDB. |
| `JWT_SECRET` | Secreto aleatorio para firmar tokens de sesión. |
| `EMAIL_HOST` | Host SMTP del proveedor de correo. |
| `EMAIL_PORT` | Puerto SMTP indicado por el proveedor. |
| `EMAIL_USER` | Usuario SMTP. |
| `EMAIL_PASS` | Contraseña o credencial de aplicación SMTP. |
| `FRONTEND_URL` | Origen permitido por CORS y base de los enlaces de correo. Local: `http://localhost:5173`. |
| `PORT` | Puerto HTTP opcional. Por defecto, `4000`. |

La conexión selecciona la base de datos `AdministradorPacientesVeterinaria`. No añadas secretos reales a `.env.example` ni los publiques en GitHub.

## Ejecución

Desarrollo con reinicio automático:

```powershell
npm run dev
```

Ejecución normal:

```powershell
npm start
```

El servidor conecta con MongoDB antes de escuchar en el puerto configurado. La terminal debe mostrar `MongoDB conectado en: .../AdministradorPacientesVeterinaria` y después `Servidor funcionando en el puerto ...`.

## Rutas principales

- `/api/veterinarios`: registro; `/login`: autenticación; `/confirmar/:token`: confirmación.
- `/api/veterinarios/olvide-password`: solicitud de recuperación.
- `/api/veterinarios/olvide-password/:token`: validar token y establecer contraseña nueva.
- `/api/veterinarios/perfil`: datos del veterinario autenticado.
- `/api/pacientes`: listar y crear pacientes autenticados.
- `/api/pacientes/:id`: consultar, modificar y eliminar un paciente autenticado.

Las rutas protegidas requieren un JWT en la cabecera `Authorization`.

## Notas

- El registro y la recuperación de contraseña dependen del SMTP configurado y de que el usuario pueda recibir el correo.
- Las contraseñas se guardan con hash bcrypt; no se pueden recuperar en texto claro.
- No hay un script de pruebas automatizadas configurado actualmente.
