function getData(courseId)
{
  var link = "https://mcc-odd1819.herokuapp.com/detail_courses/";

  var opt = {
    url: link,
    type: 'POST',
    data: {
        course_id : course_id;
      }
  }

  var request - $.ajax(opt);
}
$(function () {
  var params = window.location.search;
  var search = new URLSearchParams(params);
  var course_id = search.get('course_id');

  getData(course_id);

})
