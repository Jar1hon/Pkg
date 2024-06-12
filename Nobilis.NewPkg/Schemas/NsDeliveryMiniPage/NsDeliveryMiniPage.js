define("NsDeliveryMiniPage", [], function () {
  return {
    entitySchemaName: "UsrDelivery",
    details: /**SCHEMA_DETAILS*/ {} /**SCHEMA_DETAILS*/,
    attributes: {
      MiniPageModes: {
        value: [this.Terrasoft.ConfigurationEnums.CardOperation.ADD],
      },
    },
    diff: /**SCHEMA_DIFF*/ [
      {
        operation: "insert",
        parentName: "MiniPage",
        propertyName: "items",
        name: "UsrName",
        values: {
          isMiniPageModelItem: true,
          layout: {
            column: 0,
            row: 1,
            colSpan: 24,
          },
          controlConfig: {
            focused: true,
          },
        },
      },
      {
        operation: "insert",
        parentName: "MiniPage",
        propertyName: "items",
        name: "UsrDeliveryWay",
        values: {
          isMiniPageModelItem: true,
          layout: {
            column: 0,
            row: 2,
            colSpan: 24,
          },
        },
      },
    ] /**SCHEMA_DIFF*/,
  };
});
