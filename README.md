React 解析 Excel 
=====

使用ReactJS构架与AntDesign封装了一个Excel上传解析的功能按钮

## Demo & Examples
本程序非常简单，提供了一个极简的使用方法来解析excel
![image](https://github.com/hongtaodai/react-excel/blob/master/src/src/imgs/a.gif)

To build the examples locally, run:

```
npm install
npm start
```

## Api--极简
    error: () => { return true }, // 报错函数
    processData: (data) => { return data }, // 处理数据
    success: (data,cols) => { return data }, // 成功
    save: () => { return true }, // 保存
    cancel: () => { return true }, // 取消
    importBtnTxt: '', //上传按钮显示文字
    className: '', // css类名