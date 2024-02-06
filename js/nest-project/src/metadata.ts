/* eslint-disable */
export default async () => {
    const t = {
        ["./app.response"]: await import("./app.response")
    };
    return { "@nestjs/swagger": { "models": [[import("./app.response"), { "User": { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, age: { required: true, type: () => Number } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { description: "123", type: String }, "getUser": { type: t["./app.response"].User } } }]] } };
};