import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './utils/config.js';
import postRoutes from './routes/post.js';

const PORT = config.PORT;
const mongoUri = config.MONGO_URI;
const app = express();
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use('/api/posts',postRoutes)

mongoose.connect(mongoUri,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log(`connected to mongoose at ${mongoUri}`);
        app.listen(PORT, ()=> {
            console.log(`server is running on PORT ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    });
mongoose.set('debug', true);
mongoose.set('useFindAndModify',false);




