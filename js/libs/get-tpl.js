var getTpl = (function () {
    "use strict";
    let cache = {};
    var getCache = function (templateId) {
        return cache[templateId];
    };
    var setCache = function (templateId, html) {
        cache[templateId] = html;
    };

    /**
     *
     * @param {Object} data formed object that match in template {foo:'bar'} will replace {{foo}} with bar
     * @param {String} templateId HTML attribute id
     * @returns {string} HTMl template transformed
     */
    var gettpl = function (data, templateId) {
        let templateHTML = getCache(templateId);
        if (getCache(templateId)) {
            templateHTML = getCache(templateId);
        }
        else {
            let tpl = document.getElementById(templateId);
            if (!tpl) {
                pm.debug && console.error('tpl id "' + templateId + '" not found');
                return;
            }
            templateHTML = tpl.innerHTML;
            setCache(templateId, templateHTML);
        }
        //
        return templateHTML.replace(/{{([^}]*)}}/g, function (search, result) {
            return data[result];
        });
    };
    return gettpl;

})();
export default getTpl;