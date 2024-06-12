define("ContactAddressDetailV2", [], function () {
  return {
    entitySchemaName: "AccountAddress",
    methods: {
      /* Удаление пункта [Копировать] ([Copy]) меню. */
      getCopyRecordMenuItem: Terrasoft.emptyFn,
      /* Удаление пункта [Редактировать] ([Edit]) меню. */
      getEditRecordMenuItem: Terrasoft.emptyFn,
      /* Удаление пункта [Удалить] ([Delete]) меню. */
      getDeleteRecordMenuItem: Terrasoft.emptyFn,
    },
    diff: /**SCHEMA_DIFF*/ [] /**SCHEMA_DIFF*/,
  };
});
