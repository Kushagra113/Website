function formValidation() {

    var uid2 = document.getElementById("username");
    var passid = document.getElementById("passid");
    if (userid_validation(uid2)) {
        if (passid_validation(passid)) {
            alert("Your Form has been submitted");
            return true;
        }
    }
    return false;
}
function userid_validation(uid) {
    var uid_len = uid.value.length;
    if (uid_len == 0) {
        alert("Username Should Not Be Empty");
        uid.focus();
        return false;
    }
    return true;
}
function passid_validation(passid) {
    var passid_len = passid.value.length;
    if (passid_len == 0) {
        alert("Password should not be empty");
        passid.focus();
        return false;
    }
    if (passid_len <= 5) {
        alert("Password should be greater than 5 values");
        passid.focus();
        return false;
    }
    return true;
}
