$(function () {
 //!------ getting location href and linking to the pages
  //? ---- 3rd step 
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
  //! -------   Getting json data and load it to main page
  //? ---------- 1st step
  
  
  $.get("lib/data.json", (data) => {
    data.forEach((item,index) => {
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
        .appendTo('.left-menu-bar');
      
      //? ------  item is stored in .accordion-button element
      template.find(`.accordion-button`).data("itemdata", item);

      if (page.length) {
        var title = item.title.toLowerCase().replace(/ /g, "-");
        if (page == title) {
          template.find(`.accordion-button`).trigger("click");
        }
      }

      else if (index == 0) {
        template.find(`.accordion-button`).trigger("click");
      }

    });
  });


  // !----------- Adding Event on Accordion button
  //? ---------  2nd step 
  $(document).on("click", '.accordion-button', (e) => {
    let data = $(e.target).data("itemdata"); 
    let innerContent = $(e.target).data("inner_content");

//Using Conditions for not loading same location data
    //this condition is used for not fetching the same location

    if (innerContent && innerContent.length) {
     
      $(`#main-content`).html(innerContent);
      getHref();
    }
    else {
      $.get(data.location, (htmlContent) => {
        $(e.target).data("inner_content", htmlContent);
        $(`#main-content`).html(htmlContent);
        getHref();

      },"html");
    }

  });

//! -------------   getHref Function
  //? ----------   4th step 
  function getHref() {
    let hrefsTag = $("#main-content a[href^='#']").filter((index, element) => $(element).attr("href").length > 1);
    
    hrefsTag.clone().each((index,element) => {
      $('#right-bar-content').append(element);
    })  
}
})
