/* Smart Little Systems — shared site scripts */
(function(){
  "use strict";

  // Reveal-on-scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  },{threshold:.12,rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll("[data-reveal]").forEach(function(el){ io.observe(el); });

  // Mobile menu
  var burger=document.getElementById("burger");
  function closeMenu(){
    document.body.classList.remove("menu-open");
    if(burger) burger.setAttribute("aria-expanded","false");
  }
  if(burger){
    burger.addEventListener("click", function(){
      var open=document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open?"true":"false");
    });
  }
  document.querySelectorAll(".mobile-menu a").forEach(function(a){
    a.addEventListener("click", closeMenu);
  });

  // Header shadow on scroll
  var header=document.getElementById("header");
  if(header){
    window.addEventListener("scroll", function(){
      header.classList.toggle("scrolled", window.scrollY>10);
    }, {passive:true});
  }

  // FAQ accordion
  document.querySelectorAll(".faq-q").forEach(function(q){
    q.addEventListener("click", function(){
      var item=q.parentElement;
      var open=item.classList.toggle("open");
      q.setAttribute("aria-expanded", open?"true":"false");
      var a=item.querySelector(".faq-a");
      a.style.maxHeight = open ? a.scrollHeight+"px" : null;
    });
  });

  // Contact form — submits to Formspree via AJAX, keeps user on page
  var form=document.getElementById("contactForm");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }

      var btn=document.getElementById("submitBtn");
      var err=document.getElementById("formError");
      var original=btn.innerHTML;
      err.classList.remove("show");
      btn.disabled=true; btn.style.opacity=".65"; btn.textContent="Sending…";

      fetch(form.action, {
        method:"POST",
        body:new FormData(form),
        headers:{ "Accept":"application/json" }
      }).then(function(res){
        if(res.ok){
          form.style.display="none";
          document.getElementById("formSuccess").classList.add("show");
        } else {
          throw new Error("Bad response");
        }
      }).catch(function(){
        err.classList.add("show");
        btn.disabled=false; btn.style.opacity="1"; btn.innerHTML=original;
      });
    });
  }

  // Year in footer
  var yr=document.getElementById("year");
  if(yr) yr.textContent=new Date().getFullYear();
})();
