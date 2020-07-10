// Add item
function addItem() {
  const inputValue = document.querySelector('#input-item').value
  const listWapper = document.querySelector('.list-wapper')

  const itemDivNum1 = document.createElement('div')
  itemDivNum1.setAttribute('class', 'items-num')

  const itemDivNum2 = document.createElement('div')
  itemDivNum1.appendChild(itemDivNum2)
  itemDivNum2.setAttribute('class', 'item')

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
    storedItem()
  } else {
    return alert('Please fill out!!!')
  }
}

//Stored item
function storedItem() {
  const allItems = document.querySelector('.list-wapper').innerHTML
  localStorage.setItem('allItems', allItems)
}

function getStoredItem() {
  const allItem = document.querySelector('.list-wapper')
  allItem.innerHTML = localStorage.getItem('allItems')
}

//Checked Item
function checkedItem(checked) {
  const checkedDiv = checked.parentNode.previousElementSibling
  if(checkedDiv.classList.contains('check')) {
    checkedDiv.setAttribute('class', 'item')
  } else {
    checkedDiv.setAttribute('class', 'item check')
  }
  storedItem()
}

// Delete item
function removeItem(removeElement) {
  removeElement.parentNode.parentNode.remove()
  storedItem()
}

// Delete all item
function deleteAll() {
  const deleteAllItem = document.querySelector('.list-wapper')
  deleteAllItem.innerHTML = ''
  localStorage.setItem('allItems', '')
}

// Double click to edit content
function editItem(item) {
  const input = document.createElement('input')
  input.value = item.textContent

  input.onblur = function() {
    input.parentNode.textContent = input.value
    storedItem()
  }
  item.textContent = ''
  item.appendChild(input)
  input.focus()
}

// Drag and Drop items
document.addEventListener('DOMContentLoaded', function() {
  getStoredItem()
  let draggingEle
  let placeholder
  let isDraggingStarted = false
  let x = 0
  let y = 0
  
  const isAbove = function(nodeA, nodeB) {
  	const rectA= nodeA.getBoundingClientRect()
    const rectB= nodeB.getBoundingClientRect()
    
    return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2)
  }
  
  const swap = function(nodeA, nodeB) {
  	const parentA = nodeA.parentNode
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling
    
    nodeB.parentNode.insertBefore(nodeA, nodeB)
    parentA.insertBefore(nodeB, siblingA)
  }

  const mouseDownHandler = function(e) {
  	if(e.target.matches('p')) {
    draggingEle = e.target.parentNode.parentNode
  
    const rect = draggingEle.getBoundingClientRect()
    x = e.pageX - rect.left/3.5
    y = e.pageY - rect.top/1.1

   document.addEventListener('mousemove', mouseMoveHandler)
   document.addEventListener('mouseup', mouseUpHandler)
    }
  }

  const mouseMoveHandler = function(e) {
  	const draggingRect = draggingEle.getBoundingClientRect()
    if(!isDraggingStarted) {
    	isDraggingStarted = true
      
      placeholder = document.createElement('div')
      placeholder.classList.add('placeholder')
      draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling)
      placeholder.style.height = `${draggingRect.height}px`
    }
    
     draggingEle.style.position = 'absolute'
     draggingEle.style.top = `${e.pageY - y}px`
     draggingEle.style.left = `${e.pageX - x}px`
     
    const prevEle = draggingEle.previousElementSibling
    const nextEle = placeholder.nextElementSibling
    
    if(prevEle && isAbove(draggingEle, prevEle)) {
        swap(placeholder, draggingEle)
        swap(placeholder, prevEle)
        return
    }
    
    if(nextEle && isAbove(nextEle, draggingEle)) {
        swap(nextEle, placeholder)
        swap(nextEle, draggingEle)
    }
  }

  const mouseUpHandler = function() {
  	placeholder && placeholder.parentNode.removeChild(placeholder)
    isDraggingStarted = false
  
    draggingEle.style.removeProperty('position')
    draggingEle.style.removeProperty('top')
    draggingEle.style.removeProperty('left')

    x = null
    y = null
    draggingEle = null
  
	  document.removeEventListener('mousemove', mouseMoveHandler)
	  document.removeEventListener('mouseup', mouseUpHandler)
	}

	const list = document.querySelector('.list-wapper')
	const arr = []
	arr.slice.call(list.querySelectorAll('.items-num')).forEach(function(item) {
		item.addEventListener('mousedown', mouseDownHandler)
	})
})
