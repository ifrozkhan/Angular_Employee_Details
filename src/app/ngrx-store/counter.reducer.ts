//This is where we have login to modify state
import { Conditional } from "@angular/compiler";
import { createReducer, on } from "@ngrx/store";
import { decrement, increment } from "./counter.action";

export const intialValue = 0;

export const counterReducer = createReducer(intialValue,
    on(increment, (state: number) => state + 1),
    on(decrement, (state: number) => state - 1)
)

export interface Appstore{
    count: number;
}