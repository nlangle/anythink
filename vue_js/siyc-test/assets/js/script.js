//register navbar
Vue.component('navbar-component', {
  template: '<nav id="primary-navbar" class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation"><div class="navbar-brand has-text-weight-bold"><div v-for="navItem in navItems" class="navbar-item" v-bind:class="navItem.classes" v-bind:href="navItem.href"><a v-bind:href="navItem.href" v-html="navItem.text"> {{navItem.text}}</a><div v-if="navItem.dropdown" class="navbar-dropdown"><a v-for="dropdownLink in navItem.dropdown" class="navbar-item" v-bind:href="dropdownLink.href" v-html="dropdownLink.text"></a></div></div></nav>',
  data: function() {
    return {
      navItems: [{
        classes: 'has-text-default is-hidden-mobile',
        href: 'index.html',
        text: 'Home',
      }, {
        classes: 'has-text-default is-hidden-mobile',
        href: 'about.html',
        text: 'About',
      }, {
        classes: 'has-text-default is-hidden-mobile is-hoverable has-dropdown',
        href: 'resources.html',
        text: 'Resources',
        dropdown: [{
          href: 'solar-curriculum.html',
          text: 'Solar Curriculum'
        }, {
          href: 'solar-shorts.html',
          text: 'Solar Shorts'
        }, {
          href: 'success-stories.html',
          text: 'Success Stories'
        }]
      }, {
        classes: 'siyc-home',
        href: '',
        text: '<img src="assets/img/logo_siyc.png" alt="Solar in Your Community home page"/>',
      }, {
        classes: 'has-text-default is-hidden-mobile',
        href: 'rules.html',
        text: 'Rules',
      }, {
        classes: 'has-text-default is-hidden-mobile',
        href: 'prize.html',
        text: 'Final Prize',
      }, {
        classes: 'has-text-default is-hidden-mobile',
        href: 'teams.html',
        text: 'Teams',
      }, ]
    }
  }
});
//mobile navbar
Vue.component('mobile-navbar-component', {
  template: '<nav id="mobile-navbar" class="navbar is-primary is-fixed-bottom is-hidden-tablet"><div class="navbar-menu" :class="{ \'is-active\': showNav }"><div class="navbar-start"><a v-for="navItem in navItems" class="navbar-item has-text-light" :href="navItem.href">{{navItem.text}}</a></div></div><div class="navbar-brand is-size-7 has-text-weight-bold"><a v-for="(navItem, index) in navItems" class="navbar-item" :href="navItem.href">{{navItem.text}}</a></div><div class="navbar-burger" @click="showNav = !showNav" :class="{ \'is-active\': showNav }"><span></span><span></span><span></span></div></div></nav>',
  data: function() {
    return {
      showNav: false,
      navItems: [{
        href: 'index.html',
        text: 'Home'
      }, {
        href: 'about.html',
        text: 'About'
      }, {
        href: 'resources.html',
        text: 'Resources',
      }, {
        href: 'rules.html',
        text: 'Rules'
      }, {
        href: 'prize.html',
        text: 'Final Prize'
      }, {
        href: 'teams.html',
        text: 'Teams'
      }, ]
    }
  },
});
Vue.component('footer-component', {
    template: '<footer class="footer has-text-white has-bg-cloud-burst"><div class="logos columns is-multiline is-mobile"><figure class="column image is-3-tablet is-6-mobile has-text-centered"><a href="http://energy.gov/eere/sunshot/sunshot-initiative"><img class="lazy-img" src="assets/img/quickload.png" data-src="assets/img/logo_sunshot.png" alt="Sunshot Logo"/></a></figure><figure class="column is-3-tablet is-6-mobile image"><a href="https://icma.org/"><img id="logo_icma" class="lazy-img" src="assets/img/quickload.png" data-src="assets/img/logo_icma_white.png" alt="NREL Logo"/></a></figure><figure class="column is-3-tablet is-6-mobile image"><a href="https://www.nrel.gov"><img id="nrel-logo" class="lazy-img" src="assets/img/quickload.png" data-src="assets/img/logo_nrel.png" alt="NREL Logo"/></a></figure><figure class="column image is-3-tablet is-6-mobile"><a href="https://energy.gov"><img class="lazy-img" src="assets/img/quickload.png"  data-src="assets/img/logo_doe.png" alt="U.S. Department of Energy Logo" /></a></figure></div><div class="columns is-multiline"><div class="column is-12 has-text-centered">The Solar in Your Community Challenge is sponsored by the U.S. DEPARTMENT OF ENERGY</div><div class="column is-6 has-text-centered"><a href="terms_and_conditions.html">Terms and Conditions</a></div><div class="column is-6  has-text-centered"><a href="solar.community@ee.doe.gov?subject=Solar in Your Community message">Contact Us</a></div></div></footer>',
});

