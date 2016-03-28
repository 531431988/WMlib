/**
 * Created by ZJT on 2016/3/15.
 */
//文件上传
// 初始化Web Uploader
var uploader = WebUploader.create({

    // 选完文件后，是否自动上传。
    auto: true,
    threads:true,
    // swf文件路径
    swf: '/js/Uploader.swf',
    // 文件接收服务端。
    server: '',
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#filePicker',
    // 只允许上传word文件。
    accept: {
        title: 'application',
        extensions: 'xls,xlsx,doc,docx,txt,pdf,zip',
        mimeTypes: 'application/'
    },
    //限制大小个数
    fileNumLimit: 30,
    fileSizeLimit: 20 * 1024 * 1024,    // 20 M
});
// 当有文件添加进来的时候
uploader.on( 'fileQueued', function( file ) {
    $('#fileList').append( '<div id="' + file.id + '" class="">' + '<p class="t-gray">' + file.name + '</p>' + '</div>' );
});
// 文件上传失败，显示上传出错。
uploader.on( 'uploadError', function( file ) {
    var $li = $( '#'+file.id ),
        $error = $li.find('div.error');

    // 避免重复创建
    if ( !$error.length ) {
        $error = $('<div class="error"></div>').appendTo( $li );
    }

    $error.text('上传失败');
});

// 完成上传完了，成功或者失败，先删除进度条。
uploader.on( 'uploadComplete', function( file ) {
    $( '#'+file.id ).find('.progress').remove();
});
