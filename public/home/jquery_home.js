$(document).ready(function () {
    $("#success_alert").hide();
    $("#error_alert").hide();
    $("#warning_alert").hide();
    $("#show_all").hide();
    $("#show_payment").click(function () {
            $.ajax({
                url:'/checkadmin',
                method: 'get',
                dataType:'json',
                success:function(response){
                    if(response.msg=="success"){
                        window.location.replace("http://localhost:3000/admin/home/lastmonth#showlast");
                    }
                    else if(response.msg=="user_error"){
                        window.location.replace("http://localhost:3000/users/home/lastmonth#showlast");
                    }
                    else{
                        alert("server Error Occured");
                    }
                }
            })
    });
    if (window.location.hash === "#showall") {
        $("#show_all").hide();
        $("#show_payment").show();
    }
    if (window.location.hash === "#showlast") {
        $("#show_payment").hide();
        $("#show_all").show();
    }
    $("#show_all").click(function () {
        $.ajax({
            url:'/checkadmin',
            method: 'get',
            dataType:'json',
            success:function(response){
                if(response.msg=="success"){
                    window.location.replace("http://localhost:3000/admin/home/alldetails#showall");
                }
                else if(response.msg=="user_error"){
                    window.location.replace("http://localhost:3000/users/home/alldetails#showall");
                }
                else{
                    alert("server Error Occured");
                }
            }
        })
        
    });
    $("#send_message").click(function (e){
        e.preventDefault();
        var contact_name = $("#contact_name").val();
        var contact_email = $("#contact_email").val();
        var contact_phone = $("#contact_phone").val();
        var contact_msg = $("#contact_message").val();
        console.log(contact_name);
        console.log(contact_email);
        console.log(contact_phone);
        console.log(contact_msg);
        if (contact_name == "name" || contact_email == "email" || contact_phone == "phone" || contact_msg == "Your Message") {
            alert("Please Fill In All The Details To Contact The Secretary");
        }
        else {
            $.ajax({
                url: '/checkadmin',
                method: 'get',
                dataType: 'json',
                success: function (response) {
                    if (response.msg == "success") {
                        $.ajax({
                            url: "/admin/home/contact",
                            method: "post",
                            dataType: "json",
                            data: { "name": contact_name, "email": contact_email, "phone": contact_phone, "msg": contact_msg },
                            success: function (response) {
                                if(response.msg=="success"){
                                    alert("Form Submitted Succesfully");
                                    window.location.replace("http://localhost:3000/admin/home/alldetails#showall");
                                }
                                else{
                                    alert("Some Error Occured.Sorry Try Again Later!");
                                }
                            },
                            error: function () {
                                if(response.msg=="error"){
                                    $("#error_alert").show();
                                }
                            }
                        })
                    }
                    else if (response.msg == "user_error") {
                        $.ajax({
                            url: "/user/home/contact",
                            method: "post",
                            dataType: "json",
                            data: { "name": contact_name, "email": contact_email, "phone": contact_phone, "msg": contact_msg },
                            success: function () {
                                alert("Form Submitted Succesfully");
                                window.location.replace("http://localhost:3000/users/home/alldetails#showall");
                            },
                            error: function () {
                                alert("Some Error Occured.Sorry Try Again Later!");
                            }
                        })
                    }
                    else {
                        alert("server Error Occured");
                    }
                },
                error:()=>{
                    alert("server Error Occured");
                }
            })
        }
    });
});