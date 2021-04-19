const listUrlPrefix = 'http://localhost:3000/'

  
  function showMonsters(page) {
    const url = `${listUrlPrefix}` + `monsters/?_limit=50&_page${page}` 
    let page = 
    return fetch(url)
      .then(res=> res.json())
      .then(res => {
        console.log(res.json())

        results.message.forEach(monster => loadMonsters(monster))
      });
  }


  
  function createMonsterDiv(monster){
      const div = document.createElement('div'),
      h2 = document.createElement("h2"),
      h4 = document.createElement('h4'),
      p = document.createElement('p');

      h2.textContent = monster.name;
      h4.textContent = monster.age;
      p.textContent = monster.description;

      div.appendChild('h2');
      div.appendChild('h4');
      div.appendChild('p');

      return div;
  }



  function loadMonsters(monstersArray){
    const monsterContainer = document.getElementById('monster-container')
    monstersArray.forEach(monster => {
      const monsterDiv = createMonsterDiv(monster);
      monster.appendChild('monsterDiv');
      

  })
  }

  function createMonterForm(){
    const form = document.createElement('form')
      nameInput = document.createElement('input')
      ageInput = document.createElement('input')
      description = document.createElement('input')
      submitBtn = document.createElement('button')
      
      form.id = "monster-form";
      nameInput.id = "name";
      ageInput.id = "age";
      descInput.id = "description";
    
      nameInput.placeholder = "name";
      ageInput.placeholder = "age";
      descInput.placeholder = "description";
      submitBtn.textContent = "Create";
    
      form.appendChild(nameInput);
      form.appendChild(ageInput);
      form.appendChild(descInput);
      form.appendChild(submitBtn);
    
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const monsterObj = getFormData();
        postMonster(monsterObj);
        clearForm();
        });
      document.getElementById("create-monster").appendChild(form);
    }

    function getFormData() {
      let a = document.querySelector("#name"),
        b = document.querySelector("#age"),
        c = document.querySelector("#description");
    
      return {
        name: a.value,
        age: parseFloat(b.value),
        description: c.value,
      };
    }
    
    function postMonster(monster) {
      let URL = `${listUrlPrefix}monsters`,
        config = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(monster),
        };
    
      fetch(URL, config);
    }
    
    function clearForm() {
      document.querySelector("#monster-form").reset();
    }
    
    function addNavListeners() {
      let backBtn = document.querySelector("#back"),
        forwardBtn = document.querySelector("#forward");
    
      backBtn.addEventListener("click", () => {
        prevPage();
      });
    
      forwardBtn.addEventListener("click", () => {
        nextPage();
      });
    }
    
    function nextPage() {
      curPage++;
      getMonsters(curPage).then(showMonsters);
    }
    
    function prevPage() {
      if (curPage < 1) {
        alert("You're already on the first page");
      } else {
        curPage--;
        getMonsters(curPage).then(showMonsters);
      }
    }
  
  window.addEventListener('DOMContentLoaded', function () {
    showMonsters();
    loadMonsters();
  });  
