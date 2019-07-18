/*
 * @Author: shark
 * @Description: 前端处理excel文件导入或者导出
 * @Date: 2019-07-11 10:30
 */

import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Button, Icon } from 'antd'
import XLSX from 'xlsx'

class ReactExcel extends Component {
    state={
        importBtn: this.props.importBtn || true,
        exportBtn: this.props.exportBtn || false,
        saveBtn: this.props.saveBtn || false,
        cancelBtn: this.props.cancelBtn || false,
        excelData: [] // 解析出来的excel数据
    }
    // 触发上传文件功能
    uploadFile=() => {
        document.getElementById('imFile').click()
    }
    // excel导入功能
    importFile=() => {
        let obj = document.getElementById('imFile')
        if (!obj.files) {
            return
        }
        let f = obj.files[0]
        let reader = new FileReader()
        let $t = this
        reader.onload = function (e) {
            let data = e.target.result
            if ($t.rABS) {
                $t.wb = XLSX.read(btoa(this.fixdata(data)), {
                    type: 'base64'
                })
            } else {
                $t.wb = XLSX.read(data, {
                    type: 'binary'
                })
            }
            let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
            console.log(typeof json)
            $t.dealFile($t.processData(json))
        }
        if (this.rABS) {
            reader.readAsArrayBuffer(f)
        } else {
            reader.readAsBinaryString(f)
        }
    }
    // 处理导入的数据
    dealFile= (data) => {
        document.getElementById('imFile').value = ''
        if (data.length <= 0) {
            this.props.error()
        } else {
            this.setState({ excelData: data })
            this.props.success(data,this.getColumns(data))
        }
    }
    getColumns=(data)=>{        
        return data && Object.keys(data[0]).map(k=>{
            return {
                title: k,
                dataIndex: k,
                key: k,
            }
        })
    }
    // 解析数据
    processData= (data) => {
        return this.props.processData ? this.props.processData(data) : data
    }
    // 文件流转BinaryString
    fixdata= data => {
        let o = ''
        let l = 0
        let w = 10240
        for (; l < data.byteLength / w; ++l) {
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
    }
    // 保存xls
    saveFiles= () => {
        this.props.save(this.state.excelData)
    }
    // 取消
    cancel =() => {
        let obj = document.getElementById('imFile')
        obj.value = ''
        this.setState({ excelData: [] })
        this.props.cancel()
    }
    render() {
        return (
            <div className={this.props.className}>
                <input type="file" onChange={this.importFile} id="imFile" style={{ display: 'none' }}
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                <a id="downlink"></a>
                {
                    this.state.importBtn ?
                        <Button type="primary" onClick={() => { this.uploadFile() }}><Icon type="upload" />{this.props.importBtnTxt || '导入'}</Button> : null
                }
                {
                    this.state.exportBtn ?
                        <Button style={{ marginLeft: '15px' }}><Icon type="download" />{this.props.exportBtnTxt || '导出'}</Button> : null
                }
                {
                    this.state.saveBtn ?
                        <Button type="primary" onClick={() => { this.saveFiles() }} style={{ marginLeft: '15px' }}><Icon type="save" />{this.props.saveBtnTxt || '保存'}</Button> : null
                }
                {
                    this.state.cancelBtn ?
                        <Button type="danger" onClick={() => { this.cancel() }} style={{ marginLeft: '15px' }}><Icon type="reload" />{this.props.cancelBtnTxt || '取消'}</Button> : null
                }
            </div>
        )
    }
}

ReactExcel.defaultProps = {
    error: () => { return true }, // 报错函数
    processData: (data) => { return data }, // 处理数据
    success: data => { return data }, // 成功
    save: () => { return true }, // 保存
    cancel: () => { return true }, // 取消
    exportBtnTxt: '',
    importBtnTxt: '',
    className: '',
};

export default ReactExcel