This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Digital Money House
Digital Money House es una aplicación de billetera virtual. Su objetivo es permitir a los usuarios realizar transacciones digitales de manera fácil y segura, gestionando su dinero de forma eficiente a través de una interfaz web. La infraestructura detrás de Digital Money House está pensada para manejar la autenticación de usuarios, el almacenamiento seguro de tokens de sesión, y la interacción con servicios externos.
Esta aplicación funciona de manera eficiente y segura, utilizando tecnologías modernas como Next.js, Redis, y Docker.


## Requisitos
Docker
Docker Compose
Docker Desktop

## Configuración del entorno

Asegúrate de tener un archivo .env.local en la raíz del proyecto con la siguiente configuración:

bash
Copiar código
API_JAVA="https://digitalmoney.digitalhouse.com"
REDIS_URL=redis://default:digitalMoneyPass@redis:6379
REDIS_API_TOKEN=f9b7f9391a60491f9678487bf372d79faae44690e95ed9a6b0ffff3c236dd8bd9c17e0dc3dd8c055dbfa178c9fb2e4da

## Instalación
Antes de levantar el proyecto con Docker, debes instalar las dependencias del proyecto. Ejecuta el siguiente comando en la raíz del proyecto:
bash
Copiar código
npm install

## Cómo levantar el proyecto
Desarrollo
Para levantar el proyecto en un entorno de desarrollo utilizando Docker y Docker Compose, sigue estos pasos:

Asegúrate de tener Docker Desktop abierto.

Corre el siguiente comando para construir y levantar los contenedores:

bash
Copiar código
docker-compose up -d
La aplicación estará corriendo en http://localhost:3000.

Nota: Si haces cambios en el código, es probable que necesites reiniciar los contenedores para que los cambios se reflejen en el navegador. Para hacerlo, utiliza los siguientes comandos:

bash
Copiar código
docker-compose down
docker-compose up -d

Producción
Si quieres levantar el proyecto en un entorno de producción, sigue estos pasos:

Asegúrate de que el archivo docker-compose.yml tenga la configuración adecuada para producción, descomentando la sección correspondiente (ver más abajo).

Construye la imagen de Docker para producción:

bash
Copiar código
docker build -t digitalmoney_app .
Levanta los contenedores en producción:

bash
Copiar código
docker-compose -f docker-compose.prod.yml up -d
La aplicación estará disponible en http://localhost:3000.

## Dockerfile
El Dockerfile utilizado para este proyecto incluye configuraciones tanto para desarrollo como para producción.

## Docker Compose
El archivo docker-compose.yml maneja el entorno de desarrollo y producción, y configura tanto el servicio web como el de Redis.

## Enlaces Adicionales
URL de Jira: https://florenciacasal88fc.atlassian.net/jira/software/projects/DIG/boards/2

URL de Vercel: https://digital-money-house-next.vercel.app

URL de Google Drive: https://drive.google.com/drive/folders/1Pu1nvMuoLLWl66Q-FtkigOnPo94AN6DU?usp=drive_link
