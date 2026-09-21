/* Sobola Pocket Pay interactions — vanilla JavaScript */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const navPanel = document.getElementById('navPanel');
  const navLinks = [...document.querySelectorAll('.nav-links a')];

  const setMenu = open => {
    menuToggle.classList.toggle('open', open);
    navPanel.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open && window.innerWidth <= 900);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  menuToggle.addEventListener('click', () => setMenu(!navPanel.classList.contains('open')));
  navPanel.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); });

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: .12 });
  reveals.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`; revealObserver.observe(el); });

  const sections = [...document.querySelectorAll('main section[id], footer[id]')];
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), { rootMargin: '-35% 0px -55%', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));

  const participants = [...document.querySelectorAll('.journey-node')];
  const participantTip = document.getElementById('participantTip');
  const selectParticipant = (item, index) => {
    participants.forEach(node => node.classList.toggle('active', node === item));
    participantTip.querySelector('.detail-state').textContent = String(index + 1).padStart(2, '0');
    participantTip.querySelector('b').textContent = item.querySelector('b').textContent;
    participantTip.querySelector('p').textContent = item.dataset.copy;
  };
  participants.forEach((item, index) => {
    ['mouseenter','focus','click'].forEach(type => item.addEventListener(type, () => selectParticipant(item, index)));
  });

  const steps = [...document.querySelectorAll('.process-step')];
  const timeline = document.getElementById('timeline');
  const timelineProgress = document.getElementById('timelineProgress');
  const processData = [
    ['Parent Tops Up', "Parents or guardians securely add money to their child's Pocket Pay account.", 'Parent Wallet', "Joseph's Pocket Pay", 'UGX 50,000', 'Top-up initiated'],
    ['Student Receives Funds', "The student's available balance updates and is ready for approved school purchases.", 'Pocket Pay System', 'Student Wallet', 'UGX 50,000', 'Balance updated'],
    ['Student Makes a Purchase', 'The student pays at a participating school point such as the canteen.', 'Joseph’s Wallet', 'School Canteen', 'UGX 5,000', 'Payment authorised'],
    ['Transaction Is Recorded', 'A clear digital transaction record is created for review and reconciliation.', 'School Canteen', 'Transaction Record', 'UGX 5,000', 'Receipt recorded'],
    ['Everyone Stays Informed', 'Relevant parent and school interfaces show the completed transaction.', 'Transaction Record', 'Parent & School', 'UGX 5,000', 'Payment successful']
  ];
  let activeStep = 0, stepTimer;
  const showStep = index => {
    activeStep = index;
    const demo = timeline.querySelector('.transaction-demo');
    demo.classList.add('changing');
    window.setTimeout(() => {
      const [title, text, from, to, amount, status] = processData[index];
      document.getElementById('processCount').textContent = `Step ${String(index+1).padStart(2,'0')} of 05`;
      document.getElementById('processTitle').textContent = title;
      document.getElementById('processText').textContent = text;
      document.getElementById('demoFrom').textContent = from;
      document.getElementById('demoTo').textContent = to;
      document.getElementById('demoAmount').textContent = amount;
      document.querySelector('#demoStatus b').textContent = status;
      steps.forEach((step,i) => { step.classList.toggle('active',i===index); step.setAttribute('aria-selected',String(i===index)); });
      timelineProgress.style.width = `${(index+1)*20}%`;
      demo.classList.remove('changing');
    }, reduceMotion ? 0 : 180);
  };
  steps.forEach((step,index) => step.addEventListener('click', () => { showStep(index); if(stepTimer){clearInterval(stepTimer);stepTimer=null;} }));
  const timelineObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting && !reduceMotion && !stepTimer) stepTimer=setInterval(()=>showStep((activeStep+1)%steps.length),4200);
    if(!entry.isIntersecting && stepTimer){clearInterval(stepTimer);stepTimer=null;}
  }),{threshold:.3});
  timelineObserver.observe(timeline);

  const features = [
    ['＋','Parent Top-Up',"Give parents or guardians a direct way to add funds to a student's Pocket Pay balance."],
    ['♙','Student Accounts','Organise student profiles, balances and relevant account activity in one place.'],
    ['◇','Digital Wallets','Support cashless pocket money for approved everyday school purchases.'],
    ['↻','Transaction History','Review clear digital records of top-ups, purchases and account activity.'],
    ['●','Payment Notifications','Keep relevant users informed when important payment activity occurs.'],
    ['⌂','School Management','Give authorised school teams tools for account and payment oversight.'],
    ['▣','Canteen Payments','Enable quick student payments at participating school points.'],
    ['▤','Reports & Reconciliation','Make transaction review and day-to-day reconciliation easier.'],
    ['♧','User Management','Manage relevant users and appropriate access for each role.'],
    ['◉','Account Balances','Present up-to-date wallet balances through the relevant interface.'],
    ['⌁','Secure Authentication','Support controlled access to Pocket Pay experiences.'],
    ['◎','Transaction Monitoring','Improve visibility into payment activity across the ecosystem.']
  ];
  const featureGrid = document.getElementById('featureGrid');
  const featureDetail = document.getElementById('featureDetail');
  const modal = document.getElementById('featureModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCopy = document.getElementById('modalCopy');
  let lastFocused;
  features.forEach(([icon,title,copy], index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = `feature-button${index === 0 ? ' active' : ''}`;
    button.innerHTML = `<span aria-hidden="true">${icon}</span>${title}`;
    button.setAttribute('aria-label', `View details for ${title}`);
    button.addEventListener('click', () => {
      document.querySelectorAll('.feature-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      featureDetail.querySelector('.detail-icon').textContent = icon;
      featureDetail.querySelector('h3').textContent = title;
      featureDetail.querySelector('p').textContent = copy;
      if (window.innerWidth <= 640) {
        lastFocused = button; modalTitle.textContent = title; modalCopy.textContent = copy; modal.hidden = false;
        modal.querySelector('.detail-icon').textContent = icon; modal.querySelector('.modal-close').focus();
      }
    });
    featureGrid.appendChild(button);
  });
  const closeModal = () => { modal.hidden = true; if (lastFocused) lastFocused.focus(); };
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  modal.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

  const balance = document.querySelector('[data-count="85000"]');
  const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    if (reduceMotion) balance.textContent = '85,000';
    else {
      const start = performance.now(), duration = 1300;
      const tick = now => { const p = Math.min((now-start)/duration,1); balance.textContent = Math.floor(85000*(1-Math.pow(1-p,3))).toLocaleString('en-UG'); if(p<1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }
    countObserver.unobserve(entry.target);
  }), { threshold: .5 });
  countObserver.observe(balance);
})();
