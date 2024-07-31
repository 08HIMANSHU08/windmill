// const catalogServiceDummyResponse = [
//   {
//     categories: [
//       {
//         descriptor: {
//           name: 'Individual Insurance',
//           code: 'INDIVIDUAL_INSURANCE'
//         },
//         id: 'C1'
//       },
//       {
//         descriptor: {
//           name: 'Family Insurance',
//           code: 'FAMILY_INSURANCE'
//         },
//         id: 'C2'
//       },
//       {
//         descriptor: {
//           name: 'Health Insurance',
//           code: 'HEALTH_INSURANCE'
//         },
//         id: 'C3'
//       }
//     ],
//     descriptor: {
//       long_desc:
//           'ABC Insurance Ltd. Deals in multiple Insurance Services like Health, Motor, Marine etc',
//       name: 'ABC Insurance Ltd.',
//       short_desc: 'ABC Insurance Ltd. India ',
//       images: [
//         {
//           url: 'https://www.abcinsurance.com/content/dam/abc/india/assets/images/header/logo.png',
//           size_type: 'xs'
//         }
//       ]
//     },
//     id: 'P1',
//     items: [
//       {
//         category_ids: ['C1', 'C3'],
//         descriptor: {
//           name: 'Health Cateina',
//           short_desc:
//               'ABC Individual Health Insurance Class A with custom addon'
//         },
//         id: 'I1',
//         tags: [
//           {
//             descriptor: {
//               name: 'General Information',
//               code: 'GENERAL_INFO'
//             },
//             list: [
//               {
//                 descriptor: {
//                   code: 'COVERAGE_AMOUNT'
//                 },
//                 value: '10000000'
//               },
//               {
//                 descriptor: {
//                   code: 'CO_PAYMENT'
//                 },
//                 value: 'Yes'
//               },
//               {
//                 descriptor: {
//                   code: 'ROOM_RENT_CAP'
//                 },
//                 value: '25000'
//               },
//               {
//                 descriptor: {
//                   code: 'RESTORATION_BENEFIT'
//                 },
//                 value: 'No'
//               },
//               {
//                 descriptor: {
//                   code: 'CLAIM_SETTLEMENT_RATIO'
//                 },
//                 value: '0.8'
//               },
//               {
//                 descriptor: {
//                   code: 'PRE_HOSPITALIZATION_COVERAGE_DAYS'
//                 },
//                 value: '2'
//               },
//               {
//                 descriptor: {
//                   code: 'POST_HOSPITALIZATION_COVERAGE_DAYS'
//                 },
//                 value: '5'
//               },
//               {
//                 descriptor: {
//                   code: 'MATERNITY_COVERAGE'
//                 },
//                 value: 'Yes'
//               },
//               {
//                 descriptor: {
//                   code: 'INITIAL_WAITING_PERIOD'
//                 },
//                 value: 'No'
//               },
//               {
//                 descriptor: {
//                   name: 'CASHLESS_HOSPITALS'
//                 },
//                 value: '50'
//               }
//             ]
//           }
//         ],
//         time: {
//           duration: 'P1Y',
//           label: 'TENURE'
//         },
//         xinput: {
//           head: {
//             descriptor: {
//               name: 'Customer Information'
//             },
//             index: {
//               min: 0,
//               cur: 0,
//               max: 0
//             },
//             headings: ['Insured Personal Details']
//           },
//           form: {
//             id: 'FO1',
//             mime_type: 'text/html',
//             url: 'https://fis.test.bpp.io/form/ekyc_dtls?formid=FO5', // `${process.env.BPP_GATEWAYURL}/form/:${form_id}?${transactionId}`,
//             resubmit: true,
//             multiple_sumbissions: false
//           },
//           required: true
//         },
//         add_ons: [
//           {
//             id: 'A1',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'No Claim Bonus',
//               code: 'NO_CLAIM_BONUS'
//             },
//             price: {
//               value: '100',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A2',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Daycare Cover',
//               code: 'DAYCARE_COVER'
//             },
//             price: {
//               value: '200',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A3',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Daily Cash Allowance',
//               code: 'DAILY_CASH_ALLOWANCE'
//             },
//             price: {
//               value: '1000',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A4',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Domicialiary Expenses',
//               code: 'DOMICILIARY_EXPENSES'
//             },
//             price: {
//               value: '400',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A5',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Health Check-ups',
//               code: 'HEALTH_CHECK_UPS'
//             },
//             price: {
//               value: '100',
//               currency: 'INR'
//             }
//           }
//         ]
//       },
//       {
//         category_ids: ['C2', 'C3'],
//         descriptor: {
//           name: 'Health Cateina Plus Family',
//           short_desc:
//               'short description of the Family Insurance Type 1'
//         },
//         id: '1b0fb502-630d-4650-a195-9262c1436e2d',
//         tags: [
//           {
//             descriptor: {
//               name: 'General Information',
//               code: 'GENERAL_INFO'
//             },
//             list: [
//               {
//                 descriptor: {
//                   code: 'COVERAGE_AMOUNT'
//                 },
//                 value: '10000000'
//               },
//               {
//                 descriptor: {
//                   code: 'CO_PAYMENT'
//                 },
//                 value: 'Yes'
//               },
//               {
//                 descriptor: {
//                   code: 'ROOM_RENT_CAP'
//                 },
//                 value: '25000'
//               },
//               {
//                 descriptor: {
//                   code: 'RESTORATION_BENEFIT'
//                 },
//                 value: 'No'
//               },
//               {
//                 descriptor: {
//                   code: 'CLAIM_SETTLEMENT_RATIO'
//                 },
//                 value: '0.8'
//               },
//               {
//                 descriptor: {
//                   code: 'PRE_HOSPITALIZATION_COVERAGE_DAYS'
//                 },
//                 value: '2'
//               },
//               {
//                 descriptor: {
//                   code: 'POST_HOSPITALIZATION_COVERAGE_DAYS'
//                 },
//                 value: '5'
//               },
//               {
//                 descriptor: {
//                   code: 'MATERNITY_COVERAGE'
//                 },
//                 value: 'Yes'
//               },
//               {
//                 descriptor: {
//                   code: 'INITIAL_WAITING_PERIOD'
//                 },
//                 value: 'No'
//               },
//               {
//                 descriptor: {
//                   code: 'CASHLESS_HOSPITALS'
//                 },
//                 value: '50'
//               }
//             ]
//           }
//         ],
//         add_ons: [
//           {
//             id: 'C1',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'No Claim Bonus',
//               code: 'NO_CLAIM_BONUS'
//             },
//             price: {
//               value: '100',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'C2',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Daycare Cover',
//               code: 'DAYCARE_COVER'
//             },
//             price: {
//               value: '200',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'C3',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Daily Cash Allowance',
//               code: 'DAILY_CASH_ALLOWANCE'
//             },
//             price: {
//               value: '1000',
//               currency: 'INR'
//             }
//           },
//           {
//             id: '4',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Domicialiary Expenses',
//               code: 'DOMICILIARY_EXPENSES'
//             },
//             price: {
//               value: '100',
//               currency: 'INR'
//             }
//           },
//           {
//             id: '5',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Health Check-ups',
//               code: 'HEALTH_CHECK_UPS'
//             },
//             price: {
//               value: '400',
//               currency: 'INR'
//             }
//           }
//         ],
//         time: {
//           duration: 'P1Y',
//           label: 'TENURE'
//         },
//         xinput: {
//           head: {
//             descriptor: {
//               name: 'Customer Information'
//             },
//             index: {
//               min: 0,
//               cur: 0,
//               max: 0
//             },
//             headings: ['Insured Personal Details']
//           },
//           form: {
//             id: 'FO2',
//             mime_type: 'text/html',
//             url: 'https://fis.test.bpp.io/form/ekyc_dtls?formid=FO5', // `${process.env.BPP_GATEWAYURL}/form/:${form_id}?${transactionId}`
//             resubmit: true,
//             multiple_sumbissions: false
//           },
//           required: true
//         }
//       }
//     ],
//     payments: ''
//   }
// ]

