// SCHEDULE DATA
  const scheduleData = {
    mon: [
      { time: '07:00', cls: 'Ранкова йога', trainer: 'Анна Петренко', spots: '3 місця' },
      { time: '09:00', cls: 'Функціональний тренінг', trainer: 'Сергій Бондаренко', spots: '8 місць', low: false },
      { time: '11:00', cls: 'Стретчинг', trainer: 'Анна Петренко', spots: '12 місць' },
      { time: '18:00', cls: 'Бокс: базовий рівень', trainer: 'Дмитро Ковальчук', spots: '2 місця', low: true },
      { time: '19:30', cls: 'Силовий CrossFit', trainer: 'Олексій Марченко', spots: '5 місць' },
      { time: '21:00', cls: 'Вечірня йога', trainer: 'Анна Петренко', spots: '10 місць' },
    ],
    tue: [
      { time: '07:00', cls: 'Кардіо-старт', trainer: 'Сергій Бондаренко', spots: '6 місць' },
      { time: '10:00', cls: 'MMA для початківців', trainer: 'Дмитро Ковальчук', spots: '1 місце', low: true },
      { time: '18:00', cls: 'Пілатес', trainer: 'Анна Петренко', spots: '8 місць' },
      { time: '19:30', cls: 'Важка атлетика', trainer: 'Олексій Марченко', spots: '4 місця' },
    ],
    wed: [
      { time: '07:00', cls: 'Ранковий біг (бігова доріжка)', trainer: 'Сергій Бондаренко', spots: '15 місць' },
      { time: '09:00', cls: 'Йога Хатха', trainer: 'Анна Петренко', spots: '9 місць' },
      { time: '18:00', cls: 'Бокс: просунутий', trainer: 'Дмитро Ковальчук', spots: '2 місця', low: true },
      { time: '20:00', cls: 'Нічний CrossFit', trainer: 'Олексій Марченко', spots: '6 місць' },
    ],
    thu: [
      { time: '07:00', cls: 'Функціональний тренінг', trainer: 'Сергій Бондаренко', spots: '7 місць' },
      { time: '10:00', cls: 'Стретчинг глибокий', trainer: 'Анна Петренко', spots: '11 місць' },
      { time: '18:00', cls: 'Силові: верхній корпус', trainer: 'Олексій Марченко', spots: '5 місць' },
      { time: '19:30', cls: 'MMA спаринг', trainer: 'Дмитро Ковальчук', spots: '1 місце', low: true },
    ],
    fri: [
      { time: '07:00', cls: 'HIIT кардіо', trainer: 'Сергій Бондаренко', spots: '8 місць' },
      { time: '09:00', cls: 'Йога відновлення', trainer: 'Анна Петренко', spots: '12 місць' },
      { time: '18:00', cls: 'Бокс: всі рівні', trainer: 'Дмитро Ковальчук', spots: '3 місця', low: true },
      { time: '20:00', cls: 'Пʼятничний CrossFit', trainer: 'Олексій Марченко', spots: '6 місць' },
    ],
    sat: [
      { time: '09:00', cls: 'Загальна фізична підготовка', trainer: 'Сергій Бондаренко', spots: '10 місць' },
      { time: '11:00', cls: 'Йога вихідного дня', trainer: 'Анна Петренко', spots: '14 місць' },
      { time: '14:00', cls: 'Відкрите тренування боксу', trainer: 'Дмитро Ковальчук', spots: '5 місць' },
    ],
    sun: [
      { time: '10:00', cls: 'Ранкова медитація та стретч', trainer: 'Анна Петренко', spots: '20 місць' },
      { time: '12:00', cls: 'Силові вихідного дня', trainer: 'Олексій Марченко', spots: '8 місць' },
    ],
  };

  function renderSchedule(day) {
    const list = document.getElementById('scheduleList');
    const items = scheduleData[day] || [];
    list.innerHTML = items.map(i => `
      <div class="schedule-item">
        <div class="schedule-time">${i.time}</div>
        <div>
          <div class="schedule-class">${i.cls}</div>
          <div class="schedule-trainer">${i.trainer}</div>
        </div>
        <div class="schedule-spots ${i.low ? 'spots-low' : ''}">${i.spots}</div>
      </div>
    `).join('');
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSchedule(btn.dataset.day);
    });
  });
  renderSchedule('mon');

  // COUNTERS
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };
    requestAnimationFrame(update);
  }

  // REVEAL ON SCROLL
  const reveals = document.querySelectorAll('.reveal');
  const counters = document.querySelectorAll('[data-target]');
  let countersAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counters.forEach(animateCounter);
      }
    });
  }, { threshold: 0.3 });
  if (counters.length) counterObserver.observe(counters[0].closest('div') || document.body);

  // NAVBAR SCROLL
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.style.padding = window.scrollY > 60 ? '0.8rem 5vw' : '1.2rem 5vw';
  });

  // BURGER MENU
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');

  function toggleMenu() {
    mobileMenu.classList.toggle('open');
    backdrop.classList.toggle('open');
  }
  burger.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', toggleMenu);
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', toggleMenu));

  // MODAL
  function openModal() {
    document.getElementById('modalOverlay').classList.add('open');
  }
  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
  }
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // FORM
  function handleSubmit() {
    const fname = document.getElementById('fname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!fname || !phone) {
      alert('Будь ласка, заповніть ім\'я та телефон');
      return;
    }
    document.getElementById('formSuccess').style.display = 'block';
    document.getElementById('submitBtn').textContent = '✓ Заявку надіслано';
    document.getElementById('submitBtn').style.background = '#333';
  }

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });