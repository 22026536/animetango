import cookieParser from 'cookie-parser';
import cors from "cors";
import express, { json } from 'express';
import proxy from "express-http-proxy";
const app = express();

app.use(cors({
  origin: '*', // Chỉ định frontend được phép
  methods: ['GET', 'POST'], // Cho phép các phương thức GET và POST
}));

app.use(express.urlencoded({ extended: true }));
app.use(json());
app.set('trust proxy', 1);
app.use(cookieParser());

app.use("/user", proxy("https://animeTangoUserService.onrender.com"));
app.use("/anime", proxy("https://animeTangoAnimeService.onrender.com"));
app.use("/useranime", proxy("https://animeTangoUserAnimeService.onrender.com"));
app.use("/admin", proxy("https://animeTangoAdminService.onrender.com"));
app.use("/knn", proxy("https://animeTangoKNNService.onrender.com"));
app.use("/decisiontree", proxy("https://animeTangoDecisionTreeService.onrender.com"));
app.use("/naivebayes", proxy("https://animeTangoNaiveBayesService.onrender.com"));



