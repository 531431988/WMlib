/**
 * Created by ZJT on 2016/3/15.
 */
//�ļ��ϴ�
// ��ʼ��Web Uploader
var uploader = WebUploader.create({

    // ѡ���ļ����Ƿ��Զ��ϴ���
    auto: true,
    threads:true,
    // swf�ļ�·��
    swf: '/js/Uploader.swf',
    // �ļ����շ���ˡ�
    server: '',
    // �ڲ����ݵ�ǰ�����Ǵ�����������inputԪ�أ�Ҳ������flash.
    pick: '#filePicker',
    // ֻ�����ϴ�word�ļ���
    accept: {
        title: 'application',
        extensions: 'xls,xlsx,doc,docx,txt,pdf,zip',
        mimeTypes: 'application/'
    },
    //���ƴ�С����
    fileNumLimit: 30,
    fileSizeLimit: 20 * 1024 * 1024,    // 20 M
});
// �����ļ���ӽ�����ʱ��
uploader.on( 'fileQueued', function( file ) {
    $('#fileList').append( '<div id="' + file.id + '" class="">' + '<p class="t-gray">' + file.name + '</p>' + '</div>' );
});
// �ļ��ϴ�ʧ�ܣ���ʾ�ϴ�����
uploader.on( 'uploadError', function( file ) {
    var $li = $( '#'+file.id ),
        $error = $li.find('div.error');

    // �����ظ�����
    if ( !$error.length ) {
        $error = $('<div class="error"></div>').appendTo( $li );
    }

    $error.text('�ϴ�ʧ��');
});

// ����ϴ����ˣ��ɹ�����ʧ�ܣ���ɾ����������
uploader.on( 'uploadComplete', function( file ) {
    $( '#'+file.id ).find('.progress').remove();
});
