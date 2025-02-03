document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('arrayContainer');
    const algorithmSelect = document.getElementById('algorithmSelect');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    const algoInfoDiv = document.getElementById('algoInfo');
  
    
    const algorithmInfo = {
      bubbleSort: {
        name: "Bubble Sort",
        time: "O(n²)",
        space: "O(1)",
        description: "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity are quite high."
      },
      insertionSort: {
        name: "Insertion Sort",
        time: "O(n²)",
        space: "O(1)",
        description: "Insertion sort is a simple sorting algorithm that works by iteratively inserting each element of an unsorted list into its correct position in a sorted portion of the list. It is like sorting playing cards in your hands. You split the cards into two groups: the sorted cards and the unsorted cards. Then, you pick a card from the unsorted group and put it in the right place in the sorted group."
      },
      selectionSort: {
        name: "Selection Sort",
        time: "O(n²)",
        space: "O(1)",
        description: "Selection Sort is a comparison-based sorting algorithm. It sorts an array by repeatedly selecting the smallest (or largest) element from the unsorted portion and swapping it with the first unsorted element. This process continues until the entire array is sorted."
      },
      mergeSort: {
        name: "Merge Sort",
        time: "O(n log n)",
        space: "O(n)",
        description: "Merge sort is a sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the input array into smaller subarrays and sorting those subarrays then merging them back together to obtain the sorted array."
      },
      quickSort: {
        name: "Quick Sort",
        time: "O(n log n) on average",
        space: "O(log n)",
        description: "QuickSort is a sorting algorithm based on the Divide and Conquer that picks an element as a pivot and partitions the given array around the picked pivot by placing the pivot in its correct position in the sorted array."
      },
      heapSort: {
        name: "Heap Sort",
        time: "O(n log n)",
        space: "O(1)",
        description: "Heap sort is a comparison-based sorting technique based on Binary Heap Data Structure. It can be seen as an optimization over selection sort where we first find the max (or min) element and swap it with the last (or first). We repeat the same process for the remaining elements. In Heap Sort, we use Binary Heap so that we can quickly find and move the max element in O(Log n) instead of O(n) and hence achieve the O(n Log n) time complexity."
      }
    };
  
    
    function updateAlgorithmInfo(algoKey) {
      const info = algorithmInfo[algoKey];
      algoInfoDiv.innerHTML = `
        <h2>${info.name}</h2>
        <p><strong>Time Complexity:</strong> ${info.time}</p>
        <p><strong>Space Complexity:</strong> ${info.space}</p>
        <p>${info.description}</p>
      `;
    }
  
    
    algorithmSelect.addEventListener('change', () => {
      updateAlgorithmInfo(algorithmSelect.value);
    });
  
    
    updateAlgorithmInfo(algorithmSelect.value);
  
    
    function generateArray(size = 10) {
      arrayContainer.innerHTML = '';
      const array = [];
      for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        const element = document.createElement('div');
        element.classList.add('array-element');
        element.style.height = `${value}%`;
        element.textContent = value;
        arrayContainer.appendChild(element);
        array.push(element);
      }
      return array;
    }
  
    
    let array = generateArray();
  
    
    speedSlider.addEventListener('input', () => {
      const value = speedSlider.value;
      speedValue.textContent = `${value}ms`;
    });
  
    
    startBtn.addEventListener('click', () => {
      const selectedAlgorithm = algorithmSelect.value;
      const speed = parseInt(speedSlider.value);
      
      switch (selectedAlgorithm) {
        case 'mergeSort':
          mergeSort([...array], 0, array.length - 1, speed);
          break;
        case 'insertionSort':
          insertionSort([...array], speed);
          break;
        case 'selectionSort':
          selectionSort([...array], speed);
          break;
        case 'bubbleSort':
          bubbleSort([...array], speed);
          break;
        case 'quickSort':
          quickSort([...array], 0, array.length - 1, speed);
          break;
        case 'heapSort':
          heapSort([...array], speed);
          break;
      }
    });

    resetBtn.addEventListener('click', () => {
      array = generateArray(); 
      array.forEach(el => el.classList.remove('sorted')); 
    });
  
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
   
    async function bubbleSort(array, speed) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          const current = array[j];
          const next = array[j + 1];
          current.classList.add('selected');
          next.classList.add('selected');
          if (parseInt(current.textContent) > parseInt(next.textContent)) {
            swap(array, j, j + 1);
          }
          await sleep(speed);
          current.classList.remove('selected');
          next.classList.remove('selected');
        }
      }
      array.forEach(el => el.classList.add('sorted'));
    }
  
    
    async function insertionSort(array, speed) {
      for (let i = 1; i < array.length; i++) {
        let keyHeight = array[i].style.height;
        let keyText = array[i].textContent;
        array[i].classList.add('selected');
        let j = i - 1;
        
        while (j >= 0 && parseInt(array[j].textContent) > parseInt(keyText)) {
          array[j].classList.add('selected');
          array[j + 1].style.height = array[j].style.height;
          array[j + 1].textContent = array[j].textContent;
          await sleep(speed);
          array[j].classList.remove('selected');
          j--;
        }
        
        array[j + 1].style.height = keyHeight;
        array[j + 1].textContent = keyText;
        array[i].classList.remove('selected');
      }
      array.forEach(el => el.classList.add('sorted'));
    }
  
   
    async function selectionSort(array, speed) {
      for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        array[i].classList.add('selected');
        for (let j = i + 1; j < array.length; j++) {
          array[j].classList.add('selected');
          if (parseInt(array[j].textContent) < parseInt(array[minIndex].textContent)) {
            minIndex = j;
          }
          await sleep(speed);
          array[j].classList.remove('selected');
        }
        if (minIndex !== i) {
          swap(array, i, minIndex);
        }
        array[i].classList.remove('selected');
      }
      array.forEach(el => el.classList.add('sorted'));
    }
  
    
    async function mergeSort(array, left, right, speed) {
      if (left >= right) return;
      let mid = Math.floor((left + right) / 2);
      await mergeSort(array, left, mid, speed);
      await mergeSort(array, mid + 1, right, speed);
      await merge(array, left, mid, right, speed);
    }
  
    async function merge(array, left, mid, right, speed) {
      
      let n1 = mid - left + 1;
      let n2 = right - mid;
      let L = [];
      let R = [];
      for (let i = 0; i < n1; i++) {
        L[i] = { height: array[left + i].style.height, text: array[left + i].textContent };
      }
      for (let j = 0; j < n2; j++) {
        R[j] = { height: array[mid + 1 + j].style.height, text: array[mid + 1 + j].textContent };
      }
      let i = 0, j = 0, k = left;
      while (i < n1 && j < n2) {
        array[k].classList.add('selected');
        if (parseInt(L[i].text) <= parseInt(R[j].text)) {
          array[k].style.height = L[i].height;
          array[k].textContent = L[i].text;
          i++;
        } else {
          array[k].style.height = R[j].height;
          array[k].textContent = R[j].text;
          j++;
        }
        await sleep(speed);
        array[k].classList.remove('selected');
        k++;
      }
      while (i < n1) {
        array[k].classList.add('selected');
        array[k].style.height = L[i].height;
        array[k].textContent = L[i].text;
        await sleep(speed);
        array[k].classList.remove('selected');
        i++;
        k++;
      }
      while (j < n2) {
        array[k].classList.add('selected');
        array[k].style.height = R[j].height;
        array[k].textContent = R[j].text;
        await sleep(speed);
        array[k].classList.remove('selected');
        j++;
        k++;
      }
    }
  
    
    async function quickSort(array, left, right, speed) {
      if (left >= right) return;
      const pivotIndex = await partition(array, left, right, speed);
      await quickSort(array, left, pivotIndex - 1, speed);
      await quickSort(array, pivotIndex + 1, right, speed);
    }
  
    async function partition(array, left, right, speed) {
      const pivotValue = parseInt(array[right].textContent);
      let i = left - 1;
      for (let j = left; j < right; j++) {
        if (parseInt(array[j].textContent) <= pivotValue) {
          i++;
          swap(array, i, j);
          array[j].classList.add('selected');
          await sleep(speed);
          array[j].classList.remove('selected');
        }
      }
      swap(array, i + 1, right);
      return i + 1;
    }
  
    
    async function heapSort(array, speed) {
      const n = array.length;
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i, speed);
      }
      for (let i = n - 1; i > 0; i--) {
        swap(array, 0, i);
        await heapify(array, i, 0, speed);
      }
      array.forEach(el => el.classList.add('sorted'));
    }
  
    async function heapify(array, n, i, speed) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && parseInt(array[left].textContent) > parseInt(array[largest].textContent)) {
        largest = left;
      }
      if (right < n && parseInt(array[right].textContent) > parseInt(array[largest].textContent)) {
        largest = right;
      }
      if (largest !== i) {
        swap(array, i, largest);
        await heapify(array, n, largest, speed);
      }
    }
  
    
    function swap(array, i, j) {
      const tempHeight = array[i].style.height;
      array[i].style.height = array[j].style.height;
      array[j].style.height = tempHeight;
      const tempValue = array[i].textContent;
      array[i].textContent = array[j].textContent;
      array[j].textContent = tempValue;
    }
  
    
    array = generateArray();
  });
  