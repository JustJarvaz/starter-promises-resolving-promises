// eslint-disable-next-line strict

//Each of the functions inside of utils/fortune-teller.js returns promises.
const { welcome, goodbye, tell } = require("../utils/fortune-teller");

const promise = welcome();

console.log(promise);//> Promise { "Provide me a question and I'll give you an answer..." }

/*Although you can see the final value stored inside of the promise variable in the above example,
   you aren't able to access the string inside. In other words, you only have access to the Promise object, not the string.

Thankfully, JavaScript's Promise object offers two methods—then() and catch()—that allow you to pull values out of fulfilled or rejected promises.*/

/*The then() method can be called on a promise when ur ready to receive its value, 
AS LONG AS THAT VALUE IS FULFILLED, NOT REJECTED. That's because if a value inside of a promise is rejected with the reject() function
 (found in fotune-teller.js),
 it will skip the then() method until it finds a catch().
The then() method usually takes a single argument: a callback function. Inside of that function, you can access the value.*/
const promise = welcome();
promise.then((result) => {
  console.log("The result is:", result);
});//> The result is: Provide me a question and I'll give you an answer...

/*The callback has a single parameter, which contains the end result of the promise code.
The code above can also be written to chain directly from the promise, like so:*/
welcome().then((result) => {
    console.log("The result is:", result);
  });//> The result is: Provide me a question and I'll give you an answer...

 /*Because console.log() is a function, you can also just pass it in to then() if you do not need to do anything extra*/

welcome().then(console.log);//> Provide me a question and I'll give you an answer...

/*Use external variables
Although you can only access the result of a promise inside of a then() function,
 you can use variables outside of its scope inside of the then() callback function:*/
 const question = "Will the weather be nice today?";
const promise = tell(question);
promise.then((fortune) => {
  console.log(question);
  console.log(fortune);
});//> Will the weather be nice today?
//> Without a doubt.

/* IN REFERENCE TO LINE 15-18: 
For example, if no question is provided to the tell() function below, an error message will be passed into the reject() function:*/
tell()
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Failure:", error);
  });//> Failure: A question is required...

/* When a promise's state changes to rejected, it skips ahead of any then() methods to the next catch() method.
 Notice that there is only one value logged. The "Success:" message does not get called at all! */

 //Use catch()
//Include a catch() at the end of your code's current then(). Log out the value from the callback and then run your code; you won't see the error message.
//Then try removing the question and running the code again.
const question = "Will the weather be nice today?";
const promise = tell();
promise
  .then((fortune) => {
    console.log(question);
    console.log(fortune);
  })
  .catch(console.log);
//Reorder then() and catch()
//If a promise reaches the fulfilled status, the response goes to the next then(). 
//And if a promise reaches the rejected status, the response goes to the next catch(). This is true regardless of the order.

const question = "Will the weather be nice today?";
const promise = tell(question);
promise.catch(console.log).then((fortune) => {
  console.log(question);
  console.log(fortune);
});
//The above code will work the same regardless of whether catch() comes before or after then(). It's typical to leave catch() statements at the end, but it isn't necessary.
//Try switching the order of your then() and catch() code to verify this assertion.

//Chain then() and catch()
//You can continue to chain then() and catch() statements, depending on what you want to accomplish with the return result.
// It's important to note that if a then() or catch() doesn't return a promise, it will always move to the next then().

welcome()
  .then(console.log)
  .then(() => {
    goodbye().then(console.log);
  });