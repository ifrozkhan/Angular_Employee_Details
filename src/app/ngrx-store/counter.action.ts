// Topic: Ngrx basic store
//Operation you sre going to perform on data
// action - create action file
// reducer - create reducer file for logic
// Store - inject service in config file
// dispatch - dispatch operation for the data execution
// select - display a data in different components

//Operation you sre going to perform on data

import {createAction} from "@ngrx/store" 

export const increment = createAction('[Counter] increment action');

export const decrement = createAction('[Counter] decrement action');
