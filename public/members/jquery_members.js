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
    // $(".update_options").click(function(e){
    //     console.log(e);
    // });
});