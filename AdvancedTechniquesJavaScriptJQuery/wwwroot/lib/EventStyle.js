$(function ()
{
    _AEH = {
        showEvenMessage: function (options)
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
                _AEH.showEvenMessage.call(this, { eventType: 'namedhandler ' + event.type });
                event.stopPropagation();
            }
        }
    }

    //$('.clickable').click(function ()
    //{
    //    _AEH.showEvenMessage.call(this);
    //    //the code below does exactly the same thing as the code just above it.
    //    _AEH.showEvenMessage({eventTarget:this});
    //    let today = new Date();
    //    let todaysDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    //    let todaysTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //    $('#messages').append('click occurred on ' +todaysDate +' at '+ todaysTime+ '.<br/>');

    //});

    // this prevents selection of text on the whole page
    $('body')
       .off('click')// note using off() removes all event
        .on('click.demo dblclick.demo mousedown.demo', function(event)
        {
            _AEH.showEvenMessage.call(this, { eventType:'demo ' + event.type });
        })
        .on('mousedown', function (event)
        {
            event.preventDefault();// stops the default behaviour
            event.stopPropagation(); // prevents the event method from bubbling up the dom
            event.stopImmediatePropagation(); // without this the second .mousedown() event
            //would have still occurred since it was not a parent element
            return false;// in some browsers this may do the same thing as
            // event.preventDefault() & event.stopPropagation() combined.
            //but as standards say an event should not return anything this may not follow industry standards.
        })
        .on('mousedown', function (event)
        {
            _AEH.showEvenMessage(this, { eventType: event.type });
        }).off('mousedown.demo');
    //event chaining
    $('.clickable')
        .on('click dblclick', _AEH.namedHandler)
        .on('click.eventHandling dblclick.eventHandling', _AEH.namedHandler)
        .on('click.eventHandling dblclick.eventHandling mousedown.eventHandling', function (event)
        {
            if (!event.isPropagationStopped() &&
                !event.isImmediatePropagationStopped() &&
                !event.isDefaultPrevented()
            )
            {
                _AEH.showEvenMessage.call(this, { eventType: event.type });
                event.stopPropagation();

                if (event.type === 'mousedown')
                {
                    event.preventDefault();
                }
            }
        }).on('mousedown.eventHandling', function (event)
        {
            if (!event.isPropagationStopped() &&
                !event.isImmediatePropagationStopped() &&
                !event.isDefaultPrevented()
            )
            {
                _AEH.showEvenMessage.call(this, { eventType: event.type, suffix: '#2<br/>' });
            }

            //return false; // note that this may not stop item from being selected in internet explorer
        }).on('selectstart.eventHandling', function (event) // this is so internet explorer 9 and below stops selection of text 
        //or in this case stops selection of text on elements that have the cliable class.
        {
            return false;
        })
        .off('click.eventHandling', _AEH.namedHandler);  //.off('.eventHandling') will turn of the event for all with the eventHandling namespace
});