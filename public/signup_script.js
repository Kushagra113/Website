
function formValidation() {

  var uid = document.getElementById("username");
  var passid = document.getElementById("passid");
  var retype_pass = document.getElementById("retype_pass");
  var email = document.getElementById("email");
  var w_phone = document.getElementById("work_phone");
  if (ValidateEmail(email)) {
    if (passid_validation(passid, 7, 12)) {
      if (retype_passid_validation(passid, retype_pass)) {
        if (userid_validation(uid, 2, 20)) {
              alert("Your Form has been submitted");
              return true;
        }
      }
    }
  }
  return false;
}

function userid_validation(uid, mx, my) {
  var uid_len = uid.value.length;
  if (uid_len == 0 || uid_len >= my || uid_len < mx) {
    alert("Name/Surname should not be empty / length be between " + mx + " to " + my);
    uid.focus();
    return false;
  }
  return true;
}

function passid_validation(passid, mx, my) {
  var passid_len = passid.value.length;
  if (passid_len == 0 || passid_len >= my || passid_len < mx) {
    alert("Password should not be empty / length be between " + mx + " to " + my);
    passid.focus();
    return false;
  }
  return true;
}

function alphanumeric(uadd) {
  var letters = /^[0-9a-zA-Z]+$/;
  if (uadd.value.match(letters)) {
    return true;
  } else {
    alert('User address must have alphanumeric characters only');
    uadd.focus();
    return false;
  }
}

function ValidateEmail(uemail) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (uemail.value.match(mailformat)) {
    return true;
  } else {
    alert("You have entered an invalid email address!");
    uemail.focus();
    return false;
  }
}

function retype_passid_validation(passid, retype_pass) {
  if (passid.value == retype_pass.value) {
    return true;
  } else {
    alert("Password And Retype Password Dont Match");
    retype_pass.focus();
    return false;
  }
}

function allLetter(check) {
  var letters = /^[A-Za-z]+$/;
  if (check.value.match(letters)) {
    return true;
  } else {
    alert('Job Title / Company Name / Address / City Must have alphabet characters only');
    check.focus();
    return false;
  }
}

function allnumeric(allnumbers) {
  var numbers = /^[0-9]+$/;
  if (allnumbers.value.match(numbers)) {
    return true;
  } else {
    alert(' Work Phone Must have numeric characters only');
    allnumbers.focus();
    return false;
  }
}

function zip_postal(zip_code) {
  var numbers = /^[0-9]+$/;
  if (zip_code.value.match(numbers) && zip_code.value.length == 6) {
    return true;
  } else {
    alert('Zip Code Must have numeric characters only and Length as 6');
    zip_code.focus();
    return false;
  }
}

function dropdown(option) {
  var index = option.options[option.selectedIndex].value
  if (index == 0) {
    alert("Please Select A Option For State/Province");
    option.focus();
    return false;
  } else {
    return true;
  }
}
