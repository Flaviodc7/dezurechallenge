# Dezure Challenge

Este proyecto es una aplicación de ejemplo para el desafío técnico Dezure.

## Enunciado original

```bash
Fecha de publicación: 13/05/2024

Link:
https://www.linkedin.com/jobs/view/3921116417/?refId=665cfcfd-9fd4-4a0e-93a6-0a75fd9be107&trackingId=WOg%2B1TJlRluMkSiXckAfNw%3D%3D

Backend Developer Challenge


Queremos conocerte mejor!!! 

¿Qué buscamos? 

- Una oportunidad de que compartas eso que sabés hacer mejor. Programar. Que puedas a través de este ejercicio presentarte con tu trabajo y demostrar las ganas que tienes de ser parte. 



¿Qué valoraremos?

- Uso de node.js / Nest.js / Typescript 
- Uso de middlewares, jwt. 
- Uso de postgresql, models. Uso de relaciones y scopes. ORM. 
- Buenas prácticas: KISS, DRY, SOLID. Organización del código. Arquitectura de software 


Consigna:
1. Crear una API REST que comprenda las siguientes funcionalidades: 

- Implementar autenticación utilizando JWT. 
- Un endpoint para gestionar usuarios (crear, actualizar, eliminar). 
- Un endpoint para gestionar productos (crear, actualizar, eliminar). 
- Un endpoint para listar todos los productos. Implementar paginación y filtros en el endpoint de listado de productos. 
- Implementar manejo de errores y validación de datos en los endpoints. 
- Implementar Swagger como herramienta para probar la funcionalidad de los endpoints y facilitar la documentación del proyecto
- Agregar un endpoint para realizar consultas a ChatGPT mediante el uso de Langchain, su objetivo debe ser fruto de tu imaginación. 


2. Responder las siguientes preguntas y añadirlas al README como parte de la documentación: 

- ¿Qué es un middleware y cuál es su utilidad en una aplicación backend? 
- ¿Qué es SQL Injection y cómo puede evitarse? 
- ¿Cuándo es conveniente utilizar SQL Transactions? Dar un ejemplo. 
- Usando async/await: ¿cómo se puede aprovechar el paralelismo? 




Entrega: 

- Un repositorio en GitHub con el desarrollo, incluyendo instrucciones claras para su ejecución (README). 
- Puedes proporcionar un entorno en línea para demostrar el proyecto funcionando, como Heroku o similar, si es posible. 
- Plazo: 4 días.
```

## Requisitos Previos

- Docker
- Docker Compose
- Node.js
- NPM

## Instalación y Ejecución

1. Clona este repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Accede al directorio del proyecto:

```bash
cd dezurechallenge
```

3. Crea un archivo .env en la raíz del proyecto y copia el contenido del archivo .env proporcionado en la sección de configuración.

Puedes utilizar la siguiente que proporciono:

```bash
POSTGRES_DB=dezurechallenge
POSTGRES_USER=admin
POSTGRES_PASSWORD=Admin7*
POSTGRES_PORT=5432
POSTGRES_HOST=postgres # en caso de correrlo sin utilizar "docker-compose up", y con la db de Postgres levantada, se debe utilizar el valor "localhost"
PORT=3000
OPENAI_API_KEY=sk-proj-ZTb1DG8D22ru5KoX0i8KT3BlbkFJJUPp1YHDH7Wi3AmYnpjs
```

Nota: la OPENAI_API_KEY proporcionada no funciona porque no tengo un plan de pago

4. Ejecuta el siguiente comando para levantar los contenedores Docker:

```bash
docker-compose up
```

## Autenticación
Este proyecto utiliza JSON Web Tokens (JWT) para el manejo seguro de rutas. Es importante incluir información específica del usuario dentro del token para ciertas operaciones.

### Enviando el Token de Autorización
Al hacer solicitudes a rutas protegidas, debes incluir un encabezado de Autorización con un JWT. Este token debe incluir un campo general_email, que es utilizado por el middleware para extraer el correo electrónico del usuario para su posterior procesamiento.

Ejemplo de un payload de JWT con `general_email`:

```json
{
  "general_email": "user@example.com",
}
```

Para enviar el token en una solicitud, agrégalo al encabezado de Authorization de la siguiente manera:

```json
Authorization: Bearer your_jwt_token_here
```

Asegúrate de que tu JWT esté correctamente firmado e incluya el valor `general_email` para evitar recibir respuestas `401 Unauthorized` o 403 `Forbidden` del servidor.

Nota: para el uso de pruebas dentro de Swagger el mismo ya tiene inyectado uno provisorio, por lo cual no es necesario añadirlo.

## Documentación de API:

Aquí se proporciona la documentación de la API:

### Productos

#### Crear un producto

Crea un producto

```sh
POST /productos
```

##### Request body
```json
{
  "nombre": "string",
  "descripcion": "string",
  "precio": 1200, // solo acepta números positivos,
  "stock": 3, // solo acepta números positivos y enteros
  "origen": "string",
  "imagen": "https://cdn.pixabay.com/photo/2024/02/26/19/39/monochrome-image-8598798_640.jpg" // solo acepta imagenes en formato URL
}
```

#### Obtener un producto por ID

Obtiene un producto por `ID`

```sh
GET /productos/:idProducto
```

#### Modificar un producto

Modifica un producto

```sh
PUT /productos
```

##### Request body
```json
{
  "id": "string", // requerido
  "nombre": "string", // opcional
  "descripcion": "string", // opcional
  "precio": 1200, // solo acepta números positivos (opcional),
  "stock": 3, // solo acepta números positivos y enteros (opcional)
  "origen": "string", // opcional
  "imagen": "https://cdn.pixabay.com/photo/2024/02/26/19/39/monochrome-image-8598798_640.jpg" // solo acepta imagenes en formato URL (opcional)
}
```

#### Eliminar un producto

Elimina un producto

```sh
DELETE /productos/:idProducto
```

#### Obtener productos filtrados y paginados

Filtra los productos existentes según los parametros que se agreguen, todos son opcionales, aunque hay valores por default, 

```sh
GET /productos?pagina=1&limite=2&nombre=valor&precioMinimo=1&precioMaximo=500&enStock=true
```

Todos los valores son opcionales, por default `pagina` es 1 y `limite` es 10. Para `pagina`, `limite`, `precioMinimo` y `precioMaximo` solo se pueden ingresar valores de tipo number y no se pueden ingresar números negativos. `nombre` es un valor string y `enStock` de tipo boolean

### Usuarios

#### Crear un usuario

Crea un usuario

```sh
POST /usuarios
```

##### Request body
```json
{
  "id": "string",
  "nombre": "string",
  "email": "string",
  "rol": "string
}
```

#### Obtener un usuario por ID

Obtiene un usuario por `ID`

```sh
GET /usuarios/:idUsuario
```

#### Eliminar un usuario

Elimina un usuario

```sh
DELETE /usuarios/:idUsuario
```

#### Modificar un usuario

Modifica un usuario

```sh
PUT /usuarios
```

##### Request body
```json
{
  "id": "string", // requerido
  "nombre": "string", // opcional
  "email": "string", // opcional
  "rol": "string // opcional
}
```