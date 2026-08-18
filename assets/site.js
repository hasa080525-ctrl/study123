/* ---------- Subject tabs (subjects.html, index.html) ---------- */
(function(){
  const subjTabs = document.getElementById('subjTabs');
  if(!subjTabs) return;
  subjTabs.addEventListener('click', function(e){
    const btn = e.target.closest('.subj-tab');
    if(!btn) return;
    document.querySelectorAll('.subj-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.subj-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
  });
})();

/* ---------- Apply form: clipboard + kakao (index.html) ---------- */
function submitApplyForm(){
  const nameEl = document.getElementById('fName');
  const phoneEl = document.getElementById('fPhone');
  if(!nameEl || !phoneEl) return;
  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  if(!name || !phone){
    alert('학생 이름과 연락처를 입력해주세요.');
    return;
  }
  const level = document.getElementById('fLevel').value;
  const situation = document.getElementById('fSituation').value;
  const format = document.getElementById('fFormat').value;
  const term = document.getElementById('fTerm').value;
  const message = document.getElementById('fMessage').value.trim();
  const summary =
    '[스터디123 상담 신청]\n' +
    '학생 이름: ' + name + '\n' +
    '연락처: ' + phone + '\n' +
    '목표 검정고시: ' + level + '\n' +
    '현재 상황: ' + situation + '\n' +
    '수업 방식: ' + format + '\n' +
    '목표 회차: ' + term + '\n' +
    '남기신 말씀: ' + (message || '(없음)');

  // window.open must fire synchronously from the click handler, or browsers
  // treat it as a blocked popup instead of a user-initiated action.
  window.open('https://open.kakao.com/o/sOXeVnpi', '_blank', 'noopener');

  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(summary).then(function(){
      alert('신청 내용이 복사되었습니다.\n곧 열리는(또는 열린) 카카오톡 채팅창에 붙여넣기(꾹 눌러서 붙여넣기) 해주세요!');
    }).catch(function(){
      alert('아래 오픈채팅에서 다음 내용으로 상담 신청해주세요:\n\n' + summary);
    });
  } else {
    alert('아래 오픈채팅에서 다음 내용으로 상담 신청해주세요:\n\n' + summary);
  }
}

/* ---------- Mobile nav toggle (all pages) ---------- */
(function(){
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  if(!burgerBtn || !mobileNav) return;
  burgerBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    burgerBtn.classList.toggle('active', isOpen);
    burgerBtn.setAttribute('aria-expanded', isOpen);
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burgerBtn.classList.remove('active');
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---------- FAQ accordion (faq.html, index.html) ---------- */
document.querySelectorAll('.faq-q').forEach(q => {
  if(!q.parentElement.classList.contains('faq-item')) return;
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  });
});
