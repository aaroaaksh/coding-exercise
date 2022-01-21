// GROUPS = [{group_id, group_name}, {}];
const addGroupSel = document.querySelector('#add-group');
let GROUPS = [];

// Users constructor (id, name)
// this.name = name;
// this. id = id;
// this.group_ids = [];
// this.amount = 0; // +/-

// groups = {
    // 'id'
// }

// Module --> constructor fn (groupName)
// this.group_name = groupName;
// this.group_id = // Generate randomly

// Groups.push({group info});
// this.total_expenses = 0;

// this.users = Users[];
// this.addUser --> (name)
// this.AddExpense --> (gid, mid, amount)
                        // this.
// this.computeDistribution -->

function createUser(id, name) {
    this.name = name;
    // this. id = '123456';
    this. id = id;
    // this.group_ids = [];
    this.amount = 0;
}

function createGroup(name) {
    this.users = [];
    this.group_name = name;
    this.total = 0;
    this.group_id = new Date().getTime();

    this.addUser = function(id, name) {
        const user = new createUser(id, name)
        console.log(user.id);
        this.users.push(user);
    }

    this.addExpense = function(uid, amt) {
        const userInfo = getUser(uid, this.users);
        console.log(userInfo);
        if(userInfo) {
            userInfo.amount = userInfo.amount + amt;
            this.total += amt;
        }
        this.computeBalance();
    }

    this.computeBalance = function() {
        const expensePerHead = this.total / (this.users.length || 1);
        this.users.forEach(user => {
            let res = user.amount;
            res -= expensePerHead;
            console.log(`${user.name} | ${res}`);
            return res;
        });
    }

    function getUser(uid, users) {
        return users.find(user => user.id == uid);
    }
}

var g1 = new createGroup('group_a');
GROUPS.push(g1);
g1.addUser(1, 'John Doe');
g1.addUser(2, 'Jane Doe');
// const temp_users = ['John Doe', 'Jane Doe', 'James'];

// // for(let i=0; i<3; i++) {
// //     setTimeout(() => {
// //         g1.addUser(temp_users[i]);
// //     }, 2000)
// // }

function createGroupHandler(evt) {
    evt.preventDefault();
    const group_name = document.querySelector('#group-name').value;
    const group = new createGroup(group_name);
    GROUPS.push(group);

    generateGroupTemplate(group);
}

function createUserHandler(evt) {
    evt.preventDefault();
    const form = evt.target;
    const userNameSel = form.querySelector('#user-name');
    const userName = userNameSel.value;

    const group = GROUPS.find(group => group.id == form.getAttribute('data-id'));
    if(group) {
        group.addUser()
    }
    console.log(evt.target);
}

function generateGroupTemplate(group) {
    const container = document.querySelector('.group-list');
    const {
        group_name,
        group_id,
        users,
        total
    } = group;

    const template = `
        <h2>${group_name}</h2>
        <form action="" id="add-user" data-id="${group_id}">
            <input type="text" name="" id="user-name" placeholder="Enter User Name" required />
            <button>Add user</button>
        </form>
        <table data-groupid="${group_id}">
            <thead>
                <tr>
                    <td>User ID</td>
                    <td>Name</td>
                    <td>Owe</td>
                    <td>Receive</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                ${
                    users.map(({
                        id,
                        name,
                        amount
                    }) => {
                        const owe_amt = amount < 0 ? amount : 0
                        const receive_amt = amount > 0 ? amount : 0
                        return `
                            <tr>
                                <td>${id}</td>
                                <td>${name}</td>
                                <td>${owe_amt}</td>
                                <td>${receive_amt}</td>
                                <td>
                                    <button class="btn-addExpense" data-id="${group_id}" data-uid="${id}">Add Expense</button>
                                </td>
                            </tr>
                        `
                    })
                }
            </tbody>
        </table>
        <p>Total: ${total}</p>`;
    
    const t = document.createElement('div');
    t.className = "group";
    t.innerHTML = template;
    const userFormSel = t.querySelector('#add-user');

    userFormSel.addEventListener('submit', createUserHandler)
    container.appendChild(t);
}

addGroupSel.addEventListener('submit', createGroupHandler);
