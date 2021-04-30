/*
============================================
; Title:  Invoice Api
; Author: Professor Krasso
; Date:   28 Apr 2021
; Modified by: Devan Wong, Erica Perry, Anil Rayamajhi
; Description: Invoice  apis
;===========================================
*/
// Require Statements

import { Router } from "express";
import { try } from "bluebird";

/**
 * Create Invoice - Anil
 */


/**
* FindPurchasedByService - Erica
*/
router.get('/purchases-graph', async (req, res) => {
    try {
        Invoice.aggregate([
            {
                $unwind: '$lineItems'
            },
            {
                $group:
                {
                    '_id':
                    {
                        'title': '$lineItems.title',
                        'price': '$lineItems.price'
                    },
                    'count':
                    {
                        $sum: 1
                    }
                }
            },
            {
                $sort:
                {
                    '_id.title': 1
                }

            }
        ], function (err, purchaseGraph) {
            if (err) {
                console.log(err);
                const findPurchasesByServiceGraphMongodbErrorResponse = new ErrorResponse('500', 'Internal Server error', err);
                res.status(500).send(findPurchasesByServiceGraphMongodbErrorResponse.toObject());
            }
            else {
                console.log(purchaseGraph);
                const findPurchasesByServiceGraphResponse = new BaseResponse('200', 'Query successful', purchaseGraph);
                res.json(findPurchasesByServiceGraphResponse.toObject());
            }

        })
    }

    catch (e) {

        console.log(e)
        const findPurchaseByServiceCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(findPurchaseByServiceCatchErrorResponse.toObect());
    }
});

module.exports = router;



