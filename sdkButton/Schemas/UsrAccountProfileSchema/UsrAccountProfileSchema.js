/* В качестве зависимостей укажите миксин ProfileSchemaMixin. */
define("UsrAccountProfileSchema", ["ProfileSchemaMixin"], function () {
  return {
    /* Название схемы объекта. */
    entitySchemaName: "Account",
    /* Миксины. */
    mixins: {
      /* Миксин, который содержит функции для получения иконок и картинок профиля. */
      ProfileSchemaMixin: "Terrasoft.ProfileSchemaMixin",
    },
    /* Массив модификаций diff. */
    diff: /**SCHEMA_DIFF*/ [
      {
        /* Операция добавления. */
        operation: "insert",
        /* Имя сущности. */
        name: "Contact",
        /* Имя родительского элемента, в который выполняется вставка. */
        parentName: "ProfileContentContainer",
        /* Свойство элемента родителя, с которым выполняется операция. */
        propertyName: "items",
        /* Значение добавляемого элемента. */
        values: {
          /* Привязка к значению свойства Account объекта Contact. */
          bindTo: "Account",
          /* Конфигурация разметки. Позиционирование элемента. */
          layout: {
            column: 3,
            row: 10,
            colSpan: 19,
          },
        },
      },
      /* Другие конфигурационные объекты массива модификаций. */
    ] /**SCHEMA_DIFF*/,
  };
});