// const catalogServiceDummyResponseSearch1 = [
//   {
//     categories: [
//       {
//         descriptor: {
//           name: 'Individual Insurance',
//           code: 'INDIVIDUAL_INSURANCE'
//         },
//         id: 'C1'
//       },
//       {
//         descriptor: {
//           name: 'Family Insurance',
//           code: 'FAMILY_INSURANCE'
//         },
//         id: 'C2'
//       },
//       {
//         descriptor: {
//           name: 'Health Insurance',
//           code: 'HEALTH_INSURANCE'
//         },
//         id: 'C3'
//       }
//     ],
//     descriptor: {
//       long_desc:
//           'ABC Insurance Ltd. Deals in multiple Insurance Services like Health, Motor, Marine etc',
//       name: 'ABC Insurance Ltd.',
//       short_desc: 'ABC Insurance Ltd. India ',
//       images: [
//         {
//           url: 'https://www.abcinsurance.com/content/dam/abc/india/assets/images/header/logo.png',
//           size_type: 'xs'
//         }
//       ]
//     },
//     id: 'P1',
//     items: [
//       {
//         id: 'I1',
//         category_ids: ['C1', 'C3'],
//         descriptor: {
//           name: 'Health Gain Plus Individual',
//           short_desc:
//               'ABC Individual Health Insurance Class A with custom addon'
//         },
//         tags: [
//           {
//             descriptor: {
//               name: 'General Information',
//               code: 'GENERAL_INFO'
//             },
//             list: [
//               {
//                 descriptor: {
//                   code: 'COVERAGE_AMOUNT'
//                 },
//                 value: '10000000'
//               },
//               {
//                 descriptor: {
//                   code: 'CO_PAYMENT'
//                 },
//                 value: 'Yes'
//               },
//               {
//                 descriptor: {
//                   code: 'ROOM_RENT_CAP'
//                 },
//                 value: '25000'
//               },
//               {
//                 descriptor: {
//                   code: 'RESTORATION_BENEFIT'
//                 },
//                 value: 'No'
//               },
//               {
//                 descriptor: {
//                   code: 'CLAIM_SETTLEMENT_RATIO'
//                 },
//                 value: '0.8'
//               },
//               {
//                 descriptor: {
//                   code: 'PRE_HOSPITALIZATION_COVERAGE_DAYS'
//                 },
//                 value: '2'
//               },
//               {
//                 descriptor: {
//                   code: 'POST_HOSPITALIZATION_COVERAGE_DAYS'
//                 },
//                 value: '5'
//               },
//               {
//                 descriptor: {
//                   code: 'MATERNITY_COVERAGE'
//                 },
//                 value: 'Yes'
//               },
//               {
//                 descriptor: {
//                   code: 'INITIAL_WAITING_PERIOD'
//                 },
//                 value: 'No'
//               },
//               {
//                 descriptor: {
//                   name: 'CASHLESS_HOSPITALS'
//                 },
//                 value: '50'
//               }
//             ]
//           }
//         ],
//         time: {
//           duration: 'P1Y',
//           label: 'TENURE'
//         },
//         add_ons: [
//           {
//             id: 'A1',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'No Claim Bonus',
//               code: 'NO_CLAIM_BONUS'
//             },
//             price: {
//               value: '100',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A2',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Daycare Cover',
//               code: 'DAYCARE_COVER'
//             },
//             price: {
//               value: '200',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A3',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Daily Cash Allowance',
//               code: 'DAILY_CASH_ALLOWANCE'
//             },
//             price: {
//               value: '1000',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A4',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Domicialiary Expenses',
//               code: 'DOMICILIARY_EXPENSES'
//             },
//             price: {
//               value: '400',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A5',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Health Check-ups',
//               code: 'HEALTH_CHECK_UPS'
//             },
//             price: {
//               value: '100',
//               currency: 'INR'
//             }
//           }
//         ]
//       },
//       {
//         id: 'CHILD_ITEM_ID_I1',
//         parent_item_id: 'I1',
//         category_ids: ['C1', 'C3'],
//         descriptor: {
//           name: 'Health Gain Plus Individual',
//           short_desc:
//               'ABC Individual Health Insurance Class A with custom addon'
//         },
//         price: {
//           currency: 'INR',
//           value: '900'
//         },
//         tags: [
//           {
//             descriptor: {
//               name: 'General Information',
//               code: 'GENERAL_INFO'
//             },
//             list: [
//               {
//                 descriptor: {
//                   code: 'COVERAGE_AMOUNT'
//                 },
//                 value: '10000000'
//               },
//               {
//                 descriptor: {
//                   code: 'CO_PAYMENT'
//                 },
//                 value: 'Yes'
//               },
//               {
//                 descriptor: {
//                   code: 'ROOM_RENT_CAP'
//                 },
//                 value: '25000'
//               },
//               {
//                 descriptor: {
//                   code: 'RESTORATION_BENEFIT'
//                 },
//                 value: 'No'
//               },
//               {
//                 descriptor: {
//                   code: 'CLAIM_SETTLEMENT_RATIO'
//                 },
//                 value: '0.8'
//               },
//               {
//                 descriptor: {
//                   code: 'PRE_HOSPITALIZATION_COVERAGE_DAYS'
//                 },
//                 value: '2'
//               },
//               {
//                 descriptor: {
//                   code: 'POST_HOSPITALIZATION_COVERAGE_DAYS'
//                 },
//                 value: '5'
//               },
//               {
//                 descriptor: {
//                   code: 'MATERNITY_COVERAGE'
//                 },
//                 value: 'Yes'
//               },
//               {
//                 descriptor: {
//                   code: 'INITIAL_WAITING_PERIOD'
//                 },
//                 value: 'No'
//               },
//               {
//                 descriptor: {
//                   name: 'CASHLESS_HOSPITALS'
//                 },
//                 value: '50'
//               },
//               {
//                 descriptor: {
//                   code: 'BASE_PRICE',
//                   name: 'Base Price',
//                   short_desc: 'Base Price'
//                 },
//                 value: '900'
//               },
//               {
//                 descriptor: {
//                   code: 'CONVIENCE_FEE',
//                   name: 'Convience Fee',
//                   short_desc: 'Convience Fee'
//                 },
//                 value: '50'
//               },
//               {
//                 descriptor: {
//                   code: 'PROCESSING_FEE',
//                   name: 'Processing Fee',
//                   short_desc: 'Processing Fee'
//                 },
//                 value: '10'
//               },
//               {
//                 descriptor: {
//                   code: 'TAX',
//                   name: 'Tax',
//                   short_desc: 'Tax'
//                 },
//                 value: '40'
//               },
//               {
//                 descriptor: {
//                   code: 'OFFER_VALIDITY',
//                   name: 'Offer validity',
//                   short_desc: 'Describes the offer validity'
//                 },
//                 value: 'PT15D'
//               }
//             ]
//           }
//         ],
//         time: {
//           duration: 'P1Y',
//           label: 'TENURE'
//         },
//         add_ons: [
//           {
//             id: 'A1',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'No Claim Bonus',
//               code: 'NO_CLAIM_BONUS'
//             },
//             price: {
//               value: '100',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A2',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Daycare Cover',
//               code: 'DAYCARE_COVER'
//             },
//             price: {
//               value: '200',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A3',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Daily Cash Allowance',
//               code: 'DAILY_CASH_ALLOWANCE'
//             },
//             price: {
//               value: '1000',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A4',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Domicialiary Expenses',
//               code: 'DOMICILIARY_EXPENSES'
//             },
//             price: {
//               value: '400',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A5',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Health Check-ups',
//               code: 'HEALTH_CHECK_UPS'
//             },
//             price: {
//               value: '100',
//               currency: 'INR'
//             }
//           }
//         ]
//       },
//       {
//         id: 'CHILD_ITEM_ID_I2',
//         parent_item_id: 'I1',
//         category_ids: ['C1', 'C3'],
//         descriptor: {
//           name: 'Health Gain Plus Individual',
//           short_desc:
//               'ABC Individual Health Insurance Class A with custom addon'
//         },
//         price: {
//           currency: 'INR',
//           value: '1000'
//         },
//         tags: [
//           {
//             descriptor: {
//               name: 'General Information',
//               code: 'GENERAL_INFO'
//             },
//             list: [
//               {
//                 descriptor: {
//                   code: 'COVERAGE_AMOUNT'
//                 },
//                 value: '10000000'
//               },
//               {
//                 descriptor: {
//                   code: 'CO_PAYMENT'
//                 },
//                 value: 'Yes'
//               },
//               {
//                 descriptor: {
//                   code: 'ROOM_RENT_CAP'
//                 },
//                 value: '25000'
//               },
//               {
//                 descriptor: {
//                   code: 'RESTORATION_BENEFIT'
//                 },
//                 value: 'No'
//               },
//               {
//                 descriptor: {
//                   code: 'CLAIM_SETTLEMENT_RATIO'
//                 },
//                 value: '0.8'
//               },
//               {
//                 descriptor: {
//                   code: 'PRE_HOSPITALIZATION_COVERAGE_DAYS'
//                 },
//                 value: '2'
//               },
//               {
//                 descriptor: {
//                   code: 'POST_HOSPITALIZATION_COVERAGE_DAYS'
//                 },
//                 value: '5'
//               },
//               {
//                 descriptor: {
//                   code: 'MATERNITY_COVERAGE'
//                 },
//                 value: 'Yes'
//               },
//               {
//                 descriptor: {
//                   code: 'INITIAL_WAITING_PERIOD'
//                 },
//                 value: 'No'
//               },
//               {
//                 descriptor: {
//                   name: 'CASHLESS_HOSPITALS'
//                 },
//                 value: '50'
//               },
//               {
//                 descriptor: {
//                   code: 'BASE_PRICE',
//                   name: 'Base Price',
//                   short_desc: 'Base Price'
//                 },
//                 value: '1000'
//               },
//               {
//                 descriptor: {
//                   code: 'CONVIENCE_FEE',
//                   name: 'Convience Fee',
//                   short_desc: 'Convience Fee'
//                 },
//                 value: '50'
//               },
//               {
//                 descriptor: {
//                   code: 'PROCESSING_FEE',
//                   name: 'Processing Fee',
//                   short_desc: 'Processing Fee'
//                 },
//                 value: '10'
//               },
//               {
//                 descriptor: {
//                   code: 'TAX',
//                   name: 'Tax',
//                   short_desc: 'Tax'
//                 },
//                 value: '40'
//               },
//               {
//                 descriptor: {
//                   code: 'OFFER_VALIDITY',
//                   name: 'Offer validity',
//                   short_desc: 'Describes the offer validity'
//                 },
//                 value: 'PT15D'
//               }
//             ]
//           }
//         ],
//         time: {
//           duration: 'P1Y',
//           label: 'TENURE'
//         },
//         add_ons: [
//           {
//             id: 'A1',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'No Claim Bonus',
//               code: 'NO_CLAIM_BONUS'
//             },
//             price: {
//               value: '100',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A2',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Daycare Cover',
//               code: 'DAYCARE_COVER'
//             },
//             price: {
//               value: '200',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A3',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Daily Cash Allowance',
//               code: 'DAILY_CASH_ALLOWANCE'
//             },
//             price: {
//               value: '1000',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A4',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Domicialiary Expenses',
//               code: 'DOMICILIARY_EXPENSES'
//             },
//             price: {
//               value: '400',
//               currency: 'INR'
//             }
//           },
//           {
//             id: 'A5',
//             quantity: {
//               available: {
//                 count: 1
//               }
//             },
//             descriptor: {
//               name: 'Health Check-ups',
//               code: 'HEALTH_CHECK_UPS'
//             },
//             price: {
//               value: '100',
//               currency: 'INR'
//             }
//           }
//         ]
//       }
//     ],
//     payments: ''
//   }
// ]

