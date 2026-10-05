const $ = (id) => document.getElementById(id);

export const ui = {
  go: $('go'),
  setHud(score, lives, max = 3) {
    $('sc').textContent = score;
    $('lv').textContent = '❤'.repeat(lives) + '♡'.repeat(max - lives);
  },
  setBest(v) { $('best').textContent = 'الأفضل: ' + v; },
  showGame() { $('menu').classList.add('hide'); $('hud').classList.remove('hide'); },
  showMenu(score, best) {
    $('msg').innerHTML = `انتهت اللعبة!<br>نتيجتك: <b>${score}</b> · الأفضل: <b>${best}</b>`;
    $('go').textContent = 'العب مرة أخرى';
    $('menu').classList.remove('hide');
    $('hud').classList.add('hide');
  },
};