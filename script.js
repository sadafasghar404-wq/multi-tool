// ═══════════════════════════════════════
// CHRONOS CALCULATOR — Age, Day & Zodiac
// ═══════════════════════════════════════

const ZODIAC = [
  { sign: 'Capricorn',  emoji: '♑', start: [12,22], end: [1,19],  dates: 'Dec 22 – Jan 19',
    fact: 'Ruthlessly ambitious and quietly disciplined, Capricorns are the CEOs of the zodiac. They don\'t dream small — they draft five-year plans before breakfast and actually execute them.' },
  { sign: 'Aquarius',   emoji: '♒', start: [1,20],  end: [2,18],  dates: 'Jan 20 – Feb 18',
    fact: 'Aquarians are the galaxy-brained visionaries who were thinking about AI rights and climate tech fifteen years before it was cool. Rebels with extraordinary causes.' },
  { sign: 'Pisces',     emoji: '♓', start: [2,19],  end: [3,20],  dates: 'Feb 19 – Mar 20',
    fact: 'Deeply intuitive and impossibly creative, Pisces folk feel everything at cinematic depth. They\'re the artists, dreamers, and empaths who see the world in colours no one else can name.' },
  { sign: 'Aries',      emoji: '♈', start: [3,21],  end: [4,19],  dates: 'Mar 21 – Apr 19',
    fact: 'First in the zodiac, first to volunteer, first to text back — Aries charges into life with pure fire energy. They don\'t ask for permission; they ask for forgiveness, but rarely need to.' },
  { sign: 'Taurus',     emoji: '♉', start: [4,20],  end: [5,20],  dates: 'Apr 20 – May 20',
    fact: 'Taureans have perfected the art of staying put — in the best possible way. Loyal to a fault, lovers of fine things, and absolutely immovable when they\'ve made up their mind.' },
  { sign: 'Gemini',     emoji: '♊', start: [5,21],  end: [6,20],  dates: 'May 21 – Jun 20',
    fact: 'Two personalities? More like a full ensemble cast. Geminis are the most entertaining people at any gathering — witty, curious, and always three conversations ahead of everyone else.' },
  { sign: 'Cancer',     emoji: '♋', start: [6,21],  end: [7,22],  dates: 'Jun 21 – Jul 22',
    fact: 'Cancers have a superpower: they can read the emotional temperature of a room in 0.3 seconds. Deeply nurturing and fiercely protective — cross their loved ones at your own peril.' },
  { sign: 'Leo',        emoji: '♌', start: [7,23],  end: [8,22],  dates: 'Jul 23 – Aug 22',
    fact: 'Leos don\'t walk into rooms — they arrive. Born with an invisible crown and the charisma to back it up, they live to inspire, create, and be spectacularly, unapologetically themselves.' },
  { sign: 'Virgo',      emoji: '♍', start: [8,23],  end: [9,22],  dates: 'Aug 23 – Sep 22',
    fact: 'Virgos noticed three typos in this description. They\'re the quiet perfectionists who make everything around them work better — precise, analytical, and ruthlessly competent.' },
  { sign: 'Libra',      emoji: '♎', start: [9,23],  end: [10,22], dates: 'Sep 23 – Oct 22',
    fact: 'Libras are the gorgeous diplomats of the cosmos — charming, fair-minded, and genuinely distressed by injustice. They will spend 45 minutes choosing between two equally good options.' },
  { sign: 'Scorpio',    emoji: '♏', start: [10,23], end: [11,21], dates: 'Oct 23 – Nov 21',
    fact: 'Scorpios see through everything — every lie, every hidden motive, every carefully curated persona. Magnetic and intense, they love with their whole soul and remember every slight forever.' },
  { sign: 'Sagittarius',emoji: '♐', start: [11,22], end: [12,21], dates: 'Nov 22 – Dec 21',
    fact: 'Sagittarians are cosmic adventurers with a philosophy degree and a one-way ticket to somewhere amazing. Brutally honest, outrageously optimistic, and allergic to boredom.' },
];

function getZodiac(day, month) {
  for (const z of ZODIAC) {
    const [sm, sd] = z.start, [em, ed] = z.end;
    if (sm > em) { // Capricorn spans year boundary
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return z;
    } else {
      if ((month === sm && day >= sd) || (month === em && day <= ed) ||
          (month > sm && month < em)) return z;
    }
  }
  return ZODIAC[0];
}

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function calcAge(dob) {
  const today = new Date(2026, 2, 8); // March 8 2026 - current date
  let years  = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth()    - dob.getMonth();
  let days   = today.getDate()     - dob.getDate();
  if (days < 0) { months--; const prev = new Date(today.getFullYear(), today.getMonth(), 0); days += prev.getDate(); }
  if (months < 0) { years--; months += 12; }
  return { years, months, days };
}

