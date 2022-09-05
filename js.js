const statuses = {
  pending: "PENDING",
  fulfilled: "FULFILLED",
  rejected: "REJECTED",
};

class MyPromise {
  #status;
  #thenFn = () => {};
  #catchFn = () => {};
  constructor(fn) {
    // constructor accepts func as a parameter
    this.#status = statuses.pending;
    return fn(this.resolve.bind(this), this.reject.bind(this)); // call function, which has a resolce callback and reject callback as parameter. (call method resolve/reject after async code)
  }

  resolve(data) { 
    if (this.#status === statuses.pending) {
      this.#status = statuses.fulfilled;
      setTimeout(() => {
        try {
          return this.#thenFn(data); // this is callback
        } catch (err) {
          this.#status = statuses.rejected;
          this.#catchFn(err);
        }
      }, 0); // emulation micro tasks
    }
  }
  reject(error) {
    if (this.#status === statuses.pending) {
      this.#status = statuses.rejected;
      setTimeout(() => {
        return this.#catchFn(error); // this is callback
      }, 0); // emulation micro tasks
    }
  }

  then(onResolved, onRejected) {
    if (onResolved) {
      this.#thenFn = onResolved;
    }
    return this;
  }
  catch(onRejected) {
    if (onRejected) {
      this.#catchFn = onRejected;
    }
    return this.then(null, onRejected);
  }
}

const promiseTimeout = new MyPromise((resolve, reject) => {
  // some asyn code which calls either : if success - resolve or reject while fail
  setTimeout(() => {
    resolve("Time is over");
    reject(new Error("err"));
  }, 1000);
});

promiseTimeout
  .then(data => data)
  .then(data=> console.log(data))
  .catch((err) => console.log(err));
  



// const a = new MyPromise((res, rej) => {
//   res("a");
// });
// console.log(a);

