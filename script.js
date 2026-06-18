const questions = [
  { text: "許せない人や出来事を思い出すことがある。", type: "地獄界" },
  { text: "もっと認められたいと思うことが多い。", type: "餓鬼界" },
  { text: "深く考えるより、その場しのぎになりやすい。", type: "畜生界" },
  { text: "人と比較して落ち込んだり、優越感を持ったりする。", type: "修羅界" },
  { text: "自分の欠点や未熟さを学びの機会として受け止められる。", type: "人間界" },
  { text: "今の環境や人間関係に感謝することがある。", type: "天界" },
  { text: "自分の正しさを理解してもらえないと苦しい。", type: "地獄界" },
  { text: "何かを手に入れても、すぐ次に欲しいものが現れる。", type: "餓鬼界" },
  { text: "感情で反応して後悔することがある。", type: "畜生界" },
  { text: "負けたくないという気持ちが強い。", type: "修羅界" },
  { text: "自分と異なる意見にも耳を傾けることができる。", type: "人間界" },
  { text: "日常の中に喜びや幸せを感じることがある。", type: "天界" },
  { text: "誰かの失敗を見ると責めたくなる。", type: "地獄界" },
  { text: "他人の成功を素直に喜べないことがある。", type: "修羅界" },
  { text: "人生を長い視点で考えることがある。", type: "人間界" },
  { text: "不満よりも感謝に目を向けることができる。", type: "天界" },
  { text: "自分の欲求を優先し過ぎてしまうことがある。", type: "餓鬼界" },
  { text: "人の幸せや成長を願う気持ちがある。", type: "天界" }
];

const types = ["地獄界", "餓鬼界", "畜生界", "修羅界", "人間界", "天界"];

const typeEmoji = {
  "地獄界": "🔥",
  "餓鬼界": "🌑",
  "畜生界": "🌿",
  "修羅界": "⚔️",
  "人間界": "🪷",
  "天界": "☀️"
};

const maxScores = {
  "地獄界": 15,
  "餓鬼界": 15,
  "畜生界": 10,
  "修羅界": 15,
  "人間界": 15,
  "天界": 20
};

const results = {
  "地獄界": {
    title: "地獄界：怒り・恨み・責める心",
    desc: "怒りや正しさへの執着に心が引き寄せられている状態かもしれません。何か大切なものを守ろうとして苦しくなっている可能性があります。",
    question: "私は何に怒り、何を許せずにいるのだろうか。"
  },
  "餓鬼界": {
    title: "餓鬼界：不足感・承認欲求",
    desc: "もっと欲しい、もっと認められたいという心が強く働いている状態かもしれません。すでにある恵みを見つめることが、心の向きを変える入口になります。",
    question: "私は何が足りないと思っているのだろうか。本当に足りないのだろうか。"
  },
  "畜生界": {
    title: "畜生界：反応・習慣・その場しのぎ",
    desc: "深く見つめる前に、感情や習慣で反応しやすい状態かもしれません。立ち止まって観察する時間を持つことで、心の向きが変わり始めます。",
    question: "私は何から目を背けているのだろうか。"
  },
  "修羅界": {
    title: "修羅界：比較・競争・勝ち負け",
    desc: "人と比べたり、負けたくない気持ちが強くなっている状態かもしれません。成長意欲の裏側に、安心したい心や認められたい心が隠れていることがあります。",
    question: "私は誰と競い、何を守ろうとしているのだろうか。"
  },
  "人間界": {
    title: "人間界：学び・内省・成長",
    desc: "苦しみや迷いを抱えながらも、自分を見つめ、学びに変えようとしている状態です。仏道を歩む入口として、とても大切な心の位置です。",
    question: "私は今、どんな学びの途中にいるのだろうか。"
  },
  "天界": {
    title: "天界：感謝・充足・穏やかさ",
    desc: "今ある恵みや喜びを感じられている状態です。ただし、心地よさに留まるだけでなく、その恵みを誰かに分かち合うことで、さらに深い実践につながります。",
    question: "今ある恵みを、誰かのためにどう活かせるだろうか。"
  }
};

// ===== 進捗管理 =====
let answeredCount = 0;

function updateProgress() {
  answeredCount = 0;
  for (let i = 0; i < questions.length; i++) {
    if (document.querySelector(`input[name="q${i}"]:checked`)) answeredCount++;
  }
  const pct = Math.round((answeredCount / questions.length) * 100);
  const bar = document.getElementById("progressBar");
  const label = document.getElementById("progressLabel");
  if (bar) bar.style.width = pct + "%";
  if (label) label.textContent = `${answeredCount} / ${questions.length} 回答済み`;
}

