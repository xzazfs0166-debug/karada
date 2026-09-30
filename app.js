// ============================================================
// わたしのからだセルフチェック  データ＋動き
// 質問・結果の文章・リンク先は、すべてこのファイルの上半分で直せます
// ============================================================

// ---------- リンク先（空欄のボタンは「準備中」と表示） ----------
const LINKS = {
  telmee:    { label: '🌿 テルミーについて知る', url: 'https://www.canva.com/design/DAHGP-GtOPs/KsXIl6oJmzJTWlI7v1FAqA/view' },
  line:      { label: '公式LINEで「相談」と送る', url: 'https://lin.ee/XWCoZGy' }
};

// ---------- 回答のしかた ----------
const SCALE = [
  { label: 'ほとんどない', point: 0 },
  { label: 'ときどきある', point: 1 },
  { label: 'よくある', point: 2 }
];

// ---------- 体質チェック 15問 ----------
const BODY_QS = [
  { text: '朝起きても疲れが残っている', type: 'recharge' },
  { text: '日中、疲れやすい', type: 'recharge' },
  { text: '食欲があまりない', type: 'recharge' },
  { text: '胃腸の調子が気になる', type: 'recharge' },
  { text: '風邪をひきやすい', type: 'recharge' },
  { text: '肩や首がこりやすい', type: 'flow' },
  { text: '手足の冷えが気になる', type: 'flow' },
  { text: '身体が重だるい', type: 'flow' },
  { text: 'むくみが気になる', type: 'flow' },
  { text: '運動不足を感じている', type: 'flow' },
  { text: '呼吸が浅いと感じることがある', type: 'relax' },
  { text: '休んでいても、頭の中で考えごとが続く', type: 'relax' },
  { text: '日常的にストレスを感じている', type: 'relax' },
  { text: 'イライラしやすい', type: 'relax' },
  { text: '自分のための時間が少ない', type: 'relax' }
];

// ---------- 睡眠チェック 8問（tendency = 「よくある」のときの結果表示） ----------
const SLEEP_QS = [
  { text: '朝すっきり起きられない', tendency: '朝すっきり起きにくい' },
  { text: '寝ても疲れが取れない', tendency: '眠っても疲れが残りやすい' },
  { text: '日中眠くなる', tendency: '日中に眠気が出やすい' },
  { text: '寝つくまでに時間がかかる', tendency: '寝つくまでに時間がかかりやすい' },
  { text: '夜中に目が覚める', tendency: '夜中に目が覚めることが多い' },
  { text: '朝早く目が覚める', tendency: '朝早く目が覚めやすい' },
  { text: '休日は平日より長く眠る', tendency: '休日に眠りをまとめてとりやすい' },
  { text: '寝る直前までスマホを見ている', tendency: '寝る直前までスマホを見ていることが多い' }
];

// ---------- 今の自分が求めていること（複数選択） ----------
const WISHES = [
  { key: 'energy', text: '疲れを感じにくい毎日を送りたい' },
  { key: 'warm',   text: '身体を温めたい' },
  { key: 'sleep',  text: 'ぐっすり眠りたい' },
  { key: 'loosen', text: '心と身体をゆるめたい' },
  { key: 'food',   text: '食生活を見直したい' },
  { key: 'mytime', text: '自分のための時間をつくりたい' },
  { key: 'know',   text: '今の身体の状態を知りたい' }
];

