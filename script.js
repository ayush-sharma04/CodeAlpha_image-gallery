// Image data
const images = [
    { src: '../images/virat.jpg', title: 'Virat Kohli', category: 'cricketer' },
    { src: '../images/rohit.jpg', title: 'Rohit Sharma', category: 'cricketer' },
    { src: '../images/sunil.jpg', title: 'Sunil Chettri', category: 'footballer' },
    { src: '../images/neeraj.jpg', title: 'Neeraj Chopra', category: 'athlete' },
    { src: '../images/messi.jpg', title: 'Messi', category: 'footballer' },
    { src: '../images/sachin.jpg', title: 'Sachin Tendulkar', category: 'cricketer' },
    { src: '../images/dhoni.jpg', title: 'M.S Dhoni', category: 'cricketer' },
    { src: '../images/ronaldo.jpg', title: 'Ronaldo', category: 'footballer' },
    { src: '../images/manu.jpg', title: 'Manu Bhakar', category: 'athlete' },
    { src: '../images/harman.jpg', title: 'Harmanpreet Kaur', category: 'cricketer' },
    { src: '../images/aman.jpg', title: 'Aman Sehrawat', category: 'athlete' },
    { src: '../images/vinesh.jpg', title: 'Vinesh Phogat', category: 'athlete' }
];

// DOM elements
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const filterBtns = document.querySelectorAll('.filter-btn');

// State
let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [...images];

// Render gallery
function renderGallery() {
    gallery.innerHTML = '';
    filteredImages = currentFilter === 'all' 
        ? [...images] 
        : images.filter(img => img.category === currentFilter);

    filteredImages.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${img.src}" alt="${img.title}">
            <div class="gallery-item-overlay">
                <div class="gallery-item-title">${img.title}</div>
                <div class="gallery-item-category">#${img.category}</div>
            </div>
        `;
        item.addEventListener('click', () => openModal(index));
        gallery.appendChild(item);
    });
}

// Open modal
function openModal(index) {
    currentImageIndex = index;
    modalImg.src = filteredImages[index].src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate modal
function navigateModal(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = filteredImages.length - 1;
    if (currentImageIndex >= filteredImages.length) currentImageIndex = 0;
    modalImg.src = filteredImages[currentImageIndex].src;
}

// Filter buttons event listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderGallery();
    });
});

// Modal event listeners
modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', () => navigateModal(-1));
modalNext.addEventListener('click', () => navigateModal(1));

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateModal(-1);
    if (e.key === 'ArrowRight') navigateModal(1);
});

// Initialize gallery
renderGallery();