// ===== 質問生成 =====
function buildQuestions() {
  const box = document.getElementById("questions");

  // 進捗バー
  const pw = document.createElement("div");
  pw.className = "progress-wrap";
  pw.innerHTML = `
    <span id="progressLabel" class="progress-label">0 / ${questions.length} 回答済み</span>
    <div class="progress-bar-bg"><div class="progress-bar" id="progressBar"></div></div>
  `;
  box.appendChild(pw);

  questions.forEach((q, i) => {
    const section = document.createElement("section");
    section.className = "question";
    section.id = `question-${i + 1}`;

    const numEl = document.createElement("p");
    numEl.className = "qNum";
    numEl.textContent = `Q${i + 1} ／ ${questions.length}　${typeEmoji[q.type] || ""}`;
    section.appendChild(numEl);

    const textEl = document.createElement("p");
    textEl.className = "qText";
    textEl.textContent = q.text;
    section.appendChild(textEl);

    const choices = document.createElement("div");
    choices.className = "choices";
    choices.setAttribute("role", "radiogroup");
    choices.setAttribute("aria-label", q.text);

    [
      [5, "とてもあてはまる"],
      [4, "あてはまる"],
      [3, "どちらともいえない"],
      [2, "あまりあてはまらない"],
      [1, "まったくあてはまらない"]
    ].forEach(([value, label]) => {
      const lbl = document.createElement("label");
      lbl.className = "choice";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${i}`;
      input.value = value;
      input.dataset.type = q.type;
      input.addEventListener("change", () => {
        section.classList.add("answered");
        updateProgress();
      });

      const span = document.createElement("span");
      span.textContent = `${value}　${label}`;

      lbl.appendChild(input);
      lbl.appendChild(span);
      choices.appendChild(lbl);
    });

    section.appendChild(choices);
    box.appendChild(section);
  });
}

// ===== 計算・結果表示 =====
function calculate(event) {
  event.preventDefault();

  const error = document.getElementById("error");
  error.style.display = "none";
  error.textContent = "";

  const scores = Object.fromEntries(types.map(t => [t, 0]));

  for (let i = 0; i < questions.length; i++) {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    if (!sel) {
      error.textContent = `Q${i + 1} が未回答です。すべての質問に回答してください。`;
      error.style.display = "block";
      const target = document.getElementById(`question-${i + 1}`);
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      // 未回答質問をハイライト
      target.style.outline = "2px solid #d44";
      setTimeout(() => target.style.outline = "", 2000);
      return;
    }
    scores[sel.dataset.type] += Number(sel.value);
  }

  // 最高点の世界を特定
  let topType = types[0];
  types.forEach(t => { if (scores[t] > scores[topType]) topType = t; });

  // メイン結果
  const mainResultEl = document.getElementById("mainResult");
  mainResultEl.innerHTML = `
    <span class="top-label">今のあなたの心が最も住している世界</span>
    ${typeEmoji[topType]} ${topType}
  `;

  // スコアバー
  const scoreList = document.getElementById("scoreList");
  scoreList.innerHTML = "";

  // スコア順にソート（高い順）
  const sorted = [...types].sort((a, b) => {
    const pa = scores[a] / maxScores[a];
    const pb = scores[b] / maxScores[b];
    return pb - pa;
  });

  sorted.forEach(type => {
    const percent = Math.round((scores[type] / maxScores[type]) * 100);
    const isTop = type === topType;

    const row = document.createElement("div");
    row.className = "scoreRow";
    row.innerHTML = `
      <div class="scoreName">${typeEmoji[type]} ${type}</div>
      <div class="barWrap">
        <div class="bar${isTop ? " top" : ""}" data-pct="${percent}"></div>
      </div>
      <div class="scoreNum">${percent}%</div>
    `;
    scoreList.appendChild(row);
  });

  // 解説
  const r = results[topType];
  document.getElementById("resultTitle").textContent = r.title;
  document.getElementById("resultDesc").textContent = r.desc;
  document.getElementById("resultQuestion").textContent = r.question;

  // 結果エリアを表示
  const resultEl = document.getElementById("result");
  resultEl.classList.add("visible");
  resultEl.setAttribute("aria-hidden", "false");
  resultEl.scrollIntoView({ behavior: "smooth", block: "start" });

  // バーアニメーション（少し遅らせて）
  setTimeout(() => {
    document.querySelectorAll(".bar[data-pct]").forEach(bar => {
      bar.style.width = bar.dataset.pct + "%";
    });
  }, 120);
}

// ===== リトライ =====
function retry() {
  document.getElementById("quizForm").reset();
  document.getElementById("error").style.display = "none";

  // answered クラスをリセット
  document.querySelectorAll(".question.answered").forEach(el => el.classList.remove("answered"));
  updateProgress();

  const resultEl = document.getElementById("result");
  resultEl.classList.remove("visible");
  resultEl.setAttribute("aria-hidden", "true");

  // バーをリセット
  document.querySelectorAll(".bar").forEach(b => b.style.width = "0%");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== 初期化 =====
document.addEventListener("DOMContentLoaded", () => {
  buildQuestions();
  document.getElementById("quizForm").addEventListener("submit", calculate);
  document.getElementById("retry").addEventListener("click", retry);
});
