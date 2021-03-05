$(document).ready(function(){
    
    // checkAdmin();
    // get Data	
    getData();
    
    $("#add").click(function(){
        // var name=$("#name").val();
        var c = $("#complaint_text").val();
        // alert(name);
        if(c===""){
            alert("Enter Some Complaint to Add it");
        }
        else{
            $.ajax({
                URL:'/users/complaint',
                method: 'POST',
                dataType:'json',
                data: {'complaint':c},
                success:function(response){
                    if(response.msg=='success'){
                        // alert("Name Added In the Database");
                        getData();
                    }
                    else if(response.msg=="same_complaint"){
                        alert("Complaint Already Added")
                    }
                    else{
                        alert("Some Error Occured Try Again");
                    }
                },
                error:function(){
                    // console.log(error);
                    alert('server error occured');  
                }
            });
        }
    });
    $(document).on('click','button.del',function(){  
        var id = $(this).parent().find('button.del').val();
        var complaint=[];
        complaint.push($(this).parent().parent().find(".complaint_text").html());
        var result;
        $.ajax({
            url:'/checkadmin',
            method: 'get',
            dataType:'json',
            success:function(response){
                if(response.msg=="success"){
                    $.ajax({  
                        url:'/admin/complaint/removecomplaint',  
                        method:'delete',  
                        dataType:'json',  
                        data:{'id':id,complaint:complaint[0]},  
                        success:function(response){  
                            if(response.msg=='success'){  
                                alert('data deleted');  
                                getData(); 
                            }
                            else if(response.msg=="user_error"){
                                alert("You Cannot Delete Other Users Complaints Sorry!");
                            }
                            else if(response.msg=="workedfine"){
                                alert("Working Fine");
                            }
                            else{  
                                alert('data did not get deleted');  
                            }  
                        },  
                        error:function(){  
                                 alert('server error')     
                        }  
                    });  
                    $(document).find(".edit").hide();
                }
                else if(response.msg=="user_error"){
                    $.ajax({  
                        url:'/users/complaint/removecomplaint',  
                        method:'delete',  
                        dataType:'json',  
                        data:{'id':id,complaint:complaint[0]},  
                        success:function(response){  
                            if(response.msg=='success'){  
                                alert('data deleted');  
                                getData();
                            }
                            else if(response.msg=="user_error"){
                                alert("You Cannot Delete Other Users Complaints Sorry!");
                            }
                            else if(response.msg=="workedfine"){
                                alert("Working Fine");
                            }
                            else{  
                                alert('data did not get deleted');  
                            }  
                        },  
                        error:function(){  
                                 alert('server error')     
                        }  
                    });  
                }
                else{
                    alert("server Error Occured");
                }
            }
        })
    }); 
    $(document).on('click','button.edit',function(e){
        if($(".edit_block").is(":visible")){
            alert("First Edit the Following Complaint");
        }
        else{
            var id = $(this).parent().find('button.edit').val();
            complaint=($(this).parent().parent().find(".complaint_text").html());
            $(".edit_block").show();
            $(document).one("click","#done",function(){
                var new_complaint = $(document).find("#edit_complaint").val();
                if(new_complaint===undefined){
                    alert("Please Enter Complaint to Edit or Reload the page");
                }
                else{
                    $.ajax({  
                            url:'/users/complaint/editcomplaint',  
                            method:'post',  
                            dataType:'json', 
                            data:{'id':id,complaint:complaint,newComplaint:new_complaint}, 
                            success:function(response){  
                                if(response.msg=='success'){  
                                    console.log("Msg"+response.msg);
                                    alert('data successfully Edited');  
                                    getData();  
                                }
                                else if(response.msg=="user_error"){
                                    alert("You Cannot Edit Other Users Complaints Sorry!");
                                }
                                else if(response.msg=="same_complaint"){
                                    alert("Complaint Already Added")
                                }
                                else{  
                                    alert('Editing was not Successfull Please Try Again');  
                                }  
                            },  
                            error:function(){  
                                        alert('server error')     
                            }  
                        });  
                        $(".edit_block").hide();
                }
            });
        }
        // }
    }); 
    function getData(){
        $.ajax({
            url:'/checkadmin',
            method: 'get',
            dataType:'json',
            success:function(response){
                if(response.msg=="success"){
                    $.ajax({
                        url:'/admin/complaint/getdata',
                        method:'GET',
                        dataType:'json',
                        success:function(response){
                            if(response.msg=="success"){
                                $('tr.taskrow').remove()  
                                if(response.data==undefined || response.data==null || response.data==''){  
                                    alert("No Complaints");
                                }
                                else{
                                    $.each(response.data,function(index,data){  
                                        var url = url+data.id;  
                                        index+=1;  
                                    $('tbody').append("<tr class='taskrow'><td class='name'>"+ data.name +"</td><td class='complaint_text'>"+data.complaint+"</td><td>"+"<button class='edit' value='"+data.id+"'>Edit</button>"+"<button class='del'  value='"+data.id+"'>Delete</button>"+"</td></tr>");   
                                    });  
                                    $(document).find(".edit").hide();                  
                                }
                            }
                            else{
                                alert("Some Error Occured");
                            }
                        },
                        error:function(response){  
                            alert('server error');  
                        }  
                    })

                }
                else if(response.msg=="user_error"){
                    $.ajax({
                        url:'/users/complaint/getdata',
                        method:'GET',
                        dataType:'json',
                        success:function(response){
                            if(response.msg=="success"){
                                $('tr.taskrow').remove()  
                                if(response.data==undefined || response.data==null || response.data==''){  
                                    alert("No Complaints");
                                }
                                else{
                                    $.each(response.data,function(index,data){  
                                        var url = url+data.id;  
                                        index+=1;  
                                    $('tbody').append("<tr class='taskrow'><td class='name'>"+ data.name +"</td><td class='complaint_text'>"+data.complaint+"</td><td>"+"<button class='edit' value='"+data.id+"'>Edit</button>"+"<button class='del'  value='"+data.id+"'>Delete</button>"+"</td></tr>");   
                                    });  
                                }
                            }
                            else{
                                alert("Some Error Occured");
                            }
                        },
                        error:function(response){  
                            alert('server error');  
                        }  
                    })
                }
                else{
                    alert("server Error Occured");
                }
            }
        })
    }
    $("#hide_edit").click(function(){
        $(document).find(".edit_block").hide();
    })
});
