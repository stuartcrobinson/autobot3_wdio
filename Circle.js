import {Rectangle} from './Rectangle'

export default class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    getRect(h, w){
        return new Rectangle(h, w);
    }
};