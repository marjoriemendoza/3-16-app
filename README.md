# Juan 3:16 — Ruta de Fe (App)

Frontend en **React 19 + Vite + HeroUI/Tailwind** para la plataforma gamificada de aprendizaje bíblico.
Toda la sesión, el contenido y el progreso vienen de la API NestJS de [`../3-16-api`](../3-16-api).

## Requisitos

- Node.js 22 (igual que la API; `.nvmrc` en el backend).
- MySQL con el esquema de la API y el contenido sembrado.

## Cómo ejecutar los dos proyectos

1. **API** (terminal 1):

   ```bash
   cd ../3-16-api
   cp .env.example .env        # completa DB_* y JWT_SECRET
   npm install
   npm run start:dev           # http://localhost:3000/api/v1 (con DB_SYNCHRONIZE=true crea el esquema la primera vez)
   npm run seed                # en otra terminal: carga fases, lecciones, preguntas y logros (idempotente)
   ```

2. **App** (terminal 2):

   ```bash
   npm install
   npm run dev                 # http://localhost:5173
   ```

En desarrollo, `vite.config.js` reenvía `/api` a `http://localhost:3000`, así que el navegador
habla con la API en el mismo origen y no hace falta configurar CORS. El destino se puede cambiar
con `VITE_API_PROXY_TARGET`.

## Variables de entorno

Los dos `.env` ya están creados y enlazados:

- `../3-16-api/.env`: `PORT=3000`, `DB_*` de tu MySQL, `JWT_SECRET` generado y
  `CORS_ORIGINS=http://localhost:5173` (origen de esta app).
- `3-16-app/.env`: `VITE_API_URL=/api/v1` y `VITE_API_PROXY_TARGET=http://localhost:3000`.

Si cambias el puerto de la API, actualiza `VITE_API_PROXY_TARGET` (y `CORS_ORIGINS`). El
`JWT_SECRET` y la contraseña de MySQL nunca se comparten con el frontend.

Copia `.env.example` como `.env` solo si necesitas cambiar valores:

| Variable                 | Uso                                                                 |
| ------------------------ | ------------------------------------------------------------------- |
| `VITE_API_URL`           | URL base de la API. Por defecto `/api/v1` (mismo origen + proxy).    |
| `VITE_API_PROXY_TARGET`  | Destino del proxy de desarrollo. Por defecto `http://localhost:3000`. |

## Cómo se conecta con la base de datos

- `src/lib/api.js` es el único punto de acceso HTTP. Guarda el JWT en `localStorage` y lo envía como
  `Authorization: Bearer`.
- `src/store.jsx` carga la sesión (`GET /auth/me`), el contenido (`GET /content/phases`), el progreso
  (`GET /progress/lessons`), los intentos (`GET /quiz/attempts`) y los logros
  (`GET /achievements`, `GET /achievements/mine`).
- Las lecciones se leen con `GET /content/lessons/:id`. La evaluación se inicia con
  `POST /quiz/attempts/lessons/:id`, cada respuesta se registra con `POST /quiz/attempts/:id/answers`
  y se cierra con `POST /quiz/attempts/:id/finish`; **la nota y el avance los calcula el servidor**.
- Solo las preferencias de interfaz (tema, tamaño de letra, grupo de edad, nombre visible) y la racha
  diaria se guardan en `localStorage`.

## Contenido editorial

La fuente del currículo es [`src/data/phases.js`](src/data/phases.js). El comando `npm run seed` de la
API lo copia a MySQL; después la app **no** lee ese archivo para las lecciones, solo lo usa como
referencia editorial y para textos fijos (grupos de edad, versículo, misiones).

## Producción

```bash
npm run build               # genera dist/
```

Sirve `dist/` detrás del mismo origen que la API o define `VITE_API_URL` con la URL pública de la API
y `CORS_ORIGINS` en el backend.

## Límites conocidos

- Los paneles de **Administración** e **Instructores** siguen siendo de demostración: los borradores y
  estados de revisión son locales, porque la API todavía no expone endpoints de escritura de contenido
  (documentado en el README del backend).
- La racha diaria es local al dispositivo; los puntos y las insignias vienen de la tabla de logros.
