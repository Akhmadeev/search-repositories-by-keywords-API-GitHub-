const searchItems = document.querySelector('.search_items');
const container = document.querySelector('.container');
const search = document.querySelector('.search');

function renderPost(item) {
  item.forEach(post => {
    const li = document.createElement('li')
    searchItems.prepend(li);
    li.textContent = post.name;
    li.addEventListener('click', function() {
      search.value = '';
      const card = document.createElement('div');
      card.classList.add('.card-body');
      const title = document.createElement('h5');
      title.classList.add('.card-title');
      title.textContent = `Name: ${post.name}`;
      const p = document.createElement('p');
      p.classList.add('.card-text');
      p.textContent = `Stars: ${post.stargazers_count}`;
      const titleName = document.createElement('h5');
      titleName.classList.add('.card-title')
      titleName.textContent = `Owner: ${post.owner.login}`;
      console.log(post.owner.login)
      container.appendChild(card);
      card.appendChild(title)
      card.appendChild(titleName)
      card.appendChild(p)
      const close = document.createElement('a');
      close.textContent = 'close';
      close.classList.add('.btn')
      card.appendChild(close)
      close.addEventListener('click', function() {
        card.remove()
      })
      searchItems.innerHTML = '';
    })
  })
}

 const debounce = (fn, time) => {
  let timeout;
  return function() {
      const fnCall = () => {
      fn.apply(this, arguments)
      }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, time)
  }
};

 document.querySelector('.search').oninput = debounce((async function() {
  let value = this.value.trim();
  let obj = await fetch(`https://api.github.com/search/repositories?q=${value}`)
  obj = await obj.json();
  let item;
  if(obj.items) {
    item = obj.items.slice(-5);
    searchItems.innerHTML = '';
    renderPost(item)
  } 
  if(search.value === '') searchItems.innerHTML = '';
 }), 600
)
