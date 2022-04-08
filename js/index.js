//? ----------- 1st step -fetching data
let ss = location.href;

let index = ss.indexOf("?");
let subIndex = -1;
let page = '';
let hashName = '';
let substring = ss.substring(index + 1);
if (index >= 0) {
  subIndex = substring.indexOf("#");
  if (subIndex>=0) {
    page = substring.substring(0, subIndex);
    hashName += substring.substring(subIndex)
  }
  else {
    page = substring;
  }
}


$.get("lib/data.json",
        function (data) {
            data.forEach(function (element, index) {
                let template = $(`<h2 class="accordion-header" id="heading${element.id}">
           <button
             class="accordion-button"
             type="button"
             data-bs-toggle="collapse"
             data-bs-target="#collapse${element.id}"
             aria-expanded="true"
             aria-controls="collapse${element.id}"
            
           >
             ${element.title}
           </button>
         </h2>
         <div
           id="collapse${element.id}"
           class="accordion-collapse collapse"
           aria-labelledby="heading${element.id}"
           data-bs-parent="#accordionExample"
         >
           <div class="accordion-body">
             <ul>
               <li><a href="#">${element.subheading[0]}</a></li>
               <li><a href="#">${element.subheading[1]}</a></li>
               <li><a href="#">${element.subheading[2]}</a></li>
               
             </ul>
           </div>
         </div>`).appendTo('.left-menu-bar');
               
              template.find('.accordion-button').data('jsonData', element);


              if (page.length) {
                var title = item.title.toLowerCase().replace(/ /g, "-");
                if (page == title) {
                  template.find(`.accordion-button`).trigger("click");
                }
              }
        
              else if (index == 0) {
                template.find(`.accordion-button`).trigger("click");
              }
            }
            )
        }
);
//? ------------- 2nd step -adding events
$(document).on('click', '.accordion-button', function (event) {
    let data = $(event.target).data('jsonData');
    let innerContent=$(event.target).data('innerContent')

    if (innerContent && innerContent.length) {
      $('#main-content').html(innerContent);
      getHref()
    }
   else {
      $.get(data.location, (htmlContent) => {
        $(event.target).data("inner_content", htmlContent);
        $(`#main-content`).html(htmlContent);
        getHref();

      },"html");
    }
  
})

function getHref() {
  let links = $('#main-content a[href^="#"]').filter((i,element) => $(element).attr("href").length > 1);

  
  links.clone().each((index, element) => {
    $('#right-bar-content').append(element);
  })
}