import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { createCustomersController } from "./controllers/createrCustumerController";
import { ListCustomersController } from "./controllers/ListCustomersControllers";
import { DeleteCustomerController } from "./controllers/DeleteCustomerControllers";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/teste', async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })

    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new createCustomersController().handle(request, reply)
    })

    fastify.get("/listar", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomersController().handle(request, reply)
    })

    fastify.delete("/customer/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply)
    })
}