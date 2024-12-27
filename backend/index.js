const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8080 || process.env.PORT;
const Job = require("./models/Job");
const LastJobId = require("./models/LastJobId");

mongoose
  .connect(
    "mongodb+srv://ahmed20051:ahmed2005ahmed@jobs.ha2fi.mongodb.net/?retryWrites=true&w=majority&appName=Jobs"
  )
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((error) => {
    console.log("error with connecting with DB ", error);
  });
app.use(cors());
app.use(express.json());

app.get("/jobs", async (req, res) => {
  try {
    const jobs =
      Object.keys(req.query).length === 0
        ? await Job.find()
        : await Job.find().limit(req.query._limit);
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.get("/jobs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const jobs = await Job.findById(id);
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.post("/jobs", async (req, res) => {
  try {
    const job = req.body;

    let lastJob = await LastJobId.findOne();
    if (!lastJob) {
      lastJob = new LastJobId({ lastId: 0 });
    }
    const newId = lastJob.lastId + 1;

    const newJob = new Job();
    newJob._id = newId;
    newJob.title = job.title;
    newJob.type = job.type;
    newJob.location = job.location;
    newJob.description = job.description;
    newJob.salary = job.salary;
    newJob.company = job.company;
    await newJob.save();

    lastJob.lastId = newId;
    await lastJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
});

app.put("/jobs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const jobUpdates = req.body;

    const updatedJob = await Job.findByIdAndUpdate(id, jobUpdates, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

app.delete("/jobs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const jobs = await Job.findByIdAndDelete(id);
    res.status(200).json("!Deleted Success🥰");
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Failed Delete jobs" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
