$(document).ready(function () {
  $('#myModal').on('hidden.bs.modal', function (e) {
    window.location.href = "/"
  });

  $('.contact-submit').on("click", function () {
    // event.preventDefault();
    console.log("Click heard!")
    // var sentData = {};
    // sentData.message = "Sending mail using Node.js!"
    // sentData.returnAddress = "mk962@cornell.edu"
    // console.log("articleID: " + JSON.stringify(sentData, null, 2))

    // $.ajax({
    //   type: "POST",
    //   url: "/contact",
    //   data: sentData,
    //   success: function () {
    //     console.log("Sucess!")
    //   },
    // });
  });
});