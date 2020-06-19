import express from 'express'
import * as path from "path";
import {Request, Response} from "express";
import NewsAPI from 'newsapi';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const port = process.env.PORT || 5000
const api = new NewsAPI(process.env.NEWSAPI_KEY);

app.use(express.static(path.resolve("./") + "/build/app"));

app.get("/", (req: Request, res: Response): void => {
    res.sendFile(path.resolve("./") + "/build/app/index.html");
});

app.get("/headlines", (req: Request, res: Response): void => {

})

app.get("/sources", (req: Request, res: Response): void => {
    const {category, country, language} = req.query;

    api.v2.sources({
        ...category && { category: category },
        ...country  && { country: country },
        ...language && { language: language }
    })
    .then(response => res.send(response))
})

app.listen(port, () => console.log(`Listening on port ${port}`))