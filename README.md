# B13-A4-Job-Tracker

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
   Ans: getElementById selects one element using its id and it always returns a single element or null if it doesn’t exist. getElementsByClassName selects elements using a class name and returns multiple elements as a live collection, meaning if new elements with that class are added later, the list updates automatically.

querySelector and querySelectorAll are more flexible because they use full CSS selectors. querySelector returns only the first matching element, while querySelectorAll returns all matching elements, but as a static list that does not update automatically. In real projects, querySelector and querySelectorAll are used more because they give more control and cleaner selection options. 2. How do you create and insert a new element into the DOM?
Ans: We can create a new element using document.createElement(), then we add content or attributes to it, and finally insert it into the DOM using methods like appendChild(), append(), or prepend(). 3. What is Event Bubbling? And how does it work?
Ans: Event bubbling is when an event starts from the element we clicked and then moves upward to its parent elements one by one. 4. What is Event Delegation in JavaScript? Why is it useful?
Ans: Event delegation is a technique where we add one event listener to a parent element instead of adding separate listeners to many child elements. Because of event bubbling, when we click a child element, the event moves up to the parent, and the parent can detect which child was clicked.

It’s useful because it reduces the number of event listeners in the code, which keeps things cleaner and better for performance. It also works for elements that are added later dynamically. Instead of attaching new listeners every time we create an element, the parent listener will handle them automatically. 5. What is the difference between preventDefault() and stopPropagation() methods?
Ans: preventDefault() stops the browser’s default behavior for an event. For example, if we click a link, the browser normally navigates to another page. If we use preventDefault(), it won’t navigate. Same with a form submit — it stops the page from reloading.

stopPropagation() stops the event from moving up (or down) the DOM. It prevents the event from reaching parent elements. So if you click a button inside a div and call stopPropagation(), the div’s click event won’t run.

Simple way to remember: preventDefault() stops the browser action. stopPropagation() stops the event flow.
