# Frontend — Administrador de Pacientes de Veterinaria

Interfaz de usuario creada con React, Vite, React Router, Axios y Tailwind CSS. Permite registrar e iniciar sesión como veterinario, gestionar el perfil y administrar pacientes.

## Requisitos e instalación

Necesitas Node.js 18 o posterior y npm. Desde esta carpeta:

```powershell
npm install
Copy-Item .env.example .env
```

Configura `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

`VITE_BACKEND_URL` es la URL base de la API. Las variables `VITE_*` se incorporan al bundle del navegador: no pongas contraseñas ni secretos en ellas.

## Desarrollo

```powershell
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173). El backend debe estar activo y permitir este origen mediante `FRONTEND_URL`.

## Scripts

```powershell
npm run lint
npm run build
npm run preview
```

`build` genera los archivos de producción en `dist`; `preview` sirve localmente esa compilación. `lint` ejecuta ESLint sobre el frontend.

## Rutas de la aplicación

- `/`: inicio de sesión.
- `/registrar`: registro de veterinario.
- `/olvide-password` y `/olvide-password/:token`: recuperación de contraseña.
- `/confirmar/:id`: confirmación de cuenta.
- `/admin`, `/admin/perfil` y `/admin/cambiar-password`: páginas privadas tras iniciar sesión.
