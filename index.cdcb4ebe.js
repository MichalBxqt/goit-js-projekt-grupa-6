const e=document.querySelector('[data-action="sign-up"]'),t=document.querySelector('[data-action="sign-in"]');e.disabled=!0;const i=document.querySelector(".authorization__btn__submit"),s=document.querySelector("#sign-in"),a=document.querySelector("#sign-up");t.addEventListener("click",d=>{d.preventDefault(),e.classList.remove("active-link"),e.classList.add("desactive-link"),t.classList.remove("desactive-link"),t.classList.add("active-link"),i.textContent="Sign in",s.classList.remove("display-form"),a.classList.add("display-form"),e.disabled=!1,t.disabled=!0}),e.addEventListener("click",d=>{d.preventDefault(),e.classList.add("active-link"),e.classList.remove("desactive-link"),t.classList.add("desactive-link"),t.classList.remove("active-link"),i.textContent="Sign up",s.classList.add("display-form"),a.classList.remove("display-form"),e.disabled=!0,t.disabled=!1});const d=document.querySelector(".open-autorization-btn"),n=document.querySelector(".authorization__bacdrop"),c=document.querySelector(".authorization__button__close");d.addEventListener("click",()=>{n.classList.remove("is-hidden")}),c.addEventListener("click",()=>{n.classList.add("is-hidden")});
//# sourceMappingURL=index.cdcb4ebe.js.map