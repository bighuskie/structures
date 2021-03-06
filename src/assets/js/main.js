/**
 * 1、栈(Stack)数据结构实现
 */
function Stack() {
  let item = [];
  /**
   * 添加一个或多个元素到栈顶
   * paramter:keys
   */
  this.push = function(keys) {
    item.push(keys);
  };
  /**
   * 移除一个栈顶元素
   * return:element
   */
  this.pop = function() {
    return item.pop();
  };
  /**
   * 返回栈顶元素，不对栈顶做修改
   * return:element
   */
  this.peek = function() {
    return item[item.length - 1];
  };
  /**
   * 判断栈里没有任何元素返回true，有元素返回false
   * return:boolean
   */
  this.isEmpty = function() {
    return item.length === 0;
  };
  /**
   * 移除栈里的数据
   */
  this.clear = function() {
    item = [];
  };
  /**
   * 返回栈里元素个数
   * return:Number
   */
  this.size = function() {
    return item.length;
  };
  /**
   * 字符串形式输出实例的值
   */
  this.print = function() {
    console.log(item.toString());
  };
}

/**
 * 2、队列(Queue)数据结构实现
 */
function Queue() {
  let items = [];
  /**
   * 向队列尾部添加一个(或多个)新的项
   */
  this.enqueue = function(keys) {
    items.push(keys);
  };
  /**
   * 移除队顶元素
   * return:element
   */
  this.dequeue = function() {
    return items.shift();
  };
  /**
   * 返回队顶元素，不对队顶做修改
   * return:element
   */
  this.front = function() {
    return items[0];
  };
  /**
   * 判断队列没有任何元素返回true，有元素返回false
   * return:boolean
   */
  this.isEmpty = function() {
    return items.length === 0;
  };
  /**
   * 返回队列元素个数
   * return:Number
   */
  this.size = function() {
    return items.length;
  };
  /**
   * 字符串形式输出实例的值
   */
  this.print = function() {
    console.log(items.toString());
  };
}

/**
 * 2.1、最小优先队列数据结构
 */
function priorityQueue() {
  let items = [];
  let Node = function(priority, key) {
    this.priority = priority;
    this.key = key;
  };
  /**
   * 判断队列没有任何元素返回true，有元素返回false
   * return:boolean
   */
  this.isEmpty = function() {
    return items.length === 0;
  };
  /**
   *根据优先级向队列添加一个(或多个)新的项
   */
  this.enqueue = function(priority, key) {
    let node = new Node(priority, key);
    if (this.isEmpty()) {
      items.push(node);
    } else {
      let addFlag = false;
      for (let i = 0; i < items.length; i++) {
        if (node.priority < items[i].priority) {
          items.splice(i, 0, node);
          addFlag = true;
          break;
        }
      }
      if (!addFlag) {
        items.push(node);
      }
    }
  };
  /**
   * 返回队顶元素，不对队顶做修改
   * return:element
   */
  this.front = function() {
    return items[0];
  };
  /**
   * 字符串形式输出实例的值
   */
  this.print = function() {
    items.forEach(function(item) {
      console.log(item);
    });
  };
}
/**
 * 2.2、循环队列
 */
function hotPotato(queueList, num) {
  let queue = new Queue();
  for (let i = 0; i < queueList.length; i++) {
    queue.enqueue(queueList[i]);
  }
  let eliminated;
  while (queue.size() > 1) {
    for (let j = 0; j < num; j++) {
      let deleteItem = queue.dequeue();
      queue.enqueue(deleteItem);
    }
    eliminated = queue.dequeue();
    console.log(`${eliminated}被淘汰了`);
  }
  return queue.dequeue();
}

/**
 * 3.1、链表结构实现
 */
