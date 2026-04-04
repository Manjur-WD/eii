(function ($) {
  "use strict";
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image
    07. Hero Slider Active 
    08. Global Slider
    09. Ajax Contact Form
    10. Popup Side Menu   
    11. Magnific Popup
    12. Section Position
    13. Filter
    14. One Page Nav
    15. WOW.js Animation
    16. Color Plate Js
    17. Animate Counter Js
    18. Shape Mockup 
    19. Custom Tab
    20. Countdown Js
  */
  /*=================================
      JS Index End
  ==================================*/
  /*



  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend(
      {
        menuToggleBtn: ".vs-menu-toggle",
        bodyToggleClass: "vs-body-visible",
        subMenuClass: "vs-submenu",
        subMenuParent: "vs-item-has-children",
        subMenuParentToggle: "vs-active",
        meanExpandClass: "vs-mean-expand",
        appendElement: '<span class="vs-mean-expand"></span>',
        subMenuToggleClass: "vs-open",
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = "." + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css("display", "none");
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find("li").each(function () {
        var submenu = $(this).find("ul");
        submenu.addClass(opt.subMenuClass);
        submenu.css("display", "none");
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev("a").append(opt.appendElement);
        submenu.next("a").append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next("ul").slideToggle(opt.toggleSpeed);
          $($element).next("ul").toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev("ul").slideToggle(opt.toggleSpeed);
          $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = "." + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on("click", function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on("click", function () {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on("click", function (e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find("div").on("click", function (e) {
        e.stopPropagation();
      });
    });
  };

  $(".vs-menu-wrapper").vsmobilemenu();

  $(".vs-mobile-menu ul li a").on("click", function () {
    $(".vs-menu-wrapper").removeClass("vs-body-visible");
  });

  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = "";

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css("height");
    $targetMenu.parent().css("min-height", height);
    if ($(window).scrollTop() > 800) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      }
    } else {
      $targetMenu.parent().css("min-height", "").removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    }
    lastScrollTop = st;
  }
  $(window).on("scroll", function () {
    stickyMenu($(".sticky-active"), "active", "will-sticky");
  });

  /*---------- 06.Set Background Image ----------*/
  if ($("[data-bg-src]").length > 0) {
    $("[data-bg-src]").each(function () {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
    });
  }

  /*----------- 07. Global Slider ----------*/
  $(".vs-carousel").each(function () {
    var asSlide = $(this);

    // Collect Data
    function d(data) {
      return asSlide.data(data);
    }

    // Custom Arrow Button
    var prevButton =
      '<button type="button" class="slick-prev"><i class="' +
      d("prev-arrow") +
      '"></i></button>',
      nextButton =
        '<button type="button" class="slick-next"><i class="' +
        d("next-arrow") +
        '"></i></button>';

    // Check for arrow wrapper
    if (d("arrows") == true) {
      if (!asSlide.closest(".arrow-wrap").length) {
        asSlide.closest(".container").parent().addClass("arrow-wrap");
      }
    }

    asSlide.slick({
      dots: d("dots") ? true : false,
      fade: d("fade") ? true : false,
      arrows: d("arrows") ? true : false,
      speed: d("speed") ? d("speed") : 500,
      asNavFor: d("asnavfor") ? d("asnavfor") : false,
      autoplay: d("autoplay") == false ? false : true,
      infinite: d("infinite") == false ? false : true,
      slidesToShow: d("slide-show") ? d("slide-show") : 1,
      adaptiveHeight: d("adaptive-height") ? true : false,
      centerMode: d("center-mode") ? true : false,
      autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
      centerPadding: d("center-padding") ? d("center-padding") : "0",
      focusOnSelect: d("focuson-select") == false ? false : true,
      pauseOnFocus: d("pauseon-focus") ? true : false,
      pauseOnHover: d("pauseon-hover") ? true : false,
      variableWidth: d("variable-width") ? true : false,
      vertical: d("vertical") ? true : false,
      verticalSwiping: d("vertical") ? true : false,
      prevArrow: d("prev-arrow")
        ? prevButton
        : '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: d("next-arrow")
        ? nextButton
        : '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
      rtl: $("html").attr("dir") == "rtl" ? true : false,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            arrows: d("xl-arrows") ? true : false,
            dots: d("xl-dots") ? true : false,
            slidesToShow: d("xl-slide-show")
              ? d("xl-slide-show")
              : d("slide-show"),
            centerMode: d("xl-center-mode") ? true : false,
            centerPadding: d("xl-center-padding")
              ? d("xl-center-padding")
              : "0",
          },
        },
        {
          breakpoint: 1400,
          settings: {
            arrows: d("ml-arrows") ? true : false,
            dots: d("ml-dots") ? true : false,
            slidesToShow: d("ml-slide-show")
              ? d("ml-slide-show")
              : d("slide-show"),
            centerMode: d("ml-center-mode") ? true : false,
            centerPadding: d("ml-center-padding")
              ? d("ml-center-padding")
              : "0",
          },
        },
        {
          breakpoint: 1200,
          settings: {
            arrows: d("lg-arrows") ? true : false,
            dots: d("lg-dots") ? true : false,
            slidesToShow: d("lg-slide-show")
              ? d("lg-slide-show")
              : d("slide-show"),
            centerMode: d("lg-center-mode") ? true : false,
            centerPadding: d("lg-center-padding")
              ? d("lg-center-padding")
              : "0",
          },
        },
        {
          breakpoint: 992,
          settings: {
            arrows: d("md-arrows") ? true : false,
            dots: d("md-dots") ? true : false,
            slidesToShow: d("md-slide-show") ? d("md-slide-show") : 1,
            centerMode: d("md-center-mode") ? true : false,
            centerPadding: d("md-center-padding")
              ? d("md-center-padding")
              : "0",
          },
        },
        {
          breakpoint: 767,
          settings: {
            arrows: d("sm-arrows") ? true : false,
            dots: d("sm-dots") ? true : false,
            slidesToShow: d("sm-slide-show") ? d("sm-slide-show") : 1,
            centerMode: d("sm-center-mode") ? true : false,
            centerPadding: d("sm-center-padding")
              ? d("sm-center-padding")
              : "0",
          },
        },
        {
          breakpoint: 576,
          settings: {
            arrows: d("xs-arrows") ? true : false,
            dots: d("xs-dots") ? true : false,
            slidesToShow: d("xs-slide-show") ? d("xs-slide-show") : 1,
            centerMode: d("xs-center-mode") ? true : false,
            centerPadding: d("xs-center-padding")
              ? d("xs-center-padding")
              : "0",
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });
  $("#brand-slider1").each(function () {
    var asSlide = $(this);

    // Collect Data
    function d(data) {
      return asSlide.data(data);
    }

    asSlide.slick({
      dots: d("dots") ? true : false,
      fade: d("fade") ? true : false,
      arrows: d("arrows") ? true : false,
      speed: d("speed") ? d("speed") : 500,
      asNavFor: d("asnavfor") ? d("asnavfor") : false,
      autoplay: d("autoplay") == false ? false : true,
      infinite: d("infinite") == false ? false : true,
      slidesToShow: d("slide-show") ? d("slide-show") : 1,
      adaptiveHeight: d("adaptive-height") ? true : false,
      centerMode: d("center-mode") ? true : false,
      autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 1000,
      centerPadding: d("center-padding") ? d("center-padding") : "0",
      focusOnSelect: d("focuson-select") == false ? false : true,
      pauseOnFocus: d("pauseon-focus") ? true : false,
      pauseOnHover: d("pauseon-hover") ? true : false,
      variableWidth: d("variable-width") ? true : false,
      vertical: d("vertical") ? true : false,
      verticalSwiping: d("vertical") ? true : false,
      rtl: $("html").attr("dir") == "rtl" ? true : false,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            arrows: d("xs-arrows") ? true : false,
            dots: d("xs-dots") ? true : false,
            slidesToShow: d("xs-slide-show") ? d("xs-slide-show") : 3,
            centerMode: d("xs-center-mode") ? true : false,
            centerPadding: d("xs-center-padding")
              ? d("xs-center-padding")
              : "0",
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });

  // Function For Custom Arrow Btn
  $.fn.slickGoNext = function () {
    $(this).each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-next")).slick("slickNext");
      });
    });
  };

  $.fn.slickGoPrev = function () {
    $(this).each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-prev")).slick("slickPrev");
      });
    });
  };

  $("[data-slick-next]").slickGoNext();
  $("[data-slick-prev]").slickGoPrev();

  /*----------- 08. Ajax Contact Form ----------*/
  function ajaxContactForm(selectForm) {
    var form = selectForm;
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
      '[name="name"],[name="email"],[name="phone"],[name="message"]'; // Remove [name="subject"]
    var formMessages = $(selectForm).next(".form-messages");

    function sendContact() {
      var formData = $(form).serialize();
      var valid;
      valid = validateContact();
      if (valid) {
        jQuery
          .ajax({
            url: $(form).attr("action"),
            data: formData,
            type: "POST",
          })
          .done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            formMessages.removeClass("error");
            formMessages.addClass("success");
            // Set the message text.
            formMessages.text(response);
            // Clear the form.
            $(form + ' input:not([type="submit"]),' + form + " textarea").val(
              ""
            );
          })
          .fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            formMessages.removeClass("success");
            formMessages.addClass("error");
            // Set the message text.
            if (data.responseText !== "") {
              formMessages.html(data.responseText);
            } else {
              formMessages.html(
                "Oops! An error occurred and your message could not be sent."
              );
            }
          });
      }
    }

    function validateContact() {
      var valid = true;
      var formInput;
      function unvalid($validation) {
        $validation = $validation.split(",");
        for (var i = 0; i < $validation.length; i++) {
          formInput = form + " " + $validation[i];
          if (!$(formInput).val()) {
            $(formInput).addClass(invalidCls);
            valid = false;
          } else {
            $(formInput).removeClass(invalidCls);
            valid = true;
          }
        }
      }
      unvalid($validation);

      if (
        !$(form + " " + $email).val() ||
        !$(form + " " + $email)
          .val()
          .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
      ) {
        $(form + " " + $email).addClass(invalidCls);
        valid = false;
      } else {
        $(form + " " + $email).removeClass(invalidCls);
        valid = true;
      }
      return valid;
    }

    $(form).on("submit", function (element) {
      element.preventDefault();
      sendContact();
    });
  }
  ajaxContactForm(".ajax-contact");

  /*---------- 09. Popup Side Menu ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on("click", function (e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
    var sideMenuChild = $sideMenu + " > div";
    $(sideMenuChild).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenuCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
  }
  popupSideMenu(
    ".sidemenu-wrapper",
    ".sideMenuToggler",
    ".sideMenuCls",
    "show"
  );

  /*----------- 10. Magnific Popup ----------*/
  /* magnificPopup img view */
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /* magnificPopup video view */
  $(".popup-video").magnificPopup({
    type: "iframe",
  });



  /*----------- 13. One Page Nav ----------*/
  function onePageNav(element) {
    if ($(element).length > 0) {
      $(element).each(function () {
        $(this)
          .find("a")
          .each(function () {
            $(this).on("click", function (e) {
              var target = $(this.getAttribute("href"));
              if (target.length) {
                e.preventDefault();
                event.preventDefault();
                $("html, body")
                  .stop()
                  .animate(
                    {
                      scrollTop: target.offset().top - 10,
                    },
                    1000
                  );
              }
            });
          });
      });
    }
  }
  onePageNav(".onepage-nav, .main-menu, .vs-mobile-menu");

  /*----------- 14. WOW.js Animation ----------*/
  var wow = new WOW({
    boxClass: "wow", // animated element css class (default is wow)
    animateClass: "wow-animated", // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: false, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    scrollContainer: null, // optional scroll container selector, otherwise use window,
    resetAnimation: false, // reset animation on end (default is true)
  });
  wow.init();

  /*----------- 15. Indicator Position ----------*/
  function setPos(element) {
    var indicator = element.siblings(".indicator"),
      btnWidth = element.css("width"),
      btnHiehgt = element.css("height"),
      btnLeft = element.position().left,
      btnTop = element.position().top;
    element.addClass("active").siblings().removeClass("active");
    indicator.css({
      left: btnLeft + "px",
      top: btnTop + "px",
      width: btnWidth,
      height: btnHiehgt,
    });
  }

  $(".login-tab a").each(function () {
    var link = $(this);
    if (link.hasClass("active")) setPos(link);
    link.on("mouseover", function () {
      setPos($(this));
    });
  });


  /*----------- 17. Animate Counter Js ----------*/
  // Function to animate the counters
  function animateCounter(counter) {
    const targetValue = parseInt(counter.getAttribute("data-counter"));
    const animationDuration = 1000; // Set the desired animation duration in milliseconds
    const startTimestamp = performance.now();

    function updateCounter(timestamp) {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / animationDuration, 1);

      const currentValue = Math.floor(targetValue * progress);
      counter.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Start the counting animation when the counter is intersecting with the viewport
  function startCounterAnimation(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector(".counters");
        animateCounter(counter);
        // observer.unobserve(entry.target);
      }
    });
  }

  // Create an intersection observer instance
  const observer = new IntersectionObserver(startCounterAnimation, {
    rootMargin: "0px",
    threshold: 0.2, // Adjust the threshold value as needed (0.2 means 20% visibility)
  });

  // Observe all counter blocks
  const counterBlocks = document.querySelectorAll(".count-start");
  counterBlocks.forEach((counterBlock) => {
    observer.observe(counterBlock);
  });

  /*----------- 18. Shape Mockup ----------*/
  $.fn.shapeMockup = function () {
    var $shape = $(this);
    $shape.each(function () {
      var $currentShape = $(this),
        shapeTop = $currentShape.data("top"),
        shapeRight = $currentShape.data("right"),
        shapeBottom = $currentShape.data("bottom"),
        shapeLeft = $currentShape.data("left");
      $currentShape
        .css({
          top: shapeTop,
          right: shapeRight,
          bottom: shapeBottom,
          left: shapeLeft,
        })
        .removeAttr("data-top")
        .removeAttr("data-right")
        .removeAttr("data-bottom")
        .removeAttr("data-left")
        .parent()
        .addClass("shape-mockup-wrap");
    });
  };

  if ($(".shape-mockup")) {
    $(".shape-mockup").shapeMockup();
  }

})(jQuery);


