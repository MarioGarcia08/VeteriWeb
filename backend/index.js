import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

const dominiosPermitidos = [process.env.FRONTEND_URL]
const corpOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            // el origen del request esta permitido
            callback(null, true)
        }
        else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corpOptions))

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000

const iniciarServidor = async () => {
    try {
        await conectarDB();
        app.listen(PORT, () => {
            console.log(`Servidor funcionando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error(`No se pudo iniciar el servidor: ${error.message}`);
        process.exit(1);
    }
};

iniciarServidor();