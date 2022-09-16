class MyPromiseClass {
    onResolved;
    onRejected;
    isCalled = false;
    isFulfilled = false;
    isRejected = false;
    value;
    error;

    constructor(executor) {
        return executor(this.resolve.bind(this), this.reject.bind(this))
    }
    resolve(data) {
        this.isFulfilled = true;
        this.value = data;
        // console.log(this.value);
        if (typeof this.onResolved === "function" && !this.isCalled) {
            this.onResolved(data);
            this.isCalled = true;
        }

    }
    static resolve(value) {
        return new MyPromiseClass((resolve) => {
            resolve(value);
        });
    }

    static reject(error) {
        return new MyPromiseClass((resolve, reject) => {
            reject(error)
        });
    };

    static all(promises) {
        return new MyPromiseClass((resolve, reject) => {
            let count = 0;
            let result = [];
            if (promises.length === 0) {
                resolve(promises);
                return;
            };
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(val => done(val)).catch(err => reject(err))
            };
            const done = (value) => {
                result.push(value);
                count++;
                if (promises.length === count) {
                    resolve(result);
                };
            };
        });
    };

    reject(err) {
        this.isRejected = true;
        this.error = err;
        if (typeof this.onRejected === "function" && !this.isCalled) {
            this.onRejected(err);
            this.isCalled = true;
        };
    };

    then(thenHandler) {
        this.onResolved = thenHandler;
        if (!this.isCalled && this.isFulfilled) {
            this.onResolved(this.value);
        };
        return this;
    };

    catch (catchHandler) {
        this.onRejected = catchHandler;
        if (!this.isCalled && this.isRejected) {
            this.onRejected(this.error);
        };
        return this;
    };

}

const aaa = new MyPromiseClass((resolve, reject) => {
    setTimeout(() => {
        resolve('resolve');
        // reject('reject');
        // reject(new Error("err")); // work as promise
    }, 1500)
    // resolve('resolved without async');
    // reject('rejected without async');
}).then(e => console.log(e)).then(e => console.log(e)).catch(err => console.error(err))

// MyPromiseClass.resolve('sd').then(e => console.log('aa',e))


MyPromiseClass.resolve('aaaaa').then(e => console.log(e)).catch(e => console.error(e));

let p1 = Promise.resolve("data");
let p2 = Promise.resolve("data 2");
let p3 = new Promise((res, rej) => {
    setTimeout(() => {
        res("data3");
    }, 1000);
});

Promise.all([p1, p2, p3]).then((data) => console.log("Promise: ", data)).catch(err => console.error(err));
MyPromiseClass.all([p1, p2, p3]).then((data) => console.log("My Promise: ", data)).catch(err => console.error(err));