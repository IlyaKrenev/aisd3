class ArraySorts {
    private numArray: number[] = [];
    private _sortedArray: number[] = [];
    private callbackFn: () => void;

    constructor (array: number[], callbackFn: () => void) {
        this.setArray(array);
        this.callbackFn = callbackFn;
    }

    get array () {
        return this.numArray.slice();
    }

    setArray (array: number[]) {
        this.numArray = array;
    }

    get sortedArray () {
        return this._sortedArray;
    }

    setSortedArray (array: number[]) {
        this._sortedArray = array;
        this.callbackFn();
    }

    insertionSort () {
        const arr = this.array;

        for (let i = 1, l = arr.length; i < l; i++) {
            const current = arr[i];

            let j = i;

            while (j > 0 && arr[j - 1] > current) {
                arr[j] = arr[j - 1];
                j--;
            }


            arr[j] = current;
        }

        this.setSortedArray(arr);

        return arr;
    }

    selectionSort () {
        const arr = this.array;

        for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
            let indexMin = i;

            for (let j = i + 1; j < l; j++) {
                if (arr[indexMin] > arr[j]) {
                    indexMin = j;
                }
            }

            if (indexMin !== i) {
                [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
            }
        }

        this.setSortedArray(arr);

        return arr;
    }

    bubbleSort () {
        const arr = this.array;

        for (let j = arr.length - 1; j > 0; j--) {
            for (let i = 0; i < j; i++) {
                if (arr[i] > arr[i + 1]) {
                    let temp = arr[i];

                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                }
            }
        }

        this.setSortedArray(arr);

        return arr;
    }

    mergeSort () {
        const originalArray = this.array;

        const merge = (arrFirst, arrSecond) => {
            const arrSort = [];

            let i = 0;
            let j = 0;

            while (i < arrFirst.length && j < arrSecond.length) {
                arrSort.push(
                    (arrFirst[i] < arrSecond[j]) ?
                        arrFirst[i++] : arrSecond[j++]
                );
            }

            return [
                ...arrSort,
                ...arrFirst.slice(i),
                ...arrSecond.slice(j)
            ];
        };

        const mergeSort = arr => {
            if (!arr || !arr.length) {
                return null;
            }

            if (arr.length <= 1) {
                return arr;
            }

            const middle = Math.floor(arr.length / 2);
            const arrLeft = arr.slice(0, middle);
            const arrRight = arr.slice(middle);

            return merge(mergeSort(arrLeft), mergeSort(arrRight));
        };

        const sortedArr = mergeSort(originalArray);

        this.setSortedArray(sortedArr);

        return sortedArr;
    }

    shellSort () {
        const arr = this.array;
        const l = arr.length;

        let gap = Math.floor(l / 2);

        while (gap >= 1) {
            for (let i = gap; i < l; i++) {
                const current = arr[i];

                let j = i;

                while (j > 0 && arr[j - gap] > current) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }

                arr[j] = current;
            }

            gap = Math.floor(gap / 2);
        }

        this.setSortedArray(arr);

        return arr;
    }

    quickSort () {
        const originalArray = this.array;

        function quickSort(array) {
            if (array.length <= 1) {
                return array;
            }

            const pivot = array[array.length - 1];
            const leftList = [];
            const rightList = [];

            for (let i = 0; i < array.length - 1; i++) {
                if (array[i] < pivot) {
                    leftList.push(array[i]);
                }
                else {
                    rightList.push(array[i])
                }
            }

            return [...quickSort(leftList), pivot, ...quickSort(rightList)];
        }

        const sortedArr = quickSort(originalArray);

        this.setSortedArray(sortedArr);

        return sortedArr;
    }

    defaultSort () {
        const arr = this.array.sort((a, b) => a - b);

        this.setSortedArray(arr);

        return arr;
    }

    timeWrapper (func: () => void, amount: number) {
        const startTime = new Date().getTime();

        func = func.bind(this);

        func();

        const finishTime = new Date().getTime();

        console.log('Время выполнения:', finishTime - startTime, 'ms');
    }

    checkDifficult () {
        const results = [];

        const bad = [];
        const middle = [];
        const good = [];

        const check = (inputArray: number[], type: string) => {
            this.setArray(inputArray);

            const startTime = new Date().getTime();

            //this.insertionSort();
            //this.selectionSort();
            //this.bubbleSort();
            //this.mergeSort();
            //this.shellSort();
            //this.quickSort();
            this.defaultSort();

            console.log(this._sortedArray.slice(0, 100))

            const finishTime = new Date().getTime();

            results.push({
                amount: inputArray.length,
                type: type,
                ms: finishTime - startTime
            })
        }

        // for(let i = 1000; i < 6000; i += 1000) {
        for(let i = 10000; i < 50000; i += 10000) {
            for (let j = 0; j < i; j++) {
                middle.push(Math.round(Math.random() * 1000 - 500))
            }

            for (let j = 0; j < i; j++) {
                good.push(j)
            }

            for (let j = 0; j < i; j++) {
                bad.unshift(j)
            }

            check(middle, 'middle');
            check(good, 'good');
            check(bad, 'bad');
        }

        console.log(results)
    }

    checkTime () {
        const sorts: Array<() => number> = [
            this.insertionSort.bind(this),
            this.selectionSort.bind(this),
            this.bubbleSort.bind(this),
            this.mergeSort.bind(this),
            this.shellSort.bind(this),
            this.quickSort.bind(this),
            this.defaultSort.bind(this)
        ];

        const results = [];

        sorts.forEach((item, index) => {
            for(let i = 1000; i < 40000; i += 1000) {
                const inputArray = [];

                for (let j = 0; j < i; j++) {
                    inputArray.push(Math.round(Math.random() * 1000 - 500))
                }

                this.setArray(inputArray);

                const startTime = new Date().getTime();

                item();

                const finishTime = new Date().getTime();

                results.push({
                    index: index,
                    amount: i,
                    func: item.name,
                    ms: finishTime - startTime
                })
            }
        })

        console.log(results)
    }

    methodMapper: object = {
        insertionSort: 'Сортировка вставками',
        selectionSort: 'Сортировка выбором',
        bubbleSort: 'Пузырьковая сортировка',
        mergeSort: 'Сортировка слиянием',
        shellSort: 'Сортировка Шелла',
        quickSort: 'Быстрая сортировка',
        defaultSort: 'Дефолтная сортировка'
    }
}

