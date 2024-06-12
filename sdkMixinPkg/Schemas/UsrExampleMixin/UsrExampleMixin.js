/* Определение модуля. */
define("ContentImageMixin", [ContentImageMixinV2Resources], function () {
  /* Определение класса ContentImageMixin. */
  Ext.define("Terrasoft.configuration.mixins.ContentImageMixin", {
    /* Псевдоним (сокращенное название класса). */
    alternateClassName: "Terrasoft.ContentImageMixin",
    /* Функциональность миксина. */
    getImageUrl: function () {
      var primaryImageColumnValue = this.get(this.primaryImageColumnName);
      if (primaryImageColumnValue) {
        return this.getSchemaImageUrl(primaryImageColumnValue);
      } else {
        var defImageResource = this.getDefaultImageResource();
        return this.Terrasoft.ImageUrlBuilder.getUrl(defImageResource);
      }
    },
  });
  return Ext.create(Terrasoft.ContentImageMixin);
});