$(document).ready(function () {

  // 1. Aapka JSON Data
  const coursesData = [
    {
      id: 1,
      title: "Executive Program in Event Management",
      rating: 4.8,
      duration: "8 Months",
      status: "Open Enrolled",
      price: "₹59,999 + GST",
      about: "Designed for the ambitious beginner, the Executive Program is your gateway into the fast-paced world of event management. Backed by the 25-year legacy of Abybaby Events, this course strips away the theory and focuses on what actually works on the ground. In just 8 months, you will transition from a student to a field-ready professional capable of executing seamless events.",
      subjectsCovered: [
        "Corporate Event", "Social Event", "BTL Activation & Promotion",
        "Event Production & Budgeting", "I.P Creation & Event Entrepreneurship", "Digital marketing"
      ],
      keyBenefits: [
        "Industry-Ready in 8 Months", "The Abybaby Advantage",
        "Practical Focus", "360-Degree Exposure"
      ],
      studentFacilities: [
        "Expert Faculty (Veterans)", "Comprehensive Curriculum",
        "Digital Learning Resources", "Event Training & Guidance", "Guaranteed Internship Opportunities"
      ]
    },
    {
      id: 2,
      title: "Advance Executive Program in Event Management",
      rating: 4.9,
      duration: "15 Months",
      status: "Open Enrolled",
      price: "₹99,999 + GST",
      about: "This is not just a course; it is a leadership pipeline. The Advance Executive Program is a premium, immersive journey designed for those who don't just want to participate in events but want to lead them. Spanning 15 months, this comprehensive diploma dives deep into the strategic, financial, and psychological aspects of event management.",
      subjectsCovered: [
        "Corporate Event", "Social Event", "Concert Management",
        "BTL Activation & Promotion", "Sports Event Management", "Graphics & Video",
        "AI in Marketing", "Event Production & Budgeting", "I.P Creation & Event Entrepreneurship",
        "M.I.C.E", "Digital marketing"
      ],
      keyBenefits: [
        "Strategic Mastery", "Premium Portfolio Building",
        "Leadership Development", "Advanced Tech Integration"
      ],
      studentFacilities: [
        "Expert Faculty (Veterans)", "Global-Standard Syllabus",
        "Digital Library Access", "Mentorship on Live Event Pressure", "Guaranteed Internship Opportunities"
      ]
    }
  ];

  // 2. Modal ko Fill karne ka Function (Window object pe attach kiya hai taaki onclick chal sake)
  window.populateModalContent = function (courseId) {

    // ID se data find karo
    const course = coursesData.find(c => c.id === courseId);

    // Agar data na mile toh wapas jao
    if (!course) return;

    // Text Elements Fill karna (jQuery .text() use karke)
    $('#modalCourseTitle').text(course.title);
    $('#modalCourseStatus').text(course.status);
    $('#modalCourseRating').text(course.rating);
    $('#modalCoursePrice').text(course.price);
    $('#modalCourseDuration').text(course.duration);
    $('#modalCourseAbout').text(course.about);

    // Subjects List create aur inject karna (jQuery $.map use karke)
    let subjectsHtml = $.map(course.subjectsCovered, function (sub) {
      return `<li class="mb-2"><i class="fas fa-check-circle text-theme me-2"></i> ${sub}</li>`;
    }).join('');
    $('#modalCourseSubjects').html(subjectsHtml);

    // Benefits List create aur inject karna
    let benefitsHtml = $.map(course.keyBenefits, function (ben) {
      return `<li class="mb-2"><i class="fas fa-star text-theme me-2"></i> ${ben}</li>`;
    }).join('');
    $('#modalCourseBenefits').html(benefitsHtml);

    // Facilities List create aur inject karna
    let facilitiesHtml = $.map(course.studentFacilities, function (fac) {
      return `<li class="mb-2"><i class="fas fa-award text-theme me-2"></i> ${fac}</li>`;
    }).join('');
    $('#modalCourseFacilities').html(facilitiesHtml);
  };

});

