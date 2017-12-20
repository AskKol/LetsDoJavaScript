$(function ()
{
    var showMessage = function (options)
    {
        if (typeof options !== 'object')
            options = { message: 'Parameter not an object', error: true };
        options.message = options.message || 'No message specified';
        options.error = options.error || false;
        $('#messages')
            .append(options.error ? 'Error: ' : '')
            .append(options.message)
            .append('<br />');
    },
    loadSection = function (options)
    {
        var defer = $.Deferred(),
        $div, msg;

        if (typeof options !== 'object')
        {
            msg = 'Expecting parameter object';
            showMessage({ message: msg, error: true });
            return defer.resolve({ statusText: msg });
        }

        options.selector = options.selector || '';
        options.url = options.url || '';
        options.dynamic = options.dynamic || false;

        if (options.url === '')
        {
            msg = 'Missing URL';
            showMessage({ message: msg, error: true });
            return defer.resolve({ statusText: msg });
        }

        $div = $(options.selector)
        if ($div.length > 0)
        {
            $.get(options.url, function () { }, 'html')
            .done(function (result)
            {
                $div.html(result);
                if (!options.dynamic)
                {
                    defer.resolve();
                }
            })
            .fail(function (result)
            {
                msg = 'Could not load URL: ' + options.url;
                showMessage({ message: msg, error: true });
                defer.resolve(result);
            });
            if (options.dynamic)
                $div.off('complete,failure')
                    .on('complete', function (event)
                    {
                        msg = 'Dynamic content: I ran';
                        showMessage({ message: msg, error: false });
                        defer.resolve();
                    })
                    .on('failure', function (event, result)
                    {
                        msg = 'Dynamic content: ' + result.statusText;
                        showMessage({ message: msg, error: true });
                        defer.resolve(result);
                    });
        }
        else
        {
            msg = 'Error in selector';
            showMessage({ message: msg, error: true });
            defer.resolve({ statusText: msg });
        }

        return defer.promise();
    }




    $('#load').click(function ()
    {
        $.when(
            showMessage({ message: 'Starting processing' }),
            loadSection({selector: '#section1', url: 'content/content1.html',dynamic: false}),
            loadSection({ selector: '#section2', url: 'content/content2.html',dynamic: false}),
            loadSection({selector: '#section3', url: 'content/content4.html', dynamic: true}),
            showMessage({ message: 'Done with processing' })
            //loadSection(),
            //loadSection({}),
            //loadSection({ selector: '#section4', url: 'content/content1.html' })
        )
        .done(function ()
        {
        })
        .fail(function (result)
        {
            $('#messages').append('Failure!<br />')
            .append('Result:' + result.statusText + '<br />');
        })
        .always(function ()
        {
            $('#proceed').removeAttr('disabled');
        });
    });
});


//$(function ()
//{
//    var loadSection = function (options)
//    {
//        var defer = $.Deferred();
//        var $div;
//        if (typeof options !== 'object')
//        {
//            return defer.reject({ statusText: 'Expecting paramter object' });
//        }

//        options.selector = options.selector || '';
//        options.url = options.url || '';

//        if (options.url === '')
//        {
//            return defer.reject({ statusText: 'Missing URL' });
//        }
//        $div = $(options.selector);
//        if ($div.length > 0)
//        {
//            $div.load(options.url, function ()
//            {
//                defer.resolve();
//            });
//        }
//        else
//        {
//            defer.resolve({ statusText: 'Error in selector' });
//        }
//        return defer;

//    }

//    $('#load').click(function ()
//    {

//        $.when(
//            loadSection({ selector: '#section1', url: 'content/content4.html' }),
//            loadSection({ selector: '#section2', url: 'content/content2.html' }),
//            loadSection({ selector: '#section3', url: 'content/content3.html' }),
//            loadSection()
//        )
//            .promise()
//            .fail(function (result)
//            {
//                $('#messages').append('Failure!<br/>')
//                    .append('Result:' + result.statusText + '<br/>');
//            })
//            .always(function ()
//            {
//                $('#proceed').removeAttr('disabled');
//            });


//    });

//});