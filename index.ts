import express from 'express'
import * as path from "path";
import {Request, Response} from "express";

const app = express()
const port = 8080

app.use(express.static(path.resolve("./") + "/build/app"));

app.get("/", (req: Request, res: Response): void => {
    res.sendFile(path.resolve("./") + "/build/app/index.html");
});

app.listen(port, () => console.log(`Listening on port ${port}`))