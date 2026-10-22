(function () {
  var rm = matchMedia("(prefers-reduced-motion:reduce)").matches;

  // منوی همبرگری
  var bg = document.getElementById("bg"),
    nv = document.getElementById("nv");
  function closeM() {
    nv.classList.remove("open");
    bg.setAttribute("aria-expanded", "false");
  }
  bg.addEventListener("click", function () {
    var o = nv.classList.toggle("open");
    bg.setAttribute("aria-expanded", o);
  });
  nv.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeM();
  });
  addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeM();
  });

  // نوار پیشرفت اسکرول
  var bar = document.getElementById("bar");
  function prog() {
    var d = document.documentElement,
      m = d.scrollHeight - innerHeight;
    bar.style.transform =
      "scaleX(" + (m > 0 ? Math.min(scrollY / m, 1) : 0) + ")";
  }
  addEventListener("scroll", prog, { passive: true });
  addEventListener("resize", prog);
  prog();

  // نوارهای مهارت
  var sk = document.querySelectorAll(".sk");
  if (sk.length) {
    if (!("IntersectionObserver" in window)) {
      sk.forEach(function (e) {
        e.classList.add("go");
      });
    } else {
      var io = new IntersectionObserver(
        function (en) {
          en.forEach(function (x) {
            if (x.isIntersecting) {
              x.target.classList.add("go");
              io.unobserve(x.target);
            }
          });
        },
        { threshold: 0.4 },
      );
      sk.forEach(function (e) {
        io.observe(e);
      });
    }
  }

  // تایپ متحرک
  var el = document.getElementById("type");
  if (el) {
    var words = ["برنامه‌نویس وب", "طراح سایت", "فرانت‌اند"],
      w = 0,
      c = 0,
      del = false;
    if (rm) {
      el.textContent = words.join("، ");
    } else
      (function tick() {
        var t = words[w];
        c += del ? -1 : 1;
        el.textContent = t.slice(0, c);
        var d = del ? 45 : 95;
        if (!del && c === t.length) {
          del = true;
          d = 1400;
        } else if (del && c === 0) {
          del = false;
          w = (w + 1) % words.length;
          d = 350;
        }
        setTimeout(tick, d);
      })();
  }
})();
