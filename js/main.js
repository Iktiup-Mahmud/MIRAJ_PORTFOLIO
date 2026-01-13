// ============================================
// DARK MODE FUNCTIONALITY
// ============================================

// Check for saved theme preference or default to light mode
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
const htmlElement = document.documentElement;
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

// Initialize theme from localStorage or system preference
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.add('dark');
    updateThemeIcons(true);
  } else {
    htmlElement.classList.remove('dark');
    updateThemeIcons(false);
  }
}

// Update theme icon visibility
function updateThemeIcons(isDark) {
  if (darkIcon && lightIcon) {
    if (isDark) {
      darkIcon.classList.remove('hidden');
      lightIcon.classList.add('hidden');
    } else {
      darkIcon.classList.add('hidden');
      lightIcon.classList.remove('hidden');
    }
  }
}

// Toggle theme
function toggleTheme() {
  const isDark = htmlElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcons(isDark);
}

// Event listeners for theme toggle
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

if (themeToggleMobileBtn) {
  themeToggleMobileBtn.addEventListener('click', toggleTheme);
}

// Initialize theme on page load
initializeTheme();


// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    
    // Toggle menu visibility
    mobileMenu.classList.toggle('hidden');
    
    // Toggle icons
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    
    // Update ARIA attribute
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
  });

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
  });
}


// ============================================
// STICKY NAVIGATION
// ============================================

const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Add shadow to navbar when scrolled
  if (currentScrollY > 0) {
    navbar.classList.add('shadow-md');
  } else {
    navbar.classList.remove('shadow-md');
  }
  
  lastScrollY = currentScrollY;
});


// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Don't prevent default for # alone (mobile menu toggle)
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


// ============================================
// PROJECTS FILTERING
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectsGrid = document.getElementById('projects-grid');

// Render projects
function renderProjects(projects) {
  projectsGrid.innerHTML = '';
  
  projects.forEach(project => {
    const projectCard = createProjectCard(project);
    projectsGrid.appendChild(projectCard);
  });
  
  // Add animation
  const cards = projectsGrid.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      requestAnimationFrame(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }, index * 100);
  });
}

// Create project card element
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.setAttribute('data-category', project.category);
  
  card.innerHTML = `
    <div class="relative overflow-hidden">
      <img src="${project.image}" alt="${project.title}" class="project-card-image" loading="lazy">
      <div class="absolute top-4 right-4">
        ${project.featured ? '<span class="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">Featured</span>' : ''}
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
        ${project.title}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        ${project.description}
      </p>
      
      <!-- Tech Stack Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        ${project.tags.map(tag => `
          <span class="px-3 py-1 bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
            ${tag}
          </span>
        `).join('')}
      </div>
      
      <!-- Links -->
      <div class="flex gap-3">
        <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" 
           class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
          Live Demo
        </a>
        <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" 
           class="flex-1 inline-flex items-center justify-center px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
           aria-label="View source code on GitHub">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
          </svg>
          Code
        </a>
      </div>
    </div>
  `;
  
  return card;
}

// Filter projects
function filterProjects(category) {
  const filteredProjects = category === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === category);
  
  renderProjects(filteredProjects);
  
  // Update active button
  filterButtons.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Add event listeners to filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    filterProjects(filter);
  });
});

// Initial render of all projects
if (typeof projectsData !== 'undefined') {
  renderProjects(projectsData);
}


// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };
    
    // In a real application, you would send this data to a backend service
    // For now, we'll just show a success message
    console.log('Form submitted:', formData);
    
    // Show success message
    showToast('Message sent successfully! I\'ll get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
    // In production, you could integrate with services like:
    // - Formspree (https://formspree.io/)
    // - EmailJS (https://www.emailjs.com/)
    // - Netlify Forms (if hosted on Netlify)
    // - Your own backend API
    
    // Example with EmailJS:
    /*
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
      .then(() => {
        showToast('Message sent successfully!');
        contactForm.reset();
      })
      .catch((error) => {
        showToast('Failed to send message. Please try again.', 'error');
        console.error('EmailJS error:', error);
      });
    */
  });
}

// Toast notification function
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  
  document.body.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


// ============================================
// COPY EMAIL TO CLIPBOARD
// ============================================

function copyEmail() {
  const email = 'your.email@example.com';
  
  // Modern clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email)
      .then(() => {
        showToast('Email copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        fallbackCopyEmail(email);
      });
  } else {
    fallbackCopyEmail(email);
  }
}

// Fallback for older browsers
function fallbackCopyEmail(email) {
  const textArea = document.createElement('textarea');
  textArea.value = email;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showToast('Email copied to clipboard!');
  } catch (err) {
    console.error('Fallback: Failed to copy', err);
    showToast('Failed to copy email', 'error');
  }
  
  document.body.removeChild(textArea);
}

// Make function available globally for onclick handler
window.copyEmail = copyEmail;


// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

// Animate elements when they come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
});


// ============================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ============================================

// Add visible focus indicator for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});


// ============================================
// PERFORMANCE: LAZY LOAD IMAGES
// ============================================

// Images with loading="lazy" attribute are already handled by the browser
// This is a fallback for older browsers
if ('loading' in HTMLImageElement.prototype === false) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
}


// ============================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ============================================

// Uncomment to add a scroll-to-top button
/*
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = `
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
  </svg>
`;
scrollToTopBtn.className = 'fixed bottom-8 right-8 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all opacity-0 pointer-events-none z-50';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.pointerEvents = 'auto';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.pointerEvents = 'none';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
*/


// ============================================
// CONSOLE MESSAGE (OPTIONAL)
// ============================================

console.log('%c👋 Hello, fellow developer!', 'color: #0ea5e9; font-size: 20px; font-weight: bold;');
console.log('%cInterested in how this was built? Check out the source code!', 'color: #6b7280; font-size: 14px;');
console.log('%c🚀 Built with HTML, Tailwind CSS, and Vanilla JavaScript', 'color: #10b981; font-size: 14px;');
