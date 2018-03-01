var randomPay = Math.floor(Math.random()* 100);

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
            label: 'Total Cost',
            amount: {
                currency: 'USD',
                value: randomPay
            },
            displayItems: [{
                label: 'Subtotal',
                amount: {
                    currency: 'USD',
                    value: '60'
                }
            }],
            shippingDetails: [{
                id: 'free',
                label: 'Worldwide free shipping',
                amount: {currency: 'USD', value: '0'}
            }]
        }
    }

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