// ---------- タイプ別の結果 ----------
// care の wish は「求めていること」と一致すると上に並ぶ
const TYPES = {
  recharge: {
    name: 'リチャージタイプ', catch: 'エネルギーを補いたいあなたへ', color: 'var(--recharge)', soft: 'var(--recharge-soft)',
    tendency: '疲れが抜けにくい、食欲や胃腸の調子、季節の変わり目の体調など、「エネルギーの補給」に関わるところが気になっているようです。',
    message: '最近、疲れが抜けにくかったり、朝から身体が重く感じたりすることはありませんか？<br>今は、エネルギーを使うことだけでなく、自分をいたわる時間にも目を向けてみませんか？',
    foods: '山芋、かぼちゃ、黒豆、ほうれん草、なつめ、生姜、納豆、甘酒',
    foodsNote: '冷たい飲みものや生ものが多い日は、温かい汁ものを一品足すくらいの気持ちで。',
    care: [
      { cat: '食事', text: '温かい汁ものを1日1回。食欲がない日はひと口からで十分', wish: ['food', 'energy'] },
      { cat: '休息', text: '睡眠時間と、寝る・起きる時間のリズムを見直してみる', wish: ['sleep', 'energy'] },
      { cat: '温活', text: 'お腹や腰まわりに、心地よい温かさを取り入れる', wish: ['warm'] },
      { cat: '運動', text: '無理のない散歩やストレッチを、気が向いたときに', wish: ['energy', 'loosen'] },
      { cat: '自分時間', text: '予定の中に「何もしない時間」を先に入れておく', wish: ['mytime', 'loosen'] }
    ],
    telmee: '疲れを感じる毎日の中で、ほっとひと息つく時間をつくりませんか？',
    melaleuca: '日々の食生活や栄養バランスを見直したいときに、まこが取り入れているものを紹介しています。'
  },
  flow: {
    name: 'フロータイプ', catch: '身体のめぐりを意識したいあなたへ', color: 'var(--flow)', soft: 'var(--flow-soft)',
    tendency: '肩や首のこわばり、冷え、むくみ、身体の重さなど、「めぐり」に関わるところが気になっているようです。',
    message: '最近、身体の重さや冷え、肩まわりのこわばりを感じていませんか？<br>忙しい毎日の中で、身体を動かしたり、ゆっくり温まる時間が少なくなっているのかもしれません。',
    foods: '玉ねぎ、青魚、黒きくらげ、大根、緑豆、しそ、柑橘',
    foodsNote: '脂っこいものや甘いものが続いたなと感じたら、野菜や汁ものでバランスをとるくらいでOK。',
    care: [
      { cat: '入浴', text: '心地よい温度の湯船に、ゆっくりつかる', wish: ['warm', 'loosen'] },
      { cat: '運動', text: '1日10分のウォーキングや、肩・首をまわすストレッチ', wish: ['energy', 'warm'] },
      { cat: '食事', text: 'できる範囲で、食事の時間をそろえてみる', wish: ['food'] },
      { cat: '休息', text: '寝る前に深呼吸して、身体をゆるめる時間をつくる', wish: ['sleep', 'loosen'] },
      { cat: '自分時間', text: '溜まった気持ちを、書き出したり誰かに話したりする', wish: ['mytime', 'loosen'] }
    ],
    telmee: '冷えや肩まわりのこわばりが気になる方へ。温かさに包まれながら、自分の身体と向き合う時間を。',
    melaleuca: '毎日の食生活や入浴時間など、暮らしの中でまこが取り入れているものを紹介しています。'
  },
  relax: {
    name: 'リラックスタイプ', catch: '心と身体をゆるめたいあなたへ', color: 'var(--relax)', soft: 'var(--relax-soft)',
    tendency: '寝つきや夜中の目覚め、ストレスやイライラ、自分の時間の少なさなど、「ゆるむ時間」に関わるところが気になっているようです。',
    message: '毎日、周りのことや、やることに追われていませんか？<br>少しだけ立ち止まって、自分のために過ごす時間をつくってみませんか？',
    foods: '黒ごま、ナッツ、百合根、なつめ、緑黄色野菜、豆腐',
    foodsNote: 'コーヒーや辛いものが続いた日は、夜だけ温かいお茶に替えてみるのもひとつ。',
    care: [
      { cat: '睡眠', text: '寝る前30分は、スマホを置いてみる', wish: ['sleep'] },
      { cat: '休息', text: '吐く息を長めに。3秒吸って、6秒はく深呼吸', wish: ['loosen', 'sleep'] },
      { cat: '自分時間', text: '読書や音楽など、自分のためだけの時間を少しだけ', wish: ['mytime', 'loosen'] },
      { cat: '運動', text: '軽い散歩やヨガで、気持ちを切りかえる', wish: ['energy', 'loosen'] },
      { cat: '食事', text: '食事の時間は、できるだけ座ってゆっくりと', wish: ['food'] }
    ],
    telmee: '日々の忙しさから少し離れて、ほっとゆるむ時間を過ごしませんか？',
    melaleuca: '入浴や日常のリラックスタイムを楽しむために、まこが取り入れているものを紹介しています。'
  }
};

