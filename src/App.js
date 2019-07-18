import React from 'react';
import ReactExcel from './react-excel';
import { Table } from 'antd'

class App extends React.Component  {
  state={
    dataSource:[],
    columns:[]
  }
  // 处理excel成功
  success=(data,columns)=>{
    this.setState({
      dataSource:data,
      columns:columns
    })
  }
  render(){    
    return (
      <div style={{textAlign:'center',margin:20}}>
        <ReactExcel 
          success={this.success}
          processData={this.processData}
          importBtnTxt='点我上传一个excel试试'
        >
        </ReactExcel>
        <br/>
        <br/>
        <Table dataSource={this.state.dataSource} columns={this.state.columns} ></Table>
      </div>
    );
  }
}

export default App;
