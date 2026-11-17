const menuToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    menuToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    mainNav.classList.toggle('is-open', !open);
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      mainNav.classList.remove('is-open');
    });
  });
}
document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

const chatLauncher = document.querySelector('.chat-launcher');
const chatPanel = document.querySelector('.chat-panel');
const chatClose = document.querySelector('.chat-close');
const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('#mess-chat-input');
const chatMessages = document.querySelector('.chat-messages');

function toggleChat(open) {
  if (!chatPanel || !chatLauncher) return;
  chatPanel.hidden = !open;
  chatLauncher.setAttribute('aria-expanded', String(open));
  if (open) chatInput?.focus();
}

function addChatMessage(message, type = 'bot-message', action) {
  if (!chatMessages) return;
  const bubble = document.createElement('div');
  bubble.className = 'chat-message ' + type;
  bubble.textContent = message;
  chatMessages.append(bubble);
  if (action) {
    const link = document.createElement('a');
    link.className = 'chat-action';
    link.href = action.href;
    link.textContent = action.label;
    if (action.external) { link.target = '_blank'; link.rel = 'noreferrer'; }
    chatMessages.append(link);
  }
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function answerQuestion(question) {
  const text = question.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  const whatsapp = (message) => ({
    href: 'https://wa.me/919585556595?text=' + encodeURIComponent('Vanakkam Madurai Mess, ' + message),
    label: 'Ask us on WhatsApp ↗',
    external: true
  });
  if (/personal|private|owner|manager|complaint|feedback|catering|party|event|custom|booking|reservation|speak to/.test(text)) {
    return { message: "For a personal or custom query, WhatsApp is the quickest way to reach the team.", action: whatsapp("I have a personal query: " + question) };
  }
  const priceItems = [
    { match: /non.?veg meals?|non vegetarian meals?/, name: "Non-veg meals", price: 180, description: "A hearty rice meal with Tamil mess-style non-veg sides." },
    { match: /veg meals?|vegetarian meals?/, name: "Veg meals", price: 120, description: "A comforting South Indian rice meal with traditional sides." },
    { match: /mutton|chukka|sukka/, name: "Mutton chukka", price: 160, description: "Peppery mutton with curry leaves, dry-finished in the southern mess style." },
    { match: /naatukoli|naatu koli|naatukozhi|nattukozhi|country chicken|biryani|biriyani/, name: "Naatukoli biryani", price: 140, description: "Country chicken and fragrant rice warmed with Tamil spices." },
    { match: /kari dosa|keema dosa/, name: "Kari dosa", price: 160, description: "A Madurai-style dosa layered with spiced minced meat." },
    { match: /bun parotta|parotta|paratha|porotta/, name: "Bun parotta", price: 24, description: "A rounded, layered Madurai favourite, soft inside and golden at the edges." },
    { match: /jigarthanda|jigar thanda/, name: "Jigarthanda", price: 60, description: "Madurai’s chilled treat with milk, nannari syrup, almond gum and ice cream." },
    { match: /paneer butter masala|panneer butter masala/, name: "Paneer butter masala", price: 140, description: "Paneer in a creamy, gently spiced tomato gravy." },
    { match: /chicken butter masala/, name: "Chicken butter masala", price: 180, description: "Tender chicken in a rich, buttery masala sauce." },
    { match: /masal dosa|masala dosa/, name: "Masal dosa", price: 45, description: "Golden dosa filled with warmly spiced potato masala." },
    { match: /idli|idly/, name: "Idli", price: 18, description: "Soft steamed idli, a South Indian tiffin favourite." },
    { match: /roti|chapati/, name: "Roti", price: 22, description: "Soft flatbread to pair with a rich curry." },
    { match: /half boil|half boiled/, name: "Half boil", price: 14, description: "Egg cooked sunny-side with a soft yolk." }
  ];
  const selectedItem = priceItems.find((item) => item.match.test(text));
  const wantsPrice = /price|prices|cost|costs|rate|rates|how much|price list|menu price/.test(text);
  if (wantsPrice && selectedItem) {
    return { message: selectedItem.name + " is ₹" + selectedItem.price + ". " + selectedItem.description };
  }
  if (wantsPrice) {
    return { message: "Menu prices (INR): Veg meals ₹120; non-veg meals ₹180; mutton chukka ₹160; naatukoli biryani ₹140; kari dosa ₹160; bun parotta ₹24; jigarthanda ₹60; idli ₹18; masal dosa ₹45; roti ₹22; paneer butter masala ₹140; chicken butter masala ₹180; half boil ₹14.", action: { href: "menu.html", label: "Open the full menu ↗", external: false } };
  }
  if (/where|location|address|direction|map|reach you/.test(text)) {
    return { message: "We’re at 12, Tavareka Main Road, Madivala, Bangalore – 623167.", action: { href: "https://www.google.com/maps/search/?api=1&query=12%2C%20Tavareka%20Main%20Road%2C%20Madivala%2C%20Bangalore%20623167", label: "Open directions ↗", external: true } };
  }
  if (/hour|hours|open|opening|timing|close|closing|available now/.test(text)) {
    return { message: "Our opening hours aren’t listed here yet. Please message the team for today’s hours and availability.", action: whatsapp("please share today's opening hours and availability") };
  }
  if (/menu|dish|dishes|product|special|what do you have|food/.test(text) && !selectedItem) {
    return { message: "Madurai Mess serves banana-leaf meals, mutton chukka, naatukoli biryani, kari dosa, bun parotta, idli, masal dosa, curries and jigarthanda. Prices are listed in rupees on the menu card.", action: { href: "menu.html", label: "See dishes and prices ↗", external: false } };
  }
  if (selectedItem) return { message: selectedItem.name + " is ₹" + selectedItem.price + ". " + selectedItem.description };
  return { message: "I can help with Madurai Mess dishes, menu and price questions. For anything personal or more specific, message the team on WhatsApp.", action: whatsapp("please help with my question: " + question) };
}

function submitQuestion(question) {
  const cleaned = question.trim();
  if (!cleaned) return;
  addChatMessage(cleaned, 'user-message');
  const answer = answerQuestion(cleaned);
  window.setTimeout(() => addChatMessage(answer.message, 'bot-message', answer.action), 220);
}

chatLauncher?.addEventListener('click', () => toggleChat(chatPanel?.hidden));
chatClose?.addEventListener('click', () => toggleChat(false));
chatForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  submitQuestion(chatInput?.value || '');
  chatForm.reset();
});
document.querySelectorAll('.chat-quick-replies button').forEach((button) => {
  button.addEventListener('click', () => submitQuestion(button.dataset.question || ''));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && chatPanel && !chatPanel.hidden) toggleChat(false);
});