// どのタイプも0点のとき
const BALANCED = {
  name: '今は、大きなかたよりは少なめ', catch: '今の心地よさを大切にしたいあなたへ',
  message: '今回のチェックでは、気になるサインは少なめでした。<br>今の心地よさを保つために、続けたいことをひとつ選んでみませんか？'
};

// ============================================================
// ここから下は画面の動き
// ============================================================
const answers = { body: Array(BODY_QS.length).fill(null), sleep: Array(SLEEP_QS.length).fill(null) };
const wishes = new Set();
const $ = id => document.getElementById(id);

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.hidden = s.id !== id);
  const order = ['screen-top', 'screen-body', 'screen-sleep', 'screen-wish', 'screen-result'];
  $('progress-bar').style.width = (order.indexOf(id) / (order.length - 1) * 100) + '%';
  window.scrollTo(0, 0);
}

function renderScale(listId, qs, key) {
  const list = $(listId);
  list.innerHTML = '';
  qs.forEach((q, i) => {
    const li = document.createElement('li');
    li.className = 'q';
    li.innerHTML = `<p class="q-text"><span class="q-no">${i + 1}</span></p><div class="scale" role="radiogroup"></div>`;
    li.querySelector('.q-text').append(q.text);
    const box = li.querySelector('.scale');
    SCALE.forEach(s => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = s.label;
      b.setAttribute('role', 'radio');
      const sync = () => box.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-checked', answers[key][i] === SCALE[j].point));
      b.addEventListener('click', () => { answers[key][i] = s.point; sync(); updateNext(key); });
      box.appendChild(b);
      sync();
    });
    list.appendChild(li);
  });
  updateNext(key);
}

function updateNext(key) {
  const left = answers[key].filter(a => a === null).length;
  const btn = $('next-' + key);
  btn.disabled = left > 0;
  btn.textContent = left > 0 ? `あと${left}問` : 'つぎへ';
}

function renderWishes() {
  const list = $('wish-list');
  list.innerHTML = '';
  WISHES.forEach(w => {
    const li = document.createElement('li');
    li.innerHTML = '<label class="check"><input type="checkbox"><span class="box" aria-hidden="true"></span><span></span></label>';
    li.querySelector('span:last-child').textContent = w.text;
    const cb = li.querySelector('input');
    cb.checked = wishes.has(w.key);
    cb.addEventListener('change', () => cb.checked ? wishes.add(w.key) : wishes.delete(w.key));
    list.appendChild(li);
  });
}

function linkButton(k, sub, className = '') {
  const l = LINKS[k];
  const classes = `link-btn ${className}${l.url ? '' : ' off'}`.trim();
  const tag = l.url ? `<a class="${classes}" href="${l.url}" target="_blank" rel="noopener">` : `<a class="${classes}" aria-disabled="true">`;
  return `${tag}<b>${l.label}</b>${sub ? `<small>${sub}</small>` : ''}${l.url ? '' : '<small class="soon">（準備中）</small>'}</a>`;
}

