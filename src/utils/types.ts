import { CSSProperties } from "react";

export interface PaySlip {
    id: string,
    receiverName: string,
    name: string,
    amount: string,
    deductions: string,
    fromDate: Date,
    toDate: Date,
    payDate: Date,
    file: string,
}

export interface RowType {
    item: any, // so any object can be passed in
    index?: number,
    style?: CSSProperties,
    onClick?: (item?: any)=> void,
}

export interface VirtualListType {
    items: Array<any>
}