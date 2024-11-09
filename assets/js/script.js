'use strict';


/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * SLIDER
 */
/* OJO ESTE CÓDIGO SLIDER -> INTERFIERE CON EL CODIGO CARGAR POR TAGS mirar abajo LOAD POSTS BY TAGS*/
/*const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}*/



/**
 * NEXT SLIDE
 */
/* OJO ESTE CÓDIGO SLIDER -> INTERFIERE CON EL CODIGO CARGAR POR TAGS mirar abajo LOAD POSTS BY TAGS */
/*const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;

  if (slideEnd) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);*/



/**
 * PREVIOUS SLIDE
 */
/* OJO ESTE CÓDIGO SLIDER -> INTERFIERE CON EL CODIGO CARGAR POR TAGS mirar abajo LOAD POSTS BY TAGS*/
/*const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = totalSlidableItems;
  } else {
    currentSlidePos--;
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);*/



/**
 * RESPONSIVE
 */
/*window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});*/


/**
 *  LOAD POSTS BY TAGS into ./assets/posts/base.html
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');
  
  const postsContainer = document.getElementById('posts-container');
  console.log('Posts container:', postsContainer);

  if (postsContainer) {
    postsContainer.classList.add('posts-flex');
}
  
  if (!postsContainer) {
      console.error('Posts container not found');
      return;
  }

  const selectedTag = new URLSearchParams(window.location.search).get('tag');
  console.log('Selected tag:', selectedTag);

  fetch('../data/posts.json')
      .then(response => {
          console.log('Fetch response:', response);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(posts => {
          console.log('Posts loaded:', posts);
          if (selectedTag) {
              const filteredPosts = posts.filter(post => post.tags.includes(selectedTag));
              displayPosts(filteredPosts, selectedTag);
          } else {
              postsContainer.innerHTML = '<p>No tag/categorie/all-posts selected. Please select a tag/categorie to view related posts.</p>';
          }
      })
      .catch(error => {
          console.error('Error loading posts:', error);
          postsContainer.innerHTML = '<p>Error loading posts. Mischievous robots perhaps?</p>';
      });

      function displayPosts(posts, tag) {
        postsContainer.innerHTML = '';
        if (posts.length === 0) {
            postsContainer.innerHTML = `<p>No posts found for the tag/categorie "${tag}".</p>`;
            return;
        }
        posts.forEach(post => {
            const postElement = document.createElement('li');
            postElement.className = 'feature-item';
            postElement.innerHTML = `
                <article class="card feature-card">
                    <a href="${post.url}"
                    <figure class="card-banner img-holder1">                    
                    <img src="${post.image}" alt="${post.title} image" class="img-cover1">                        
                    </figure>
                    </a>
                    <br>
                    <div class="card-content">
                        <h3 class="headline headline-3 filtered-title">
                            <a href="${post.url}">${post.title}</a>
                        </h3>
                        <!--<div class="card-tag">
                            ${post.tags.map(tag => `<a href="base.html?tag=${encodeURIComponent(tag)}" class="span hover-2 btn btn-primary">${tag}</a>`).join('')}
                        </div>-->
                    </div>
                </article>
            `;
            postsContainer.appendChild(postElement);
        });
    }
});


// modo oscuro switcher 
const checkbox = document.querySelector("#checkbox");

checkbox.addEventListener("change", () => {
    document.body.classList.toggle("light");
});


// Mensaje inicio modal pop-up al cargar el DOM
const modal = document.querySelector('.modal');
const modalButtonClose = document.querySelector('.modal__close');

document.addEventListener('DOMContentLoaded', ()=>{
    modal.classList.add('modal--visible');

    modalButtonClose.addEventListener('click', ()=>{
        modal.classList.remove('modal--visible');
    });
});