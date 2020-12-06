// header_navigation_panel

document.querySelector('.header__nav-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.header__nav-list')
        .style.transform = 'translate(0%)'
    rightSidebarClose()
})
const closeNavMenu = () => document.querySelector('.header__nav-list').style.transform = 'translate(-100%)'

document.querySelector('.header__nav-times').addEventListener('click', (e) => {
    e.preventDefault();
    closeNavMenu()
})

// sidebars move 

const sideBarMove = (elem, icon, secondElem) => {
    elem.style.color = elem.style.color == 'red' ? 'black' : 'red'
    icon.classList.toggle('fal')
    icon.classList.toggle('fas')
    const sideBar = document.querySelector(elem.getAttribute('data-target')),
        sideBarSecond = sideBar.classList.contains('like-sidebar') ?
        document.querySelector('.cart-sidebar') : document.querySelector('.like-sidebar')
    if (sideBar.classList.contains('active')) {
        sideBar.classList.remove('active')
    } else {
        if (sideBarSecond.classList.contains('active')) {
            sideBarSecond.classList.remove('active')
            secondElem.style.color = secondElem.style.color == 'red' ? 'black' : 'red'
            secondElem.querySelector('i').classList.toggle('fal')
            secondElem.querySelector('i').classList.toggle('fas')
        }
        sideBar.classList.add('active')
    }
    writeSidebar(sideBar);
}

like.onclick = e => sideBarMove(e.target.parentElement, e.target, cart)
cart.onclick = e => sideBarMove(e.target.parentElement, e.target, like)

document.querySelectorAll('button[class$="sidebar__times"]').forEach(el => el.addEventListener('click',e=>{
    e.target.closest('aside').classList.remove('active')
    const link = document.querySelector(e.target.parentElement.getAttribute('data-target'))
    link.style.color = 'black'
    link.querySelector('i').classList.toggle('fal')
    link.querySelector('i').classList.toggle('fas')
}))

// writing Sidebar

function writeSidebar(sideBar) {
    const productList = sideBar.querySelector('[class$="sidebar__product-list"]')
    productList.innerHTML = ''
    const list = sideBar.getAttribute('data-array')==='like' ? likesList : cartsList
    list.forEach(obj =>{
        productList.innerHTML += `
        <div class="like-sidebar__item">
            <button class="like-sidebar__del" data-delete="${obj.name}">
                <i class="fal fa-times"></i>
            </button>
            <div class="like-sidebar__image">
            <img src="${obj.img}" alt="${obj.name}" class="like-sidebar__img">
            </div>
            <h5 class="like-sidebar__title">${obj.name}</h5>
            <p class="like-sidebar__price">${obj.price} UZS</p>
        </div> 
        `
    })
    document.querySelectorAll('[class$="-sidebar__del"]').forEach(el => el.addEventListener('click',e => {
       deleteItem(list,e.target.parentElement.getAttribute('data-delete'),sideBar) 
    }))
}

// deleteItem

function deleteItem(list, name, sideBar) {
    console.log(list);
    console.log(name);
    for (let i = 0; i < list.length; i++) {
        const el = list[i];
        if (el.name === name) {
            list.splice(i,1)
        }
    }
    writeSidebar(sideBar)
}

// rightSidebarClose

const likeSidebarClose = () => {
    document.querySelector('.like-sidebar').style.transform = 'translate(100%)'
}
const cartSidebarClose = () => {
    document.querySelector('.cart-sidebar').style.transform = 'translate(100%)'
}

// click on product like and cart

const links = [...document.querySelectorAll('[class$=content-like]'),
    ...document.querySelectorAll('[class$=content-cart]')
]
links.forEach(el => {
    el.addEventListener('click', function (e) {
        addToList(e.target)
        this.classList.toggle('active')
        this.querySelector('i').classList.toggle('fal')
        this.querySelector('i').classList.toggle('fas')
    })
})

// add like list

const likesList = [], cartsList = []

function addToList(el) {
    
    if (el.tagName == 'DIV') {
        el = el.children[0]
    }
    
    const list = el.classList.contains('fa-heart')?likesList:cartsList
    el = el.closest('[class$="item"]')
    const productInfo = {},
    name = el.getAttribute('data-name'),
    price = el.getAttribute('data-price'),
    img = el.querySelector('img').getAttribute('src')
    productInfo.name = name
    productInfo.price = price
    productInfo.img = img
    
    // includes
    let include = false
    for (let i = 0; i < list.length; i++) {
        const listItem = list[i];
        if (listItem.name == productInfo.name) {
            include = true
            break
        }
    }
    
    
    if (!include) {
        list.push(productInfo)
    }else{
        for (let i = 0; i < list.length; i++) {
            const prod = list[i];
            if (prod.name == productInfo.name) {
                list.splice(i,1)
            }
        }
    }
}

// Time in News items
const random = (min, max)=>Math.floor(Math.random() * (max-min+1) + min)

document.querySelectorAll('.news__item-output').forEach(item=>{
    let day = random(1,30),
    month = random(1,12),
    year = random(2015,2020),
    hour = random(0,23),
    minute = random(0,59)
    item.innerHTML = `${day > 9 ? day :'0' +  day}.${month > 9 ? month :'0' +  month}.${year} | ${hour > 9 ? hour :'0' +  hour}:${minute > 9 ? minute :'0' +  minute}`
})
