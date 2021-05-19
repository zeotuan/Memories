import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './utils/config';

const PORT = config.PORT;
const app = express();
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());


app.listen(PORT, ()=> {

})


