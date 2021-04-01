$(document).ready(function(){
    $(".button").click(function(){
        var id = $(this).parent().attr('value');
       $.ajax({
           url:"/checkadmin",
           method:"GET",
           datatype:"JSON",
           success:function(response){
               if(response.msg=="success"){
                $.ajax({
                    url:"/admin/getiddata",
                    method:"POST",
                    datatype:"JSON",
                    data:{"id":id},
                    success:function(response){
                        $(document).find("#name").html(response.data[0].username);
                        $(document).find("#mail").html(response.data[0].email);
                        $(document).find("#flat").html(response.data[0].Flat_no);
                        $(document).find("#phone").html(response.data[0].Phone_no);
                    },
                    error:function(){
                        alert("Sorry Server Error Occured");
                    }
                })
               }
               else if(response.msg=="user_error"){
                $.ajax({
                    url:"/users/getiddata",
                    method:"POST",
                    datatype:"JSON",
                    data:{"id":id},
                    success:function(response){
                        $(document).find("#name").html(response.data[0].username);
                        $(document).find("#mail").html(response.data[0].email);
                        $(document).find("#flat").html(response.data[0].Flat_no);
                        $(document).find("#phone").html(response.data[0].Phone_no);
                    },
                    error:function(){
                        alert("Sorry Server Error Occured");
                    }
                })
               }
           }
       }) 
    })
    $("#update_btn").click(function(e){
        e.preventDefault()
        var input_value;
        var update = $("#update_string").html();
        console.log(update);
        var element_li = $(".update_options");
        element_li.each((index,element)=>{
            if(element.innerHTML==update){
                input_value=$("#"+$(element).attr("value")).find("#"+$(element).attr("value")+"1").val();
                if(!input_value){
                    alert("Please Enter Value For "+update+" To Update");
                }
                else if($(element).attr("value")==="Flat_no" && input_value.length!=4){
                    alert("Please Enter Valid Flat Number");
                }
                else if($(element).attr("value")==="phone_no" && input_value.length!=10){
                    alert("Please Enter Valid Phone Number");
                }
                else{
                    var update_detail = $(element).attr("value");
                    $.ajax({
                        url: '/checkadmin',
                        method: 'get',
                        dataType: 'json',
                        success: function (response) {
                            if (response.msg == "success") {
                                $.ajax({
                                    url:"/admin/members/updatedetails",
                                    method:"PUT",
                                    datatype:"json",
                                    data:{input_value:input_value,update_detail:update_detail},
                                    success:function(response){
                                        if(response.msg==="success"){
                                            alert("Updation Of Details Is SuccessFull");
                                            window.location.replace("http://localhost:3000/admin/members");
                                        }
                                        else if(response.msg="error"){
                                            alert("Some Error Occured Try Again!")
                                        }
                                    },
                                    error:function(){
                                        alert("Server Error Ocurred Please Try Again!");
                                    }
                                })
                            }
                            else if (response.msg == "user_error") {
                                $.ajax({
                                    url:"/users/members/updatedetails",
                                    method:"PUT",
                                    datatype:"json",
                                    data:{input_value:input_value,update_detail:update_detail},
                                    success:function(response){
                                        if(response.msg==="success"){
                                            alert("Updation Of Details Is SuccessFull");
                                            window.location.replace("http://localhost:3000/users/members");
                                        }
                                        else if(response.msg="error"){
                                            alert("Some Error Occured Try Again!")
                                        }
                                    },
                                    error:function(){
                                        alert("Server Error Ocurred Please Try Again!");
                                    }
                                })
                            }
                            else {
                                alert("server Error Occured");
                            }
                        }
                    })
                }
            }
        })
    })
});