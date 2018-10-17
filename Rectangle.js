import { Circle } from './Circle'


export class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    getCircle(r) {
        return new Circle(r);
    }
};