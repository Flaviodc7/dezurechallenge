# Dezure Challenge

Este proyecto es una aplicación de ejemplo para el desafío técnico Dezure.

## Requisitos Previos

- Docker
- Docker Compose

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
POSTGRES_HOST=postgres
PORT=3000
OPENAI_API_KEY=sk-proj-ZTb1DG8D22ru5KoX0i8KT3BlbkFJJUPp1YHDH7Wi3AmYnpjs
```

Nota: la OPENAI_API_KEY proporcionada no funciona porque no tengo un plan de pago

4. Ejecuta el siguiente comando para levantar los contenedores Docker:

```bash
docker-compose up
```

## Uso

## Documentación de API:

