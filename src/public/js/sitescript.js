
document.addEventListener('DOMContentLoaded',function () {
const dropdownLabel = document.querySelectorAll(".dropdown-main");
const dropdownMenu = document.querySelectorAll(".dropdown-menu");
const btnShowSearch = document.querySelector('.search-catogory .fa-search');
const formSearch = document.querySelector('.form-search');
const inputTextSearch = document.querySelector('.form-search input[type=text]');
const btnBackTop = document.querySelector('.back-top');
const bodyBlock = document.querySelector('body');
//Loader
	
window.addEventListener('load', () => {
    bodyBlock.style.overflowY = 'hidden';
    setTimeout(() => {
        document.querySelector('#loader').style.display = 'none';
        bodyBlock.style.overflowY = 'inherit';
    }, 500)
});
//Click show menu drop

window.addEventListener("click", function(e) {
    dropdownLabel.forEach(o => {
        let clicker = e.target.parentNode.parentNode;
        if (e.target == document.querySelector('.input-text-search')) {
            clicker = o;
        }
        if (o.classList.contains('open') || clicker != o) {
            o.classList.remove('open');
            document.querySelector(o.getAttribute('data-active')).classList.remove('active-dropdown-mymenu');
        } else {
            dropdownLabel.forEach(element => {
                element.classList.remove('open');
            });
            o.classList.add('open');
            dropdownMenu.forEach(element => {
                element.classList.remove('active-dropdown-mymenu');
            });
            document.querySelector(o.getAttribute('data-active')).classList.add('active-dropdown-mymenu');
        }

    });
    

    if ((e.target == btnShowSearch && formSearch.classList[2] == 'd-xl-block') || e.target != btnShowSearch && e.target != inputTextSearch) {
        formSearch.classList.add('d-xl-none');
        formSearch.classList.remove('d-xl-block')
    } else {
        formSearch.classList.remove('d-xl-none');
        formSearch.classList.add('d-xl-block')
    }
})

//Open and Close Mobile Menu
const btnMenuMobile = document.querySelector('.menu-icon');
const menuMobile = document.querySelector('.menu-mobile');
isAcctive = false;
btnMenuMobile.addEventListener('click', function() {
    if (!isAcctive) {
        btnMenuMobile.classList.add('active-menu');
        menuMobile.classList.add('active-menu-mobile');
        menuMobile.classList.remove('close');
        bodyBlock.style.overflowY = 'hidden';
        isAcctive = true;
    } else {
        menuMobile.classList.add('close');
        btnMenuMobile.classList.remove('active-menu');
        menuMobile.classList.remove('active-menu-mobile');
        bodyBlock.style.overflowY = 'inherit';
        isAcctive = false;
    }
})
document.querySelector('.close-menu').addEventListener('click', function() {
    menuMobile.classList.add('close');
    btnMenuMobile.classList.remove('active-menu');
    menuMobile.classList.remove('active-menu-mobile');
    isAcctive = false;
})

// // display navigation 
// display navigation 
    window.addEventListener('scroll', () => {
    let y = pageYOffset;
    let header = document.querySelector('.nav-bottom');
    let isActiveHeader = true;
    if (y > 50) {
        if (isActiveHeader == true) {
            header.classList.add('is-sticky');
            isActiveHeader = false;
            formSearch.classList.add('d-none');
            formSearch.classList.remove('d-block')
        }
    } else {
        isActiveHeader = true;
        formSearch.classList.add('d-block');
        formSearch.classList.remove('d-none')
        header.classList.remove('is-sticky');

    }
    if (y>300) {
        btnBackTop.style.display= 'block';
    } else {
        btnBackTop.style.display= 'none';
    }
})

    //btnBackTop.onclick = function () {
    //   document.body.scrollTop = 0;
    //   document.documentElement.scrollTop =0;
    //}

// Slider Main
let i=0;
const btnsNextSlider = document.querySelectorAll('.control-silder ul li');
const sliders = document.querySelectorAll('.slider-show .sliders .slider');
for (let index = 0; index < btnsNextSlider.length; index++) {

    btnsNextSlider[index].addEventListener('click', function() {
        btnsNextSlider.forEach(btn => {
            btn.classList.remove('active-slider-btn');
        });
        this.classList.add('active-slider-btn');

        sliders.forEach(slider => {
            slider.classList.remove('active-slider');
        });
        sliders[index].classList.add('active-slider');
        i=index;
    })
}
let slideTimer = setTimeout(function nextSilder() {
    let slideActive = document.querySelector('.slider.active-slider')
    slideActive.classList.remove('active-slider');
    btnsNextSlider.forEach(btn => {
        btn.classList.remove('active-slider-btn');
    });
    if (slideActive.nextElementSibling==null) {
        sliders[0].classList.add('active-slider');
        i=0;
         btnsNextSlider[i].classList.add('active-slider-btn');
    }
    else{
        slideActive.nextElementSibling.classList.add('active-slider');
        btnsNextSlider[++i].classList.add('active-slider-btn');
    }
    
    slideTimer = setTimeout(nextSilder , 5000);
}, 5000);

// slide Product 
const previousListProduct = '<div class="previous-list-product "> <i class="fas fa-chevron-left"></i>  </div>';
const nextListProduct = '<div class="next-list-product"> <i class="fas fa-chevron-right"></i> </div>'
$('.owl-carousel.produce-category').owlCarousel({
    margin: 10,
    nav: true,
    navText:[
    previousListProduct,
    nextListProduct
    ],
    responsive: {
        0: {
            items: 1
        },
        740: {
            items: 2
        },
        992: {
            items: 3
        },
        1200: {
            items: 4
        }
    }
})

// slider logo
$('.owl-carousel.logo-slider').owlCarousel({
    margin: 5,
    nav: true,
    navText:[
    previousListProduct,
    nextListProduct
    ],
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 3
        },
        992: {
            items: 6
        }
    }
})
$('.owl-carousel.best-sell-slider').owlCarousel({
    margin: 10,
    nav: true,
    navText:[
    previousListProduct,
    nextListProduct
    ],
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 3
        },
        992: {
            items: 5
        }
    }
})
$('.owl-carousel.slide-hot-category').owlCarousel({
    margin: 10,
    nav: true,
    navText:[
    previousListProduct,
    nextListProduct
    ],
    responsive: {
        0: {
            items: 1
        },
        739: {
            items: 2
        },
        1200:{
            items: 3
        }
    }
})
$('.owl-carousel.slide-instagram').owlCarousel({
    margin: 0,
    nav: true,
    navText:[
    previousListProduct,
    nextListProduct
    ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        992: {
            items: 5
        }
    }
})
},false);

var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}