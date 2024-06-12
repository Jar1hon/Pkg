namespace Terrasoft.Core.Process.Configuration
{

    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Globalization;
    using Terrasoft.Common;
    using Terrasoft.Core;
    using Terrasoft.Core.Configuration;
    using Terrasoft.Core.DB;
    using Terrasoft.Core.Entities;
    using Terrasoft.Core.Process;
    using Terrasoft.UI.WebControls.Controls;

    /* Для работы логирования. */
    using global::Common.Logging;

    /* Для работы инструментов отправки сообщений. */
    using Terrasoft.Configuration;

    #region Class: UsrShowModalPageUserTask

    /// <exclude/>
    public partial class UsrShowModalPageUserTask
    {
        /* Настройка логирования.
        Создание отдельного логгера. Результаты логирования записываются в файл Common.log. */
        private static readonly ILog _log = LogManager.GetLogger("UsrShowModalPageUserTask");

        /* Опредение отправителя со стороны back-end. */
        private const string MessageSender = "UsrShowModalPageUserTask";

        #region Methods: Protected

        /* Бизнес-логика действия процесса. */
        protected override bool InternalExecute(ProcessExecutingContext context) {

            /* Вывод информационного сообщения в логи. */
            _log.InfoFormat("UserTask works well. UsrDialogText = {0}, UsrCommaSeparatedReturnCodes = {1}", UsrDialogText, UsrCommaSeparatedReturnCodes);
            /* Формирование сообщения. */
            var messageData = new
            {
                /* Текст в диалоговом окне. */
                UsrDialogText = UsrDialogText,
                /* Коды возврата кнопок через запятую. */
                UsrCommaSeparatedReturnCodes = UsrCommaSeparatedReturnCodes,
                /* Служебный параметр. Уникальный идентификатор экземпляра элемента внутри экземпляра процесса. */
                procElUId = UId
            };
            /* Сериализация объекта тела сообщения. */
            string messageBody = JsonConvert.SerializeObject(messageData);
            /* Тело сообщения, которое отправляется из back-end во front-end часть. */
            MsgChannelUtilities.PostMessage(UserConnection, MessageSender, messageBody);
            return false;
        }

        #endregion

        #region Methods: Public

        public override bool CompleteExecuting(params object[] parameters) {
            return base.CompleteExecuting(parameters);
        }

        public override void CancelExecuting(params object[] parameters) {
            base.CancelExecuting(parameters);
        }

        public override string GetExecutionData() {
            return string.Empty;
        }

        public override ProcessElementNotification GetNotificationData() {
            return base.GetNotificationData();
        }

        #endregion

    }

    #endregion

}