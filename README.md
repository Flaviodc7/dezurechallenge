# Dezure Challenge

Este proyecto es una aplicación de ejemplo para el desafío técnico Dezure.

## Enunciado original

Fecha de publicación: 13/05/2024

Link:
```bash
https://www.linkedin.com/jobs/view/3921116417/?refId=665cfcfd-9fd4-4a0e-93a6-0a75fd9be107&trackingId=WOg%2B1TJlRluMkSiXckAfNw%3D%3D
```

```bash
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

5. Se pueden realizar pruebas dentro de Swagger, el mismo ya tiene inyectado un JWT provisorio, por lo cual no es necesario añadirlo, el mismo se encuentra en la ruta `/docs`. 


## Autenticación
Este proyecto utiliza JSON Web Tokens (JWT) para el manejo seguro de rutas. Es importante incluir información específica del usuario dentro del token para ciertas operaciones.

### Enviando el Token de Autorización
Al hacer solicitudes a rutas protegidas, debes incluir un Header de Autorización con un JWT. Este token debe incluir un campo general_email, que es utilizado por el middleware para extraer el correo electrónico del usuario para su posterior procesamiento.

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

Asegúrate de que tu JWT esté correctamente firmado e incluya el valor `general_email` para evitar recibir respuestas `401 Unauthorized` o `403 Forbidden` del servidor.

## Endpoints

Estos son los endpoints de la API (si bien aquí los detallo, se pueden ver también usando Swagger en `/docs`):

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
  "rol": "string"
}
```

#### Obtener todos los usuarios

Obtiene todos los usuarios

```sh
GET /usuarios
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
  "rol": "string" // opcional
}
```

### Prompt Langchain

#### Enviar Prompt a ChatGPT mediante Langchain

Envía un prompt a ChatGPT

Esta funcionalidad no la he probado adecuadamente, por un lado por la falta de una API KEY de OpenAI, y por otro lado porque no supe bien que funcionalidad ponerle, aunque dejé algo sencillo para que ChatGPT responda de forma graciosa.

```sh
POST /prompts
```

##### Request body
```json
{
  "prompt": "string",
}
```

## Respuestas a las preguntas

Estos son los respuestas a las preguntas realizadas:

### ¿Qué es un middleware y cuál es su utilidad en una aplicación backend?
En palabras sencillas, un middleware aplicado al Backend son funcionalidades que se aplican sobre un Request previo a realizar la acción final deseada, puede ser para verificación de datos, manejo de errores en el body u otro tipo de uso. Por ejemplo, en el caso de este challenge se utilizan DTO's que sirven como verificación de los datos enviados en el Body y los params del Request, por un lado para verificar los datos y por el otro para verificar mediante el uso de JWT que el Token sea válido, esto puede servir para propositos de autenticación, como bien indica el nombre dentro de la aplicación.


### ¿Qué es SQL Injection y cómo puede evitarse?
El SQL Injection es (como bien dice el nombre), una inyección para utilizar información dentro de una base de datos, generalmente con fines maliciosos, como realizar queries que terminen siendo perjudiciales, resultando en el robo de datos o incluso en el borrado de los mismos. Para evitar tal cosa, en este caso se utiliza TypeORM que previene la inyección de este código en base de datos, ya que brinda encapsulamiento para los métodos utilizados.

### ¿Cuándo es conveniente utilizar SQL Transactions? Dar un ejemplo.
No me ha tocado utilizarlo en mi caso, pero por lo que tengo entendido son una serie de operaciones en base de datos que se ejecutan de forma paralela que tienen relación entre si mediante un único proceso, es útil para mantener el ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad). Principalmente si alguno de los procesos falla se revierte el general. Por ejemplo, si se realiza una transacción de dinero y en el proceso una de las partes tiene alguna falla (el emisor o el receptor), se revierte el proceso para evitar inconsistencias, en ese caso con los montos, ya que se duplicaría el saldo teniendo en cuenta que exista acreditado en ambas cuentas.


### Usando async/await: ¿cómo se puede aprovechar el paralelismo?
Me ha tocado utilizar esto pero no para cuestiones relacionadas a bases de datos relacionales. Aunque si por ejemplo he llevado a cabo un proyecto de web scraping que mediante el uso del Promise.all, corría 3 procesos asincronos de forma paralela para hacer web scraping de diferentes retailers. En principio intuyo que el principio es el mismo, pero al finalizar los procesos se verifica que todos hayan finalizado satisfactoriamente para dar lugar o no a un rollback.