function renderResult() {
  const score = { recharge: 0, flow: 0, relax: 0 };
  BODY_QS.forEach((q, i) => score[q.type] += answers.body[i]);
  const max = Math.max(...Object.values(score));
  const mains = max === 0 ? [] : Object.keys(score).filter(t => score[t] === max);
  const sleepTotal = answers.sleep.reduce((a, b) => a + b, 0);
  const totalScore = Object.values(score).reduce((a, b) => a + b, 0) + sleepTotal;
  const step = totalScore >= 30 ? 0 : totalScore >= 20 ? 1 : totalScore >= 10 ? 2 : 3;
  const steps = [
    { title: 'まずは、消化力を整えるところから', text: '温かく消化しやすい食事と休息で、身体が栄養を受け取るための土台をつくる段階です。' },
    { title: '必要な栄養を、少しずつ受け取る', text: '食事の量や種類を無理なく整えて、使ったエネルギーを補っていく段階です。' },
    { title: '栄養とエネルギーを、身体にめぐらせる', text: '軽い運動や入浴、深い呼吸を取り入れて、身体のめぐりを育てる段階です。' },
    { title: '今の調子を、<br>心地よく育てて保つ', text: '今できている習慣を大切にしながら、自分に合う整え方を続けていく段階です。' }
  ];

  const stateCopy = {
    recharge: {
      title: 'エネルギーを補いたい状態',
      summary: '今は前に進むことより、温めて休み、使った力を戻すことを優先しましょう。',
      summaryHtml: '今は前に進むことより、温めて休み、<br>使った力を戻すことを優先しましょう。',
      reason: '身体を温めて、がんばり続けている身体に休む合図を送ります。',
      futureTitle: '疲れが抜けにくく、<br>動きたいときに動けないことも',
      futureText: '補う力が足りないまま頑張り続けると、身体は限られたエネルギーを粘膜や内臓などの大切な働きに優先して使います。そのぶん余力が減り、朝から重い、気力が続かないなど、さまざまな不調を感じやすくなることがあります。'
    },
    flow: {
      title: 'めぐりを整えたい状態',
      summary: '身体にたまった重さやこわばりを、心地よい動きで少しずつ流していきたい時です。',
      summaryHtml: '身体にたまった重さやこわばりを、<br>心地よい動きで少しずつ流していきたい時です。',
      reason: '少し身体を動かすと、冷えやこわばりをゆるめるきっかけになります。',
      futureTitle: '重さやこわばりが、いつもの状態になることも',
      futureText: 'めぐりにくい状態が続くと、冷えやむくみ、肩まわりのつらさが残り、動くことがおっくうになることがあります。'
    },
    relax: {
      title: 'こころと身体をゆるめたい状態',
      summary: '考えることや、やることが続いているようです。まずは緊張をほどく時間をつくりましょう。',
      summaryHtml: '考えることや、やることが続いているようです。<br>まずは緊張をほどく時間をつくりましょう。',
      reason: '呼吸を整えると、頭と身体を休む時間へ切り替えやすくなります。',
      futureTitle: '休んでも、こころと身体が休まりにくくなることも',
      futureText: '緊張が続くと、眠りが浅い、考えごとが止まらない、ちょっとしたことで疲れる状態につながることがあります。'
    },
    balanced: {
      title: '今の調子を保てている状態',
      titleHtml: '今の調子を、<br>保てている状態',
      summary: '大きく気になる傾向は少なめです。今の心地よい習慣を、無理なく続けていきましょう。',
      summaryHtml: '大きく気になる傾向は少なめです。<br>今の心地よい習慣を、<br>無理なく続けていきましょう。',
      reason: '今の自分が心地よいと感じることを\n続けるのが、いちばんのセルフケアです。',
      futureTitle: '小さな変化に早めに気づけば、今の調子を保ちやすくなります',
      futureText: '忙しい日が続くとバランスは変わります。今の心地よい習慣と、自分に出やすいサインを知っておきましょう。'
    }
  };
  const stateWishes = {
    recharge: ['energy', 'food'],
    flow: ['warm'],
    relax: ['sleep', 'loosen', 'mytime']
  };
  const mainKey = mains.length
    ? mains.slice().sort((a, b) => stateWishes[b].filter(w => wishes.has(w)).length - stateWishes[a].filter(w => wishes.has(w)).length)[0]
    : 'balanced';
  const now = stateCopy[mainKey];
  $('r-now-title').innerHTML = now.titleHtml || now.title;
  $('r-now-summary').innerHTML = now.summaryHtml || now.summary;
  $('r-future-title').innerHTML = now.futureTitle;
  $('r-future-text').textContent = now.futureText;
  $('r-future').dataset.type = mainKey;
  $('r-care-illustration').dataset.type = mainKey;
  $('r-care-illustration').querySelector('img').src = `care-${mainKey === 'balanced' ? 'recharge' : mainKey}.png`;

  // ① タイプ
  const head = $('r-type');
  if (mains.length) {
    const t = TYPES[mains[0]];
    head.style.setProperty('--accent', t.color);
    head.style.setProperty('--accent-soft', t.soft);
    $('r-type-name').textContent = mains.map(m => TYPES[m].name).join(' × ');
    $('r-type-catch').textContent = mains.length > 1 ? 'ふたつ以上の傾向が、同じくらい出ています' : '〜' + t.catch + '〜';
  } else {
    head.style.setProperty('--accent', 'var(--main)');
    head.style.setProperty('--accent-soft', 'var(--main-soft)');
    $('r-type-name').textContent = BALANCED.name;
    $('r-type-catch').textContent = '〜' + BALANCED.catch + '〜';
  }

  // 点数のバー（良い・悪いではなく「気になっている度合い」）
  $('r-bars').innerHTML = Object.keys(score).map(t =>
    `<div class="bar-row"><span class="bar-name">${TYPES[t].name.replace('タイプ', '')}</span><span class="bar"><i style="width:${score[t] / 10 * 100}%;background:${TYPES[t].color}"></i></span></div>`
  ).join('');

  // 睡眠の傾向
  const often = SLEEP_QS.filter((q, i) => answers.sleep[i] === 2).map(q => q.tendency);
  const some = SLEEP_QS.filter((q, i) => answers.sleep[i] === 1).map(q => q.tendency);
  const sleepList = often.length ? often : some.slice(0, 2);
  $('r-sleep').innerHTML = sleepTotal === 0
    ? '眠りについては、気になるサインは少なめでした。'
    : sleepList.map(s => `<span class="chip">${s}</span>`).join('') + '<br>' +
      (sleepTotal >= 8 ? '眠りのことが、今いちばんの手当てどころかもしれません。' : '眠りについて、少し気になるサインが出ているようです。');

  // ②〜⑤ タイプ別
  const box = $('r-types');
  box.innerHTML = '';
  const careAll = [];
  if (!mains.length) $('r-message-balanced').innerHTML = BALANCED.message;
  $('r-message-balanced').hidden = mains.length > 0;
  mains.forEach(m => {
    const t = TYPES[m];
    const sec = document.createElement('section');
    sec.className = 'card type-card';
    sec.style.setProperty('--accent', t.color);
    sec.style.setProperty('--accent-soft', t.soft);
    sec.innerHTML =
      `<p class="eyebrow">${t.name}</p>` +
      `<h4>今の身体の傾向</h4><p>${t.tendency}</p>` +
      `<h4>今のあなたへのメッセージ</h4><p class="message">${t.message}</p>` +
      `<h4>おすすめの食材</h4><p class="foods">${t.foods}</p><p class="muted">${t.foodsNote}</p>`;
    box.appendChild(sec);
    t.care.forEach(c => careAll.push(c));
  });
  if (!mains.length) Object.values(TYPES).forEach(t => careAll.push(t.care[0], t.care[1]));

  // 睡眠が気になる人には睡眠ケアを1つ足す
  if (sleepTotal >= 4 && !careAll.some(c => c.cat === '睡眠')) careAll.push(TYPES.relax.care[0]);

  // 求めていることと重なるものを上に
  const hit = c => c.wish.filter(w => wishes.has(w)).length;
  const cares = careAll.filter((c, i) => careAll.findIndex(x => x.text === c.text) === i)
    .map((c, i) => ({ ...c, i })).sort((a, b) => hit(b) - hit(a) || a.i - b.i).slice(0, 2);
  const firstActions = {
    recharge: '温かい汁ものを、ひと口からゆっくり味わう',
    flow: '肩と首をゆっくり回して、10分だけ歩いてみる',
    relax: '3秒吸って、6秒はく呼吸を3回くり返す',
    balanced: '今の自分が心地よいことを、ひとつ続ける'
  };
  const firstActionHtml = {
    recharge: '温かい汁ものを、<br>ひと口からゆっくり味わう',
    flow: '肩と首をゆっくり回して、<br>10分だけ歩いてみる',
    relax: '3秒吸って、6秒はく呼吸を<br>3回くり返す',
    balanced: '今の自分が心地よいことを、<br>ひとつ続ける'
  };
  $('r-first-care').innerHTML = firstActionHtml[mainKey];
  $('r-first-reason').innerHTML = now.reason.replace('\n', '<br>');
  const stepGuidance = [
    {
      caution: 'STEP 0では、食べたものを十分に受け取る土台が弱っている可能性があります。まずは消化の負担を減らし、休息や温めるケアから丁寧に始めることが大切です。'
    },
    {
      caution: '今は、身体が使った力を少しずつ補う段階です。食事だけに頼らず、休息や生活の整え方も一緒に見直しましょう。'
    },
    {
      caution: '補ったものを全身にめぐらせる段階です。無理のない動きや入浴、呼吸を自分のペースで続けましょう。'
    },
    {
      caution: '忙しい時に出やすいサインを知り、今の心地よい習慣を続けることが予防につながります。'
    }
  ];
  $('r-step-caution').textContent = stepGuidance[step].caution;
  $('r-step').innerHTML = `<span>今の整え方の入口は</span><b>STEP ${step}</b><strong>${steps[step].title}</strong><p>${steps[step].text}</p><small>STEPは良い・悪いではなく、今どこから整えるとよいかを表しています。</small><div class="step-overview">${steps.map((s, i) => `<div class="step-row ${i === step ? 'is-current' : ''}"><em>STEP ${i}</em><span>${s.title}</span>${i === step ? '<i>今ここ</i>' : ''}</div>`).join('')}</div>`;
  const stateNames = { recharge: ['補う力', '温かく休む'], flow: ['めぐる力', '軽く動かす'], relax: ['ゆるむ力', '深く休む'] };
  $('r-state-map').innerHTML = Object.keys(score).map(t => {
    const level = score[t] <= 2 ? 'おだやか' : score[t] <= 5 ? '少し気になる' : '今いちばん大切';
    const width = Math.max(8, score[t] / 10 * 100);
    return `<div class="state-row ${t === mainKey ? 'is-main' : ''}"><div><b>${stateNames[t][0]}</b><small>${stateNames[t][1]}</small></div><span class="state-track"><i style="width:${width}%;background:${TYPES[t].color}"></i></span><em>${level}</em></div>`;
  }).join('');
  $('r-balance-picture').innerHTML = `<span class="balance-dot ${mainKey}"></span><span class="balance-axis axis-r">補う</span><span class="balance-axis axis-f">めぐる</span><span class="balance-axis axis-l">ゆるむ</span><small>今のあなた</small>`;
  if ($('r-care')) $('r-care').innerHTML = cares.map(c =>
    `<li><span class="cat">${c.cat}</span>${c.text}${hit(c) ? '<span class="match">あなたの願いに近い</span>' : ''}</li>`
  ).join('');

  // ⑥ もうひとつのセルフケア
  const main = mains.length ? TYPES[mains[0]] : null;
  $('r-links').innerHTML =
    linkButton('line', 'タップすると公式LINEが開きます', 'primary') +
    linkButton('telmee', main ? main.telmee : '温かさに包まれながら、ほっとひと息つく時間を。');

  // 今日のひとつ
  const picks = [firstActions[mainKey], ...cares.map(c => c.text)].filter((p, i, a) => a.indexOf(p) === i).slice(0, 3);
  if ($('r-pick')) {
    $('r-pick').innerHTML = picks.map((p, i) => `<button type="button" class="pick" data-i="${i}">${p}</button>`).join('');
    $('r-pick-done').hidden = true;
    $('r-pick').querySelectorAll('.pick').forEach(b => b.addEventListener('click', () => {
      $('r-pick').querySelectorAll('.pick').forEach(x => x.setAttribute('aria-pressed', x === b));
      $('r-pick-text').textContent = b.textContent;
      $('r-pick-done').hidden = false;
    }));
  }

  show('screen-result');
}