class Main {
    private arrayInput: HTMLInputElement = null;
    private arrayContainer: HTMLDivElement = null;
    private sortedArrayContainer: HTMLDivElement = null;
    private outArray: HTMLDivElement = null;
    private applyButton: HTMLButtonElement = null;
    private generateButton: HTMLButtonElement = null;
    private generateInput: HTMLInputElement = null;
    private sortClass: ArraySorts;
    private arrayInitiated: boolean = false;

    constructor () {
        this.arrayInput = document.querySelector('.arrayInput');
        this.arrayContainer = document.querySelector('.arrayContainer');
        this.sortedArrayContainer = document.querySelector('.sortedArrayContainer');
        this.applyButton = document.querySelector('.applyButton');
        this.generateButton = document.querySelector('.generateButton');
        this.generateInput = document.querySelector('.generateInput');
        this.outArray = document.querySelector('.outArray');



        const inputArray = [];
        const randLength = Math.round(Math.random() * 100 + 20);

        for (let i = 0; i < randLength; i++) {
            inputArray.push(Math.round(Math.random() * 100 - 50))
        }

        this.sortClass = new ArraySorts(inputArray, this.updateSortedArray)

        this.sortClass.checkTime();
        //this.sortClass.checkDifficult();

        this.arrayInput.value = String(inputArray);

        this.arrayInput.addEventListener('input', this.validateInput);
        this.generateInput.addEventListener('input', this.validateInput);
        this.applyButton.addEventListener('click', this.handleApplyClick)
        this.generateButton.addEventListener('click', this.generateArray)
    }

    generateArray = () => {
        const size = parseInt(this.generateInput.value) || 20;
        const inputArray: number[] = [];

        for (let i = 0; i < size; i++) {
            inputArray.push(Math.round(Math.random() * 100 - 50))
        }

        this.arrayInput.value = String(inputArray);

        this.arrayInitiated = false;
        this.showElem(this.applyButton);
        this.hideElem(this.arrayContainer);
        this.hideElem(this.sortedArrayContainer);
        this.removeButtons();
    }

    handleApplyClick = () => {
        const inputValue = this.arrayInput.value.split(',');

        this.sortClass.setArray(inputValue.map((item) => {
            return parseInt(item);
        }));

        this.outArray.innerText = this.sortClass.array.join(', ');

        this.arrayInitiated = true;
        this.hideElem(this.applyButton);
        this.showElem(this.arrayContainer, 'flex');

        this.initButtons();
    }

    initButtons = () => {
        const mapper = this.sortClass.methodMapper;

        const buttons: Node[] = Object.entries(mapper).map(([name, displayName]) => {
            const button = document.createElement('button');

            button.textContent = displayName;
            button.className = 'sortButton';

            button.addEventListener('click', () => {
                this.sortClass[name]();
                this.showElem(this.sortedArrayContainer, 'flex');
            })

            return button
        });

        buttons.forEach((button) => {
            this.arrayContainer.append(button);
        });
    }

    removeButtons = () => {
        const buttons = document.querySelectorAll('.sortButton');

        buttons.forEach((button) => {
            button.remove();
        })
    }

    validateInput = (event) => {
        event.target.value = event.target.value.replace(/[^\d,-]+/g, '');

        this.arrayInitiated = false;
        this.showElem(this.applyButton);
        this.hideElem(this.arrayContainer);
        this.hideElem(this.sortedArrayContainer);
        this.removeButtons();
    }

    hideElem = (elem: HTMLElement) => {
        elem.style.display = 'none';
    }

    showElem = (elem: HTMLElement, block: 'flex' | 'block' = 'block') => {
        elem.style.display = block;
    }

    updateSortedArray = () => {
        const sortedArray: HTMLDivElement = document.querySelector('.sortedArray');

        sortedArray.textContent = this.sortClass.sortedArray.join(', ');
    }
}

const main = new Main();