function handleCalculate() {
  const dd = parseInt(document.getElementById('dob-dd').value, 10);
  const mm = parseInt(document.getElementById('dob-mm').value, 10);
  const yyyy = parseInt(document.getElementById('dob-yyyy').value, 10);
  const errEl = document.getElementById('calc-error');
  const resEl = document.getElementById('results-container');
  errEl.classList.remove('show'); resEl.classList.remove('show');

  // Validation
  if (!dd || !mm || !yyyy || isNaN(dd) || isNaN(mm) || isNaN(yyyy)) {
    errEl.querySelector('.err-text').textContent = 'Please fill in all three fields (DD / MM / YYYY).';
    errEl.classList.add('show'); return;
  }
  if (mm < 1 || mm > 12) { errEl.querySelector('.err-text').textContent = 'Month must be between 01 and 12.'; errEl.classList.add('show'); return; }
  if (dd < 1 || dd > 31) { errEl.querySelector('.err-text').textContent = 'Day must be between 01 and 31.'; errEl.classList.add('show'); return; }
  if (yyyy < 1900 || yyyy > 2026) { errEl.querySelector('.err-text').textContent = 'Please enter a valid year (1900–2026).'; errEl.classList.add('show'); return; }

  const dob = new Date(yyyy, mm - 1, dd);
  if (dob > new Date(2026, 2, 8)) { errEl.querySelector('.err-text').textContent = 'Date of birth cannot be in the future!'; errEl.classList.add('show'); return; }
  if (dob.getDate() !== dd) { errEl.querySelector('.err-text').textContent = 'Invalid date — that day doesn\'t exist in that month.'; errEl.classList.add('show'); return; }

  const age = calcAge(dob);
  const zodiac = getZodiac(dd, mm);
  const dayName = DAYS[dob.getDay()];
  const ordinal = (n) => { const s=['th','st','nd','rd'], v=n%100; return n+(s[(v-20)%10]||s[v]||s[0]); };

  document.getElementById('res-years').textContent  = age.years;
  document.getElementById('res-months').textContent = age.months;
  document.getElementById('res-days').textContent   = age.days;
  document.getElementById('res-day-name').textContent = dayName;
  document.getElementById('res-dob-fmt').textContent =
    `${ordinal(dd)} ${['','January','February','March','April','May','June','July','August','September','October','November','December'][mm]} ${yyyy}`;

  document.getElementById('zodiac-emoji').textContent = zodiac.emoji;
  document.getElementById('zodiac-name').textContent  = zodiac.sign;
  document.getElementById('zodiac-dates').textContent = zodiac.dates;
  document.getElementById('zodiac-fact').textContent  = zodiac.fact;
  document.getElementById('day-born-text').innerHTML  =
    `You were born on a <strong>${dayName}</strong> — ${getDayPersonality(dayName)}`;

  resEl.classList.add('show');
  resEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getDayPersonality(day) {
  const p = {
    Monday:    'Monday\'s children are said to be fair of face — dreamy, intuitive, and ruled by the moon.',
    Tuesday:   'Tuesday-born are Mars-ruled — action-oriented heroes with a warrior's resolve.',
    Wednesday: 'Born mid-week under Mercury — quick-witted, communicative, and sharp as lightning.',
    Thursday:  'Thursday\'s child has far to go — Jupiter-blessed with wisdom, luck, and wanderlust.',
    Friday:    'Venus rules Friday-born — naturally charming, creative, and lovers of all beautiful things.',
    Saturday:  'Saturn\'s day produces resilient realists — disciplined, patient, and built for the long game.',
    Sunday:    'Sunday-born bask in solar energy — warm, radiant, natural-born leaders with golden hearts.',
  };
  return p[day] || '';
}

// ═══════════════════════════════════════
// TAB SWITCHING
// ═══════════════════════════════════════
function switchTab(tab) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-chronos','active-news'));
  document.getElementById('panel-' + tab).classList.add('active');
  const btn = document.getElementById('btn-' + tab);
  btn.classList.add(tab === 'chronos' ? 'active-chronos' : 'active-news');
}

// Enter key to calculate
document.addEventListener('DOMContentLoaded', () => {
  ['dob-dd','dob-mm','dob-yyyy'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') handleCalculate(); });
  });
  // Auto-advance inputs
  document.getElementById('dob-dd').addEventListener('input', function() { if (this.value.length === 2) document.getElementById('dob-mm').focus(); });
  document.getElementById('dob-mm').addEventListener('input', function() { if (this.value.length === 2) document.getElementById('dob-yyyy').focus(); });
});
