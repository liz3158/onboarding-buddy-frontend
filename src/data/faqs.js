export const faqs = [
  {
    id: 1,
    question: "How do I declare variables in JavaScript?",
    answer: "In JavaScript, you can declare variables using 'var', 'let', or 'const'. 'let' and 'const' are block-scoped and introduced in ES6. Use 'const' for values that won't be reassigned, and 'let' for values that will change.",
    category: "JavaScript Basics"
  },
  {
    id: 2,
    question: "What is the difference between let and const?",
    answer: "'let' allows you to declare variables that can be reassigned, while 'const' declares variables that cannot be reassigned after initialization. However, const objects' properties can still be modified.",
    category: "JavaScript Basics"
  },
  {
    id: 3,
    question: "How do arrow functions work?",
    answer: "Arrow functions are a concise way to write functions in JavaScript. They have a shorter syntax and automatically bind 'this' to the surrounding code's context. Example: const add = (a, b) => a + b;",
    category: "Functions"
  },
  {
    id: 4,
    question: "What are common array methods?",
    answer: "Common array methods include map(), filter(), reduce(), forEach(), push(), pop(), shift(), unshift(). Map creates a new array with transformed elements, filter creates a new array with elements that pass a test, and reduce combines array elements into a single value.",
    category: "Arrays"
  },
  {
    id: 5,
    question: "How does async/await work?",
    answer: "async/await is a way to handle promises more elegantly. An async function returns a promise, and await pauses the execution until a promise is resolved. This makes asynchronous code look and behave more like synchronous code.",
    category: "Async Programming"
  }
];
