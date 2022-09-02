function MyPromise(executor) {
  // accept function
  let onResolved;
  let onRejected;
  let isCalled = false;
  let isFulfilled = false;
  let isRejected = false;
  let value;
  let error;

  this.then = function (thenHandler) {
    onResolved = thenHandler;
    if (!isCalled && isFulfilled) {
      onResolved(value);
    }
    return this;
  };
  this.catch = function (catchHandler) {
    onRejected = catchHandler;
    if (!isCalled && isRejected) {
      onRejected(error);
    }
    return this;
  };

  function resolve(data) {
    isFulfilled = true;
    value = data;
    if (typeof onResolved === "function" && !isCalled) {
      onResolved(data);
      isCalled = true;
    }
  }
  function reject(err) {
    isRejected = true;
    error = err;
    if (typeof onRejected === "function" && !isCalled) {
      onRejected(err);
      isCalled = true;
    }
  }

  executor(resolve, reject); // do async code and after call or resolve/ reject method
}

let myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("resolve");
    reject(new Error("err")); // work as promise
  }, 1500);
});

myPromise.then((e) => e).then((e) => console.log(e));
