const sample = 
`<!--- Begin Editing Here -->

# Heading 1
## Heading 2
### Heading 3
</br>

## These are lists</br>
</br>

- apple
- banana
- kiwi

</br>

1. one
2. two
3. three

</br>

## Font Options</br>

**This is bold text**

*This is italic text*

`;

var vue = new Vue({
    el: "#app",
    data: {
        sampleText: sample,
        markdownText: "",
        editorShow: true,
        previewShow: true,
    },
    computed:{
        previewMarkdown: function() {
            let text = this.markdownText;
            if (!text) {
                text = this.sampleText;
            }
            return sanitizeHtml(marked(text),
             {allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'h1', 'h2', 's' ])});
        }
    },
    methods: {
        update: _.debounce(function(e){
            this.markdownText = e.target.value;
        }, 300),
        toggleEditorView: function(e) {
            this.editorShow = !this.editorShow;
            if (!this.editorShow) {
                document.getElementById("previewFullscreen").disabled = true;
            }
            else {
                document.getElementById("previewFullscreen").disabled = false;
            }
        },
        togglePreviewView: function(e) {
            this.previewShow = !this.previewShow;
            if (!this.previewShow) {
                document.getElementById("editorFullscreen").disabled = true;
            }
            else {
                document.getElementById("editorFullscreen").disabled = false;
            }
        }
    }
});