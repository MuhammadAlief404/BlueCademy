function doLogin() {

  var mail = $('#txtEmail').val();
  localStorage.setItem("mail",mail);
  window.location.href = "Home.html";

}

function get_data_course(){
	var url="https://mcc-odd1819.herokuapp.com/courses";
	var request = $.ajax({
			method : "GET",
			url : url
	});
	request.done(function(response){
			if(response)
			{
					for (let index = 0; index < response.length; index++) {
							$('#ambilCourse').append(
							`<li data-role="list-divider">${response[index].main_course_name}</li>
							<li><a href="course_detail.html?course_id=${response[index].id}${response[index].course_name}</a></li>`);
					}
					$("#ambilCourse").listview('refresh');
			}
	});
}

function getDetail(userId)
{
  var link = "https://mcc-odd1819.herokuapp.com/detail_courses?course_id=" + userId;

  var opt =
  {
      type:'POST',
      url : link,
      data: {
          course_id : userId
        }
  };

  var request = $.ajax(opt);
  request.done(function(res)
  {
    $('#txtMainCourseDetail').text(res.main_course_name);
    $('#txtCName').text(res.course_name);
    $('#txtDesc').text(res.description);
    $('#frameCourse').attr("src",res.link);
    // $('#txtDesc').text(res.email);
  });
}

$(function() {
  //onLoad

  //login
  $('#frmLogin').submit(doLogin);

  //home
  get_data_course();
  $('#btnLogout').click(function()
  {
    window.location.href = "index.html"
  });

  //detail
  var params = window.location.search;
  var search = new URLSearchParams(params);
  var course_id = search.get('course_id');

  getDetail(course_id);
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
