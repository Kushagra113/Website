$(document).ready(function(){
       $("#paying_button").click(function(){
        var name=$(document).find("#name").val();
        var cardnumber=$(document).find("#cardnumber").val();
        var expirationdate=$(document).find("#expirationdate").val();
        var securitycode=$(document).find("#securitycode").val();
        var amount=$(document).find("#amount").val();
        console.log("Amount"+amount);
        cardnumber=cardnumber.split(" ").join("");
        if(!name || !cardnumber || !expirationdate || !securitycode || !amount){
            alert("Please Fill In All the Details");
        }
        else if(cardnumber.length != 16){
            alert("Card Number Should Be 16 Numbers");
        }
        else{
            $.ajax({
                url:'/checkadmin',
                method: 'get',
                dataType:'json',
                success:function(response){
                    if(response.msg=="success"){
                        result=1;
                        $.ajax({
                            URL:"/admin/payment",
                            method: 'post',
                            datatype:'json',
                            data:{name,cardnumber,expirationdate,securitycode,amount},
                            success:function(response){
                                if(response.msg=='success_insert'){
                                    alert("Payment Done");
                                }
                                else{
                                    alert("Some Error Occured Try Again");
                                }
                            },
                            error:function(){
                                alert('server error occured');  
                            }
                        });
                        
                    }
                    else if(response.msg=="user_error"){
                        result=0;
                        $.ajax({
                            URL:"/users/payment",
                            method: 'post',
                            datatype:'json',
                            data:{name,cardnumber,expirationdate,securitycode,amount},
                            success:function(response){
                                if(response.msg=='success_insert'){
                                    alert("Payment Done");
                                }
                                else{
                                    alert("Some Error Occured Try Again");
                                }
                            },
                            error:function(){
                                alert('server error occured');  
                            }
                        });
                    }
                    else{
                        alert("server Error Occured");
                    }
                }
            })
        }
    });
});