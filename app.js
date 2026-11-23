/* =========================================================
   CONFIGURACIÓN — edita estos datos
   ========================================================= */
const CONFIG = {
  // Número de WhatsApp con lada de país, solo dígitos. Ej: "5219981234567"
  // Si se deja vacío, WhatsApp abrirá para que el cliente elija el chat.
  whatsapp: "529984306986",
  whatsappLabel: "998 430 6986",
  phone: "", // Solo WhatsApp (sin teléfono fijo)
  timezone: "America/Cancun",
  // Horario por día (0 = domingo … 6 = sábado). null = cerrado.
  hours: {
    1: ["08:00", "21:00"], 2: ["08:00", "21:00"], 3: ["08:00", "21:00"], 4: ["08:00", "21:00"],
    5: ["08:00", "21:00"], 6: ["08:00", "21:00"], 0: ["08:00", "21:00"],
  },
};

// ⚠ RESEÑAS DE EJEMPLO (inventadas para ver el diseño). Reemplázalas por reseñas
// reales de Google Maps antes de publicar la página.
// Formato: { name: "Nombre", rating: 5, text: "Texto", when: "hace 2 semanas", google: true }
// (google: true muestra la leyenda "Reseña de Google"; ponlo solo en las reales)
const REVIEWS = [
  { name: "Mariana G.", rating: 5, text: "Los chilaquiles divorciados con cecina están buenísimos y la porción es muy generosa. El jugo verde, recién hecho.", when: "Ejemplo" },
  { name: "Carlos R.", rating: 5, text: "Pedí por WhatsApp y cuando llegué ya estaba listo. El Alambre Luna es mi nuevo favorito.", when: "Ejemplo" },
  { name: "Fernanda L.", rating: 5, text: "Por fin un lugar con opciones saludables que sí saben rico. El waffle de avena con fruta es perfecto para desayunar.", when: "Ejemplo" },
  { name: "Jorge M.", rating: 4, text: "Buena comida casera a buen precio, incluye entrada y bebida. El lugar es tranquilo y la atención muy amable.", when: "Ejemplo" },
  { name: "Daniela P.", rating: 5, text: "El Moon Waffle es una delicia y el frappé de taro está increíble. Siempre que paso por La Luna me llevo algo.", when: "Ejemplo" },
  { name: "Luis A.", rating: 5, text: "La pechuga con champiñones y espinacas está riquísima. Ideal si estás cuidando tu alimentación sin aburrirte.", when: "Ejemplo" },
];

/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => "$" + n.toLocaleString("es-MX");
const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const waUrl = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

/* ---------- Íconos para productos sin foto ---------- */
const ICONS = {
  desayunos: '<path d="M12 4c-4 0-7 4-7 8.5S8 20 12 20s7-3 7-7.5S16 4 12 4z"/><circle cx="12" cy="13" r="3"/>',
  chilaquiles: '<path d="M3 14h18a9 9 0 0 1-18 0z"/><path d="M7 10l3-5 3 5M12 10l3-4 3 4"/>',
  healthy: '<path d="M4 11c0-4 3.5-6 8-6s8 2 8 6H4z"/><path d="M4 14h16M5 17h14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/>',
  comidas: '<path d="M3 14h18a9 9 0 0 1-18 0z"/><path d="M8 10c0-2 2-2 2-4M13 10c0-2 2-2 2-4"/>',
  especiales: '<path d="M4 15c3-7 13-7 16 0"/><path d="M3 15h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2z"/>',
  snacks: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16"/>',
  bebidas: '<path d="M6 7h12l-1.4 12.2a2 2 0 0 1-2 1.8H9.4a2 2 0 0 1-2-1.8L6 7z"/><path d="M5 7h14M13 7l2-4"/>',
};

/* ---------- Menú ---------- */
let activeCat = CATEGORIES[0].id;

function renderTabs() {
  $("#tabs").innerHTML = CATEGORIES.map(c =>
    `<button role="tab" class="tab" aria-selected="${c.id === activeCat}" data-cat="${c.id}">${c.name}</button>`).join("");
}

