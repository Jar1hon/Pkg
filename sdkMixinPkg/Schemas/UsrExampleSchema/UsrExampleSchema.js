/* Объявление модуля. Обязательно укажите как зависимость модуль ContentImageMixin, в котором объявлен класс миксина. */
define("UsrExampleSchema", ["ContentImageMixin"], function () {
  return {
    entitySchemaName: "ExampleEntity",
    mixins: {
      /* Подключение миксина к схеме. */
      ContentImageMixin: "Terrasoft.ContentImageMixin",
    },
    details: /**SCHEMA_DETAILS*/ {} /**SCHEMA_DETAILS*/,
    diff: /**SCHEMA_DIFF*/ [
      {
        operation: "insert",
        parentName: "AddRightsItemsHeaderImagesContainer",
        propertyName: "items",
        name: "AddRightsReadImage",
        values: {
          classes: {
            wrapClass: ["rights-header-image"],
          },
          getSrcMethod: "getReadImageUrl",
          imageTitle: resources.localizableStrings.ReadImageTitle,
          generator: "ImageCustomGeneratorV2.generateSimpleCustomImage",
        },
      },
    ] /**SCHEMA_DIFF*/,
    methods: {
      getReadImageUrl: function () {
        /* Пользовательская реализация. */
        console.log("Contains custom logic");
        /* Вызов метода миксина. */
        this.mixins.ContentImageMixin.getImageUrl.apply(this, arguments);
      },
    },
    rules: {},
  };
});
