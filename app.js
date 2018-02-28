var randomPay = Math.floor(Math.random()* 100);

if(window.PaymentRequest) {
    const supportedPaymentMethods = [{
        supportedMethods: ['basic-card', 'visa', 'discover']
    }];
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
    paymentRequest.show()
    .then(function(paymentResponse){
        // process paymentResponse here
        paymentResponse.complete('success')
    })
}
else {
    // fallback implementation for unsupported PaymentRequest API (legacy)
    // window.location.href = urlToGoGo || Filepath
}