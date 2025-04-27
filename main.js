/**
 * Quick Black History Facts
 * Creator: Brittany Gates (https://github.com/BrittanyGates) | (https://www.linkedin.com/in/brittanycgates) |
 * (https://brittbot.com/)
 * About: This web app displays a random Black History Fact every 10 seconds.
 */

const express = require("express");
const app = express();
const port = 3000;
const fs = require("node:fs/promises");
const path = require("node:path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const factsPath = path.join(__dirname, "data", "black_history_facts.txt");
    const facts = await fs.readFile(factsPath, { encoding: "utf8" });
    const factList = facts.split("\n").filter((fact) => fact.trim() !== "");
    const randomFact = factList[Math.floor(Math.random() * factList.length)];
    res.render("pages/index", { black_history_fact: randomFact });
  } catch (error) {
    console.error("Error reading the facts file:", error);
    res.status(500).send("Error loading Quick Black History Facts.");
  }
});

app.listen(port, () => {
  console.log(`Quick Black History Facts app listening on port ${port}`);
});
