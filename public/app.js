$(document).ready(function () {
  $('#myModal').on('hidden.bs.modal', function (e) {
    window.location.href = "/"
  });

  $('.contact-submit').on("click", function () {
    event.preventDefault();
    console.log("Click heard!")
    var sentData = {};
    sentData.message = $("#contactMessage").val();
    sentData.email = $("#contactEmail").val();
    sentData.name = $("#contactName").val();
    
    let phoneNum = $("#contactPhone").val()

    if ( phoneNum !== '' || phoneNum !== ""){
      sentData.phone = phoneNum     
    } else {
      sentData.phone = "Not provided"
    }

    let contactMethod = $("input[name='contact-type']:checked").val()

    if (contactMethod === "email" || sentData.phone === "Not provided"){
      sentData.prefMethod = "E-mail"
    } else if (contactMethod === "phone"){
      sentData.prefMethod = "Phone"
    } else if (contactMethod === "either"){
      sentData.prefMethod = "Either - phone or email"
    } 

    

    if (sentData.message && sentData.email && sentData.message && sentData.prefMethod){
      $.ajax({
        type: "POST",
        url: "/contact",
        data: sentData,
        success: function () {
          console.log("Sucess!")
        },
      });
    } else {
      alert("Please make sure you have included your Name, E-mail address, and a brief message.")
    }

  });
});