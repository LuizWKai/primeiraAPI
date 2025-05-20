import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from './routes';

const app = fastify({logger: true})

app.setErrorHandler((error, request, reply) => {
    console.error("Erro capturado:", error);
    reply.code(400).send({error: error.message})
})

const start = async () => {
    // IMPORTANTE: Registrar CORS ANTES das rotas
    await app.register(cors, {
        // Configuração explícita do CORS
        origin: true, // Permite todas as origens em desenvolvimento
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Incluir DELETE explicitamente
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    });
    
    // Registrar rotas após o CORS
    await app.register(routes);

    try {
        // Para evitar conflitos de porta, log explícito
        const port = 3000;
        console.log(`Iniciando servidor na porta ${port}...`);
        await app.listen({port: port, host: '0.0.0.0'});
        console.log(`Servidor rodando na porta ${port}`);
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start();
