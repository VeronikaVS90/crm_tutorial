import { makeObservable, observable, computed, action } from "mobx"

class Test {
    value: number=0

    constructor() {
        makeObservable(this, {
            value: observable,
            double: computed,
            increment: action,
        })
        
    }

    get double() {
        return this.value * 2
    }

    increment() {
        this.value++
    }

    
}

export const test = new Test();