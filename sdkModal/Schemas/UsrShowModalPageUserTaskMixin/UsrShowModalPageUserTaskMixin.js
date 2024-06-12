define("UsrShowModalPageUserTaskMixin", [], function () {
  Ext.define("Terrasoft.configuration.mixins.ShowModalPageUserTaskMixin", {
    alternateClassName: "Terrasoft.ShowModalPageUserTaskMixin",

    /* Подписаться на сообщения канала WebSocket. */
    UsrSubscribeForShowModalWindowServerChannelMessages: function () {
      this.Terrasoft.ServerChannel.on(
        this.Terrasoft.EventName.ON_MESSAGE,
        this.UsrServerChannelMessageHandler,
        this
      );
    },
    /* Отписаться от сообщений канала WebSocket. */
    UsrUnsubscribeForShowModalWindowServerChannelMessages: function () {
      this.Terrasoft.ServerChannel.un(
        this.Terrasoft.EventName.ON_MESSAGE,
        this.UsrServerChannelMessageHandler,
        this
      );
    },

    UsrShowModalPageUserTask_procElUId: "",

    /* Функция, которая обрабатывает WebSocket сообщения. */
    UsrServerChannelMessageHandler: function (scope, message) {
      if (!message) {
        return;
      }
      /* Определение сообщения от отправителя UsrShowModalPageUserTask. */
      if (
        message.Header &&
        message.Header.Sender !== "UsrShowModalPageUserTask"
      ) {
        return;
      }
      if (message.Body) {
        var bodyData = this.Ext.decode(message.Body);
        var UsrDialogText = bodyData.UsrDialogText;
        var UsrCommaSeparatedReturnCodes =
          bodyData.UsrCommaSeparatedReturnCodes;

        /* Получение и сохранение кодов кнопок в виде массива. */
        var returnCodesArray = UsrCommaSeparatedReturnCodes.split(",");
        var procElUId = bodyData.procElUId;
        UsrShowModalPageUserTask_procElUId = procElUId;

        /* Отобразить диалоговое окно. */
        this.showConfirmationDialog(
          UsrDialogText,
          this.UsrGetConfirmationResult,
          returnCodesArray
        );
      }
    },
    /* Обработка результата выбора кода кнопки. */
    UsrGetConfirmationResult: function (returnCode) {
      this.console.log(
        "UsrGetConfirmationResult: returnCode = " +
          returnCode +
          " UsrShowModalPageUserTask_procElUId = " +
          UsrShowModalPageUserTask_procElUId
      );

      var procElUId = UsrShowModalPageUserTask_procElUId;

      /* Создание POST-запроса. */
      this.Terrasoft.AjaxProvider.request({
        url:
          "../ServiceModel/ProcessEngineService.svc/" +
          procElUId +
          "/CompleteExecution" +
          "?UsrReturnCode=" +
          returnCode,
        method: "POST",
        scope: this,
        callback: function (request, suсcess, response) {},
      });
    },
  });
});
