// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Navigation active state
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      })

      // Close mobile menu if open
      if (hamburger.classList.contains("active")) {
        toggleMobileMenu()
      }
    })
  })

  // Highlight active section in navigation
  window.addEventListener("scroll", () => {
    let current = ""

    // Add some offset for better UX
    const scrollPosition = window.scrollY + 150

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-links")
  const body = document.querySelector("body")

  // Update the mobile menu toggle function to improve mobile experience
  function toggleMobileMenu() {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
    body.classList.toggle("menu-open") // Lock body scroll when menu is open

    // Close menu when clicking outside
    if (hamburger.classList.contains("active")) {
      document.addEventListener("click", closeMenuOnClickOutside)
    } else {
      document.removeEventListener("click", closeMenuOnClickOutside)
    }
  }

  // Add this function to close menu when clicking outside
  function closeMenuOnClickOutside(e) {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      toggleMobileMenu()
    }
  }

  hamburger.addEventListener("click", toggleMobileMenu)

  // Dark/Light theme toggle with animation
  const themeSwitch = document.getElementById("theme-switch")
  const root = document.documentElement

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-theme")
    themeSwitch.checked = true
  }

  themeSwitch.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("theme-transition")
      document.body.classList.add("dark-theme")
      localStorage.setItem("theme", "dark")
      setTimeout(() => {
        document.body.classList.remove("theme-transition")
      }, 300)
    } else {
      document.body.classList.add("theme-transition")
      document.body.classList.remove("dark-theme")
      localStorage.setItem("theme", "light")
      setTimeout(() => {
        document.body.classList.remove("theme-transition")
      }, 300)
    }
  })

  // Add animation to activity cards
  const animateOnScroll = () => {
    const cards = document.querySelectorAll(".activity-card, .certificate-card")

    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (cardTop < windowHeight * 0.85) {
        card.classList.add("animate")
      }
    })
  }

  // Run animation on initial load
  animateOnScroll()

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Add hover effect to certificate images
  const certificateCards = document.querySelectorAll(".certificate-card")

  certificateCards.forEach((card) => {
    const image = card.querySelector("img")
    card.addEventListener("mouseenter", () => {
      image.style.transform = "scale(1.05)"
    })
    card.addEventListener("mouseleave", () => {
      image.style.transform = "scale(1)"
    })
  })

  // Add additional CSS rule for smooth animations
  const style = document.createElement("style")
  style.innerHTML = `
    .activity-card, .certificate-card {
      opacity: 1;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .activity-card.animate, .certificate-card.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    .theme-transition {
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    body.menu-open {
      overflow: hidden;
    }
  `
  document.head.appendChild(style)

  // Fix for shape divider overlapping buttons
  const fixShapeDividerStyle = document.createElement("style")
  fixShapeDividerStyle.innerHTML = `
    .shape-divider, .shape-divider-bottom {
      pointer-events: none;
    }
    
    .shape-divider *, .shape-divider-bottom * {
      pointer-events: none;
    }
  `
  document.head.appendChild(fixShapeDividerStyle)

  // Add this to the DOMContentLoaded event listener
  // Close mobile menu when window is resized to desktop size
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && hamburger.classList.contains("active")) {
      toggleMobileMenu()
    }
  })
})
