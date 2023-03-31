import express from "express";
import bcrypt from "bcrypt";
import Schools from "../models/Schools";

const SchoolsRouter = express.Router();

SchoolsRouter.get("/", async (_req, res) => {
  try {
    const schools = await Schools.find();
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

SchoolsRouter.get("/:id", async (req, res) => {
  try {
    const school = await Schools.findById(req.params.id);
    res.status(200).json(school);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

SchoolsRouter.post("/", async (req, res) => {
  try {
    if (
      !req.body.schoolName ||
      !req.body.phone ||
      !req.body.email ||
      !req.body.address ||
      !req.body.password ||
      !req.body.logo
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check if email already exists
    const oldSchool = await Schools.find({ email: req.body.email });

    if (oldSchool) {
      console.log(oldSchool);
      return res
        .status(400)
        .json({ message: "School already exists, Please login" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const school = new Schools({
      schoolName: req.body.schoolName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      password: hashedPassword,
      logo: req.body.logo,
    });
    const newSchool = await school.save();
    res.status(201).json(newSchool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

SchoolsRouter.put("/:id", async (req, res) => {
  try {
    const school = await Schools.findById(req.params.id);

    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    Schools.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          schoolName: req.body.schoolName,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address,
          logo: req.body.logo,
        },
      },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(500).json({ message: err.message });
        }
        res.status(200).json(doc);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

SchoolsRouter.put("/:id/change_password", async (req, res) => {
  try {
    const school = await Schools.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    Schools.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(500).json({ message: err.message });
        }
        res.status(200).json(doc);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

SchoolsRouter.delete("/:id", async (req, res) => {
  try {
    const school = await Schools.findById(req.params.id);
    res.status(200).json(school);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default SchoolsRouter;
