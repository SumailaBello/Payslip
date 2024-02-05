import { PaySlip } from "./types";
import {v4 as uuidv4} from 'uuid';

const names = ['Joy Jane', 'John Doe', 'Jane Doe', 'Mc Gyver', 'Tony Stark', 'James Bond', 'Steve Rogers', 'Nat Doe', 
'Elon Musk', 'Jeff Bezos', 'Richard Dawkins', 'Dwayne Johnson', 'Marie Curie', 'Jeniffer Hudson'
]

export let paySlips: Array<PaySlip> = [];

for(let i = 0; i < 50; i++) {
    const individualName = names[Math.floor(Math.random() * names.length)];
    const val: PaySlip = {
        id: uuidv4(),
        amount: '8000',
        deductions: '200',
        receiverName: individualName,
        name: `${individualName}'s Payslip`,
        fromDate: new Date(),
        toDate: new Date(),
        payDate: new Date(),
        file: 'https://freetestdata.com/wp-content/uploads/2022/11/Free_Test_Data_10.5MB_PDF.pdf',
        // file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        // file: 'https://drive.google.com/uc?export=download&id=1Yj400EBJGC_RHB6MX12brPudOXRsSS-S.pdf',
    }
    paySlips.push(val);
}