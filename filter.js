let x = document.getElementById("cart");
let y = document.getElementById("cart-tab");
x.addEventListener("click",function(){
  if (y.style.display === "none" || y.style.display === "") {
    y.style.display = "block";
    } else {
    y.style.display = "none";
    }
})

async function DisplayAll() {
  const response = await fetch('total.php?tag=all');
  const dishes = await response.json();
  updateFoodContainer(dishes);
}

DisplayAll();

document.querySelectorAll('.circle').forEach(circle => {
  circle.addEventListener('click', function() {

    document.querySelectorAll('.circle h3').forEach(h3 => {
      h3.style.fontWeight = 'normal';
    });
    const heading = this.querySelector('h3');
    heading.style.fontWeight = 'bold';
  });
});


let all = document.querySelectorAll('.circle');
all.forEach(button => {
  button.addEventListener('click', async (e) => {

    const tag = e.currentTarget.dataset.tag;    
    const response = await fetch(`filter.php?tag=${tag}`);
    const filterdishes = await response.json();
        updateFoodContainer(filterdishes);
  });
});

let names = document.querySelectorAll('.circle h3')

function updateFoodContainer(dishes) {
  const container = document.getElementById('menu');
  container.innerHTML = '';

  dishes.forEach(dish => {
    const dishHTML = `
      <div class="item">
        <div class="left">
          <h2 class="name">${dish.name}</h2>
          <h2 class="price">Rs.${dish.price}</h2>
          <h3>${dish.description}</h3>
        </div>
        <div class="right">
          <div class="image" style="background-image: url('${dish.image}')"></div>
          <button class="add"><h2 style="color: white;">ADD</h2></button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', dishHTML);
  });

  attachAddButtonListeners();
}

function attachAddButtonListeners() {
  document.querySelectorAll('.add').forEach(button => {
    button.addEventListener('click', function() {
      const parentDiv = button.parentNode.parentNode;
      const leftDiv = parentDiv.querySelector('.left');

      if (leftDiv) {
        const nameElement = leftDiv.querySelector('.name');
        const priceElement = leftDiv.querySelector('.price');
        
        if (nameElement && priceElement) {
          const name = nameElement.textContent;
          const price = priceElement.textContent.replace('Rs.', ''); // Remove 'Rs.' from price
          
          updateCartDisplay(name, price);
        } else {
          console.error('Could not find name or price elements.');
        }
      } else {
        console.error('Could not find .left div.');
      }
    });
  });
}

function updateCartDisplay(name, price) {
  const cartItemsDiv = document.getElementById('cart-items');
  
  const itemHTML = `
    <div class="new">
      <div class="name">${name}</div>
      <div class="price">${price}</div>
      <button class="remove">REMOVE</button>
    </div>
  `;
  
  cartItemsDiv.insertAdjacentHTML('beforeend', itemHTML);

  RemoveItem();
  updateTotalPrice();
}

function updateTotalPrice() {
  const cartItems = document.querySelectorAll('.new');
  let totalPrice = 0;
  
  cartItems.forEach(item => {
    const priceElement = item.querySelector('.price');
    const price = parseFloat(priceElement.textContent); // Convert price to number
    
    totalPrice += price;
  });
  
  document.getElementById('total-price').textContent = `Total: Rs.${totalPrice.toFixed(2)}`;
}



function RemoveItem() {
  document.querySelectorAll('.remove').forEach(button => {
    button.addEventListener('click', function() {
      console.log("Remove button clicked");
      button.parentNode.remove();
      updateTotalPrice();
    });
  });
}

RemoveItem();

document.getElementById('checkout').addEventListener('click', function() {
  document.getElementById('cart-items').innerHTML = '';
  document.getElementById('total-price').textContent = 'Total: Rs.0';
  alert("Checkout successful! We hope you liked your experience with us! :)");
});

function filterMenu() {
  const query = document.getElementById('search-here').value.toLowerCase();
  const items = document.querySelectorAll('.menu-item');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (query.length > 0) {
      dropdownMenu.style.display = 'block';
  } else {
      dropdownMenu.style.display = 'none';
  }

  items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'block' : 'none';
  });
}