import { FastifyRequest, FastifyReply } from "fastify";
import { createCustomersService } from "../services/createCustomersService";

class createCustomersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {name, email} = request.body as {name: string, email: string};

        const customerService = new createCustomersService()
        const customer = await customerService.execute({ name, email });

        reply.send(customer)
    }
}

export { createCustomersController }