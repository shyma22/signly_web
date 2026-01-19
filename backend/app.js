const quizRoutes = require("./routes/quizRoutes");

app.use(express.json());
app.use("/api", quizRoutes);

