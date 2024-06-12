/* Объявление модуля с именем UsrSomeModule. Модуль не имеет никаких зависимостей, поэтому в качестве второго параметра передается пустой массив. */
define("UsrSomeModule", [], function () {
  Ext.define("Terrasoft.configuration.UsrSomeModule", {
    alternateClassName: "Terrasoft.UsrSomeModule",
    extend: "Terrasoft.BaseModule",
    Ext: null,
    sandbox: null,
    Terrasoft: null,
    messages: {
      MessageToSubscribe: {
        mode: Terrasoft.MessageMode.PTP,
        direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
      },
      MessageToPublish: {
        mode: Terrasoft.MessageMode.BROADCAST,
        direction: Terrasoft.MessageDirectionType.PUBLISH,
      },
    },

    init: function () {
      this.callParent(arguments);
      /* Регистрирует коллекцию сообщений. */
      this.sandbox.registerMessages(this.messages);
      this.processMessages();
    },
    processMessages: function () {
      this.sandbox.subscribe(
        "MessageToSubscribe",
        this.onMessageSubscribe,
        this,
        ["resultTag"]
      );
      this.sandbox.publish("MessageToPublish", null, [this.sandbox.id]);
    },
    onMessageSubscribe: function (args) {
      console.log("'MessageToSubscribe' received");
      /* Изменяет параметр. */
      args.arg1 = 15;
      args.arg2 = "new arg2";
      /* Возвращает результат. */
      return args;
    },
    destroy: function () {
      if (this.messages) {
        var messages = this.Terrasoft.keys(this.messages);
        /* Отменяет регистрацию массива сообщений. */
        this.sandbox.unRegisterMessages(messages);
      }
      this.callParent(arguments);
    },
  });
  return Terrasoft.UsrSomeModule;
});

//http://myserver.com/0/NUI/ViewModule.aspx#UsrSomeModule
