let employees = [];
let counter = 0;
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// fetch data from API
fetch(urlAPI)
 .then(res => res.json())
 .then(res => res.results)
 .then(displayEmployees)
 .catch(err => console.log(err))

 function displayEmployees(employeeData) {
   employees = employeeData;
   // store the employee HTML as we create it
   let employeeHTML = '';
   // loop through each employee and create HTML markup
   employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
  // template literals make this so much cleaner!
  employeeHTML += `
    <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    </div>
    </div>
  `
  });
  gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
  // use object destructuring make our template literal cleaner
   let { name, dob, phone, email, location: { city, street, state, postcode
   }, picture } = employees[index];
   let counter = employees.indexOf(employees[index]);
   let date = new Date(dob.date);
   let month = String(date.getMonth() + 1).padStart(2, '0');
   let day = String(date.getDate()).padStart(2, '0');
   const modalHTML = `
    <a class="back"><</a>
    <a class="next">></a>
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street.name}, ${street.number}, ${state}, ${postcode}</p>
    <p>Birthday:
    ${month}/${day}/${date.getFullYear()}</p>
    </div>
    </div>
    `;

   overlay.classList.remove("hidden");
   modalContainer.innerHTML = modalHTML;

   let back = document.querySelector('.back')
   let next = document.querySelector('.next')

   function nextBtn() {
    if (counter < employees.length-1 ) {
        displayModal((counter += 1))
    } if (counter === employees.length-1) {
        counter = 0;
    }
  }
   function prevBtn() {
     if (counter > 0) {
          displayModal((counter -= 1));    
      } if (counter === 0) {
          counter = 12;
      }
  }
  next.addEventListener('click', nextBtn);
  back.addEventListener('click', prevBtn);
 
  }



  gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
      // select the card element based on its proximity to actual element clicked
      const card = e.target.closest(".card");
      const index = card.getAttribute('data-index');
      displayModal(index);
      }
     });

    modalClose.addEventListener('click', () => {
      overlay.classList.add("hidden");
      });
      

      // filter name in search field
    function filterName() {
      let card = document.querySelectorAll('.card')
      let input = document.querySelector('#myInput');
      let filter = input.value.toUpperCase();
      // let name = document.querySelectorAll('.name')


      for(i=0; i < card.length; i++) {
        a = card[i].querySelector('.name');
        txtValue = a.textContent || a.innerText;
        
        if(txtValue.toUpperCase().indexOf(filter) > -1) {
          card[i].style.display = "";
        } else {
          card[i].style.display ="none";
        }
      }
    }
