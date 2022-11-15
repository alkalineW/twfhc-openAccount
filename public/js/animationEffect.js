$(function () {
  var start = null

  function keyVisualPopup() {
    var keyVisualPopupTl = gsap.timeline()
    var keyVisualDecoPopupTlB = gsap.timeline()
    var keyVisualDecoPopupTlCharacter = gsap.timeline()

    keyVisualPopupTl.staggerFrom(
      ['.kv-title'],
      0.7,
      {
        opacity: 0,
        scale: 0.8,
        transformOrigin: 'center',
        ease: Elastic.easeOut.config(1, 0.6),
        onComplete: function () {},
        // stagger: function () {
        //     // do someyhing when kv pop up
        //     // stagger 會因為序列中有幾個元素就執行幾次..
        // }
      },
      0.2
    )

    keyVisualDecoPopupTlB.staggerFrom(
      ['#kv-bg' , '#kv-house' ],
      1,
      {
        transform: 'translateY(800px)',
        scale: 1,
        opacity: 0,
        stagger:function(){
          amount: .5
        }
      },
      {
        transform: 'translateY(0px)',
      },
      0
    )
    keyVisualDecoPopupTlCharacter.staggerFrom(
      [ '#kv-sofa' , '#kv-boy' , '#kv-girl' ],
      .7,
      {
        transform: 'translateX(-900px)',
        opacity: 0,
        stagger:function(){
          amount: .5
        }
      },
      {
        transform: 'translateX(0px)',
      },
      2
    )
  }

  function openingAnimate(timestamp) {
    !start ? (start = timestamp) : (start = null)
    var progress = timestamp - start
    // if elapsed time less than .8s call raf continuously
    if (progress < 800) {
      window.requestAnimationFrame(openingAnimate)
    }

    if (progress > 800) {
      keyVisualPopup()
    }
  }

  // if (window.document.documentMode == undefined) {
  //   console.log('not ie browser')

  // }
  window.requestAnimationFrame(openingAnimate)
})
