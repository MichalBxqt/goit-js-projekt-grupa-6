var t,e,n,i;t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},n={},null==(i=t.parcelRequired7c6)&&((i=function(t){if(t in e)return e[t].exports;if(t in n){var i=n[t];delete n[t];var a={id:t,exports:{}};return e[t]=a,i.call(a.exports,a,a.exports),a.exports}var o=Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){n[t]=e},t.parcelRequired7c6=i),(0,i.register)("3Felq",function(t,e){let n="storage-of-books",i=JSON.parse(localStorage.getItem(n))||[],a=document.querySelector(".shopping ul"),o=Math.ceil(i.length/3),s=1,r=0,l=3,c=i.slice(r,l);function d(){a.innerHTML=i.map(({_id:t,title:e,author:n,description:i,list_name:a,book_image:o,amazon_product_url:s,buy_links:[r]})=>`
        <article class="shopping__card">
          <div class="grid-img">
            <img class="shopping__card-img" src="${o}" alt="${e}" />
          </div>

          <div class="grid-title">
            <h3 class="shopping__card-title">${e}</h3>
            <p class="shopping__card-category">${a}</p>
          </div>

          <div class="grid-description">
            <p class="shopping__card-description">${i}</p>
          </div>

          <div class="grid-author">
            <p class="shopping__card-author">${n}</p>
          </div>

          <div class="grid-shoplist">
            <ul class="shopping__card-shoplist">
              <li class="store">
                <a "modal-shop-img" href="${s}" target="_blank" rel="noopener noreferrer nofollow" aria-label="Amazon link">
                  <img class="modal-shop-img shopping-shopimg amazon" src="${amazonIconPath}" alt="Amazon link" alt="Amazon live page"/>
                </a>
              </li>
              <li class="store">
                <a "modal-shop-img" href="${r.url}" target="_blank" rel="noopener noreferrer nofollow" aria-label="Apple Books link">
                  <img class="modal-shop-img shopping-shopimg apple" src="${appleBooksIconPath}" alt="Apple Books link" />
                </a>
              </li>
            </ul>
          </div>
          <button class="shopping__card-btn" type="button" data-book-id="${t} aria-label="Remove book from shopping list">
            <svg class="icon-trash" data-book-id="${t}" width="17" height="17">
              <use href="${svgTrashIcon}#icon-trash"></use>
            </svg>
          </button>
        </article>
        `).join("")}(function(){if(!i.length){a.innerHTML=`<div class="is-empty__wrapper"><p class="is-empty__info">This page is empty, add some books and proceed to order.</p><img class="is-empty__picture" src="${emptyListStubImage}" alt="Shop is Empty"></div >`;return}a.insertAdjacentHTML("beforeend",d(c))})(),a.addEventListener("click",t=>{if(t.target.closest(".shopping__card-btn")){let o=t.target.getAttribute("data-book-id"),s=i.findIndex(t=>t._id===o);if(i.splice(s,1),localStorage.setItem(n,JSON.stringify(i)),i.length){var e;let t;g().length?(a.innerHTML=d(g()),console.log(g())):previousButton.click(),e=paginationContainerPages,Math.round(t=i.length/3)===t&&e.lastElementChild.remove()}else{a.innerHTML=`<div class="is-empty__wrapper"><p class="is-empty__info">This page is empty, add some books and proceed to order.</p><img class="is-empty__picture" src="${emptyListStubImage}" alt="Shop is Empty"></div >`;return}i.length<=3&&(v(paginationContainerBackBtn),v(paginationContainerEndBtn),paginationContainerPages.innerHTML="")}});for(let t=1;t<=o;t++){if(i.length<=3)return;let e=t,n=document.createElement("button");n.classList.add("paginations__btn"),n.classList.add("paginations__btn--pages"),n.textContent=t,f(paginationContainerBackBtn),f(paginationContainerEndBtn),n.addEventListener("click",()=>{s=e,p(),u(),m(startButton),m(endButton)}),paginationContainerPages.appendChild(n)}function p(){a.innerHTML=""}function g(){return l=(r=(s-1)*3)+3,i.slice(r,l)}function u(){a.insertAdjacentHTML("beforeend",d(g()))}function m(t){t.disabled=!1}function h(t){t.disabled=!0}function f(t){t.style.display="flex"}function v(t){t.style.display="none"}function _(t){let e=document.querySelector(".active");e&&e.classList.remove("active"),t.classList.add("active")}window.addEventListener("DOMContentLoaded",function(){d()}),paginationContainerPages.firstChild.classList.add("active"),paginationsSection.addEventListener("click",function(t){let e=document.querySelector(".active");if(console.log(t.target),"BUTTON"===t.target.tagName)switch(t.target){case previousButton:s>1&&(s--,p(),u(),m(endButton),e.classList.remove("active"),e.previousElementSibling.classList.add("active"));break;case nextButton:s<o&&(s++,p(),u(),m(startButton),e.classList.remove("active"),e.nextElementSibling.classList.add("active"));break;case startButton:s=1,p(),u(),h(startButton),m(endButton),_(paginationContainerPages.firstChild);break;case endButton:s=o,p(),u(),h(endButton),m(startButton),_(paginationContainerPages.lastElementChild)}}),paginationContainerPages.addEventListener("click",function(t){"BUTTON"===t.target.tagName&&_(t.target)})}),i("3Felq");
//# sourceMappingURL=index.b39ba3a1.js.map
