document.addEventListener('DOMContentLoaded', () => {
    const watcherElements = document.querySelectorAll('[data-watcher]');

    if (!watcherElements.length) return;

        const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('_watcher-view');

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    watcherElements.forEach((element) => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const burgerMenu = document.querySelector('.menu__icon');
    const menu = document.querySelector('.menu__body');

    // Header scroll
    if (header) {
        const scrollThreshold = 100;

        const checkScroll = () => {
            header.classList.toggle(
                '_header-scroll',
                window.scrollY >= scrollThreshold
            );
        };

        checkScroll();
        window.addEventListener('scroll', checkScroll, { passive: true });
    }

    // Burger menu
    if (burgerMenu && menu) {
        burgerMenu.addEventListener('click', () => {
            menu.classList.toggle('menu__body--active');
            burgerMenu.classList.toggle('menu__icon--active');
            document.body.classList.toggle('body--lock');
        });
    }

});

var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);


new Swiper('.top-villas__slider', {

    slidesPerView: 3,
    spaceBetween: 40,

    loop: true,

    pagination: false,

    navigation: {
      nextEl: '.top-villas__slider-navigation-next',
      prevEl: '.top-villas__slider-navigation-prev',
    },

    breakpoints: {

        0: {
            slidesPerView: 1,
            spaceBetween: 16,
        },

        480: {
            slidesPerView: 2,
            spaceBetween: 16,
        },

        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },

        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
        },

        1440: {
          spaceBetween: 40,
        }

    }

});


var swiper = new Swiper('.slide-top-villas__gallery', {
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
});

var acc = document.getElementsByClassName("faq__item");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

const textElement = document.querySelector('.text-banner__text');

if (textElement) {
  // Розбиваємо текст на літери одразу при завантаженні
  const textContent = textElement.textContent.trim();
  textElement.innerHTML = textContent
    .split('')
    .map(char => `<span>${char}</span>`)
    .join('');

  const letters = textElement.querySelectorAll('span');

  const startTyping = () => {
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.classList.add('is-visible');
      }, index * 35);
    });
  };

  // Перевірка, раптом клас уже є при завантаженні
  if (textElement.classList.contains('_watcher-view')) {
    startTyping();
  } else {
    // Стежимо за зміною класів елемента
    const observer = new MutationObserver(() => {
      if (textElement.classList.contains('_watcher-view')) {
        startTyping();
        observer.disconnect(); // Зупиняємо стеження після запуску
      }
    });

    observer.observe(textElement, { attributes: true, attributeFilter: ['class'] });
  }
}
