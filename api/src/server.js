import express from "express";

const server = express();
const port = 3030;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded forms

server.get("/", (req, res) => {
  res.write("Works");
  res.end();
});

server.listen(3030, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
