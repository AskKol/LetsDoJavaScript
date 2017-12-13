$(function ()
{
    _AEH = {
        internalObject: { records: [], maxCount: 5 },// remember that for this to be used by the trigger method
        //it has to be either an array or an object
        notifyObject: { nodeName: 'INTERNAL' },
        holder:'undefined',
        showEventMessage: function (options)
        {
            options = $.extend({
                eventType: 'CLICK',
                eventTarget: this,
                suffix: '<br/>'
            }, options);
            let message = options.eventType + ': ' + (options.eventTarget.nodeName || 'unknown') + options.suffix;
            $('#messages').append(message);
        },

        namedHandler: function (event)
        {
            if (!event.isPropagationStopped() &&
                !event.isImmediatePropagationStopped() &&
                !event.isDefaultPrevented()
            )
            {
                _AEH.showEventMessage.call(this, { eventType: 'namedhandler ' + event.type });
                event.stopPropagation();
            }
        },


        loadRecord: function(aData)
        {
           
            _AEH.internalObject = $.extend(_AEH.internalObject, (aData || { maxCount: 6 })); // try and always look up 
            //$.extend documentation to see the options u have.


            var id = _AEH.internalObject.records.length;
            if (id < _AEH.internalObject.maxCount)
            {
                _AEH.internalObject.records.push(
                    {
                        'description': 'Record id ' + id,
                        value: Math.floor(Math.random() * 5000)
                    });
                setTimeout(_AEH.loadRecord, Math.floor(Math.random() * 1000));
            }
            else
                $(_AEH.notifyObject).trigger('recordsloaded.AEH', _AEH.internalObject);
        }

    }

    $('.clickable')
        .on('click',  function (event)
        {
            var theMaxCount = { maxCount: 10 };
            let $this = $(this);
            let clickCount = ($this.data('clickCountHolder') || 0) + 1;
            $this.data('clickCountHolder', clickCount);
            _AEH.showEventMessage.call(this, { eventType: ' ' + clickCount + ') ' + event.type });
            if (clickCount === 3)
            {
                $this.trigger('click3');
            }

            if ($this.attr('type') === 'button')
            {
                _AEH.loadRecord.call(this,theMaxCount);
            }

        })
        .on('click3', function (event)
        {
            event.stopPropagation();
            _AEH.showEventMessage.call(this, { eventType: event.type });
            $(this).addClass('highlight');
        });

    $(_AEH.notifyObject)
        .on('recordsloaded.AEH', function (event, theObject)
        {
            _AEH.showEventMessage.call(this, { eventType: event.type });
            $.each(theObject.records, function ()
            {
                $('#messages').append(' -- ' +
                    this.description + ': ' + this.value + '<br/>');
            });
        });
});