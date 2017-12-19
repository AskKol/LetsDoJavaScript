$(function ()
{
    C1S = {
        randomData: function (anOption)
        {
            if (anOption !=='object')
            {
                anOption = {};
            }
            anOption.selector = anOption.selector || '#content1Script';
            var $aSelector = $(anOption.selector);
            setTimeout(function ()
            {
                $aSelector.append('<br/>  I am imitating a server call... <br/>');
            }, 2000);
        }
    }
    C1S.randomData();
});