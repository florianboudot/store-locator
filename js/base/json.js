//until
export var jsonendpoint = {
    suggest: {
        url: 'services/suggest.json',
        method: 'get',
        limit: {
            m: {
                nk: 3,
                ncp: 3,
                npp: 3
            },
            d: {
                nk: 9,
                ncp: 4,
                npp: 4
            }
        }
    },
    history: {
        url: 'services/history.json',
        method: 'get'
    },
    wishlistdetail: {
        url: 'services/wishlist/detail.json',
        method: 'get'
    },
    wishlistexport: {
        url: 'services/wishlist/export.json',
        method: 'get'
    },
    wishlistimport: {
        url: 'services/wishlist/to_json.json',
        method: 'post'  ,
        contentType: false,
        processData: false
    },
    wishlistprint: {
        url: 'services/wishlist/print.json',
        method: 'get'
    },
    wishlisttechfile: {
        url: 'services/wishlist/technical_file.json',
        method: 'get'
    }
};

