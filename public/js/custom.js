$(function () {
  // ie seens not support svg classList add & remove
  !(function () {
    function copyProperty(prop, from, to) {
      var desc = Object.getOwnPropertyDescriptor(from, prop);
      Object.defineProperty(to, prop, desc);
    }
    if (
      'classList' in HTMLElement.prototype &&
      !('classList' in Element.prototype)
    ) {
      // ie11
      copyProperty('classList', HTMLElement.prototype, Element.prototype);
    }
    if (
      'children' in HTMLElement.prototype &&
      !('children' in Element.prototype)
    ) {
      // webkit, chrome, ie
      copyProperty('children', HTMLElement.prototype, Element.prototype);
    }
    if (
      'contains' in HTMLElement.prototype &&
      !('contains' in Element.prototype)
    ) {
      // ie11
      copyProperty('contains', HTMLElement.prototype, Element.prototype);
    }
    if (
      'getElementsByClassName' in HTMLElement.prototype &&
      !('getElementsByClassName' in Element.prototype)
    ) {
      // ie11
      copyProperty(
        'getElementsByClassName',
        HTMLElement.prototype,
        Element.prototype
      );
    }
  })();

  if (!('classList' in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
      get: function () {
        var self = this;
        function update(fn) {
          return function (value) {
            var classes = self.className.split(/\s+/g),
              index = classes.indexOf(value);

            fn(classes, index, value);
            self.className = classes.join(' ');
          };
        }

        return {
          add: update(function (classes, index, value) {
            if (!~index) classes.push(value);
          }),

          remove: update(function (classes, index) {
            if (~index) classes.splice(index, 1);
          }),

          toggle: update(function (classes, index, value) {
            if (~index) classes.splice(index, 1);
            else classes.push(value);
          }),

          contains: function (value) {
            return !!~self.className.split(/\s+/g).indexOf(value);
          },

          item: function (i) {
            return self.className.split(/\s+/g)[i] || null;
          },
        };
      },
    });
  }

  // Create Element.remove() function if not exist
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }

  // old browser do NOT support nodeList.forEach()!!!
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0, l = this.length; i < l; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  //--prepend polyfill
  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('prepend')) {
        return;
      }
      Object.defineProperty(item, 'prepend', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function prepend() {
          var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();

          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(
              isNode ? argItem : document.createTextNode(String(argItem))
            );
          });

          this.insertBefore(docFrag, this.firstChild);
        },
      });
    });
  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);

  //--scroll to position
  // var navItem = document.getElementsByClassName('scroll-anchor')
  // var backToTop = document.getElementById('back-to-top')

  // function scrollBtnScroll(targetElm) {
  //   var isClicked = false; // set isScrolling flag prevent mutiple scroll evt
  //   for (var i = 0, l = targetElm.length; i < l; i++) {
  //     targetElm[i].addEventListener('click', function (evt) {
  //       evt.preventDefault();
  //       isClicked = true;
  //       if (isClicked) {
  //         var anchorTarget = '#' + $(this).attr('data-target');
  //         var targetDOM = $(anchorTarget);
  //         var targetDOMPosY;
  //         targetDOMPosY = targetDOM.offset().top; // minus top-nav-menu height
  //         $('html , body').animate(
  //           { scrollTop: targetDOMPosY },
  //           800,
  //           function () {
  //             isClicked = false;
  //           }
  //         );
  //       }
  //     });
  //   }
  // }

  // scrollBtnScroll(navItem);

  var sideBtn = document.getElementById('side-btn-wrap');
  var windowWidth = window.innerWidth;

  function showSideBtn(scrollVal) {
    if (windowWidth <= 576) {
      if (scrollVal > 340) {
        sideBtn.style.transform = 'translateX(0)';
      } else {
        sideBtn.style.transform = 'translateX(140%)';
      }
    } else {
      sideBtn.style.transform = 'translateX(0)';
    }
  }

  $(window).scroll(function () {
    var scrollTopVal = $(document).scrollTop();
    showSideBtn(scrollTopVal);
  });

  //-waypoint
  $('.waypoint-col')
    .css('opacity', 0)
    .waypoint(
      function (direction) {
        if (direction === 'down') {
          $(this.element).animate({ opacity: 1 });
        } else {
          $(this.element).animate({ opacity: 0 });
        }
      },
      {
        offset: '50%',
      }
    );

  $('.branch-col')
    .css('opacity', 0)
    .waypoint(
      function (direction) {
        if (direction === 'down') {
          $(this.element).animate({ opacity: 1 });
        } else {
          $(this.element).animate({ opacity: 0 });
        }
      },
      {
        offset: '50%',
      }
    );

  // staggered-img
  let nIntervId;
  let currentIdx = 0;

  function animateStagger() {
    let elm = document.getElementById('staggered-wrap').children;
    let elmIdx = elm.length;
    nIntervId = setInterval(showStagger.bind(null, elm, elmIdx), 400);
  }

  function showStagger(elm, elmIdx) {
    if (currentIdx == elmIdx) {
      clearInterval(nIntervId);
    } else {
      elm[currentIdx].classList.remove('opacity-5');
    }
    currentIdx += 1;
  }

  $('#staggered-wrap').waypoint(
    function (direction) {
      if (direction === 'down') {
        animateStagger();
      } else {
      }
    },
    {
      offset: '50%',
    }
  );

  // handle show / hide tabs
  let tabBtns = document.getElementsByClassName('tab-btn');
  for (let i = 0; i < tabBtns.length; i++) {
    tabBtns[i].addEventListener('click', tabHandle);
  }

  function tabHandle() {
    // this = e.target
    let tabContent = document.getElementsByClassName('tab-content');
    let toggleContent = document.getElementsByClassName(
      'has-account-show-mobile'
    );
    let unactiveBtn = '';
    // already active
    if (this.className.indexOf('active') !== -1) {
    } else {
      this.classList.add('active');
    }

    // click no account
    if (this.parentElement.nextElementSibling) {
      tabContent[0].classList.add('block');
      tabContent[0].classList.remove('hidden');

      tabContent[1].classList.add('hidden');
      unactiveBtn = this.parentElement.nextElementSibling.firstElementChild;
      toggleClass(toggleContent, 'hidden', true);
    } else {
      // click has account
      tabContent[1].classList.add('block');
      tabContent[1].classList.remove('hidden');

      tabContent[0].classList.add('hidden');
      unactiveBtn = this.parentElement.previousElementSibling.firstElementChild;
      toggleClass(toggleContent, 'hidden', false);
    }
    unactiveBtn.classList.remove('active');
  }

  function toggleClass(elm, className, status) {
    let l = elm.length;
    if (status) {
      for (let i = 0; i < l; i++) {
        elm[i].classList.add(className);
      }
    } else {
      for (let i = 0; i < l; i++) {
        elm[i].classList.remove(className);
      }
    }
  }
});
