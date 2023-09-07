const express = require("express");
const path = require("path");
import bodyParser from "body-parser";
import cors from "cors";
import customerRouter from "./routes/customer";
import prizeRouter from "./routes/prize";
import luckydrawRouter from "./routes/luckydrawRoutes";

let app = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../public")));
app.use("/customers", customerRouter);
app.use("/prizes", prizeRouter);
app.use("/luckydraw", luckydrawRouter);

app.get("/home", (req: any, res: any) => {
  //res.send('Hello world!');
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export {};
