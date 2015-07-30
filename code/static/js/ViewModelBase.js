
//base class for view models, with ajax, loadingindicator and message functions
function ViewModelBase() {
    var base = this;
    base.waitingRequests = [];

    base.sortAscending = ko.observable(true);
    base.sortProperty = ko.observable("");

    base.loading = ko.observable(0);
    base.message = ko.observable("");
    base.messageType = ko.observable("");

    base.modalHeader = ko.observable("");
    base.modalBody = ko.observable("");
    base.modalButtonCancelVisible = ko.observable(true);
    base.modalButtonActionText = ko.observable("");
    base.modalButtonActionVisible = ko.observable(false);
    base.modalButtonActionFunction = function () { };

    //sets a message and message type
    //should be databound, example:
    //<div> <span data-bind="css: $root.messageType, text: $root.message"></span>&nbsp;</div>
    //currently supported types: "success", "error"
    base.setMessage = function (message, messageType) {

        base.message("");
        if (message == undefined)
            message = "";
        if (messageType == "undefined")
            messageType = "";

        base.message(message);
        base.messageType(messageType);
    };

    base.doSort = function (prop, list) {

        var currentProp = base.sortProperty();
        if (prop) //also permit to sort with current values
        {
            if (currentProp == prop) {
                //change order
                base.sortAscending(!base.sortAscending());
            } else {
                base.sortProperty(prop);
                base.sortAscending(true);
            }
        }
        currentProp = base.sortProperty();

        var sortArg1 = 1;
        var sortArg2 = -1;

        if (!base.sortAscending()) {
            sortArg1 = -1;
            sortArg2 = 1;
        }

        var prepareProperty = function (cprop) {
            return ko.utils.unwrapObservable(cprop).toString().toLowerCase();
        }

        var sortFunc = function (l, r) { return prepareProperty(l[currentProp]) > prepareProperty(r[currentProp]) ? sortArg1 : sortArg2; };

        list.sort(sortFunc);
    }

    //sets an empty message
    base.clearMessage = function () {
        base.setMessage("", "");
    };

    base.queueFunc = function (f) {

        if (base.loading() == 0) {
            f();
        }
        else {
            base.waitingRequests.push(f);
        }
    }

    //updates loading status
    //should be databound to loading indicator, example:
    //<img src="loading.gif" data-bind="visible:loading()>0">
    base.updateLoading = function (val) {
        var newval = base.loading() + val;
        base.loading(newval);

        if (newval == 0 && base.waitingRequests.length > 0) {
            var f = base.waitingRequests.pop();
            f();
        }
    };

    //performs an ajaxPost request, and also updates loading status
    base.ajaxPost = function (url, dataIn, successfunc, errorfunc, completefunc) {
        base.updateLoading(1);
        $.ajax({
            type: "POST",
            url: url,
            //dataType: 'json', should be autodetected since empty response is considered failed if dataType is specified.
            contentType: 'application/json',
            data: ko.mapping.toJSON(dataIn),
            cache: false,
            async: true,
            success: function (data) {
                if (successfunc != undefined) {
                    successfunc(data);
                }
            },
            error: function (data) {
                if (errorfunc != undefined) {
                    errorfunc(data);
                }
            },
            complete: function (data) {
                base.updateLoading(-1);
                if (completefunc != undefined) {
                    completefunc(data);
                }
            }
        });
    };

    //performs an ajaxGet request, and also updates loading status
    base.ajaxGet = function (url, successfunc, errorfunc, completefunc) {
        base.updateLoading(1);
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            async: true,
            success: function (data) {
                if (successfunc != undefined) {
                    successfunc(data);
                }
            },
            error: function (data) {
                if (errorfunc != undefined) {
                    errorfunc(data);
                }
            },
            complete: function (data) {
                base.updateLoading(-1);
                if (completefunc != undefined) {
                    completefunc(data);
                }
            }
        });
    };

    /* configure and show a modal from an options object.
     * example object:
     *  var modalConfig = {           
            header: "Bekräfta borttagning",
            body: "Är du säker på att du vill ta bort frågan <i>" +q.q+"</i>",
            actionButtonVisible: true,
            actionButtonText: "Ta bort",
            actionButtonFunc: function () { self.doRemoveQuestion(q.id); },
            openModal: true
        };
     * 
     *  view found in:
     *  Areas/Admin/Views/Shared/GenericModal.ascx
     */
    base.configureModal = function (modal) {
        base.modalHeader(modal.header);
        base.modalBody(modal.body);
        base.modalButtonActionFunction = modal.actionButtonFunc;
        base.modalButtonActionVisible(modal.actionButtonVisible);
        base.modalButtonActionVisible(modal.actionButtonVisible);
        base.modalButtonActionText(modal.actionButtonText);

        if (modal.cancelButtonVisible != undefined) {
            base.modalButtonCancelVisible(modal.cancelButtonVisible);
        }
        else {
            base.modalButtonCancelVisible(true);
        }

        if (!modal.identifier) //set default
            modal.identifier = "#confirmModal";

        if (modal.openModal) {
            base.openModal(modal.identifier);
        }
    };

    //helpfunction för opening modal
    base.openModal = function (modalIdentifier) {
        $(modalIdentifier).modal('show');
    };

    //helpfunction för closing modal
    base.closeModal = function (modalIdentifier) {
        $(modalIdentifier).modal('hide');
    };

}