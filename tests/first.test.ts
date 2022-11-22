import supertest from "supertest";
import server from "../src/server";

const api = supertest(server);

describe('Testing API', () => {

    it('Testing GET: /user', async () => {
        const result = await api.get("user");

        console.log(result);
    })
})