function cardHTML(p) {
  const media = p.img
    ? `<img src="${p.img}" alt="${p.name}" loading="lazy" />`
    : `<div class="card__ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${ICONS[p.cat]}</svg></div>`;
  const tags = (p.tags || []).map(t => `<span class="tag tag--${t}">${TAGS[t]}</span>`).join("");
  const from = p.groups && p.groups.some(g => g.options.some(o => o.p > 0)) ? "desde " : "";
  return `<article class="card">
    <div class="card__media">${media}</div>
    <div class="card__body">
      ${tags ? `<div class="card__tags">${tags}</div>` : ""}
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="card__foot">
        <span class="price"><small>${from}</small>${money(p.price)}</span>
        <button class="add" data-id="${p.id}" aria-label="Agregar ${p.name}">+</button>
      </div>
    </div>
  </article>`;
}

function renderGrid() {
  const cat = CATEGORIES.find(c => c.id === activeCat);
  const items = MENU.filter(p => p.cat === activeCat);
  $("#grid").innerHTML = (cat.note ? `<p class="grid__note">${cat.note}</p>` : "") + items.map(cardHTML).join("");
  $$("#grid .card").forEach((c, i) => c.style.setProperty("--i", i));
}

$("#tabs").addEventListener("click", e => {
  const b = e.target.closest(".tab");
  if (!b) return;
  activeCat = b.dataset.cat;
  renderTabs(); renderGrid();
});

$("#grid").addEventListener("click", e => {
  const b = e.target.closest(".add");
  if (b) openModal(MENU.find(p => p.id === b.dataset.id), b);
});

/* ---------- Modal de personalización ---------- */
let current = null, qty = 1, modalTimer, lastTrigger = null;

function openModal(p, trigger) {
  clearTimeout(modalTimer);
  current = p; qty = 1; lastTrigger = trigger || null;
  $("#modal-top").innerHTML = `
    ${p.img ? `<img src="${p.img}" alt="" />` : ""}
    <div><h3 id="modal-title">${p.name}</h3><p>${p.desc}</p></div>`;
  const groups = (p.groups || []).map((g, gi) => {
    const type = g.type === "many" ? "checkbox" : "radio";
    const opts = (g.optional ? [{ l: "Sin extra", p: 0 }] : []).concat(g.options);
    return `<fieldset class="opt-group">
      <legend>${g.name}${g.type === "many" ? " <small>opcional</small>" : ""}</legend>
      <div class="opts">${opts.map((o, oi) => `
        <label class="opt"><input type="${type}" name="g${gi}" value="${oi}" ${type === "radio" && oi === 0 ? "checked" : ""} />
          <span>${o.l}${o.p ? ` <em>+${money(o.p)}</em>` : ""}</span></label>`).join("")}
      </div></fieldset>`;
  }).join("");
  $("#modal-form").innerHTML = groups + `
    <label class="field"><span>Quitar ingredientes o notas</span>
      <textarea name="note" rows="2" placeholder="Ej. sin cebolla, salsa aparte…"></textarea></label>`;
  updateModalPrice();
  const m = $("#modal");
  m.hidden = false;
  $(".modal__card").scrollTop = 0; $("#modal-form").scrollTop = 0;
  requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add("is-open")));
  document.body.classList.add("lock");
  setTimeout(() => $("#modal-add").focus({ preventScroll: true }), 50);
}

function readSelection() {
  const p = current, form = $("#modal-form");
  let extra = 0; const picks = [];
  (p.groups || []).forEach((g, gi) => {
    const opts = (g.optional ? [{ l: "Sin extra", p: 0 }] : []).concat(g.options);
    $$(`[name="g${gi}"]:checked`, form).forEach(inp => {
      const o = opts[+inp.value];
      if (o.l === "Sin extra") return;
      extra += o.p; picks.push(o.l);
    });
  });
  return { unit: p.price + extra, picks, note: form.note.value.trim() };
}

function updateModalPrice() {
  $("#qty-val").textContent = qty;
  $("#modal-price").textContent = money(readSelection().unit * qty);
}

function closeModal() {
  const m = $("#modal");
  m.classList.remove("is-open");
  document.body.classList.remove("lock");
  clearTimeout(modalTimer);
  modalTimer = setTimeout(() => (m.hidden = true), 250);
  if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
}

$("#modal-form").addEventListener("change", updateModalPrice);
$("#modal-form").addEventListener("submit", e => e.preventDefault());
$("#qty-minus").onclick = () => { qty = Math.max(1, qty - 1); updateModalPrice(); };
$("#qty-plus").onclick = () => { qty = Math.min(20, qty + 1); updateModalPrice(); };
$("#modal-add").onclick = () => {
  const s = readSelection();
  addToCart({ id: current.id, name: current.name, unit: s.unit, picks: s.picks, note: s.note, qty });
  closeModal();
  toast(`${current.name} agregado`);
};
$("#modal").addEventListener("click", e => { if (e.target.id === "modal" || e.target.closest("[data-close]")) closeModal(); });

