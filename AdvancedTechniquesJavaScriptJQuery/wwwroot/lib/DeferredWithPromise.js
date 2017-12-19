$(function ()
{
    var loadSection = function (options)
    {
        if (typeof options !== 'object')
        {
            options = {};
        }
        options.selector = options.selector || '';
        options.url = options.url || '';
        return $.get(options.url, function (result)
        {
            $(options.selector).html(result);
        }, 'html');

    }


    $('#load').click(function ()
    {
        
        var myDefer=$.when(
            loadSection({ selector: '#section1', url: 'content/content11.html' }),
            loadSection({ selector: '#section2', url: 'content/content2.html' }),
            loadSection({ selector: '#section3', url: 'content/content3.html' })
        )
            .promise()
            .done(function ()
            {
                $('#messages').append('<br/> All content loaded successfully!');
            })
            .fail(function (result)
            {
                $('#messages').append('Failure!<br/>')
                    .append('Result:' + result.statusText + '<br/>');
            })
            .always(function ()
            {
                $('#proceed').removeAttr('disabled');
            });

        myDefer.done(function ()
        {
            $('#messages').append('Additional done handler called! <br/>');
        });

        //$.when(
        //    loadSection({ selector: '#section1', url: 'content/content11.html' }),
        //    loadSection({ selector: '#section2', url: 'content/content2.html' }),
        //    loadSection({ selector: '#section3', url: 'content/content3.html' })
        //)
        //    .promise()
        //    .done(function ()
        //    {
        //        $('#messages').append('<br/> All content loaded successfully!');
        //    })
        //    .fail(function (result)
        //    {
        //        $('#messages').append('Failure!<br/>')
        //            .append('Result:' + result.statusText + '<br/>');
        //    })
        //    .always(function ()
        //    {
        //        $('#proceed').removeAttr('disabled');
        //    });


    });

});