/**
 * assets/js/auth.js
 * TSSR Notes — Authentification client-side
 * ─────────────────────────────────────────
 * Gestion des comptes, sessions et UI d'authentification.
 * Données stockées en localStorage (site statique / GitHub Pages).
 * Doit être chargé AVANT main.js sur toutes les pages.
 */

'use strict';

const TSSRAuth = (() => {

  const USERS_KEY   = 'tssr_auth_users';
  const SESSION_KEY = 'tssr_auth_session';

  /* ── Hachage du mot de passe (SHA-256 via Web Crypto) ── */
  async function hashPassword(password) {
    try {
      const data = new TextEncoder().encode(password);
      const buf  = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback (file://, vieux navigateurs) : hash djb2 simple
      let h = 5381;
      for (let i = 0; i < password.length; i++)
        h = ((h << 5) + h) ^ password.charCodeAt(i);
      return (h >>> 0).toString(16);
    }
  }

  /* ── Identifiant unique ── */
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  /* ── Persistance utilisateurs ── */
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch { return []; }
  }
  function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

  /* ── Session ── */
  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch { return null; }
  }
  function saveSession(s) { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
  function clearSession()  { localStorage.removeItem(SESSION_KEY); }
  function isLoggedIn()    { return getSession() !== null; }

  /* ── Clé préfixée par userId (pour isoler les données par compte) ── */
  function getUserKey(name) {
    const s = getSession();
    return s ? `tssr_${s.userId}_${name}` : `tssr_${name}`;
  }

  /* ── Inscription ── */
  async function register(email, name, password) {
    if (!email || !name || !password) throw new Error('Tous les champs sont requis.');
    if (password.length < 6) throw new Error('Mot de passe trop court (6 caractères min.).');
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase()))
      throw new Error('Cette adresse email est déjà utilisée.');
    const hash = await hashPassword(password);
    const user = { id: uid(), email: email.toLowerCase().trim(), name: name.trim(), passwordHash: hash };
    users.push(user);
    saveUsers(users);
    const session = { userId: user.id, email: user.email, name: user.name, loginAt: new Date().toISOString() };
    saveSession(session);
    return session;
  }

  /* ── Connexion ── */
  async function login(email, password) {
    if (!email || !password) throw new Error('Email et mot de passe requis.');
    const users = getUsers();
    const user  = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) throw new Error('Aucun compte trouvé pour cet email.');
    const hash = await hashPassword(password);
    if (hash !== user.passwordHash) throw new Error('Mot de passe incorrect.');
    const session = { userId: user.id, email: user.email, name: user.name, loginAt: new Date().toISOString() };
    saveSession(session);
    return session;
  }

  /* ── Déconnexion ── */
  function logout() {
    clearSession();
    window.location.reload();
  }

  /* ── Initiales et couleur avatar ── */
  function getInitials(name) {
    return name.trim().split(/\s+/).map(w => w[0] || '').slice(0, 2).join('').toUpperCase() || '?';
  }

  function getAvatarColor(email) {
    let h = 0;
    for (const c of email) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
    const palette = ['#2563EB','#7C3AED','#DB2777','#059669','#D97706','#DC2626','#0891B2','#0D9488'];
    return palette[Math.abs(h) % palette.length];
  }

  /* ═══════════════════════════════════════════════════════════
     UI — Bouton navbar + Modal
     ═══════════════════════════════════════════════════════════ */

  function initAuthUI() {
    _injectModal();
    updateAuthUI();
    // Ferme le dropdown au clic extérieur
    document.addEventListener('click', e => {
      if (!e.target.closest('.navbar__auth-slot')) {
        document.querySelectorAll('.user-dropdown.open')
          .forEach(d => d.classList.remove('open'));
      }
    });
    // Ferme la modal sur Échap
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function updateAuthUI() {
    const session = getSession();
    document.querySelectorAll('.navbar__auth-slot').forEach(slot => {
      if (session) {
        const initials = getInitials(session.name);
        const color    = getAvatarColor(session.email);
        slot.innerHTML = `
          <button class="user-avatar-btn" aria-label="Menu utilisateur" aria-haspopup="true" aria-expanded="false">
            <div class="user-avatar" style="background:${color}" aria-hidden="true">${initials}</div>
          </button>
          <div class="user-dropdown" role="menu" aria-label="Menu utilisateur">
            <div class="user-dropdown__header">
              <div class="user-avatar user-avatar--lg" style="background:${color}" aria-hidden="true">${initials}</div>
              <div>
                <div class="user-dropdown__name">${_esc(session.name)}</div>
                <div class="user-dropdown__email">${_esc(session.email)}</div>
              </div>
            </div>
            <div class="user-dropdown__divider"></div>
            <button class="user-dropdown__item user-dropdown__item--danger"
                    onclick="TSSRAuth.logout()" role="menuitem">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Déconnexion
            </button>
          </div>`;
        const btn      = slot.querySelector('.user-avatar-btn');
        const dropdown = slot.querySelector('.user-dropdown');
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const open = dropdown.classList.toggle('open');
          btn.setAttribute('aria-expanded', open);
        });
      } else {
        slot.innerHTML = `
          <button class="btn btn--primary btn--sm auth-open-btn"
                  onclick="TSSRAuth.openModal()"
                  aria-haspopup="dialog">
            Connexion
          </button>`;
      }
    });
  }

  /* ── Injection de la modal (une seule fois dans le DOM) ── */
  function _injectModal() {
    if (document.getElementById('auth-modal')) return;
    const el = document.createElement('div');
    el.id = 'auth-modal';
    el.className = 'auth-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'auth-modal-title');
    el.innerHTML = `
      <div class="auth-modal__backdrop" onclick="TSSRAuth.closeModal()"></div>
      <div class="auth-modal__card">

        <button class="auth-modal__close" onclick="TSSRAuth.closeModal()" aria-label="Fermer la fenêtre">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="auth-modal__logo">
          <div class="navbar__logo-icon" aria-hidden="true">T</div>
          <span id="auth-modal-title" class="auth-modal__brand">TSSR<strong>Notes</strong></span>
        </div>

        <!-- Onglets -->
        <div class="auth-tabs" role="tablist">
          <button class="auth-tab active" data-tab="login" role="tab"
                  aria-selected="true" onclick="TSSRAuth.switchTab('login')">Connexion</button>
          <button class="auth-tab" data-tab="register" role="tab"
                  aria-selected="false" onclick="TSSRAuth.switchTab('register')">Créer un compte</button>
        </div>

        <!-- Panneau Connexion -->
        <div class="auth-panel" data-panel="login">
          <p class="auth-error" hidden role="alert"></p>
          <form class="auth-form" onsubmit="TSSRAuth._submitLogin(event)" novalidate>
            <div class="form-group">
              <label class="form-label" for="auth-login-email">Adresse email</label>
              <input id="auth-login-email" type="email" class="form-input"
                     placeholder="vous@exemple.fr" required autocomplete="email" />
            </div>
            <div class="form-group">
              <label class="form-label" for="auth-login-pwd">Mot de passe</label>
              <input id="auth-login-pwd" type="password" class="form-input"
                     placeholder="••••••••" required autocomplete="current-password" />
            </div>
            <button type="submit" class="btn btn--primary auth-submit">Se connecter</button>
          </form>
          <p class="auth-switch">Pas encore de compte ?
            <button class="auth-link" onclick="TSSRAuth.switchTab('register')">Créer un compte</button>
          </p>
        </div>

        <!-- Panneau Inscription -->
        <div class="auth-panel" data-panel="register" hidden>
          <p class="auth-error" hidden role="alert"></p>
          <form class="auth-form" onsubmit="TSSRAuth._submitRegister(event)" novalidate>
            <div class="form-group">
              <label class="form-label" for="auth-reg-name">Prénom et nom</label>
              <input id="auth-reg-name" type="text" class="form-input"
                     placeholder="Jean Dupont" required autocomplete="name" />
            </div>
            <div class="form-group">
              <label class="form-label" for="auth-reg-email">Adresse email</label>
              <input id="auth-reg-email" type="email" class="form-input"
                     placeholder="vous@exemple.fr" required autocomplete="email" />
            </div>
            <div class="form-group">
              <label class="form-label" for="auth-reg-pwd">
                Mot de passe
                <span class="auth-hint">(6 caractères min.)</span>
              </label>
              <input id="auth-reg-pwd" type="password" class="form-input"
                     placeholder="••••••••" required autocomplete="new-password" minlength="6" />
            </div>
            <button type="submit" class="btn btn--primary auth-submit">Créer mon compte</button>
          </form>
          <p class="auth-switch">Déjà un compte ?
            <button class="auth-link" onclick="TSSRAuth.switchTab('login')">Se connecter</button>
          </p>
        </div>

      </div>`;
    document.body.appendChild(el);
  }

  /* ── Ouverture / fermeture de la modal ── */
  function openModal(tab = 'login') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.removeAttribute('hidden');
    modal.classList.add('open');
    switchTab(tab);
    // Focus sur le premier champ
    setTimeout(() => {
      const first = modal.querySelector(`[data-panel="${tab}"] input`);
      if (first) first.focus();
    }, 50);
  }

  function closeModal() {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.classList.remove('open');
    _clearErrors();
  }

  function switchTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => {
      const active = t.dataset.tab === tab;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active);
    });
    document.querySelectorAll('.auth-panel').forEach(p => {
      const show = p.dataset.panel === tab;
      p.hidden = !show;
    });
    _clearErrors();
  }

  function _clearErrors() {
    document.querySelectorAll('.auth-error').forEach(el => {
      el.textContent = '';
      el.hidden = true;
    });
  }

  function _showError(panelId, msg) {
    const err = document.querySelector(`.auth-panel[data-panel="${panelId}"] .auth-error`);
    if (err) { err.textContent = msg; err.hidden = false; }
  }

  function _setLoading(btn, loading) {
    btn.disabled = loading;
    if (loading) {
      btn.dataset.orig = btn.textContent;
      btn.textContent  = 'Chargement…';
    } else {
      btn.textContent = btn.dataset.orig || btn.textContent;
    }
  }

  /* ── Soumission connexion ── */
  async function _submitLogin(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.auth-submit');
    _setLoading(btn, true);
    _clearErrors();
    try {
      await login(
        document.getElementById('auth-login-email').value.trim(),
        document.getElementById('auth-login-pwd').value
      );
      closeModal();
      window.location.reload();
    } catch (err) {
      _showError('login', err.message);
    } finally {
      _setLoading(btn, false);
    }
  }

  /* ── Soumission inscription ── */
  async function _submitRegister(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.auth-submit');
    _setLoading(btn, true);
    _clearErrors();
    try {
      await register(
        document.getElementById('auth-reg-email').value.trim(),
        document.getElementById('auth-reg-name').value.trim(),
        document.getElementById('auth-reg-pwd').value
      );
      closeModal();
      window.location.reload();
    } catch (err) {
      _showError('register', err.message);
    } finally {
      _setLoading(btn, false);
    }
  }

  /* ── Utilitaire ── */
  function _esc(str) {
    return String(str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ── Auto-initialisation ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthUI);
  } else {
    initAuthUI();
  }

  /* ── API publique ── */
  return {
    isLoggedIn, getSession, getUserKey,
    register, login, logout,
    openModal, closeModal, switchTab,
    initAuthUI, updateAuthUI,
    _submitLogin, _submitRegister,
  };

})();
