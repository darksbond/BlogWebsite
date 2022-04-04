$(function () {

  function getLink() {
    let ss = location.href;

  let index = ss.indexOf("?")
  let substring = ss.substring(index + 1);

  let subIndex=substring.indexOf("#")
  let page = substring.substring(0, subIndex);
  let hashName=substring.substring(subIndex)
  }
 getLink()


  $.get("../lib/data.json", (data) => {
   
    data.forEach((item) => {
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
            <ul>
              <li><a href="#">${item.subheading[0]}</a></li>
              <li><a href="#">${item.subheading[1]}</a></li>
              <li><a href="#">${item.subheading[2]}</a></li>
              
            </ul>
          </div>
        </div>`)
        .appendTo('.accordion');
      
      template.find(`.accordion-button`).data("itemdata", item);
     
      
      if (page.length) {
        var title = item.title.toLowerCase().replace(/ /g, "-");
        if (page == title) {
          template.find(`.accordion-button`).trigger("click")
        }
        
      }

 
    });
  });

   
  $(document).on("click", '.accordion-button', (e) => {
    let data = $(e.target).data("itemdata");

    let innerContent = $(e.target).data("inner_content");

    if (innerContent && innerContent.length) {
      $(`#main-content`).html(innerContent);
    } else {
      $.get(data.location, htmlContent => {
        $(e.target).data("inner_content", htmlContent);
        $(`#main-content`).html(htmlContent);
      }, "html");
    }
  });



  })