/* ---------- Carrito ---------- */
let cart = [];
try {
  const saved = JSON.parse(localStorage.getItem("laluna-cart") || "[]");
  if (Array.isArray(saved)) cart = saved.filter(i => i && MENU.some(p => p.id === i.id) && Number.isFinite(i.unit) && i.qty > 0)
    .map(i => ({ ...i, picks: Array.isArray(i.picks) ? i.picks : [], note: i.note || "" }));
} catch { cart = []; }
const save = () => { try { localStorage.setItem("laluna-cart", JSON.stringify(cart)); } catch {} };
const keyOf = i => i.id + "|" + i.picks.join(",") + "|" + i.note;

function addToCart(item) {
  const ex = cart.find(i => keyOf(i) === keyOf(item));
  ex ? (ex.qty += item.qty) : cart.push(item);
  save(); renderCart(true);
}

function renderCart(bump) {
  const count = cart.reduce((a, i) => a + i.qty, 0);
  const total = cart.reduce((a, i) => a + i.qty * i.unit, 0);
  $("#cart-count").textContent = count;
  $("#cart-subtotal").textContent = money(total);
  $("#drawer-subtotal").textContent = money(total);
  const fab = $("#cart-fab");
  fab.dataset.empty = count === 0;
  if (bump) { fab.classList.remove("bump"); void fab.offsetWidth; fab.classList.add("bump"); }
  $("#send-order").disabled = count === 0;
  $("#cart-items").innerHTML = count === 0
    ? `<div class="empty"><svg viewBox="0 0 40 40"><path d="M27 4a16 16 0 1 0 9 28A14 14 0 0 1 27 4z" fill="currentColor"/></svg><p>Tu carrito está vacío.<br/>Agrega algo rico del menú.</p></div>`
    : cart.map((i, idx) => `
      <div class="line">
        <div class="line__info">
          <strong>${i.name}</strong>
          ${i.picks.length ? `<small>${i.picks.join(" · ")}</small>` : ""}
          ${i.note ? `<small class="line__note">“${escapeHTML(i.note)}”</small>` : ""}
          <span class="line__price">${money(i.unit * i.qty)}</span>
        </div>
        <div class="qty qty--sm">
          <button data-dec="${idx}" aria-label="Quitar uno">−</button><span>${i.qty}</span><button data-inc="${idx}" aria-label="Agregar uno">+</button>
        </div>
      </div>`).join("");
}

function escapeHTML(s) { return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

$("#cart-items").addEventListener("click", e => {
  const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]");
  if (inc) cart[+inc.dataset.inc].qty++;
  if (dec) { const i = +dec.dataset.dec; cart[i].qty--; if (cart[i].qty <= 0) cart.splice(i, 1); }
  if (inc || dec) { save(); renderCart(); }
});

let drawerTimer;
function openDrawer() {
  clearTimeout(drawerTimer);
  $("#scrim").hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => { $("#drawer").classList.add("is-open"); $("#scrim").classList.add("is-open"); }));
  setTimeout(() => $("#drawer [data-close]").focus({ preventScroll: true }), 60);
  $("#drawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
}
function closeDrawer() {
  $("#drawer").classList.remove("is-open"); $("#scrim").classList.remove("is-open");
  $("#drawer").setAttribute("aria-hidden", "true");
  document.body.classList.remove("lock");
  drawerTimer = setTimeout(() => ($("#scrim").hidden = true), 300);
  if (cart.length) $("#cart-fab").focus({ preventScroll: true });
}
$("#cart-fab").onclick = openDrawer;
$("#scrim").onclick = closeDrawer;
$("#drawer [data-close]").onclick = closeDrawer;
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  if (!$("#modal").hidden) closeModal(); else if ($("#drawer").classList.contains("is-open")) closeDrawer();
});

$("#send-order").onclick = () => {
  if (!cart.length) return;
  const name = $("#cust-name").value.trim(), time = $("#cust-time").value;
  const lines = cart.map(i => {
    let l = `• ${i.qty}× ${i.name} — ${money(i.unit * i.qty)}`;
    if (i.picks.length) l += `\n   ${i.picks.join(", ")}`;
    if (i.note) l += `\n   Nota: ${i.note}`;
    return l;
  });
  const total = cart.reduce((a, i) => a + i.qty * i.unit, 0);
  const msg = [
    "¡Hola, La Luna! 🌙 Quiero hacer un pedido para recoger:", "",
    ...lines, "", `*Subtotal: ${money(total)}*`,
    ...(name ? [`Nombre: ${name}`] : []), ...(time ? [`Hora para recoger: ${time}`] : []),
  ].join("\n");
  window.open(waUrl(msg), "_blank", "noopener");
};

