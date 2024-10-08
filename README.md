This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Digital Money
Este es un proyecto basado en Next.js, utilizando Docker para el desarrollo y Redis para el manejo de sesiones y autenticación de usuarios. El proyecto se conecta con una API externa para manejar el registro y autenticación de usuarios.

Requisitos
Docker
Docker Compose
Docker Desktop
Configuración del entorno
Asegúrate de tener un archivo .env.local en la raíz del proyecto con la siguiente configuración:

bash
Copiar código
API_JAVA="https://digitalmoney.digitalhouse.com"
REDIS_URL=redis://default:digitalMoneyPass@redis:6379
REDIS_API_TOKEN=f9b7f9391a60491f9678487bf372d79faae44690e95ed9a6b0ffff3c236dd8bd9c17e0dc3dd8c055dbfa178c9fb2e4da
Instalación
Antes de levantar el proyecto con Docker, debes instalar las dependencias del proyecto. Ejecuta el siguiente comando en la raíz del proyecto:

bash
Copiar código
npm install
Cómo levantar el proyecto
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

Dockerfile
El Dockerfile utilizado para este proyecto incluye configuraciones tanto para desarrollo como para producción.

Docker Compose
El archivo docker-compose.yml maneja el entorno de desarrollo y producción, y configura tanto el servicio web como el de Redis.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

URL de Trello: https://trello.com/b/2eHn3QUM/digital-money

URL Figma sprint 1: https://www.figma.com/design/97PL2osKArAZLEvUjjtEt5/FRONT---SPRINT-1--Digital-Money-House?node-id=1316-6225&t=RucWLNVQJeHNuOEG-0

URL Figma sprint 2: https://www.figma.com/design/hrzb9zdwHR7jNphUuNiM1q/FRONT---SPRINT-2--Digital-Money-House?node-id=1316-6225&t=G48LaDcv6Io11IoB-0

URL Figma sprint 3: https://www.figma.com/design/qkyOYyOi1RCw6lT43ICUM7/FRONT---SPRINT-3--Digital-Money-House?node-id=1316-6225&t=ihYpzErokQ7u9Kqy-0

URL Figma sprint 4: https://www.figma.com/design/ZI7xSzYquZc6CowjMGb8wj/FRONT---SPRINT-4--Digital-Money-House?node-id=1316-6225&t=6gPQHAtw9F0tKItW-0

Desktop: 1440 x 764
Tablet: 834 x 1194
Mobile: 390 x 905