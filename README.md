# The Clinic — Sistema de Gestión Clínica

Aplicación web fullstack para la gestión de pacientes, especialistas, citas médicas y diagnósticos. Con Next.js 15 y PostgreSQL.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Base de datos | PostgreSQL (Railway) |
| ORM | Prisma 5 |
| Estilos | Tailwind CSS 3 + DaisyUI 3 |
| Autenticación | JWT (jsonwebtoken) + bcryptjs |
| Formularios | Formik + Yup |
| Fetching cliente | SWR |
| Iconos | FontAwesome |

---

## Funcionalidades

- **Autenticación** con JWT (roles: `SUPERADMIN`, `ADMIN`, `USER`), expiración 8 horas
- **Dashboard** con estadísticas en tiempo real (totales de pacientes, especialistas, citas, diagnósticos)
- **Pacientes** — CRUD completo con expediente (tipo de sangre, alergias, padecimiento crónico)
- **Especialistas** — CRUD completo con especialidad médica
- **Citas** — Agendamiento con paciente, especialista, fecha, hora, consultorio y turno. Gestión de estados: `PENDIENTE → CONFIRMADA → COMPLETADA / CANCELADA`
- **Diagnósticos** — Historial por paciente con cálculo automático de IMC, presión arterial y recetario

---

## Modelos de Base de Datos

```
User          → email, password, role (SUPERADMIN | ADMIN | USER)
Paciente      → datos personales + expediente médico básico
Especialista  → datos personales + especialidad
Cita          → Paciente ↔ Especialista, fecha, hora, estado (EstadoCita)
Diagnostico   → Paciente ↔ Especialista?, mediciones, diagnóstico, recetario
```

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/                  # API Routes (REST)
│   │   ├── citas/
│   │   ├── diagnosticos/
│   │   ├── especialistas/
│   │   ├── pacientes/
│   │   ├── stats/
│   │   └── login/
│   ├── login/                # Página de login
│   └── protected/            # Páginas autenticadas (layout con sidebar)
│       ├── dashboard/
│       ├── pacientes/
│       ├── especialistas/
│       └── citas/
├── components/               # Modales y componentes reutilizables
├── context/                  # AppContext (estado global)
├── libs/                     # Cliente Prisma
├── middleware.js              # Protección de rutas con JWT
└── utils/                    # Helpers de autenticación
prisma/
├── schema.prisma
└── seed.js
```

---

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/abecerraguz/nextjs-prisma-postgres-clinica.git
cd nextjs-prisma-postgres-clinica
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz con:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="tu_clave_secreta_aqui"
```

### 4. Ejecutar migraciones y seed

```bash
npx prisma migrate deploy
npx prisma db seed
```

### 5. Iniciar en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---


## API Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/login` | Autenticación, retorna JWT |
| GET / POST | `/api/pacientes` | Listar / crear pacientes |
| GET / PUT / DELETE | `/api/pacientes/[id]` | Obtener / editar / eliminar paciente |
| GET / POST | `/api/especialistas` | Listar / crear especialistas |
| GET / PUT / DELETE | `/api/especialistas/[id]` | Obtener / editar / eliminar especialista |
| GET / POST | `/api/citas` | Listar / crear citas |
| GET / PUT / DELETE | `/api/citas/[id]` | Obtener / editar / eliminar cita |
| GET / POST | `/api/diagnosticos` | Listar / crear diagnósticos |
| GET | `/api/stats` | Estadísticas generales del dashboard |

---

## Despliegue

La base de datos está alojada en [Railway](https://railway.app). Para desplegar la aplicación en Vercel:

1. Conectar el repositorio en [vercel.com](https://vercel.com)
2. Agregar las variables de entorno `DATABASE_URL` y `JWT_SECRET`
3. Vercel detecta Next.js automáticamente y realiza el build

---

## Licencia

MIT

