// ===================================================================
//  CONFIGURACIÓN DE LA PÁGINA
//  Pega aquí la URL de tu Apps Script (termina en /exec)
// ===================================================================
window.TIENDITA_CONFIG = {
  API_URL: 'https://script.google.com/macros/s/AKfycbzfXekcyXwt4SR9TXqwIxdZRzB1yh_WB9KTe_wdDbmlvfdfBU3pMc7p2mTjbYHXS8E/exec',
  NOMBRE: 'Tiendita AEE'
};

// ---------- Funciones compartidas (no es necesario modificar) ----------
async function api(action, data) {
  const url = window.TIENDITA_CONFIG.API_URL;
  if (!url || url.indexOf('http') !== 0) {
    throw new Error('Falta configurar API_URL en config.js');
  }
  // Se envía como text/plain para evitar problemas de CORS con Apps Script
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(Object.assign({ action: action }, data || {}))
  });
  const out = await res.json();
  if (!out.ok) throw new Error(out.error || 'Error desconocido');
  return out;
}

function soles(n) {
  return 'S/. ' + Number(n || 0).toFixed(2);
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function sinTildes(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function toast(msg, tipo) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = 'show ' + (tipo || '');
  clearTimeout(t._h);
  t._h = setTimeout(() => (t.className = ''), 3800);
}