function linkList() {
  let head = null;
  let length = 0;
  let Node = function(element) {
    this.element = element;
    this.next = null;
  };
  /**
   * 向列表尾部追加一个新的项
   */
  this.append = function(element) {
    let node = new Node(element);
    let current;
    if (head === null) {
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    length++;
  };
  /**
   * 向链表中特定位置插入值
   */
  this.insert = function(position, element) {
    if (position > -1 && position <= length) {
      let node = new Node(element);
      let current = head;
      let index = 0;
      let previous;
      if (position === 0) {
        head = node;
        node.next = current;
      } else {
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = node;
        node.next = current;
      }
      length++;
      return true;
    }
    return false;
  };
  /**
   * 返回head
   * return:object
   */
  this.getHead = function() {
    return head;
  };
  /**
   * 删除指定位置的值
   * parameter:position
   * return:boolean
   */
  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      let current = head;
      let index = 0,
        previous;
      if (position === 0) {
        head = current.next;
      } else {
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = current.next;
      }
      length--;
      return true;
    }
    return false;
  };
  /**
   * 返回元素值的位置
   * parameter:key
   * return:number
   */
  this.indexOf = function(element) {
    let index = 0;
    let current = head;
    while (current) {
      if (current.element === element) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  };
  /**
   * 根据element删除元素
   * parameter:number
   * return:boolean
   */
  this.remove = function(element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  };
  /**
   * 判断链表是否为空
   * return:void
   */
  this.isEmpty = function() {
    return length === 0;
  };
}
/**
 * 3.2、双向链表结构实现
 */
function DoubleLinkList() {
  let Node = function(element) {
    this.element = element;
    this.prev = null;
    this.next = null;
  };
  let head = null;
  let tail = null;
  let length = 0;
  /**
   * 从任意位置插入元素
   */
  this.insert = function(position, element) {
    if (position > -1 && position <= length) {
      let node = new Node(element);
      let current = head;
      let previous,
        index = 0;
      if (position === 0) {
        if (!head) {
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node;
          head = node;
        }
      } else if (position === length) {
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = node;
        node.next = current;
        node.prev = previous;
        current.prev = node;
      }
      length++;
      return true;
    }
    return false;
  };
  /**
   * 返回head
   * return:object
   */
  this.getHead = function() {
    return head;
  };
  /**
   * 从任意位置移除
   * parameter:number
   * return:boolean
   */
  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      let current = head;
      let previous,
        index = 0;
      if (position === 0) {
        head = current.next;
        if (length === 1) {
          head = null;
        } else {
          head.prev = null;
        }
      } else if (position === length - 1) {
        current = tail;
        tail = current.prev;
        tail.next = null;
      } else {
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = current.next;
        current.next.prev = previous;
      }
      length--;
      return true;
    }
    return false;
  };
}

/**
 * 4、集合数据结构实现(Set)
 */
function MySet() {
  let item = {};
  /**
   * 判断值是否在集合中，在就返回true，不在就返回false
   */
  this.has = function(key) {
    return item.hasOwnProperty(key);
  };
  /**
   * 向集合添加一个值
   * parameter:key
   * return:boolean
   */
  this.add = function(key) {
    if (!this.has(key)) {
      item[key] = key;
      return true;
    }
    return false;
  };
  /**
   * 向集合删除指定值
   * parameter:key
   * return:boolean
   */
  this.remove = function(key) {
    if (this.has(key)) {
      delete item[key];
      return true;
    }
    return false;
  };
  /**
   * 移除集合中所有值
   */
  this.clear = function() {
    item = {};
  };
  /**
   * 返回集合中元素的数量
   * return: number
   */
  this.size = function() {
    return Object.keys(item).length;
  };
  /**
   * 返回集合中所有元素
   * return: element
   */
  this.values = function() {
    return Object.keys(item);
  };
}

/**
 * 5、字典数据结构实现(Map)
 */
function MyMap() {
  let item = {};
  /**
   * 向字典添加数据
   * parameter：key,values
   */
  this.set = function(key, values) {
    item[key] = values;
  };
  /**
   * 判断值是否在字典中，在就返回true，不在就返回false
   */
  this.has = function(key) {
    return item.hasOwnProperty(key);
  };
  /**
   * 向字典删除指定值
   * parameter:key
   * return:boolean
   */
  this.remove = function(key) {
    if (this.has(key)) {
      delete item[key];
      return true;
    }
    return false;
  };
  /**
   * 移除字典中所有值
   */
  this.clear = function() {
    item = {};
  };
  /**
   * 返回字典中元素的数量
   * return: number
   */
  this.size = function() {
    return Object.keys(item).length;
  };
  /**
   * 返回集合中所有元素key
   * return: element
   */
  this.keys = function() {
    return Object.keys(item);
  };
  /**
   * 返回集合中所有元素values值
   * return: element
   */
  this.values = function() {
    let temp = [];
    for (let key in item) {
      if (this.has(key)) {
        temp.push(item[key]);
      }
    }
    return temp;
  };
}

