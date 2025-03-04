const ENV = {
    dev: {
        apiUrl: 'http://localhost/api_metrecicla',
    },
    prod: {
        apiUrl: 'https://metrecicla.alwaysdata.net/api',
    },
};

// Detectar el entorno y asignar la URL correspondiente
const currentEnvironment = 'dev'; // Cambiar a 'production' en producción
const apiUrl = ENV[currentEnvironment].apiUrl;
