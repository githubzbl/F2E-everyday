### 12.1 Node.js Application with MongoDB and Backbone.
#### 根据O‘Reilly的一本书开始进行项目学习，最终搭建一个类似于 LinkedIn 或者 Facebook的社交网络。
---
**Note:**  
12.1： 模型-视图-控制器（MVC）设计模式，进行服务器端和前端编程。  
模型（Model）：包含了要读取或要操作的数据的一种结构。  
视图（View）：用户与模型产生互动的界面。  
控制器（Controller）：在视图和底层模型之间代理用户操作。
建议一个controller对应一个model。  
虽然使用同一种语言，但是在底层，仍然是跨浏览器、服务器和数据库的编程。有些JavaScript开发范式着眼点略有不同，取决于它们的目标是服务于UI（如浏览器中的Backbone）、验证（如服务器端的Node）或持久（如MongoDB）。需时刻注意数据要去哪里，是否阻塞了进程，如何监听进出的事件并作出反应。


