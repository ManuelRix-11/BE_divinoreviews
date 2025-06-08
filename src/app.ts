import express from "express";
import reviewRoutes from "./routes/ReviewRoutes";

const app = express();
app.use(express.json());

app.use('/api', reviewRoutes);

app.listen(3000, () => {
    console.log("Server avviato sulla 3000, zao!")
})

