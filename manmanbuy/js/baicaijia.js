$(function () {

    $('.top').on('tap',function(){
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1000);
    })

    // 调用区域滚动的初始化
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        scrollX: true, //是否横向滚动
    });

    


    var mmb = new MMB();
    var id = 0;
    mmb.getBaiCaiJiaTitle();
    mmb.getBaiCaiJiaProduct(id);

    // 默认加载id=0的商品，上拉刷新i++，如果id不为0，不上拉刷新



    // 点击导航获取id
    $('.nav-title').on('tap', 'a', function () {
        var titleId = $(this).data('id');
        id = titleId;
        mmb.getBaiCaiJiaProduct(id);
        // if (id != 0) {
        //     mui.init({
        //         pullRefresh: {
        //             container: "#refreshContainer",
        //             up: {
        //                 height: 50, //可选.默认50.触发上拉加载拖动距离
        //                 // contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        //                 // contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        //                 callback: function () {
        //                     id++;
        //                     console.log(id);
        //                     $.ajax({
        //                         url: mmb.baseURL + 'api/getbaicaijiaproduct',
        //                         data: {
        //                             titleid: id
        //                         },
        //                         success: function (obj) {

        //                             console.log(id);
        //                             var html = template('productTpl', obj);
        //                             $('.product').append(html);
        //                             mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
        //                         }
        //                     })
        //                 } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        //             }
        //         }
        //     });
        // }
    })

    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                // contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                // contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    id++;
                    console.log(id);
                    $.ajax({
                        url: mmb.baseURL + 'api/getbaicaijiaproduct',
                        data: {
                            titleid: id
                        },
                        success: function (obj) {

                            console.log(obj);
                            var html = template('productTpl', obj);
                            $('.product').append(html);
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                        }
                    })
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    

})

var MMB = function () {

}

MMB.prototype = {
    baseURL: 'http://localhost:9090/',

    getBaiCaiJiaTitle: function () {
        var that = this;
        $.ajax({
            url: that.baseURL + 'api/getbaicaijiatitle',
            success: function (obj) {
                console.log(obj);
                var html = template('titleTpl', obj);
                $('.nav-title').html(html);
            }
        })
    },

    getBaiCaiJiaProduct: function (id) {
        var that = this;
        $.ajax({
            url: that.baseURL + 'api/getbaicaijiaproduct',
            data: {
                titleid: id
            },
            success: function (obj) {

                console.log(obj);
                var html = template('productTpl', obj);
                $('.product').html(html);
            }
        })
    }
}