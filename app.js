const user = document.querySelector('#users');
const select = document.querySelector('#select');

function makeSymbolds(length) {
  const result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    let letter = characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
    result.includes(letter) ? i-- : result.push(letter);
  }
  return result.join('');
}

const users = (letter) => {
  fetch('./list.json')
    .then((response) => response.json())
    .then((commits) => {
      while (user.firstChild) {
        user.removeChild(user.firstChild);
      }
      let j = -1;

      for (let i = 0; i < commits.length; i++) {
        if (
          commits[i].name.substr(0, 1).toLowerCase() === letter.toLowerCase()
        ) {
          ++j;
          let li = document.createElement('li');
          li.innerHTML += `${commits[i].name}`;
          user.appendChild(li);
        }
      }

      if (j < 0) {
        let li = document.createElement('li');
        li.innerHTML = `No names found with first letter "${letter}"`;
        user.appendChild(li);
      }
    });
};

const sym = makeSymbolds(5);
for (i = 0; i < sym.length; i++) {
  let opt = document.createElement('option');
  opt.value = sym[i];
  opt.innerHTML = sym[i];
  select.appendChild(opt);
}
users(sym[0]);

select.addEventListener('change', (e) => {
  const selected = select.options.selectedIndex;
  const name = e.path[0][selected].innerHTML;
  users(name);
});
