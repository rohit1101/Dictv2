const icon = document.querySelector('i');
const selectAll = document.querySelector('.text');
const pop = document.querySelector('.tool');
const baseURL = `https://mashape-community-urban-dictionary.p.rapidapi.com/define`;

let textSelected = '';

async function getData(input) {
  const response = await fetch(baseURL + `?term=${input}`, {
    headers: {
      'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com',
      'X-RapidAPI-Key': 'aea9559aa1msh5b956b19e632e92p1bb553jsn24af3d2c0d36'
    }
  });
  const data = await response.json();
  const dataList = data.list;
  return dataList;
}

selectAll.addEventListener('click', handleClick);

pop.addEventListener('click', async function(e) {
  pop.textContent = 'loading...';
  let dis = await getData(textSelected);
  pop.textContent = dis[Math.floor(Math.random() * dis.length)].definition;
});

function handleClick(e) {
  textSelected = window
    .getSelection()
    .toString()
    .trim();

  if (textSelected.length) {
    pop.style.left = `${e.pageX - 20}px`;
    pop.style.top = `${e.pageY - 30}px`;
    pop.style.display = 'inline-block';
  } else {
    pop.style.display = 'none';
    pop.innerHTML = `Define <i class="fas fa-search"></i>`;
    textSelected = '';
  }
}
