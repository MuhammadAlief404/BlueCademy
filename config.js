$(document).ready(function()
{
  alert(sessionStorage.getItem("mail"));
  //
  // if(window.location.href != "index.html")
  // {
  //   if(sessionStorage.getItem("email") == null)
  //   {
  //     alert("Session has Expired");
  //     window.location.href = "index.html";
  //   }
  // }

  $('#btnLogin').submit(function()
  {
    var mail = document.getElementById("txtEmail").value;
    sessionStorage.setItem("mail",mail);
    window.location.href = "Home.html";
  })

  $('#btnCourse').click(function()
  {
    window.location.href = "my_course.html";
  })

  $('#btnCourse').click(function()
  {
    window.location.href = "my_course.html";
  })

  $('#btnLogout').click(function()
  {
    window.location.href = "index.html";
    sessionStorage.clear();
  })
});
