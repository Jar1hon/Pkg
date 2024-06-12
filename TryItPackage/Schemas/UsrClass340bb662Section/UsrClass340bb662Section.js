define("UsrClass340bb662Section", ["ProcessModuleUtilities"], function (
  ProcessModuleUtilities
) {
  return {
    entitySchemaName: "UsrClass",
    messages: {
      FromSection: {
        mode: Terrasoft.MessageMode.BROADCAST,
        direction: Terrasoft.MessageDirectionType.PUBLISH,
      },
    },
    details: /**SCHEMA_DETAILS*/ {} /**SCHEMA_DETAILS*/,
    diff: /**SCHEMA_DIFF*/ [
      {
        operation: "insert",
        /* Имя родительского элемента. */
        parentName: "CombinedModeActionButtonsCardLeftContainer",
        propertyName: "items",
        /* Имя элемента. */
        name: "GetServiceInfoButton",
        values: {
          /* Тип элемента - кнопка. */
          itemType: Terrasoft.ViewItemType.BUTTON,
          /* Заголовок элемента получаем из локализованной строки. */
          caption: { bindTo: "Resources.Strings.GetServiceInfoButtonCaption" },
          /* Метод-обработчик нажатия кнопки. */
          click: { bindTo: "publishMessage" },
          enabled: true,
        },
      },
    ] /**SCHEMA_DIFF*/,
    methods: {
      publishMessage: function () {
        this.sandbox.publish("FromSection");
      },

      getBusinessProcessAddTrainings: function () {
        /* Получаем необходимые для процесса входящие параметры. */
        var id = this.getActiveRow().get("Id");
        var periodicity =
          this.getActiveRow().get("UsrPeriodicity").displayValue;
        var coach = this.getActiveRow().get("UsrCoach").value;
        if (!periodicity) {
          return;
        }
        /* Создаем конфигурационный объект для запуска процесса. */
        var args = {
          /* Имя созданного в предыдущих пунктах процесса. */
          sysProcessName: "UsrAddTrainingsProcess",
          /* Входящие параметры процесса. */
          parameters: {
            ProcessSchemaId: id,
            ProcessSchemaPeriodicity: periodicity,
            ProcessSchemaCoach: coach,
          },
        };
        /* Запуск процесса. */
        ProcessModuleUtilities.executeProcess(args);
      },
    },
  };
});