// Google Script ka URL sabse upar rakhein
const googleScriptURL = "https://script.google.com/macros/s/AKfycbxg7g0qv3gOwCekOlapNZoTE-hnVYnzd0-lOvG7cq6Vad3jRMMLF4KyKO-Ziy43mLLU/exec";

$(document).ready(function () {

  // Form submit event par direct function chalega
  $('#brochureForm').on('submit', async function (e) {
    e.preventDefault(); // Form ko submit hokar page refresh karne se rokna

    // Button ko processing state mein daalna
    const $submitBtn = $(this).find('button[type="submit"]');
    const originalText = $submitBtn.text();
    $submitBtn.text('Submitting...').prop('disabled', true);

    // 1. Form inputs se data nikalna
    const formData = {
      userName: $('#userName').val(),
      phoneNo: $('#userPhone').val(),
      email: $('#userEmail').val(),
      qualification: $('#userQualification').val()
    };

    console.log(formData);

    const userName = formData.userName;
    const phoneNo = formData.phoneNo;
    const email = formData.email;
    const qualification = formData.qualification;

    try {
      // 2. Ek hi function ke andar API (Google Script) ko data bhejna
      const res = await fetch(googleScriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName,
          phoneNo,
          email,
          qualification
        }),
        mode: 'no-cors',
      });

      console.log(res);

      // 3. Success Hone Par
      alert("Success! Your request is submitted. Click Ok to Download Brochure...");

      // Form ka data clear karna
      $('#brochureForm')[0].reset();

      // ----------------------------------------------------
      // NEW ADDITIONS: Force Download & Close Modal
      // ----------------------------------------------------

      // A. Force Download the PDF
      const downloadLink = document.createElement('a');
      downloadLink.href = 'assets/Brochure.pdf'; // Aapka PDF path
      downloadLink.download = 'EII_Brochure.pdf'; // User ke system me jis naam se save hoga
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // B. Modal ko close karna (Ye form ke parent modal ko dhundh kar hide kar dega)
      $('#brochureForm').closest('.modal').modal('hide');

      // (Optional) Agar Bootstrap 5 ka vanilla JS modal use kar rahe hain aur upar wala hide kaam na kare:
      // const modalElement = document.getElementById('YOUR_MODAL_ID'); // modal ka ID dalein
      // const modalInstance = bootstrap.Modal.getInstance(modalElement);
      // modalInstance.hide();

    } catch (error) {
      // 4. Error Aane Par
      alert("Ooops! There was a problem submitting your request. Please try again.");
      console.error("Submission Error:", error);

    } finally {
      // 5. Success ho ya Error, Button ko wapas pehle jaisa karna
      $submitBtn.text(originalText).prop('disabled', false);
    }
  });

});

