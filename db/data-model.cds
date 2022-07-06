namespace ferrero.mro;

using {
    managed,
    cuid,
    Currency,
    Country,
    sap.common,
    sap.common.CodeList
} from '@sap/cds/common';

entity Roles {
    key role        : String(3);
        description : String;
}

entity Users_Role_Assign {
    key userid : String(30);
        role   : Association to Roles
}

entity User_Approve_Maintain {
    key userid    : String(30);
    key managerid : String(30);
}

entity Vendor_List : managed {
    key manufacturerCode          : String(10);
    key localManufacturerCode     : String(10);
        // @Consumption.filter.hidden : true
    key countryCode               : String(3);
        countryDesc               : String;
        uuid                      : UUID;
        manufacturerCodeDesc      : String(35);
        localManufacturerCodeDesc : String(35);
        initiator                 : String;
        approver                  : String;
        status                    : String(10);
// to_status                 : Association to statusList;
}

entity Pricing_Conditions : managed {
    key manufacturerCode     : String(10);
        // key country              : String(3);
        // @Consumption.filter.hidden : true
        // key countryCode          : Association to countriesCodeList;
    key countryCode          : String(3);
        countryDesc          : String;
        uuid                 : UUID;
        manufacturerCodeDesc : String(35);
        localCurrency        : String(3);
        exchangeRate         : Decimal(4, 2);
        countryFactor        : Decimal(4, 2);
        validityStart        : Date;
        validityEnd          : Date;
        initiator            : String;
        approver             : String;
        ld_initiator         : String;
        // to_status            : Association to statusList;
        status               : String(10);
}

entity statusList {
    key code : String(10);
}


entity countriesCodeList {
    key code : String(3) @description : 'Country Code';
        desc : String    @description : 'Description';
}
