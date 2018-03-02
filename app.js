function makeRand(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

var randomPay = Math.floor(Math.random() * 100);
var salesTax = makeRand(.02, .045);
var taxToCollect = randomPay * .02;
var promoCode = -10;
var subTotal = (randomPay + taxToCollect) + promoCode;


if(window.PaymentRequest) {
    const creditCardPaymentMethods = {
        supportedMethods: ['basic-card'],
        // OPTIONAL - Limit accepted cards to these specific ones
        data: {
            supprtedNetworks: ['visa', 'mastercard', 'doscpver'],
            // In supported versions of chrome we can ignore unwanted payment SVGUnitTypes. Option will be ignored if browser unsupported
            supportedTypes: ['credit', 'debit']
        }
    };

    const supportedPaymentMethods = [creditCardPaymentMethods];

const paymentDetails = {
    total: {
        label: 'What you pay',
        amount: {
            currency: 'USD',
            value: subTotal
        }
    },
    displayItems: [
        {
            label: 'Goods Sold',
            amount: {
                currency: 'USD',
                value: randomPay
            }
        },
      
        {
            label: 'Taxes',
            amount: {
                currency: 'USD',
                value: taxToCollect
            }
        },
        {
            label: 'Promo code',
            amount: {
                currency: 'USD',
                value: promoCode
            }
        }
    ]
};

    const options = {
        requestShipping: true,
        requestPayerEmail: true,
        requestPayerPhone: true
    }
    
    const paymentRequest = new PaymentRequest(supportedPaymentMethods, paymentDetails, options);

    // payment timeout handle

    // let paymentTimeout = window.setTimeout(function() {
    //     window.clearTimeout(paymentTimeout);
    //     paymentrequest.abort().then(function() {
    //       print('Payment timed out after 20 minutes.');
    //     }).catch(function() {
    //       print('Unable to abort, because the user is currently in the process ' +
    //           'of paying.');
    //     });
    //   }, 20 * 60 * 1000);

    paymentRequest.show()
//     .then((paymentResponse) => {
//         // window.clearTimeout(paymentTimeout) - handle timeout
//         // process paymentResponse here
//         fetch('/buy', {
//             method: 'POST',
//             headers: new Headers({'Content-Type': 'application/json'}),
//             // paymentResponse needs formatting to JSON dictionary before sending
//             body: paymentResponse
//         })
//         .then((buyResult) => {
//             if(buyResult.ok) {
//                 return buyResult.json();
//             }
//             complete(paymentResponse, 'fail', 'error sending paymentResponse to serve')
//         }).then((buyresultJSON) => {
//             complete(paymentResponse, buyresultJSON.status, buyresultJSON.message)
//         });
//     })
}
else {
    // fallback implementation for unsupported PaymentRequest API (legacy)
    // window.location.href = urlToGoGo || Filepath
}