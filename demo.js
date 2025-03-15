let btn = document.querySelector('.submit-btn'),
    grname = document.querySelector('#grocery'),
    cart = document.querySelector('.grocery-list'),
    clearbtn = document.querySelector('.clear-btn');
   
        


let local = JSON.parse(localStorage.getItem('grocery')) || [], inid = 0;

btn.addEventListener('click', function (event) {
    event.preventDefault();

    let  alpcheck = /^[A-Za-z]+$/.test(grname.value)

    if (btn.textContent === 'Edit') {  return editing(inid);}

    if (grname.value.trim() === '') {return errormsg('red','Input fiel is not empty')};

    if(!alpcheck) return errormsg('red',"Special charactor not allow in this field");

    localset();
    
    errormsg('green','Item added Successfully')
});

function startCart(n, num) {
    
    let list = document.createElement('li'),
        para = document.createElement('p'),
        span = document.createElement('span'),
        edit = document.createElement('i'),
        del = document.createElement('i');

    edit.className = "fa fa-edit";
    del.className = "fa-solid fa-trash-can-arrow-up";

    span.append(edit, del);

    del.addEventListener('click', () => {
        list.remove();
        local = local.filter(x => x.id !== num);
        localStorage.setItem('grocery', JSON.stringify(local));
    });

    edit.addEventListener('click', () => {
        btn.textContent = "Edit";
        grname.value = para.textContent;
        inid = num;
    });

    para.textContent = n;
    list.append(para, span);
    cart.appendChild(list);
    grname.value = '';

}

function localset() {
    const id = Math.floor(Math.random() * 9000) + 1000;
    local.push({ id: id, groceryName: grname.value });
    localStorage.setItem('grocery', JSON.stringify(local));
    startCart(grname.value, id);
}

function editing(id) {
    btn.textContent = 'Submit';
    local = local.map(n => n.id === id ? { ...n, groceryName: grname.value } : n);
    localStorage.setItem('grocery', JSON.stringify(local));
    cart.innerHTML = '';
    local.forEach(n => startCart(n.groceryName, n.id));
    errormsg('green',"Item edited successfully")
}

document.addEventListener('DOMContentLoaded', () => {
    local.forEach(n => startCart(n.groceryName,n.id));
});

clearbtn.addEventListener('click', () => {
    cart.innerHTML = '';
    localStorage.clear();
    local = [];
});

function errormsg(clas,content){
    let erro = document.querySelector('.error_msg');
    erro.classList.add(clas);
    erro.textContent=content;

    setTimeout(()=>{
        erro.classList.remove(clas);
        erro.textContent=''
    },3000)

}

