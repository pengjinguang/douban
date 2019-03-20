


// var content1 = [
//     {
//         img: './tab/image/009.png',
//         name: 'Phigma',
//         classify: '世界音乐 World',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/010.png',
//         name: 'AirS',
//         classify: '流行 Pop',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/011.png',
//         name: 'DVC',
//         classify: '说唱 Rap',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/012.png',
//         name: '地磁卡',
//         classify: '说唱 Rap',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/013.png',
//         name: '痛仰',
//         classify: '摇滚 Rock',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/014.png',
//         name: 'Late Troubles',
//         classify: '电子 Electronica',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/015.png',
//         name: '梦的雅朵',
//         classify: '流行 Pop',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/016.png',
//         name: 'The Twenties乐队',
//         classify: '摇滚 Rock',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     }
// ];
// var content2 = [
//     {
//         img: './tab/image/017.png',
//         name: 'Soil terrapin',
//         classify: '说唱 Rap',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/018.png',
//         name: '鞭子情人',
//         classify: '民谣 Folk',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/019.png',
//         name: 'Ascension Music Group',
//         classify: '说唱 Rap',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/020.png',
//         name: '包小静',
//         classify: '说唱 Rap',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/021.png',
//         name: '德宏老爹',
//         classify: '说唱 Rap',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/022.png',
//         name: '罗艺恒',
//         classify: '流行 Pop',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/023.png',
//         name: '英伦盒子',
//         classify: '民谣 Folk',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     },{
//         img: './tab/image/024.png',
//         name: '李蔓',
//         classify: '流行 Pop',
//         decoration: ['无名', '你和我', '手拿鲜花的男人', '冰的世界']

//     }
// ];



function addDom(conBox, arr) {
    var strHtml = '';
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        strHtml += '<div class="box"><div class="imgBox">\
    <img src="'+ arr[i].img + '" alt="">\
    </div><div class="con"><a href="#" class="name">'+ arr[i].name + '</a>\
    <span href="#">'+ arr[i].classify + '</span></div></div>'
    }
    conBox.html(strHtml);
    return conBox;


}
var div1 = addDom($('<div class="conBox"></div>'), content1);
var div2 = addDom($('<div class="conBox"></div>'), content2);

// input
function bindEvent(){
    $('#inputWrap input').on('input', function(){
        var val = $(this).val();
        console.log(val)
        // console.log(val);
        getData(val);
    });
    $('#search_suggest').on('mouseleave',function(){
        $(this).css('display','none');
    })
};
bindEvent();

function getData(value){
    $.ajax({
        type:'GET',
        dataType:'jsonp',
        url:'https://api.douban.com/v2/music/search?q='+ value +'&count=7',
        // data:{'q':value,}
        // success:function(data){
        //     console.log(data.musics);
        // },
        success:addItem,
        error:function(){
            alert('error')
        }
    });
};
function addItem(data){
    var dataList = data.musics;
    console.log(dataList);
    var $list = $('.search-list');
    $('#search_suggest').css('display','block');
    var str = '';
    dataList.forEach(function(ele,index){
        var src = ele.image;
        var reg = /https:\/\//;
        src = src.replace(reg,'https://images.weserv.nl/?url=');
       str += '  <li><a href="'+ele.alt+'"><img src="'+ src +'" alt="">\
           <div><em>'+ele.title+'</em><p>'+ ele.author[0].name +'</p></div>\
       </a></li>' 
    });
    $list.html(str);
}