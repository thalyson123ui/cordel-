// Funções e inicialização do modo dark
(function(){
  const BUTTON_ID = 'dark-mode-toggle'; // id esperado do botão no HTML
  const CLASS_DARK = 'dark';
  const STORAGE_KEY = 'theme';

  const btn = document.getElementById(BUTTON_ID);

  function applyTheme(theme){
    if(theme === 'dark'){
      document.documentElement.classList.add(CLASS_DARK);
      if(btn) { btn.setAttribute('aria-pressed','true'); btn.textContent = 'Modo claro'; }
    } else {
      document.documentElement.classList.remove(CLASS_DARK);
      if(btn) { btn.setAttribute('aria-pressed','false'); btn.textContent = 'Modo escuro'; }
    }
    try { localStorage.setItem(STORAGE_KEY, theme); } catch(e){}
  }

  function toggleTheme(){
    const isDark = document.documentElement.classList.contains(CLASS_DARK);
    applyTheme(isDark ? 'light' : 'dark');
  }

  // Inicializa a partir da preferência salva ou do sistema
  (function init(){
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch(e){}
    if(saved === 'dark' || saved === 'light'){
      applyTheme(saved);
    } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  })();

  // Evento do botão
  if(btn){
    btn.addEventListener('click', toggleTheme);
    btn.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme(); }
    });
  } else {
    // Se não houver botão com o id esperado, cria um listener global (opcional)
    document.addEventListener('keydown', (e) => {
      if(e.ctrlKey && e.key.toLowerCase() === 'm') toggleTheme(); // Ctrl+M alterna modo
    });
  }
})();