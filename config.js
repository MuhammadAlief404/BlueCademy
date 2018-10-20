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
							$('#ambilCourseHome').append(
							`<li data-role="list-divider">${response[index].main_course_name}</li>
							<li><a href="course_detail.html?course_id=${response[index].id}">${response[index].course_name}</a></li>`);
					}
          // $('#ambilCourse').trigger('create');
					$("#ambilCourseHome").listview('refresh');
			}
	});
}

function getDetail(userId){
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

  });
}

var data = localStorage.getItem('course');

function saveCourse(courseId){

  var arr;

  if(!data)
  {
      arr = [];
  }
  else
  {
      //karena localStorage tidak bisa simpan array, jadi DATA harus di convert dulu jadi JSON
      arr = JSON.parse(data);
  }
  arr.push(courseId);

  data = JSON.stringify(arr);
  localStorage.setItem('course',data);
  // });
}

function getMyCourse() {
  //get dari JSON
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
    for (var i = 0; i < res.length; i++) {

    }
  });

  //get dari localStorage
  var retrievedData = localStorage.getItem("course");
  var data = JSON.parse(retrievedData);

  for (let index = 0; index < data.length; index++) {
      $('#ambilMyCourse').append(
      `<li>
  			<a href="#">
  				<iframe width="100" height="100" src="https://www.youtube.com/embed/tgbNymZ7vqY" style="float:left"></iframe>
  				<h2>Broken Bells</h2>
  				<p>Broken Bells</p>
  			</a>`);
  //     console.log("a");
  }
  // console.log("asdwasd");
  // $('#ambilCourse').trigger('create');
  // $("#ambilCourseHome").listview('refresh');
}

function test() {

  var retrievedData = localStorage.getItem("course");
  var data = JSON.parse(retrievedData);

  console.log(data);

}

function capek() {

  for (var i = 0; i < data.length; i++)
  {
    var link = "https://mcc-odd1819.herokuapp.com/detail_courses?course_id=" + data[i];
    var opt =
    {
        type:'POST',
        url : link,
        data: {
            course_id : data[i]
          }
    };
    var request = $.ajax(opt);
    request.done(function(res)
    {
      if(res.link != data[i])
      {
        $('#ambilMyCourse').append(
          `<li>
            <a href="course_detail.html?course_id=${data[i]}">
              <iframe width="100" height="100" src="${res.link}" style="float:left"></iframe>
              <h2>${res.course_name}</h2>
              <p>${res.description}</p>
            </a>
          </li>`);
              $("#ambilMyCourse").listview('refresh');
      }

    });
  }

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

  //add Course
  $('#btnAddCourse').click(function() {
    saveCourse(course_id);
  });

  //test ambil course
  $('#testCourse').click(function() {
    test(course_id);
  });

  //tambah MyCourse
  capek();

  //validasi MyCourse
  for (var i = 0; i < data.length; i++) {
    if(data[i] == course_id)
    {
      $('#btnAddCourse').remove();
    }
  }

  //MyCourse
  $('#testMyCourse').click(function() {
    getMyCourse();
  });
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
