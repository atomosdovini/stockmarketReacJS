import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { api } from '../../services/api';
import { LogTable } from '../Tables/LogTable/LogTable'
import { getCookie } from '../csrftoken/getCookie';



export function ImportExportPageContent() {

const csrftoken = getCookie('csrftoken');
const { Dragger } = Upload;


const options = {
  xsrfHeaderName: 'X-CSRFTOKEN',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
  mode: 'same-origin',
  headers: {
    'Authorization': `JWT ${localStorage.getItem('access')}`,
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': csrftoken,
  },
}
const props = {
  name: 'file',
  accept: '.csv',
  action: async (file) => {
    try {
      const bodyForm = new FormData()
      bodyForm.append('recommendations', file)   
      const response = await api.post('/recommendation-file/', bodyForm, options)
      if (response.status === 200) {
        message.success(`${file.name} Upload feito com sucesso!`);
      } else {
        message.error(`${file.name} O upload do arquivo falhou.`);
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }
};
  return (
    <Space 
      direction="vertical"
      align="center" 
      size={32}
      style={{margin: "32px auto"}}
    >
    <Dragger style={{padding: 80}} {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Clique ou arraste um arquivo para está área para fazer o upload</p>
      <p className="ant-upload-hint">
        Selecione apenas UM arquivo no formato .CSV
      </p>
    </Dragger>
    <LogTable />
    </Space>
  )
};