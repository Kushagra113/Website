$(document).ready(function(){
            // get Data	
    getData();			
    $("#add").click(function(){
        var name=$("#name").val();
        var c = $("#complaint_text").val();
        // alert(name);
        $.ajax({
            URL:'/users/complaint',
            method: 'POST',
            dataType:'json',
            data: {'name':name,'complaint':c},
            success:function(response){
                if(response.msg=='success'){
                    // alert("Name Added In the Database");
                    getData();
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
    });

    function getData(){
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
                            var url = url+data._id;  
                            index+=1;  
                        $('tbody').append("<tr class='taskrow'><td>"+ index +"</td><td>"+data.complaint+"</td><td>"+"<button class='del' value='"+data._id+"'>delete</button>"+"</td></tr>");   
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


});