// Google Script URL
const googleScriptURL2 = "https://script.google.com/macros/s/AKfycbwHdFT_eVdmJCzhNsjaNu2mhpoXprTWP4_NE7_mGlG5latIJPK7pagT2uf3bp2M_1AfKw/exec";

$(document).ready(function () {

  // Registration Form Submit Event (Naya ID use kiya hai)
  $('#registration-form').on('submit', async function (e) {
    e.preventDefault(); // Page refresh rokna

    // 1. Button state update karna
    const $form = $(this);
    const $submitBtn = $form.find('button[type="submit"]');
    const originalText = $submitBtn.text();
    $submitBtn.text('Please wait...').prop('disabled', true);

    // Message dikhane wala container
    const $messageContainer = $form.find('.form-messages');
    $messageContainer.text('').show(); // Purane message clear karna aur show karna

    // 2. Form fields se data nikalna
    const formData = {
      userName: $('#name').val(),
      phoneNo: $('#phone').val(),
      email: $('#email').val(),
      course: $('#course').val() // Dropdown ka selected value
    };

    try {
      // 3. Data Google Script par bhejna (CORS bypass ke sath)
      await fetch(googleScriptURL2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        mode: 'no-cors', 
      });

      // 4. Success State (Message set karna aur form reset karna)
      $messageContainer
        .css({'color': 'green', 'font-weight': 'bold'})
        .text("Success! Your registration is complete. Our counselor will contact you soon.");
      
      $form[0].reset(); // Form fields ko blank kar dena

      // 5. Modal ko close karna (2 second ka delay taaki user message padh sake)
      setTimeout(() => {
        $form.closest('.modal').modal('hide');
      }, 2000);

    } catch (error) {
      // 6. Error State
      $messageContainer
        .css({'color': 'red', 'font-weight': 'bold'})
        .text("Ooops! Something went wrong. Please try again.");
      console.error("Registration Form Error:", error);

    } finally {
      // 7. Button ko wapas pehle jaisa karna
      $submitBtn.text(originalText).prop('disabled', false);

      // (Optional) 5 second baad text message ko fadeOut karke gayab kar dena
      setTimeout(() => {
        $messageContainer.fadeOut('slow', function() {
            $(this).text('').show();
        });
      }, 5000);
    }
  });

  // Auto Popup Form Submit Event
  $('#popup-registration-form').on('submit', async function (e) {
    e.preventDefault(); 

    const $form = $(this);
    const $submitBtn = $form.find('button[type="submit"]');
    const originalText = $submitBtn.text();
    $submitBtn.text('Please wait...').prop('disabled', true);

    const $messageContainer = $form.find('.form-messages');
    $messageContainer.text('').show();

    const formData = {
      userName: $('#popup-name').val(),
      phoneNo: $('#popup-phone').val(),
      email: $('#popup-email').val(),
      course: $('#popup-course').val() 
    };

    try {
      await fetch(googleScriptURL2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        mode: 'no-cors', 
      });

      $messageContainer
        .css({'color': 'green', 'font-weight': 'bold'})
        .text("Success! Our counselor will contact you soon.");
      
      $form[0].reset(); 

      setTimeout(() => {
        $form.closest('.modal').modal('hide');
      }, 2000);

    } catch (error) {
      $messageContainer
        .css({'color': 'red', 'font-weight': 'bold'})
        .text("Ooops! Something went wrong. Please try again.");
      console.error("Popup Registration Form Error:", error);

    } finally {
      $submitBtn.text(originalText).prop('disabled', false);

      setTimeout(() => {
        $messageContainer.fadeOut('slow', function() {
            $(this).text('').show();
        });
      }, 5000);
    }
  });

  // Auto show popup modal after 12 seconds
  setTimeout(() => {
    // Check if another modal is currently open. If not, open the autoPopupModal.
    if (!$('.modal.show').length) {
      $('#autoPopupModal').modal('show');
    }
  }, 12000);

});