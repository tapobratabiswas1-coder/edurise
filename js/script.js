/* EduRise Coaching Centre — Main Script */

(function () {
  'use strict';

  /* CONFIG */

  var WA_NUMBER = '916295470093';

  /* HELPERS */
  function openWhatsApp(message) {
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message), '_blank');
  }

  function showSuccess(btn, original) {
    btn.innerHTML = '✓ Sent via WhatsApp!';
    btn.style.background = 'linear-gradient(135deg,#059669,#10B981)';
    btn.disabled = true;
    setTimeout(function () {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }

  function validatePhone(phone) {
    return /^[0-9+\s\-]{7,15}$/.test(phone);
  }

  function markError(el, msg) {
    if (!el) return;
    el.style.borderColor = '#EF4444';
    var old = el.parentNode.querySelector('.field-error');
    if (old) old.remove();
    var hint = document.createElement('p');
    hint.className = 'field-error';
    hint.style.cssText = 'color:#EF4444;font-size:.78rem;margin-top:4px;';
    hint.textContent = msg;
    el.parentNode.appendChild(hint);
  }

  function clearError(el) {
    if (!el) return;
    el.style.borderColor = '';
    var hint = el.parentNode.querySelector('.field-error');
    if (hint) hint.remove();
  }

  function $(id) { return document.getElementById(id); }

  /* NAVBAR */

  var navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* MOBILE MENU */
  
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  var closeBtn = document.querySelector('.mobile-nav .close-btn');

  function closeMobile() {
    hamburger && hamburger.classList.remove('active');
    mobileNav && mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileNav && mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  closeBtn && closeBtn.addEventListener('click', closeMobile);
  mobileNav && mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMobile);
  });

  /* ACTIVE NAV */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (a) {
    if (a.getAttribute('href') === currentPage ||
      (currentPage === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* SCROLL-TO-TOP */
  var scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', function () {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollTopBtn && scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* SCROLL REVEAL */

  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { revealObs.observe(el); });


  /* COUNTERS */

  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var step = target / (2000 / 16);
    var cur = 0;
    var timer = setInterval(function () {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = Math.floor(cur) + suffix;
    }, 16);
  }
  var cntObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { animateCounter(entry.target); cntObs.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(function (c) { cntObs.observe(c); });


  /* TESTIMONIAL SLIDER */

  var track = document.querySelector('.testimonial-track');
  var dots = document.querySelectorAll('.dot');
  var prevBtn = document.querySelector('.slider-btn.prev');
  var nextBtn = document.querySelector('.slider-btn.next');

  if (track) {
    var cur = 0;
    var total = track.querySelectorAll('.testimonial-card').length;
    var auto;

    function goTo(idx) {
      cur = (idx + total) % total;
      track.style.transform = 'translateX(-' + (cur * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === cur); });
    }

    function startAuto() { auto = setInterval(function () { goTo(cur + 1); }, 5500); }

    prevBtn && prevBtn.addEventListener('click', function () { clearInterval(auto); goTo(cur - 1); startAuto(); });
    nextBtn && nextBtn.addEventListener('click', function () { clearInterval(auto); goTo(cur + 1); startAuto(); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { clearInterval(auto); goTo(i); startAuto(); }); });
    startAuto();
  }

  /* FAQ */

  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!open) item.classList.add('open');
    });
  });

  /* GALLERY FILTER */

  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item[data-cat]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        item.style.display = (cat === 'all' || item.getAttribute('data-cat') === cat) ? 'block' : 'none';
      });
    });
  });

  /* BEFORE / AFTER SLIDER */

  var baSlider = document.querySelector('.ba-slider');
  if (baSlider) {
    var baBefore = baSlider.querySelector('.ba-before');
    var baHandle = baSlider.querySelector('.ba-handle');
    var baDrag = false;

    function updateBA(x) {
      var rect = baSlider.getBoundingClientRect();
      var pct = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
      baBefore.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      baHandle.style.left = pct + '%';
    }

    baSlider.addEventListener('mousedown', function (e) { baDrag = true; updateBA(e.clientX); });
    window.addEventListener('mousemove', function (e) { if (baDrag) updateBA(e.clientX); });
    window.addEventListener('mouseup', function () { baDrag = false; });
    baSlider.addEventListener('touchstart', function (e) { baDrag = true; updateBA(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', function (e) { if (baDrag) updateBA(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', function () { baDrag = false; });
  }

  /*  WHATSAPP CONTACT FORM */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameEl = $('cf-name');
      var phoneEl = $('cf-phone');
      var emailEl = $('cf-email');
      var subjectEl = $('cf-subject');
      var msgEl = $('cf-message');

      [nameEl, phoneEl, emailEl, subjectEl, msgEl].forEach(clearError);

      var name = nameEl ? nameEl.value.trim() : '';
      var phone = phoneEl ? phoneEl.value.trim() : '';
      var email = emailEl ? emailEl.value.trim() : '';
      var subject = subjectEl ? subjectEl.value.trim() : '';
      var message = msgEl ? msgEl.value.trim() : '';

      var ok = true;
      if (!name) { markError(nameEl, 'Please enter your name.'); ok = false; }
      if (!phone) { markError(phoneEl, 'Please enter your phone number.'); ok = false; }
      else if (!validatePhone(phone)) { markError(phoneEl, 'Enter a valid phone number.'); ok = false; }
      if (!subject) { markError(subjectEl, 'Please select a subject.'); ok = false; }
      if (!message) { markError(msgEl, 'Please enter your message.'); ok = false; }
      if (!ok) return;

      var waMsg =
        '\uD83C\uDF93 *New Enquiry from EduRise Website*\n\n' +
        '\uD83D\uDC64 *Name:* ' + name + '\n' +
        '\uD83D\uDCDE *Phone:* ' + phone + '\n' +
        '\uD83D\uDCE7 *Email:* ' + (email || 'Not provided') + '\n' +
        '\uD83D\uDCCB *Subject:* ' + subject + '\n' +
        '\uD83D\uDCAC *Message:* ' + message;

      var btn = contactForm.querySelector('[type="submit"]');
      openWhatsApp(waMsg);
      showSuccess(btn, btn.innerHTML);
      contactForm.reset();
    });
  }

  /*  WHATSAPP ADMISSION FORM */
  var admissionForm = document.getElementById('admission-form');
  if (admissionForm) {
    admissionForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var stuEl = $('af-student-name');
      var classEl = $('af-class');
      var parEl = $('af-parent-name');
      var phoneEl = $('af-phone');
      var emailEl = $('af-email');
      var courseEl = $('af-course');
      var timingEl = $('af-timing');
      var noteEl = $('af-note');

      [stuEl, classEl, parEl, phoneEl, courseEl].forEach(clearError);

      var stu = stuEl ? stuEl.value.trim() : '';
      var cls = classEl ? classEl.value.trim() : '';
      var par = parEl ? parEl.value.trim() : '';
      var phone = phoneEl ? phoneEl.value.trim() : '';
      var email = emailEl ? emailEl.value.trim() : '';
      var course = courseEl ? courseEl.value.trim() : '';
      var timing = timingEl ? timingEl.value.trim() : '';
      var note = noteEl ? noteEl.value.trim() : '';

      var ok = true;
      if (!stu) { markError(stuEl, "Please enter the student's name."); ok = false; }
      if (!cls) { markError(classEl, 'Please select a class.'); ok = false; }
      if (!par) { markError(parEl, 'Please enter parent/guardian name.'); ok = false; }
      if (!phone) { markError(phoneEl, 'Please enter your phone number.'); ok = false; }
      else if (!validatePhone(phone)) { markError(phoneEl, 'Enter a valid phone number.'); ok = false; }
      if (!course) { markError(courseEl, 'Please select a course.'); ok = false; }
      if (!ok) return;

      var waMsg =
        '\uD83D\uDCDA *New Admission Enquiry \u2014 EduRise Coaching Centre*\n\n' +
        '\uD83C\uDF92 *Student Name:* ' + stu + '\n' +
        '\uD83C\uDFEB *Class / Level:* ' + cls + '\n' +
        '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67 *Parent Name:* ' + par + '\n' +
        '\uD83D\uDCDE *Phone:* ' + phone + '\n' +
        '\uD83D\uDCE7 *Email:* ' + (email || 'Not provided') + '\n' +
        '\uD83D\uDCD6 *Course:* ' + course + '\n' +
        '\u23F0 *Preferred Batch:* ' + (timing || 'Flexible') + '\n' +
        '\uD83D\uDCAC *Additional Note:* ' + (note || 'None');

      var btn = admissionForm.querySelector('[type="submit"]');
      openWhatsApp(waMsg);
      showSuccess(btn, btn.innerHTML);
      admissionForm.reset();
    });
  }

})();
