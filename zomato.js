document.getElementById("online").addEventListener("click",function(){
    window.location.href="online_order.html";
})

document.getElementById("dine").addEventListener("click",function(){
    window.location.href="dining.html";
})
document.getElementById("clubs").addEventListener("click",function(){
    window.location.href="clubs.html";
})

document.getElementById("dine").addEventListener("click",function(){
    window.location.href="menu.html";
})



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



