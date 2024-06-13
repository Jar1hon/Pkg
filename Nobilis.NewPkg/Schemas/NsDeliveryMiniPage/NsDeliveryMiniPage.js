define("NsDeliveryMiniPage", [], function () {
  return {
    entitySchemaName: "UsrDelivery",
    details: /**SCHEMA_DETAILS*/ {} /**SCHEMA_DETAILS*/,
    attributes: {
      MiniPageModes: {
        value: [
          Terrasoft.ConfigurationEnums.CardOperation.VIEW,
          Terrasoft.ConfigurationEnums.CardOperation.ADD,
        ],
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
          visible: true,
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
      // {
      //   operation: "insert",
      //   parentName: "MiniPage",
      //   propertyName: "items",
      //   name: "Type",
      //   values: {
      //     isMiniPageModelItem: true,
      //     visible: true,
      //     layout: {
      //       column: 0,
      //       row: 2,
      //       colSpan: 24,
      //     },
      //   },
      // },
    ] /**SCHEMA_DIFF*/,
  };
});
