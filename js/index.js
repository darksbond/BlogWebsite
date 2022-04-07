//? ----------- 1st step -fetching data

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
               
           template.find('.accordion-button').data('jsonData',element);
            
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
    }
    else {
        $.get(data.location, (htmlContent) => {
            $('#main-content').html(htmlContent);
            $(event.target).data('innerContent', htmlContent);
        })    
    }

})

