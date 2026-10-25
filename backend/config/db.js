import mongoose from 'mongoose';

const conectarDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error('Falta configurar MONGO_URI en el archivo .env');
    }

    const db = await mongoose.connect(mongoUri, {
        dbName: 'AdministradorPacientesVeterinaria'
    });
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MongoDB conectado en: ${url}/${db.connection.name}`);
};

export default conectarDB;