/**
 * 6.1、散列表的数据结构实现
 */
function HashTable() {
  /**
   * 辅助函数,根据key生成数值
   * parameter:key
   * return:String
   */
  let key2hash = function(key) {
    let hash = "";
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };
  let table = [];
  /**
   * 向散列表增加一个新的项
   * parameter:key,value
   * return:Boolean
   */
  this.put = function(key, value) {
    let position = key2hash(key);
    table[position] = value;
  };
  /**
   * 根据键值从散列表中移除项
   * parameter:key
   */
  this.remove = function(key) {
    let position = key2hash(key);
    table[position] = undefined;
  };
  /**
   * 根据键值从散列表中返回对应值
   * parameter:key
   * return:any
   */
  this.get = function(key) {
    let position = key2hash(key);
    return table[position];
  };
  /**
   * 返回散列表值
   * return:Array
   */
  this.getTable = function() {
    return table;
  };
}

/**
 * 6.2、散列表的分离链接法的数据结构实现
 */
function TableLink() {
  /**
   * 辅助函数,根据key生成数值
   * parameter:key
   * return:String
   */
  let key2hash = function(key) {
    let hash = "";
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };
  let table = [];
  /**
   * 辅助函数，用来产生链表的元素
   */
  let Valuepair = function(key, value) {
    this.key = key;
    this.value = value;
  };
  /**
   * 向散列表增加一个新的项
   * parameter:key,element
   * return:Boolean
   */
  this.put = function(key, value) {
    let position = key2hash(key);
    if (table[position] === undefined) {
      table[position] = new linkList();
    }
    table[position].append(new Valuepair(key, value));
  };
  /**
   * 根据键值从散列表中返回对应值
   * parameter:key
   * return:any
   */
  this.get = function(key) {
    let position = key2hash(key);
    if (table[position] !== undefined) {
      let current = table[position].getHead();
      while (current) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  };
  /**
   * 根据键值从散列表中移除项
   * parameter:key
   * return:Boolean
   */
  this.remove = function(key) {
    let position = key2hash(key);
    if (table[position] !== undefined) {
      let current = table[position].getHead();
      while (current) {
        if (current.element.key === key) {
          table[position].remove(current.element);
          if (table[position].isEmpty()) {
            table[position] = undefined;
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  };
  /**
   * 返回散列表值
   * return:Array
   */
  this.getTable = function() {
    return table;
  };
}

/**
 * 6.2、散列表的线性探查法的数据结构实现
 */
function TableLinear() {
  /**
   * 辅助函数,根据key生成数值
   * parameter:key
   * return:String
   */
  let key2hash = function(key) {
    let hash = "";
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };
  let table = [];
  /**
   * 辅助函数，用来产生链表的元素
   */
  let Valuepair = function(key, value) {
    this.key = key;
    this.value = value;
  };
  /**
   * 向散列表增加一个新的项
   * parameter:key,element
   * return:Boolean
   */
  this.put = function(key, value) {
    let position = key2hash(key);
    let index;
    if (table[position] === undefined) {
      table[position] = new Valuepair(key, value);
    } else {
      index = position + 1;
      while (table[index] !== undefined) {
        index++;
      }
      table[index] = new Valuepair(key, value);
    }
  };
  /**
   * 根据键值从散列表中返回对应值
   * parameter:key
   * return:any
   */
  this.get = function(key) {
    let position = key2hash(key);
    if (table[position] !== undefined) {
      if (table[position].key === key) {
        return table[position].value;
      } else {
        let index = position + 1;
        while (table[index].key !== key || table[index] === undefined) {
          index++;
        }
        return table[index].value;
      }
    }
    return undefined;
  };
  /**
   * 根据键值从散列表中移除项
   * parameter:key
   * return:Boolean
   */
  this.remove = function(key) {
    let position = key2hash(key);
    if (table[position] !== undefined) {
      if (table[position].key === key) {
        table[position] = undefined;
      } else {
        let index = position + 1;
        while (table[index].key !== key || table[index] === undefined) {
          index++;
        }
        table[index] = undefined;
      }
    }
    return undefined;
  };
  /**
   * 返回散列表值
   * return:Array
   */
  this.getTable = function() {
    return table;
  };
}

/**
 * 7、二叉搜索树(BST)数据结构实现
 */
function BinarySearchTree() {
  let Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };
  let root = null;
  /**
   * 辅助函数，判断节点插入位置，使节点正确插入树
   * parameter:root,node
   * return void
   */
  let insertNode = function(root, node) {
    if (node.key < root.key) {
      if (root.left === null) {
        root.left = node;
      } else {
        insertNode(root.left, node);
      }
    } else {
      if (root.right === null) {
        root.right = node;
      } else {
        insertNode(root.right, node);
      }
    }
  };

  /**
   * 向树中插入一个新的值
   * parameter:key
   * return void
   */
  this.insert = function(key) {
    let node = new Node(key);
    if (root === null) {
      root = node;
    } else {
      insertNode(root, node);
    }
  };
  /**
   * 中序遍历辅助函数，负责遍历BST
   * parameter:root,callback
   * return:void
   */
  let inOrderTraverseNode = function(node, callback) {
    if (node != null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  };

  /**
   * 中序遍历
   * parameter:callback
   * return:void
   */
  this.inOrderTraverse = function(callback) {
    inOrderTraverseNode(root, callback);
  };
  /**
   * 先序遍历辅助函数，负责遍历BST
   * parameter:root,callback
   * return:void
   */
  let preOrderTraverseNode = function(node, callback) {
    if (node != null) {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  };
  /**
   * 先序遍历
   * parameter:callback
   * return:void
   */
  this.preOrderTraverse = function(callback) {
    preOrderTraverseNode(root, callback);
  };
  /**
   * 后序遍历辅助函数，负责遍历BST
   * parameter:root,callback
   * return:void
   */
  let postOrderTraverseNode = function(node, callback) {
    if (node != null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  };
  /**
   * 后序遍历
   * parameter:callback
   * return:void
   */
  this.postOrderTraverse = function(callback) {
    postOrderTraverseNode(root, callback);
  };
  /**
   * 辅助函数寻找BST最小节点值
   * return:minNode/undefined
   */
  let minNode = function(node) {
    if (node) {
      while (node && node.left != null) {
        node = node.left;
      }
      return node.key;
    }
    return undefined;
  };
  /**
   * 寻找BST最小值
   * return:min
   */
  this.min = function() {
    return minNode(root);
  };

  /**
   * 辅助函数寻找BST最大节点值
   * return:maxNode/undefined
   */
  let maxNode = function(node) {
    if (node) {
      while (node && node.right != null) {
        node = node.right;
      }
      return node.key;
    }
    return undefined;
  };
  /**
   * 寻找BST最大值
   * return:max
   */
  this.max = function() {
    return maxNode(root);
  };

  /**
   * 访问root的值
   * return:root
   */
  this.getRoot = function() {
    return root;
  };
}

// let BST = new BinarySearchTree();
// BST.insert(11);
// BST.insert(7);
// BST.insert(15);
// BST.insert(5);
// BST.insert(3);
// BST.insert(9);
// BST.insert(8);
// BST.insert(10);
// BST.insert(13);
// BST.insert(12);
// BST.insert(14);
// BST.insert(20);
// BST.insert(18);
// BST.insert(25);
// BST.insert(6);

// BST.postOrderTraverse(function(key) {
//   document.writeln(key + "<br/>");
// });
// document.write(BST.min()+"<br/>");
// document.write(BST.max()+"<br/>");
