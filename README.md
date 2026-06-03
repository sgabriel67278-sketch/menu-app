# Churrasquería "El Parrillero"

Proyecto Final de Programación Web I (SIS-0300)

Universidad Privada Domingo Savio
Facultad de Ingeniería
Carrera de Ingeniería de Sistemas


---

## Descripción

Churrasquería "El Parrillero" es una aplicación web desarrollada con React, TypeScript, Tailwind CSS y Supabase.

El sistema permite visualizar el menú de platos de una churrasquería, consultar información detallada de cada plato y administrar el contenido mediante un panel protegido con autenticación.

---

## Funcionalidades

### Usuarios

- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Acceso a rutas protegidas

### Menú

- Visualización de platos
- Búsqueda de platos
- Filtrado por categorías
- Visualización de detalles de cada plato

### Administración de Categorías

- Crear categorías
- Listar categorías
- Editar categorías
- Eliminar categorías

### Administración de Platos

- Crear platos
- Listar platos
- Editar platos
- Eliminar platos
- Visualizar detalle de platos

---

## Tecnologías Utilizadas

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend

- Supabase

### Base de Datos

- PostgreSQL (Supabase)

### Autenticación

- Supabase Auth

---

## Estructura del Proyecto

```text
src
│
├── components
│   ├── CategoriaCard.tsx
│   ├── CategoriaForm.tsx
│   ├── CategoriaList.tsx
│   ├── Header.tsx
│   ├── Navbar.tsx
│   ├── PlatoCard.tsx
│   ├── PlatoDetail.tsx
│   ├── PlatoForm.tsx
│   ├── PlatoList.tsx
│   └── ProtectedRoute.tsx
│
├── hooks
│   ├── useAuth.ts
│   ├── useCategoria.ts
│   └── usePlato.ts
│
├── lib
│   └── supabaseClient.ts
│
├── pages
│   ├── Admin.tsx
│   ├── CategoriasAdmin.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Menu.tsx
│   └── PlatosAdmin.tsx
│
│
├── types
│   ├── Categoria.ts
│   └── Plato.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Modelo de Datos

### Tabla: categorias

| Campo | Tipo |
|---------|---------|
| id | integer |
| nombre | text |
| descripcion | text |
| imagen | text |

### Tabla: platos

| Campo | Tipo |
|---------|---------|
| id | integer |
| nombre | text |
| descripcion | text |
| precio | numeric |
| imagen | text |
| categoria_id | integer |

### Relación

- Una categoría puede tener muchos platos.
- Un plato pertenece a una sola categoría.

```text
categorias
     │
     │ 1
     │
     └─────── N
              │
              │
           platos
```

---

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://qrnhrrlufjhsqvyewsem.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_wiqDtHGL6wrMZbskg4-UQg_QFIB90oh
```

---

## Instalación

### 1. Clonar repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Ingresar al proyecto

```bash
cd nombre-del-proyecto
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Crear archivo:

```env
.env
```

y agregar:

```env
VITE_SUPABASE_URL=https://qrnhrrlufjhsqvyewsem.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_wiqDtHGL6wrMZbskg4-UQg_QFIB90oh
```

### 5. Ejecutar proyecto

```bash
npm run dev
```

---

## Configuración de Seguridad

El proyecto utiliza:

- Supabase Auth
- Row Level Security (RLS)
- Rutas protegidas mediante ProtectedRoute
- admin: admin@gmail.com
- password: 123456

---

## Integrantes

- Gabriel Elvis Solano Cruz
- Paul Angel SandovalOrtega
- Josue Samuel Vargas Gutierrez

---

## Materia

Programación Web I (SIS-0300)

Universidad Privada Domingo Savio

Gestión 2026
