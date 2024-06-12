define("MainHeaderSchema", ["UsrShowModalPageUserTaskMixin"], function () {
  return {
    mixins: {
      ShowModalPageUserTaskMixin: "Terrasoft.ShowModalPageUserTaskMixin",
    },
    methods: {
      init: function () {
        this.callParent(arguments);
        this.UsrSubscribeForShowModalWindowServerChannelMessages();
      },
      destroy: function () {
        this.callParent(arguments);
        this.UsrUnsubscribeForShowModalWindowServerChannelMessages();
      },
    },
  };
});
