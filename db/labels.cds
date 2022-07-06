using {ferrero.mro as schema} from './data-model';

annotate schema.Vendor_List {
    manufacturerCode          @title : '{i18n>manufacturerCode}'  @Common.Text      : manufacturerCodeDesc;
    manufacturerCodeDesc      @title : '{i18n>manufacturerCodeDesc}';
    countryCode               @title : '{i18n>countryCode}'  @Common.Text           : countryDesc;
    countryDesc               @title : '{i18n>countryDesc}';
    localManufacturerCode     @title : '{i18n>localManufacturerCode}'  @Common.Text : localManufacturerCodeDesc;
    localManufacturerCodeDesc @title : '{i18n>localManufacturerCodeDesc}';
    initiator                 @title : '{i18n>initiator}';
    approver                  @title : '{i18n>approver}';
    status                    @title : '{i18n>status}';
}


annotate schema.Pricing_Conditions {
    manufacturerCode     @title : '{i18n>manufacturerCode}'  @Common.Text : manufacturerCodeDesc;
    manufacturerCodeDesc @title : '{i18n>manufacturerCodeDesc}';
    countryCode          @title : '{i18n>countryCode}'  @Common.Text      : countryDesc;
    countryDesc          @title : '{i18n>countryDesc}'  @UI.HiddenFilter  : true;
    localCurrency        @title : '{i18n>localCurrency}';
    exchangeRate         @title : '{i18n>exchangeRate}';
    countryFactor        @title : '{i18n>countryFactor}';
    validityStart        @title : '{i18n>validityStart}';
    validityEnd          @title : '{i18n>validtyEnd}';
    initiator            @title : '{i18n>initiator}';
    ld_initiator         @title : '{i18n>ld_initiator}';
    approver             @title : '{i18n>approver}';
    status               @title : '{i18n>status}';
}

annotate schema.Roles {
    role        @title : '{i18n>role}';
    description @title : '{i18n>description}';
}

annotate schema.Users_Role_Assign {
    userid @title : '{i18n>userid}';
    role   @title : '{i18n>role}';
}

annotate User_Approve_Maintain {
    userid    @title : '{i18n>userid}';
    managerid @title : '{i18n>managerid}';
}
