import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import axios from 'axios';
import { Configuration, OpenAIApi } from "openai"

// set up Server
const app = express();
env.config()
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
    organization: "org-g25fxNrU7FrwBMy9CHidAw04",
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(configuration);


app.get('/', async (req, res) => {
    console.log("connected")
    //res.send("Hello World");
})


// endpoint for ChatGPT
app.post("/chat", async(req, res) => {
    console.log("I am getting it")
    const {prompt} = req.body;
    console.log(prompt)
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            max_tokens: 512,
            temperature: 0,
            prompt: prompt,
        });
        //res.json({prompt: response.data.choices[0].text})
        res.send(response.data.choices[0].text);
    } catch (error) {
        console.log(error)
        res.send(error).status(400)
    }
    //res.send(response.data.choices[0].text);
})

const port = 8080;
app.listen(port, () => {
    console.log('Example app port: ' + port);
})
