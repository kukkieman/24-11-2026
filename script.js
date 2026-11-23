  /* ---- Play embedded YouTube video on button click ---- */
  const roll = document.getElementById('roll');
  const song = document.getElementById('song');
  const player = document.getElementById('song-video');
  const closeBtn = document.getElementById('rollclose');
  const close = () => { roll.hidden = true; player.removeAttribute('src'); song.focus(); };
  song.addEventListener('click', () => {
    player.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&playsinline=1&rel=0&origin=' + encodeURIComponent(location.origin);
    roll.hidden = false;
    closeBtn.focus();
  });
  closeBtn.addEventListener('click', close);
  addEventListener('keydown', e => { if (e.key === 'Escape' && !roll.hidden) close(); });
})();
