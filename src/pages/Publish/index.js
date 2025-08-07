import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import { Link, useNavigate, useSearchParams } from 'react-router-dom'
  import './index.scss'
  import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { createArticleAPI, getArticleDetailAPI, updateArticleAPI } from '@/apis/article'
import { useState, useEffect } from 'react'
import useChannelList from '@/hooks/useChannelList'

  const { Option } = Select
  
  const Publish = () => {
   
    const navigate = useNavigate()
    const channelList = useChannelList()

    const handlePublish = async ({title, content, channel_id}) => {
        if(imageList.length !== +imageType) {
            console.log('imageList.length', imageList.length)
            console.log('imageType', imageType)
            message.warning('请上传' + imageType + '张图片')
            return
        }
        const data = {
            title,
            content,
            cover: {
                type: +imageType,
                images: imageList.map(item => {
                    if(item.response) {
                        return item.response.data.url
                    }
                    return item.url
                })
            },
            channel_id,
        }
        let res
        if(articleId) {
            res = await updateArticleAPI({...data, id: articleId})
        } else {
            res = await createArticleAPI(data)
        }
        console.log(res)
        if (res.data.message === 'OK') {
            message.success('发布成功')
            navigate('/article')
        } else {
            message.error('发布失败')
        }
    }

    const [imageList, setImageList] = useState([])
    const handleUploadChange = ({file, fileList}) => {
        console.log(file, fileList)
        setImageList(fileList)
    }

    const [imageType, setImageType] = useState(1)
    const handleTypeChange = (e) => {
        console.log('handleTypeChange', e.target.value)
        setImageType(e.target.value)
    }

    // 获取文章详情
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    console.log('articleId', articleId)

    const [form] = Form.useForm()

    useEffect(() => {
        const fetchArticleDetail = async () => {
            const res = await getArticleDetailAPI(articleId)
            console.log('res', res)
            const data = res.data.data
            const cover = data.cover
                form.setFieldsValue({
                    ...data, 
                    type: cover.type})
                    setImageType(cover.type)
                    setImageList(cover.images.map(item => ({
                        url: item,
                    })))
            
        }
        if(articleId) {
            fetchArticleDetail()
        }
    }, [articleId, form])

    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: articleId ? '编辑文章' : '发布文章' },
            ]}
            />
          }
        >
          <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1 }}
            onFinish={handlePublish}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {channelList?.map(item => 
                    (<Option key={item.id} value={item.id}>{item.name}</Option>))}
              </Select>
            </Form.Item>
            <Form.Item label="封面">
  <Form.Item name="type" onChange={handleTypeChange}>
    <Radio.Group>
      <Radio value={1}>单图</Radio>
      <Radio value={3}>三图</Radio>
      <Radio value={0}>无图</Radio>
    </Radio.Group>
  </Form.Item>
  {imageType > 0 && <Upload
    listType="picture-card"
    showUploadList
    name='image'
    action='http://geek.itheima.net/v1_0/upload'
    onChange={handleUploadChange}
    maxCount={imageType}
    fileList={imageList}
  >
    <div style={{ marginTop: 8 }}>
      <PlusOutlined />
    </div>
  </Upload>}
</Form.Item>

            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
                <ReactQuill
          className="publish-quill"
          theme="snow"
          placeholder="请输入文章内容"
        />
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  发布文章
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Publish