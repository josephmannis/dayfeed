import express, { response } from 'express'
import * as path from "path";
import {Request, Response} from "express";
import NewsAPI from 'newsapi';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const port = process.env.PORT || 5000
const api = new NewsAPI(process.env.NEWSAPI_KEY);

app.use(express.static(path.resolve("./") + "/build/app"));

const buildQuery = query => {
    const { q, category, country, sources, language, sortBy, pageSize, page } = query;

    return {
        ...category && { category: category },
        ...country  && { country: country },
        ...language && { language: language },
        ...sources  && { sources: sources },
        ...pageSize && { pageSize: pageSize },
        ...sortBy   && { sortBy: sortBy },
        ...page     && { page: page },
        ...q        && { q: q },
    }
}

app.get("/everything", (req: Request, res: Response): void => {
    api.v2.everything(buildQuery(req.query))
    .then(response => res.send(response))
})

app.get("/top-headlines", (req: Request, res: Response): void => {
    api.v2.topHeadlines(buildQuery(req.query))
    .then(response => res.send(response))
})

app.get("/sources", (req: Request, res: Response): void => {
    api.v2.sources(buildQuery(req.query))
    .then(response => res.send(response))
})

app.get("*", (req: Request, res: Response): void => {
    res.sendFile(path.resolve("./") + "/build/app/index.html");
});

app.listen(port, () => console.log(`Listening on port ${port}`))