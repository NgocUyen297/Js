
var apicourse = 'http://localhost:3000/courses'

function start(){
    getCourse(
       renderCourse
    )
    handelCreate()
}
function getCourse(callback){
    fetch(apicourse).then(
        function(res){
            return res.json()
        }
    ).then(callback)
}

function renderCourse(courses){
    var listCourse = document.getElementById('list-course')
    var html = courses.map(function(course){
        return `<li>
            <h4>${course.title}</h4>
            <p>${course.views}</p>
            <button onclick="deleteCourse(${course.id})">Xoá</button>
        </li>`
    })

    listCourse.innerHTML = html.join('')
}

function handelCreate(){
    var createBtn = document.getElementById('btn-create')
    createBtn.onclick  = function (){
        var title = document.querySelector('input[name="title"]').value
        var views = document.querySelector('input[name="views"]').value
        var formData ={
            title: title,
            views: views
        }
        createCourse(formData)
    }
}

function createCourse(data, callback){
     fetch(apicourse, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data), 
      }).then(
        (res)=>res.json()
      ).then(callback)
     
}

function deleteCourse(courseId){
    console.log(apicourse + '/' + courseId)
    fetch(apicourse + '/' + courseId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          }
      }).then(
        (res)=>res.json()
      ).then(callback)
     
}

start()

