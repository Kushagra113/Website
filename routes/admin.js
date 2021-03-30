// Requiring Necessary Modules
const express = require("express");
const router = express.Router();
const payments = require("../config/payment_details_insert");
const complaints = require("../config/crud");
const auth_function = require("../config/auth");
const contact_function = require("../config/contact_details");
const getalldata = require("../config/getalldata");
var weatherdata ;

// Fetching Weather DATA (Request To Weater API)
require("../api/weather_api")().then((data)=>{
  weatherdata=data[0];
  url=data[1]
});

// Admin Home Page
router.get("/home/alldetails", auth_function.ensureAdmin, (req, res) => {
  payments.alldetails(req.user.id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(
        "Error Displaying Home Page. Please Try Again Later! Sorry For the Inconvenience Caused"
      );
    } else {
      complaints.getcomplaint_not_resolved((err, result_c) => {
        complaint_number = result_c.length;
        complaints.getallresolve((err, result_r) => {
          resolve_number = result_r.length;
           if (result.length > 0) {
            res.render("home", {
              user: req.user,
              payment: result,
              c_no: complaint_number,
              r_no: resolve_number,
              p_no: result.length,
              weather:weatherdata,
              imageurl:url
            });
          } else {
            res.render("home", {
              user: req.user,
              c_no: complaint_number,
              r_no: resolve_number,
              p_no: result.length,
              weather:weatherdata,
              imageurl:url
            });
          }
        });
      });
    }
  });
});

// Last Month Details Being Printed On home Page
router.get("/home/lastmonth", auth_function.ensureAdmin, (req, res) => {
  payments.lastmonth(req.user.id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(
        "Error Displaying Home Page. Please Try Again Later! Sorry For the Inconvenience Caused"
      );
    } else {
      complaints.getcomplaint_not_resolved((err, result_c) => {
        complaint_number = result_c.length;
        complaints.getallresolve((err, result_r) => {
          resolve_number = result_r.length;
          if (result.length > 0) {
            res.render("home", {
              user: req.user,
              payment: result,
              c_no: complaint_number,
              r_no: resolve_number,
              p_no: result.length,
              weather:weatherdata,
              imageurl:url
            });
          } else {
            res.render("home", {
              user: req.user,
              c_no: complaint_number,
              r_no: resolve_number,
              p_no: result.length,
              weather:weatherdata,
              imageurl:url
            });
          }
        });
      });
    }
  });
});

router.post("/home/contact", auth_function.ensureAdmin, (req, res) => {
  const { name, email, phone, msg } = req.body;
  id = req.user.id;
  contact_function.insertcontact_details(
    id,
    name,
    email,
    phone,
    msg,
    (err, result) => {
      if (err) {
        res.json({ msg: "error" });
      } else {
        res.json({ msg: "success" });
      }
    }
  );
});

// Admin Complaint Page
router.get("/complaint", auth_function.ensureAdmin, (req, res) => {
  res.render("complaint", {
    user: req.user,
  });
});

// Admin Payment Page
router.get("/payment", auth_function.ensureAdmin, (req, res) => {
  res.render("payment", {
    user: req.user,
  });
});

// Admin About Us Page
router.get("/aboutus", auth_function.ensureAdmin, (req, res) => {
  res.render("aboutus", {
    user: req.user,
  });
});

// Adding Payment Details to the database
router.post("/payment", auth_function.ensureAdmin, (req, res) => {
  const {
    name,
    cardnumber,
    expirationdate,
    securitycode,
    amount,
    reason,
  } = req.body;
  const id = req.user.id;
  payments.addpaymentdetails(
    id,
    name,
    cardnumber,
    expirationdate,
    securitycode,
    amount,
    reason,
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ msg: "error" });
      } else {
        res.json({ msg: "success_insert",msg1:result });
      }
    }
  );
});

// Printing All The Complaints
router.get("/complaint/getdata", auth_function.ensureAdmin, (req, res) => {
  complaints.getcomplaint((err, result) => {
    if (err) {
      res.json({ msg: "error" });
    } else {
      res.json({ msg: "success", data: result });
    }
  });
});

// Admin Deleting Permissions
router.delete(
  "/complaint/removecomplaint",
  auth_function.ensureAdmin,
  (req, res) => {
    complaints.removecomplaint(
      req.body.id,
      req.body.complaint,
      (err, result) => {
        if (err) {
          console.log(err);
          res.json({ msg: "error" });
        } else {
          res.json({ msg: "success" });
        }
      }
    );
  }
);

router.post("/sendresolve", auth_function.ensureAdmin, (req, res) => {
  const { id, complaint, resolved } = req.body;
  complaints.setresolve(id, complaint, resolved, (err, result) => {
    if (err) {
      res.json({ msg: "error" });
    } else {
      res.json({ msg: "success", data: result });
    }
  });
});

router.get("/getresolve", auth_function.ensureAdmin, (req, res) => {
  complaints.getresolve((err, result) => {
    if (err) {
      res.json({ msg: "error" });
    } else {
      res.json({ msg: "success", data: result });
    }
  });
});

router.post("/removeresolve", (req, res) => {
  const { id, complaint } = req.body;
  complaints.removeresolve(id, complaint, (err, result) => {
    if (err) {
      res.json({ msg: "error" });
    } else {
      res.json({ msg: "success" });
    }
  });
});

router.get("/members", auth_function.ensureAdmin, (req, res) => {
  getalldata.getdata((err, result) => {
    if (err) {
      throw err;
    } else {
      res.render("members", {
        user: req.user,
        result: result,
      });
    }
  });
});

router.post("/getiddata", auth_function.ensureAdmin, (req, res) => {
  const id = req.body.id;
  getalldata.getiddata(id, (err, result) => {
    if (err) {
      res.json({ msg: "error" });
    } else {
      res.json({ msg: "success", data: result });
    }
  });
});
router.get("/game", auth_function.ensureAdmin, (req, res) => {
  res.render("game");
});
module.exports = router;
