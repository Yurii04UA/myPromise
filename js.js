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
    this.#status = statuses.pending;
    return fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(data) {
    if (this.#status === statuses.pending) {
      this.#status = statuses.fulfilled;
      return this.#thenFn(data);
    }
  }
  reject(error) {
    if (this.#status === statuses.pending) {
      this.#status = statuses.rejected;
      return this.#catchFn(error);
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
  setTimeout(() => {
    resolve("Time is over");
    reject(new Error("err"));
  }, 1000);
});

promiseTimeout
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const a = new MyPromise((res, rej) => {
  res("a");
});
console.log(a);
