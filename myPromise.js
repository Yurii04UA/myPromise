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
        // in then we pass a function that should be executed if successful after the asynchronous code and it is written to a local variable onResolved
        onResolved = thenHandler;
        // console.log('my promise',onResolved);
        if (!isCalled && isFulfilled) {
            onResolved(value);
        };


        return this;
    };
    this.catch = function (catchHandler) {
        // in catch we pass a function that should be executed if rrror after the asynchronous code and it is written to a local variable onRejected
        onRejected = catchHandler;
        if (!isCalled && isRejected) {
            onRejected(error);
        }
        return this;
    };

    // this.finally = function (finallyHandler) {
    //     if (value) console.log("Finally Success :", value);
    //     if (error) console.log("Finally Reject :", error);
    // };

    function resolve(data) {
        isFulfilled = true;
        value = data;
        if (typeof onResolved === "function" && !isCalled) {
            // this code wont run if there wasn`t async func
            onResolved(data);
            isCalled = true;
        }
        // console.log(typeof onResolved === "function");
    }

    function reject(err) {
        isRejected = true;
        error = err;
        if (typeof onRejected === "function" && !isCalled) {
            onRejected(err);
            isCalled = true;
        }
    }

    executor(resolve, reject); // do async code and after call or resolve/ reject func
}

MyPromise.resolve = (value) => {
    return new MyPromise((resolve, reject) => {
        resolve(value);
    });
};
MyPromise.reject = (error) => {
    return new MyPromise((resolve, reject) => {
        reject(error);
    });
};

MyPromise.all = (promises) => {
    return new MyPromise((resolve, reject) => {
        let count = 0;
        let result = [];
        if (promises.length === 0) {
            resolve(promises);
            return;
        }

        for (i = 0; i < promises.length; i++) {
            promises[i].then((val) => done(val)).catch((err) => reject(err));
        }

        const done = (value) => {
            result.push(value);
            ++count;
            if (promises.length === count) {
                resolve(result);
            }
        };
    });
};

let myPromise = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
    //   resolve("resolve");
    //   reject(new Error("err")); // work as promise
    // }, 1500);

    resolve("resolve2");
});
// console.log(myPromise);
// Promise.resolve("Promise: resolve")
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error));
// MyPromise.resolve("My promise: resolve")
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error))


// Promise.reject("Promise: reject")
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error));
// MyPromise.reject("My Promise: reject")
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error))


// let p1 = Promise.resolve("data");
// let p2 = Promise.resolve("data 2");
// let p3 = new Promise((res, rej) => {
//     setTimeout(() => {
//         res("data3");
//     }, 1000);
// });
// Promise.all([p1, p2, p3]).then((data) => console.log("Promise: ", data));
// MyPromise.all([p1, p2, p3]).then((data) => console.log("My Promise: ", data));

// myPromise.then(e => e).then((e) => console.log(e));