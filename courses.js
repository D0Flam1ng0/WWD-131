// courses.js
const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    credits: 3,
    sections: [
        {
          sectionNum: 1,
          roomNum: "STC 353",
          enrolled: 26,
          days: "TTh",
          instructor: "Bro T",
        },
        {
          sectionNum: 2,
          roomNum: "STC 347",
          enrolled: 25,
          days: "TTh",
          instructor: "Sis A",
        },
      ],
      enrollStudent
    };
    console.log
    const section1 = aCourse.sections.find(section = section.sectionNum = 1)

    function setCourseInfo(course){
        const courseName=document.querySelector("#courseName")
        const courseCode = document.querySelector("#courseCode")
        courseName.textContent = course.name
        courseCode.textContent = course.code
    }
    function sectionTemplate(section){
        return <tr><td>${section.sectionNum}</td>
        <td>${section.roomNum}</td>
        <td>${section.enrolled}</td>
        <td>${section.days}</td>
        <td>${section.instructor}</td>
        </tr>
    }
    function renderSection(section){
        const sectioList = document.querySelector()
        sectioList.innerHTML = ""
        const html = sections.map(sectionTemplate)
        sectioList.innerHTML = html.join("");
    }
    document.querySelector('#enrollStudent').addEventListener
