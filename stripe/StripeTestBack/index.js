const express = require('express');
const stripe = require('stripe')('sk_test_51NH8DvDMjRSafDzTEsJKqMFboxHv73Fdjx379fjEY8mIQY6SExoalxUdNyd3SpxuKHNijtHlK4hWpdxiJsIArt3S00rM2rni95');//Clave secreta de stripe apikey
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/stripe_checkout', async (req, res) => {
    const stripeToken = req.body.stripeToken;
    const cantidad = req.body.cantidad;

    const cantidadInEur = Math.round(cantidad * 100);
    const chargeObject = await stripe.charges.create({
        amount: cantidadInEur,
        currency: 'eur',
        source: stripeToken,
        capture: false,
        description: 'Mi camino al millon',
        receipt_email: '10minutosprogramando@gmail.com'
    });
    //Aqui es donde agregariamos la transaccion a nuestra base de datos
    // o comprobaciones sobre el pago.....

    try{
        await stripe.charges.capture(chargeObject.id);
        res.json(chargeObject);
    }catch (error){
        await stripe.refunds.create( {charge: chargeObject.id} );
        res.json(chargeObject);
    }
});

app.listen(3000 , () => {
    console.log('Server en puerto 3000!!');
});