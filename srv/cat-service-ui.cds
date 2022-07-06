using MroService from './cat-service';

// annotate MroService.VendorList with {
//     manufacturerCode
// }

annotate MroService.VendorList with @(UI : {
    LineItem        : [
        {
            $Type             : 'UI.DataField',
            Value             : manufacturerCode,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : manufacturerCodeDesc,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : localManufacturerCode,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : localManufacturerCodeDesc,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : countryCode,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : countryDesc,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : status,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : initiator,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : approver,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : createdAt,
            ![@UI.Importance] : #Low
        },
        {
            $Type             : 'UI.DataField',
            Value             : createdBy,
            ![@UI.Importance] : #Low
        },
        {
            $Type             : 'UI.DataField',
            Value             : modifiedAt,
            ![@UI.Importance] : #Low
        },
        {
            $Type             : 'UI.DataField',
            Value             : modifiedBy,
            ![@UI.Importance] : #Low
        }
    ],
    SelectionFields : [
        manufacturerCode,
        localManufacturerCode,
        countryCode
    ],
});


annotate MroService.PricingConditions with @(UI : {

    LineItem        : [
        {
            $Type             : 'UI.DataField',
            Value             : manufacturerCode,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : countryCode,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : countryFactor,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : exchangeRate,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : status,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : manufacturerCodeDesc,
            ![@UI.Importance] : #Low
        },
        {
            $Type             : 'UI.DataField',
            Value             : countryDesc,
            ![@UI.Importance] : #Low
        },
        {
            $Type             : 'UI.DataField',
            Value             : localCurrency,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : validityStart,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : validityEnd,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : ld_initiator,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : approver,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : approver,
            ![@UI.Importance] : #Medium
        },
        {
            $Type             : 'UI.DataField',
            Value             : createdAt,
            ![@UI.Importance] : #Low
        },
        {
            $Type             : 'UI.DataField',
            Value             : createdBy,
            ![@UI.Importance] : #Low
        },
        {
            $Type             : 'UI.DataField',
            Value             : modifiedAt,
            ![@UI.Importance] : #Low
        },
        {
            $Type             : 'UI.DataField',
            Value             : modifiedBy,
            ![@UI.Importance] : #Low
        }
    ],
    SelectionFields : [
        manufacturerCode,
        countryCode
    ],
});
