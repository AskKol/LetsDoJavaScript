$(function ()
{
    var loadSection = function (options)
    {
        if (typeof options !== 'object')
        {
            options = {};
            options.selector = options.selector || '';
            options.url = options.url || '';
            return $.get(options.url, function (result)
            {
                $(options.selector).html(result);
            }, 'html');
        }
    }
    $('#load').click(function ()
    {
        //If you have the content section disabled in the startup.cs file 
        //you can use the lines below to load the content 
        //$('#section1').load('../webpages/Content/content1.html', function ()
        //{
        //    $('#proceed').removeAttr('disabled');
        //});


        //the kinda way people do things now though not the best way
        //$('#section1').load('content/content1.html');
        //$('#section2').load('content/content2.html');
        //$('#section3').load('content/content1.html', function ()
        //{
        //    $('#proceed').removeAttr('disabled');
        //});
    });

    $('#load').click(function ()
    {
        $.when(

            $.get('content/content1.html', function (result)
            {
                $('#section1').html(result);
            }, 'html'),
            $.get('content/content2.html', function (result)
            {
                $('#section2').html(result);
            }, 'html'),
            $.get('content/content3.html', function (result)
            {
                $('#section3').html(result);
            }, 'html')
        )
            .then(function ()
            {
                $('#proceed').removeAttr('disabled');
            });
    });

});