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

const express = require("express");
const Invoice = require("../models/invoice");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");
// Configurations
const router = express.Router();

/**
 * Create Invoice API
 * Method: POST
 *
 * @returns Invoice
 */
router.post("/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;

    const newInvoice = {
      userName: userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total,
    };

    console.log(newInvoice);
    Invoice.create(newInvoice, function (err, invoice) {
      if (err) {
        console.log(err);
        const createInvoiceMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal Server error",
          err
        );
        return res
          .status(500)
          .send(createInvoiceMongodbErrorResponse.toObject());
      }

      console.log(invoice);
      const createInvoiceResponse = new BaseResponse(
        "200",
        "Query successful",
        invoice
      );
      return res.status(200).send(createInvoiceResponse.toObject());
    });
  } catch (e) {
    console.log(e);
    const createInvoiceCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }
});

/**
 * FindPurchasedByService API
 * Method: GET
 *
 * @returns Purchase by service
 */
router.get("/purchases-graph", async (req, res) => {
  try {
    Invoice.aggregate(
      [
        {
          $unwind: "$lineItems",
        },
        {
          $group: {
            _id: {
              title: "$lineItems.title",
              price: "$lineItems.price",
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.title": 1,
          },
        },
      ],
      function (err, purchaseGraph) {
        if (err) {
          console.log(err);
          const findPurchasesByServiceGraphMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal Server error",
            err
          );
          res
            .status(500)
            .send(findPurchasesByServiceGraphMongodbErrorResponse.toObject());
        } else {
          console.log(purchaseGraph);
          const findPurchasesByServiceGraphResponse = new BaseResponse(
            "200",
            "Query successful",
            purchaseGraph
          );
          res.json(findPurchasesByServiceGraphResponse.toObject());
        }
      }
    );
  } catch (e) {
    console.log(e);
    const findPurchaseByServiceCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(findPurchaseByServiceCatchErrorResponse.toObject());
  }
});

module.exports = router;
