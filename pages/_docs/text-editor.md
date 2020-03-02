---
title: Text editor
---

[Quill](https://quilljs.com/) editor [**documentation**](https://quilljs.com/docs/quickstart/).

## Basic editor

{% capture code %}
<div id="editor">
  <p>Hello World!</p>
  <p>Some initial <strong>bold</strong> text</p>
  <p><br></p>
</div>
{% endcapture %}
{% include example.html code=code %}

```js
var quill = new Quill('#editor', {
    theme: 'snow'
});
```

## Advanced editor

{% capture code %}
<div id="editor2"></div>
{% endcapture %}
{% include example.html code=code %}

{% append_lib highlightjs %}

{% capture_global scripts %}
<script>
    /*
    Quill
    */

hljs.configure({
  languages: ['javascript' , 'html' ]
});

//Example 1
var quill = new Quill('#editor', {
    theme: 'snow'
});

// Example 2
var fonts = ['georgia', 'times-new-roman', 'courier-new'];
var Font = Quill.import('formats/font');
Font.whitelist = fonts;
Quill.register(Font, true);

var fullEditor = new Quill('#editor2', {
    modules: {
    'syntax': true,
    'toolbar': [
        [{ 'font': fonts }, { 'size': [] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'super' }, { 'script': 'sub' }],
        [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
        [ {'direction': 'rtl'}, { 'align': [] }],
        [ 'link', 'image', 'video', 'formula' ],
        [ 'clean' ]
    ],
    },
    theme: 'snow',
    placeholder: `Hello World! Some fonts!`
});
fullEditor.format('font', 'georgia');

//Example 3
var quill3 = new Quill('#editor3', {
    theme: 'bubble'
});
</script>
{% endcapture_global %}


```js
var fonts = ['georgia', 'times-new-roman', 'courier-new'];
var Font = Quill.import('formats/font');
Font.whitelist = fonts;
Quill.register(Font, true);

var fullEditor = new Quill('#editor2', {
    modules: {
    'syntax': true,
    'toolbar': [
        [{ 'font': fonts }, { 'size': [] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'super' }, { 'script': 'sub' }],
        [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
        [ {'direction': 'rtl'}, { 'align': [] }],
        [ 'link', 'image', 'video', 'formula' ],
        [ 'clean' ]
    ],
    },
    theme: 'snow',
    placeholder: `Hello World! Some fonts!`
});
fullEditor.format('font', 'georgia');
```

```scss
/* SCSS */
$quill-fonts:(
  georgia: "Georgia",
  times-new-roman: "Times New Roman",
  courier-new: "Courier New"
);

@each $var, $var2 in $quill-fonts {
  .ql-font-#{$var} {
    font-family: $var2, ;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=#{$var}]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=#{$var}]::before {
    content: '#{$var2}';
    font-family: '#{$var2}', ;
  }
}
```

## Bubble Theme
{% capture code %}
<div id="editor3"></div>
{% endcapture %}
{% include example.html code=code class="bg-gray" content-class="bg-white" %}

```js
var quill = new Quill('#editor3', {
    theme: 'bubble'
});
```