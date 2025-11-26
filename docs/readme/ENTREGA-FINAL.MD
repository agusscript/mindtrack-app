# Entrega Final

- Grupo 19: Lara Alegre y Agustin Sanchez

## Secciones

### Home

<img src="../../assets/screenshots/Home.jpeg" width="310" />

### Registro

- Uso de nuestra API local para manejar toda la autenticación.
- Todos los inputs tienen validaciones. 
- Se corrigieron detalles en la muestra de mensajes de error de los inputs. 
- Se agregó el botón para poder ver/ocultar la contraseña.

<img src="../../assets/screenshots/register.jpeg" width="310" />

### Inicio de sesión

- Lo mismo que en la sección de registro.

<img src="../../assets/screenshots/login.jpeg" width="310" />

### Dashboard

- Se cambió el aspecto de las cards de las secciones (6 en total). 
- Se agregó el saludo con el nombre del usuario autenticado.

<img src="../../assets/screenshots/dashboard-1.jpeg" width="310" />
<img src="../../assets/screenshots/dashboard-2.jpeg" width="310" />

### Lista de tareas

- Persistencia usando nuestra base de datos MySQL local.
- Acciones de crear, editar y eliminar usando nuestra API local.
- Modal de confirmación antes de eliminar items.

<img src="../../assets/screenshots/task-main.jpeg" width="310" />
<img src="../../assets/screenshots/task-eliminar-accion.jpeg" width="310" />
<img src="../../assets/screenshots/task-eliminar.jpeg" width="310" />

### Frase motivacional

- Consumo de API externa para traer diferentes frases diarias.
- Consumo de API externa para traducir el texto de las frases.
- Manejo de loading cuando se está consultando la data.
- Manejo de error en caso de fallos al consultar los datos.
- Funcionalidad extra: posibilidad de compartir la card de la frase.

<img src="../../assets/screenshots/frase-loading.jpeg" width="310" />
<img src="../../assets/screenshots/frase-main.jpeg" width="310" />
<img src="../../assets/screenshots/frase-compartir.jpeg" width="310" />

### Habitos

- Persistencia usando nuestra base de datos MySQL local.
- Acciones de crear, editar y eliminar usando nuestra API local.
- Posibilidad de configurar recordatorios diarios usando expo-notifications. La hora del recordatorio se persiste en nuestra base de datos local.

<img src="../../assets/screenshots/habit-main.jpeg" width="310" />
<img src="../../assets/screenshots/habit-recordatorio-setup.jpeg" width="310" />
<img src="../../assets/screenshots/habit-setup-hora.jpeg" width="310" />

### Sensor de Luz

- Uso de servicio del dispositivo: sensor de luz con expo-sensors.
- Manjeo de error en caso de que el dispositivo no tenga el sensor.

<img src="../../assets/screenshots/sensor-data.jpeg" width="310" />

### Clima

- Uso de servicio del dispositivo: ubicación con expo-location.
- Consumo de API externa para traer los datos del clima.
- Si el usuario no permite el acceso a su ubicación, se mostrará el clima de Buenos Aires por default.

<img src="../../assets/screenshots/clima-data.jpeg" width="310" />

### Horoscopo

- Consumo de API externa para traer los diferentes horoscopos diarios.
- Consumo de API externa para traducir el texto de los horoscopos.
- Manejo de loading cuando se está consultando la data.

<img src="../../assets/screenshots/ui-horoscopo.jpeg" width="310" />
<img src="../../assets/screenshots/loading-horoscopo.jpeg" width="310" />
<img src="../../assets/screenshots/data-horoscopo.jpeg" width="310" />
