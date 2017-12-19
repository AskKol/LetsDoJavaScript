$(function ()
{
    var loadSection = function (options)
    {
        var defer = $.Deferred();
        var $div;
        if (typeof options !== 'object')
        {
            return defer.reject({ statusText: 'Expecting paramter object' });
        }

        options.selector = options.selector || '';
        options.url = options.url || '';

        if (options.url === '')
        {
            return defer.reject({ statusText: 'Missing URL' });
        }
        $div = $(options.selector);
        if ($div.length>0)
        {
            $div.load(options.url, function ()
            {
                defer.resolve();
            });
        }
        else
        {
            defer.reject({ statusText: 'Error in selector' });
        }
        return defer;

    }

    $('#load').click(function ()
    {
       
        $.when(
            loadSection({ selector: '#section1', url: 'content/content4.html' }),
            loadSection({ selector: '#section2', url: 'content/content2.html' }),
            loadSection({ selector: '#section3', url: 'content/content3.html' }),
            loadSection()
        )
           .promise()
            .fail(function (result)
            {
                $('#messages').append('Failure!<br/>')
                    .append('Result:' + result.statusText + '<br/>');
            })
            .always(function ()
            {
                    $('#proceed').removeAttr('disabled');
            });


    });

});