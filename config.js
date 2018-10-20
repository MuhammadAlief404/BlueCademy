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
    // $('#txtDesc').text(res.email);
  });
}

function saveCourse(courseId){
  // var data = localStorage.getItem('course');
  //
  // var arr;
  //
  // if(!data)
  // {
  //     arr = [];
  // }
  // else
  // {
  //     //karena localStorage tidak bisa simpan array, jadi DATA harus di convert dulu jadi JSON
  //     arr = JSON.parse(data);
  // }
  // arr.push(courseId);
  //
  // data = JSON.stringify(arr);
  // localStorage.setItem('course',data);

  var db = openDatabase('mydb', '1.0', 'db_course', 2 * 1024 * 1024);

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
    db.transaction(function (tx) {
       tx.executeSql('CREATE TABLE IF NOT EXISTS course (id unique, main_course,course_name,link,desc)');
       tx.executeSql('INSERT INTO course (id, main_course,course_name,link,desc) VALUES ('+res.id+','+res.main_course_name+','+res.course_name+','+res.link+','+res.description+')');
    });
  });
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
