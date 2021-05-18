var dp = new DayPilot.Calendar("dp", {
    viewType: "Week",
    cellHeight: 20,
    showAllDayEvents: true,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: function(args) {
        DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(modal) {
            var dp = args.control;
            dp.clearSelection();
            if (modal.canceled) {
                return;
            }
            dp.events.add(new DayPilot.Event({
                start: args.start,
                end: args.end,
                id: DayPilot.guid(),
                text: modal.result
            }));
        });
    },
    eventDeleteHandling: "Update",
    onEventDeleted: function(args) {
        this.message("Event deleted: " + args.e.text());
    },
    eventMoveHandling: "Update",
    onEventMoved: function(args) {
        this.message("Event moved: " + args.e.text());
    },
    eventResizeHandling: "Update",
    onEventResized: function(args) {
        this.message("Event resized: " + args.e.text());
    },
    eventClickHandling: "Edit",
    eventEditHandling: "Update",
    onEventEdited: function(args) {
        this.message("Event edited: " + args.e.text());
    },
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
        onLoad: function(args) {
            // if event object doesn't specify "bubbleHtml" property 
            // this onLoad handler will be called to provide the bubble HTML
            args.html = "Event details";
        }
    }),
    contextMenu: new DayPilot.Menu({
        items: [{
            text: "Delete",
            onClick: function(args) {
                var dp = args.source.calendar;
                dp.events.remove(args.source);
            }
        }]
    }),
});
dp.events.list = [{
    id: "1",
    start: DayPilot.Date.today().addHours(10),
    end: DayPilot.Date.today().addHours(12),
    text: "Event 1"
}];
dp.init();