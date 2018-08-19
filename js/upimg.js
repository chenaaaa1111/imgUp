var ImgUpLib={
    elem:' <div class="card">\n' +
    '                                <div class="img-box full">\n' +
    '                                    <section class="img-section">\n' +
    '                                        <!-- \t\t\t\t\t\t<p class="up-p">作品图片：<span class="up-span">最多可以上传5张图片，马上上传</span></p>\n' +
    '                                         -->\n' +
    '                                        <div class="z_photo upimg-div clear">\n' +
    '                                            <section class="z_file fl">\n' +
    '                                                <img src="images/uploadTips.png" class="add-img">\n' +
    '                                                <input type="file" data-descriptions="file" data-required="true"\n' +
    '                                                       name="file" id="file" class="file" value=""\n' +
    '                                                       accept="image/jpg,image/jpeg,image/png,image/bmp" multiple/>\n' +
    '                                            </section>\n' +
    '                                        </div>\n' +
    '                                    </section>\n' +
    '                                </div>\n' +
    '                                <aside class="mask works-mask">\n' +
    '                                    <div class="mask-content">\n' +
    '                                        <p class="del-p ">您确定要删除图片吗？</p>\n' +
    '                                        <p class="check-p"><span class="del-com wsdel-ok">确定</span><span class="wsdel-no">取消</span></p>\n' +
    '                                    </div>\n' +
    '                                </aside>\n' +
    '                            </div>',
    init:function (option) {
        var delParent;
        var imgArray={};
        var filei=[];
        var defaults = {
            el:"#imgUp",
            fileType         : ["jpg","png","bmp","jpeg"],   // 上传文件的类型
            fileSize         : 1024 * 1024 * 10,                  // 上传文件的大小 10M
            imgMaxSize:1
        };
        var opt=option||{};

        defaults=$.extend({},defaults,opt);
        /*点击图片的文本框*/
        $(defaults.el).append(this.elem);
        $(".file").change(function(){
            var idFile = $(this).attr("id");
            var file = document.getElementById(idFile);
            var imgContainer = $(this).parents(".z_photo"); //存放图片的父亲元素
            var fileList = file.files; //获取的图片文件
            filei=fileList;
            var input = $(this).parent();//文本框的父亲元素
            var imgArr = [];
            //遍历得到的图片文件
            var numUp = imgContainer.find(".up-section").length;
            var totalNum = numUp + fileList.length;  //总的数量
            if(fileList.length > defaults.imgMaxSize || totalNum > defaults.imgMaxSize ){
                alert("上传图片数目不可以超过"+defaults.imgMaxSize+"个，请重新选择");  //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
            }
            else if(numUp < defaults.imgMaxSize){
                fileList = validateUp(fileList);
                filei=fileList;
                for(var i = 0;i<fileList.length;i++){
                    var imgUrl = window.URL.createObjectURL(fileList[i]);
                    imgArr.push(imgUrl);
                    var $section = $("<section class='up-section fl loading'>");
                    imgContainer.prepend($section);
                    var $span = $("<span class='up-span'>");
                    $span.appendTo($section);

                    var $img0 = $("<img class='close-upimg'>").on("click",function(event){
                        event.preventDefault();
                        event.stopPropagation();
                        $(".works-mask").show();
                        delParent = $(this).parent();
                    });
                    $img0.attr("src","images/a7.png").appendTo($section);
                    var $img = $("<img class='up-img up-opcity'>");
                    $img.attr("src",imgArr[i]);
                    $img.appendTo($section);
                    var $p = $("<p class='img-name-p'>");
                    $p.html(fileList[i].name).appendTo($section);
                    var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
                    $input.appendTo($section);
                    var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
                    $input2.appendTo($section);

                }
                imgArray.elem=$section;
                console.log(imgArray)
            }
            setTimeout(function(){
                $(".up-section").removeClass("loading");
                $(".up-img").removeClass("up-opcity");
            },450);
            numUp = imgContainer.find(".up-section").length;
            if(numUp >= defaults.imgMaxSize){
                $(this).parent().hide();
            }
            return filei;
        });



        $(".z_photo").delegate(".close-upimg","click",function(){
            $(".works-mask").show();
            delParent = $(this).parent();
        });

        $(".wsdel-ok").click(function(){
            $(".works-mask").hide();
            var numUp = delParent.siblings().length;
            if(numUp < (defaults.imgMaxSize+1)){
                delParent.parent().find(".z_file").show();
            }
            delParent.remove();
        });

        $(".wsdel-no").click(function(){
            $(".works-mask").hide();
        });

        function validateUp(files){
            var arrFiles = [];//替换的文件数组
            for(var i = 0, file; file = files[i]; i++){
                //获取文件上传的后缀名
                var newStr = file.name.split("").reverse().join("");
                if(newStr.split(".")[0] != null){
                    var type = newStr.split(".")[0].split("").reverse().join("");
                    console.log(type+"===type===");
                    if(jQuery.inArray(type, defaults.fileType) > -1){
                        // 类型符合，可以上传
                        if (file.size >= defaults.fileSize) {
                            alert(file.size);
                            alert('您这个"'+ file.name +'"文件大小过大');
                        } else {
                            // 在这里需要判断当前所有文件中
                            arrFiles.push(file);
                        }
                    }else{
                        alert('您这个"'+ file.name +'"上传类型不符合');
                    }
                }else{
                    alert('您这个"'+ file.name +'"没有类型, 无法识别');
                }
            }
            // localStorage.setItem('imgarray',arrFiles.toString())
            // console.log(arrFiles)
            return arrFiles;
        }
        return filei;
    }
}