$$(".js-wa-direct").forEach(a => {
  a.href = waUrl("¡Hola, La Luna! 🌙 Me gustaría hacer un pedido.");
  a.target = "_blank"; a.rel = "noopener";
});
if (CONFIG.whatsappLabel) $("#wa-footer").textContent = "WhatsApp: " + CONFIG.whatsappLabel;

/* ---------- Toast ---------- */
let toastT;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("is-on");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("is-on"), 1800);
}

/* ---------- Horario y estado ---------- */
function nowInTZ() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: CONFIG.timezone, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const get = t => parts.find(p => p.type === t).value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, mins: (+get("hour") % 24) * 60 + +get("minute") };
}
const toMins = s => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
const fmt = s => { const [h, m] = s.split(":").map(Number); const ap = h >= 12 ? "pm" : "am"; return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${ap}`; };

function renderHours() {
  const { day, mins } = nowInTZ();
  const order = [1, 2, 3, 4, 5, 6, 0];
  $("#hours").innerHTML = order.map(d => {
    const h = CONFIG.hours[d];
    return `<div class="${d === day ? "is-today" : ""}"><dt>${DAYS[d]}</dt><dd>${h ? `${fmt(h[0])} – ${fmt(h[1])}` : "Cerrado"}</dd></div>`;
  }).join("");
  const h = CONFIG.hours[day];
  const open = h && mins >= toMins(h[0]) && mins < toMins(h[1]);
  $("#status").dataset.open = !!open;
  if (open) $("#status-text").textContent = `Abierto ahora · cierra a las ${fmt(h[1])}`;
  else {
    let txt = "Cerrado";
    for (let k = 0; k < 8; k++) {
      const d = (day + k) % 7, hh = CONFIG.hours[d];
      if (!hh || (k === 0 && mins >= toMins(hh[0]))) continue;
      txt = `Cerrado · abrimos ${k === 0 ? "hoy" : k === 1 ? "mañana" : "el " + DAYS[d].toLowerCase()} a las ${fmt(hh[0])}`;
      break;
    }
    $("#status-text").textContent = txt;
  }
}

/* ---------- Reseñas ---------- */
function renderReviews() {
  const el = $("#reviews");
  if (!REVIEWS.length) {
    el.innerHTML = `<div class="reviews__empty reveal">
      <div class="stars" aria-hidden="true">★★★★★</div>
      <p>Lee lo que opinan nuestros clientes en Google Maps, y si ya nos visitaste, cuéntanos cómo te fue.</p></div>`;
    return;
  }
  const card = r => `<figure class="review">
    <div class="stars" aria-label="${r.rating} de 5 estrellas">${"★".repeat(r.rating)}<span>${"★".repeat(5 - r.rating)}</span></div>
    <blockquote>${escapeHTML(r.text)}</blockquote>
    <figcaption><strong>${escapeHTML(r.name)}</strong><small>${[r.google ? "Reseña de Google" : "", r.when || ""].filter(Boolean).join(" · ")}</small></figcaption>
  </figure>`;
  const set = REVIEWS.map(card).join("");
  // Se duplica la lista para que el carrusel dé la vuelta sin cortes
  el.innerHTML = `<div class="reviews__track" style="--dur:${REVIEWS.length * 9}s">${set}<div class="reviews__clone" aria-hidden="true" style="display:contents">${set}</div></div>`;
}

/* ---------- Reveal on scroll ---------- */
function setupReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el, i) => { el.style.setProperty("--rd", (i % 3) * 80 + "ms"); io.observe(el); });
}

/* ---------- Nav con sombra al hacer scroll ---------- */
const nav = $(".nav");
addEventListener("scroll", () => nav.classList.toggle("is-stuck", scrollY > 40), { passive: true });

/* ---------- Init ---------- */
$("#year").textContent = new Date().getFullYear();
renderTabs(); renderGrid(); renderCart(); renderHours(); renderReviews(); setupReveal();
setInterval(renderHours, 60000);
requestAnimationFrame(() => document.documentElement.classList.add("is-loaded"));