//Root Instance
new Vue({
  el: '#app',
  data: {},
});

// Get IE or Edge browser version - assign polyfill for lack of modern CSS support
var version = detectIE();
if (version === 11) {
  document.getElementById("app").classList.add("ie");
}
/* detect IE */
function detectIE() {
  var ua = window.navigator.userAgent;
  //IE 11
  //ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }
  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }
  // other browser
    return false;
}

//lazy load images
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy-img"));
  var active = false;

  var lazyLoad = function() {
    if (active === false) {
      active = true;
      lazyImages.forEach(function(lazyImage) {
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy-img");
          lazyImages = lazyImages.filter(function(image) {
            return image !== lazyImage;
          });
          if (lazyImages.length === 0) {
            document.removeEventListener("scroll", lazyLoad);
            window.removeEventListener("resize", lazyLoad);
            window.removeEventListener("orientationchange", lazyLoad);
          }
      });
    }
  };

  if(document.querySelector('footer').getBoundingClientRect().top < window.innerHeight){lazyLoad();}
  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);

  //attach carousel
  //if(document.querySelector('#app.home').length > 1){
  if(document.querySelector('#app.home')){
    var carousels = bulmaCarousel.attach();
  }
});

//lazy background load
document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  var lazyBackgroundLoad = function() {
    lazyBackgrounds.forEach(function(item) {
      item.classList.add("visible");
    });
  };

  document.addEventListener("scroll", lazyBackgroundLoad);
  window.addEventListener("resize", lazyBackgroundLoad);
  window.addEventListener("orientationchange",lazyBackgroundLoad);
});

//set current primary navigation
if(document.getElementById('primary-navbar')){
  var currentPage = window.location.pathname.split('/').pop();
  var navTabs = document.querySelectorAll(".navbar-item");
  var arrayLength = navTabs.length;
  for (i=0; i<arrayLength; ++i) {
    if (i in navTabs) {
      var tabLink = navTabs[i];
      if(tabLink.getAttribute('href') === currentPage){
        tabLink.classList.add('current');
      }
    }
  }
}

//notifications
var rulesNotification = document.getElementById("new-notification");
if(rulesNotification){
  var deleteNotification = document.querySelectorAll("#new-notification .delete-notification");
  for (var i = 0; i < deleteNotification.length; i++) {
    deleteNotification[i].addEventListener('click', hideNotice);
  }
  function hideNotice(){
    rulesNotification.classList.add('hidden');
  }
}

//left nav current
var leftWayPoints = document.querySelectorAll(".left-nav a");
var sectionAnchors = document.querySelectorAll(".anchor-target");
var currentLeft = '';
var currentPoint = '';
var fromTop = window.scrollY;
var scrolledPast = [];

for (var i = 0; i < leftWayPoints.length; i++) {
  leftWayPoints[i].addEventListener('click', clickCurrent);
}
function clickCurrent(){
  currentLeft.classList.remove('current');
  this.classList.add('current');
  currentLeft = this;
}

if(leftWayPoints){
  window.addEventListener('scroll', setCurrentPoint);
}
function setCurrentPoint(){
  contentTop = document.querySelector('.container').offsetTop;
  fromTop = window.scrollY;
  scrolledPast = [];

  for (var i = 0; i < sectionAnchors.length; i++) {
    if(sectionAnchors[i].offsetTop+contentTop-8 <= fromTop){
      scrolledPast.push(sectionAnchors[i]);
    }
    if(scrolledPast.length >= 1){
      currentPoint = scrolledPast.pop().id;
    }
    scrollCurrent();
  }
}

function scrollCurrent(){
  if(currentLeft && currentLeft.hash != '#'+currentPoint){
    currentLeft.classList.remove('current');
    currentLeft = document.querySelectorAll("a[href='#"+currentPoint+"']")[0];
    currentLeft.classList.add('current');
  } else {
    currentLeft = document.querySelectorAll("a[href='#"+currentPoint+"']")[0];
    currentLeft.classList.add('current');
  }
}

window.addEventListener('resize', setCurrentPoint);
