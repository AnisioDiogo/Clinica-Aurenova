document.addEventListener('DOMContentLoaded', function() {
  // ===== MENU MOBILE =====
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.main-navigation');
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
  
  const menuLinks = document.querySelectorAll('.menu a');
  
  function toggleMenu() {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      menu.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
  }
  
  toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
  });
  
  overlay.addEventListener('click', toggleMenu);
  
  menuLinks.forEach(link => {
      link.addEventListener('click', function() {
          if (window.innerWidth <= 768) toggleMenu();
      });
  });
  
  window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
          toggle.setAttribute('aria-expanded', 'false');
          menu.classList.remove('active');
          overlay.classList.remove('active');
          document.body.style.overflow = '';
      }
  });

  // ===== ANIMAÇÕES =====
  const animateElements = document.querySelectorAll('.servico, #banner img');
  animateElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.classList.add('fade-in');
  });

  // ===== FAQ ACCORDION (SEM SCROLL AUTOMÁTICO) =====
  const questions = document.querySelectorAll('.faq-question');
  
  function closeAllFAQs(except = null) {
      questions.forEach(q => {
          if (q !== except) {
              q.setAttribute('aria-expanded', 'false');
              q.nextElementSibling.style.maxHeight = null;
              q.querySelector('.faq-icon').textContent = '+';
          }
      });
  }
  
  questions.forEach(question => {
      question.addEventListener('click', () => {
          const answer = question.nextElementSibling;
          const isExpanded = question.getAttribute('aria-expanded') === 'true';
          
          if (!isExpanded) closeAllFAQs(question);
          
          // Alterna o estado
          question.setAttribute('aria-expanded', !isExpanded);
          if (!isExpanded) {
              answer.style.maxHeight = answer.scrollHeight + 'px';
              question.querySelector('.faq-icon').textContent = '×';
          } else {
              answer.style.maxHeight = null;
              question.querySelector('.faq-icon').textContent = '+';
          }
      });
  });
  
  // Abre a primeira pergunta por padrão (sem scroll)
  if (questions.length > 0) {
      const firstQuestion = questions[0];
      firstQuestion.setAttribute('aria-expanded', 'true');
      firstQuestion.nextElementSibling.style.maxHeight = firstQuestion.nextElementSibling.scrollHeight + 'px';
      firstQuestion.querySelector('.faq-icon').textContent = '×';
  }

  // ===== MELHORIAS DE ACESSIBILIDADE =====
  document.addEventListener('keydown', function(e) {
      // Fechar menu com ESC
      if (e.key === 'Escape' && menu.classList.contains('active')) {
          toggleMenu();
      }
      
      // Navegação por teclado no FAQ
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          const focused = document.activeElement;
          if (focused.classList.contains('faq-question')) {
              e.preventDefault();
              const currentIndex = Array.from(questions).indexOf(focused);
              const nextIndex = e.key === 'ArrowDown' 
                  ? Math.min(currentIndex + 1, questions.length - 1)
                  : Math.max(currentIndex - 1, 0);
              
              questions[nextIndex].focus();
          }
      }
  });
});