// const catalogServiceDummyResponseSelect = {
//   items: [
//     {
//       add_ons: [
//         {
//           descriptor: {
//             code: 'NO_CLAIM_BONUS',
//             name: 'No Claim Bonus'
//           },
//           id: 'A1',
//           price: {
//             currency: 'INR',
//             value: '100'
//           },
//           quantity: {
//             selected: {
//               count: 1
//             }
//           }
//         }
//       ],
//       category_ids: ['C1', 'C3'],
//       descriptor: {
//         name: 'Health Gain Plus Individual',
//         short_desc:
//             'ABC Individaul Health Insurance Class A with custom addon'
//       },
//       id: 'CHILD_ITEM_ID_I1',
//       parent_item_id: 'I1',
//       price: {
//         currency: 'INR',
//         value: '900'
//       },
//       tags: [
//         {
//           descriptor: {
//             code: 'GENERAL_INFO',
//             name: 'General Information'
//           },
//           list: [
//             {
//               descriptor: {
//                 code: 'COVERAGE_AMOUNT'
//               },
//               value: '10000000'
//             },
//             {
//               descriptor: {
//                 code: 'CO_PAYMENT'
//               },
//               value: 'Yes'
//             },
//             {
//               descriptor: {
//                 code: 'ROOM_RENT_CAP'
//               },
//               value: '25000'
//             },
//             {
//               descriptor: {
//                 code: 'RESTORATION_BENEFIT'
//               },
//               value: 'No'
//             },
//             {
//               descriptor: {
//                 code: 'CLAIM_SETTLEMENT_RATIO'
//               },
//               value: '0.8'
//             },
//             {
//               descriptor: {
//                 code: 'PRE_HOSPITALIZATION_COVERAGE_DAYS'
//               },
//               value: '2'
//             },
//             {
//               descriptor: {
//                 code: 'POST_HOSPITALIZATION_COVERAGE_DAYS'
//               },
//               value: '5'
//             },
//             {
//               descriptor: {
//                 code: 'MATERNITY_COVERAGE'
//               },
//               value: 'Yes'
//             },
//             {
//               descriptor: {
//                 code: 'INITIAL_WAITING_PERIOD'
//               },
//               value: 'No'
//             },
//             {
//               descriptor: {
//                 code: 'CASHLESS_HOSPITALS'
//               },
//               value: '50'
//             }
//           ]
//         }
//       ],
//       time: {
//         duration: 'P1Y',
//         label: 'TENURE'
//       },
//       xinput: {
//         form: {
//           id: 'FO4',
//           mime_type: 'text/html',
//           multiple_sumbissions: false,
//           resubmit: true,
//           url: 'https://fis.test.bpp.io/form/ekyc_dtls?formid=FO5'
//         },
//         head: {
//           descriptor: {
//             name: 'Customer Information'
//           },
//           headings: ['EKYC'],
//           index: {
//             cur: 0,
//             max: 0,
//             min: 0
//           }
//         },
//         required: true
//       }
//     }
//   ],
//   provider: {
//     descriptor: {
//       images: [
//         {
//           size_type: 'xs',
//           url: 'https://www.abcinsurance.com/content/dam/abc/india/assets/images/header/logo.png'
//         }
//       ],
//       long_desc:
//           'ABC Insurance Ltd. Deals in multiple Insurance Services like Health, Motor, Marine etc',
//       name: 'ABC Insurance Ltd.',
//       short_desc: 'ABC Insurance Ltd. India '
//     },
//     id: 'P1'
//   },
//   quote: {
//     breakup: [
//       {
//         price: {
//           currency: 'INR',
//           value: '900'
//         },
//         title: 'BASE_PRICE'
//       },
//       {
//         price: {
//           currency: 'INR',
//           value: '50'
//         },
//         title: 'CONVIENCE_FEE'
//       },
//       {
//         price: {
//           currency: 'INR',
//           value: '40'
//         },
//         title: 'TAX'
//       },
//       {
//         price: {
//           currency: 'INR',
//           value: '10'
//         },
//         title: 'PROCESSING_FEE'
//       },
//       {
//         item: {
//           add_ons: [
//             {
//               id: 'A1'
//             }
//           ],
//           id: 'I1'
//         },
//         price: {
//           currency: 'INR',
//           value: '100'
//         },
//         title: 'ADD_ONS'
//       }
//     ],
//     id: 'PROPOSAL_ID',
//     price: {
//       currency: 'INR',
//       value: '1100'
//     },
//     ttl: 'P15D'
//   }
// }

const ACK = {
  message: {
    ack: {
      status: 'ACK'
    }
  }
}

const NACK = {
  message: {
    ack: {
      status: 'NACK'
    }
  }
}
export {
  // catalogServiceDummyResponse,
  // catalogServiceDummyResponseSearch1,
  // catalogServiceDummyResponseSelect,
  ACK,
  NACK
}
