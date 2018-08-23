console.log("adjhd")
var froalaEditor =  $('#froala-editor').froalaEditor({
    height: 300,
    language: 'vi',
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo'],
    imageUploadURL: 'UploadFiles',
    imageUploadParams: {
        id: 'my_editor'
    }
});

$('#btn').on('click', function () {

    var a = $('#froala-editor').froalaEditor('html.get');
    console.log(a)
})