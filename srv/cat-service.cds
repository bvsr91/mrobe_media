using ferrero.mro as my from '../db/data-model';

// @requires : 'authenticated-user'
// @requires : 'mrobeUser_sc'
@(restrict : [
    {
        grant : 'READ',
        to    : 'mrobeReadOnly_sc'
    },
    {
        grant : ['*'],
        to    : 'mrobeUser_sc'
    }
])
service MroService @(impl : './cat-service.js') @(path : '/MroSrv') {
    // @readonly
    entity Roles                as projection on my.Roles;
    entity Users                as projection on my.Users_Role_Assign;
    entity MaintainApproval     as projection on my.User_Approve_Maintain;
    entity VendorList           as projection on my.Vendor_List;
    entity PricingConditions    as projection on my.Pricing_Conditions;
    entity StatusCodeList       as projection on my.statusList;
    entity CountriesCodeList    as projection on my.countriesCodeList;
    entity pricingNotifications as projection on my.pricingNotifications;
    entity VendorNotifications  as projection on my.vendorNotifications;

    // type rejectResult {
    //     manufacturerCode : String;
    //     countryCoe     : String;
    // }

    action rejectPricing(manufacturerCode : String, countryCode : String) returns String;

    @readonly
    entity CheckUserRole        as projection on my.Users_Role_Assign;
}
