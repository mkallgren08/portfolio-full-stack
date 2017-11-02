$(document).ready(function () {
  $('#myModal').on('hidden.bs.modal', function (e) {
    window.location.href = "/"
  });

  $('.contact-submit').on("click", function () {
    event.preventDefault();
    console.log("Click heard!")
    parseContact();

  });
});

//=========================================
//       FUNCTIONS
//=========================================

let parseContact = () => {
  var sentData = {};
  sentData.message = $("#contactMessage").val();
  sentData.email = $("#contactEmail").val();
  sentData.name = $("#contactName").val();

  // Checking for phone number
  sentData.countryCode = $('#basic-addon1').text();
  let phoneNum = $("#contactPhone").val()

  if (phoneNum !== '' || phoneNum !== "") {
    sentData.phone = phoneNum 
  } else {
    sentData.phone = "Not provided"
  }

  // Checking for preferred method of contact, defaults to 'email' if no phone
  // is provided and "either" if both an email and phone is provided but no 
  // mehtod is explicitly declared.
  let contactMethod = $("input[name='contact-type']:checked").val()

  if (contactMethod === "email" || sentData.phone === "Not provided") {
    sentData.prefMethod = "E-mail"
  } else if (contactMethod === "phone") {
    sentData.prefMethod = "Phone"
  } else if (contactMethod === "either" || !$("input[name='contact-type']:checked").val()) {
    sentData.prefMethod = "Either - phone or email"
  }


  // Create the actual post here to be sent to server
  if (sentData.message && sentData.email && sentData.message && sentData.prefMethod) {
    $.ajax({
      type: "POST",
      url: "/contact",
      data: sentData,
      success: function () {
        console.log("Sucess!")
      },
    }).then(function(res){
      if (res.alert){
        console.log(JSON.stringify(res, null, 2))
        alert(res.alert)
      } else if (res.sent){
        window.location.replace('/')
      }     
    });
  } else {
    alert("Please make sure you have included your Name, E-mail address, and a brief message.")
  }
}

let displayedCode = () => {
  let newCode = $("#countryCodes").find(":selected").val();
  $('#basic-addon1').text("+"+newCode)
  $('#basic-addon1').val(newCode)
  // alert("New code is: " + newCode)
}