// ボタン
$('btn-start').addEventListener('click', () => { renderScale('body-list', BODY_QS, 'body'); show('screen-body'); });
$('next-body').addEventListener('click', () => { renderScale('sleep-list', SLEEP_QS, 'sleep'); show('screen-sleep'); });
$('back-body').addEventListener('click', () => show('screen-top'));
$('next-sleep').addEventListener('click', () => { renderWishes(); show('screen-wish'); });
$('back-sleep').addEventListener('click', () => show('screen-body'));
$('next-wish').addEventListener('click', renderResult);
$('back-wish').addEventListener('click', () => show('screen-sleep'));
$('btn-retry').addEventListener('click', () => {
  answers.body.fill(null); answers.sleep.fill(null); wishes.clear();
  show('screen-top');
});

// ============================================================
// 水彩風の葉っぱ（絵はプログラムで描いているので画像ファイル不要）
// data-seed で葉の配置が変わる／data-sleep="1" で眠る女性の線画を重ねる
// ============================================================
function drawLeaves(el) {
  let seed = Number(el.dataset.seed || 1);
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const greens = ['#8fb07a', '#a9c48f', '#6f9a6a', '#c3d6a4', '#557f62', '#9dbb86', '#3f6655'];
  const id = 'wc' + seed;
  let leaves = '';
  const leaf = (x, y, r, s, c, o) => {
    const vein = rand() < 0.6 ? `<path d="M0 -38 L0 36" stroke="${c}" stroke-width="1.2" opacity=".6"/>` +
      [-24, -12, 0, 12].map(v => `<path d="M0 ${v} L-9 ${v - 9} M0 ${v + 5} L9 ${v - 4}" stroke="${c}" stroke-width=".8" opacity=".5"/>`).join('') : '';
    return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})" filter="url(#${id})">` +
      `<path d="M0 -40 C18 -22 18 22 0 40 C-18 22 -18 -22 0 -40Z" fill="${c}" opacity="${o}"/>${vein}</g>`;
  };
  // 上の茂み と 下の茂み
  for (let i = 0; i < 26; i++) leaves += leaf(rand() * 360, rand() * 70 - 10, rand() * 180 - 90, .5 + rand() * .7, greens[i % 7], .35 + rand() * .35);
  const thin = el.classList.contains('thin');
  if (!thin) for (let i = 0; i < 22; i++) leaves += leaf(rand() * 360, 180 + rand() * 50, rand() * 60 - 30 + (rand() < .5 ? 180 : 0), .4 + rand() * .6, greens[(i + 3) % 7], .3 + rand() * .35);
  const sleeper = el.dataset.sleep ? `
    <g transform="translate(-45 0)">
      <circle cx="158" cy="116" r="24" fill="#b9655c" opacity=".5" filter="url(#${id})"/>
      <path d="M150 110 C166 96 196 96 210 112 C236 120 262 118 290 124" fill="none" stroke="#2f3a34" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M156 118 C152 136 166 150 186 149 C200 148 208 139 208 128" fill="#fbfaf4" stroke="#2f3a34" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M208 132 C236 144 262 146 288 140" fill="none" stroke="#2f3a34" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M170 130 q5 4 10 0 M189 129 q5 4 10 0" fill="none" stroke="#2f3a34" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="175" cy="139" r="4.5" fill="#e8a3a3" opacity=".75"/>
      <circle cx="199" cy="138" r="4.5" fill="#e8a3a3" opacity=".75"/>
      <path d="M184 156 C174 162 176 172 192 170 L214 162" fill="none" stroke="#2f3a34" stroke-width="1.4" stroke-linecap="round"/>
    </g>` : '';
  el.innerHTML = `<svg viewBox="0 0 360 220" preserveAspectRatio="${thin ? 'xMidYMin' : 'xMidYMid'} slice" aria-hidden="true">
    <defs><filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter></defs>
    ${leaves}${sleeper}</svg>`;
}
document.querySelectorAll('.leaves').forEach(drawLeaves);

// 今日の日付カード
(() => {
  const d = new Date();
  $('day-num').textContent = d.getDate();
  $('day-week').textContent = (d.getMonth() + 1) + '月 ' + '日月火水木金土'[d.getDay()] + '曜日';
})();
