class MyPromise {
  constructor() {

  };
};

const promiseTimeout = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Time is over");
  }, 1000);
});

promiseTimeout
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
