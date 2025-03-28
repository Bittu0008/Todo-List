// // Mere Code Ke Dwara

// const searchBox = document.querySelector(".search-field");
// const content = document.querySelector(".content");


// const addToDO = (searchBox) => {
//     const taskBox = document.createElement("div");
//     taskBox.className = "work";
//     taskBox.innerHTML = `
//     <div class="left">
//     <p>${searchBox}</p>
//     </div>
//     <div class="right">
//     <div class="red"></div>
//     <div class="green"></div>
//     </div>
//     `;
    
    
//     let green = taskBox.querySelector(".left p");

//     let greenBtn = taskBox.querySelector(".right .green");
//     greenBtn.addEventListener("click", () => {
//         green.style.color = "green";
//     })

//     if(searchBox.trim() === "" ){
//         alert("Write something...");
//         taskBox.style.display = "none";
//         taskBox.ease = "Power1";
//     }
    
//     taskBox.querySelector(".right .red").addEventListener("click",function(){
//         taskBox.style.display = "none";
//         taskBox.ease = "Power1";
//     });
//     content.appendChild(taskBox);
// } 

// searchBox.addEventListener("keyup",function(event){
//     if(event.key == "Enter") {
//         addToDO(this.value);
//         this.value = "";
//     };
// });
// // addToDO();








// AI Code ke Dwara



const searchBox = document.querySelector(".search-field");
const content = document.querySelector(".content");

// ✅ LocalStorage से डेटा लोड करें
const loadTasks = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // पहले से सेव किए गए टास्क लोड करें

    content.innerHTML = ""; // पहले से मौजूद HTML साफ करें

    tasks.forEach(task => {
        createTaskElement(task.text, task.isGreen); // Green Status के साथ Load करें
    });
};

// ✅ नया Task बनाने का Function
const createTaskElement = (taskText, isGreen = false) => {
    const taskBox = document.createElement("div");
    taskBox.className = "work";
    taskBox.innerHTML = `
    <div class="left">
        <p>${taskText}</p>
    </div>
    <div class="right">
        <div class="red"></div>
        <div class="green"></div>
    </div>
    `;

    let greenText = taskBox.querySelector(".left p");

    // ✅ अगर Task पहले से Green था, तो रंग बदलें
    if (isGreen) {
        greenText.style.color = "green";
    }

    // ✅ ग्रीन बटन पर क्लिक करने से टेक्स्ट ग्रीन होगा और स्टेट सेव होगा
    taskBox.querySelector(".right .green").addEventListener("click", function () {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        
        tasks = tasks.map(task => {
            if (task.text === taskText) {
                task.isGreen = !task.isGreen; // ग्रीन स्टेट टॉगल करें
            }
            return task;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks)); // LocalStorage अपडेट करें
        
        greenText.style.color = greenText.style.color === "green" ? "black" : "green"; // UI अपडेट करें
    });

    // ❌ रेड बटन पर क्लिक करने से टास्क डिलीट होगा
    taskBox.querySelector(".right .red").addEventListener("click", function () {
        removeTask(taskText);
        taskBox.remove(); // UI से भी हटाएँ
    });

    content.appendChild(taskBox);
};

// ✅ नया Task जोड़ना
const addToDO = (taskText) => {
    if (taskText.trim() === "") {
        alert("Write something...");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, isGreen: false }); // नया टास्क ऐड करें
    localStorage.setItem("tasks", JSON.stringify(tasks)); // LocalStorage अपडेट करें

    createTaskElement(taskText, false); // UI में टास्क दिखाएँ
};

// ❌ Task को हटाना
const removeTask = (taskText) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText); // टास्क लिस्ट से हटाएँ
    localStorage.setItem("tasks", JSON.stringify(tasks)); // LocalStorage अपडेट करें
};

// ✅ Enter दबाने पर नया Task ऐड होगा
searchBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addToDO(this.value);
        this.value = ""; // इनपुट फील्ड खाली करें
    }
});

// ✅ पेज लोड होते ही पुराने टास्क लोड करें
loadTasks();

