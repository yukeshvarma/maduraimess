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
  if (/price|prices|cost|costs|rate|rates|how much|price list|menu price/.test(text)) {
    return { message: "I don’t have today’s prices yet, so I won’t guess. Send the dish name on WhatsApp and the team can share the latest price.", action: whatsapp("please share today's price for: " + question) };
  }
  if (/personal|private|owner|manager|complaint|feedback|catering|party|event|custom|booking|reservation|speak to/.test(text)) {
    return { message: "For a personal or custom query, WhatsApp is the quickest way to reach the team.", action: whatsapp("I have a personal query: " + question) };
  }
  if (/where|location|address|direction|map|reach you/.test(text)) {
    return { message: "We’re at 12, Tavareka Main Road, Madivala, Bangalore – 623167.", action: { href: "https://www.google.com/maps/search/?api=1&query=12%2C%20Tavareka%20Main%20Road%2C%20Madivala%2C%20Bangalore%20623167", label: "Open directions ↗", external: true } };
  }
  if (/hour|hours|open|opening|timing|close|closing|available now/.test(text)) {
    return { message: "Our opening hours aren’t listed here yet. Please message the team for today’s hours and availability.", action: whatsapp("please share today's opening hours and availability") };
  }
  if (/menu|dish|dishes|product|special|what do you have|food/.test(text) && !/biryani|chukka|sukka|parotta|jigarthanda|kari dosa|chicken 65|idli|dosa|coffee/.test(text)) {
    return { message: "Our Madurai highlights are mutton chukka, naatukozhi biryani, bun parotta and jigarthanda. The menu card is a draft; message us to confirm what’s available today.", action: { href: "menu.html", label: "See the menu card ↗", external: false } };
  }
  if (/jigarthanda|jigar thanda/.test(text)) return { message: "Jigarthanda is Madurai’s famous chilled treat, made with milk, nannari syrup, almond gum and ice cream." };
  if (/bun parotta|parotta|paratha|porotta/.test(text)) return { message: "Bun parotta is a rounded, layered Madurai favourite: soft inside, golden at the edges and lovely with salna." };
  if (/naatukozhi|nattukozhi|naatu kozhi|country chicken/.test(text)) return { message: "Naatukozhi biryani pairs country chicken with fragrant rice and warm Tamil spices. It’s one of Madurai Mess’s signature highlights." };
  if (/biryani|biriyani/.test(text)) return { message: "Our signature is naatukozhi biryani: country chicken, fragrant rice and warm Tamil spices." };
  if (/mutton|chukka|sukka/.test(text)) return { message: "Mutton chukka is a southern mess favourite with a peppery, dry-finished masala and curry leaves." };
  if (/kari dosa|keema dosa/.test(text)) return { message: "Kari dosa is a Madurai-style dosa topped with spiced minced meat. It appears on our draft menu; please confirm today’s availability." };
  if (/kothu/.test(text)) return { message: "Kothu parotta is chopped parotta tossed hot on the tawa with masala, egg and curry leaves. Please confirm today’s availability with the team." };
  if (/chicken 65/.test(text)) return { message: "Chicken 65 is a crisp, spice-forward Tamil restaurant favourite. Please confirm today’s availability with the team." };
  if (/idli|dosa/.test(text)) return { message: "Idli and dosa are South Indian tiffin staples. Please check today’s availability with the team." };
  if (/coffee|filter/.test(text)) return { message: "Filter coffee is listed as a comforting South Indian finish on our draft menu. Please confirm availability with the team." };
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
