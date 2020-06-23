// Add item
let count = 1
function addItem() {
  const inputValue = document.querySelector('#input-item').value
  const listWapper = document.querySelector('.list-wapper')

  const itemDivNum1 = document.createElement('div')
  itemDivNum1.setAttribute('class', 'items-num')

  const itemDivNum2 = document.createElement('div')
  itemDivNum1.appendChild(itemDivNum2)
  itemDivNum2.setAttribute('class', 'item')

  const itemInput = document.createElement('input')
  itemDivNum2.appendChild(itemInput)
  itemInput.setAttribute('class', 'item-position')
  itemInput.setAttribute('onblur', 'changeIdNumber(this)')

  const itemP = document.createElement('p')
  itemDivNum2.appendChild(itemP)
  itemP.setAttribute('ondblclick', 'editItem(this)')
  itemP.textContent = inputValue

  const itemDivNum3 = document.createElement('div')
  itemDivNum1.appendChild(itemDivNum3)
  itemDivNum3.setAttribute('class', 'icon')

  const itemSpan1 = document.createElement('span')
  itemDivNum3.appendChild(itemSpan1)
  itemSpan1.setAttribute('onclick', 'checkedItem(this)')

  const itemSpan2 = document.createElement('span')
  itemDivNum3.appendChild(itemSpan2)
  itemSpan2.setAttribute('onclick', 'removeItem(this)')

  const itemIcon1 = document.createElement('i')
  itemSpan1.appendChild(itemIcon1)
  itemIcon1.setAttribute('class', 'fa fa-check')

  const itemIcon2 = document.createElement('i')
  itemSpan2.appendChild(itemIcon2)
  itemIcon2.setAttribute('class', 'fa fa-trash-o')
  
  if(inputValue) {
    document.querySelector('#input-item').value = ''
    listWapper.appendChild(itemDivNum1)
    itemDivNum1.setAttribute('class', 'items-num item-'+(count++))
    itemInput.value = count-1
  } else {
    return alert('Please fill out!!!')
  }
}

//Checked Item
function checkedItem(checked) {
  checked.parentNode.previousElementSibling.setAttribute('style', 'text-decoration: line-through;')
}

// Delete item
function removeItem(removeElement) {
  removeElement.parentNode.remove()
}

// Delete all item
function deleteAll() {
  const deleteAllItem = document.querySelector('.list-wapper')
  deleteAllItem.innerHTML = ''
  count = 1
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
  inputNumber.parentNode.parentNode.className = 'items-num item-' + inputNumber.value
  const allItem = document.querySelector('.list-wapper')
  Array.from(allItem.children).sort(function(a, b) {
    return a.className.match(/\d+/) - b.className.match(/\d+/)
  }).forEach(function(elem) {
    allItem.appendChild(elem)
  });
}


