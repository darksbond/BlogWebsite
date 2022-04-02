$(function () {
    $.get("../lib/data.json", (data,status) => {
        data.forEach(item => { 
            $('.accordion').append(
                `<h2 class="accordion-header" id="heading${item.id}">
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
                    <li><a href="#">Introduction</a></li>
                    <li><a href="#">Contents</a></li>
                    <li><a href="#">Javascript</a></li>
                    <li><a href="#">Accesibility</a></li>
                  </ul>
                </div>
              </div>`
          );
            $('.main-bar-area').append(
                `<h4>${item.description}</h4>`
            ); 
        });
       
    })
})