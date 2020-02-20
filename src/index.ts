import './styles.css';

const tipButtons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
const tipMessage = document.getElementById('tip-Message') as HTMLDivElement;
const tipPercentage = document.getElementById('tip-Percentage') as HTMLDListElement;
const totalPaid = document.getElementById('total') as HTMLDListElement;
const amountOfTip = document.getElementById('tip-Amount') as HTMLDListElement;
const inputAmount = document.getElementById('bill-Input-Amount') as HTMLInputElement;
const billAmount = document.getElementById('bill-Amount') as HTMLDListElement;
const customTip = document.getElementById('custom-tip') as HTMLInputElement;

let selectedTipButton = document.querySelector(':disabled') as HTMLButtonElement;
let billedAmount = 0.00;
let tipMultipler = selectedTipButton.value;
let tipAmountMessage = selectedTipButton.innerText;

tipButtons.forEach(btn => {
    btn.addEventListener('click', handleClick);
});

inputAmount.addEventListener('change', amountsUpdate);

customTip.addEventListener('change', customTipUpdate);

function handleClick() {
    const that = this as HTMLButtonElement;

    tipButtons.forEach(btn => {
        customTip.value = '';
        if (btn === that) {
            btn.disabled = true;
            updateSelectedButton();
            updateTipInformation();
        } else {
            btn.disabled = false;
        }
    });
}

function customTipUpdate() {
    tipButtons.forEach(btn => {
        btn.disabled = false;
    });
    tipMultipler = '.' + customTip.value;
    tipAmountMessage = customTip.value + '%';
    updateTipInformation();
}

function amountsUpdate() {
    if ((parseFloat(inputAmount.value)) > 0) {
        inputAmount.style.borderColor = '#ced4da';
        billedAmount = parseFloat(inputAmount.value);
    } else {
        inputAmount.style.borderColor = 'red';
        billedAmount = 0.00;
    }
    updateTipInformation();
}

function updateTipInformation() {
    updateTipMessage();
    updateTipPercentage();
    updateAmountOfTipMessage();
    updateBillAmount();
    updateTotalPaid();
}

function updateSelectedButton() {
    selectedTipButton = document.querySelector(':disabled') as HTMLButtonElement;
    tipMultipler = selectedTipButton.value;
    tipAmountMessage = selectedTipButton.innerText;
}

function getTipAmount(): string {
    return (billedAmount * parseFloat(tipMultipler)).toFixed(2).toString();
}

function updateTotalPaid() {
    totalPaid.innerText = 'Total to be Paid: $' + (billedAmount + parseFloat(getTipAmount())).toFixed(2).toString();
}

function updateTipPercentage() {
    tipPercentage.innerText = 'Tip Percentage: ' + tipAmountMessage;
}

function updateAmountOfTipMessage() {
    amountOfTip.innerText = 'Amount of tip: $' + getTipAmount();
}

function updateBillAmount() {
    billAmount.innerText = 'Bill Amount: $' + (billedAmount).toFixed(2).toString();
}

function updateTipMessage() {
    tipMessage.innerText = 'You are tipping ' + tipAmountMessage;

}
