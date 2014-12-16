**水平居中：**  

- 居中有宽度的元素（常规、静态元素）：  
	-   让它向左或向右浮动； 
	-   或者使用`text-align`属性让它在父元素内居左、居右或居中；
	- 还可以利用自动外边距(` margin: 0 auto;`）  

- 居中没有宽度的元素：  
	-  `display: inline-block; `既有块级元素的特点（设定内外边距，或者包围其他块级元素），也有行内元素的行为（会收缩包裹自己的内容，而不是拓展填充父级元素），即此元素的宽度始终等于其内容宽度。而且这种元素还可以包围浮动元素。但不能给它的外边距设置`auto`。
	- 可以为要居中元素的父元素设置 `text-align: center;` ，然后为要居中的元素设置 `display: inline-block`。

---
**垂直居中：**  

- 在一个固定高度的元素内垂直居中一行文本：  
	- 把这行文本的 line-height 设定为该固定元素的高度。  
 
 ```
 text-align: center;  /* 水平居中 */
 line-height: 300px;  /* 垂直居中：行高=容器高度 */
```

- 垂直居中其他元素，比如图片：
	- 将容器的display 设置为 `table-row`，再设定（只对单元格有效） `vertical-algn: middle;`

```
display: table-cell; /* 借用表格的行为 */
vertical-align: middle;  /* 垂直居中 */
text-align: center;  /* 水平居中  */
```

---

貌似CSS3中还有新方法，待补充。