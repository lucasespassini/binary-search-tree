class BST {
   constructor(value, right = null, left = null) {
      this.value = value
      this.right = right
      this.left = left
   }

   insert(value) {
      if (value > this.value) {
         if (this.right) {
            this.right.insert(value)
         } else {
            this.right = new BST(value)
         }
      } else {
         if (this.left) {
            this.left.insert(value)
         } else {
            this.left = new BST(value)
         }
      }
   }

   contains(value) {
      if (value === this.value) return true
      
      if (value > this.value) {
         if (this.right) { 
            return this.right.contains(value)
         } else {
            return false
         }
      } else {
         if (this.left) {
            return this.left.contains(value)
         } else {
            return false
         }
      }
   }

   getMinValue() {
      if (this.left) {
         return this.left.getMinValue()
      }
      return this.value
   }

   getMaxValue() {
      if (this.right) {
         return this.right.getMaxValue()
      }
      return this.value
   }

   remove(value, parent = null) {
      if (value > this.value) {
         if (this.right) {
            this.right.remove(value, this)
         }
      } else if (value < this.value) {
         if (this.left) {
            this.left.remove(value, this)
         }
      } else {
         if (this.left && this.right) {
            this.value = this.right.getMinValue()
            this.right.remove(this.value, this)
         } else if (!parent) {
            if (this.left) {
               this.value = this.left.value
               this.right = this.left.right
               this.left = this.left.left
            } else if (this.right) {
               this.value = this.right.value
               this.right = this.right.right
               this.left = this.right.left
            }
         } else if (parent.left === this) {
            parent.left = this.left ? this.left : this.right
         } else if (parent.right === this) {
            parent.right = this.right ? this.right : this.left
         }
      } 
   }

   inOrder(node) {
      if (node !== null) {
         this.inOrder(node.left)
         console.log(node.value)
         this.inOrder(node.right)
      }
   }
}

const bst = new BST(50)

for (let i = 0; i < 1e1; i++) {
   const number = Math.floor(Math.random() * 1000)
   bst.insert(number)
}

bst.inOrder(bst)
const num = 500
console.log(`Valor ${num} existe: ${bst.contains(num)}`)
console.log(`Valor mínimo: ${bst.getMinValue()}`)
console.log(`Valor máximo: ${bst.getMaxValue()}`)
