(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Days together. EDIT the date if needed (year, month 1-12, day) ---- */
  const START = new Date(2022, 10, 24); // 24 Nov 2022
  const today = new Date(); today.setHours(0,0,0,0);
  document.getElementById('days').textContent =
    Math.max(0, Math.round((today - START) / 864e5)).toLocaleString('en-IN');

  /* ---- Meme/photo loader: tries other extensions, then shows a labelled placeholder ---- */
  const DEFAULT_EXTS = ['png','jpg','jpeg','gif','webp'];
  function fallback(img){
    const d = document.createElement('div');
    d.className = img.className.replace('asset','ph');
    d.setAttribute('role','img');
    d.setAttribute('aria-label', img.alt + ' (placeholder)');
    d.textContent = img.dataset.base.split('/').pop() + '.png';
    img.replaceWith(d);
  }
  document.querySelectorAll('img.asset').forEach(img => {
    const exts = (img.dataset.exts ? img.dataset.exts.split(',') : DEFAULT_EXTS);
    let i = 0;
    img.addEventListener('error', () => {
      i++;
      if (i < exts.length) img.src = img.dataset.base + '.' + exts[i];
      else fallback(img);
    });
    img.src = img.dataset.base + '.' + exts[0];
  });

  /* ---- Hero button microcopy ---- */
  const lines = ['I said it does nothing.','Okay that was a little something.','Stop. You are being watched by a cat.','Still nothing. Impressive commitment though.','Fine, you win. I love you.'];
  let n = 0;
  const micro = document.getElementById('micro');
  document.getElementById('clickme').addEventListener('click', () => { micro.textContent = lines[n++ % lines.length]; });

  /* ---- Floating hearts ---- */
  const hearts = document.querySelector('.hearts');
  if (!reduce) for (let k = 0; k < 14; k++) {
    const h = document.createElement('i');
    h.textContent = '♥';
    h.style.left = Math.random() * 100 + '%';
    h.style.fontSize = 14 + Math.random() * 22 + 'px';
    h.style.animationDuration = 14 + Math.random() * 16 + 's';
    h.style.animationDelay = -Math.random() * 20 + 's';
    hearts.appendChild(h);
  }

  /* ---- Cursor sparkle (throttled) ---- */
  if (!reduce && matchMedia('(pointer:fine)').matches) {
    let last = 0;
    addEventListener('mousemove', e => {
      const t = performance.now();
      if (t - last < 60) return; last = t;
      const s = document.createElement('span');
      s.className = 'sparkle'; s.textContent = '✦';
      s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    });
  }

  /* ---- Scroll reveal, letter unfold, ending fade ---- */
  const paper = document.getElementById('paper');
  const openBtn = document.getElementById('open');
  const ending = document.getElementById('ending');
  const env = document.getElementById('env');
  let opened = false;
  function unfold(){
    if (opened) return; opened = true;
    openBtn.style.display = 'none';
    openBtn.setAttribute('aria-expanded','true');
    env.classList.add('open');
    setTimeout(() => {
      env.classList.add('gone');
      paper.classList.add('open');
      paper.setAttribute('tabindex','-1');
      paper.focus({ preventScroll: true });
    }, 1300);
  }
  openBtn.addEventListener('click', unfold);
  env.addEventListener('click', unfold);
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  }), { threshold: .25 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
  io.observe(ending);

  /* ---- Flip cards ---- */
  document.querySelectorAll('.card').forEach(c => c.addEventListener('click', () =>
    c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true')));

  /* ---- Song overlay: plays assets/audio/OurSong.mp4 on click ---- */
  const roll = document.getElementById('roll');
  const song = document.getElementById('song');
  const player = document.getElementById('song-video');
  const closeBtn = document.getElementById('rollclose');
  const close = () => { player.pause(); player.currentTime = 0; roll.hidden = true; document.getElementById('ssd').hidden = false; song.focus(); };
  song.addEventListener('click', () => {
    roll.hidden = false;
    closeBtn.focus();
    player.play().catch(() => {}); // if the browser blocks it, the controls are right there
  });
  closeBtn.addEventListener('click', close);
  addEventListener('keydown', e => { if (e.key === 'Escape' && !roll.hidden) close(); });
})();
