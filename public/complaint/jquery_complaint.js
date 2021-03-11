$(document).ready(function () {

    getData();

    $("#add").click(function () {
        // var name=$("#name").val();
        var c = $("#complaint_text").val();
        // alert(name);
        if (c === "") {
            alert("Enter Some Complaint to Add it");
        }
        else {
            $.ajax({
                URL: '/users/complaint',
                method: 'POST',
                dataType: 'json',
                data: { 'complaint': c },
                success: function (response) {
                    if (response.msg == 'success') {
                        // alert("Name Added In the Database");
                        getData();

                    }
                    else if (response.msg == "same_complaint") {
                        alert("Complaint Already Added")
                    }
                    else {
                        alert("Some Error Occured Try Again");
                    }
                },
                error: function () {
                    // console.log(error);
                    alert('server error occured');
                }
            });
        }
    });
    $(document).on('click', 'button.del', function () {
        var id = $(this).parent().find('button.del').val();
        var complaint = [];
        complaint.push($(this).parent().parent().find(".complaint_text").html());
        var result;
        $.ajax({
            url: '/checkadmin',
            method: 'get',
            dataType: 'json',
            success: function (response) {
                if (response.msg == "success") {
                    $.ajax({
                        url: '/admin/complaint/removecomplaint',
                        method: 'delete',
                        dataType: 'json',
                        data: { 'id': id, complaint: complaint[0] },
                        success: function (response) {
                            if (response.msg == 'success') {
                                alert('data deleted');
                                getData();
                            }
                            else if (response.msg == "user_error") {
                                alert("You Cannot Delete Other Users Complaints Sorry!");
                            }
                            else if (response.msg == "workedfine") {
                                alert("Working Fine");
                            }
                            else {
                                alert('data did not get deleted');
                            }
                        },
                        error: function () {
                            alert('server error')
                        }
                    });
                    $(document).find(".edit").hide();
                }
                else if (response.msg == "user_error") {
                    $.ajax({
                        url: '/users/complaint/removecomplaint',
                        method: 'delete',
                        dataType: 'json',
                        data: { 'id': id, complaint: complaint[0] },
                        success: function (response) {
                            if (response.msg == 'success') {
                                alert('data deleted');
                                getData();

                            }
                            else if (response.msg == "user_error") {
                                alert("You Cannot Delete Other Users Complaints Sorry!");
                            }
                            else if (response.msg == "workedfine") {
                                alert("Working Fine");
                            }
                            else {
                                alert('data did not get deleted');
                            }
                        },
                        error: function () {
                            alert('server error')
                        }
                    });
                }
                else {
                    alert("server Error Occured");
                }
            }
        })
    });
    $(document).on('click', 'button.edit', function (e) {
        var request_sent = false;
        if ($(".edit_block").is(":visible")) {
            alert("First Edit the Following Complaint");
        }
        else if (request_sent) {
            alert("True");
        }
        else {
            request_sent = true;
            var id = $(this).parent().find('button.edit').val();
            complaint = ($(this).parent().parent().find(".complaint_text").html());
            $(".edit_block").show();
            $(document).one("click", "#done", function () {
                var new_complaint = $(document).find("#edit_complaint").val();
                if (new_complaint === undefined) {
                    alert("Please Enter Complaint to Edit or Reload the page");
                }
                else {
                    $.ajax({
                        url: '/users/complaint/editcomplaint',
                        method: 'post',
                        dataType: 'json',
                        data: { 'id': id, complaint: complaint, newComplaint: new_complaint },
                        success: function (response) {
                            if (response.msg == 'success') {
                                console.log("Msg" + response.msg);
                                alert('data successfully Edited');
                                getData();

                            }
                            else if (response.msg == "user_error") {
                                alert("You Cannot Edit Other Users Complaints Sorry!");
                            }
                            else if (response.msg == "same_complaint") {
                                alert("Complaint Already Added");
                            }
                            else {
                                alert('Editing was not Successfull Please Try Again');
                            }
                        },
                        error: function () {
                            alert('server error')
                        }
                    });
                    $(".edit_block").hide();
                }
            });
            request_sent = false;
        }
        // }
    });
    $(document).on('click', 'button.resolved', function (e) {
        if ($(this).parent().find(".trow").is(":visible")) {
            var id = $(this).val()
            var complaint_text = $(this).parent().parent().find(".complaint_text").html();
            $(this).parent().parent().css("background-color", "");
            $(this).parent().find(".trow").remove();
            $.ajax({
                url: "/admin/removeresolve",
                method: "POST",
                dataType: "JSON",
                data: { "id": id, complaint: complaint_text },
                success: function () {
                },
                error: function () {
                    alert("Server Error");
                }
            })
        }
        else {
            $(this).parent().parent().css("background-color", "lightgreen");
            $(this).after("<span class='trow'></span>");
            var id = $(this).val();
            var complaint = [];
            complaint.push($(this).parent().parent().find(".complaint_text").html());
            $.ajax({
                url: "/admin/sendresolve",
                method: "POST",
                dataType: "JSON",
                data: { "id": id, complaint: complaint[0], resolved: 1 },
                success: function (response) {
                },
                error: function () {
                    alert("Server Error");
                }
            })
        }
    })
    function getData() {
        $.ajax({
            url: '/checkadmin',
            method: 'get',
            dataType: 'json',
            success: function (response) {
                if (response.msg == "success") {
                    $.ajax({
                        url: '/admin/complaint/getdata',
                        method: 'GET',
                        dataType: 'json',
                        success: function (response) {
                            if (response.msg == "success") {
                                $('tr.taskrow').remove()
                                if (response.data == undefined || response.data == null || response.data == '') {
                                    alert("No Complaints");
                                }
                                else {
                                    $.each(response.data, function (index, data) {
                                        var url = url + data.id;
                                        index += 1;
                                        $('tbody').append("<tr class='taskrow'><td class='name'>" + data.name + "</td><td class='complaint_text'>" + data.complaint + "</td><td>" + "<button class='edit' value='" + data.id + "'>Edit</button>" + "<button class='del'  value='" + data.id + "'>Delete</button>" + "<button class='resolved' value='" + data.id + "'>Resolved</button>" + "</td></tr>");
                                    });
                                    $(document).find(".edit").hide();
                                    getresolve();
                                }
                            }
                            else {
                                alert("Some Error Occured");
                            }
                        },
                        error: function (response) {
                            alert('server error');
                        }
                    })

                }
                else if (response.msg == "user_error") {
                    $.ajax({
                        url: '/users/complaint/getdata',
                        method: 'GET',
                        dataType: 'json',
                        success: function (response) {
                            if (response.msg == "success") {
                                $('tr.taskrow').remove()
                                if (response.data == undefined || response.data == null || response.data == '') {
                                    alert("No Complaints");
                                }
                                else {
                                    $.each(response.data, function (index, data) {
                                        var url = url + data.id;
                                        index += 1;
                                        $('tbody').append("<tr class='taskrow'><td class='name'>" + data.name + "</td><td class='complaint_text'>" + data.complaint + "</td><td>" + "<button class='edit' value='" + data.id + "'>Edit</button>" + "<button class='del'  value='" + data.id + "'>Delete</button>" + "</td></tr>");
                                    });
                                    getuser_resolve();
                                }
                            }
                            else {
                                alert("Some Error Occured");
                            }
                        },
                        error: function (response) {
                            alert('server error');
                        }
                    })
                }
                else {
                    alert("server Error Occured");
                }
            }
        })
    }
    function getresolve() {
        $.ajax({
            url: "/admin/getresolve",
            method: "GET",
            dataType: "JSON",
            success: function (response) {
                response.data.forEach(row => {
                    $("tr.taskrow").each(function () {
                        var button_id = $(this).find("button.resolved").val()
                        var complaint_text = $(this).find(".complaint_text").html();
                        if (row.id == button_id && row.complaint == complaint_text) {
                            $(this).css("background-color", "lightgreen");
                            $(this).find("button.resolved").after("<span class='trow'></span>");
                        }
                    })
                });
            }
        })

    }
    function getuser_resolve() {
        $.ajax({
            url: "/users/getresolve",
            method: "GET",
            dataType: "JSON",
            success: function (response) {
                response.data.forEach(row => {
                    $("tr.taskrow").each(function () {
                        var button_id = $(this).find("button.edit").val()
                        var complaint_text = $(this).find(".complaint_text").html();
                        if (row.id == button_id && row.complaint == complaint_text) {
                            $(this).css("background-color", "lightgreen");
                            $(this).find("button.del").after("<span class='trow'></span>");
                        }
                    })
                });
            }
        })

    }


    $("#hide_edit").click(function () {
        window.location.replace("http://localhost:3000/users/complaint");
    })
});