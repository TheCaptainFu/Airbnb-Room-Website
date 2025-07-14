// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    var burger = document.getElementById('burger');
    var mobileMenu = document.querySelector('.menu-hidden');
    
    if (burger && mobileMenu) {
        burger.addEventListener('click', function() {
            // Toggle mobile menu visibility
            mobileMenu.classList.toggle('close-menu');
            
            // Toggle burger animation
            burger.classList.toggle('active');
        });
    }
});