// Add item
let count = 1
function addItem() {
  const inputValue = document.querySelector('#input-item').value
  const listWapper = document.querySelector('.list-wapper')

  const itemDivNum1 = document.createElement('div')
  itemDivNum1.setAttribute('class', 'items-num')
  itemDivNum1.setAttribute('id', 'item-'+(count++))

  const itemDivNum2 = document.createElement('div')
  itemDivNum1.appendChild(itemDivNum2)
  itemDivNum2.setAttribute('class', 'item')

  const itemInput = document.createElement('input')
  itemDivNum2.appendChild(itemInput)
  itemInput.setAttribute('class', 'item-position')
  itemInput.setAttribute('onblur', 'changeIdNumber(this)')
  itemInput.value = count-1

  const itemP = document.createElement('p')
  itemDivNum2.appendChild(itemP)
  itemP.setAttribute('ondblclick', 'editItem(this)')
  itemP.textContent = inputValue

  const itemSpan = document.createElement('span')
  itemDivNum1.appendChild(itemSpan)
  itemSpan.setAttribute('class', 'icon')
  itemSpan.setAttribute('onclick', 'removeItem(this)')

  const itemIcon = document.createElement('i')
  itemSpan.appendChild(itemIcon)
  itemIcon.setAttribute('class', 'fa fa-trash-o')
  
  if(inputValue) {
    document.querySelector('#input-item').value = ''
    listWapper.appendChild(itemDivNum1)
  } else {
    return alert('Please fill out!!!')
  }
}

// Delete item
function removeItem(removeElement) {
  removeElement.parentNode.remove()
}

// Delete all item
function deleteAll() {
  const deleteAllItem = document.querySelector('.list-wapper')
  deleteAllItem.innerHTML = ''
}

// Double click to edit content
function editItem(item) {
  const input = document.createElement('input')
  input.value = item.textContent

  input.onblur = function() {
    input.parentNode.textContent = input.value
  }

  item.textContent = ''
  item.appendChild(input)
  input.focus()
}

// Change item position
function changeIdNumber(inputNumber) {
  inputNumber.parentNode.parentNode.id = 'item-' + inputNumber.value
  const allItem = document.querySelector('.list-wapper')
  Array.from(allItem.children).sort(function(a, b) {
    return a.id.match(/\d/) - b.id.match(/\d/)
  }).forEach(function(elem) {
    allItem.appendChild(elem)
  });
}


