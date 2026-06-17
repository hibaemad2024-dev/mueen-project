const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "helpnetai",
  charset: "utf8mb4_unicode_ci"
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});
db.query("SET NAMES utf8");
db.query("SET CHARACTER SET utf8");
db.query("SET character_set_connection=utf8");

// إضافة طلب جديد
app.post("/request", upload.single("image"), (req, res) => {

  console.log(req.body);
  console.log(req.file);

  const {
  requestType,
  age,
  location,
  description,
  urgency,
  phone,
  bloodType,
  financialType
} = req.body;

  const image = req.file ? req.file.filename : null;

  const sql =
  "INSERT INTO requests (requestType, age, location, description, urgency, status, image, phone, bloodType, financialType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
 console.log([
  requestType,
  age,
  location,
  description,
  urgency,
  "مفتوح",
  image,
  phone,
  bloodType,
  financialType
]);
  db.query(
  sql,
  [
    requestType,
    age,
    location,
    description,
    urgency,
    "مفتوح",
    image,
    phone,
    bloodType,
    financialType
  ],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "خطأ في قاعدة البيانات"
        });
      }

      console.log("تم حفظ الطلب");

      res.json({
        message: "تم حفظ الطلب بنجاح"
      });

    }
  );

});
// تحديثال حالة الطلب
app.put("/request/:id", (req, res) => {
console.log(req.body);
  const { id } = req.params;

  const {
    volunteerName,
    volunteerPhone
  } = req.body;

  db.query(
    "UPDATE requests SET status = 'قيد المساعدة', volunteerName = ?, volunteerPhone = ? WHERE id = ?",
    [
      volunteerName,
      volunteerPhone,
      id
    ],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "خطأ في قاعدة البيانات"
        });
      }

      res.json({
        message: "تم تحديث الحالة"
      });

    }
  );

});

// إنهاء الحالة
app.put("/request-complete/:id", (req, res) => {

  const { id } = req.params;

  db.query(
    "UPDATE requests SET status = 'مكتمل' WHERE id = ?",
    [id],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "خطأ في قاعدة البيانات"
        });
      }

      res.json({
        message: "تم إنهاء الحالة"
      });

    }
  );

});

// جلب جميع الطلبات
app.get("/requests", (req, res) => {
  db.query(
    "SELECT * FROM requests",
    (err, results) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "خطأ في قاعدة البيانات"
        });
      }

      res.json(results);

    }
  );

});

// الصفحة الرئيسية للـ Backend
app.get("/", (req, res) => {
  res.send("HelpNet AI Backend Running");
});
// تسجيل متبرع بالدم
app.post("/blood-donor", (req, res) => {

  const {
    name,
    phone,
    bloodType,
    location
  } = req.body;

  db.query(
    "INSERT INTO blood_donors (name, phone, bloodType, location) VALUES (?, ?, ?, ?)",
    [
      name,
      phone,
      bloodType,
      location
    ],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "خطأ في قاعدة البيانات"
        });
      }

      res.json({
        message: "تم تسجيل المتبرع بنجاح"
      });

    }
  );

});
// جلب طلبات الدم فقط
app.get("/blood-requests", (req, res) => {
console.log("Blood requests route called");
  db.query(
    "SELECT * FROM requests WHERE requestType = 'متبرع دم' AND status != 'مكتمل'",
    (err, results) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "خطأ في قاعدة البيانات"
        });
      }

      res.json(results);

    }
  );

});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});