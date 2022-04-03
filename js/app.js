$(function () {
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

      (function ($) {
        $(`.accordion-button`, template).click((e) => { 
          
        });

      })(jQuery);
    });
  });

   
  $(document).on("click", '.accordion-button', (e) => {
    let data = $(e.target).data("itemdata");
    $("#main-content").append(`
    <div class="row">
    <div class="col-md-9 main-bar px-5">
      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example3"
        data-bs-offset="0"
        tabindex="0"
        class="main-bar-area"
      >
       
      </div>
    </div>
    <!-- ! Right Bar Section ----- -->
    <div class="col-3 d-none d-md-block">
      <strong
        style="border-bottom: 1px solid rgb(125, 124, 124)"
        class="pb-1"
        >On This Page</strong
      >
      <nav
        id="navbar-example3"
        class="navbar navbar-light flex-column align-items-stretch p-3"
      >
        <nav class="nav nav-pills flex-column">
          <a class="nav-link" href="#item-1">${}</a>
          <a class="nav-link" href="#item-2">${}</a>
          <a class="nav-link" href="#item-3">${}</a>
        </nav>
      </nav>
    </div>
  </div>
    `)
  });


  })
