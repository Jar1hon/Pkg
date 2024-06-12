//Изменение цвета записей
define("ActivitySectionV2", ["ConfigurationConstants"], function (
  ConfigurationConstants
) {
  return {
    /* Название схемы объекта раздела. */
    entitySchemaName: "Activity",
    /* Методы модели представления раздела. */
    methods: {
      /* Переопределение базового метода, который модифицирует строку данных перед загрузкой в реестр. */
      prepareResponseCollectionItem: function (item) {
        /* Вызывает базовый метод. */
        this.callParent(arguments);
        item.customStyle = null;
        /* Определяет статус заказа. */
        var running = item.get("Status");
        /* Если состояние заказа "Исполнение", меняется стиль записи. */
        if (running.value === ConfigurationConstants.Activity.Status.Done) {
          item.customStyle = {
            /* Цвет текста — белый. */
            color: "black",
            /* Цвет фона — зеленый. */
            background: "#ffe5b4",
          };
        }
      },
    },
  };
});
