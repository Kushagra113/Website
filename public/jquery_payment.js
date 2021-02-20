$(document).ready(function(){
    // $(document).on('click','#pay_btn',function(){
       $("#paying_button").click(function(){
        var name=$(document).find("#name").val();
        var cardnumber=$(document).find("#cardnumber").val();
        var expirationdate=$(document).find("#expirationdate").val();
        var securitycode=$(document).find("#securitycode").val();
        cardnumber=cardnumber.split(" ").join("");
        console.log(cardnumber); 
        if(!name || !cardnumber || !expirationdate || !securitycode){
            alert("Please Fill In All the Details");
        }
        else if(cardnumber.length != 16){
            alert("Card Number Should Be 16 Numbers");
        }
        $.ajax({
            URL:"/users/payment",
            method: 'post',
            datatype:'json',
            data:{name,cardnumber,expirationdate,securitycode},
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
    });
});