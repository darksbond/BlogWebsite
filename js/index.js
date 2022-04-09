//? ----------- 1st step -fetching data
/* let ss = location.href;

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
} */
$(function () {

  let ss = location.href;
 
  let index = ss.indexOf("?");
  let subIndex = -1;
  let page = '';
  let hashName = '';
  let substring = ss.substring(index + 1);
  if (index >= 0) {
   
    subIndex = substring.indexOf("#");
    if (subIndex >= 0) {
      page = substring.substring(0, subIndex);
      hashName += substring.substring(subIndex)
    }
    else {
      page = substring;
    }
  }
  

  $.get("lib/data.json", (data) => {
   
    data.forEach((item, index) => {
      let template = $(`<h2 class="accordion-header" id="heading${item.id}">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse${item.id}"
            aria-expanded="true"
            aria-controls="collapse${item.id}"
           
          >
            ${item.title}
          </button>
        </h2>
        <div
          id="collapse${item.id}"
          class="accordion-collapse collapse"
          aria-labelledby="heading${item.id}"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <ul class="list-unstyled">
              <li><a href="#" class='click-btn'>${item.subheading[0]}</a></li>
              <li><a href="#" class='click-btn'>${item.subheading[1]}</a></li>
              <li><a href="#" class='click-btn'>${item.subheading[2]}</a></li>
              
            </ul>
          </div>
        </div>`)
        .appendTo('.accordion');
      
      //item is stored in .accordion-button element
      template.find(`.click-btn`).data("itemdata", item);

     
      if (page.length) {
        var title = item.title.toLowerCase().replace(/ /g, "-");

        if (page == title) {
          template.find(`.click-btn`).trigger("click");
        }
        //console.log(page);

      } else if (index == 0) {
        // console.log(index);
        template.find(`.click-btn`).trigger("click");
      }
 
    });
  });

   
  $(document).on("click", '.click-btn', (e) => {
    let data = $(e.target).data("itemdata");
    
    let innerContent = $(e.target).data("inner_content");
    //Using Conditions for not loading same location data
    if (innerContent && innerContent.length) {
      $(`#main-content`).html(innerContent);
      getHref();
    }
    else {
      $.get(data.location, (htmlContent) => {
        
        $(e.target).data("inner_content", htmlContent);
        $(`#main-content`).html(htmlContent);
        setTimeout(() => 5, 5000);
        getHref();
      }, "html");
    }

  });

  function getHref() {
    let hrefsTag = $("#main-content a[href^='#']").filter((b, a) => $(a).attr("href").length > 1);
    
    hrefsTag.each((index, element) => {
     
      $('#right-bar-content').append($(element).clone());
    })
    

  }

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop() - 100;
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};
  
$(document).on('scroll', function () {
    let hrefsTag = $(document).find(".main-bar a[href^='#']").filter((b, a) => $(a).attr("href").length > 1 && $(a).isInViewport());
    $(document).find(`#right-bar-content [href^="#"].active`).removeClass("active");
    
    if (hrefsTag.length) {
      $(document).find(`#right-bar-content [href="${$(hrefsTag[0]).attr("href")}"]`).addClass("active");
    }
    /* $('.main-bar h3').each(function () {
      console.log($('#right-bar-content a[href=#'+ '' +']'));
        if($(window).scrollTop() >= $(this).position().top) {
          var id = $(this).attr('id');
         
            $('#right-bar-content a').removeClass('active');
            $('#right-bar-content a[href=#'+ id +']').addClass('active');
          
        }
    }); */
});
  //scroll Event
/*   $(window).on('scroll', function () {
    $('.main-bar h3').each(function () {
      if ($(window).scrollTop() >= $(this).position().top) {
       
          let id = $(this).attr('id');
          $(".right-bar-content a").removeClass('.active');
          $('.right-bar-content a[href=#' + id + ']').addClass('.active');
        
      }
    })
  })
*/
});