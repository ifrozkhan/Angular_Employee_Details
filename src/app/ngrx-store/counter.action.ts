//Operation you sre going to perform on data
import {createAction} from "@ngrx/store" 

export const increment = createAction('[Counter] increment action');

export const decrement = createAction('[Counter] decrement action');
