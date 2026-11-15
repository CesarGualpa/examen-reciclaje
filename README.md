# Examen Final - Sistema de Puntos de Reciclaje Urbano

Aplicación full stack para registrar y consultar puntos de reciclaje de una ciudad.

## Tecnologías

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React
- Vite
- JavaScript
- Fetch API
- CSS

## Estructura

- `reciclaje-api`: API REST desarrollada con Spring Boot.
- `reciclaje-web`: interfaz web desarrollada con React.
- `evidencias`: capturas de las pruebas realizadas.

## Modelo

La entidad `PuntoReciclaje` contiene:

- `id`
- `nombre`
- `sector`
- `material`
- `capacidad`

## API REST

### Listar puntos

`GET /api/puntos`

Devuelve todos los puntos de reciclaje almacenados.

### Registrar punto

`POST /api/puntos`

Ejemplo:

```json
{
  "nombre": "EcoEstación Norte",
  "sector": "La Floresta",
  "material": "Plástico",
  "capacidad": 120
}
```

## Funcionalidades

- Registro de puntos desde React.
- Persistencia en PostgreSQL.
- Consulta de puntos mediante API REST.
- Consumo mediante Fetch API.
- Actualización automática del listado después del registro.
- Renderizado mediante componente reutilizable `PuntoCard`.
- Diseño responsive con CSS Grid.

## Ejecución

### Backend

Configurar las variables de entorno:

- `RECICLAJE_DB_USER`
- `RECICLAJE_DB_PASSWORD`

Ejecutar Spring Boot en el puerto `8080`.

### Frontend

Dentro de `reciclaje-web`:

```bash
npm install
npm run dev
```

La aplicación se ejecuta en:

`http://localhost:5173`

## Base de datos

Base PostgreSQL:

`reciclaje_db`

Tabla:

`puntos_reciclaje`

## Seguridad

Las credenciales reales de PostgreSQL no se almacenan en el repositorio. La aplicación utiliza variables de entorno para el usuario y contraseña de la base de datos.