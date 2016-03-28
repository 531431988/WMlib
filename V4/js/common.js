$(function() {
    //设置最小高度
    function resize() {
        var colmask = $('#main .colmask,#main .colright'),
            navbar = $('#navbar').height(),
            winH = $(window).height();
        colmask.css({
            'min-height': (winH - navbar) + 'px'
        });
    }
    resize();
    window.onresize = resize;

    //全选
    $('#table').on('click','#selectAll',function(e){
        var checked=$('#selectAll:checkbox').prop('checked');
        $(this).parents('.table').find('input:checkbox').prop('checked',checked);
    }).on('click','tbody input:checkbox',function(e){
        $(this).parents('.table').find('tfoot input:checked').removeAttr('checked');
    }).on('click','#del,#archive',function(e){//批量操作
        e.preventDefault();
        var _this=$(this), url=_this[0].href,checked=_this.parents('.table').find('tbody input:checked');
        var id=_this.attr('id'),t = (id=='del') ? '删除' : '归档';
        if(!checked.length){
            layer.alert('请选择要操作的数据！',{icon:0});
            return false;
        };
        layer.confirm('您确定要'+t+'吗？',{title:t+'提示',icon:3},function(){
            var ids=[];
            checked.each(function(index,ele){
                ids.push($(this).parents('tr').attr('data-id'))
            });
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data:{'uid[]':ids},
                error:function(){
                    layer.msg(t+'失败！',{icon:2});
                },
                success:function(d){
                    var p = _this.parents('.table');
                    if(d.state){
                        if(id=='del'){
                            p.find('tbody input:checked').parents('tr').remove();
                            p.find('input:checked').attr('checked',false);
                            layer.msg(t+'成功！',{icon:1});
                        }else{
                            p.find('input:checked').attr('checked',false);
                            layer.msg(t+'成功！',{icon:1},function(){
                                window.location.href='http://www.baidu.com';
                            });
                        }
                    }else{
                        layer.msg(t+'失败！',{icon:2});
                    }
                }
            });
        }); 
    }).on('click','.del',function(e){//删除
        e.preventDefault();
        var _this=$(this), url = _this.attr('href'),id=_this.parent().parent().data('id');
        layer.confirm('您确定要删除吗？',{icon:0},function(){
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data:{'uid':id},
                error:function(){
                    layer.msg('删除败！',{icon:2});
                },
                success:function(d){
                    if(d.state){
                        _this.parents('tr').remove();
                        layer.msg('删除成功！',{icon:1});
                    }else{
                        layer.msg('删除失败！',{icon:2});
                    }
                }
            });
        })  
    });
});