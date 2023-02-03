import supertest from "supertest";
import connection from "../src/database/database";
import server from "../src/server";

const api = supertest(server);

beforeAll(async () => {
    await connection.query(`
        DELETE FROM users
    ;`)
})

describe('Testing API', () => {

    it('Testing GET: /user', async () => {
        const result = await api.get("/user");

    //https://jestjs.io/pt-BR/docs/using-matchers
        //jest matchers para primitivos (toBe, toBeGreater, etc)
        expect(result.status).toBe(401);
        //jest matchers para dados mais complexos (toEqual, toHaveLength, etc)
        expect(result.body).toEqual([]);
        //jest matchers para comparação ao objeto recebido (se contém por exemplo)
        expect(result.body).toEqual(expect.arrayContaining([3]));

        //jest matchers para objetos
            //aceita as chaves e valores definidas, mesmo que tenha extras = toEqual exige 100% igual, toMatchObject aceita parcial, mas igual
        expect(result.body).toMatchObject({
            id: 20,
            username: "tiago"
        });
            //quando se exige as chaves e tipos, porém não os valores
        expect(result.body).toEqual({
            id: expect.any(Number),
            username: expect.any(String)
        });

        //jest matchers para array de objetos
            //aceita um array de pelo menos 1 objeto que contenha as chaves e tipos de valores definidos
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    username: expect.any(String)
                })
            ])
        )
    })

    it('Testing POST: /signup', async () => {

        await api.post("/signup").send({
            username: "carlito",
            email: "carlito@copa.com",
            password: "copa22"
        })

        const result = await api.get("/user");
        expect(result.body).toHaveLength(1);
    })
})