// Budget controller
const budgetController = (function () {
    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let allExpenses = [];
    let allIncomes = [];
    let totalExpenses = 0;

    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            let dataItems = data.allItems[type];
            // Create new ID
            if (dataItems.length > 0) {
                ID = dataItems[dataItems.length -1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // Push it into our data structure
            dataItems.push(newItem);

            // Return the new element
            return newItem;
        }
    }
})();

// UI Controller
const UIController = (function () {
    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();

// Global App controller
const controller = (function (budgetCtrl, UICtrl) {
    const setupEventListeners = function () {
        const DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if ( event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };



    const ctrlAddItem = function() {
        let input, newItem;
        // 1. Get the filed input data
        input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI

    };

    return {
        init: function () {
            console.log('App has started');
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();
